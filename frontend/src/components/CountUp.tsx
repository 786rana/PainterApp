import { useEffect, useRef, useState } from "react";

type CountUpProps = {
    end: number;
    suffix?: string;
    duration?: number;
};

const prefersReducedMotion = () =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Counts from 0 to `end` the first time it scrolls into view. */
const CountUp = ({ end, suffix = "", duration = 1400 }: CountUpProps) => {
    const ref = useRef<HTMLHeadingElement>(null);
    const [value, setValue] = useState(prefersReducedMotion() ? end : 0);

    useEffect(() => {
        const el = ref.current;
        if (!el || prefersReducedMotion()) return;

        let frame = 0;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                observer.disconnect();
                const start = performance.now();
                const tick = (now: number) => {
                    const p = Math.min((now - start) / duration, 1);
                    setValue(Math.round(end * (1 - Math.pow(1 - p, 3))));
                    if (p < 1) frame = requestAnimationFrame(tick);
                };
                frame = requestAnimationFrame(tick);
            },
            { threshold: 0.4 },
        );
        observer.observe(el);
        return () => {
            observer.disconnect();
            cancelAnimationFrame(frame);
        };
    }, [end, duration]);

    return (
        <h2 ref={ref} dir="ltr">
            {value}
            {suffix}
        </h2>
    );
};

export default CountUp;
