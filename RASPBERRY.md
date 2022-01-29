## EDUROAM Wifi connection :

`/etc/network/interfaces` :

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

`/etc/wap_supplicant/wpa_supplicant.conf` :

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
