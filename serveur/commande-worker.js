/* ════════════════════════════════════════════════════════════════
   Relais des commandes — Cloudflare Worker (gratuit)
   Reçoit une commande du site et l'envoie :
     • dans votre Telegram (via votre bot)
     • en copie par e-mail (facultatif, via Resend)
   Aucun secret ici : les clés se saisissent dans Cloudflare
   (Settings → Variables) :
     BOT_TOKEN   jeton du bot Telegram (donné par @BotFather)
     CHAT_ID     votre identifiant Telegram (donné par @userinfobot)
     RESEND_KEY  (facultatif) clé de l'API Resend pour la copie e-mail
     EMAIL_TO    (facultatif) votre adresse e-mail
     EMAIL_FROM  (facultatif) expéditeur validé chez Resend
   Voir serveur/LISEZ-MOI.md
   ════════════════════════════════════════════════════════════════ */
const SITE = 'https://jeanpagani.github.io';

export default {
  async fetch(request, env) {
    const cors = { 'Access-Control-Allow-Origin': SITE, 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' };
    if (request.method === 'OPTIONS') return new Response(null, { headers: cors });
    if (request.method !== 'POST') return new Response('Méthode non autorisée', { status: 405, headers: cors });

    // Refuse les envois qui ne viennent pas du site
    const origin = request.headers.get('Origin') || '';
    if (origin && origin !== SITE) return new Response('Origine refusée', { status: 403, headers: cors });

    let o;
    try { o = JSON.parse(await request.text()); } catch { return new Response('JSON invalide', { status: 400, headers: cors }); }
    const champ = (v, max) => String(v ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').slice(0, max).trim();
    const c = {
      id: champ(o.id, 30), occasion: champ(o.occasion, 60), destinataire: champ(o.destinataire, 80),
      histoire: champ(o.histoire, 900), contact: champ(o.contact, 90), tarif: champ(o.tarif, 90)
    };
    if (!/^FP-\d{6}-[A-Z0-9]{4}$/.test(c.id) || !c.destinataire || !c.contact) {
      return new Response('Commande incomplète', { status: 400, headers: cors });
    }

    const texte = `🎭 Новый заказ ${c.id}\n\n📌 Повод: ${c.occasion}\n👤 Для кого: ${c.destinataire}\n📖 История: ${c.histoire}\n💰 Тариф: ${c.tarif}\n📩 Контакт: ${c.contact}`;

    // 1) Telegram
    const tg = await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: env.CHAT_ID, text: texte, disable_web_page_preview: true })
    }).catch(() => null);

    // 2) Copie e-mail (facultative)
    if (env.RESEND_KEY && env.EMAIL_TO && env.EMAIL_FROM) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST', headers: { 'Authorization': `Bearer ${env.RESEND_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: env.EMAIL_FROM, to: env.EMAIL_TO, subject: `Commande ${c.id} — ${c.occasion}`, text: texte })
      }).catch(() => null);
    }

    return new Response(tg && tg.ok ? 'ok' : 'erreur telegram', { status: tg && tg.ok ? 200 : 502, headers: cors });
  }
};
