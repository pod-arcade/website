---
title: Setting up a Desktop
sidebar_position: 1
---

# Setting up a Desktop

> :construction: **_PLEASE READ ME BEFORE GETTING STARTED_** :construction:
>
> **_Pod-Arcade is currently in a dynamic phase of development. As we enhance and refine our platform, certain aspects of the deployment process may change or evolve. We appreciate your understanding and patience if you find that some instructions have changed, or are no longer up to date with the code. Please be sure to check back with this page before performing any updates. If you find something that no longer functions as it should, very kindly notify us on Discord._**

## Introduction

After setting up a self-hosted server, the next step is to set up some desktop applications to connect back to it. If you haven't yet set up a server, you'll want to do that first before continuing.

Desktop Applications are the "game servers" that run on your computer. They're essentially desktop applications running in a docker container, and are responsible for running games, and streaming the video and audio to the client (web-browser). They also receive input from the client, and send it to the game.

They connect to the server using a pre-shared key (PSK) that you set up when you configured the server. This is how clients discover the available desktops.

## Prerequisites

To ensure the desktop functions correctly, several host resources need to be integrated:

### Hardware Acceleration

If your server has a graphics card, you can enhance performance by enabling hardware acceleration in the Docker container.

- **Method**: Volume mount `/dev/dri` on the host to `/host/dev/dri` in the container.
- **Supported Devices**: Right now we only support AMD GPUs. We can't guarantee it will or won't work on any other hardware.
- **Automated in Helm and Docker-Compose**: This step is automatically handled in the Helm deployment.
- **Manual in Docker**: If deploying via Docker, manually perform this volume mount.

### Gamepad Input

Gamepad input management requires access to the host's `/dev/uinput` for creating virtual gamepads.

- **Method**: Mount `/dev/uinput` from the host to `/host/dev/uinput` in the container.
- **Host Visibility**: Gamepads created by the desktop are visible on the host system.
- **UDev and Desktop Isolation**: The host's `udev` will detect these virtual gamepads, and make them visible to the host. Desktops are programmed to ignore gamepads created by other desktop instances, ensuring proper isolation. However, these gamepads will still be visible to the host.

## Helm

Helm runs the desktop and the sidecar container separately. This means that the dekstop and applications can be updated independently of eachother. It also means that if one component crashes, the other can usually recover gracefully. For example, if the desktop crashes, the game will continue running in the sidecar container, and you can reconnect to it once the desktop container restarts.

#### Step 1: Add the Pod-Arcade Helm Repository

You've likely already done this step if you've setup and installed a pod-arcade server.

```bash title="shell"
# Add the Pod-Arcade Helm Repository
helm repo add pod-arcade https://charts.pod-arcade.com/
# Fetch the latest helm releases
helm repo update
```

#### Step 2: Configure the Pod-Arcade Helm Chart

```yaml title="values-override.yaml"
nodeSelector:
  feature.node.kubernetes.io/cpu-model.vendor_id: AMD # Used to select our servers with AMD integrated graphics.
env:
  MQTT_HOST: ws://pod-arcade-server/mqtt # This is the URL of the Pod-Arcade server.
  DESKTOP_ID: pa-retroarch # A unique identifier for this desktop. It should be [a-z0-9-]+.
  DESKTOP_PSK: magicPa$$wordForDesktops # This is the pre-shared key for desktop authentication

sidecar:
  image:
    # This is an excellent example image from guys who do fantastic work.
    repository: gameonwhales/retroarch
    pullPolicy: IfNotPresent
    tag: "edge"
  storage:
    enabled: true # Enable Storage
    create: true # Automatically create the PVC
    storageClass: "ssd" # Storage class to use
    size: 25Gi # Size of the provisioned storage
    mounts:
      "/": "/home/ubuntu/.config/retroarch"
```

#### Step 3: Install the Pod-Arcade Helm Chart

```bash title="shell"
# Install the pod-arcade desktop-sidecar chart
helm install pod-arcade-retroarch pod-arcade/desktop-sidecar -f values-override.yaml
```

## Docker-Compose

We offer a few different example configurations in the [pod-arcade/example-apps](https://github.com/pod-arcade/example-apps). For ease of use, many of these examples embed both the desktop program (yuzu, retroarch, etc.), and desktop image into one. This is a perfectly valid way of running pod-arcade desktops, though the images can become quite large.

Below is an example pulled from that repo for running a desktop with the yuzu emulator. It's worth noting that we do not maintain or support these images in the same way that we do the desktops and server. They're provided as a convenience and example of how you can build your own desktop, and are not guaranteed to be up to date or function.

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
      - ./home-dir:/home/ubuntu
volumes:
  yuzu-home-dir:
```

## Pure Docker

We don't recommend this, but you can also run the desktop using pure docker. This is that same example from docker-compose, but converted into a docker run command.

```bash title="shell"
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
