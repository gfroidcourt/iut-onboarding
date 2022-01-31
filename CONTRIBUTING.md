# Guide de contribution au projet

## Installer le projet

> Nécéssite d'avoir node.js installé

1. Clone le projet : ```git clone git@github.com:gfroidcourt/iut-onboarding.git```
2. Installer les dépendences : ```npm install```
    - Si vue.js n'est pas installé : ```npm i -g @vue``` puis ```npm i -g @vue/cli```
3. Extensions vscode :
    - vue
    - eslint

4. Extension Google Chrome (A INSTALLER POUR QUE LE PROJET FONCTIONNE CORRECTEMENT)
    - [cors unblock](https://chrome.google.com/webstore/detail/cors-unblock/lfhmikememgdcahcdlaciloancbhjino?hl=en)

## Lancer le serveur de développement

- ```npm run serve```
    - ouvrir l'url indiquée dans le terminal  

## Franglais :

- Code, nom de fichiers en **anglais**
- Commentaires en **français**
- Commits et PR en **français**


## Travailler sur une feature et l'ajouter au projet :

1. Créer une branche dédiée à la feature : ```git checkout -b nom-branche```
2. Développer la feature.
3. Créer une commit : ```git add -A && git commit -m "Message de commit"```
4. Upstream et push : ```git push -u origin nom-branche```
5. Créer une [pull request](https://github.com/gfroidcourt/iut-onboarding/pulls)
    - Nom valide
    - Description complète de la feature
    - Linker la PR à une issue et projet si possible
    - Assigner au moins 2 reviewers

# Structure du projet

Tout le code logique de l'application vue se trouve dans le dossier `src`.

- `App.js` contrôle quelle vue est actuellement affichée à l'écran.
- Le dossier `views` contient toutes les vues (Pages qui vont être affichées)
- Le dossier `components` contient les composants qui sont utilisés par les vues
- Le dossier `assets`contient toutes les images et ressources du projet.
- La récupération des données externes se fait via les fihier `.js` :
    - `api.js` Récupération API TBM et API météo.
    - `scrapMeal.js` Récupération menus CROUS (Sirtaki / Space).


La partie hardware (Setup raspberry) est décrite dans le document [RASPBERRY.md](./RASPBERRY.md)

# Déployer le projet

TO DO
