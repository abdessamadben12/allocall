import { useRef, useState } from 'react';

// Slider avant/après : deux images superposées, curseur draggable (souris + tactile).
export default function BeforeAfter({ before, after, alt }: { before: string; after: string; alt?: string }) {
    const [position, setPosition] = useState(50);
    const containerRef = useRef<HTMLDivElement>(null);

    const moveTo = (clientX: number) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        setPosition(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
    };

    return (
        <div
            ref={containerRef}
            className="relative h-full w-full cursor-ew-resize touch-none select-none"
            onPointerDown={(e) => {
                e.currentTarget.setPointerCapture(e.pointerId);
                moveTo(e.clientX);
            }}
            onPointerMove={(e) => {
                if (e.buttons === 1) moveTo(e.clientX);
            }}
        >
            <img src={after} alt={alt ? `${alt} — après` : 'Après'} className="absolute inset-0 h-full w-full object-cover" draggable={false} />
            <img
                src={before}
                alt={alt ? `${alt} — avant` : 'Avant'}
                className="absolute inset-0 h-full w-full object-cover"
                style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
                draggable={false}
            />

            {/* Ligne + poignée */}
            <div className="absolute top-0 bottom-0 z-10 w-0.5 bg-alidade-gold" style={{ left: `${position}%` }}>
                <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-alidade-gold shadow-lg">
                    <span className="text-alidade-navy text-sm font-black tracking-tighter">⇔</span>
                </div>
            </div>

            {/* Étiquettes */}
            <span className="bg-alidade-navy/80 absolute top-4 left-4 rounded px-2.5 py-1 text-[10px] font-bold tracking-widest text-white uppercase">
                Avant
            </span>
            <span className="text-alidade-navy absolute top-4 right-4 rounded bg-alidade-gold px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase">
                Après
            </span>
        </div>
    );
}
