import { useEffect, useState } from 'react';

export function useCounter(target: number, duration = 1800, start = false) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!start) {
            return;
        }

        let startTime: number;
        const step = (timestamp: number) => {
            if (!startTime) {
                startTime = timestamp;
            }

            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);

            setCount(Math.floor(eased * target));

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                setCount(target);
            }
        };

        requestAnimationFrame(step);
    }, [start, target, duration]);

    return count;
}
