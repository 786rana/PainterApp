export type ServiceCategoryKey = "painting" | "ceiling-design";

/** A service as stored by the API (managed from the dashboard). */
export interface Service {
  id: number;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  imageUrl: string;
  category: ServiceCategoryKey;
  sortOrder: number;
  price?: number;
}

export type NewService = Omit<Service, "id" | "price">;
