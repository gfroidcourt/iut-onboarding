# Régles de contribution au projet


## Franglais :

- Code en **anglais**
- Commentaires en **français**
- Commits et PR en **français**

***
## Travailler sur une feature et l'ajouter au projet :

- Créer une branche dédiée à la feature : ```git checkout -b nom-branche```
- Développer la feature.
- Créer une commit : ```git add -A && git commit -m "Message de commit"```
- Envoyer la commit et upstream la branche : ```git push -u origin nom-branche```
- [Créer une pull request](https://github.com/git-poule/ndi/pulls)
    - Nom valide en **FR**
    - Description complète de la feature
    - Linker la PR à une issue et projet si possible
    - Assigner au moins 2 reviewers

***
## Installer le projet

- ```git clone git@github.com:gfroidcourt/iut-onboarding.git```
- ```npm install```
- Si non installé : ```npm i -g @vue```
- Si non installé : ```npm i -g @vue/cli```
- Si non installé : ```npm i -g netlify```

***
## Lancer le serveur de développement

- ```netlify dev```
***
## Mettre à jour les classes / Id Ical hyperplannings (A faire à chaque changement de semestres)
> Nécéssaire à chaque semestre

- ```node src/scrapHyperplanning.js```

> Ce script lance un chromium en arrière plan (headless), se login à CAS, ouvre hyperplanning et clic sur les différents menus pour aller chercher les lien Ical de toutes les classes / groupes / promos

> Il est donc nécéssaire de donner ses identifiants CAS au moment de l'éxécution

> Le résultat final est stocké dans un fichier JSON qui est ensuite lu par l'application

***
