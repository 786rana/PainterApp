export const SITE = {
    phoneDisplay: "+966 597507224",
    phoneHref: "tel:+966597507224",
    whatsappHref: "https://wa.me/966597507224",
} as const;

/** WhatsApp link with a prefilled message, e.g. for a specific service. */
export function whatsappQuoteHref(service: string, lang: "en" | "ar") {
    const text =
        lang === "ar"
            ? `مرحباً، أرغب في الحصول على عرض سعر لخدمة: ${service}`
            : `Hello, I'd like a quote for: ${service}`;
    return `${SITE.whatsappHref}?text=${encodeURIComponent(text)}`;
}
