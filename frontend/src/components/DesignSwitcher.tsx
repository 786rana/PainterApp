import { useEffect, useState } from "react";

export type Design = "warm" | "midnight" | "fresh";

const options: { id: Design; label: string }[] = [
    { id: "warm", label: "A · Warm" },
    { id: "midnight", label: "B · Midnight" },
    { id: "fresh", label: "C · Fresh" },
];

const KEY = "design";

function readDesign(): Design {
    try {
        const saved = localStorage.getItem(KEY);
        if (saved === "warm" || saved === "midnight" || saved === "fresh") return saved;
    } catch { /* storage unavailable */ }
    return "warm";
}

/** Applies the chosen design to <html> so every page (site and dashboard) follows it. */
// eslint-disable-next-line react-refresh/only-export-components
export function useDesign() {
    const [design, setDesign] = useState<Design>(readDesign);

    useEffect(() => {
        const root = document.documentElement;
        if (design === "warm") root.removeAttribute("data-theme");
        else root.setAttribute("data-theme", design);
        try { localStorage.setItem(KEY, design); } catch { /* ignore */ }
    }, [design]);

    return [design, setDesign] as const;
}

type Props = { design: Design; onChange: (d: Design) => void };

/** Temporary preview control for choosing between design directions. */
const DesignSwitcher = ({ design, onChange }: Props) => {
    const [open, setOpen] = useState(true);

    if (!open) {
        return (
            <button type="button" className="design-reopen" onClick={() => setOpen(true)}>
                Designs
            </button>
        );
    }

    return (
        <div className="design-switcher" role="group" aria-label="Design preview">
            <span>Design</span>
            {options.map((o) => (
                <button key={o.id} type="button" aria-pressed={design === o.id} onClick={() => onChange(o.id)}>
                    {o.label}
                </button>
            ))}
            <button type="button" className="design-x" onClick={() => setOpen(false)} aria-label="Hide design picker">
                ✕
            </button>
        </div>
    );
};

export default DesignSwitcher;
