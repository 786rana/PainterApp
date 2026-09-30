import { useId } from "react";

/**
 * Zaman logo mark: a "Z" painted in one brush stroke on a rounded badge, with a paint drip.
 * Uses the active design's colours (CSS variables), so it matches every theme.
 */
const LogoMark = ({ className, decorative = false }: { className?: string; decorative?: boolean }) => {
    const id = useId();
    const gradient = `${id}-g`;
    const shine = `${id}-s`;

    return (
        <svg
            className={className}
            viewBox="0 0 64 64"
            {...(decorative ? { "aria-hidden": true } : { role: "img", "aria-label": "Zaman Paints & Decor" })}
        >
            <defs>
                <linearGradient id={gradient} x1="8" y1="4" x2="58" y2="62" gradientUnits="userSpaceOnUse">
                    <stop offset="0" style={{ stopColor: "var(--primary)" }} />
                    <stop offset="1" style={{ stopColor: "var(--primary-dark)" }} />
                </linearGradient>
                <radialGradient id={shine} cx="0.3" cy="0.12" r="0.85">
                    <stop offset="0" stopColor="#fff" stopOpacity="0.32" />
                    <stop offset="1" stopColor="#fff" stopOpacity="0" />
                </radialGradient>
            </defs>

            {/* badge */}
            <rect x="2" y="2" width="60" height="60" rx="18" fill={`url(#${gradient})`} />
            <rect x="2" y="2" width="60" height="60" rx="18" fill={`url(#${shine})`} />

            {/* paint drip running from the lower bar */}
            <path
                d="M22.6 43.5C22.6 47.8 20.9 49.4 20.9 52.8A3.6 3.6 0 0 0 28.1 52.8C28.1 49.4 26.4 47.8 26.4 43.5Z"
                style={{ fill: "var(--primary-soft)" }}
            />

            {/* the Z, painted as a single brush stroke */}
            <path
                d="M18.5 18.5h27L18.5 40.5h27.5"
                fill="none"
                stroke="#fff"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default LogoMark;
