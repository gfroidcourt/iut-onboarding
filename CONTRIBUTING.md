# Guide de contribution au projet

## Installer le projet

> Nécéssite d'avoir node.js installé

0. Installer netlify cli : `npm install netlify-cli -g` (-g ne marchera pas à l'IUT)
1. Clone le projet : `git clone git@github.com:gfroidcourt/iut-onboarding.git`
2. Installer les dépendences : `npm install`
    - Si vue.js n'est pas installé : `npm i -g @vue` puis `npm i -g @vue/cli` puis `npm i -g netlify`
3. Extensions vscode :
    - vue
    - eslint


## Lancer le serveur de développement

- `netlify dev`
    - ouvrir l'url indiquée dans le terminal  

## Franglais :

- Code, nom de fichiers en **anglais**
- Commentaires en **français**
- Commits et PR en **français**


## Travailler sur une feature et l'ajouter au projet :

1. Créer une branche dédiée à la feature : `git checkout -b nom-branche`
2. Développer la feature.
3. Créer une commit : `git add -A && git commit -m "Message de commit"`
4. Upstream et push : `git push -u origin nom-branche`
5. Créer une [pull request](https://github.com/gfroidcourt/iut-onboarding/pulls)
    - Nom valide
    - Description complète de la feature
    - Linker la PR à une issue et projet si possible
    - Assigner au moins 2 reviewers

## Structure du projet

Tout le code logique de l'application vue se trouve dans le dossier `src`.

- `App.js` contrôle quelle vue est actuellement affichée à l'écran.
- Le dossier `views` contient toutes les vues (Pages qui vont être affichées)
- Le dossier `components` contient les composants qui sont utilisés par les vues
- Le dossier `assets`contient toutes les images et ressources du projet.
- La récupération des données externes se fait via les fichiers `.js` :
    - `api.js` Récupération API TBM et API météo.
    - `scrapMeal.js` Récupération menus CROUS (Sirtaki / Space).

***
## Mettre à jour les classes / Id Ical hyperplannings (A faire à chaque changement de semestres)
> Nécéssaire à chaque semestre

- Changer les identifiants de promo dans le fichier : `tools/updateIcals.js` :
```js
// Identifiant de promo à récupérer sur hyperplanning pour ce semestre
const PROMOTIONS = ["INFO_BUT_S2", "INFO DUT S4"];
```

- `node tools/updateIcals.js`

> Ce script lance un chromium en arrière plan (headless), se login à CAS, ouvre hyperplanning et clic sur les différents menus pour aller chercher les lien Ical de toutes les classes / groupes / promos

> Il est donc nécéssaire de donner ses identifiants CAS au moment de l'éxécution

> Le résultat final est stocké dans un fichier JSON qui est ensuite lu par l'application

## Structure du projet

Tout le code logique de l'application vue se trouve dans le dossier `src`.

- `App.js` contrôle quelle vue est actuellement affichée à l'écran.
- Le dossier `views` contient toutes les vues (Pages qui vont être affichées)
- Le dossier `components` contient les composants qui sont utilisés par les vues
- Le dossier `assets`contient toutes les images et ressources du projet.
- La récupération des données externes se fait via les fichiers `.js` :
    - `api.js` Récupération API TBM et API météo.
    - `scrapMeal.js` Récupération menus CROUS (Sirtaki / Space).


La partie hardware (Setup raspberry) est décrite dans le document [RASPBERRY.md](./RASPBERRY.md)

## Déployer le projet

`netlify deploy --prod`
