import{j as n,n as f,p as l,ag as S,ak as E,ai as z,ad as A,$ as j}from"./ui-D4M2U_4V.js";import{u as x,R as c,L as d,E as w}from"./navbar-WWe8bZrE.js";import{i as C}from"./industry-overview-2QKGavgS.js";import{r as o}from"./inertia-SOERDnsj.js";const N=C.map(e=>({slug:e.slug,title:e.name,description:e.summary,image:e.image,imageAlt:e.imageAlt,href:e.href.startsWith("/industries/")?e.href:`/industries#${e.slug}`})),y=3;function D(){const{t:e}=x(),[t,a]=o.useState(0),[u,U]=o.useState(!1),[m,h]=o.useState(!1),[p,g]=o.useState(!1),r=Math.max(0,N.length-y),B=N.slice(t,t+y),b=()=>{a(s=>Math.max(0,s-1))},v=()=>{a(s=>Math.min(r,s+1))};return o.useEffect(()=>{if(u||m||p||t>=r)return;const s=window.setInterval(()=>{document.hidden||a(i=>Math.min(r,i+1))},5e3);return()=>window.clearInterval(s)},[u,m,p,t,r]),n.jsxs("section",{className:`
                relative
                overflow-hidden
                bg-white
                py-14
                sm:py-16
                lg:py-20
            `,"aria-labelledby":"home-industries-title",children:[n.jsx("div",{className:`
                    pointer-events-none
                    absolute
                    top-0
                    left-1/2
                    h-[420px]
                    w-[700px]
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    bg-[#74B946]/5
                    blur-3xl
                `}),n.jsxs("div",{className:`
                    relative
                    mx-auto
                    max-w-7xl
                    px-4
                    sm:px-6
                    lg:px-8
                `,children:[n.jsxs(c,{className:"mx-auto max-w-4xl text-center",children:[n.jsxs("div",{className:`
                            mb-4
                            flex
                            items-center
                            justify-center
                            gap-3
                        `,children:[n.jsx("span",{className:"h-[2px] w-8 bg-[#74B946]"}),n.jsx("span",{className:`
                                text-xs
                                font-bold
                                tracking-[0.2em]
                                text-[#74B946]
                                uppercase
                                sm:text-sm
                            `,children:e("DES SOLUTIONS ADAPTÉES À VOTRE SECTEUR")}),n.jsx("span",{className:"h-[2px] w-8 bg-[#74B946]"})]}),n.jsxs("h2",{id:"home-industries-title",className:`
                            text-3xl
                            leading-tight
                            font-extrabold
                            tracking-tight
                            text-[#111827]
                            uppercase
                            sm:text-4xl
                            lg:text-5xl
                        `,children:[e("NOUS COMPRENONS VOTRE"),n.jsxs("span",{className:"text-[#74B946]",children:[n.jsx("br",{}),e("RÉALITÉ D’AFFAIRES")]})]}),n.jsx("p",{className:`
                            mx-auto
                            mt-5
                            max-w-3xl
                            text-sm
                            leading-7
                            font-light
                            text-gray-500
                            sm:text-base
                            lg:text-lg
                        `,children:e("Automobile, santé, thermopompes, construction, assurance ou immobilier : ALLO CALL adapte ses agents, ses scripts et ses processus aux besoins des entreprises du Québec et du Canada.")})]}),n.jsxs("div",{className:"relative mt-10",onMouseEnter:()=>h(!0),onMouseLeave:()=>h(!1),onFocusCapture:()=>g(!0),onBlurCapture:s=>{s.currentTarget.contains(s.relatedTarget)||g(!1)},children:[n.jsx("button",{type:"button",onClick:b,disabled:t===0,"aria-label":e("Secteurs précédents"),className:`
                            absolute
                            top-1/2
                            -left-5
                            z-20
                            hidden
                            h-12
                            w-12
                            -translate-y-1/2
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-gray-100
                            bg-white
                            text-[#111827]
                            shadow-lg
                            transition-all
                            duration-300

                            hover:border-[#74B946]
                            hover:bg-[#74B946]
                            hover:text-white

                            disabled:cursor-not-allowed
                            disabled:opacity-30
                            disabled:hover:border-gray-100
                            disabled:hover:bg-white
                            disabled:hover:text-[#111827]

                            lg:flex
                        `,children:n.jsx(f,{size:22,"aria-hidden":"true"})}),n.jsx("div",{className:`
                            grid
                            auto-rows-fr
                            gap-7
                            md:grid-cols-2
                            lg:grid-cols-3
                        `,children:B.map(s=>n.jsxs(d,{href:s.href,"aria-labelledby":`home-industry-${s.slug}`,className:`
                                        group
                                        relative
                                        grid
                                        min-h-[460px]
                                        overflow-hidden
                                        rounded-[24px]
                                        bg-[#111827]
                                        shadow-sm
                                        transition-all
                                        duration-500

                                        hover:-translate-y-1
                                        hover:shadow-xl

                                        focus-visible:outline-3
                                        focus-visible:outline-offset-4
                                        focus-visible:outline-[#74B946]
                                    `,children:[n.jsx("img",{src:s.image,alt:e(s.imageAlt),width:"960",height:"1080",className:`
                                            absolute
                                            inset-0
                                            h-full
                                            w-full
                                            object-cover
                                            transition-transform
                                            duration-700
                                            group-hover:scale-105

                                            motion-reduce:transform-none
                                            motion-reduce:transition-none
                                        `,loading:"lazy",decoding:"async"}),n.jsx("div",{className:`
                                            absolute
                                            inset-0
                                            bg-gradient-to-t
                                            from-[#111827]
                                            via-[#111827]/60
                                            to-[#111827]/5
                                        `}),n.jsx("div",{className:`
                                            absolute
                                            top-0
                                            left-0
                                            h-1
                                            w-0
                                            bg-[#74B946]
                                            transition-all
                                            duration-500
                                            group-hover:w-full
                                        `}),n.jsxs("div",{className:`
                                            relative
                                            self-end
                                            p-6
                                            text-white
                                            sm:p-7
                                        `,children:[n.jsx("h3",{id:`home-industry-${s.slug}`,className:`
                                                text-xl
                                                font-extrabold
                                                tracking-normal
                                                sm:text-2xl
                                            `,children:e(s.title)}),n.jsx("p",{className:`
                                                mt-3
                                                max-w-sm
                                                text-sm
                                                leading-6
                                                font-normal
                                                text-white/85
                                            `,children:e(s.description)}),n.jsxs("span",{className:`
                                                mt-6
                                                inline-flex
                                                items-center
                                                gap-2
                                                text-sm
                                                font-bold
                                                text-[#b6e58e]
                                                transition-all
                                                duration-300
                                                group-hover:gap-3
                                                sm:text-base
                                            `,children:[e("Découvrir ce secteur"),n.jsx(l,{size:18,"aria-hidden":"true"})]})]})]},s.slug))}),n.jsx("button",{type:"button",onClick:v,disabled:t>=r,"aria-label":e("Secteurs suivants"),className:`
                            absolute
                            top-1/2
                            -right-5
                            z-20
                            hidden
                            h-12
                            w-12
                            -translate-y-1/2
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-gray-100
                            bg-white
                            text-[#111827]
                            shadow-lg
                            transition-all
                            duration-300

                            hover:border-[#74B946]
                            hover:bg-[#74B946]
                            hover:text-white

                            disabled:cursor-not-allowed
                            disabled:opacity-30
                            disabled:hover:border-gray-100
                            disabled:hover:bg-white
                            disabled:hover:text-[#111827]

                            lg:flex
                        `,children:n.jsx(l,{size:22,"aria-hidden":"true"})}),n.jsxs("div",{className:`
                            mt-6
                            flex
                            items-center
                            justify-center
                            gap-3
                            lg:hidden
                        `,children:[n.jsx("button",{type:"button",onClick:b,disabled:t===0,"aria-label":e("Secteurs précédents"),className:`
                                flex
                                h-11
                                w-11
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-gray-200
                                bg-white
                                text-[#111827]
                                transition

                                hover:border-[#74B946]
                                hover:bg-[#74B946]
                                hover:text-white

                                disabled:cursor-not-allowed
                                disabled:opacity-30
                            `,children:n.jsx(f,{size:20})}),n.jsx("button",{type:"button",onClick:v,disabled:t>=r,"aria-label":e("Secteurs suivants"),className:`
                                flex
                                h-11
                                w-11
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-gray-200
                                bg-white
                                text-[#111827]
                                transition

                                hover:border-[#74B946]
                                hover:bg-[#74B946]
                                hover:text-white

                                disabled:cursor-not-allowed
                                disabled:opacity-30
                            `,children:n.jsx(l,{size:20})})]}),n.jsx("div",{className:`
                            mt-6
                            flex
                            flex-wrap
                            items-center
                            justify-center
                            gap-2
                        `,children:Array.from({length:r+1},(s,i)=>n.jsx("button",{type:"button",onClick:()=>a(i),"aria-label":e("Afficher le groupe {0}",[String(i+1)]),"aria-pressed":i===t,className:`
                                        flex
                                        h-6
                                        items-center
                                        justify-center

                                        focus-visible:outline-2
                                        focus-visible:outline-[#74B946]
                                    `,children:n.jsx("span",{className:`
                                            h-2
                                            rounded-full
                                            transition-all
                                            duration-300

                                            ${i===t?"w-6 bg-[#74B946]":"w-2 bg-gray-300"}
                                        `})},i))})]}),n.jsx("div",{className:"mt-7 text-center",children:n.jsxs(d,{href:"/industries",className:`
                            group
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-[#74B946]/20
                            px-6
                            py-3
                            text-xs
                            font-bold
                            tracking-[0.14em]
                            text-[#74B946]
                            uppercase
                            transition-all
                            duration-300

                            hover:border-[#74B946]
                            hover:bg-[#74B946]
                            hover:text-white

                            sm:text-sm
                        `,children:[e("Découvrir tous nos secteurs"),n.jsx(l,{size:18,"aria-hidden":"true",className:`
                                transition-transform
                                duration-300
                                group-hover:translate-x-1
                            `})]})})]})]})}const k="/images/services/assistante-virtuelle.webp",I="/images/services/televente-appels-sortants.webp",L="/images/services/gestion-leads.webp",R="/images/services/prise-rendez-vous.webp",O=[{slug:"assistants-virtuels",title:"Assistants virtuels",description:"Une équipe à distance pour gérer vos appels, vos courriels, votre agenda et vos tâches administratives, comme une extension de votre entreprise.",imageUrl:k,icon:n.jsx(S,{size:23})},{slug:"televente-appels-sortants",title:"Télévente et appels sortants",description:"Des agents commerciaux pour contacter vos prospects, présenter votre offre, qualifier leurs besoins et générer davantage d'occasions d'affaires.",imageUrl:I,icon:n.jsx(E,{size:23})},{slug:"gestion-leads",title:"Gestion et qualification des prospects",description:"Nous répondons rapidement à vos nouvelles demandes, qualifions vos prospects et assurons les suivis afin de réduire les occasions perdues.",imageUrl:L,icon:n.jsx(z,{size:23})},{slug:"prise-rendez-vous",title:"Prise de rendez-vous",description:"Nos agents communiquent avec vos prospects et clients, les qualifient et planifient directement les rendez-vous dans votre calendrier.",imageUrl:R,icon:n.jsx(A,{size:23})}];function T({service:e,index:t}){const{t:a}=x();return n.jsx(j.div,{initial:"hidden",whileInView:"visible",viewport:{once:!0,amount:.3},variants:{hidden:{opacity:0,y:45},visible:{opacity:1,y:0,transition:{duration:.65,ease:w}}},children:n.jsxs(d,{href:`/services/${e.slug}`,className:`
                    group
                    relative
                    flex
                    h-auto
                    items-stretch
                    overflow-hidden
                    rounded-2xl
                    border
                    border-gray-100
                    bg-[#F8FAFC]
                    shadow-sm
                    transition-all
                    duration-300

                    hover:-translate-y-1
                    hover:border-[#74B946]/20
                    hover:shadow-xl

                    sm:h-[150px]
                    lg:h-[150px]
                `,children:[n.jsxs("div",{className:`
                        relative
                        flex
                        w-20
                        shrink-0
                        items-center
                        justify-center
                        border-r
                        border-gray-100
                        sm:w-28
                    `,children:[n.jsx("div",{className:`
                            absolute
                            top-0
                            bottom-0
                            left-0
                            w-[4px]
                            bg-[#74B946]
                            opacity-0
                            transition-opacity
                            duration-300
                            group-hover:opacity-100
                        `}),n.jsx("span",{className:`
                            text-3xl
                            font-black
                            text-gray-200
                            transition-colors
                            duration-300
                            group-hover:text-[#74B946]
                            sm:text-5xl
                        `,children:String(t+1).padStart(2,"0")})]}),n.jsxs("div",{className:`
                        flex
                        min-w-0
                        flex-grow
                        items-center
                        gap-4
                        px-5
                        py-6
                        sm:px-7
                        lg:px-8
                    `,children:[n.jsx("div",{className:`
                            hidden
                            h-12
                            w-12
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-[#EFF8E9]
                            text-[#74B946]
                            transition-all
                            duration-300

                            group-hover:bg-[#74B946]
                            group-hover:text-white

                            md:flex
                        `,children:e.icon}),n.jsxs("div",{className:"min-w-0 flex-1",children:[n.jsx("h4",{className:`
                                text-base
                                font-bold
                                tracking-wide
                                text-[#111827]
                                uppercase
                                transition-colors
                                duration-300

                                group-hover:text-[#74B946]

                                sm:text-xl
                                lg:text-2xl
                            `,children:a(e.title)}),n.jsx(j.div,{className:"overflow-hidden",variants:{hidden:{height:0,opacity:0,marginTop:0},visible:{height:"auto",opacity:1,marginTop:6,transition:{duration:.7,delay:.2,ease:w}}},children:n.jsx("p",{className:`
                                    max-w-3xl
                                    text-xs
                                    leading-6
                                    font-light
                                    text-gray-500

                                    sm:text-sm
                                    lg:text-base
                                `,children:a(e.description)})})]})]}),n.jsxs("div",{className:`
                        relative
                        hidden
                        h-full
                        w-[32%]
                        max-w-[330px]
                        shrink-0
                        overflow-hidden
                        sm:block
                    `,children:[n.jsx("img",{src:e.imageUrl,alt:a(e.title),loading:"lazy",decoding:"async",className:`
                            h-full
                            w-full
                            object-cover
                            transition-transform
                            duration-700
                            group-hover:scale-110
                        `}),n.jsx("div",{className:`
                            pointer-events-none
                            absolute
                            inset-0
                            bg-gradient-to-l
                            from-transparent
                            to-[#111827]/5
                        `})]}),n.jsx("span",{className:`
                        mr-4
                        flex
                        items-center
                        self-center
                        text-[#74B946]
                        sm:hidden
                    `,children:n.jsx(l,{size:19})})]})})}function V(){const{t:e}=x();return n.jsxs("section",{className:`
                relative
                overflow-hidden
                border-t
                border-gray-100
                bg-white
                py-12
                lg:py-20
            `,children:[n.jsx("div",{className:`
                    pointer-events-none
                    absolute
                    top-0
                    right-0
                    h-[400px]
                    w-[400px]
                    translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    bg-[#74B946]/5
                    blur-3xl
                `}),n.jsxs("div",{className:`
                    relative
                    mx-auto
                    max-w-6xl
                    px-4
                    sm:px-6
                    lg:px-8
                `,children:[n.jsxs(c,{className:"mx-auto max-w-3xl text-center",children:[n.jsxs("div",{className:`
                            mb-4
                            flex
                            items-center
                            justify-center
                            gap-3
                        `,children:[n.jsx("span",{className:"h-[2px] w-8 bg-[#74B946]"}),n.jsx("span",{className:`
                                text-xs
                                font-bold
                                tracking-[0.2em]
                                text-[#74B946]
                                uppercase
                                sm:text-sm
                            `,children:e("NOS SERVICES")}),n.jsx("span",{className:"h-[2px] w-8 bg-[#74B946]"})]}),n.jsxs("h3",{className:`
                            text-3xl
                            leading-tight
                            font-extrabold
                            tracking-tight
                            text-[#111827]
                            uppercase

                            sm:text-4xl
                            lg:text-5xl
                        `,children:[e("UNE ÉQUIPE POUR"),n.jsxs("span",{className:"text-[#74B946]",children:[n.jsx("br",{}),e("SOUTENIR VOTRE CROISSANCE")]})]}),n.jsx("p",{className:`
                            mx-auto
                            mt-5
                            max-w-3xl
                            text-xs
                            leading-6
                            font-light
                            text-gray-500

                            sm:text-sm
                            lg:text-base
                        `,children:e("ALLO CALL accompagne les entreprises du Québec et du Canada avec des services de réception téléphonique, télévente, qualification de prospects et prise de rendez-vous.")})]}),n.jsx("div",{className:"mt-14 space-y-5",children:O.map((t,a)=>n.jsx(T,{service:t,index:a},t.slug))}),n.jsx(c,{className:"mt-12 text-center",delay:.15,children:n.jsxs(d,{href:"/services",className:`
                            group
                            inline-flex
                            items-center
                            gap-3
                            rounded-md
                            bg-[#74B946]
                            px-8
                            py-4
                            text-xs
                            font-bold
                            tracking-widest
                            text-white
                            uppercase
                            shadow-lg
                            transition-all
                            duration-300

                            hover:-translate-y-0.5
                            hover:bg-[#659F3B]
                            hover:shadow-xl

                            sm:text-sm
                        `,children:[n.jsx("span",{children:e("Découvrir tous nos services")}),n.jsx(l,{size:17,className:`
                                transition-transform
                                duration-300
                                group-hover:translate-x-1
                            `})]})})]})]})}export{D as I,V as M};
