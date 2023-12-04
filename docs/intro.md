---
sidebar_position: 1
---

# Introduction

Pod Arcade is an open-source project that enables you to stream games via RetroArch or other compatible software, running on Wayland, directly to your web browser.

It is designed to be deployed on Kubernetes, but can also be deployed using Docker or any other container platform.

There are two major components to Pod Arcade:

- The Pod Arcade Server — an MQTT server manages the game streaming sessions. Desktops and web browsers connect to this server in order to stream games.
- The Pod Arcade Desktop — a desktop application that runs on Wayland and streams games to the Pod Arcade Server.

## Getting Started

