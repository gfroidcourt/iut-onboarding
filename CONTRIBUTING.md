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
    - Nom valide en FR
    - Description complète de la feature
    - Linker la PR à une issue et projet si possible
    - Assigner au moins 2 reviewers

***
## Installer le projet

- ```git clone git@github.com:gfroidcourt/iut-onboarding.git```
- ```npm install```
- Si non installé : ```npm i -g @vue```
- Si non installé : ```npm i -g @vue/cli```

***
## Lancer le serveur de développement

- ```npm run serve```
***