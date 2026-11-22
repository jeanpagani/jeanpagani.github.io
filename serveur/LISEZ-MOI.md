# Lancement des ventes — mode d'emploi du jour J

Tout est déjà construit sur le site, **caché** tant que `MODE_VITRINE = true`
(dans `vitrine.js`). Le jour de l'autorisation, il reste 4 étapes.
Claude peut vous guider écran par écran pour chacune.

## 1. Le compte de paiement (≈ 1 jour d'attente)
Ouvrir un compte chez un prestataire russe adapté à votre statut
(ЮKassa, Т-Банк ou Робокасса), puis créer **3 liens de paiement** :
490 ₽, 790 ₽ et 1290 ₽ (ou les prix choisis).
→ Les coller dans `lancement.js`, rubrique `PAIEMENT`.

## 2. Le bot Telegram qui reçoit les commandes (10 minutes)
1. Dans Telegram, écrire à **@BotFather** → `/newbot` → choisir un nom.
   Il donne un **jeton** (BOT_TOKEN). Ne jamais le publier.
2. Écrire à **@userinfobot** : il donne votre **identifiant** (CHAT_ID).
3. Envoyer un premier message à votre nouveau bot (sinon il ne peut pas vous écrire).

## 3. Le petit serveur gratuit (15 minutes)
1. Créer un compte gratuit sur **cloudflare.com** → Workers & Pages → Create Worker.
2. Coller le contenu de `serveur/commande-worker.js` → Deploy.
3. Settings → Variables : ajouter `BOT_TOKEN` et `CHAT_ID`
   (type « Secret »). Copie e-mail facultative : `RESEND_KEY`, `EMAIL_TO`, `EMAIL_FROM`.
4. Copier l'adresse du Worker (…workers.dev) dans `lancement.js`,
   rubrique `COMMANDES.adresse`.

## 4. Ouvrir la boutique
Dans `vitrine.js` : `MODE_VITRINE = false`.
Prix, boutons « Заказать », page de commande, certificats et avis apparaissent.
Le titre « Подарите… в один клик » est déjà en place.

## Ce qui reste à décider ce jour-là
- Les prix définitifs (modifiables dans `lancement.js`).
- Les mentions légales obligatoires pour vendre (statut, numéro d'enregistrement,
  conditions de vente, politique de données personnelles) : à faire valider.
