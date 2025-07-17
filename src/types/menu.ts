// src/types/menu.ts
export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  description?: string;
  imageUrl?: string;
  available: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
}
