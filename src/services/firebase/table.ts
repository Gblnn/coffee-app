import { db } from "@/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  type QueryDocumentSnapshot,
  type DocumentData,
} from "firebase/firestore";
import type { Table, TableArea } from "@/types/table";

const TABLES_COLLECTION = "tables";
const AREAS_COLLECTION = "table_areas";

function docToTable(doc: QueryDocumentSnapshot<DocumentData>): Table {
  return { id: doc.id, ...doc.data() } as Table;
}

function docToArea(doc: QueryDocumentSnapshot<DocumentData>): TableArea {
  return { id: doc.id, ...doc.data() } as TableArea;
}

export async function getTables(): Promise<Table[]> {
  const snap = await getDocs(collection(db, TABLES_COLLECTION));
  return snap.docs.map(docToTable);
}

export async function createTable(table: Omit<Table, "id">): Promise<string> {
  const docRef = await addDoc(collection(db, TABLES_COLLECTION), table);
  return docRef.id;
}

export async function updateTable(id: string, data: Partial<Table>) {
  await updateDoc(doc(db, TABLES_COLLECTION, id), data);
}

export async function deleteTable(id: string) {
  await deleteDoc(doc(db, TABLES_COLLECTION, id));
}

export async function getTableAreas(): Promise<TableArea[]> {
  const snap = await getDocs(collection(db, AREAS_COLLECTION));
  return snap.docs.map(docToArea);
}

export async function createTableArea(area: Omit<TableArea, "id">): Promise<string> {
  const docRef = await addDoc(collection(db, AREAS_COLLECTION), area);
  return docRef.id;
}

export async function deleteTableArea(id: string) {
  await deleteDoc(doc(db, AREAS_COLLECTION, id));
}
