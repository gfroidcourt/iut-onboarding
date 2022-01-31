## Création d'une image bootable

- Utiliser [Balena etcher](https://www.balena.io/etcher/) pour flasher la carte SD
- Prendre [Raspberry pi OS Lite](https://www.raspberrypi.com/software/operating-systems/)

> Login / pass par défaut : `pi` / `raspberry`

## Connexion à EDUROAM

modifier le fichier : `/etc/network/interfaces` :

```
source-directory /etc/network/interfaces.d

auto lo
iface lo inet loopback

iface eth0 inet manual
wpa-roam /etc/wpa_supplicant/wpa_supplicant.conf

allow-hotplug wlan0
iface wlan0 inet manual
wpa-roam /etc/wpa_supplicant/wpa_supplicant.conf
```

modifier le fichier : `/etc/wap_supplicant/wpa_supplicant.conf` :

```
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1

network={
  ssid="eduroam"
  eap=TTLS
  key_mgmt=WPA-EAP
  phase2="auth=PAP"
  identity="[IDNUM]@u-bordeaux.fr
  anonymous_identity="anonymous@u-bordeaux.fr
  password="******"
}
```

## Setup raspbery

Une fois la raspberry lancée et connectée à internet :

1. Mettre à jour la raspberry : `sudo apt update` et `sudo apt upgrade`
2. Installer les librairie graphiques : `sudo apt-get install --no-install-recommends xserver-xorg x11-xserver-utils xinit openbox``
3. Installer chromium : `sudo apt-get install --no-install-recommends chromium-browser`

## Setup projet

TO DO

## Optimisations

TO DO
