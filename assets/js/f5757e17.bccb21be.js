"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[4211],{5171:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>a,default:()=>h,frontMatter:()=>s,metadata:()=>o,toc:()=>c});var r=n(5893),i=n(1151);const s={sidebar_position:5.1},a="Streaming",o={id:"design/streaming",title:"Streaming",description:"Pod Arcade uses WebRTC to stream video and audio between the Desktop and the Browser. This page will explain how Pod Arcade uses WebRTC to establish a peer-to-peer connection between the Desktop and the Browser, and what some of the design decisions were that influenced the implementation.",source:"@site/docs/design/streaming.md",sourceDirName:"design",slug:"/design/streaming",permalink:"/docs/design/streaming",draft:!1,unlisted:!1,editUrl:"https://github.com/pod-arcade/website/tree/main/docs/design/streaming.md",tags:[],version:"current",sidebarPosition:5.1,frontMatter:{sidebar_position:5.1},sidebar:"tutorialSidebar",previous:{title:"Design",permalink:"/docs/category/design"},next:{title:"Input Emulation",permalink:"/docs/design/input-emulation"}},d={},c=[{value:"Video Codecs",id:"video-codecs",level:2},{value:"Packet loss",id:"packet-loss",level:2},{value:"Audio",id:"audio",level:2}];function l(e){const t={a:"a",h1:"h1",h2:"h2",mermaid:"mermaid",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,i.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{id:"streaming",children:"Streaming"}),"\n",(0,r.jsx)(t.p,{children:"Pod Arcade uses WebRTC to stream video and audio between the Desktop and the Browser. This page will explain how Pod Arcade uses WebRTC to establish a peer-to-peer connection between the Desktop and the Browser, and what some of the design decisions were that influenced the implementation."}),"\n",(0,r.jsx)(t.h2,{id:"video-codecs",children:"Video Codecs"}),"\n",(0,r.jsx)(t.p,{children:"There are many great video codecs to choose from. Being that Pod Arcade is a game streaming platform, the most important factor is latency. The lower the latency, the better the experience. In order to get the lowest latency possible, we have to choose a codec that can be encoded and decoded using hardware acceleration. We also need to choose a codec that can be used by WebRTC in (most) browsers."}),"\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.a,{href:"https://datatracker.ietf.org/doc/html/rfc7742",children:"RFC 7742"})," specifies that all WebRTC-compatible browsers must support VP8 and H.264's Constrained Baseline profile for video. Most devices already have H.264 hardware acceleration built in, and is supported by all major browsers so we will use H.264 for video."]}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Codec"}),(0,r.jsx)(t.th,{children:"Encoding"}),(0,r.jsx)(t.th,{children:"Decoding"}),(0,r.jsx)(t.th,{children:"Compatibility"}),(0,r.jsx)(t.th,{children:"Compression"})]})}),(0,r.jsxs)(t.tbody,{children:[(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.strong,{children:"H.264"})}),(0,r.jsx)(t.td,{children:"Hardware"}),(0,r.jsx)(t.td,{children:"Hardware"}),(0,r.jsx)(t.td,{children:"All Browsers"}),(0,r.jsx)(t.td,{children:"Good"})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.strong,{children:"H.265"})}),(0,r.jsx)(t.td,{children:"Hardware"}),(0,r.jsx)(t.td,{children:"Hardware"}),(0,r.jsx)(t.td,{children:"Safari"}),(0,r.jsx)(t.td,{children:"Great"})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.strong,{children:"VP8"})}),(0,r.jsx)(t.td,{children:"Hardware"}),(0,r.jsx)(t.td,{children:"Hardware"}),(0,r.jsx)(t.td,{children:"All Browsers"}),(0,r.jsx)(t.td,{children:"Poor"})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.strong,{children:"VP9"})}),(0,r.jsx)(t.td,{children:"Hardware"}),(0,r.jsx)(t.td,{children:"Hardware"}),(0,r.jsx)(t.td,{children:"All Browsers"}),(0,r.jsx)(t.td,{children:"Great"})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.strong,{children:"AV1"})}),(0,r.jsx)(t.td,{children:"Software"}),(0,r.jsx)(t.td,{children:"Software"}),(0,r.jsx)(t.td,{children:"Chrome"}),(0,r.jsx)(t.td,{children:"Amazing"})]})]})]}),"\n",(0,r.jsx)(t.p,{children:"H.265 is a great codec, but it is not supported by all browsers, specifically only supported by Safari. It is also not supported by all hardware, and the ecosystem around the codec is very proprietary and closed. For these reasons, we will not be using H.265."}),"\n",(0,r.jsx)(t.p,{children:"VP9 is also a potential candidate, but hasn't been evaluated yet. This is the same codec used by most cloud game streaming services, so may provide a valid alternative to H.264 if the latency is low enough on lower-powered hardware."}),"\n",(0,r.jsx)(t.p,{children:"And finally AV1 would be a perfect candidate for remote streaming, but encoding performance is still not great, and decoding performance is even worse. This codec will be re-evaluated in the future as more hardware support is added."}),"\n",(0,r.jsxs)(t.p,{children:["In the desktop application, video is captured using the ",(0,r.jsx)(t.a,{href:"https://github.com/ammen99/wf-recorder",children:"wf-recorder"})," and piped into Pod Arcade to be packetized and streamed via WebRTC. We hope in the future to migrate this over to Gstreamer to give us more control over the video stream, and allow us to have greater hardware compatibility."]}),"\n",(0,r.jsx)(t.h2,{id:"packet-loss",children:"Packet loss"}),"\n",(0,r.jsx)(t.p,{children:"When designing Pod Arcade we had to be very considerate of packet loss throughout the whole process. Packet loss can occur at any point between the Desktop and the Browser, and can be caused by a number of different factors. The most common cause of packet loss is a poor WiFi connection, but it can also be caused by a poor internet connection, or even a poor connection between the Desktop and the Router."}),"\n",(0,r.jsx)(t.mermaid,{value:"sequenceDiagram\n  participant A as Encoder\n  participant B as Desktop\n  participant C as Client\n  participant D as Decoder\n\n  A ->> B: H.264 Stream\n  B ->> B: Packet Buffer\n  rect green\n  B ->> C: RTP Packet 1\n  C ->> D: RTP Packet 1\n  B ->> C: RTP Packet 2\n  C ->> D: RTP Packet 2\n  end\n  rect red\n  B -X C: RTP Packet 3\n  Note right of C: Packet 3 is lost\n  end\n  rect green\n  B ->> C: RTP Packet 4\n  C --) C: \n  Note right of C: Store Packet 4 in Jitter Buffer\n  end\n  rect rgb(127, 127, 0)\n  Note right of C: Client detects packet 3 is lost<br/>requests retransmission\n  C --\x3e> B: NACK Packet 3\n  B --\x3e> B: Packet Buffer\n  end\n  rect green\n  B ->> C: RTP Packet 5\n  C ->> C: \n  Note right of C: Store Packet 5 in Jitter Buffer\n  end\n  rect rgb(127, 127, 0)\n  B ->> C: RTP Packet 3\n  C ->> D: RTP Packet 3\n  end\n  rect green\n  Note right of C: Replay packets in Jitter Buffer\n  C ->> D: RTP Packet 4\n  C ->> D: RTP Packet 5\n  B ->> C: RTP Packet 6\n  C ->> D: RTP Packet 6\n  end"}),"\n",(0,r.jsx)(t.p,{children:"Whenever a packet is lost, the video stream will freeze until the next packet is received. This can be very jarring and can ruin the experience. In order to mitigate this, WebRTC implements a feature called a Jitter Buffer. The Jitter Buffer will store a number of packets in memory, and will play them back in order, giving ample time for missed packets to be redelivered when it is lost. This will help smooth out the video stream, but will also add latency."}),"\n",(0,r.jsxs)(t.p,{children:["For systems like ",(0,r.jsx)(t.a,{href:"https://moonlight-stream.org/",children:"Moonlight"}),", a jitter buffer is not used. Instead, there is a tighter integration between the streaming client and the video encoder, and whenever a packet is missed, the video encoder will generate a new IDR frame, which will allow the video stream to recover much faster. While overal latency is lower, during high packet loss this can cause the video stream to become very blocky and pixelated, or potentially even use more bandwidth, causing additional pressure to a system that is already losing packets."]}),"\n",(0,r.jsx)(t.p,{children:"We continue to evaluate the best way to handle packet loss, and may implement a similar feature in the future. In the meantime we are working with the WebRTC community to help improve the Jitter Buffer implementation and specifically make the delivery of these packets more robust to keep the latency as low as possible."}),"\n",(0,r.jsx)(t.h2,{id:"audio",children:"Audio"}),"\n",(0,r.jsx)(t.p,{children:"Audio is streamed using the Opus codec. Opus is a great codec for streaming audio, and is supported by all major browsers. It is also supported by most hardware, and is very efficient. It is also a great codec for low-latency audio, which is crucial for a good gaming experience. The alternative to this is G.711, but in our testing has shown to have really low audio quality."}),"\n",(0,r.jsx)(t.p,{children:"In the desktop application all audio is captured from the PulseAudio server using Gstreamer, which is then piped into Pod Arcade to be streamed to the browser."})]})}function h(e={}){const{wrapper:t}={...(0,i.a)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(l,{...e})}):l(e)}},1151:(e,t,n)=>{n.d(t,{Z:()=>o,a:()=>a});var r=n(7294);const i={},s=r.createContext(i);function a(e){const t=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),r.createElement(s.Provider,{value:t},e.children)}}}]);