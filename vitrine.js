/* ════════════════════════════════════════════════════════════════
   MODE VITRINE — phase préparatoire
   Quand il est activé : aucun prix, aucune commande, aucun paiement
   n'est visible sur le site. Seuls les poèmes, la voix et la vidéo
   restent.

   👉 POUR RELANCER LES VENTES : remplacer  true  par  false  ci-dessous.
   ════════════════════════════════════════════════════════════════ */
var MODE_VITRINE = true;

(function () {
  if (!MODE_VITRINE) return;

  // Pages entièrement réservées à la vente → remplacées par « Скоро »
  var PAGES_VENTE = ['commande.html', 'certificat.html', 'avis.html', 'telegram.html', 'poeme-sur-mesure.html'];
  var page = location.pathname.split('/').pop() || 'index.html';
  var pageVente = PAGES_VENTE.indexOf(page) !== -1;

  // Tout ce qui sert à commander ou à payer est masqué partout
  var css =
    '#orderCta, svg:has(+ .price-grid), .price-grid, .price-box, .price-hint,' +
    '.btn-order-main, .btn-order, .cta-block, .btn-tg, .btn-boosty, #tgLink,' +
    'a[href*="commande.html"], a[href*="certificat.html"], a[href*="avis.html"],' +
    'a[href*="telegram.html"], a[href*="t.me/"], a[href*="wa.me/"], a[href*="boosty"],' +
    'button[onclick*="openDrawer"], button[onclick*="commande"], [data-vente]' +
    '{ display:none !important; }' +
    '[data-vitrine] { display:block !important; }';  // textes de remplacement
  if (pageVente) css += 'body > *:not(#vitrine-soon) { display:none !important; }';

  var st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  document.addEventListener('DOMContentLoaded', function () {
    // Titres « Тарифы » / « Начните вашу историю » juste avant les prix
    document.querySelectorAll('.price-grid').forEach(function (g) {
      var p = g.previousElementSibling;
      if (p && (p.tagName.toLowerCase() === 'svg' || /Тариф|Tarif/i.test(p.textContent))) p.style.display = 'none';
    });
    // Étapes « Напишите мне в Telegram » de la page poème sur mesure
    if (page === 'poeme-sur-mesure.html') document.querySelectorAll('.steps').forEach(function (s) { s.style.display = 'none'; });
    // Le tiroir de commande ne s'ouvre plus
    window.openDrawer = function () {};

    if (pageVente) {
      var racine = location.pathname.indexOf('/cartes/') !== -1 ? '../' : '';
      var d = document.createElement('div');
      d.id = 'vitrine-soon';
      d.style.cssText = 'position:relative;z-index:10;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;padding:40px 20px;text-align:center;font-family:Raleway,sans-serif;color:#f0ebe0;background:linear-gradient(160deg,#08060d 0%,#141020 50%,#08060d 100%);';
      d.innerHTML =
        '<div style="font-size:52px;">🌹</div>' +
        '<div style="font-family:\'Playfair Display\',serif;font-style:italic;font-size:34px;color:#f0d898;">Скоро</div>' +
        '<div style="font-family:\'Cormorant Garamond\',serif;font-style:italic;font-size:18px;letter-spacing:4px;color:rgba(240,216,152,0.5);">Bientôt</div>' +
        '<div style="max-width:400px;font-size:15px;line-height:1.8;color:rgba(240,235,224,0.65);">Эта страница скоро откроется.<br>А пока — слушайте стихи и смотрите видео.</div>' +
        '<a href="' + racine + 'index.html" style="margin-top:8px;padding:14px 28px;border:1.5px solid rgba(184,150,90,0.45);border-radius:50px;color:#f0d898;text-decoration:none;font-size:14px;">← Букет Французской Поэзии</a>';
      document.body.appendChild(d);
    }
  });
})();
