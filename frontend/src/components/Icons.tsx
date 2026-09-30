type IconProps = { className?: string };

const base = {
    width: "1em",
    height: "1em",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": true,
    focusable: false,
} as const;

export const PhoneIcon = ({ className }: IconProps) => (
    <svg {...base} className={className}>
        <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.6 21 3 13.4 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" />
    </svg>
);

export const PinIcon = ({ className }: IconProps) => (
    <svg {...base} className={className}>
        <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
    </svg>
);

export const WhatsAppIcon = ({ className }: IconProps) => (
    <svg {...base} className={className}>
        <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.25-1.38A9.9 9.9 0 1 0 12.04 2zm0 1.8a8.1 8.1 0 1 1-4.3 15l-.3-.18-3.1.82.83-3.03-.2-.32A8.1 8.1 0 0 1 12.04 3.8zM8.6 7.3c-.2 0-.5.07-.75.35-.26.28-1 1-1 2.42s1.03 2.8 1.17 3c.15.2 2 3.2 4.95 4.35 2.44.96 2.93.77 3.46.72.53-.05 1.7-.7 1.94-1.37.24-.68.24-1.26.17-1.38-.07-.12-.26-.2-.55-.34-.3-.15-1.7-.84-1.96-.94-.27-.1-.46-.15-.65.14-.2.3-.75.94-.92 1.13-.17.2-.34.22-.63.07-.3-.14-1.23-.45-2.34-1.44-.87-.77-1.45-1.72-1.62-2-.17-.3-.02-.45.13-.6.13-.13.3-.34.44-.5.15-.17.2-.3.3-.5.1-.19.05-.37-.02-.51-.07-.15-.65-1.6-.9-2.18-.23-.56-.47-.48-.65-.49h-.55z" />
    </svg>
);

export const MenuIcon = ({ className }: IconProps) => (
    <svg {...base} className={className}>
        <path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" />
    </svg>
);

export const CloseIcon = ({ className }: IconProps) => (
    <svg {...base} className={className}>
        <path d="M6.4 5 5 6.4 10.6 12 5 17.6 6.4 19l5.6-5.6 5.6 5.6 1.4-1.4-5.6-5.6L19 6.4 17.6 5 12 10.6z" />
    </svg>
);

export const SettingsIcon = ({ className }: IconProps) => (
    <svg {...base} className={className}>
        <path d="M12 2a10 10 0 1 0 0 20c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.3-.5-.8-.5-1.2 0-1.1.9-2 2-2h2.4c3 0 5.6-2.5 5.6-5.6C23 6 18 2 12 2zM6.5 12a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3-4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3 4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
    </svg>
);
