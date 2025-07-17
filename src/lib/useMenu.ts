import { useEffect, useState } from "react";
import {
  getMenuItems,
  getMenuCategories,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  createMenuCategory,
  updateMenuCategory,
  deleteMenuCategory,
} from "@/services/firebase/menu";
import type { MenuItem, MenuCategory } from "@/types/menu";

export function useMenu() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setItems(await getMenuItems());
      setCategories(await getMenuCategories());
      setLoading(false);
    })();
  }, []);

  return {
    items,
    categories,
    loading,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
    createMenuCategory,
    updateMenuCategory,
    deleteMenuCategory,
  };
}
