import{j as e,t as b,g as o}from"./ui-Ba4j7OqQ.js";import{Link as g}from"./localized-link-o8bOpeOp.js";import{R as j}from"./motion-CKERwvEQ.js";import{i as N}from"./industry-overview-2QKGavgS.js";import{u as y}from"./i18n-roBKE8w-.js";import{r}from"./inertia-SOERDnsj.js";import"./i18n-DWkK9jAk.js";const p=N.map(t=>({slug:t.slug,title:t.name,description:t.summary,image:t.image,imageAlt:t.imageAlt,href:t.href.startsWith("/industries/")?t.href:`/industries#${t.slug}`})),v=3;function E(){const{t}=y(),[n,l]=r.useState(0),[d,B]=r.useState(!1),[c,u]=r.useState(!1),[m,h]=r.useState(!1),a=Math.max(0,p.length-v),w=p.slice(n,n+v),x=()=>{l(s=>Math.max(0,s-1))},f=()=>{l(s=>Math.min(a,s+1))};return r.useEffect(()=>{if(d||c||m||n>=a)return;const s=window.setInterval(()=>{document.hidden||l(i=>Math.min(a,i+1))},5e3);return()=>window.clearInterval(s)},[d,c,m,n,a]),e.jsx("section",{className:"bg-white","aria-labelledby":"home-industries-title",children:e.jsxs("div",{className:"mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",children:[e.jsxs(j,{className:"mx-auto max-w-5xl text-center",children:[e.jsx("h2",{id:"home-industries-title",className:"text-4xl font-extrabold tracking-normal text-[#111827] uppercase sm:text-5xl",children:t("Industries")}),e.jsx("p",{className:"mx-auto mt-5 text-center text-xs leading-6 font-light text-gray-500 sm:text-sm lg:text-base",children:t("Des solutions pour vos appels, vos prospects et vos rendez-vous, adaptées à votre secteur.")})]}),e.jsxs("div",{className:"relative",onMouseEnter:()=>u(!0),onMouseLeave:()=>u(!1),onFocusCapture:()=>h(!0),onBlurCapture:s=>{s.currentTarget.contains(s.relatedTarget)||h(!1)},children:[e.jsx("button",{type:"button",onClick:x,disabled:n===0,"aria-label":t("Secteurs précédents"),className:`
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
                        `,children:e.jsx(b,{size:22})}),e.jsx("div",{className:"mt-6 grid auto-rows-fr gap-7 lg:grid-cols-3",children:w.map(s=>e.jsxs(g,{href:s.href,"aria-labelledby":`home-industry-${s.slug}`,className:`
                                    group relative grid min-h-96
                                    overflow-hidden bg-[#111827]
                                    shadow-sm
                                    focus-visible:outline-3
                                    focus-visible:outline-offset-4
                                    focus-visible:outline-[#74B946]
                                `,children:[e.jsx("img",{src:s.image,alt:t(s.imageAlt),width:"960",height:"1080",className:`
                                        absolute inset-0 h-full w-full
                                        object-cover
                                        transition-transform duration-700
                                        group-hover:scale-105
                                        motion-reduce:transform-none
                                        motion-reduce:transition-none
                                    `,loading:"lazy",decoding:"async"}),e.jsx("div",{className:"absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/50 to-transparent"}),e.jsxs("div",{className:"relative self-end p-6 text-white",children:[e.jsx("h3",{id:`home-industry-${s.slug}`,className:"text-xl font-extrabold tracking-normal sm:text-2xl",children:t(s.title)}),e.jsx("p",{className:"mt-3 max-w-sm text-sm leading-5 font-medium text-white/95",children:t(s.description)}),e.jsxs("span",{className:"mt-5 inline-flex items-center gap-2 text-base font-semibold text-[#b6e58e]",children:[t("Découvrir"),e.jsx(o,{size:18,"aria-hidden":"true"})]})]})]},s.slug))}),e.jsx("button",{type:"button",onClick:f,disabled:n>=a,"aria-label":t("Secteurs suivants"),className:`
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
                        `,children:e.jsx(o,{size:22})}),e.jsxs("div",{className:"mt-6 flex items-center justify-center gap-3 lg:hidden",children:[e.jsx("button",{type:"button",onClick:x,disabled:n===0,className:`
                                flex h-11 w-11 items-center justify-center
                                rounded-full border border-gray-200
                                bg-white text-[#111827]
                                transition
                                hover:border-[#74B946]
                                hover:bg-[#74B946]
                                hover:text-white
                                disabled:cursor-not-allowed
                                disabled:opacity-30
                            `,children:e.jsx(b,{size:20})}),e.jsx("button",{type:"button",onClick:f,disabled:n>=a,className:`
                                flex h-11 w-11 items-center justify-center
                                rounded-full border border-gray-200
                                bg-white text-[#111827]
                                transition
                                hover:border-[#74B946]
                                hover:bg-[#74B946]
                                hover:text-white
                                disabled:cursor-not-allowed
                                disabled:opacity-30
                            `,children:e.jsx(o,{size:20})})]}),e.jsx("div",{className:"mt-6 flex flex-wrap items-center justify-center gap-2",children:Array.from({length:a+1},(s,i)=>e.jsx("button",{type:"button",onClick:()=>l(i),"aria-label":t("Afficher le groupe {0}",[String(i+1)]),"aria-pressed":i===n,className:`
                                        flex h-6 items-center
                                        justify-center
                                        focus-visible:outline-2
                                        focus-visible:outline-[#74B946]
                                    `,children:e.jsx("span",{className:`
                                            h-2 rounded-full
                                            transition-all duration-300
                                            ${i===n?"w-6 bg-[#74B946]":"w-2 bg-gray-300"}
                                        `})},i))})]}),e.jsx("div",{className:"mt-4 text-center",children:e.jsxs(g,{href:"/industries",className:`
                            inline-flex items-center gap-2 py-3
                            text-xs font-bold tracking-[0.2em]
                            text-[#74B946] uppercase
                            hover:underline sm:text-sm
                        `,children:[t("Tous nos secteurs"),e.jsx(o,{size:18,"aria-hidden":"true"})]})})]})})}export{E as default};
