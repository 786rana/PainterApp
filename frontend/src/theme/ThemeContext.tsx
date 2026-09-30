import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { getPreferences, isDesign, savePreferences, type Design } from "../api/accountApi";
import { useAuth } from "../auth/AuthContext";

type ThemeValue = {
    design: Design;
    setDesign: (design: Design) => void;
};

const KEY = "design";

function readDesign(): Design {
    try {
        const saved = localStorage.getItem(KEY);
        if (isDesign(saved)) return saved;
    } catch { /* storage unavailable */ }
    return "warm";
}

const ThemeContext = createContext<ThemeValue | null>(null);

/**
 * Holds the chosen site design. It is applied to <html data-theme> and remembered
 * in this browser; for logged-in users it is also saved to their profile so it
 * follows them to other devices.
 */
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useAuth();
    const [design, setDesignState] = useState<Design>(readDesign);
    const designRef = useRef(design);
    const userRef = useRef(user);

    useEffect(() => {
        designRef.current = design;
        userRef.current = user;
    });

    useEffect(() => {
        const root = document.documentElement;
        if (design === "warm") root.removeAttribute("data-theme");
        else root.setAttribute("data-theme", design);
        try { localStorage.setItem(KEY, design); } catch { /* ignore */ }
    }, [design]);

    // After logging in: the saved profile design wins; if none is saved yet, keep this browser's choice.
    const email = user?.email;
    useEffect(() => {
        if (!email) return;
        let cancelled = false;
        getPreferences()
            .then((prefs) => {
                if (cancelled) return;
                if (prefs.theme) setDesignState(prefs.theme);
                else savePreferences(designRef.current).catch(() => undefined);
            })
            .catch(() => undefined);
        return () => {
            cancelled = true;
        };
    }, [email]);

    const setDesign = useCallback((next: Design) => {
        setDesignState(next);
        if (userRef.current) savePreferences(next).catch(() => undefined);
    }, []);

    const value = useMemo(() => ({ design, setDesign }), [design, setDesign]);
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
    return ctx;
}
