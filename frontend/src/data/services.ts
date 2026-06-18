export const BRAND_NAME = {
    en: "Zaman Paints & Decor",
    ar: "زمان للدهانات والديكور",
};

/** Simple Unsplash URL — verified IDs only (broken IDs cause 404) */
const img = (id: string) =>
    `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

export const serviceImages = {
    exteriorPaint: img("photo-1600596542815-ffad4c1539a9"),
    interiorPaint: img("photo-1600210492486-724fe5c67fb0"),
    woodVarnishing: img("photo-1615874959474-d609969a20ed"),
    waterDamageRepair: img("photo-1581578731548-c64695cc6952"),
    wallpaperRemoval: img("photo-1616486338812-3dadae4b4ace"),
    roofPaint: img("photo-1600585154340-be6161a56a0c"),
    fauxPaint: img("photo-1618221195710-dd6b41faaea6"),
    doorPaint: img("photo-1558036117-15b86f7d3e7f"),
    ceilingDesign: img("photo-1600607687939-ce8a6c25118c"),
    gypsumCeiling: img("photo-1595846519845-68e298c2edd8"),
    falseCeiling: img("photo-1578662996442-48f60103fc96"),
    ceilingPaint: img("photo-1560185007-cde436f6a4d0"),
};

export const heroImages = {
    painting: img("photo-1560185007-cde436f6a4d0"),
    exterior: img("photo-1600596542815-ffad4c1539a9"),
    ceiling: img("photo-1600607687939-ce8a6c25118c"),
};

export type Bilingual = { en: string; ar: string };

export type ServiceCategoryId = "painting" | "ceiling-design";

export type Service = {
    id: string;
    title: Bilingual;
    desc: Bilingual;
    img: string;
    imageName: keyof typeof serviceImages;
    category: ServiceCategoryId;
};

export type ServiceCategory = {
    id: ServiceCategoryId;
    label: Bilingual;
    services: Service[];
};

const paintingServices: Service[] = [
    {
        id: "exterior-paint",
        title: { en: "Exterior Paint", ar: "دهان خارجي" },
        desc: { en: "Weather-resistant finishes for villas, compounds & building facades.", ar: "تشطيبات مقاومة للعوامل للفلل والواجهات الخارجية." },
        img: serviceImages.exteriorPaint, imageName: "exteriorPaint", category: "painting",
    },
    {
        id: "interior-paint",
        title: { en: "Interior Paint", ar: "دهان داخلي" },
        desc: { en: "Smooth, elegant wall colours for homes, offices & retail spaces.", ar: "ألوان جدران أنيقة للمنازل والمكاتب والمحلات." },
        img: serviceImages.interiorPaint, imageName: "interiorPaint", category: "painting",
    },
    {
        id: "wood-varnishing",
        title: { en: "Wood Varnishing", ar: "تلميع الخشب" },
        desc: { en: "Premium wood stain, polish & protective coating for doors & floors.", ar: "تلميع ودهان وحماية للأخشاب والأبواب والأرضيات." },
        img: serviceImages.woodVarnishing, imageName: "woodVarnishing", category: "painting",
    },
    {
        id: "water-damage",
        title: { en: "Water Damage Repair", ar: "إصلاح أضرار المياه" },
        desc: { en: "Restore stained walls & ceilings after leaks and moisture damage.", ar: "ترميم الجدران والأسقف المتضررة من التسربات والرطوبة." },
        img: serviceImages.waterDamageRepair, imageName: "waterDamageRepair", category: "painting",
    },
    {
        id: "wallpaper-removal",
        title: { en: "Wallpaper Removal", ar: "إزالة ورق الجدران" },
        desc: { en: "Clean removal of old wallpaper with surface prep for fresh paint.", ar: "إزالة ورق الجدران القديم وتجهيز السطح للدهان." },
        img: serviceImages.wallpaperRemoval, imageName: "wallpaperRemoval", category: "painting",
    },
    {
        id: "roof-paint",
        title: { en: "Roof Paint", ar: "دهان السقف" },
        desc: { en: "Durable roof coatings that reflect heat and prevent water ingress.", ar: "دهان أسطح مقاوم للحرارة ومتسربات المياه." },
        img: serviceImages.roofPaint, imageName: "roofPaint", category: "painting",
    },
    {
        id: "faux-paint",
        title: { en: "Faux Paint", ar: "دهانات ديكورية" },
        desc: { en: "Artistic textures, marble effects & decorative wall finishes.", ar: "تأثيرات فنية وملمس رخامي وتشطيبات ديكورية." },
        img: serviceImages.fauxPaint, imageName: "fauxPaint", category: "painting",
    },
    {
        id: "door-paint",
        title: { en: "Door Paint", ar: "دهان الأبواب" },
        desc: { en: "Flawless spray & brush finishes for wooden and metal doors.", ar: "دهان احترافي للأبواب الخشبية والمعدنية." },
        img: serviceImages.doorPaint, imageName: "doorPaint", category: "painting",
    },
];

const ceilingServices: Service[] = [
    {
        id: "ceiling-design",
        title: { en: "Ceiling Design", ar: "تصميم الأسقف" },
        desc: { en: "Custom ceiling layouts with modern lines, coves & accent lighting.", ar: "تصاميم أسقف عصرية بخطوط وإضاءة مميزة." },
        img: serviceImages.ceilingDesign, imageName: "ceilingDesign", category: "ceiling-design",
    },
    {
        id: "gypsum-ceiling",
        title: { en: "Gypsum Board Ceiling", ar: "أسقف جبس بورد" },
        desc: { en: "Precision gypsum board installation with clean joints & profiles.", ar: "تركيب جبس بورد بدقة مع فواصل نظيفة." },
        img: serviceImages.gypsumCeiling, imageName: "gypsumCeiling", category: "ceiling-design",
    },
    {
        id: "false-ceiling",
        title: { en: "False Ceiling", ar: "أسقف مستعارة" },
        desc: { en: "Suspended ceiling systems with integrated LED & AC diffusers.", ar: "أسقف مستعارة مع إضاءة LED وفتحات تكييف." },
        img: serviceImages.falseCeiling, imageName: "falseCeiling", category: "ceiling-design",
    },
    {
        id: "ceiling-paint",
        title: { en: "Ceiling Paint & Finish", ar: "دهان وتشطيب الأسقف" },
        desc: { en: "Even, streak-free ceiling paint in matte, satin or gloss finishes.", ar: "دهان أسقف متجانس بلمعة مط أو ساتان أو لامع." },
        img: serviceImages.ceilingPaint, imageName: "ceilingPaint", category: "ceiling-design",
    },
];

export const serviceCategories: ServiceCategory[] = [
    { id: "painting", label: { en: "Painting Services", ar: "خدمات الدهان" }, services: paintingServices },
    { id: "ceiling-design", label: { en: "Ceiling Design", ar: "تصميم الأسقف" }, services: ceilingServices },
];

export const services: Service[] = [...paintingServices, ...ceilingServices];

export const projects: { title: Bilingual; desc: Bilingual; img: string; imageName: string }[] = [
    { title: { en: "Villa Exterior — Riyadh", ar: "فيلا خارجية — الرياض" }, desc: { en: "Full exterior repaint", ar: "دهان خارجي كامل" }, img: serviceImages.exteriorPaint, imageName: "exteriorPaint" },
    { title: { en: "Modern Living Room", ar: "غرفة معيشة عصرية" }, desc: { en: "Interior wall finish", ar: "تشطيب جدران داخلية" }, img: serviceImages.interiorPaint, imageName: "interiorPaint" },
    { title: { en: "Luxury Ceiling Design", ar: "تصميم سقف فاخر" }, desc: { en: "Coffered ceiling", ar: "سقف كوفرد" }, img: serviceImages.ceilingDesign, imageName: "ceilingDesign" },
    { title: { en: "Gypsum Ceiling Project", ar: "مشروع سقف جبس بورد" }, desc: { en: "Custom gypsum layout", ar: "تصميم جبس مخصص" }, img: serviceImages.gypsumCeiling, imageName: "gypsumCeiling" },
    { title: { en: "Decorative Wall Finish", ar: "تشطيب جدار ديكوري" }, desc: { en: "Faux marble texture", ar: "ملمس رخامي" }, img: serviceImages.fauxPaint, imageName: "fauxPaint" },
    { title: { en: "Front Door Refinish", ar: "تجديد باب أمامي" }, desc: { en: "Premium door paint", ar: "دهان باب فاخر" }, img: serviceImages.doorPaint, imageName: "doorPaint" },
];

export function serviceHref(id: string) {
    return `#service-${id}`;
}

export function categoryHref(id: ServiceCategoryId) {
    return `#services-${id}`;
}

export function imageAlt(title: string, lang: "en" | "ar") {
    return `${title} — ${BRAND_NAME[lang]}`;
}

export function categoryLabel(id: ServiceCategoryId, lang: "en" | "ar") {
    const cat = serviceCategories.find((c) => c.id === id);
    return cat ? cat.label[lang] : "";
}
