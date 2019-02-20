
# VpnSwitch
This is a Node based API for switching VPN certificates on a unix box. Contains a service script to add to init.d for automatic API startup.

Instalation:
 1. Place `api` file inside `init.d` directory of the box.
 2. Place the the rest of the contents of the API into `/usr/libexec/api/` directory.
 
 Usage:
 Once installed run `./api start` from within the `init.d` directory.