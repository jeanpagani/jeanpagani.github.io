/* Décorations qui virevoltent — usage :
   <script src="deco-volantes.js" data-deco="bougies|mimosa|defenseur|victoire"></script> */
(function () {
  var s = document.currentScript, type = s && s.dataset.deco;
  if (!type || (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)) return;

  var STAR = 'M12 1.5l3.1 6.9 7.4.7-5.6 5 1.7 7.4L12 17.6l-6.6 3.9 1.7-7.4-5.6-5 7.4-.7z';
  var SVG = {
    bougie: function () {
      var c = ['#f7e7c6', '#f3c9d4', '#cfe3f5', '#f6e08f'][Math.floor(Math.random() * 4)];
      return '<svg viewBox="0 0 24 48" width="100%" height="100%">' +
        '<ellipse cx="12" cy="10" rx="9" ry="11" fill="rgba(255,190,90,.25)"/>' +
        '<path class="fl" d="M12 2C9 7 9 11 12 13.5 15 11 15 7 12 2z" fill="#ffb547"/>' +
        '<path d="M12 6c-1.4 2.6-1.4 4.6 0 6 1.4-1.4 1.4-3.4 0-6z" fill="#fff4c2"/>' +
        '<line x1="12" y1="13" x2="12" y2="16" stroke="#3a2a1a" stroke-width="1"/>' +
        '<rect x="8" y="16" width="8" height="28" rx="2" fill="' + c + '"/>' +
        '<rect x="8" y="16" width="2.5" height="28" rx="1" fill="rgba(255,255,255,.45)"/>' +
        '<path d="M8 19c2 1.5 6 1.5 8 0" stroke="rgba(255,255,255,.6)" stroke-width="1" fill="none"/></svg>';
    },
    mimosa: function () {
      var b = '', pts = [[12, 6], [7, 9], [17, 9], [10, 13], [15, 13], [5, 14], [19, 14], [12, 17], [8, 18], [16, 18]];
      pts.forEach(function (p) {
        var r = 2.2 + Math.random() * 1;
        b += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + (r + .9) + '" fill="rgba(255,214,0,.35)"/>' +
             '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + r + '" fill="#ffd21f"/>' +
             '<circle cx="' + (p[0] - .7) + '" cy="' + (p[1] - .7) + '" r="' + (r * .4) + '" fill="#fff08a"/>';
      });
      return '<svg viewBox="0 0 24 30" width="100%" height="100%">' +
        '<path d="M12 29C12 22 11 15 12 6" stroke="#6b8f3a" stroke-width="1.2" fill="none"/>' +
        '<path d="M12 24l-6 3M12 24l6 3M12 21l-5 2M12 21l5 2" stroke="#7fa64a" stroke-width="1" />' + b + '</svg>';
    },
    etoileRouge: function () {
      return '<svg viewBox="0 0 24 24" width="100%" height="100%"><path d="' + STAR + '" fill="#c8102e" stroke="#f0d898" stroke-width="1.2" stroke-linejoin="round"/></svg>';
    },
    etoileOr: function () {
      return '<svg viewBox="0 0 24 24" width="100%" height="100%"><defs><linearGradient id="go" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff4c2"/><stop offset=".5" stop-color="#e2bd6a"/><stop offset="1" stop-color="#9c7a34"/></linearGradient></defs><path d="' + STAR + '" fill="url(#go)"/></svg>';
    },
    laurier: function () {
      var l = '';
      for (var i = 0; i < 5; i++) {
        var y = 24 - i * 4.5;
        l += '<ellipse cx="8" cy="' + y + '" rx="4" ry="1.7" transform="rotate(-35 8 ' + y + ')" fill="#c9a24e"/>' +
             '<ellipse cx="16" cy="' + (y - 2) + '" rx="4" ry="1.7" transform="rotate(35 16 ' + (y - 2) + ')" fill="#e2bd6a"/>';
      }
      return '<svg viewBox="0 0 24 30" width="100%" height="100%"><path d="M12 29C12 20 12 10 12 3" stroke="#9c7a34" stroke-width="1.2"/>' + l + '</svg>';
    },
    oeillet: function () {
      var p = '';
      for (var i = 0; i < 9; i++) {
        var a = i * 40;
        p += '<ellipse cx="12" cy="7" rx="3.6" ry="4.6" transform="rotate(' + a + ' 12 10)" fill="' + (i % 2 ? '#b3001b' : '#d81e2c') + '"/>';
      }
      return '<svg viewBox="0 0 24 40" width="100%" height="100%">' +
        '<path d="M12 39V15" stroke="#3f6b2a" stroke-width="1.4"/><path d="M12 30q-6-3-8-8M12 26q6-2 7-7" stroke="#4f7d34" stroke-width="1.1" fill="none"/>' +
        '<path d="M9 16h6l-1 4h-4z" fill="#4f7d34"/>' + p +
        '<circle cx="12" cy="10" r="3" fill="#8e0014"/></svg>';
    },
    ruban: function () {
      return '<svg viewBox="0 0 12 40" width="100%" height="100%"><path d="M0 0h12v40l-6-5-6 5z" fill="#111"/>' +
        '<path d="M0 6h12v4H0zM0 15h12v4H0zM0 24h12v4H0z" fill="#ff8a00"/></svg>';
    }
  };

  var CONF = {
    bougies:   { items: ['bougie'], n: 12, size: [16, 26], dur: [16, 24], up: true, sway: 26, spin: 12 },
    mimosa:    { items: ['mimosa'], n: 18, size: [26, 42], dur: [10, 16], sway: 60, spin: 540 },
    defenseur: { items: ['etoileRouge', 'etoileOr', 'etoileOr', 'laurier'], n: 14, size: [12, 24], dur: [14, 22], sway: 45, spin: 360 },
    victoire:  { items: ['oeillet', 'oeillet', 'ruban', 'etoileOr'], n: 10, size: [16, 28], dur: [20, 30], sway: 35, spin: 160 }
  }[type];
  if (!CONF) return;

  var st = document.createElement('style');
  st.textContent = '.dv-layer{position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden}' +
    '.dv-item{position:absolute;will-change:transform;opacity:0}' +
    '.dv-inner{width:100%;height:100%;filter:drop-shadow(0 0 4px rgba(255,220,150,.35))}' +
    '.dv-item .fl{transform-origin:12px 13px;animation:dvFlick .5s ease-in-out infinite alternate}' +
    '@keyframes dvFlick{from{transform:scale(1,1)}to{transform:scale(.85,1.12)}}';
  document.head.appendChild(st);

  function rnd(a, b) { return a + Math.random() * (b - a); }

  function go() {
    var layer = document.createElement('div');
    layer.className = 'dv-layer';
    layer.setAttribute('aria-hidden', 'true');
    document.body.insertBefore(layer, document.body.firstChild);
    var H = Math.max(innerHeight, 600);
    for (var i = 0; i < CONF.n; i++) {
      var name = CONF.items[i % CONF.items.length];
      var w = rnd(CONF.size[0], CONF.size[1]);
      var h = name === 'bougie' ? w * 2 : name === 'oeillet' ? w * 1.65 : name === 'ruban' ? w * 1.5 : name === 'etoileRouge' || name === 'etoileOr' ? w : w * 1.25;
      var el = document.createElement('div');
      el.className = 'dv-item';
      el.style.cssText = 'left:' + rnd(2, 94) + '%;top:' + (CONF.up ? H + 20 : -h - 20) + 'px;width:' + w + 'px;height:' + h + 'px';
      var inner = document.createElement('div');
      inner.className = 'dv-inner';
      inner.innerHTML = SVG[name]();
      el.appendChild(inner);
      layer.appendChild(el);
      var d = rnd(CONF.dur[0], CONF.dur[1]) * 1000, dist = (H + h + 60) * (CONF.up ? -1 : 1);
      el.animate([
        { transform: 'translateY(0)', opacity: 0 },
        { opacity: .9, offset: .12 },
        { opacity: .85, offset: .82 },
        { transform: 'translateY(' + dist + 'px)', opacity: 0 }
      ], { duration: d, delay: -rnd(0, d), iterations: Infinity, easing: 'linear' });
      var sw = CONF.sway * rnd(.6, 1.2), dir = Math.random() < .5 ? -1 : 1, sp = CONF.spin * dir;
      inner.animate([
        { transform: 'translateX(0) rotate(0deg) rotateY(0deg)' },
        { transform: 'translateX(' + sw * dir + 'px) rotate(' + sp / 3 + 'deg) rotateY(' + (CONF.up ? 0 : 180) + 'deg)' },
        { transform: 'translateX(' + -sw * dir * .6 + 'px) rotate(' + sp * 2 / 3 + 'deg) rotateY(' + (CONF.up ? 0 : 300) + 'deg)' },
        { transform: 'translateX(0) rotate(' + sp + 'deg) rotateY(' + (CONF.up ? 0 : 360) + 'deg)' }
      ], { duration: rnd(5, 9) * 1000, iterations: Infinity, easing: 'ease-in-out', direction: CONF.up ? 'alternate' : 'normal' });
    }
  }
  if (document.body) go(); else document.addEventListener('DOMContentLoaded', go);
})();
