---
title: Setting up a Server
sidebar_position: 0
---

# Setting up a Server

> :construction: **_PLEASE READ ME BEFORE GETTING STARTED_** :construction:
>
> **_Pod-Arcade is currently in a dynamic phase of development. As we enhance and refine our platform, certain aspects of the deployment process may change or evolve. We appreciate your understanding and patience if you find that some instructions have changed, or are no longer up to date with the code. Please be sure to check back with this page before performing any updates. If you find something that no longer functions as it should, very kindly notify us on Discord._**

## Overview

This document guides you through the process of setting up a self-hosted Pod-Arcade server. This setup is an **_optional_** alternative for users choosing not to utilize the Pod-Arcade cloud solution.

Key Components:

- **Web Interface:** Bundled with the server and accessible from a browser.
- **MQTT Server:** Enables communication between the desktop and client applications. It's accessible at the `/mqtt` endpoint and also via direct MQTT protocol for debugging purposes.

### Default Port Configuration

- **HTTP:** The server is accessible over port `8080` for HTTP connections.
- **HTTPS:** For secure connections, HTTPS is available over port `8443`. By default, it generates a new self-signed certificate each time it starts. You may need to accept the self-signed certificate, or [swap it out](#additional-configuration-options).
- **MQTT:** The MQTT service runs on port `1883`. This port is primarily for ease of debugging, as it publishes various operational statistics. This is the same as connecting to the `/mqtt` endpoint over HTTP or HTTPS.

### Security Considerations

The self-hosted server uses a pre-shared key (PSK) for authentication. This method is less sophisticated compared to the cloud version, which supports diverse authentication methods like Discord. Exercise caution in sharing these PSKs; anyone in possession of your PSK can gain access to your servers and desktops.

## Running The Server

### Helm

There's a pre-written helm chart that lives at [pod-arcade/charts](https://github.com/pod-arcade/charts). This is what we use to deploy Pod Arcade during development.

If you have an ingress controller, you can configure it to generate an ingress for the server. Otherwise, you can use port-forwarding to access the server.

#### Step 1: Add the Pod-Arcade Helm Repository

```bash title="shell"
# Add the Pod-Arcade Helm Repository
helm repo add pod-arcade https://charts.pod-arcade.com/
# Fetch the latest helm releases
helm repo update
```

#### Step 2: Configure the Pod-Arcade Helm Chart

By default, the pod-arcade chart doesn't install any ingress resources, nor configure node-ports. You'll need to configure the chart to expose the server in a way that's accessible to your users. Two example solutions are provided below.

##### I have an ingress controller (recommended)

```yaml title="values-override.yaml"
env:
  AUTH_REQUIRED: true
  DESKTOP_PSK: magicPa$$wordForDesktops
  CLIENT_PSK: magicPa$$wordForClients
  ICE_SERVERS: '[{"urls":["stun:stun.l.google.com:19302"]}]'
  SERVE_TLS: false

ingress:
  enabled: true
  className: "my-ingress-class"
  annotations:
    {}
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
  hosts:
    - host: your.domain.com
  tls:
    - secretName: your-tls-secret
      hosts:
        - your.domain.com
```

##### I do not have an ingress controller

If you don't have an ingress controller, you can run the server exposed through node ports or a load balancer.

```yaml title="values-override.yaml"
env:
  AUTH_REQUIRED: true
  DESKTOP_PSK: magicPa$$wordForDesktops
  CLIENT_PSK: magicPa$$wordForClients
  ICE_SERVERS: '[{"urls":["stun:stun.l.google.com:19302"]}]'
  SERVE_TLS: false

service:
  type: NodePort # or LoadBalancer
  httpPort: 80
  httpNodePort: 30080
  httpsPort: 443
  httpsNodePort: 30443
  mqttPort: 1883
  mqttNodePort: 31883
```

#### Step 3: Install the Pod-Arcade Helm Chart

```bash title="shell"
# Install the pod-arcade chart
helm install pod-arcade-server pod-arcade/server -f values-override.yaml
```

### Docker Compose

In addition to the helm chart, we also have an example deployment using docker-compose in [pod-arcade/example-apps](https://github.com/pod-arcade/example-apps) under apps/server.

### Pure Docker

We don't recommend this, but you can also run the server using pure docker.

```bash title="shell"
docker run -d --name pod-arcade-server \
  -p 1883:1883 \
  -p 8080:8080 \
  -p 8443:8443 \
  -e AUTH_REQUIRED="true" \
  -e DESKTOP_PSK="theMagicStringUsedToAuthenticateDesktops" \
  -e CLIENT_PSK="thePasswordUsersPutInToConnect" \
  -e ICE_SERVERS='[{"urls":["stun:stun.l.google.com:19302"]}]' \
  -e SERVE_TLS="true" \
  ghcr.io/pod-arcade/server:main
```

## Additional Configuration Options

All configuration options are set via environment variables. The following table lists all available options. Note that some of these configuration options, such as `TLS_CERT` and `TLS_KEY`, may require you to mount additional volumes.
If the server is set not to require authentication, you can leave the PSK fields blank.

| Name             | Description                                                                                                                               | Default                                         |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `AUTH_REQUIRED`  | Enable authentication. If you set this to false, you can skip the PSK environment variables.                                              | `true`                                          |
| `OIDC_SERVER`    | **NOT SUPPORTED** Sets the server used for OIDC.                                                                                          | `""`                                            |
| `OIDC_CLIENT_ID` | **NOT SUPPORTED** Sets the client-id used for OIDC. This is used to verify the audience claim.                                            | `""`                                            |
| `DESKTOP_PSK`    | Pre-shared key for desktop authentication.                                                                                                | `""`                                            |
| `CLIENT_PSK`     | Pre-shared key for client (browser) connections.                                                                                          | `""`                                            |
| `ICE_SERVERS`    | STUN server configuration for WebRTC. The browser will use this to find the best route to the desktop.                                    | `'[{"urls":["stun:stun.l.google.com:19302"]}]'` |
| `SERVE_TLS`      | Enable TLS (HTTPS).                                                                                                                       | `false`                                         |
| `TLS_CERT`       | Path to TLS certificate. This should be the entire chain, including any relevant intermediates or CAs.                                    | `"/certs/tls.crt"`                              |
| `TLS_KEY`        | Path to TLS key.                                                                                                                          | `"/certs/tls.key"`                              |
| `TLS_PORT`       | Port for the TLS server. Changing this port may break things.                                                                             | `8443`                                          |
| `STUN_PORT`      | Port for the built-in STUN server. Setting this to -1 disables the STUN server. This is not usually necessary and will be discussed below | `-1`                                            |
