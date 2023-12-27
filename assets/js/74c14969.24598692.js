"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[6761],{5565:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>a,default:()=>h,frontMatter:()=>s,metadata:()=>i,toc:()=>c});var o=t(5893),r=t(1151);const s={title:"Docker",description:"Install Pod Arcade using Docker"},a=void 0,i={id:"getting-started/docker",title:"Docker",description:"Install Pod Arcade using Docker",source:"@site/docs/getting-started/docker.md",sourceDirName:"getting-started",slug:"/getting-started/docker",permalink:"/docs/getting-started/docker",draft:!1,unlisted:!1,editUrl:"https://github.com/pod-arcade/website/tree/main/docs/getting-started/docker.md",tags:[],version:"current",frontMatter:{title:"Docker",description:"Install Pod Arcade using Docker"},sidebar:"tutorialSidebar",previous:{title:"Getting Started",permalink:"/docs/category/getting-started"},next:{title:"Kubernetes (Helm)",permalink:"/docs/getting-started/helm"}},d={},c=[{value:"Docker Compose",id:"docker-compose",level:2},{value:"Server",id:"server",level:3},{value:"Desktop",id:"desktop",level:3},{value:"Pure Docker",id:"pure-docker",level:2},{value:"Troubleshooting",id:"troubleshooting",level:2},{value:"I can&#39;t connect to the server",id:"i-cant-connect-to-the-server",level:4},{value:"The Desktop won&#39;t connect to the server",id:"the-desktop-wont-connect-to-the-server",level:4}];function l(e){const n={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",h4:"h4",p:"p",pre:"pre",...(0,r.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(n.p,{children:["We offer a few different example configurations in the ",(0,o.jsx)(n.a,{href:"https://github.com/pod-arcade/example-apps",children:"pod-arcade/example-apps"}),"."]}),"\n",(0,o.jsxs)(n.p,{children:["For ease of use, many of these examples embed both the desktop program (yuzu, retroarch, etc.), and desktop image into one. These images have the ",(0,o.jsx)(n.code,{children:"-aio"})," suffix on them."]}),"\n",(0,o.jsx)(n.p,{children:"This is a perfectly valid way of running pod-arcade desktops, though the images can become quite large. This is in contrast to how we recommend running them with helm, where we have a separate image for both the application and the desktop images (which allows you to update the two images separately)."}),"\n",(0,o.jsx)(n.p,{children:"It's also worth noting that we do not maintain or support these images in the same way that we do the desktop and server images. They're provided as a convenience and example of how you can build your own all-in-one desktop, but are not guaranteed to be up to date or function."}),"\n",(0,o.jsx)(n.h2,{id:"docker-compose",children:"Docker Compose"}),"\n",(0,o.jsx)(n.h3,{id:"server",children:"Server"}),"\n",(0,o.jsxs)(n.p,{children:["Below is an example of running the server and a desktop using docker-compose. You should be able to connect to it using ",(0,o.jsx)(n.code,{children:"https://<SERVER_IP>:8443"}),". You may need to accept the self-signed certificate."]}),"\n",(0,o.jsx)(n.admonition,{type:"note",children:(0,o.jsxs)(n.p,{children:["If you are using ",(0,o.jsx)(n.a,{href:"https://play.pod-arcade.com",children:"https://play.pod-arcade.com"})," you can skip this step completely and go straight to the ",(0,o.jsx)(n.a,{href:"#desktop",children:"desktop configuration"}),"."]})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-yaml",metastring:'title="docker-compose.yaml"',children:'version: "3"\n\nservices:\n  server:\n    image: ghcr.io/pod-arcade/server:v1\n    restart: on-failure\n    networks: [pod-arcade]\n    ports:\n      - "8443:8443" # HTTPS Web Port (the one you should connect to)\n    environment:\n      - CLIENT_PSK=passwordForClients\n      - DESKTOP_PSK=magicPa$$wordForDesktops\n      - ICE_SERVERS=\'[{"urls":["stun:stun.l.google.com:19302"]}]\'\nnetworks:\n  pod-arcade:\n'})}),"\n",(0,o.jsx)(n.h3,{id:"desktop",children:"Desktop"}),"\n",(0,o.jsxs)(n.p,{children:["Below is an example pulled from the ",(0,o.jsx)(n.a,{href:"https://github.com/pod-arcade/example-apps",children:"pod-arcade/example-apps"})," repo for running an all-in-one desktop for the Yuzu emulator."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-yaml",metastring:'title="docker-compose.yaml"',children:"# ...\n  yuzu:\n    image: ghcr.io/pod-arcade/example-yuzu-aio:main\n    restart: on-failure\n    privileged: true\n    networks: [pod-arcade]\n    environment:\n      - RESOLUTION=1920x1080\n\n      # If you are using play.pod-arcade.com you can skip these three variables\n      - DESKTOP_ID=yuzu-all-in-one\n      - DESKTOP_PSK=magicPa$$wordForDesktops\n      - MQTT_HOST=ws://server:8080/mqtt\n\n      # If you are using play.pod-arcade.com, you need to add your CLOUD_AUTH_KEY as shared in the installation instructions\n      # - CLOUD_AUTH_KEY=PAD-NOT-REAL\n    volumes:\n      - /dev/dri:/host/dev/dri\n      - /dev/uinput:/host/dev/uinput\n      - yuzu-home-dir:/home/ubuntu\nvolumes:\n  yuzu-home-dir:\n# ...\n"})}),"\n",(0,o.jsx)(n.h2,{id:"pure-docker",children:"Pure Docker"}),"\n",(0,o.jsxs)(n.p,{children:["The following docker command should be enough to get the server up and running. You should then be able to connect using ",(0,o.jsx)(n.a,{href:"https://localhost:8443",children:"https://localhost:8443"}),"."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:'docker run -it --rm --name pa-server \\\n  -p 8443:8443 \\\n  -e DESKTOP_PSK="theMagicStringUsedToAuthenticateDesktops" \\\n  -e CLIENT_PSK="thePasswordUsersPutInToConnect" \\\n  -e ICE_SERVERS=\'[{"urls":["stun:stun.l.google.com:19302"]}]\' \\\n  -e AUTH_REQUIRED="true" \\\n  -e SERVE_TLS="true" \\\n  ghcr.io/pod-arcade/server:v1\n'})}),"\n",(0,o.jsx)(n.p,{children:"and run an example yuzu all-in-one client with:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"docker volume create yuzu-home-dir\n\ndocker run -it --privileged --name pa-yuzu \\\n  --link pa-server:pa-server \\\n  -e RESOLUTION='1920x1080' \\\n  # If you are using play.pod-arcade.com you can skip these three variables\n  -e DESKTOP_ID=yuzu-all-in-one \\\n  -e DESKTOP_PSK='theMagicStringUsedToAuthenticateDesktops' \\\n  -e MQTT_HOST=ws://pa-server:8080/mqtt \\\n  # If you are using play.pod-arcade.com, you need to add your CLOUD_AUTH_KEY as shared in the installation instructions \\\n  # -e CLOUD_AUTH_KEY=PAD-NOT-REAL \\\n  -v yuzu-home-dir:/home/ubuntu \\\n  -v /dev/dri:/host/dev/dri \\\n  -v /dev/uinput:/host/dev/uinput \\\n  ghcr.io/pod-arcade/example-yuzu-aio:main\n"})}),"\n",(0,o.jsx)(n.h2,{id:"troubleshooting",children:"Troubleshooting"}),"\n",(0,o.jsx)(n.h4,{id:"i-cant-connect-to-the-server",children:"I can't connect to the server"}),"\n",(0,o.jsxs)(n.p,{children:["Be sure you're connecting to the HTTPS port. You may need to accept the self-signed certificate. If that doesn't work, you may need to generate your own certificate and key. Check out the ",(0,o.jsx)(n.a,{href:"/docs/configuration/server",children:"server configuration"})," for more details."]}),"\n",(0,o.jsx)(n.h4,{id:"the-desktop-wont-connect-to-the-server",children:"The Desktop won't connect to the server"}),"\n",(0,o.jsx)(n.p,{children:"Ensure that the DESKTOP_PSK matches between the server and the desktop."})]})}function h(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(l,{...e})}):l(e)}},1151:(e,n,t)=>{t.d(n,{Z:()=>i,a:()=>a});var o=t(7294);const r={},s=o.createContext(r);function a(e){const n=o.useContext(s);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),o.createElement(s.Provider,{value:n},e.children)}}}]);