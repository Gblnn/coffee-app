import { db } from "@/firebase";
import type { MenuCategory, MenuItem } from "@/types/menu";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    updateDoc
} from "firebase/firestore";

const MENU_COLLECTION = "menu_items";
const CATEGORY_COLLECTION = "menu_categories";

// CRUD for Menu Items
export const createMenuItem = async (item: Omit<MenuItem, "id">) => {
  const docRef = await addDoc(collection(db, MENU_COLLECTION), item);
  return docRef.id;
};

export const getMenuItems = async (): Promise<MenuItem[]> => {
  const q = query(collection(db, MENU_COLLECTION));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as MenuItem[];
};

export const updateMenuItem = async (id: string, data: Partial<MenuItem>) => {
  await updateDoc(doc(db, MENU_COLLECTION, id), data);
};

export const deleteMenuItem = async (id: string) => {
  await deleteDoc(doc(db, MENU_COLLECTION, id));
};

// CRUD for Categories
export const createMenuCategory = async (cat: Omit<MenuCategory, "id">) => {
  const docRef = await addDoc(collection(db, CATEGORY_COLLECTION), cat);
  return docRef.id;
};

export const getMenuCategories = async (): Promise<MenuCategory[]> => {
  const q = query(collection(db, CATEGORY_COLLECTION));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as MenuCategory[];
};

export const updateMenuCategory = async (id: string, data: Partial<MenuCategory>) => {
  await updateDoc(doc(db, CATEGORY_COLLECTION, id), data);
};

export const deleteMenuCategory = async (id: string) => {
  await deleteDoc(doc(db, CATEGORY_COLLECTION, id));
};
