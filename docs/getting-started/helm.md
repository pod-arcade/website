---
title: Kubernetes (Helm)
description: Install Pod Arcade on Kubernetes using Docker
---

# Kubernetes (Helm)

We provide some reference helm charts for deploying Pod Arcade on Kubernetes, at [pod-arcade/charts](https://github.com/pod-arcade/charts). This is what we use to deploy Pod Arcade during development, and is likely the easiest way to get started.

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