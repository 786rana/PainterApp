import { useEffect, useRef, useState, type MouseEvent } from "react";
import { SITE, whatsappQuoteHref } from "../data/site";
import { PhoneIcon, WhatsAppIcon } from "./Icons";

type Lang = "en" | "ar";

const text = {
    en: { call: "Call Now", title: "Call us", copy: "Copy number", copied: "Copied ✓", whatsapp: "Chat on WhatsApp", hint: "Open your phone to dial, or message us." },
    ar: { call: "اتصل الآن", title: "اتصل بنا", copy: "نسخ الرقم", copied: "تم النسخ ✓", whatsapp: "الدردشة عبر واتساب", hint: "اتصل من هاتفك أو راسلنا." },
};

/** Phones and tablets dial through tel: links; computers usually have no calling app. */
const canDialHere = () => window.matchMedia("(hover: none) and (pointer: coarse)").matches;

/**
 * "Call Now" button. On a phone it dials directly. On a computer, where tel: links
 * silently do nothing, it opens a small panel with the number, a copy button and WhatsApp.
 */
const CallButton = ({ lang }: { lang: Lang }) => {
    const t = text[lang];
    const [open, setOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const wrapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;
        const onPointer = (e: PointerEvent) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
        };
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        document.addEventListener("pointerdown", onPointer);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("pointerdown", onPointer);
            document.removeEventListener("keydown", onKey);
        };
    }, [open]);

    const onClick = (e: MouseEvent) => {
        if (canDialHere()) return; // let the phone dial
        e.preventDefault();
        setOpen((v) => !v);
        setCopied(false);
    };

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(SITE.phoneDisplay.replace(/\s/g, ""));
            setCopied(true);
        } catch {
            /* clipboard blocked: the number is selectable in the panel */
        }
    };

    return (
        <div className="call-wrap" ref={wrapRef}>
            <a href={SITE.phoneHref} className="quote-btn" onClick={onClick} aria-haspopup="dialog" aria-expanded={open}>
                {t.call}
            </a>

            {open && (
                <div className="call-pop" role="dialog" aria-label={t.title}>
                    <strong>{t.title}</strong>
                    <a className="call-number" href={SITE.phoneHref} dir="ltr">
                        <PhoneIcon /> {SITE.phoneDisplay}
                    </a>
                    <p>{t.hint}</p>
                    <div className="call-pop-actions">
                        <button type="button" className="account-logout" onClick={copy}>
                            {copied ? t.copied : t.copy}
                        </button>
                        <a
                            className="call-pop-wa"
                            href={whatsappQuoteHref(lang === "ar" ? "اتصال" : "a call back", lang)}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <WhatsAppIcon /> {t.whatsapp}
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CallButton;
