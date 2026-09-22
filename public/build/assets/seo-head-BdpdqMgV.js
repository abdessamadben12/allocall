import{j as e,m as h,ab as L,d as x,M as v,N as O,J as T,a7 as E,ac as $,ad as q,ae as W,F as y,X as P,af as _}from"./ui-C8qzVSeE.js";import{r as H,$ as p,K as D,L as J}from"./inertia-SOERDnsj.js";const I=[.22,1,.36,1],G=(n=.12,t=0)=>({hidden:{},visible:{transition:{staggerChildren:n,delayChildren:t}}});function Q({children:n,className:t,delay:a=0,y:s=28,amount:r=.2,as:u="div"}){const f=L(),j=h[u];return e.jsx(j,{className:t,initial:{opacity:0,y:f?0:s},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:r},transition:{duration:.7,delay:a,ease:I},children:n})}function V({children:n,className:t,stagger:a=.12,delay:s=0,amount:r=.15}){return e.jsx(h.div,{className:t,initial:"hidden",whileInView:"visible",viewport:{once:!0,amount:r},variants:G(a,s),children:n})}function K({children:n,className:t,y:a=28}){const r={hidden:{opacity:0,y:L()?0:a},visible:{opacity:1,y:0,transition:{duration:.65,ease:I}}};return e.jsx(h.div,{className:t,variants:r,children:n})}const c={phone:"05 22 48 44 25",whatsapp:"212668746386",whatsappMessage:"Bonjour Alidade, je souhaite obtenir des informations sur vos services.",email:"contact@alidade.ma",address:"3, Avenue 2 Mars Résidence Marwa 5 ème étage Casablanca, Maroc",mapEmbedUrl:"https://maps.google.com/maps?q=Casablanca%2C%20Maroc&z=12&output=embed",socials:{facebook:"",instagram:"",linkedin:""}};function X(){return`https://wa.me/${c.whatsapp}?text=${encodeURIComponent(c.whatsappMessage)}`}const re="/images/qui-sommes-nous/atelier-finition.webp",ie="/images/qui-sommes-nous/atelier-finition.webp",le="/images/agencement/agencement-et-réaménagement-image-2.webp",oe="/images/revetement-sol/revetement-sol-1.webp",ce="/images/qui-sommes-nous/amenagement.webp",Y="/logo_footer.png",de="/images/agencement/décoration_intérieure.webp",me="/images/bannieres/menuiserie-Bois2-final.webp",d={maroc:{phone:"+212 5 22 48 44 25",href:"tel:+212522484425"},montreal:{phone:"+1 514-660-2337",href:"tel:+15146602337"},email:"contact@allocall.ma"},N=[{href:c.socials.facebook,icon:e.jsx($,{size:18}),label:"Facebook"},{href:c.socials.instagram,icon:e.jsx(q,{size:18}),label:"Instagram"},{href:c.socials.linkedin,icon:e.jsx(W,{size:18}),label:"LinkedIn"}].filter(n=>n.href),xe=()=>e.jsxs("footer",{className:"overflow-hidden bg-[#111827] text-white",children:[e.jsxs("div",{className:"flex flex-col items-stretch lg:flex-row",children:[e.jsxs(Q,{className:`
                        flex
                        w-full
                        flex-col
                        justify-center
                        p-8
                        lg:w-1/3
                        lg:p-12
                    `,amount:.15,children:[e.jsx("div",{className:"mb-6",children:e.jsx("img",{src:Y,alt:"Logo AlloCall",className:"mb-4 h-14 w-auto",loading:"lazy",decoding:"async"})}),e.jsxs("p",{className:`
                            mb-8
                            max-w-sm
                            text-sm
                            leading-7
                            text-gray-400
                        `,children:["Une équipe à distance pour gérer vos appels, vos prospects et votre relation client.",e.jsx("br",{}),"AlloCall combine expertise humaine et technologie pour vous aider à ne laisser passer aucune opportunité."]}),e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(x,{className:`
                                    h-5
                                    w-5
                                    shrink-0
                                    text-[#74B946]
                                `}),e.jsxs("div",{className:"flex flex-wrap items-center gap-1",children:[e.jsx("span",{className:"text-xs font-semibold text-gray-500",children:"Maroc :"}),e.jsx("a",{href:d.maroc.href,className:`
                                        text-sm
                                        text-gray-300
                                        transition-colors
                                        duration-300
                                        hover:text-[#74B946]
                                    `,children:d.maroc.phone})]})]}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(x,{className:`
                                    h-5
                                    w-5
                                    shrink-0
                                    text-[#74B946]
                                `}),e.jsxs("div",{className:"flex flex-wrap items-center gap-1",children:[e.jsx("span",{className:"text-xs font-semibold text-gray-500",children:"Montréal :"}),e.jsx("a",{href:d.montreal.href,className:`
                                        text-sm
                                        text-gray-300
                                        transition-colors
                                        duration-300
                                        hover:text-[#74B946]
                                    `,children:d.montreal.phone})]})]}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(v,{className:`
                                    h-5
                                    w-5
                                    shrink-0
                                    text-[#74B946]
                                `}),e.jsx("a",{href:`mailto:${d.email}`,className:`
                                    text-sm
                                    text-gray-300
                                    transition-colors
                                    duration-300
                                    hover:text-[#74B946]
                                `,children:d.email})]})]}),N.length>0&&e.jsx("div",{className:"mt-8 flex gap-3",children:N.map(n=>e.jsx(Z,{href:n.href,label:n.label,icon:n.icon},n.label))})]}),e.jsxs(V,{stagger:.15,className:`
                        grid
                        flex-1
                        grid-cols-1
                        items-center
                        border-t
                        border-gray-800
                        md:grid-cols-3
                        lg:border-t-0
                    `,children:[e.jsx(w,{icon:e.jsx(O,{className:`
                                    h-10
                                    w-10
                                    text-[#74B946]
                                    lg:h-16
                                    lg:w-14
                                `,strokeWidth:1}),title:"RELATION CLIENT",description:"Des agents dédiés pour répondre à vos clients avec professionnalisme."}),e.jsx(w,{icon:e.jsx(T,{className:`
                                    h-10
                                    w-10
                                    text-[#74B946]
                                    lg:h-16
                                    lg:w-16
                                `,strokeWidth:1}),title:"PERFORMANCE",description:"Qualification, suivi et relance pour transformer plus de prospects.",hasBorder:!0}),e.jsx(w,{icon:e.jsx(E,{className:`
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
                        `,children:["© ",new Date().getFullYear()," AlloCall. Tous droits réservés."]})})})]}),w=({icon:n,title:t,description:a,hasBorder:s})=>e.jsxs(K,{className:`
            flex
            flex-col
            items-center
            p-10
            text-center
            ${s?"border-gray-800 md:border-x":""}
        `,children:[e.jsx("div",{className:"mb-6",children:n}),e.jsx("h3",{className:`
                mb-4
                text-xs
                font-bold
                tracking-widest
                uppercase
                lg:text-sm
            `,children:t}),e.jsx("p",{className:`
                px-4
                text-xs
                leading-6
                text-gray-400
                lg:text-base
            `,children:a})]}),Z=({icon:n,href:t,label:a})=>e.jsx(h.a,{href:t,target:"_blank",rel:"noopener noreferrer","aria-label":a,whileHover:{scale:1.15,y:-2},whileTap:{scale:.95},transition:{type:"spring",stiffness:400,damping:18},className:`
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
        `,children:n}),ee=({size:n=26})=>e.jsx("svg",{viewBox:"0 0 32 32",width:n,height:n,fill:"currentColor","aria-hidden":"true",children:e.jsx("path",{d:"M16.004 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.59 4.47 1.71 6.42L3.2 28.8l6.56-1.72a12.74 12.74 0 0 0 6.24 1.63h.01c7.06 0 12.79-5.74 12.79-12.8 0-3.42-1.33-6.63-3.75-9.05a12.72 12.72 0 0 0-9.05-3.66zm0 23.36h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-4.02 1.05 1.07-3.92-.25-.4a10.56 10.56 0 0 1-1.62-5.64c0-5.87 4.78-10.64 10.66-10.64 2.84 0 5.51 1.11 7.52 3.12a10.57 10.57 0 0 1 3.11 7.53c0 5.87-4.78 10.61-10.67 10.61zm5.84-7.96c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.51-.16-.72.16-.21.32-.82 1.04-1.01 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.54-.72-.55l-.61-.01c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66 0 1.57 1.15 3.09 1.31 3.3.16.21 2.25 3.44 5.45 4.82.76.33 1.36.53 1.82.67.77.24 1.46.21 2.01.13.61-.09 1.89-.77 2.16-1.52.27-.75.27-1.39.19-1.52-.08-.13-.29-.21-.61-.37z"})});function ne(){return e.jsxs(h.a,{href:X(),target:"_blank",rel:"noopener noreferrer","aria-label":"Contacter Alidade sur WhatsApp",initial:{scale:0,opacity:0},animate:{scale:1,opacity:1},whileHover:{scale:1.12},whileTap:{scale:.94},transition:{type:"spring",stiffness:260,damping:18,delay:.6},className:"fixed right-5 bottom-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl",children:[e.jsx("span",{className:"absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40"}),e.jsx(ee,{})]})}const A=[{href:"/",label:"Accueil"},{href:"/services",label:"Services"},{href:"/industries",label:"Industries"},{href:"/solutions-ia",label:"Solutions IA"},{href:"/pourquoi-allocall",label:"Pourquoi AlloCall"},{href:"/apropos",label:"À propos"},{href:"/contact",label:"Contact"}],m=[{label:"Maroc",value:"+212 5 22 48 44 25",href:"tel:+212522484425",icon:x},{label:"Canada",value:"+1 (514) 850-9092",href:"tel:+15148509092",icon:x},{label:null,value:"contact@allocall.ma",href:"mailto:contact@allocall.ma",icon:v}];function C(n,t){return n==="/"?t==="/":n==="/services"?t==="/services"||t.startsWith("/services/"):t===n||t.startsWith(`${n}/`)}function pe(){const[n,t]=H.useState(!1),a=typeof window<"u"?window.location.pathname:"";return e.jsxs("header",{className:"relative z-50 w-full",children:[e.jsx("div",{className:"border-b border-white/10 bg-[#111827] px-4 py-2 text-xs text-white sm:text-sm",children:e.jsxs("div",{className:"mx-auto flex max-w-7xl items-center justify-center",children:[e.jsxs("div",{className:"flex flex-wrap items-center justify-center gap-x-8 gap-y-2",children:[e.jsxs("a",{href:m[0].href,className:"flex items-center gap-2 font-medium transition-colors duration-300 hover:text-[#74B946]",children:[e.jsx(x,{size:14,className:"text-[#74B946]"}),e.jsxs("span",{children:[e.jsx("strong",{children:"Maroc :"})," ",m[0].value]})]}),e.jsx("span",{className:"hidden text-white/20 sm:inline",children:"|"}),e.jsxs("a",{href:m[1].href,className:"flex items-center gap-2 font-medium transition-colors duration-300 hover:text-[#74B946]",children:[e.jsx(x,{size:14,className:"text-[#74B946]"}),e.jsxs("span",{children:[e.jsx("strong",{children:"Canada :"})," ",m[1].value]})]}),e.jsx("span",{className:"hidden text-white/20 sm:inline",children:"|"}),e.jsxs("a",{href:m[2].href,className:"flex items-center gap-2 transition-colors duration-300 hover:text-[#74B946]",children:[e.jsx(v,{size:14,className:"text-[#74B946]"}),e.jsx("span",{children:m[2].value})]})]}),e.jsx("div",{className:"hidden",children:"MONTRÉAL · CASABLANCA · PARIS"})]})}),e.jsx("div",{className:"border-b border-gray-100 bg-white shadow-sm",children:e.jsxs("div",{className:"mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8",children:[e.jsx(p,{href:"/",className:"flex shrink-0 items-center","aria-label":"AlloCall — Accueil",children:e.jsx("img",{src:"/images/logo-allocall.png",alt:"AlloCall",className:"h-12 w-auto object-contain sm:h-14"})}),e.jsx("nav",{className:"hidden items-center gap-5 xl:flex",children:A.map(s=>{const r=C(s.href,a);return e.jsxs(p,{href:s.href,className:`relative py-2 text-sm font-semibold whitespace-nowrap transition-all duration-300 ${r?"text-[#74B946]":"text-[#1F2937] hover:text-[#74B946]"}`,children:[s.label,r&&e.jsx("span",{className:"absolute right-0 bottom-0 left-0 h-[2px] rounded-full bg-[#74B946]"})]},s.href)})}),e.jsx("div",{className:"hidden items-center xl:flex",children:e.jsxs(p,{href:"/contact",className:`
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
                            `,children:[e.jsx(y,{size:16}),"Demander une soumission"]})}),e.jsx("button",{type:"button",onClick:()=>t(!n),className:`
                            rounded-md
                            p-2
                            text-[#1F2937]
                            transition-all
                            duration-300
                            hover:bg-[#F1F8EC]
                            hover:text-[#74B946]
                            xl:hidden
                        `,"aria-label":n?"Fermer le menu":"Ouvrir le menu","aria-expanded":n,children:n?e.jsx(P,{size:28}):e.jsx(_,{size:28})})]})}),n&&e.jsx("div",{className:`
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
                    `,children:e.jsxs("div",{className:"space-y-1 px-4 py-5",children:[A.map(s=>{const r=C(s.href,a);return e.jsx(p,{href:s.href,onClick:()=>t(!1),className:`block rounded-md px-4 py-3 text-sm font-semibold transition-all duration-300 ${r?"bg-[#74B946] text-white":"text-[#1F2937] hover:bg-[#F1F8EC] hover:text-[#74B946]"}`,children:s.label},s.href)}),e.jsx("div",{className:"mt-4 border-t border-gray-100 pt-4",children:e.jsxs(p,{href:"/contact",onClick:()=>t(!1),className:`
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
                                `,children:[e.jsx(y,{size:17}),"Soumission gratuite"]})})]})}),e.jsx(ne,{})]})}const o="ALLO CALL",B="ALLO CALL accompagne les entreprises dans la gestion des appels, la relation client, la televente, la prise de rendez-vous, la gestion de leads et les solutions de centre d appels propulsees par l IA.",k="/images/hero/allocall-call-center.webp",S="https://www.allocall.ma/";function te(n){if(typeof n=="string"&&n.trim()!=="")try{return new URL(n).toString()}catch{}return typeof window<"u"&&window.location.origin?`${window.location.origin}/`:S}function l(n,t){try{return new URL(n,t).toString()}catch{return new URL(n.replace(/^\//,""),S).toString()}}function he({title:n,description:t,keywords:a,image:s=k,type:r="website",noIndex:u=!1,structuredData:f}){const{url:j,props:z}=D(),i=te(z.appUrl),g=l(j.split("?")[0],i),b=l(s,i),M=u?"noindex, nofollow":"index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",F=f??{"@context":"https://schema.org","@type":"WebPage",name:n,description:t,url:g,isPartOf:{"@type":"WebSite",name:o,url:l("/",i)}},R={"@context":"https://schema.org","@type":"ProfessionalService","@id":l("/#entreprise",i),name:o,url:l("/",i),logo:l("/images/logo-allocall.png",i),image:l(k,i),description:B,telephone:"+212522484425",email:c.email,address:{"@type":"PostalAddress",streetAddress:"3, Avenue 2 Mars",addressLocality:"Casablanca",addressCountry:"MA"},areaServed:["Quebec","Canada","Maroc","France"],serviceType:["Reception telephonique","Televente","Prise de rendez-vous","Gestion de leads","Service a la clientele","Support technique niveau 1","Centre d appels IA"],sameAs:Object.values(c.socials).filter(U=>U!=="")};return e.jsxs(J,{title:n,children:[e.jsx("meta",{name:"description",content:t}),e.jsx("meta",{name:"keywords",content:a.join(", ")}),e.jsx("meta",{name:"robots",content:M}),e.jsx("meta",{name:"author",content:o}),e.jsx("meta",{name:"application-name",content:o}),e.jsx("meta",{name:"format-detection",content:"telephone=yes"}),e.jsx("link",{rel:"canonical",href:g}),e.jsx("link",{rel:"alternate",hrefLang:"fr-CA",href:g}),e.jsx("meta",{property:"og:locale",content:"fr_CA"}),e.jsx("meta",{property:"og:type",content:r}),e.jsx("meta",{property:"og:site_name",content:o}),e.jsx("meta",{property:"og:title",content:n}),e.jsx("meta",{property:"og:description",content:t}),e.jsx("meta",{property:"og:url",content:g}),e.jsx("meta",{property:"og:image",content:b}),e.jsx("meta",{property:"og:image:secure_url",content:b}),e.jsx("meta",{property:"og:image:alt",content:`${o} - ${n}`}),e.jsx("meta",{name:"twitter:card",content:"summary_large_image"}),e.jsx("meta",{name:"twitter:title",content:n}),e.jsx("meta",{name:"twitter:description",content:t}),e.jsx("meta",{name:"twitter:image",content:b}),e.jsx("script",{type:"application/ld+json",children:JSON.stringify({"@context":"https://schema.org","@type":"WebSite",name:o,url:l("/",i),description:B,inLanguage:"fr-CA"})}),e.jsx("script",{type:"application/ld+json",children:JSON.stringify(R)}),e.jsx("script",{type:"application/ld+json",children:JSON.stringify(F)})]})}export{I as E,xe as F,pe as N,Q as R,he as S,V as a,K as b,de as c,re as d,le as e,oe as f,ce as g,ie as h,me as q,c as s};
