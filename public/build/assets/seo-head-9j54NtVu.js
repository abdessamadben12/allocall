import{j as e,s as d,am as j,e as o,M as h,$ as N,_ as k,ai as B,an as A,ao as C,ap as I,F as p,X as F,aq as z}from"./ui-HjjhJ4L3.js";import{s as x,w as L}from"./app-DwsAS-1R.js";import{r as S,$ as c,K as M,L as E}from"./inertia-SOERDnsj.js";const b=[.22,1,.36,1],R=(t=.12,n=0)=>({hidden:{},visible:{transition:{staggerChildren:t,delayChildren:n}}});function T({children:t,className:n,delay:a=0,y:s=28,amount:r=.2,as:y="div"}){const v=j(),w=d[y];return e.jsx(w,{className:n,initial:{opacity:0,y:v?0:s},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:r},transition:{duration:.7,delay:a,ease:b},children:t})}function _({children:t,className:n,stagger:a=.12,delay:s=0,amount:r=.15}){return e.jsx(d.div,{className:n,initial:"hidden",whileInView:"visible",viewport:{once:!0,amount:r},variants:R(a,s),children:t})}function O({children:t,className:n,y:a=28}){const r={hidden:{opacity:0,y:j()?0:a},visible:{opacity:1,y:0,transition:{duration:.65,ease:b}}};return e.jsx(d.div,{className:n,variants:r,children:t})}const W="/logo_footer.png",J="/images/bannieres/menuiserie-Bois2-final.webp",i={maroc:{phone:"+212 5 22 48 44 25",href:"tel:+212522484425"},montreal:{phone:"+1 514-660-2337",href:"tel:+15146602337"},email:"contact@allocall.ma"},g=[{href:x.socials.facebook,icon:e.jsx(A,{size:18}),label:"Facebook"},{href:x.socials.instagram,icon:e.jsx(C,{size:18}),label:"Instagram"},{href:x.socials.linkedin,icon:e.jsx(I,{size:18}),label:"LinkedIn"}].filter(t=>t.href),K=()=>e.jsxs("footer",{className:"overflow-hidden bg-[#111827] text-white",children:[e.jsxs("div",{className:"flex flex-col items-stretch lg:flex-row",children:[e.jsxs(T,{className:`
                        flex
                        w-full
                        flex-col
                        justify-center
                        p-8
                        lg:w-1/3
                        lg:p-12
                    `,amount:.15,children:[e.jsx("div",{className:"mb-6",children:e.jsx("img",{src:W,alt:"Logo AlloCall",className:"mb-4 h-14 w-auto",loading:"lazy",decoding:"async"})}),e.jsxs("p",{className:`
                            mb-8
                            max-w-sm
                            text-sm
                            leading-7
                            text-gray-400
                        `,children:["Une équipe à distance pour gérer vos appels, vos prospects et votre relation client.",e.jsx("br",{}),"AlloCall combine expertise humaine et technologie pour vous aider à ne laisser passer aucune opportunité."]}),e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(o,{className:`
                                    h-5
                                    w-5
                                    shrink-0
                                    text-[#74B946]
                                `}),e.jsxs("div",{className:"flex flex-wrap items-center gap-1",children:[e.jsx("span",{className:"text-sm font-semibold text-gray-500",children:"Maroc :"}),e.jsx("a",{href:i.maroc.href,className:`
                                        text-sm
                                        text-gray-300
                                        transition-colors
                                        duration-300
                                        hover:text-[#74B946]
                                    `,children:i.maroc.phone})]})]}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(o,{className:`
                                    h-5
                                    w-5
                                    shrink-0
                                    text-[#74B946]
                                `}),e.jsxs("div",{className:"flex flex-wrap items-center gap-1",children:[e.jsx("span",{className:"text-sm font-semibold text-gray-500",children:"Montréal :"}),e.jsx("a",{href:i.montreal.href,className:`
                                        text-sm
                                        text-gray-300
                                        transition-colors
                                        duration-300
                                        hover:text-[#74B946]
                                    `,children:i.montreal.phone})]})]}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(h,{className:`
                                    h-5
                                    w-5
                                    shrink-0
                                    text-[#74B946]
                                `}),e.jsx("a",{href:`mailto:${i.email}`,className:`
                                    text-sm
                                    text-gray-300
                                    transition-colors
                                    duration-300
                                    hover:text-[#74B946]
                                `,children:i.email})]})]}),g.length>0&&e.jsx("div",{className:"mt-8 flex gap-3",children:g.map(t=>e.jsx($,{href:t.href,label:t.label,icon:t.icon},t.label))})]}),e.jsxs(_,{stagger:.15,className:`
                        grid
                        flex-1
                        grid-cols-1
                        items-center
                        border-t
                        border-gray-800
                        md:grid-cols-3
                        lg:border-t-0
                    `,children:[e.jsx(m,{icon:e.jsx(N,{className:`
                                    h-10
                                    w-10
                                    text-[#74B946]
                                    lg:h-16
                                    lg:w-14
                                `,strokeWidth:1}),title:"RELATION CLIENT",description:"Des agents dédiés pour répondre à vos clients avec professionnalisme."}),e.jsx(m,{icon:e.jsx(k,{className:`
                                    h-10
                                    w-10
                                    text-[#74B946]
                                    lg:h-16
                                    lg:w-16
                                `,strokeWidth:1}),title:"PERFORMANCE",description:"Qualification, suivi et relance pour transformer plus de prospects.",hasBorder:!0}),e.jsx(m,{icon:e.jsx(B,{className:`
                                    h-10
                                    w-10
                                    text-[#74B946]
                                    lg:h-16
                                    lg:w-16
                                `,strokeWidth:1}),title:"IA + HUMAIN",description:"La technologie pour gagner du temps, l'humain pour créer la relation."})]})]}),e.jsx("div",{className:`
                    border-t
                    border-gray-800
                    bg-[#0C1421]
                    py-6
                `,children:e.jsx("div",{className:`
                        container
                        mx-auto
                        flex
                        flex-col
                        items-center
                        justify-center
                        gap-2
                        px-6
                        md:flex-row
                    `,children:e.jsxs("p",{className:`
                            text-center
                            text-xs
                            tracking-widest
                            text-gray-500
                        `,children:["© ",new Date().getFullYear()," AlloCall. Tous droits réservés."]})})})]}),m=({icon:t,title:n,description:a,hasBorder:s})=>e.jsxs(O,{className:`
            flex
            flex-col
            items-center
            p-10
            text-center
            ${s?"border-gray-800 md:border-x":""}
        `,children:[e.jsx("div",{className:"mb-6",children:t}),e.jsx("h3",{className:`
                mb-4
                text-xs
                font-bold
                tracking-widest
                uppercase
                lg:text-sm
            `,children:n}),e.jsx("p",{className:`
                px-4
                text-xs
                leading-6
                text-gray-400
                lg:text-base
            `,children:a})]}),$=({icon:t,href:n,label:a})=>e.jsx(d.a,{href:n,target:"_blank",rel:"noopener noreferrer","aria-label":a,whileHover:{scale:1.15,y:-2},whileTap:{scale:.95},transition:{type:"spring",stiffness:400,damping:18},className:`
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-gray-700
            text-gray-400
            transition-colors
            duration-300
            hover:border-[#74B946]
            hover:bg-[#74B946]
            hover:text-white
        `,children:t}),q=({size:t=26})=>e.jsx("svg",{viewBox:"0 0 32 32",width:t,height:t,fill:"currentColor","aria-hidden":"true",children:e.jsx("path",{d:"M16.004 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.59 4.47 1.71 6.42L3.2 28.8l6.56-1.72a12.74 12.74 0 0 0 6.24 1.63h.01c7.06 0 12.79-5.74 12.79-12.8 0-3.42-1.33-6.63-3.75-9.05a12.72 12.72 0 0 0-9.05-3.66zm0 23.36h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-4.02 1.05 1.07-3.92-.25-.4a10.56 10.56 0 0 1-1.62-5.64c0-5.87 4.78-10.64 10.66-10.64 2.84 0 5.51 1.11 7.52 3.12a10.57 10.57 0 0 1 3.11 7.53c0 5.87-4.78 10.61-10.67 10.61zm5.84-7.96c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.51-.16-.72.16-.21.32-.82 1.04-1.01 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.54-.72-.55l-.61-.01c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66 0 1.57 1.15 3.09 1.31 3.3.16.21 2.25 3.44 5.45 4.82.76.33 1.36.53 1.82.67.77.24 1.46.21 2.01.13.61-.09 1.89-.77 2.16-1.52.27-.75.27-1.39.19-1.52-.08-.13-.29-.21-.61-.37z"})});function D(){return e.jsxs(d.a,{href:L(),target:"_blank",rel:"noopener noreferrer","aria-label":"Contacter Alidade sur WhatsApp",initial:{scale:0,opacity:0},animate:{scale:1,opacity:1},whileHover:{scale:1.12},whileTap:{scale:.94},transition:{type:"spring",stiffness:260,damping:18,delay:.6},className:"fixed right-5 bottom-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl",children:[e.jsx("span",{className:"absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40"}),e.jsx(q,{})]})}const f=[{href:"/",label:"Accueil"},{href:"/services",label:"Services"},{href:"/industries",label:"Industries"},{href:"/solutions-ia",label:"Solutions IA"},{href:"/apropos",label:"Pourquoi AlloCall"},{href:"/contact",label:"Contact"}],l=[{label:"Maroc",value:"+212 5 22 48 44 25",href:"tel:+212522484425",icon:o},{label:"Canada",value:"+1 (514) 850-9092",href:"tel:+15148509092",icon:o},{label:null,value:"contact@allocall.ma",href:"mailto:contact@allocall.ma",icon:h}];function u(t,n){return t==="/"?n==="/":t==="/services"?n==="/services"||n.startsWith("/services/"):n===t||n.startsWith(`${t}/`)}function P(){const[t,n]=S.useState(!1),a=typeof window<"u"?window.location.pathname:"";return e.jsxs("header",{className:"relative z-50 w-full",children:[e.jsx("div",{className:"border-b border-white/10 bg-[#111827] px-4 py-2 text-xs text-white sm:text-sm",children:e.jsxs("div",{className:"mx-auto flex max-w-7xl items-center justify-center",children:[e.jsxs("div",{className:"flex flex-wrap items-center justify-center gap-x-8 gap-y-2",children:[e.jsxs("a",{href:l[0].href,className:"flex items-center gap-2 font-medium transition-colors duration-300 hover:text-[#74B946]",children:[e.jsx(o,{size:14,className:"text-[#74B946]"}),e.jsxs("span",{children:[e.jsx("strong",{children:"Maroc :"})," ",l[0].value]})]}),e.jsx("span",{className:"hidden text-white/20 sm:inline",children:"|"}),e.jsxs("a",{href:l[1].href,className:"flex items-center gap-2 font-medium transition-colors duration-300 hover:text-[#74B946]",children:[e.jsx(o,{size:14,className:"text-[#74B946]"}),e.jsxs("span",{children:[e.jsx("strong",{children:"Canada :"})," ",l[1].value]})]}),e.jsx("span",{className:"hidden text-white/20 sm:inline",children:"|"}),e.jsxs("a",{href:l[2].href,className:"flex items-center gap-2 transition-colors duration-300 hover:text-[#74B946]",children:[e.jsx(h,{size:14,className:"text-[#74B946]"}),e.jsx("span",{children:l[2].value})]})]}),e.jsx("div",{className:"hidden",children:"MONTRÉAL · CASABLANCA · PARIS"})]})}),e.jsx("div",{className:"border-b border-gray-100 bg-white shadow-sm",children:e.jsxs("div",{className:"mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8",children:[e.jsx(c,{href:"/",className:"flex shrink-0 items-center","aria-label":"AlloCall — Accueil",children:e.jsx("img",{src:"/images/logo-allocall.png",alt:"AlloCall",className:"h-12 w-auto object-contain sm:h-14"})}),e.jsx("nav",{className:"hidden items-center gap-5 xl:flex",children:f.map(s=>{const r=u(s.href,a);return e.jsxs(c,{href:s.href,className:`relative py-2 text-md font-semibold whitespace-nowrap transition-all duration-300 ${r?"text-[#74B946]":"text-[#1F2937] hover:text-[#74B946]"}`,children:[s.label,r&&e.jsx("span",{className:"absolute right-0 bottom-0 left-0 h-[2px] rounded-full bg-[#74B946]"})]},s.href)})}),e.jsx("div",{className:"hidden items-center xl:flex",children:e.jsxs(c,{href:"/contact",className:`
                                flex items-center gap-2
                                rounded-md
                                bg-[#74B946]
                                px-5 py-3
                                text-xs
                                font-bold
                                tracking-wide
                                text-white
                                uppercase
                                shadow-sm
                                transition-all
                                duration-300
                                hover:-translate-y-0.5
                                hover:bg-[#659F3B]
                                hover:shadow-lg
                            `,children:[e.jsx(p,{size:16}),"Demander une soumission"]})}),e.jsx("button",{type:"button",onClick:()=>n(!t),className:`
                            rounded-md
                            p-2
                            text-[#1F2937]
                            transition-all
                            duration-300
                            hover:bg-[#F1F8EC]
                            hover:text-[#74B946]
                            xl:hidden
                        `,"aria-label":t?"Fermer le menu":"Ouvrir le menu","aria-expanded":t,children:t?e.jsx(F,{size:28}):e.jsx(z,{size:28})})]})}),t&&e.jsx("div",{className:`
                        absolute
                        top-full
                        right-0
                        left-0
                        z-50
                        border-t
                        border-gray-100
                        bg-white
                        shadow-xl
                        xl:hidden
                    `,children:e.jsxs("div",{className:"space-y-1 px-4 py-5",children:[f.map(s=>{const r=u(s.href,a);return e.jsx(c,{href:s.href,onClick:()=>n(!1),className:`block rounded-md px-4 py-3 text-sm font-semibold transition-all duration-300 ${r?"bg-[#74B946] text-white":"text-[#1F2937] hover:bg-[#F1F8EC] hover:text-[#74B946]"}`,children:s.label},s.href)}),e.jsx("div",{className:"mt-4 border-t border-gray-100 pt-4",children:e.jsxs(c,{href:"/contact",onClick:()=>n(!1),className:`
                                    flex
                                    w-full
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-md
                                    bg-[#74B946]
                                    px-5
                                    py-3.5
                                    text-sm
                                    font-bold
                                    text-white
                                    uppercase
                                    transition-all
                                    duration-300
                                    hover:bg-[#659F3B]
                                `,children:[e.jsx(p,{size:17}),"Soumission gratuite"]})})]})}),e.jsx(D,{})]})}function Q({noIndex:t=!1}){const{seo:n}=M().props;return e.jsxs(E,{title:n.title,children:[e.jsx("meta",{"head-key":"description",name:"description",content:n.description}),e.jsx("meta",{"head-key":"keywords",name:"keywords",content:n.keywords.join(", ")}),e.jsx("meta",{"head-key":"robots",name:"robots",content:t?"noindex, nofollow":n.robots}),e.jsx("link",{"head-key":"canonical",rel:"canonical",href:n.canonical}),e.jsx("meta",{"head-key":"og:locale",property:"og:locale",content:"fr_CA"}),e.jsx("meta",{"head-key":"og:type",property:"og:type",content:"website"}),e.jsx("meta",{"head-key":"og:site_name",property:"og:site_name",content:"ALLO CALL"}),e.jsx("meta",{"head-key":"og:title",property:"og:title",content:n.title}),e.jsx("meta",{"head-key":"og:description",property:"og:description",content:n.description}),e.jsx("meta",{"head-key":"og:url",property:"og:url",content:n.canonical}),e.jsx("meta",{"head-key":"og:image",property:"og:image",content:n.image}),e.jsx("meta",{"head-key":"og:image:alt",property:"og:image:alt",content:n.title}),e.jsx("meta",{"head-key":"twitter:card",name:"twitter:card",content:"summary_large_image"}),e.jsx("meta",{"head-key":"twitter:title",name:"twitter:title",content:n.title}),e.jsx("meta",{"head-key":"twitter:description",name:"twitter:description",content:n.description}),e.jsx("meta",{"head-key":"twitter:image",name:"twitter:image",content:n.image}),e.jsx("script",{"head-key":"schema",type:"application/ld+json",children:JSON.stringify(n.schema).replace(/</g,"\\u003c")})]})}export{b as E,K as F,P as N,T as R,Q as S,_ as a,O as b,J as q};
