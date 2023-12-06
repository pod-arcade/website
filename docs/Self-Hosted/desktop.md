---
title: Setting up a Desktop
sidebar_position: 1
---

# Setting up a Desktop


After setting up a self-hosted server, the next step is to set up some desktop applications to connect back to it. If you haven't yet set up a server, you'll want to do that first before continuing.

Desktop Applications are the "game servers" that run on your computer. They're essentially desktop applications running in a docker container, and are responsible for running games, and streaming the video and audio to the client (web-browser). They also receive input from the client, and send it to the game.

They connect to the server using a pre-shared key (PSK) that you set up when you configured the server. This is how clients discover the available desktops.

## Prerequesites

There are a few things from the host that need to be mounted in, in order for the desktop to work properly.

### Hardware Acceleration

If you have a graphics card installed in your server, you can pass it through to the docker container in order to run games and video encoding with hardware acceleration. This is highly recommended, as it will significantly improve performance. It does not require exclusive access, and multiple different desktops running on the same machine can share the same graphics card.

This is done by essentially volume mounting in `/dev/dri` to `/host/dev/dri`. This is done automatically by helm, but if you're running the docker container manually, you'll need to do this yourself.

### Gamepad Input

Gamepad Input is handled slightly different. Contrary to what you might expect, this breaks the container isolation boundaries slightly. The desktop needs to be able to access the host's `/dev/uinput` device, which is done by volume mounting `/dev/uinput` to `/host/dev/uinput`. The Pod-Arcade desktop will then use this device to create virtual gamepads, which are then passed through to the game. ***GAMEPADS CREATED BY THE DESKTOP WILL BE VISIBLE TO THE HOST***.

In Linux, there's a program that runs on the host called `udev` that manages mapping access to your devices; udev is the userspace device manager. Your host operating system is almost guaranteed to be running this. It will pick up on every gamepad created by the desktops. If you're running your desktops on a dedicated server, this likely isn't an issue, since none of the programs running on the host will care about gamepads. **The desktops themselves filter out any gamepads created by another desktop instance**, so you won't have any issues with gamepads being visible to the wrong desktop. They will however be visible to the host.