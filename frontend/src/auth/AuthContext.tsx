import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { login as loginRequest, register as registerRequest, type Credentials } from "../api/authApi";
import { TOKEN_KEY } from "../api/axios";

type AuthUser = { email: string };

type AuthContextValue = {
    user: AuthUser | null;
    login: (data: Credentials) => Promise<void>;
    register: (data: Credentials) => Promise<void>;
    logout: () => void;
};

function readToken(): string | null {
    try {
        return localStorage.getItem(TOKEN_KEY);
    } catch {
        return null;
    }
}

/** Reads the user from a JWT; returns null if it is malformed or expired. */
function userFromToken(token: string | null): AuthUser | null {
    if (!token) return null;
    try {
        const payload = JSON.parse(atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
        if (typeof payload.exp === "number" && payload.exp * 1000 < Date.now()) return null;
        // The API writes the long ClaimTypes.Email URI; accept it or a plain "email" claim.
        const key = Object.keys(payload).find((k) => k === "email" || k.endsWith("/emailaddress"));
        const email = key ? payload[key] : undefined;
        return typeof email === "string" ? { email } : null;
    } catch {
        return null;
    }
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<AuthUser | null>(() => {
        const token = readToken();
        const parsed = userFromToken(token);
        if (!parsed && token) {
            try { localStorage.removeItem(TOKEN_KEY); } catch { /* ignore */ }
        }
        return parsed;
    });

    const login = useCallback(async (data: Credentials) => {
        const token = await loginRequest(data);
        try { localStorage.setItem(TOKEN_KEY, token); } catch { /* ignore */ }
        setUser(userFromToken(token) ?? { email: data.email });
    }, []);

    const register = useCallback(async (data: Credentials) => {
        await registerRequest(data);
        await login(data);
    }, [login]);

    const logout = useCallback(() => {
        try { localStorage.removeItem(TOKEN_KEY); } catch { /* ignore */ }
        setUser(null);
    }, []);

    const value = useMemo(() => ({ user, login, register, logout }), [user, login, register, logout]);
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
    return ctx;
}
