---
title: Docker
description: Install Pod Arcade using Docker
---

# Docker

Run the server component with this. You should be able to connect using https://localhost:8443. You may need to accept the self-signed certificate.
If that doesn't work, you may need to generate your own certificate and key, add that to your trust store, mount it into the container, and set the `TLS_CERT` and `TLS_KEY` environment variables to the path you mounted them to. Alternatively, [chrome has a flag that will allow you to ignore invalid certificates on localhost](chrome://flags/#allow-insecure-localhost).

```bash
docker run -it --rm --name pa-server \
  -p 1883:1883 \
  -p 8080:8080 \
  -p 8443:8443 \
  -e DESKTOP_PSK="theMagicStringUsedToAuthenticateDesktops" \
  -e CLIENT_PSK="thePasswordUsersPutInToConnect" \
  -e ICE_SERVERS='[{"urls":["stun:stun.l.google.com:19302"]}' \
  -e AUTH_REQUIRED="true" \
  -e SERVE_TLS="true" \
 ghcr.io/pod-arcade/server:main
```

and run an example retroarch client with:

```bash
docker volume create pa-desktop-dri
docker run -it --rm --user 0 --privileged --link pa-server:pa-server \
  -e WAYLAND_DISPLAY=wayland-1 \
  -e MQTT_HOST="ws://pa-server:8080/mqtt" \
  -e DESKTOP_ID=example-retroarch \
  -e DESKTOP_PSK="theMagicStringUsedToAuthenticateDesktops" \
  -e DISABLE_HW_ACCEL='false' \
  -e DISPLAY=':0' \
  -e DRI_DEVICE_MODE=MKNOD \
  -e FFMPEG_HARDWARE='1' \
  -e PGID='1000' \
  -e PUID='1000' \
  -e PULSE_SERVER='unix:/tmp/pulse/pulse-socket' \
  -e UINPUT_DEVICE_MODE=NONE \
  -e UNAME=ubuntu \
  -e WLR_BACKENDS=headless \
  -e WLR_NO_HARDWARE_CURSORS='1' \
  -e WLR_RENDERER=gles2 \
  -e XDG_RUNTIME_DIR=/tmp/sway \
  -v /dev/dri:/dev/host-dri \
  -v /dev/uinput:/dev/uinput \
  -v pa-desktop-dri:/dev/dri \
 ghcr.io/pod-arcade/desktop:main
```

### Docker Compose

There's docker-compose for running desktops in [pod-arcade/example-apps](https://github.com/pod-arcade/example-apps)

You'll need to set some of the environment variables to have it connect to the Pod Arcade server. Just be careful which example applications you look at. Many of those pod-arcade/example-apps simply use the built in VNC server to stream the desktop to the browser, not Pod Arcade. That's because it's much faster to do development that way, and will be compatible with pod-arcade if the VNC approach works.

