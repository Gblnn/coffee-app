// Table types for restaurant management

export type Table = {
  id: string;
  name: string;
  area?: string;
  status: 'available' | 'occupied' | 'reserved';
  seats: number;
  col?: number;
  row?: number;
};

export type TableArea = {
  id: string;
  name: string;
};
