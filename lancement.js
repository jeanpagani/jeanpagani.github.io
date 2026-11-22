/* ════════════════════════════════════════════════════════════════
   RÉGLAGES DU LANCEMENT — à remplir le jour de l'autorisation
   ────────────────────────────────────────────────────────────────
   Tant que vitrine.js contient  MODE_VITRINE = true , rien de ceci
   n'est visible par les visiteurs (mode fantôme).

   Jour J :
     1. Remplir PAIEMENT (liens de paiement de ЮKassa / Т-Банк / Робокасса)
     2. Remplir COMMANDES.adresse (l'adresse du petit serveur qui envoie
        les commandes dans Telegram + e-mail — voir serveur/LISEZ-MOI.md)
     3. Dans vitrine.js : MODE_VITRINE = false
   ════════════════════════════════════════════════════════════════ */
window.LANCEMENT = {

  // Tarifs affichés (en roubles). Modifiables à tout moment.
  TARIFS: {
    standard: { nom: 'Стандарт', prix: 490,  delai: 'до 24 часов' },
    express:  { nom: 'Экспресс', prix: 790,  delai: 'за 2 часа'   },
    flash:    { nom: 'Флэш ⚡',   prix: 1290, delai: 'за 30 минут' }
  },

  // Liens de paiement, un par tarif (créés dans l'espace du prestataire).
  // Laisser vide tant qu'il n'y a pas de compte : le bouton « Оплатить »
  // affichera alors un message d'attente au lieu d'un lien cassé.
  PAIEMENT: {
    standard: '',
    express:  '',
    flash:    ''
  },

  // Où arrivent les commandes.
  COMMANDES: {
    adresse:  '',                       // URL du serveur (Cloudflare Worker), ex. https://commandes.xxx.workers.dev
    telegram: 'FrancuzskayaPoeziya'     // compte Telegram de secours (sans @)
  }
};
