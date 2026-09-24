import{j as e,q as x,X as U,f as H,e as L,m as h,ad as F,a3 as O,Z as z,ae as q,af as M,K as I,I as B,Q as D,V as P,H as $,ag as V,ah as Q,c as _}from"./ui-DcbDQBSt.js";import{u,R as b,E as N,L as v,a as T,b as p,N as G,F as X,S as Z}from"./seo-head-BcY1iWtI.js";import{s as W}from"./app-CH8H0_tc.js";import{r as m,S as C}from"./inertia-SOERDnsj.js";import{i as K}from"./industry-overview-2QKGavgS.js";import"./react-BPu8r0pt.js";const J=[{id:"canada",label:"Canada",sites:"1 site",address:"8815 Av. du Parc, Montréal, QC H2N 1X9, Canada",phone:"+1 (438) 699-1965",phoneHref:"tel:+14386991965",position:"left-[29.6%] top-[16.7%]",cardPosition:"sm:left-[31.5%] sm:top-[24.7%]"},{id:"maroc",label:"Maroc",sites:"1 site",address:W.address,phone:"+212 5 22 48 44 25",phoneHref:"tel:+212522484425",position:"left-[47.9%] top-[37%]",cardPosition:"sm:left-[50%] sm:top-[39%]"},{id:"france",label:"France",sites:"Partenaires",address:null,phone:null,phoneHref:null,position:"left-[53.7%] top-[22.8%]",cardPosition:"sm:left-[55.5%] sm:top-[27.8%]"}];function Y(){const{t}=u(),[s,a]=m.useState(null),d=m.useRef(null);return m.useEffect(()=>{if(!s)return;function i(o){var l;const n=o.target;!(n instanceof Element)||(l=d.current)!=null&&l.contains(n)||n.closest("[data-location-trigger]")||a(null)}function c(o){var n;o.key==="Escape"&&(a(null),(n=document.getElementById(`location-${s==null?void 0:s.id}`))==null||n.focus())}return document.addEventListener("pointerdown",i),document.addEventListener("keydown",c),()=>{document.removeEventListener("pointerdown",i),document.removeEventListener("keydown",c)}},[s]),e.jsx("section",{className:"overflow-hidden bg-white py-20 lg:py-24",onClick:()=>a(null),children:e.jsxs("div",{className:"mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",children:[e.jsxs(b,{className:"mx-auto max-w-4xl text-center",children:[e.jsx("h2",{className:"text-4xl font-extrabold tracking-normal text-[#111827] uppercase sm:text-5xl",children:t("Présence internationale")}),e.jsx("p",{className:"mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base lg:text-lg",children:t("Une organisation connectée entre l'Amérique du Nord, l'Europe et l'Afrique pour offrir un service client fluide, rapide et adapté à vos marchés.")})]}),e.jsx(b,{className:"relative mt-12",delay:.12,y:18,children:e.jsxs("div",{className:"relative mx-auto max-w-6xl",children:[e.jsx("img",{src:"/images/maps.svg",alt:t("Carte des implantations AlloCall"),className:"w-full",loading:"lazy",decoding:"async"}),J.map((i,c)=>{const o=[{x:-100,y:-100},{x:0,y:70},{x:70,y:-40}];return e.jsx("div",{className:`absolute -translate-x-1/2 -translate-y-1/2 ${i.position} `,children:e.jsx(x.button,{type:"button",id:`location-${i.id}`,"data-location-trigger":!0,"aria-expanded":(s==null?void 0:s.id)===i.id,"aria-controls":(s==null?void 0:s.id)===i.id?"location-contact-card":void 0,initial:{opacity:0,scale:.4,x:o[c].x,y:o[c].y},whileInView:{opacity:1,scale:1,x:0,y:0},viewport:{once:!0,amount:.5},transition:{duration:1.9,delay:c*.18,ease:[.16,1,.3,1]},whileHover:{scale:1.25},whileTap:{scale:.9},onClick:n=>{n.stopPropagation(),a(i)},onMouseEnter:()=>{window.matchMedia("(hover: hover) and (min-width: 640px)").matches&&a(i)},className:"flex h-10 w-10 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#487e2e]","aria-label":t("Afficher {0}",[t(i.label)]),children:e.jsx("span",{className:`h-4 w-4 rounded-full border-2 border-white bg-[#74B946] shadow-lg shadow-[#74B946]/40 sm:h-5 sm:w-5 sm:border-4 ${(s==null?void 0:s.id)===i.id?"ring-4 ring-[#74B946]/25":""} `})})},i.id)}),s&&e.jsxs(x.div,{ref:d,id:"location-contact-card",role:"region","aria-labelledby":"location-contact-title",onClick:i=>i.stopPropagation(),initial:{opacity:0,scale:.95},animate:{opacity:1,scale:1},transition:{duration:.25,ease:"easeOut"},className:`absolute top-1/2 left-1/2 z-20 w-[260px] max-w-full -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-[#111827] to-[#74B946] p-4 text-white shadow-xl sm:w-[270px] sm:translate-x-0 ${s.cardPosition} `,children:[e.jsxs("div",{className:"flex items-center justify-between gap-3",children:[e.jsx("h3",{id:"location-contact-title",className:"text-lg font-extrabold uppercase",children:t(s.label)}),e.jsx("button",{type:"button","aria-label":t("Fermer la fiche"),title:t("Fermer la fiche"),onClick:()=>a(null),className:"flex h-8 w-8 shrink-0 items-center justify-center rounded hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-white",children:e.jsx(U,{size:18,"aria-hidden":"true"})})]}),e.jsx("p",{className:"mt-1 text-sm text-white/80",children:t(s.sites)}),s.address&&e.jsxs("address",{className:"mt-4 space-y-3 text-sm leading-6 not-italic",children:[s.address&&e.jsxs("div",{className:"flex items-start gap-2.5",children:[e.jsx(H,{size:17,className:"mt-1 shrink-0","aria-hidden":"true"}),e.jsx("span",{children:t(s.address)})]}),s.phoneHref&&e.jsxs("a",{href:s.phoneHref,className:"flex min-h-8 items-center gap-2.5 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-white",children:[e.jsx(L,{size:17,className:"shrink-0","aria-hidden":"true"}),e.jsx("span",{children:s.phone})]})]})]},s.id)]})})]})})}const ee={hidden:{},visible:{transition:{staggerChildren:.14,delayChildren:.35}}},j={hidden:{opacity:0,y:26},visible:{opacity:1,y:0,transition:{duration:.7,ease:N}}};function se({onDiscoverClick:t}){const{t:s}=u(),[a,d]=m.useState(0),i=[{id:1,subtitle:"CENTRE D'APPELS BILINGUE · MONTRÉAL · CASABLANCA · PARIS",title:`RÉPONDEZ 
À CHAQUE APPEL.
NE PERDEZ PLUS 
UN SEUL CLIENT.`,description:`Une équipe téléphonique et commerciale à distance, dédiée aux PME québécoises.
Réception d'appels, service à la clientèle, télévente, gestion de leads et prise de rendez-vous — sans les coûts d'une équipe interne.`,cta:"OBTENIR UNE SOUMISSION GRATUITE",secondaryCta:"Parler à un conseiller",href:"/contact",secondaryHref:"/contact",image:"/images/hero/gestion-leads.webp"},{id:2,subtitle:"INTELLIGENCE ARTIFICIELLE + AGENTS HUMAINS",title:`VOS LEADS TRAITÉS EN
QUELQUES MINUTES,
24 H SUR 24`,description:`Chatbot, agent vocal IA, SMS automatisés et CRM intelligent travaillent avec nos agents pour qualifier, relancer et convertir vos prospects.
L'IA gère le volume, nos agents gèrent les conversations qui comptent.`,cta:"DÉCOUVRIR NOS SOLUTIONS IA",secondaryCta:null,href:"/solutions-ia",secondaryHref:null,image:"/images/hero/allocall-ai.webp"},{id:3,subtitle:"CHAQUE APPEL EST UNE OPPORTUNITÉ",title:`UN APPEL MANQUÉ,
C'EST UNE VENTE CHEZ
VOTRE CONCURRENT`,description:`Un prospect qui n'est pas rappelé ne revient pas.
AlloCall prend en charge vos appels entrants, vos relances et votre agenda pour transformer chaque demande en rendez-vous qualifié.`,cta:"PLANIFIER UN APPEL",secondaryCta:null,href:"/contact",secondaryHref:null,image:"/images/hero/allocall-sales.webp"}];m.useEffect(()=>{const n=window.setInterval(()=>{d(l=>(l+1)%i.length)},7e3);return()=>window.clearInterval(n)},[i.length]);const c=()=>{d(n=>(n+1)%i.length)},o=()=>{d(n=>(n-1+i.length)%i.length)};return e.jsxs("div",{className:"relative w-full overflow-hidden bg-[#111827]",children:[e.jsxs("div",{className:"relative grid w-full",children:[i.map((n,l)=>e.jsxs("div",{inert:l!==a,className:`
                                col-start-1
                                row-start-1
                                flex
                                w-full
                                flex-col
                                transition-all
                                duration-1000
                                ease-in-out
                                lg:min-h-[650px]
                                lg:flex-row
                                ${l===a?"relative z-10 translate-x-0 scale-100 opacity-100":"pointer-events-none relative z-0 translate-x-full scale-95 opacity-0"}
                            `,children:[e.jsxs("div",{className:`
                                    relative
                                    flex
                                    w-full
                                    flex-col
                                    justify-center
                                    overflow-hidden
                                    bg-gradient-to-br
                                    from-[#101826]
                                    to-[#1B2738]
                                    p-8
                                    pb-10
                                    text-white
                                    sm:p-12
                                    lg:w-[48%]
                                    lg:p-16
                                    xl:p-20
                                `,children:[e.jsx("div",{className:`
                                        pointer-events-none
                                        absolute
                                        top-0
                                        left-0
                                        h-40
                                        w-40
                                        rounded-full
                                        bg-[#74B946]/10
                                        blur-3xl
                                    `}),e.jsx("div",{className:`
                                        pointer-events-none
                                        absolute
                                        right-0
                                        bottom-0
                                        h-64
                                        w-64
                                        rounded-full
                                        bg-[#74B946]/10
                                        blur-3xl
                                    `}),e.jsx("div",{className:"absolute top-0 left-0 h-full w-1 bg-[#74B946]"}),e.jsxs(x.div,{className:"relative space-y-6",variants:ee,initial:"hidden",animate:l===a?"visible":"hidden",children:[e.jsxs(x.div,{variants:j,className:"flex items-center gap-3",children:[e.jsx("span",{className:"h-[2px] w-8 shrink-0 bg-[#74B946]"}),e.jsx("span",{className:`
                                                text-xs
                                                font-bold
                                                tracking-[0.16em]
                                                text-[#74B946]
                                                uppercase
                                                sm:text-sm
                                                lg:text-[14px]
                                            `,children:s(n.subtitle)})]}),e.jsx(x.h1,{variants:j,className:`
                                            max-w-2xl
                                            whitespace-pre-line
                                            text-3xl
                                            leading-[1.08]
                                            font-extrabold
                                            tracking-tight
                                            text-white
                                            uppercase
                                            sm:text-4xl
                                            lg:text-[42px]
                                            xl:text-[49px]
                                        `,children:s(n.title)}),e.jsx(x.p,{variants:j,className:`
                                            max-w-xl
                                            whitespace-pre-line
                                            text-sm
                                            leading-7
                                            font-light
                                            text-gray-300
                                            sm:text-base
                                            lg:text-[16px]
                                            lg:leading-8
                                        `,children:s(n.description)}),e.jsxs(x.div,{variants:j,className:`
                                            flex
                                            flex-col
                                            gap-3
                                            pt-3
                                            sm:flex-row
                                            sm:items-center
                                        `,children:[e.jsx(x.div,{whileHover:{scale:1.03},whileTap:{scale:.97},transition:{type:"spring",stiffness:400,damping:20},children:e.jsxs(v,{href:n.href,className:`
                                                    group
                                                    inline-flex
                                                    items-center
                                                    justify-center
                                                    gap-2.5
                                                    rounded
                                                    bg-[#74B946]
                                                    px-7
                                                    py-4
                                                    text-xs
                                                    font-bold
                                                    tracking-wider
                                                    text-white
                                                    uppercase
                                                    shadow-xl
                                                    transition-all
                                                    duration-300
                                                    hover:bg-[#659F3B]
                                                    hover:shadow-[#74B946]/20
                                                    sm:text-sm
                                                `,children:[e.jsx("span",{children:s(n.cta)}),e.jsx(h,{size:17,className:`
                                                        transition-transform
                                                        duration-300
                                                        group-hover:translate-x-1
                                                    `})]})}),n.secondaryCta&&n.secondaryHref&&e.jsxs(v,{href:n.secondaryHref,className:`
                                                        group
                                                        inline-flex
                                                        items-center
                                                        justify-center
                                                        gap-2
                                                        px-5
                                                        py-4
                                                        text-sm
                                                        font-semibold
                                                        text-white
                                                        transition-colors
                                                        duration-300
                                                        hover:text-[#74B946]
                                                    `,children:[s(n.secondaryCta),e.jsx(h,{size:16,className:`
                                                            transition-transform
                                                            duration-300
                                                            group-hover:translate-x-1
                                                        `})]})]})]})]}),e.jsxs("div",{className:`
                                    relative
                                    h-[380px]
                                    w-full
                                    overflow-hidden
                                    bg-[#111827]
                                    lg:h-auto
                                    lg:w-[52%]
                                `,children:[e.jsx("img",{src:n.image,alt:s(n.title),loading:l===a?"eager":"lazy",decoding:"async",fetchPriority:l===a?"high":"low",className:`
                                        h-full
                                        w-full
                                        object-cover
                                        transition-transform
                                        duration-[8000ms]
                                        hover:scale-105
                                        lg:absolute
                                        lg:inset-0
                                    `,referrerPolicy:"no-referrer"}),e.jsx("div",{className:`
                                        absolute
                                        inset-0
                                        bg-gradient-to-r
                                        from-[#111827]/35
                                        via-transparent
                                        to-transparent
                                        lg:from-[#111827]/25
                                    `}),e.jsx("div",{className:`
                                        absolute
                                        inset-0
                                        bg-gradient-to-t
                                        from-[#111827]/35
                                        via-transparent
                                        to-transparent
                                    `})]})]},n.id)),e.jsx("button",{type:"button",onClick:o,className:`
                            absolute
                            top-1/2
                            left-4
                            z-20
                            hidden
                            -translate-y-1/2
                            rounded-full
                            border
                            border-[#74B946]/40
                            bg-[#111827]/80
                            p-3
                            text-white
                            backdrop-blur-md
                            transition-all
                            duration-300
                            hover:scale-110
                            hover:bg-[#74B946]
                            sm:block
                        `,"aria-label":s("Slide précédente"),children:e.jsx(F,{size:20})}),e.jsx("button",{type:"button",onClick:c,className:`
                            absolute
                            top-1/2
                            right-4
                            z-20
                            hidden
                            -translate-y-1/2
                            rounded-full
                            border
                            border-[#74B946]/40
                            bg-[#111827]/80
                            p-3
                            text-white
                            backdrop-blur-md
                            transition-all
                            duration-300
                            hover:scale-110
                            hover:bg-[#74B946]
                            sm:block
                        `,"aria-label":s("Slide suivante"),children:e.jsx(O,{size:20})}),e.jsx("div",{className:`
                            absolute
                            bottom-6
                            left-1/2
                            z-20
                            flex
                            -translate-x-1/2
                            gap-2
                        `,children:i.map((n,l)=>e.jsx("button",{type:"button",onClick:()=>d(l),"aria-label":s("Afficher le slide {0}",[l+1]),className:`
                                    h-1.5
                                    rounded-full
                                    transition-all
                                    duration-500
                                    ${l===a?"w-14 bg-[#74B946]":"w-9 bg-white/40 hover:bg-white/70"}
                                `},l))})]}),e.jsx("div",{className:"relative z-20 border-b border-gray-100 bg-white py-8 shadow-sm",children:e.jsx("div",{className:"mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",children:e.jsxs(T,{className:`
                                grid
                                grid-cols-1
                                gap-6
                                divide-y
                                divide-gray-100
                                sm:grid-cols-2
                                sm:gap-8
                                sm:divide-y-0
                                lg:grid-cols-4
                                lg:divide-x
                            `,children:[e.jsxs(p,{className:"flex items-center gap-4 pt-4 first:pt-0 first:pl-0 sm:pt-0 lg:pl-4",children:[e.jsx("div",{className:"flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#111827] shadow-md lg:h-16 lg:w-16",children:e.jsx(z,{className:"h-5 w-5 text-[#74B946] lg:h-7 lg:w-7"})}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-xs font-bold whitespace-nowrap tracking-wider text-[#111827] uppercase sm:text-sm",children:s("Appels entrants")}),e.jsxs("p",{className:"mt-0.5 text-xs font-light text-gray-400 lg:text-base",children:[s("Aucun appel"),e.jsx("br",{}),s("laissé sans réponse")]})]})]}),e.jsxs(p,{className:"flex items-center gap-4 pt-4 sm:pt-0 lg:pl-6",children:[e.jsx("div",{className:"flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#111827] shadow-md lg:h-16 lg:w-16",children:e.jsx(q,{className:"h-5 w-5 text-[#74B946] lg:h-7 lg:w-7"})}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-xs font-bold whitespace-nowrap tracking-wider text-[#111827] uppercase sm:text-sm",children:s("IA+Humain")}),e.jsxs("p",{className:"mt-0.5 text-xs font-light text-gray-400 lg:text-base",children:[s("Automatisation"),e.jsx("br",{}),s("et agents dédiés")]})]})]}),e.jsxs(p,{className:"flex items-center gap-4 pt-4 lg:pt-0 lg:pl-6",children:[e.jsx("div",{className:"flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#111827] shadow-md lg:h-16 lg:w-16",children:e.jsx(M,{className:"h-5 w-5 text-[#74B946] lg:h-7 lg:w-7"})}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-xs font-bold whitespace-nowrap tracking-wider text-[#111827] uppercase sm:text-sm",children:s("24H/24")}),e.jsxs("p",{className:"mt-0.5 text-xs font-light text-gray-400 lg:text-base",children:[s("Vos leads traités"),e.jsx("br",{}),s("rapidement")]})]})]}),e.jsxs(p,{className:"flex items-center gap-4 pt-4 lg:pt-0 lg:pl-6",children:[e.jsx("div",{className:"flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#111827] shadow-md lg:h-16 lg:w-16",children:e.jsx(I,{className:"h-5 w-5 text-[#74B946] lg:h-7 lg:w-7"})}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-xs font-bold whitespace-nowrap tracking-wider text-[#111827] uppercase sm:text-sm",children:s("Rendez-vous")}),e.jsxs("p",{className:"mt-0.5 text-xs font-light text-gray-400 lg:text-base",children:[s("Plus de prospects"),e.jsx("br",{}),s("convertis en clients")]})]})]})]})})})]})}const k=K.map(t=>({slug:t.slug,title:t.name,description:t.summary,image:t.image,imageAlt:t.imageAlt,href:t.href.startsWith("/industries/")?t.href:`/industries#${t.slug}`})),S=3;function te(){const{t}=u(),[s,a]=m.useState(0),[d,i]=m.useState(!1),[c,o]=m.useState(!1),[n,l]=m.useState(!1),g=Math.max(0,k.length-S),R=k.slice(s,s+S),y=()=>{a(r=>Math.max(0,r-1))},E=()=>{a(r=>Math.min(g,r+1))};return m.useEffect(()=>{if(d||c||n||s>=g)return;const r=window.setInterval(()=>{document.hidden||a(f=>Math.min(g,f+1))},5e3);return()=>window.clearInterval(r)},[d,c,n,s,g]),e.jsx("section",{className:"bg-white","aria-labelledby":"home-industries-title",children:e.jsxs("div",{className:"mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",children:[e.jsxs(b,{className:"mx-auto max-w-5xl text-center",children:[e.jsx("h2",{id:"home-industries-title",className:"text-4xl font-extrabold tracking-normal text-[#111827] uppercase sm:text-5xl",children:t("Industries")}),e.jsx("p",{className:"mx-auto mt-5 text-center text-xs leading-6 font-light text-gray-500 sm:text-sm lg:text-base",children:t("Des solutions pour vos appels, vos prospects et vos rendez-vous, adaptées à votre secteur.")})]}),e.jsxs("div",{className:"relative",onMouseEnter:()=>o(!0),onMouseLeave:()=>o(!1),onFocusCapture:()=>l(!0),onBlurCapture:r=>{r.currentTarget.contains(r.relatedTarget)||l(!1)},children:[e.jsx("button",{type:"button",onClick:y,disabled:s===0,"aria-label":t("Secteurs précédents"),className:`
                            absolute top-1/2 -left-5 z-20
                            hidden h-12 w-12 -translate-y-1/2
                            items-center justify-center
                            rounded-full bg-white
                            text-[#111827]
                            shadow-lg
                            transition-all duration-300
                            hover:bg-[#74B946] hover:text-white
                            disabled:cursor-not-allowed
                            disabled:opacity-30
                            disabled:hover:bg-white
                            disabled:hover:text-[#111827]
                            lg:flex
                        `,children:e.jsx(B,{size:22})}),e.jsx("div",{className:"mt-6 grid auto-rows-fr gap-7 lg:grid-cols-3",children:R.map(r=>e.jsxs(v,{href:r.href,"aria-labelledby":`home-industry-${r.slug}`,className:`
                                    group relative grid min-h-96
                                    overflow-hidden bg-[#111827]
                                    shadow-sm
                                    focus-visible:outline-3
                                    focus-visible:outline-offset-4
                                    focus-visible:outline-[#74B946]
                                `,children:[e.jsx("img",{src:r.image,alt:t(r.imageAlt),width:"960",height:"1080",className:`
                                        absolute inset-0 h-full w-full
                                        object-cover
                                        transition-transform duration-700
                                        group-hover:scale-105
                                        motion-reduce:transform-none
                                        motion-reduce:transition-none
                                    `,loading:"lazy",decoding:"async"}),e.jsx("div",{className:"absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/50 to-transparent"}),e.jsxs("div",{className:"relative self-end p-6 text-white",children:[e.jsx("h3",{id:`home-industry-${r.slug}`,className:"text-xl font-extrabold tracking-normal sm:text-2xl",children:t(r.title)}),e.jsx("p",{className:"mt-3 max-w-sm text-sm leading-5 font-medium text-white/95",children:t(r.description)}),e.jsxs("span",{className:"mt-5 inline-flex items-center gap-2 text-base font-semibold text-[#b6e58e]",children:[t("Découvrir"),e.jsx(h,{size:18,"aria-hidden":"true"})]})]})]},r.slug))}),e.jsx("button",{type:"button",onClick:E,disabled:s>=g,"aria-label":t("Secteurs suivants"),className:`
                            absolute top-1/2 -right-5 z-20
                            hidden h-12 w-12 -translate-y-1/2
                            items-center justify-center
                            rounded-full bg-white
                            text-[#111827]
                            shadow-lg
                            transition-all duration-300
                            hover:bg-[#74B946] hover:text-white
                            disabled:cursor-not-allowed
                            disabled:opacity-30
                            disabled:hover:bg-white
                            disabled:hover:text-[#111827]
                            lg:flex
                        `,children:e.jsx(h,{size:22})}),e.jsxs("div",{className:"mt-6 flex items-center justify-center gap-3 lg:hidden",children:[e.jsx("button",{type:"button",onClick:y,disabled:s===0,className:`
                                flex h-11 w-11 items-center justify-center
                                rounded-full border border-gray-200
                                bg-white text-[#111827]
                                transition
                                hover:border-[#74B946]
                                hover:bg-[#74B946]
                                hover:text-white
                                disabled:cursor-not-allowed
                                disabled:opacity-30
                            `,children:e.jsx(B,{size:20})}),e.jsx("button",{type:"button",onClick:E,disabled:s>=g,className:`
                                flex h-11 w-11 items-center justify-center
                                rounded-full border border-gray-200
                                bg-white text-[#111827]
                                transition
                                hover:border-[#74B946]
                                hover:bg-[#74B946]
                                hover:text-white
                                disabled:cursor-not-allowed
                                disabled:opacity-30
                            `,children:e.jsx(h,{size:20})})]}),e.jsx("div",{className:"mt-6 flex flex-wrap items-center justify-center gap-2",children:Array.from({length:g+1},(r,f)=>e.jsx("button",{type:"button",onClick:()=>a(f),"aria-label":t("Afficher le groupe {0}",[String(f+1)]),"aria-pressed":f===s,className:`
                                        flex h-6 items-center
                                        justify-center
                                        focus-visible:outline-2
                                        focus-visible:outline-[#74B946]
                                    `,children:e.jsx("span",{className:`
                                            h-2 rounded-full
                                            transition-all duration-300
                                            ${f===s?"w-6 bg-[#74B946]":"w-2 bg-gray-300"}
                                        `})},f))})]}),e.jsx("div",{className:"mt-4 text-center",children:e.jsxs(v,{href:"/industries",className:`
                            inline-flex items-center gap-2 py-3
                            text-xs font-bold tracking-[0.2em]
                            text-[#74B946] uppercase
                            hover:underline sm:text-sm
                        `,children:[t("Tous nos secteurs"),e.jsx(h,{size:18,"aria-hidden":"true"})]})})]})})}const ne="/images/services/gestion-leads.webp",ae="/images/services/televente-appels-sortants.webp",ie="/images/services/assistante-virtuelle.webp",le="/images/services/prise-rendez-vous.webp",re=[{slug:"assistants-virtuels",title:"Assistants virtuels",description:"Une équipe à distance pour gérer vos appels, courriels, tâches administratives et suivis.",imageUrl:ie,icon:e.jsx(D,{size:23})},{slug:"televente-appels-sortants",title:"Télévente et appels sortants",description:"Des agents commerciaux pour contacter vos prospects, présenter vos services et générer des opportunités.",imageUrl:ae,icon:e.jsx(z,{size:23})},{slug:"gestion-leads",title:"Gestion de leads",description:"Qualification, suivi et relance de vos prospects afin de réduire les occasions perdues.",imageUrl:ne,icon:e.jsx(P,{size:23})},{slug:"prise-rendez-vous",title:"Prise de rendez-vous",description:"Nos agents contactent vos prospects et clients et planifient directement les rendez-vous dans votre calendrier.",imageUrl:le,icon:e.jsx(I,{size:23})}];function oe({service:t,index:s}){const{t:a}=u();return e.jsx(x.div,{initial:"hidden",whileInView:"visible",viewport:{once:!0,amount:.3},variants:{hidden:{opacity:0,y:45},visible:{opacity:1,y:0,transition:{duration:.65,ease:N}}},children:e.jsxs(v,{href:`/services/${t.slug}`,className:"group relative flex h-auto items-stretch overflow-hidden rounded-2xl border border-gray-100 bg-[#F8FAFC] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#74B946]/20 hover:shadow-xl sm:h-[150px] lg:h-[150px]",children:[e.jsxs("div",{className:"relative flex w-20 shrink-0 items-center justify-center border-r border-gray-100 sm:w-28",children:[e.jsx("div",{className:"absolute top-0 bottom-0 left-0 w-[4px] bg-[#74B946] opacity-0 transition-opacity duration-300 group-hover:opacity-100"}),e.jsx("span",{className:"text-3xl font-black text-gray-200 transition-colors duration-300 group-hover:text-[#74B946] sm:text-5xl",children:String(s+1).padStart(2,"0")})]}),e.jsxs("div",{className:"flex min-w-0 flex-grow items-center gap-4 px-5 py-6 sm:px-7 lg:px-8",children:[e.jsx("div",{className:"hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EFF8E9] text-[#74B946] transition-all duration-300 group-hover:bg-[#74B946] group-hover:text-white md:flex",children:t.icon}),e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsx("h4",{className:"text-base font-bold tracking-wide text-[#111827] uppercase transition-colors duration-300 group-hover:text-[#74B946] sm:text-xl lg:text-2xl",children:a(t.title)}),e.jsx(x.div,{className:"overflow-hidden",variants:{hidden:{height:0,opacity:0,marginTop:0},visible:{height:"auto",opacity:1,marginTop:6,transition:{duration:.7,delay:.2,ease:N}}},children:e.jsx("p",{className:"max-w-3xl text-xs leading-6 font-light text-gray-500 sm:text-sm lg:text-base",children:a(t.description)})})]})]}),e.jsx("div",{className:"relative hidden h-full w-[32%] max-w-[330px] shrink-0 overflow-hidden sm:block",children:e.jsx("img",{src:t.imageUrl,alt:a(t.title),className:"h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"})}),e.jsx("span",{className:"mr-4 flex items-center self-center text-[#74B946] sm:hidden",children:e.jsx(h,{size:19})})]})})}function ce(){const{t}=u();return e.jsxs("section",{className:"relative overflow-hidden border-t border-gray-100 bg-white py-5 lg:py-10",children:[e.jsx("div",{className:"pointer-events-none absolute top-0 right-0 h-[400px] w-[400px] translate-x-1/2 -translate-y-1/2 rounded-full bg-[#74B946]/5 blur-3xl"}),e.jsxs("div",{className:"relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8",children:[e.jsxs(b,{className:"mx-auto max-w-3xl text-center",children:[e.jsxs("div",{className:"mb-4 flex items-center justify-center gap-3",children:[e.jsx("span",{className:"h-[2px] w-8 bg-[#74B946]"}),e.jsx("span",{className:"text-xs font-bold tracking-[0.2em] text-[#74B946] uppercase sm:text-sm",children:t("Nos services")}),e.jsx("span",{className:"h-[2px] w-8 bg-[#74B946]"})]}),e.jsxs("h3",{className:"text-3xl leading-tight font-extrabold tracking-tight text-[#111827] uppercase sm:text-4xl lg:text-5xl",children:[t("Des solutions pour"),e.jsxs("span",{className:"text-[#74B946]",children:[e.jsx("br",{})," ",t("votre relation client")]})]}),e.jsx("p",{className:"max-w-3xl text-xs mt-5 leading-6 font-light text-gray-500 sm:text-sm lg:text-base",children:t(`AlloCall accompagne votre entreprise avec des équipes dédiées pour gérer vos appels, 
 développer vos ventes et transformer davantage de prospects en clients.`)})]}),e.jsx("div",{className:"mt-14 space-y-5",children:re.map((s,a)=>e.jsx(oe,{service:s,index:a},s.slug))}),e.jsx(b,{className:"mt-12 text-center",delay:.15,children:e.jsxs(v,{href:"/services",className:"group inline-flex items-center gap-3 rounded-md bg-[#74B946] px-8 py-4 text-xs font-bold tracking-widest text-white uppercase shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#659F3B] hover:shadow-xl sm:text-sm",children:[e.jsx("span",{children:t("Découvrir tous nos services")}),e.jsx(h,{size:17,className:"transition-transform duration-300 group-hover:translate-x-1"})]})})]})]})}const w=({number:t,title:s,icon:a,description:d,items:i,path:c})=>{const{t:o}=u();return e.jsxs(x.div,{whileHover:{y:-8},transition:{type:"spring",stiffness:300,damping:22},className:"group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-slate-100 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.06)] transition-shadow duration-300 hover:shadow-[0_20px_60px_rgba(15,23,42,0.12)]",children:[e.jsx("div",{className:"absolute top-0 right-0 left-0 h-[5px] bg-[#74B946]"}),e.jsx("div",{className:"group-hover:bg-alidade-gold pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-[#74B946]/5 transition-transform duration-500 group-hover:scale-125 group-hover:text-white"}),e.jsxs("div",{className:"relative flex items-start justify-between p-7 pb-5 lg:p-8 lg:pb-5",children:[e.jsx("div",{className:"flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F1F8EC] text-[#74B946] transition-all duration-300 group-hover:bg-[#74B946] group-hover:text-white",children:a}),e.jsx("span",{className:"text-4xl font-black tracking-tight text-gray-200 transition-colors duration-300 group-hover:text-white",children:t})]}),e.jsxs("div",{className:"relative flex flex-1 flex-col px-7 pb-8 lg:px-8",children:[e.jsx("h3",{className:"mb-4 text-xl font-bold text-[#111827] lg:text-2xl",children:o(s)}),e.jsx("p",{className:"mb-6 text-sm leading-7 text-slate-500 lg:text-[15px]",children:o(d)}),e.jsx("div",{className:"mb-8 space-y-3",children:i.map((n,l)=>e.jsxs("div",{className:"flex items-start gap-3",children:[e.jsx(_,{size:17,className:"mt-0.5 shrink-0 text-[#74B946]"}),e.jsx("span",{className:"text-sm text-slate-600",children:o(n)})]},l))}),e.jsx("div",{className:"mt-auto",children:e.jsxs(v,{href:c,className:"group/link inline-flex items-center gap-2 text-sm font-bold text-[#111827] transition-colors duration-300 hover:text-[#74B946]",children:[o("Découvrir le service"),e.jsx("span",{className:"flex h-9 w-9 items-center justify-center rounded-full bg-[#F1F8EC] text-[#74B946] transition-all duration-300 group-hover/link:bg-[#74B946] group-hover/link:text-white",children:e.jsx(h,{size:16,className:"transition-transform duration-300 group-hover/link:translate-x-0.5"})})]})})]})]})},de=()=>{const{t}=u();return e.jsxs("section",{className:"relative overflow-hidden bg-[#F8FAFC] px-4 py-5 sm:px-6 lg:px-8 lg:py-10",children:[e.jsx("div",{className:"pointer-events-none absolute top-0 right-0 h-[450px] w-[450px] translate-x-1/3 -translate-y-1/3 rounded-full bg-[#74B946]/5 blur-3xl"}),e.jsxs("div",{className:"relative mx-auto max-w-7xl",children:[e.jsxs(b,{className:"mx-auto mb-14 max-w-3xl text-center",children:[e.jsxs("div",{className:"mb-4 flex items-center justify-center gap-3",children:[e.jsx("span",{className:"h-[2px] w-8 bg-[#74B946]"}),e.jsx("span",{className:"text-xs font-bold tracking-[0.2em] text-[#74B946] uppercase sm:text-sm",children:t("NOS EXPERTISES")}),e.jsx("span",{className:"h-[2px] w-8 bg-[#74B946]"})]}),e.jsxs("h2",{className:"text-3xl leading-tight font-extrabold tracking-tight text-[#111827] sm:text-4xl lg:text-5xl",children:[t("VOTRE RELATION CLIENT,"),e.jsxs("span",{className:"text-[#74B946]",children:[e.jsx("br",{})," ",t("NOTRE EXPERTISE")]})]}),e.jsx("p",{className:"mx-auto mt-5 max-w-2xl text-sm leading-7 whitespace-pre-line text-slate-500 sm:text-base lg:text-lg",children:t(`De la réception d'appels à la prospection commerciale, 
AlloCall accompagne votre entreprise à chaque étape de la relation client.`)})]}),e.jsxs(T,{stagger:.12,className:"mb-16 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4",children:[e.jsx(p,{className:"h-full",children:e.jsx(w,{number:"01",title:t("Service Client"),icon:e.jsx($,{size:27}),description:t("Confiez la gestion de vos demandes clients à une équipe dédiée, professionnelle et orientée satisfaction."),items:["Réception d'appels","Assistance client","Service Desk"],path:"/services"})}),e.jsx(p,{className:"h-full",children:e.jsx(w,{number:"02",title:t("Téléprospection"),icon:e.jsx(P,{size:27}),description:t("Développez votre activité grâce à une prospection téléphonique structurée et adaptée à vos objectifs commerciaux."),items:["Prise de rendez-vous","Qualification de prospects","Relance commerciale"],path:"/services"})}),e.jsx(p,{className:"h-full",children:e.jsx(w,{number:"03",title:t("Fidélisation Client"),icon:e.jsx(V,{size:27}),description:t("Renforcez la relation avec vos clients grâce à des échanges personnalisés et un suivi régulier."),items:["Suivi client","Enquêtes de satisfaction","Reconquête client"],path:"/services"})}),e.jsx(p,{className:"h-full",children:e.jsx(w,{number:"04",title:t("Télévente"),icon:e.jsx(Q,{size:27}),description:t("Transformez vos contacts en opportunités commerciales grâce à des équipes orientées performance et conversion."),items:["Vente B2B & B2C","Upselling & cross-selling","Externalisation commerciale"],path:"/services"})})]})]})]})},A={apropos:"/apropos",services:"/savoir-faire",gallery:"/galerie",configurator:"/configurateur",devis:"/devis",contact:"/contact"};function xe(){const{href:t}=u();return m.useEffect(()=>{const a=new URLSearchParams(window.location.search).get("tab");a&&A[a]&&C.visit(t(A[a]),{replace:!0})},[t]),e.jsxs("div",{className:"text-alidade-navy flex min-h-screen flex-col bg-[#fafafa]",children:[e.jsx(G,{}),e.jsxs("main",{className:"public-content animate-in fade-in flex-grow duration-500",children:[e.jsx(se,{onDiscoverClick:()=>C.visit(t("/services"))}),e.jsx(de,{}),e.jsx(ce,{}),e.jsx(te,{}),e.jsx(Y,{})]}),e.jsx(X,{})]})}function ve(){return e.jsxs(e.Fragment,{children:[e.jsx(Z,{}),e.jsx("div",{children:e.jsx(xe,{})})]})}export{ve as default};
