(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,33120,e=>{"use strict";var s=e.i(43476),t=e.i(71645);let a=[{id:"notice",stepNumber:1,title:"1. Notice the Signals",desc:"Filtering daily model and tooling announcements to isolate genuinely distinct mechanisms.",tag:"OBSERVED",color:"#16A34A",metric:"Filter: novel mechanism"},{id:"try",stepNumber:2,title:"2. Sandbox Trial",desc:"Running candidate patterns in local tests to verify what the model actually does.",tag:"TESTED",color:"#16A34A",metric:"Target: reproducible behavior"},{id:"noise",stepNumber:3,title:"Pruned: Speculative Layers",desc:"Cutting away thin wrappers, fragile prompt chains, and ungrounded claims.",tag:"PRUNED ✕",color:"#DC2626",metric:"Action: discard failure mode"},{id:"understand",stepNumber:4,title:"3. Deconstruct Boundaries",desc:"Tracing failure points, memory limits, and where orchestration breaks down.",tag:"INSPECTED",color:"#16A34A",metric:"Scope: boundary limits"},{id:"apply",stepNumber:5,title:"4. Practical Integration",desc:"Wiring verified primitives into shipping code with explicit verification gates.",tag:"BUILT",color:"#16A34A",metric:"Check: passes gate"},{id:"useful",stepNumber:6,title:"Retained: Durable Architecture",desc:"What remains: verifiable primitives and clear boundaries that hold up under review.",tag:"RETAINED ✓",color:"#16A34A",metric:"Outcome: verified contract"}];e.s(["default",0,function(){let[e,r]=(0,t.useState)(null),[o,n]=(0,t.useState)(0),i=a.find(s=>s.id===e);return(0,s.jsxs)("div",{className:"relative w-full max-w-[500px] flex flex-col p-5 sm:p-6 rounded-2xl bg-white/85 border border-[#EAE8E2] shadow-sm backdrop-blur-sm",children:[(0,s.jsx)("style",{children:`
        /* ── BOTANICAL LINE-ART GROWTH ANIMATION ── */
        @keyframes drawTrellisVert {
          0% { stroke-dashoffset: 450; opacity: 0; }
          30% { opacity: 0.85; }
          100% { stroke-dashoffset: 0; opacity: 0.85; }
        }
        @keyframes drawTrellisHoriz {
          0% { stroke-dashoffset: 140; opacity: 0; }
          40% { opacity: 0.85; }
          100% { stroke-dashoffset: 0; opacity: 0.85; }
        }
        .anim-trellis-vert {
          stroke-dasharray: 450;
          stroke-dashoffset: 450;
          animation: drawTrellisVert 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .anim-trellis-horiz {
          stroke-dasharray: 140;
          stroke-dashoffset: 140;
          animation: drawTrellisHoriz 0.5s ease-out 0.15s forwards;
        }

        @keyframes drawPotRim {
          0% { stroke-dashoffset: 280; opacity: 0; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes drawPotBody {
          0% { stroke-dashoffset: 350; opacity: 0; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes fadeInHatch {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes unfurlBasal {
          0% { transform: scale(0.15); opacity: 0; }
          70% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .anim-pot-rim {
          stroke-dasharray: 280;
          stroke-dashoffset: 280;
          animation: drawPotRim 0.5s ease-out 0.1s forwards;
        }
        .anim-pot-body {
          stroke-dasharray: 350;
          stroke-dashoffset: 350;
          animation: drawPotBody 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards;
        }
        .anim-pot-hatch {
          opacity: 0;
          animation: fadeInHatch 0.4s ease-out 0.3s forwards;
        }
        .anim-basal {
          transform-box: fill-box;
          transform-origin: center bottom;
          opacity: 0;
          animation: unfurlBasal 0.5s cubic-bezier(0.34, 1.4, 0.64, 1) 0.25s forwards;
        }

        @keyframes growStem {
          0% { stroke-dashoffset: 485; }
          100% { stroke-dashoffset: 0; }
        }
        .anim-vine-stem {
          stroke-dasharray: 485;
          stroke-dashoffset: 485;
          animation: growStem 1.4s cubic-bezier(0.25, 0.9, 0.35, 1) 0.35s forwards;
        }

        @keyframes drawBranch {
          0% { stroke-dashoffset: 90; opacity: 0; }
          20% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes unfurlLeaf {
          0% { transform: scale(0.12) rotate(-6deg); opacity: 0; }
          65% { transform: scale(1.08) rotate(1deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes shearCut {
          0% { stroke-dashoffset: 40; opacity: 0; }
          25% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes revealAnnotation {
          0% { opacity: 0; transform: translateY(4px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        /* 1. Apply */
        .anim-branch-apply {
          stroke-dasharray: 90;
          stroke-dashoffset: 90;
          animation: drawBranch 0.25s ease-out 0.55s forwards;
        }
        .anim-leaf-apply {
          transform-box: fill-box;
          transform-origin: top right;
          opacity: 0;
          animation: unfurlLeaf 0.45s cubic-bezier(0.34, 1.35, 0.64, 1) 0.62s forwards;
        }
        .anim-ann-apply {
          opacity: 0;
          animation: revealAnnotation 0.35s ease-out 0.75s forwards;
        }

        /* 2. Noise / Pruned */
        .anim-branch-noise {
          stroke-dasharray: 90;
          stroke-dashoffset: 90;
          animation: drawBranch 0.25s ease-out 0.80s forwards;
        }
        .anim-cut-noise {
          stroke-dasharray: 40;
          stroke-dashoffset: 40;
          opacity: 0;
          animation: shearCut 0.18s ease-out 0.88s forwards;
        }
        .anim-leaf-noise {
          transform-box: fill-box;
          transform-origin: top left;
          opacity: 0;
          animation: unfurlLeaf 0.45s ease-out 0.94s forwards;
        }
        .anim-ann-noise {
          opacity: 0;
          animation: revealAnnotation 0.35s ease-out 1.00s forwards;
        }

        /* 3. Understand */
        .anim-branch-understand {
          stroke-dasharray: 90;
          stroke-dashoffset: 90;
          animation: drawBranch 0.25s ease-out 0.98s forwards;
        }
        .anim-leaf-understand {
          transform-box: fill-box;
          transform-origin: top right;
          opacity: 0;
          animation: unfurlLeaf 0.45s cubic-bezier(0.34, 1.35, 0.64, 1) 1.05s forwards;
        }
        .anim-ann-understand {
          opacity: 0;
          animation: revealAnnotation 0.35s ease-out 1.18s forwards;
        }

        /* 4. Try */
        .anim-branch-try {
          stroke-dasharray: 90;
          stroke-dashoffset: 90;
          animation: drawBranch 0.25s ease-out 1.18s forwards;
        }
        .anim-leaf-try {
          transform-box: fill-box;
          transform-origin: top left;
          opacity: 0;
          animation: unfurlLeaf 0.45s cubic-bezier(0.34, 1.35, 0.64, 1) 1.25s forwards;
        }
        .anim-ann-try {
          opacity: 0;
          animation: revealAnnotation 0.35s ease-out 1.38s forwards;
        }

        /* 5. Notice */
        .anim-branch-notice {
          stroke-dasharray: 90;
          stroke-dashoffset: 90;
          animation: drawBranch 0.25s ease-out 1.40s forwards;
        }
        .anim-leaf-notice {
          transform-box: fill-box;
          transform-origin: top right;
          opacity: 0;
          animation: unfurlLeaf 0.45s cubic-bezier(0.34, 1.35, 0.64, 1) 1.48s forwards;
        }
        .anim-ann-notice {
          opacity: 0;
          animation: revealAnnotation 0.35s ease-out 1.60s forwards;
        }

        /* 6. Useful */
        .anim-leaf-useful {
          transform-box: fill-box;
          transform-origin: bottom center;
          opacity: 0;
          animation: unfurlLeaf 0.5s cubic-bezier(0.34, 1.4, 0.64, 1) 1.72s forwards;
        }
        .anim-ann-useful {
          opacity: 0;
          animation: revealAnnotation 0.35s ease-out 1.90s forwards;
        }

        @keyframes sapPulse {
          0% { stroke-dashoffset: 485; opacity: 0; }
          15% { opacity: 0.95; }
          85% { opacity: 0.95; }
          100% { stroke-dashoffset: -20; opacity: 0; }
        }
        .sap-stream {
          stroke-dasharray: 28 200;
          opacity: 0;
          animation: sapPulse 3.8s ease-in-out infinite 2.15s;
          filter: drop-shadow(0 0 5px rgba(22, 163, 74, 0.5));
        }

        @media (prefers-reduced-motion: reduce) {
          .anim-trellis-vert,
          .anim-trellis-horiz,
          .anim-pot-rim,
          .anim-pot-body,
          .anim-pot-hatch,
          .anim-basal,
          .anim-vine-stem,
          [class*="anim-branch-"],
          [class*="anim-leaf-"],
          [class*="anim-ann-"],
          .anim-cut-noise,
          .sap-stream {
            animation: none !important;
            stroke-dashoffset: 0 !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }

        .botanical-leaf-group {
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), filter 0.35s ease;
          transform-box: fill-box;
          transform-origin: 50% 80%;
        }
        .botanical-leaf-path {
          transition: fill 0.35s ease, stroke 0.35s ease, filter 0.35s ease;
        }
        .botanical-leaf-group:hover,
        .botanical-leaf-group.is-active {
          transform: scale(1.12) translateY(-2px);
        }
        .botanical-leaf-group:hover .botanical-leaf-path,
        .botanical-leaf-group.is-active .botanical-leaf-path {
          fill: #DCFCE7 !important;
          stroke: #16A34A !important;
          filter: drop-shadow(0 4px 12px rgba(22, 163, 74, 0.35));
        }
        .botanical-leaf-group.is-pruned:hover,
        .botanical-leaf-group.is-pruned.is-active {
          transform: scale(0.96) translateY(2px);
        }
        .botanical-leaf-group.is-pruned:hover .botanical-leaf-path,
        .botanical-leaf-group.is-pruned.is-active .botanical-leaf-path {
          fill: #FEE2E2 !important;
          stroke: #DC2626 !important;
          filter: drop-shadow(0 3px 10px rgba(220, 38, 38, 0.35));
        }
      `}),(0,s.jsxs)("div",{className:"flex items-center justify-between border-b border-[#F0EEEA] pb-3 mb-2 select-none",children:[(0,s.jsxs)("div",{className:"flex items-center gap-2",children:[(0,s.jsx)("span",{className:"w-2 h-2 rounded-full bg-[#16A34A] animate-pulse"}),(0,s.jsx)("span",{className:"font-mono text-[11px] font-bold tracking-wider text-[#121212] uppercase",children:"BOTANICAL TOPOLOGY"})]}),(0,s.jsxs)("div",{className:"flex items-center gap-3",children:[(0,s.jsxs)("button",{type:"button",onClick:()=>n(e=>e+1),title:"Replay growth animation",className:"inline-flex items-center gap-1 font-mono text-[10px] text-[#7A7872] hover:text-[#121212] transition-colors uppercase cursor-pointer",children:[(0,s.jsxs)("svg",{width:"11",height:"11",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,s.jsx)("path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}),(0,s.jsx)("path",{d:"M21 3v5h-5"}),(0,s.jsx)("path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}),(0,s.jsx)("path",{d:"M3 21v-5h5"})]}),(0,s.jsx)("span",{children:"REPLAY"})]}),(0,s.jsx)("span",{className:"font-mono text-[10px] text-[#D5D2C9]",children:"|"}),(0,s.jsx)("span",{className:"font-mono text-[10px] text-[#7A7872] tracking-wider uppercase",children:"SYS.LIFECYCLE // LIVE"})]})]}),(0,s.jsx)("div",{className:"w-full aspect-[1/1.12] flex items-center justify-center",children:(0,s.jsxs)("svg",{viewBox:"0 0 540 600",className:"w-full h-full text-[#121212] select-none overflow-visible","aria-label":"Hand-crafted botanical pothos vine climbing an architectural trellis",children:[(0,s.jsx)("defs",{children:(0,s.jsxs)("linearGradient",{id:"sapGlow",x1:"0%",y1:"100%",x2:"0%",y2:"0%",children:[(0,s.jsx)("stop",{offset:"0%",stopColor:"#16A34A",stopOpacity:"0.1"}),(0,s.jsx)("stop",{offset:"50%",stopColor:"#22C55E",stopOpacity:"0.95"}),(0,s.jsx)("stop",{offset:"100%",stopColor:"#86EFAC",stopOpacity:"0.3"})]})}),(0,s.jsxs)("g",{stroke:"#E6E2D8",strokeWidth:"1.75",strokeLinecap:"round",opacity:"0.85",children:[(0,s.jsx)("line",{x1:"225",y1:"50",x2:"225",y2:"480",className:"anim-trellis-vert"}),(0,s.jsx)("line",{x1:"270",y1:"30",x2:"270",y2:"480",className:"anim-trellis-vert"}),(0,s.jsx)("line",{x1:"315",y1:"50",x2:"315",y2:"480",className:"anim-trellis-vert"}),(0,s.jsx)("line",{x1:"205",y1:"75",x2:"335",y2:"75",className:"anim-trellis-horiz"}),(0,s.jsx)("line",{x1:"205",y1:"155",x2:"335",y2:"155",className:"anim-trellis-horiz"}),(0,s.jsx)("line",{x1:"205",y1:"235",x2:"335",y2:"235",className:"anim-trellis-horiz"}),(0,s.jsx)("line",{x1:"205",y1:"315",x2:"335",y2:"315",className:"anim-trellis-horiz"}),(0,s.jsx)("line",{x1:"205",y1:"395",x2:"335",y2:"395",className:"anim-trellis-horiz"})]}),(0,s.jsxs)("g",{children:[(0,s.jsx)("ellipse",{cx:"270",cy:"495",rx:"68",ry:"12",fill:"#FAF9F6",stroke:"#121212",strokeWidth:"1.75",className:"anim-pot-rim"}),(0,s.jsx)("path",{d:"M204 495 C206 558, 216 576, 226 584 C236 590, 304 590, 314 584 C324 576, 334 558, 336 495",fill:"none",stroke:"#121212",strokeWidth:"1.75",strokeLinejoin:"round",className:"anim-pot-body"}),(0,s.jsxs)("g",{className:"anim-pot-hatch",children:[(0,s.jsx)("path",{d:"M218 515 C220 548, 224 564, 230 574",fill:"none",stroke:"#D4D0C7",strokeWidth:"1",strokeDasharray:"3 3"}),(0,s.jsx)("path",{d:"M322 515 C320 548, 316 564, 310 574",fill:"none",stroke:"#D4D0C7",strokeWidth:"1",strokeDasharray:"3 3"}),(0,s.jsx)("ellipse",{cx:"270",cy:"495",rx:"58",ry:"7",fill:"none",stroke:"#A8A29E",strokeWidth:"0.8",strokeDasharray:"2 3"})]})]}),(0,s.jsxs)("g",{stroke:"#121212",strokeWidth:"1.3",fill:"#FAF9F6",className:"anim-basal",children:[(0,s.jsx)("path",{d:"M216 490 C194 476, 174 498, 188 520 C202 536, 230 510, 216 490 Z"}),(0,s.jsx)("path",{d:"M216 490 C204 506, 196 516, 188 520",fill:"none",stroke:"#78716C",strokeWidth:"0.8"}),(0,s.jsx)("path",{d:"M250 488 C232 505, 244 532, 262 525 C276 516, 268 494, 250 488 Z"}),(0,s.jsx)("path",{d:"M250 488 C254 506, 258 518, 262 525",fill:"none",stroke:"#78716C",strokeWidth:"0.8"}),(0,s.jsx)("path",{d:"M316 488 C338 476, 354 500, 342 522 C328 536, 304 508, 316 488 Z"}),(0,s.jsx)("path",{d:"M316 488 C328 506, 336 516, 342 522",fill:"none",stroke:"#78716C",strokeWidth:"0.8"})]}),(0,s.jsx)("path",{d:"M270 492 C264 420, 296 375, 290 295 C284 225, 320 160, 324 90 C326 65, 342 45, 350 25",fill:"none",stroke:"#121212",strokeWidth:"2.4",strokeLinecap:"round",className:"anim-vine-stem"}),(0,s.jsx)("path",{d:"M270 492 C264 420, 296 375, 290 295 C284 225, 320 160, 324 90 C326 65, 342 45, 350 25",fill:"none",stroke:"url(#sapGlow)",strokeWidth:"3.2",strokeLinecap:"round",className:"sap-stream pointer-events-none"}),(0,s.jsxs)("g",{children:[(0,s.jsxs)("g",{className:`botanical-leaf-group cursor-pointer ${"apply"===e?"is-active":""}`,onMouseEnter:()=>r("apply"),onMouseLeave:()=>r(null),onClick:()=>r("apply"===e?null:"apply"),children:[(0,s.jsx)("path",{d:"M270 425 C244 415, 220 422, 204 436",fill:"none",stroke:"#121212",strokeWidth:"1.5",className:"anim-branch-apply"}),(0,s.jsxs)("g",{className:"anim-leaf-apply",children:[(0,s.jsx)("path",{d:"M204 436 C174 422, 152 454, 172 480 C192 496, 220 466, 204 436 Z",className:"botanical-leaf-path",fill:"#FAF9F6",stroke:"#121212",strokeWidth:"1.5"}),(0,s.jsx)("path",{d:"M204 436 C188 458, 178 472, 172 480",fill:"none",stroke:"#121212",strokeWidth:"1"})]})]}),(0,s.jsxs)("g",{className:"anim-ann-apply cursor-pointer",onMouseEnter:()=>r("apply"),onMouseLeave:()=>r(null),onClick:()=>r("apply"===e?null:"apply"),children:[(0,s.jsx)("polyline",{points:"162,458 120,458 100,458",fill:"none",stroke:"apply"===e?"#16A34A":"#78716C",strokeWidth:"0.8",strokeDasharray:"2 2"}),(0,s.jsx)("circle",{cx:"162",cy:"458",r:"apply"===e?"4.5":"2.5",fill:"apply"===e?"#16A34A":"#121212"}),(0,s.jsx)("text",{x:"90",y:"462",textAnchor:"end",className:`font-mono text-[11px] tracking-wider transition-colors ${"apply"===e?"font-bold fill-[#16A34A]":"fill-[#121212]"}`,children:"apply"})]})]}),(0,s.jsxs)("g",{children:[(0,s.jsxs)("g",{className:`botanical-leaf-group is-pruned cursor-pointer ${"noise"===e?"is-active":""}`,onMouseEnter:()=>r("noise"),onMouseLeave:()=>r(null),onClick:()=>r("noise"===e?null:"noise"),children:[(0,s.jsx)("path",{d:"M292 335 C310 325, 322 330, 332 338",fill:"none",stroke:"#8A8780",strokeWidth:"1.5",className:"anim-branch-noise"}),(0,s.jsx)("line",{x1:"334",y1:"322",x2:"324",y2:"348",stroke:"#DC2626",strokeWidth:"2.5",strokeLinecap:"round",className:"anim-cut-noise"}),(0,s.jsxs)("g",{className:"anim-leaf-noise",children:[(0,s.jsx)("path",{d:"M334 340 C356 352, 374 366, 388 380",fill:"none",stroke:"#8A8780",strokeWidth:"1.4",strokeDasharray:"4 3"}),(0,s.jsx)("path",{d:"M388 380 C410 368, 428 390, 414 406 C398 418, 378 400, 388 380 Z",className:"botanical-leaf-path",fill:"#FAF9F6",stroke:"#A8A29E",strokeWidth:"1.2",strokeDasharray:"3 2"}),(0,s.jsx)("path",{d:"M388 380 C400 394, 408 402, 414 406",fill:"none",stroke:"#A8A29E",strokeWidth:"0.8",strokeDasharray:"2 2"})]})]}),(0,s.jsxs)("g",{className:"anim-ann-noise cursor-pointer",onMouseEnter:()=>r("noise"),onMouseLeave:()=>r(null),onClick:()=>r("noise"===e?null:"noise"),children:[(0,s.jsx)("text",{x:"338",y:"322",textAnchor:"start",className:"font-mono text-[10px] fill-[#78716C]",children:"pruned"}),(0,s.jsx)("polyline",{points:"414,398 434,398 446,398",fill:"none",stroke:"#DC2626",strokeWidth:"0.8",strokeDasharray:"2 2"}),(0,s.jsx)("circle",{cx:"414",cy:"398",r:"noise"===e?"4.5":"2.5",fill:"#DC2626"}),(0,s.jsx)("text",{x:"452",y:"402",textAnchor:"start",className:"font-mono text-[11px] font-bold tracking-wider fill-[#DC2626]",children:"noise ✕"})]})]}),(0,s.jsxs)("g",{children:[(0,s.jsxs)("g",{className:`botanical-leaf-group cursor-pointer ${"understand"===e?"is-active":""}`,onMouseEnter:()=>r("understand"),onMouseLeave:()=>r(null),onClick:()=>r("understand"===e?null:"understand"),children:[(0,s.jsx)("path",{d:"M290 295 C262 285, 238 290, 222 274",fill:"none",stroke:"#121212",strokeWidth:"1.5",className:"anim-branch-understand"}),(0,s.jsxs)("g",{className:"anim-leaf-understand",children:[(0,s.jsx)("path",{d:"M222 274 C190 256, 168 290, 192 320 C216 340, 248 304, 222 274 Z",className:"botanical-leaf-path",fill:"#FAF9F6",stroke:"#121212",strokeWidth:"1.5"}),(0,s.jsx)("path",{d:"M222 274 C204 298, 196 312, 192 320",fill:"none",stroke:"#121212",strokeWidth:"1"}),(0,s.jsx)("path",{d:"M214 286 C202 283, 192 288, 188 294",fill:"none",stroke:"#78716C",strokeWidth:"0.7"}),(0,s.jsx)("path",{d:"M206 302 C212 306, 218 312, 220 316",fill:"none",stroke:"#78716C",strokeWidth:"0.7"})]})]}),(0,s.jsxs)("g",{className:"anim-ann-understand cursor-pointer",onMouseEnter:()=>r("understand"),onMouseLeave:()=>r(null),onClick:()=>r("understand"===e?null:"understand"),children:[(0,s.jsx)("polyline",{points:"178,298 135,298 115,298",fill:"none",stroke:"understand"===e?"#16A34A":"#78716C",strokeWidth:"0.8",strokeDasharray:"2 2"}),(0,s.jsx)("circle",{cx:"178",cy:"298",r:"understand"===e?"4.5":"2.5",fill:"understand"===e?"#16A34A":"#121212"}),(0,s.jsx)("text",{x:"105",y:"302",textAnchor:"end",className:`font-mono text-[11px] tracking-wider transition-colors ${"understand"===e?"font-bold fill-[#16A34A]":"fill-[#121212]"}`,children:"understand"})]})]}),(0,s.jsxs)("g",{children:[(0,s.jsxs)("g",{className:`botanical-leaf-group cursor-pointer ${"try"===e?"is-active":""}`,onMouseEnter:()=>r("try"),onMouseLeave:()=>r(null),onClick:()=>r("try"===e?null:"try"),children:[(0,s.jsx)("path",{d:"M302 225 C326 214, 348 220, 362 204",fill:"none",stroke:"#121212",strokeWidth:"1.5",className:"anim-branch-try"}),(0,s.jsxs)("g",{className:"anim-leaf-try",children:[(0,s.jsx)("path",{d:"M362 204 C394 188, 416 222, 396 252 C378 270, 348 236, 362 204 Z",className:"botanical-leaf-path",fill:"#FAF9F6",stroke:"#121212",strokeWidth:"1.5"}),(0,s.jsx)("path",{d:"M362 204 C378 228, 388 244, 396 252",fill:"none",stroke:"#121212",strokeWidth:"1"}),(0,s.jsx)("path",{d:"M370 216 C382 213, 392 218, 396 224",fill:"none",stroke:"#78716C",strokeWidth:"0.7"}),(0,s.jsx)("path",{d:"M378 230 C372 236, 364 240, 362 246",fill:"none",stroke:"#78716C",strokeWidth:"0.7"})]})]}),(0,s.jsxs)("g",{className:"anim-ann-try cursor-pointer",onMouseEnter:()=>r("try"),onMouseLeave:()=>r(null),onClick:()=>r("try"===e?null:"try"),children:[(0,s.jsx)("polyline",{points:"405,230 430,230 445,230",fill:"none",stroke:"try"===e?"#16A34A":"#78716C",strokeWidth:"0.8",strokeDasharray:"2 2"}),(0,s.jsx)("circle",{cx:"405",cy:"230",r:"try"===e?"4.5":"2.5",fill:"try"===e?"#16A34A":"#121212"}),(0,s.jsx)("text",{x:"452",y:"234",textAnchor:"start",className:`font-mono text-[11px] tracking-wider transition-colors ${"try"===e?"font-bold fill-[#16A34A]":"fill-[#121212]"}`,children:"try"})]})]}),(0,s.jsxs)("g",{children:[(0,s.jsxs)("g",{className:`botanical-leaf-group cursor-pointer ${"notice"===e?"is-active":""}`,onMouseEnter:()=>r("notice"),onMouseLeave:()=>r(null),onClick:()=>r("notice"===e?null:"notice"),children:[(0,s.jsx)("path",{d:"M310 145 C282 134, 258 140, 240 124",fill:"none",stroke:"#121212",strokeWidth:"1.5",className:"anim-branch-notice"}),(0,s.jsxs)("g",{className:"anim-leaf-notice",children:[(0,s.jsx)("path",{d:"M240 124 C208 106, 186 140, 206 170 C224 190, 256 156, 240 124 Z",className:"botanical-leaf-path",fill:"#FAF9F6",stroke:"#121212",strokeWidth:"1.5"}),(0,s.jsx)("path",{d:"M240 124 C222 146, 214 162, 206 170",fill:"none",stroke:"#121212",strokeWidth:"1"}),(0,s.jsx)("path",{d:"M232 136 C220 133, 210 138, 206 144",fill:"none",stroke:"#78716C",strokeWidth:"0.7"}),(0,s.jsx)("path",{d:"M224 150 C230 154, 236 160, 238 164",fill:"none",stroke:"#78716C",strokeWidth:"0.7"})]})]}),(0,s.jsxs)("g",{className:"anim-ann-notice cursor-pointer",onMouseEnter:()=>r("notice"),onMouseLeave:()=>r(null),onClick:()=>r("notice"===e?null:"notice"),children:[(0,s.jsx)("polyline",{points:"195,148 145,148 125,148",fill:"none",stroke:"notice"===e?"#16A34A":"#78716C",strokeWidth:"0.8",strokeDasharray:"2 2"}),(0,s.jsx)("circle",{cx:"195",cy:"148",r:"notice"===e?"4.5":"2.5",fill:"notice"===e?"#16A34A":"#121212"}),(0,s.jsx)("text",{x:"115",y:"152",textAnchor:"end",className:`font-mono text-[11px] tracking-wider transition-colors ${"notice"===e?"font-bold fill-[#16A34A]":"fill-[#121212]"}`,children:"notice"})]})]}),(0,s.jsxs)("g",{children:[(0,s.jsx)("g",{className:`botanical-leaf-group cursor-pointer ${"useful"===e?"is-active":""}`,onMouseEnter:()=>r("useful"),onMouseLeave:()=>r(null),onClick:()=>r("useful"===e?null:"useful"),children:(0,s.jsxs)("g",{className:"anim-leaf-useful",children:[(0,s.jsx)("path",{d:"M350 25 C370 8, 396 30, 380 54 C362 70, 340 46, 350 25 Z",className:"botanical-leaf-path",fill:"#C6E9D0",stroke:"#16A34A",strokeWidth:"2"}),(0,s.jsx)("path",{d:"M350 25 C364 40, 372 48, 380 54",fill:"none",stroke:"#16A34A",strokeWidth:"1.2"})]})}),(0,s.jsxs)("g",{className:"anim-ann-useful cursor-pointer",onMouseEnter:()=>r("useful"),onMouseLeave:()=>r(null),onClick:()=>r("useful"===e?null:"useful"),children:[(0,s.jsx)("polyline",{points:"384,40 416,40 430,40",fill:"none",stroke:"#16A34A",strokeWidth:"0.8",strokeDasharray:"2 2"}),(0,s.jsx)("circle",{cx:"384",cy:"40",r:"useful"===e?"5":"2.5",fill:"#16A34A"}),(0,s.jsx)("text",{x:"438",y:"44",textAnchor:"start",className:"font-mono text-[11px] font-bold tracking-wider fill-[#16A34A]",children:"useful ✓"})]})]})]},o)}),(0,s.jsx)("div",{className:"pt-3 mt-1 border-t border-[#F0EEEA] flex items-center justify-between min-h-[34px] text-[11px] font-mono select-none",children:i?(0,s.jsxs)("div",{className:"flex items-center justify-between w-full transition-all",children:[(0,s.jsxs)("div",{className:"flex items-center gap-2",children:[(0,s.jsx)("span",{className:"text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded",style:{backgroundColor:"noise"===i.id?"#FEE2E2":"#DCFCE7",color:i.color},children:i.tag}),(0,s.jsx)("span",{className:"font-semibold text-[#121212]",children:i.title})]}),(0,s.jsx)("span",{className:"text-[10px] font-semibold",style:{color:i.color},children:i.metric})]}):(0,s.jsxs)("div",{className:"flex items-center justify-between w-full text-[#8A8780] text-[10px]",children:[(0,s.jsxs)("span",{className:"flex items-center gap-1.5",children:[(0,s.jsx)("span",{className:"w-1.5 h-1.5 rounded-full bg-[#16A34A]"}),"Hover or tap any leaf node to inspect lifecycle"]}),(0,s.jsx)("span",{className:"text-[#16A34A] font-semibold",children:"6 STAGES"})]})})]})}])},3713,e=>{"use strict";var s=e.i(43476),t=e.i(71645);function a({project:e}){let[r,o]=(0,t.useState)(0),[n,i]=(0,t.useState)(!1),l=e.tabs[r]||e.tabs[0],c=l.lines.join("\n"),d=async()=>{try{await navigator.clipboard.writeText(c),i(!0),setTimeout(()=>i(!1),2e3)}catch{i(!1)}};return(0,s.jsxs)("div",{className:"flex flex-col h-full rounded-xl bg-white border border-[#EAE8E2] overflow-hidden shadow-2xs hover:border-[#D5D2C9] transition-all",children:[(0,s.jsxs)("div",{className:"p-5 border-b border-[#EAE8E2] flex flex-col justify-between min-h-[145px]",children:[(0,s.jsxs)("div",{className:"flex items-center gap-2 flex-wrap",children:[(0,s.jsx)("span",{className:"font-mono text-[10px] uppercase font-bold text-[#16A34A] tracking-wider bg-[#DCFCE7] px-2 py-0.5 rounded",children:e.status}),(0,s.jsx)("span",{className:"font-mono text-[10px] text-[#7A7872] uppercase tracking-wider",children:"Repository Sourced"})]}),(0,s.jsx)("h3",{className:"font-heading font-bold text-base text-[#121212] pt-2",children:e.title}),(0,s.jsx)("p",{className:"text-xs text-[#55534E] leading-relaxed pt-1 line-clamp-2",children:e.summary})]}),(0,s.jsxs)("div",{className:"flex items-center justify-between px-3 bg-[#1E1E1E] text-xs font-mono border-b border-[#333333] h-10 shrink-0",children:[(0,s.jsx)("div",{className:"flex items-center gap-1 overflow-x-auto",children:e.tabs.map((e,t)=>(0,s.jsx)("button",{type:"button",onClick:()=>o(t),"aria-pressed":r===t,className:`px-3 py-2 text-[11px] transition-colors cursor-pointer ${r===t?"text-white bg-[#2D2D2D] font-bold border-b-2 border-[#16A34A]":"text-[#888888] hover:text-[#CCCCCC]"}`,children:e.title},e.title))}),(0,s.jsxs)("div",{className:"flex items-center gap-3",children:[(0,s.jsxs)("a",{href:l.sourceUrl,target:"_blank",rel:"noopener noreferrer",className:"text-[10px] text-[#A3A3A3] hover:text-white underline decoration-[#555555] underline-offset-2 hidden sm:inline truncate max-w-[220px] transition-colors",title:"Inspect public source file on GitHub",children:[l.filename," · ",l.ref," ↗"]}),(0,s.jsx)("button",{type:"button",onClick:d,className:"px-2 py-1 text-[10px] rounded bg-[#2D2D2D] hover:bg-[#3D3D3D] text-[#CCCCCC] transition-colors cursor-pointer flex items-center gap-1 shrink-0",title:"Copy exact file excerpt",children:n?(0,s.jsx)("span",{className:"text-[#86EFAC] font-bold",children:"✓ Copied"}):(0,s.jsx)("span",{children:"📋 Copy"})})]})]}),(0,s.jsx)("div",{className:"p-4 bg-[#181818] font-mono text-xs text-[#E5E5E5] overflow-x-auto h-[180px] leading-relaxed select-text flex-1",children:(0,s.jsx)("pre",{className:"m-0",children:(0,s.jsx)("code",{children:l.lines.map((e,t)=>(0,s.jsxs)("div",{className:"table-row",children:[(0,s.jsx)("span",{className:"table-cell pr-4 text-[#555555] select-none text-[10px] text-right",children:t+1}),(0,s.jsx)("span",{className:"table-cell whitespace-pre",children:e})]},t))})})}),(0,s.jsxs)("div",{className:"px-4 py-3 bg-[#FAF9F6] border-t border-[#EAE8E2] text-xs leading-relaxed",children:[(0,s.jsxs)("a",{href:l.sourceUrl,target:"_blank",rel:"noopener noreferrer",className:"underline underline-offset-4 text-[#55534E] break-words",children:["Inspect source: ",l.filename," at ",l.ref," ",(0,s.jsx)("span",{"aria-hidden":"true",children:"↗"})]}),(0,s.jsx)("p",{className:"text-[#7A7872] mt-1",children:"The excerpt above is source material. The summary and boundary are editorial interpretation."})]}),(0,s.jsxs)("div",{className:"px-4 py-2.5 bg-[#FAF9F6] border-t border-[#EAE8E2] text-[11px] font-mono text-[#55534E] leading-relaxed",children:[(0,s.jsx)("span",{className:"font-bold text-[#121212]",children:"Boundary: "}),(0,s.jsx)("span",{children:e.boundary})]}),(0,s.jsxs)("div",{className:"px-4 py-3 bg-[#FAF9F6] border-t border-[#EAE8E2] flex items-center justify-between text-xs font-mono shrink-0 h-12",children:[(0,s.jsx)("span",{className:"text-[#7A7872]",children:e.role}),(0,s.jsxs)("a",{href:e.href,target:"_blank",rel:"noopener noreferrer",className:"text-[#121212] font-semibold hover:text-[#16A34A] transition-colors flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#121212] rounded",children:[(0,s.jsx)("span",{children:"Inspect Repository"}),(0,s.jsx)("span",{children:"→"})]})]})]})}e.s(["ProjectCard",0,a,"default",0,function({projects:e}){return(0,s.jsx)("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch",children:e.map(e=>(0,s.jsx)(a,{project:e},e.title))})}])},78873,e=>{"use strict";var s=e.i(43476),t=e.i(71645),a=e.i(22016);function r({tool:e}){let[o,n]=(0,t.useState)(!1),i=async()=>{try{await navigator.clipboard.writeText(e.installCmd),n(!0),setTimeout(()=>n(!1),2e3)}catch{n(!1)}};return(0,s.jsxs)("div",{className:"p-5 rounded-xl bg-white border border-[#EAE8E2] flex flex-col justify-between hover:border-[#121212] transition-all shadow-2xs h-full",children:[(0,s.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,s.jsxs)("div",{className:"flex items-center justify-between",children:[(0,s.jsx)("span",{className:"font-mono text-[10px] uppercase font-bold text-[#16A34A] tracking-wider bg-[#DCFCE7] px-2 py-0.5 rounded",children:e.badge}),(0,s.jsx)("span",{className:"font-mono text-[10px] text-[#7A7872] uppercase tracking-wider",children:e.category})]}),(0,s.jsx)("strong",{className:"font-heading font-bold text-base text-[#121212]",children:e.name}),(0,s.jsx)("p",{className:"text-xs text-[#55534E] leading-relaxed",children:e.desc})]}),(0,s.jsxs)("div",{className:"pt-4 mt-4 border-t border-[#F4F2EC] flex flex-col gap-2",children:[(0,s.jsxs)("button",{type:"button",onClick:i,className:"w-full px-3 py-2 rounded-lg bg-[#FAF9F6] hover:bg-[#F4F2EC] border border-[#EAE8E2] font-mono text-[11px] text-[#121212] text-left flex items-center justify-between transition-colors cursor-pointer",title:"Copy install command",children:[(0,s.jsx)("span",{className:"truncate",children:e.installCmd}),(0,s.jsx)("span",{className:"text-[10px] font-bold text-[#16A34A] shrink-0 ml-2",children:o?"✓ COPIED":"COPY"})]}),(0,s.jsxs)("div",{className:"flex items-center justify-between pt-1 text-[11px] font-mono",children:[(0,s.jsxs)(a.default,{href:e.playgroundHref,className:"text-[#121212] font-semibold hover:text-[#16A34A] transition-colors flex items-center gap-1",children:[(0,s.jsx)("span",{children:"Run in Browser"}),(0,s.jsx)("span",{children:"→"})]}),e.pypiHref&&(0,s.jsx)("a",{href:e.pypiHref,target:"_blank",rel:"noopener noreferrer",className:"text-[#7A7872] hover:text-[#121212] transition-colors",children:"PyPI"})]})]})]})}e.s(["ToolCard",0,r,"default",0,function({tools:e}){return(0,s.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch",children:e.map(e=>(0,s.jsx)(r,{tool:e},e.name))})}])}]);