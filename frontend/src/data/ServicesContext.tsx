import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getServices } from "../api/serviceApi";
import { serviceCategories, serviceImages, type ServiceCategory } from "./services";

type ServicesValue = {
    /** Categories to display: from the API when it has services, otherwise the built-in samples. */
    categories: ServiceCategory[];
    /** True when the list comes from the dashboard-managed API data. */
    fromApi: boolean;
};

const ServicesContext = createContext<ServicesValue>({ categories: serviceCategories, fromApi: false });

export const ServicesProvider = ({ children }: { children: ReactNode }) => {
    const [apiCategories, setApiCategories] = useState<ServiceCategory[] | null>(null);

    useEffect(() => {
        let cancelled = false;
        getServices()
            .then((list) => {
                if (cancelled || list.length === 0) return;
                const built = serviceCategories
                    .map((cat) => ({
                        ...cat,
                        services: list
                            .filter((s) => s.category === cat.id)
                            .map((s) => ({
                                id: `db-${s.id}`,
                                title: { en: s.title, ar: s.titleAr || s.title },
                                desc: { en: s.description, ar: s.descriptionAr || s.description },
                                img: s.imageUrl || serviceImages.interiorPaint,
                                category: cat.id,
                            })),
                    }))
                    .filter((cat) => cat.services.length > 0);
                if (built.length) setApiCategories(built);
            })
            // API unreachable (e.g. a static deployment): keep the built-in samples
            .catch(() => undefined);
        return () => {
            cancelled = true;
        };
    }, []);

    const value = useMemo<ServicesValue>(
        () => ({ categories: apiCategories ?? serviceCategories, fromApi: apiCategories !== null }),
        [apiCategories],
    );

    return <ServicesContext.Provider value={value}>{children}</ServicesContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useServiceCategories = () => useContext(ServicesContext);
