/* ════════════════════════════════════════════════════════════════
   MODE VITRINE — phase préparatoire
   Quand il est activé : aucun prix, aucune commande, aucun paiement
   n'est visible sur le site. Seuls les poèmes, la voix et la vidéo
   restent.

   👉 POUR RELANCER LES VENTES : remplacer  true  par  false  ci-dessous.
   ════════════════════════════════════════════════════════════════ */
var MODE_VITRINE = true;

// ── Aperçu privé du propriétaire : ouvrir le site avec ?apercu=<clé> (et ?apercu=off pour quitter) ──
(function () {
  function h(t){ var x=2166136261; for (var i=0;i<t.length;i++){ x^=t.charCodeAt(i); x=Math.imul(x,16777619)>>>0; } return x.toString(16); }
  try {
    var k = new URLSearchParams(location.search).get('apercu');
    if (k === 'off') localStorage.removeItem('fp-apercu');
    else if (k && h(k) === '37e1e2a') localStorage.setItem('fp-apercu', '1');
    if (localStorage.getItem('fp-apercu') === '1') {
      MODE_VITRINE = false;
      document.addEventListener('DOMContentLoaded', function () {
        var b = document.createElement('div');
        b.textContent = '👁 Aperçu privé — mode fantôme (invisible pour les visiteurs)';
        b.style.cssText = 'position:fixed;left:0;right:0;bottom:0;z-index:9999;padding:8px 12px;text-align:center;font:600 12px system-ui,sans-serif;background:#c9392d;color:#fff;pointer-events:none;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none';
        document.body.appendChild(b);
      });
    }
  } catch (e) {}
})();

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
    'a[href*="telegram.html"], a[href*="t.me/"]:not([data-libre]), a[href*="wa.me/"], a[href*="boosty"],' +
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
        '<div style="font-family:\'Cormorant Garamond\',serif;font-style:italic;font-size:18px;letter-spacing:4px;color:rgba(240,216,152,0.5);">открытие</div>' +
        '<div style="max-width:400px;font-size:15px;line-height:1.8;color:rgba(240,235,224,0.65);">Эта страница скоро откроется.<br>А пока — слушайте стихи и смотрите видео.</div>' +
        '<a href="' + racine + 'index.html" style="margin-top:8px;padding:14px 28px;border:1.5px solid rgba(184,150,90,0.45);border-radius:50px;color:#f0d898;text-decoration:none;font-size:14px;">← Французская Поэзия</a>';
      document.body.appendChild(d);
    }
  });
})();
