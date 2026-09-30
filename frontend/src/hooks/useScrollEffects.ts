import { useEffect, useState } from "react";

/** Adds `.is-visible` to every `[data-reveal]` element as it scrolls into view. */
export function useReveal(dependency: unknown) {
    useEffect(() => {
        const root = document.documentElement;
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduced || !("IntersectionObserver" in window)) return;

        root.classList.add("js-reveal");
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                }
            },
            { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
        );
        document.querySelectorAll("[data-reveal]:not(.is-visible)").forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [dependency]);
}

/** Returns the id of the section currently in the middle of the viewport. */
export function useActiveSection(ids: string[]) {
    const [active, setActive] = useState(ids[0]);
    const key = ids.join(",");

    useEffect(() => {
        if (!("IntersectionObserver" in window)) return;
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) setActive(entry.target.id);
                }
            },
            { rootMargin: "-45% 0px -50% 0px" },
        );
        key.split(",").forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [key]);

    return active;
}
