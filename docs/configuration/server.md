---
sidebar_position: 3.1
---

# Server

The Pod Arcade server is an MQTT server that manages the game streaming sessions. Desktops and web browsers connect to this server in order to stream games. The server exposes an HTTP endpoint for serving the web client as well as a websocket endpoint for the MQTT server.

## Configuration

### Server configuration
| Environment Variable | Description | Default |
| --- | --- | --- |
| `ICE_SERVERS` | A JSON string containing a list of ICE servers to use for the web clients. See [ICE Servers](#ice-servers) below for more details | `[]` |
| `AUTH_REQUIRED` | Boolean indicating whether authentication is required for both desktop | `false` |
| `STUN_PORT` | Port number to run the integrated STUN server. Set to -1 to disable | `-1` |
| `HTTP_PORT` | Port number to run the HTTP server off of | `8080` |
| `SERVE_TLS` | Boolean indicating whether or not to serve the web client and mqtt connection over HTTPS | `false` |
| `TLS_PORT` | What port to run the TLS server off of for the HTTPS connections | `8443` |
| `TLS_KEY` | TLS key in PEM format | _disabled_ |
| `TLS_CERT` | TLS certificate in PEM format. If the certificate is signed by a certificate authority, the file should be the concatenation of the server's certificate, any intermediates, and the CA's certificate. | _disabled_ |

### Desktop authentication
| Environment Variable | Description | Default |
| --- | --- | --- |
| `DESKTOP_PSK` | Preshared key with all desktops used for secure registration and communication. If not provided, desktop authentication is disabled. | _disabled_ |

### Client authentication
| Environment Variable | Description | Default |
| --- | --- | --- |
| `CLIENT_PSK` | If provided, will require that the desktop client provide a preshared key (password) before being allowed to connect to the server or any of the Desktops. If not provided and OIDC_SERVER is, OpenID Connect will be used instead, otherwise no auth will be required. | _disabled_ |
| `OIDC_SERVER` | OpenID Connect issuer url. Ex. http://keycloak.example.com/realms/my_realm. If set will redirect the client to the auth provider for login. See [OpenID Configuration](#openid-configuration) below for more details. | _disabled_ |
| `OIDC_CLIENT_ID` | OpenID Connect client id to be used during the login. See [OpenID Configuration](#openid-configuration) below for more details. | _disabled_ |

## ICE Servers
The ICE servers configuration is a JSON string containing an array of objects, each describing one server which may be used by the ICE agent; these are typically STUN and/or TURN servers. If this isn't specified, the connection attempt will be made with no STUN or TURN server available, which limits the connection to local peers. Each object may have the following properties:

- `credential` _Optional_: The credential to use when logging into the server. This is only used if the object represents a TURN server.

- `credentialType` _Optional_: If the object represents a TURN server, this attribute specifies what kind of credential is to be used when connecting. The default is "password".

- `urls`: This required property is an array of strings, each specifying a URL which can be used to connect to the server. Should be in the format "stun:stun.example.org" or "turn:turn.example.org", with an optional transport parameter ("turns" or "stuns", respectively) and an optional port number. If no transport parameter is specified, the server is assumed to be a STUN server. If no port is specified, the default port for the specified transport protocol is used. If multiple URLs are given, they are tried in the order listed until one succeeds.

- `username` _Optional_: If the object represents a TURN server, then this is the username to use during the authentication.

See the [ICE Servers](../design/peer-to-peer.md#ice-servers) section of the connection guide for more details and examples on running your own ICE servers.

## OpenID Connect
The OpenID Connect configuration is used to authenticate the client using an external provider. The client will be redirected to the provider's login page and then redirected back to the client with an authorization code. The client will then exchange the authorization code for an id token and use that to authenticate with the server. The server will then validate the id token against the issuer to validate the connection.

The OpenID Connect client configured must support the `authorization_code` grant type and the `openid` scope, as well as support the `code` response type. It must also be configured with a token endpoint authentication method of "none" to enable the authorization code exchange without a client secret. The client must also be configured with the redirect URI `https://<server>/oidc-callback`. The `<server>` is determined from where the client is served from. For example, If the client is served from `https://pod-arcade.example.com`, then the redirect URI would be `https://pod-arcade.example.com/oidc-callback`.