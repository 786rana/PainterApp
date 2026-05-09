export const translations = {
    en: {
        home: "Home",
        services: "Services",
        work: "Our Work",
        contact: "Contact",
        quote: "Get Quote",
    },
    ar: {
        home: "الرئيسية",
        services: "الخدمات",
        work: "أعمالنا",
        contact: "اتصل بنا",
        quote: "احصل على عرض سعر",
    },
};
//// lang.ts
//// Simple localization helper for the PainterApp frontend.
//// Persists selected language to localStorage and provides a tiny translation API.

//export type LangCode = 'en' | 'es' | 'fr' | 'de';

//const STORAGE_KEY = 'painterapp_language';
//const DEFAULT_LANG: LangCode = 'en';

///*
//  NOTE:
//  - Preserve comment blocks
//  - Keep translations small and focused on common UI terms used in a painting application.
//*/

//const translations: Record<LangCode, Record<string, string>> = {
//  en: {
//    newCanvas: 'New',
//    open: 'Open',
//    save: 'Save',
//    saveAs: 'Save As',
//    undo: 'Undo',
//    redo: 'Redo',
//    brush: 'Brush',
//    eraser: 'Eraser',
//    fill: 'Fill',
//    clearCanvas: 'Clear Canvas',
//    settings: 'Settings',
//    language: 'Language',
//    export: 'Export',
//    import: 'Import',
//    color: 'Color',
//    size: 'Size',
//    opacity: 'Opacity',
//    layers: 'Layers',
//    addLayer: 'Add Layer',
//    removeLayer: 'Remove Layer',
//    selectTool: 'Select Tool',
//    about: 'About',
//  },
//  es: {
//    newCanvas: 'Nuevo',
//    open: 'Abrir',
//    save: 'Guardar',
//    saveAs: 'Guardar Como',
//    undo: 'Deshacer',
//    redo: 'Rehacer',
//    brush: 'Pincel',
//    eraser: 'Borrador',
//    fill: 'Rellenar',
//    clearCanvas: 'Limpiar Lienzo',
//    settings: 'Ajustes',
//    language: 'Idioma',
//    export: 'Exportar',
//    import: 'Importar',
//    color: 'Color',
//    size: 'Tamaño',
//    opacity: 'Opacidad',
//    layers: 'Capas',
//    addLayer: 'Agregar Capa',
//    removeLayer: 'Eliminar Capa',
//    selectTool: 'Seleccionar Herramienta',
//    about: 'Acerca de',
//  },
//  fr: {
//    newCanvas: 'Nouveau',
//    open: 'Ouvrir',
//    save: 'Enregistrer',
//    saveAs: 'Enregistrer sous',
//    undo: 'Annuler',
//    redo: 'Rétablir',
//    brush: 'Pinceau',
//    eraser: 'Gomme',
//    fill: 'Remplir',
//    clearCanvas: 'Effacer le canevas',
//    settings: 'Paramètres',
//    language: 'Langue',
//    export: 'Exporter',
//    import: 'Importer',
//    color: 'Couleur',
//    size: 'Taille',
//    opacity: 'Opacité',
//    layers: 'Calques',
//    addLayer: 'Ajouter un calque',
//    removeLayer: 'Supprimer le calque',
//    selectTool: 'Sélectionner l\'outil',
//    about: 'À propos',
//  },
//  de: {
//    newCanvas: 'Neu',
//    open: 'Öffnen',
//    save: 'Speichern',
//    saveAs: 'Speichern unter',
//    undo: 'Rückgängig',
//    redo: 'Wiederholen',
//    brush: 'Pinsel',
//    eraser: 'Radierer',
//    fill: 'Füllen',
//    clearCanvas: 'Leinwand löschen',
//    settings: 'Einstellungen',
//    language: 'Sprache',
//    export: 'Exportieren',
//    import: 'Importieren',
//    color: 'Farbe',
//    size: 'Größe',
//    opacity: 'Deckkraft',
//    layers: 'Ebenen',
//    addLayer: 'Ebene hinzufügen',
//    removeLayer: 'Ebene entfernen',
//    selectTool: 'Werkzeug auswählen',
//    about: 'Info',
//  },
//};

//let current: LangCode = loadInitialLanguage();
//const subscribers = new Set<(lang: LangCode) => void>();

//function loadInitialLanguage(): LangCode {
//  try {
//    const saved = localStorage.getItem(STORAGE_KEY);
//    if (saved && isValidLang(saved)) return saved as LangCode;
//  } catch {
//    // ignore localStorage errors (e.g., privacy modes)
//  }
//  // attempt to match browser preference
//  if (typeof navigator !== 'undefined' && navigator.language) {
//    const lang = navigator.language.split('-')[0];
//    if (isValidLang(lang)) return lang as LangCode;
//  }
//  return DEFAULT_LANG;
//}

//function isValidLang(value: unknown): value is LangCode {
//  return typeof value === 'string' && Object.prototype.hasOwnProperty.call(translations, value);
//}

//export function getAvailableLanguages(): { code: LangCode; name: string }[] {
//  return [
//    { code: 'en', name: 'English' },
//    { code: 'es', name: 'Español' },
//    { code: 'fr', name: 'Français' },
//    { code: 'de', name: 'Deutsch' },
//  ];
//}

//export function getLanguage(): LangCode {
//  return current;
//}

//export function setLanguage(lang: LangCode): void {
//  if (!isValidLang(lang)) return;
//  current = lang;
//  try {
//    localStorage.setItem(STORAGE_KEY, lang);
//  } catch {
//    // ignore
//  }
//  subscribers.forEach((cb) => {
//    try {
//      cb(current);
//    } catch {
//      // ignore subscriber errors
//    }
//  });
//}

///**
// * Translate a key into the currently selected language.
// * Supports simple placeholder replacement using `{name}` syntax.
// *
// * Example:
// *   t('saveAs') -> "Save As"
// *   t('greeting', { name: 'Alex' }) -> "Hello, Alex"
// */
//export function t(key: string, vars?: Record<string, string | number>): string {
//  const dict = translations[current] || translations[DEFAULT_LANG];
//  let text = dict[key] ?? translations[DEFAULT_LANG][key] ?? key;
//  if (vars) {
//    for (const [k, v] of Object.entries(vars)) {
//      const placeholder = `{${k}}`;
//      text = text.split(placeholder).join(String(v));
//    }
//  }
//  return text;
//}

///**
// * Subscribe to language changes.
// * Returns an unsubscribe function.
// */
//export function onLanguageChange(cb: (lang: LangCode) => void): () => void {
//  subscribers.add(cb);
//  return () => subscribers.delete(cb);
//}

//// Expose translations for testing or advanced usage.
//export const _internal = {
//  translations,
//  STORAGE_KEY,
//};