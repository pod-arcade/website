---
sidebar_position: 4.5
---

# Session Page
Once you have connected to a Desktop, you will be taken to the Session page. This is the primary interface for Pod Arcade and is where you will interact with the desktop.

![Session Page](/img/screenshots/session.png)

## Controls
The controls for the session show up whenever you hover your mouse over the video area or tap on the screen if you are on mobile. The controls will automatically hide after a few seconds of inactivity.

### 1. Mouse
This button controls whether or not the mouse is locked to the session. When the mouse is locked, it will be hidden and mouse movements will be passed through directly through to the Desktop. To exit this mode, press the `ESC` key on your keyboard.

### 2. Keyboard
This button controls whether or not the keyboard is locked to the session. When the keyboard is locked, all keyboard input will be passed through directly to the Desktop. To exit this mode, press **and hold** the `ESC` key on your keyboard. If the mouse mode is also enabled during this time, it will be disabled as well.

There are a few special keys that don't get passed through to the Desktop, but these vary based on platform. From our experimentation, with Google Chrome on MacOS, the following keys are not passed through:
- F11
- Ctrl + Arrow Keys

If you find additional keys that are not passed through, please let us know by [opening an issue](https://github.com/pod-arcade/pod-arcade/issues).

### 3. Gamepad
There are up to four buttons that control how gamepads are passed through to the Desktop. Each gamepad button represents one gamepad in the Desktop. When you click on a gamepad, it will prompt you to select a gamepad from the list of available gamepads on your system. If a gamepad doesn't show up immediately, try pressing a few buttons on the gamepad to trigger it in the browser.

### 4. Metrics
When this button is enabled, you will see a set of metrics pop up at the bottom of the screen. These metrics are useful for debugging and troubleshooting issues with your Pod Arcade session. The metrics are as follows:
- **Round Trip Time** - the number of milliseconds it takes to "ping" the Desktop and receive a response. This number is the minimum amount of delay you will receive between interacting with the desktop and seeing a result on the screen. Factors such as your WiFi connection and Internet provider will affect this number.
- **Video Delay** - the number of milliseconds delayed between your browser receiving a video packet and it being displayed on the video stream. The Browser will increase this number dynamically when there is packet loss to smooth out the video playback at the expense of higher latency.
- **Video Bitrate** - the immediate bitrate of the video stream. This number will fluctuate based on the complexity of the video being streamed. The higher the bitrate, the higher the quality of the video.
- **Frames Dropped** - percentage of frames that have been lost due to packet loss. This number should be as close to 0% as possible. If this number is high, you may need to adjust your network settings or adjust the video bitrate on the Desktop.

### 5. Share
(Only on [https://play.pod-arcade.com](https://play.pod-arcade.com))

This button will open a dialog that will allow you to share the current session with other users. You can share the session by creating a link and sending that to your friends. Links can be configured to expire after a certain amount of time. Once a user accepts a share, they will show up in the list of people with access, after which their access can be removed.

### 6. Volume
This section controls the volume of the audio stream. On mobile, the volume slider will not be present, but you can still mute the audio by tapping on the speaker icon. In some cases, you may need to toggle the mute button twice to get the audio to play.

### 7. Full Screen
Pressing this button will take the Session full-screen. On some devices, this functionality may not be supported.

### 8. Back
This button will take you back to the list of Desktops. If you are connected to a Desktop, you will be disconnected from it.

### 9. Session Status
This section shows the current status of the session. The status will be one of the following:
- **New** - Pod Arcade has started the handshake process with the Desktop
- **Connecting** - Pod Arcade has finished the handshake and is attempting a direct connection to the Desktop
- **Connected** - Pod Arcade has established a connection to the Desktop and is streaming video and audio. Video may take a few seconds to appear on the screen.
- **Disconnected** - Pod Arcade has lost connection to the Desktop. This can happen if the Desktop is turned off, or if the network connection is lost
- **Failed** - Pod Arcade was unable to establish a connection to the Desktop. This can happen if the Desktop is turned off, or if the network connection is lost