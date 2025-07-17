import { useEffect, useState, useCallback } from "react";
import {
  getTables,
  createTable,
  updateTable,
  deleteTable,
  getTableAreas,
  createTableArea,
  deleteTableArea,
} from "@/services/firebase/table";
import type { Table, TableArea } from "@/types/table";

export function useTables() {
  const [tables, setTables] = useState<Table[]>([]);
  const [areas, setAreas] = useState<TableArea[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    setLoading(true);
    setTables(await getTables());
    setAreas(await getTableAreas());
    setLoading(false);
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const addTable = async (table: Omit<Table, "id">) => {
    await createTable(table);
    fetch();
  };
  const editTable = async (id: string, data: Partial<Table>) => {
    await updateTable(id, data);
    fetch();
  };
  const removeTable = async (id: string) => {
    await deleteTable(id);
    fetch();
  };
  const addArea = async (area: Omit<TableArea, "id">) => {
    await createTableArea(area);
    fetch();
  };
  const removeArea = async (id: string) => {
    await deleteTableArea(id);
    fetch();
  };

  return {
    tables,
    areas,
    loading,
    addTable,
    editTable,
    removeTable,
    addArea,
    removeArea,
    refresh: fetch,
  };
}
