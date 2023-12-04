---
title: Setting up a Server
sidebar_position: 0
---
# Setting up a Server :construction:

> :construction: ***PLEASE READ ME:***
>  ***It's likely that these instructions are going to change. Pod-Arcade is still under very development, and these deployment methods are rudimentary at best. Please be understanding if these instructions are no longer up to date.***

## Overview

This guide covers the steps required to set up a Pod Arcade server.

This component is **_NOT REQUIRED_** if you're using the pod-arcade cloud solution. This is a drop-in replacement for the cloud solution for users that wish to run their own server. If you're looking for the cloud solution.

The Pod-Arcade server consists of two major components, the web interface that's accessible from the browser, and the MQTT server that relays messages between the desktop and client.

## Helm

There's a pre-written helm chart that lives at [pod-arcade/charts](https://github.com/pod-arcade/charts). This is what we use to deploy Pod Arcade during development.

If you have an ingress controller, you can configure it to generate an ingress for the server. Otherwise, you can use port-forwarding to access the server.

### Step 1: Add the Pod-Arcade Helm Repository

```bash title="shell"
# Add the Pod-Arcade Helm Repository
helm repo add pod-arcade https://charts.pod-arcade.com/
# Fetch the latest helm releases
helm repo update
```

### Step 2: Configure the Pod-Arcade Helm Chart

By default, the pod-arcade chart doesn't install any ingress resources, nor configure node-ports. You'll need to configure the chart to expose the server in a way that's accessible to your users. Two example solutions are provided below.

#### I have an ingress controller

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
  annotations: {}
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
  hosts: 
    - host: your.domain.com
  tls: 
    - secretName: your-tls-secret
      hosts:
        - your.domain.com
```

#### I do not have an ingress controller

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

### Step 3: Install the Pod-Arcade Helm Chart

```bash title="shell"
# Install the pod-arcade chart
helm install pod-arcade-server pod-arcade/server -f values-override.yaml
```

## Docker Compose

In addition to the helm chart, we also have an example deployment using docker-compose in [pod-arcade/example-apps](https://github.com/pod-arcade/example-apps) under apps/server.

## Pure Docker

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