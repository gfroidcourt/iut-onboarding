## Création d'une image bootable

- Utiliser [Balena etcher](https://www.balena.io/etcher/) pour flasher la carte SD
- Prendre [Raspberry pi OS Lite](https://www.raspberrypi.com/software/operating-systems/)

## Connexion internet

### IUT :

La connexion internet se fait par ethernet.

Un configuration reseau a ete attribue par les administrateurs reseau et a ete hardcode dansles fichier de config.

TODO : Decrire config actuelle

### Reseau WIFI personnel (Pour de la configuration) :

- Creer un fichier ssh dans la carte sd bootable.
- Creer un fichier `wpa_supplicant.conf` dans la carte sd :
  - Ajouter les information du reseau WIFI:
```
  country=FR
  ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
  network={
      ssid="YOUR_NETWORK_NAME"
      psk="YOUR_PASSWORD"
  }
```

- Lancer la raspberry et se connecter en ssh dessus.

## Setup raspbery

Une fois la raspberry lancée et connectée à internet :

1. Mettre à jour la raspberry : `sudo apt update` et `sudo apt upgrade`
2. Installer les librairie graphiques : `sudo apt-get install --no-install-recommends xserver-xorg x11-xserver-utils xinit openbox`
3. Installer git :
4. Installer chromium : `sudo apt-get install --no-install-recommends chromium-browser`

## Setup projet

TO DO

## Optimisations

TO DO
