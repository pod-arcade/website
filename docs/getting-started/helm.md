---
title: Kubernetes (Helm)
description: Install Pod Arcade on Kubernetes using Docker
---

Kubernetes is the recommended way to deploy Pod Arcade. It's how we do our development. For Desktops, it also deploys differently than it does with pure Docker. 

We deploy the desktops and applications as separate containers, which allows us to update them independently. This means that you can share the same base Desktop image across multiple applications.

## Deploying with Helm

We provide some reference helm charts for deploying Pod Arcade on Kubernetes, at [pod-arcade/charts](https://github.com/pod-arcade/charts).

To get started simply add the helm repository:
```bash
helm repo add pod-arcade https://charts.pod-arcade.com
```

Then install the server component:
```bash
helm install pa-server pod-arcade/server
```
you can find the values.yaml file for the server chart [here](https://github.com/pod-arcade/charts/blob/main/charts/server/values.yaml). Reference the [server configuration](../configuration/server.md#server-configuration) for more information on the configuration options.

Then install a desktop component:
```bash
helm install pa-desktop pod-arcade/desktop-sidecar
```
the values.yaml file for the desktop chart can be found [here](https://github.com/pod-arcade/charts/blob/main/charts/desktop-sidecar/values.yaml). Reference the [desktop configuration](../configuration/desktop.md#desktop-configuration) for more information on the configuration options.


## Example Configurations

## Server

You can run the server component with or without an ingress controller. Below are two example values files for each.

```yaml title="values-ingress.yaml"
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

```yaml title="values-loadbalancer.yaml"
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

## Desktop

The Desktop configuration is a little bit simpler. Here's an example of a values file for the desktop chart. It uses the wonderful Retroarch image created by games-on-whales.

```yaml title="values.yaml"
nodeSelector:
  feature.node.kubernetes.io/cpu-model.vendor_id: AMD # Used to select our servers with AMD integrated graphics.
env:
  MQTT_HOST: ws://pa-server-server/mqtt # This is the URL of the Pod-Arcade server.
  DESKTOP_ID: pa-retroarch # A unique identifier for this desktop. It should be [a-z0-9-]+.
  DESKTOP_PSK: magicPa$$wordForDesktops # This is the pre-shared key for desktop authentication

sidecar:
  image:
    # This is an excellent image from games-on-whales.
    repository: gameonwhales/retroarch
    pullPolicy: IfNotPresent
    tag: "edge"
  storage:
    enabled: true # Enable Storage
    create: true # Automatically create the PVC
    storageClass: "ssd" # Storage class to use
    size: 25Gi # Size of the provisioned storage
    mounts: # A map of paths to mount from the PVC to the container
      "/": "/home/ubuntu/.config/retroarch"
```