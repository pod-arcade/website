---
title: Docker
description: Install Pod Arcade using Docker
---

We offer a few different example configurations in the [pod-arcade/example-apps](https://github.com/pod-arcade/example-apps).

For ease of use, many of these examples embed both the desktop program (yuzu, retroarch, etc.), and desktop image into one. These images have the `-aio` suffix on them.

This is a perfectly valid way of running pod-arcade desktops, though the images can become quite large. This is in contrast to how we recommend running them with helm, where we have a separate image for both the application and the desktop images (which allows you to update the two images separately).

It's also worth noting that we do not maintain or support these images in the same way that we do the desktop and server images. They're provided as a convenience and example of how you can build your own all-in-one desktop, but are not guaranteed to be up to date or function.

## Docker Compose

Below is an example of running the server and a desktop using docker-compose. You should be able to connect to it using https://localhost:8443. You may need to accept the self-signed certificate.

### Server

```yaml title="docker-compose.yaml"
version: "3"

services:
  server:
    image: ghcr.io/pod-arcade/server:main
    restart: on-failure
    ports:
      - "8080:8080" # HTTP Web Port (likely won't work without a TLS LB in front)
      - "8443:8443" # HTTPS Web Port (the one you should connect to)
    privileged: true
    environment:
      CLIENT_PSK: passwordForClients
      DESKTOP_PSK: magicPa$$wordForDesktops
      ICE_SERVERS: '[{"urls":["stun:stun.l.google.com:19302"]}]'
```

### Desktop

Below is an example pulled from the [pod-arcade/example-apps](https://github.com/pod-arcade/example-apps) repo for running an all-in-one desktop for the Yuzu emulator.

```yaml title="docker-compose.yaml"
version: "3"

services:
  yuzu:
    image: ghcr.io/pod-arcade/example-yuzu-aio:main
    restart: on-failure
    privileged: true
    environment:
      - MQTT_HOST=ws://localhost:8080/mqtt
      - DESKTOP_ID=yuzu-all-in-one
      - DESKTOP_PSK=magicPa$$wordForDesktops
      - RESOLUTION=1920x1080
    volumes:
      - /dev/dri:/host/dev/dri
      - /dev/uinput:/host/dev/uinput
      - yuzu-home-dir:/home/ubuntu
volumes:
  yuzu-home-dir:
```

## Pure Docker

The following docker command should be enough to get the server up and running. You should then be able to connect using https://localhost:8443. 

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

and run an example yuzu all-in-one client with:

```bash
docker volume create yuzu-home-dir

docker run --restart on-failure --privileged \ 
 -e MQTT_HOST=ws://localhost:8080/mqtt \ 
 -e DESKTOP_ID=yuzu-all-in-one \ 
 -e DESKTOP_PSK='magicPa$$wordForDesktops' \ 
 -e RESOLUTION='1920x1080' \ 
 -v ./home-dir:/home/ubuntu \ 
 -v /dev/dri:/host/dev/dri \ 
 -v /dev/uinput:/host/dev/uinput \ 
ghcr.io/pod-arcade/example-yuzu-aio:main

```

## Troubleshooting

#### I can't connect to the server

Be sure you're connecting to the HTTPS port. You may need to accept the self-signed certificate. If that doesn't work, you may need to generate your own certificate and key. Check out the [server configuration](../configuration/server.md) for more details.

#### The Desktop won't connect to the server

  Ensure that the DESKTOP_PSK matches between the server and the desktop.
