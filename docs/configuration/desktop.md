---
sidebar_position: 3.2
---

# Desktop

The Pod Arcade desktop is a containerized application that runs on a virtual "desktop" and connects to the server. It is responsible for running the games and streaming the video and audio to the client over WebRTC. It also receives input from the server and sends it to the game.

## Configuration

### Desktop configuration

| Environment Variable | Description                                                                                                                                                                                             | Default                |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `DESKTOP_ID`         | This is the human-readable name of the desktop. It should be unique and match the regex `[a-z0-9-]+`. It must not start or end with a `-`                                                               | `pa-desktop`           |
| `VIDEO_QUALITY`      | This is a numeric value between 0–51, where 0 is lossless and 51 is the worst quality possible. This will significantly affect video bitrate                                                            | `30`                   |
| `VIDEO_PROFILE`      | This is the h264 profile to use. It's typically `constrained_baseline`, `baseline`, `main`, or `high`. We don't recommend changing this, as you'll need to understand which h264 encoder is being used. | `constrained_baseline` |
| `ICE_SERVERS`        | A JSON string containing a list of ICE servers to use for the web clients. See [ICE Servers](#ice-servers) below for more details                                                                       | `[]`                   |

### Desktop authentication

| Environment Variable | Description                                                                                                                             | Default                |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `MQTT_HOST`          | A way of connecting to the MQTT Broker. Typically `ws://localhost:8080/mqtt` or `wss://your.domain.here:443/mqtt` for https deployments | `tcp://localhost:1883` |
| `DESKTOP_PSK`        | Preshared key with all desktops used for secure registration and communication. If not provided, desktop authentication is disabled.    | _disabled_             |

## Port Forwarding

While the best experience is typically leaving these two environment variables disabled, there are some cases where you may find it necessary to enable them. In the case where your router has a symmetric NAT, it may be impossible to connect to your desktop without port forwarding. In this case, you can enable port forwarding by setting `WEBRTC_PORT` to the port you want to forward and `WEBRTC_IPS` to the external IP address of your router. To learn more about forwarding ports with Pod Arcade, see the [Port Forwarding](../../design/peer-to-peer/#port-forwarding) section of the design documentation.

The forwarded port on your router ***must be the same*** as the port that the desktop is listening on.

| Environment Variable | Description                           | Default    |
| -------------------- | ------------------------------------- | ---------- |
| `WEBRTC_PORT`        | Port to be used when port-forwarding. | `0`        |
| `WEBRTC_IPS`         | External IP address of your router    | _disabled_ |

## ICE Servers

The ICE servers configuration is a JSON string containing an array of objects, each describing one server which may be used by the ICE agent; these are typically STUN and/or TURN servers. If this isn't specified, the connection attempt will be made with no STUN or TURN server available, which limits the connection to local peers. Each object may have the following properties:

- `credential` _Optional_: The credential to use when logging into the server. This is only used if the object represents a TURN server.

- `credentialType` _Optional_: If the object represents a TURN server, this attribute specifies what kind of credential is to be used when connecting. The default is "password".

- `urls`: This required property is an array of strings, each specifying a URL which can be used to connect to the server. Should be in the format "stun:stun.example.org" or "turn:turn.example.org", with an optional transport parameter ("turns" or "stuns", respectively) and an optional port number. If no transport parameter is specified, the server is assumed to be a STUN server. If no port is specified, the default port for the specified transport protocol is used. If multiple URLs are given, they are tried in the order listed until one succeeds.

- `username` _Optional_: If the object represents a TURN server, then this is the username to use during the authentication.

See the [ICE Servers](../design/peer-to-peer.md#ice-servers) section of the connection guide for more details and examples on running your own ICE servers.
