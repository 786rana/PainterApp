import { useEffect, useRef, useState, type FormEvent } from "react";
import { classifyAuthError, type AuthErrorKind } from "../api/authApi";
import { useAuth } from "../auth/AuthContext";
import { CloseIcon } from "./Icons";

export type AuthMode = "login" | "register";
type Lang = "en" | "ar";

const text = {
    en: {
        login: "Log in",
        register: "Create account",
        loginTitle: "Welcome back",
        registerTitle: "Create your account",
        loginSub: "Log in to manage your account.",
        registerSub: "It only takes a few seconds.",
        email: "Email",
        password: "Password",
        passwordHint: "At least 8 characters",
        submit: { login: "Log in", register: "Create account" },
        busy: "Please wait…",
        switchToRegister: "Don't have an account?",
        switchToLogin: "Already have an account?",
        close: "Close",
        show: "Show",
        hide: "Hide",
        showPassword: "Show password",
        hidePassword: "Hide password",
        errors: {
            invalid: "Incorrect email or password.",
            validation: "Please check the details you entered.",
            exists: "This email is already registered. Try logging in.",
            disabled: "Registration is currently closed.",
            network: "Can't reach the server. Please try again.",
            unknown: "Something went wrong. Please try again.",
        } as Record<AuthErrorKind, string>,
    },
    ar: {
        login: "تسجيل الدخول",
        register: "إنشاء حساب",
        loginTitle: "مرحباً بعودتك",
        registerTitle: "أنشئ حسابك",
        loginSub: "سجّل الدخول لإدارة حسابك.",
        registerSub: "تستغرق بضع ثوانٍ فقط.",
        email: "البريد الإلكتروني",
        password: "كلمة المرور",
        passwordHint: "8 أحرف على الأقل",
        submit: { login: "تسجيل الدخول", register: "إنشاء حساب" },
        busy: "يرجى الانتظار…",
        switchToRegister: "ليس لديك حساب؟",
        switchToLogin: "لديك حساب بالفعل؟",
        close: "إغلاق",
        show: "إظهار",
        hide: "إخفاء",
        showPassword: "إظهار كلمة المرور",
        hidePassword: "إخفاء كلمة المرور",
        errors: {
            invalid: "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
            validation: "يرجى التحقق من البيانات المدخلة.",
            exists: "هذا البريد مسجل مسبقاً. جرّب تسجيل الدخول.",
            disabled: "التسجيل مغلق حالياً.",
            network: "تعذر الاتصال بالخادم. حاول مرة أخرى.",
            unknown: "حدث خطأ ما. حاول مرة أخرى.",
        } as Record<AuthErrorKind, string>,
    },
};

type Props = {
    mode: AuthMode;
    lang: Lang;
    onModeChange: (mode: AuthMode) => void;
    onClose: () => void;
};

const AuthModal = ({ mode, lang, onModeChange, onClose }: Props) => {
    const t = text[lang];
    const { login, register } = useAuth();
    const isRegister = mode === "register";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const emailRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        emailRef.current?.focus();
        const previouslyFocused = document.activeElement as HTMLElement | null;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
            previouslyFocused?.focus?.();
        };
    }, [onClose]);

    const switchMode = () => {
        setError(null);
        onModeChange(isRegister ? "login" : "register");
    };

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        if (busy) return;
        setError(null);
        setBusy(true);
        try {
            const data = { email: email.trim(), password };
            if (isRegister) await register(data);
            else await login(data);
            onClose();
        } catch (err) {
            const { kind, detail } = classifyAuthError(err);
            setError(kind === "validation" && detail ? detail : t.errors[kind]);
            setBusy(false);
        }
    };

    return (
        <div className="auth-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
            <div className="auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-title">
                <button type="button" className="auth-close" onClick={onClose} aria-label={t.close}>
                    <CloseIcon />
                </button>

                <h2 id="auth-title">{isRegister ? t.registerTitle : t.loginTitle}</h2>
                <p className="auth-sub">{isRegister ? t.registerSub : t.loginSub}</p>

                <form onSubmit={submit} noValidate>
                    <label className="auth-field">
                        <span>{t.email}</span>
                        <input
                            ref={emailRef}
                            type="email"
                            name="email"
                            autoComplete="email"
                            inputMode="email"
                            dir="ltr"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>

                    <label className="auth-field">
                        <span>{t.password}</span>
                        <div className="auth-password">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                autoComplete={isRegister ? "new-password" : "current-password"}
                                dir="ltr"
                                required
                                minLength={isRegister ? 8 : undefined}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="auth-toggle"
                                onClick={() => setShowPassword((v) => !v)}
                                aria-label={showPassword ? t.hidePassword : t.showPassword}
                            >
                                {showPassword ? t.hide : t.show}
                            </button>
                        </div>
                        {isRegister && <small>{t.passwordHint}</small>}
                    </label>

                    <div className="auth-error" role="alert" aria-live="assertive">
                        {error}
                    </div>

                    <button type="submit" className="auth-submit" disabled={busy || !email || !password}>
                        {busy ? t.busy : t.submit[mode]}
                    </button>
                </form>

                <p className="auth-switch">
                    {isRegister ? t.switchToLogin : t.switchToRegister}{" "}
                    <button type="button" onClick={switchMode}>
                        {isRegister ? t.login : t.register}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default AuthModal;
