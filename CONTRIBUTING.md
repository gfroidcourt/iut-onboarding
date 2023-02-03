# Guide de contribution au projet

> IUT Onboarding est un projet entièrement porté par les étudiant de l'IUT Informatique de Bordeaux, il est donc vital de pouvoir assurer la relève et d'avoir un flux continu de mainteneurs.
> C'est dans cette optique de pouvoir garantir un service continu que devenir contributeur du projet permet de prendre le flambeau et de pouvoir le passer aux futurs promos d'étudiant, et pourquoi pas en rendant le projet encore meilleur au passage.

## Maintenir le projet

Voici ce qu'il faut faire en tant que mainteneur pour que le projet perdure dans le temps :

- S'assurer physiquement du bon fonctionnement de la télé, de son alimentation programmée, ainsi que de la raspberry PI.
- S'assurer de la cohérence des planning et mettres à jour les sources Ical tous les semestres.
- Pouvoir afficher de nouvelles vues comme par exemple les publicités lié au recrutement de mainteneurs ou au Discord de promo.
- Connaître la structure du projet et être capable de l'enseigner.

## Installer le projet

> Nécéssite d'avoir node.js installé

0. Installer netlify cli : `npm install netlify-cli -g` (-g ne marchera pas à l'IUT)
1. Clone le projet : `git clone git@github.com:gfroidcourt/iut-onboarding.git`
2. Installer les dépendences : `npm install` (Dans le repertoire du projet)
    - Si vue.js n'est pas installé : `npm i -g @vue` puis `npm i -g @vue/cli` puis `npm i -g netlify`
3. Extensions vscode :
    - vetur (Pour vue.js).
    - eslint (Pour les convention de code).

## Lancer le serveur de développement

- `netlify dev`
    - ouvrir l'url indiquée dans le terminal  

## Franglais (Conventions de nommage):

- Code, nom de fichiers en **anglais**
- Commentaires en **français**
- Commits et PR en **français**

> Il n'y a pas plus de restrictions, pas de conventions sur les commits ou pull requests

## Travailler sur une feature et l'ajouter au projet :

0. [(Fork le proket)](https://github.com/gfroidcourt/iut-onboarding/fork)
1. Créer une branche dédiée à la feature : `git checkout -b nom-branche`
2. Développer la feature. `sudo code --with-talent`
3. Créer une commit : `git add -A` puis `git commit -m "Message de commit"`
4. Upstream et push : `git push -u origin nom-branche`
5. Créer une [pull request](https://github.com/gfroidcourt/iut-onboarding/pulls)
    - Nom valide (Correspond a la feature ajoutée).
    - Description complète de la feature.
    - Linker la PR à une issue et projet si possible.
    - Assigner au moins 2 reviewers.

## Structure du projet

Tout le code logique de l'application vue se trouve dans le dossier `src`.

- `App.js` contrôle quelle vue est actuellement affichée à l'écran.
- Le dossier `views` contient toutes les vues (Pages qui vont être affichées)
- Le dossier `components` contient les composants qui sont utilisés par les vues
- Le dossier `assets`contient toutes les images et ressources du projet.
- La récupération des données externes se fait via les fichiers `.js` :
    - `api.js` Récupération API TBM et API météo.
    - `scrapMeal.js` Récupération menus CROUS (Sirtaki / Space).

## Déployer le projet

Le déploiement du projet est entièrement automatique grace à
 netlify. Dès qu'une pull-request est merge, la feature associée sera disponible sur le site dans les minutes qui suivent.
 
 > Attention le site doit etre rechargé et donc la télé doit être débranchée/rebranchée

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

## Informations projet

Web :

- Les menus s'affichent que le matin.
- Les plannings s'affichent de 8h à 17h30.
- Les planning ont la priorite d'affichage durant les 10 dernieres minutes des pauses.
- La meteo est recuperee au travers d'un API publique.
- Les horraires de bus sont recuperes au travers de l'API publique de TBM.
- Les menus du crous sont recuperes par le scraping du site du CROUS (Aucune API publique).
- On utilise netlify pour deployer le projet automatiquement.
- Netlify permet aussi d'avoir un backend (Proxy netlify.toml et dosier functions).
- Les scraping des menu crous est fait dans le backend netlify.

Raspberry :

- Raspberry 4b+ (Avec le max de RAM et de CPU prcq sinon les anims lagent).
- Connexion internet via le port ethernet a gauche de la tele.
- Il ny a pas d'environnement Desktop, un script permet de lancer X11 puis chromium apres le branchement.

Tele :

- La tele est alimente via un programmateur, normalement les horaires sont 8h-20h mais ca peut se deregler en cas de coupure de courant.
- La telecomande est dans le local de l'asso.
 