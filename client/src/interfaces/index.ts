// Provider Interface
import { MRT_ColumnDef, MRT_RowData } from "mantine-react-table";
import { ReactNode } from "react";

export interface AppProviderInterface {
  children: ReactNode;
}

export interface LayoutInterface {
  children: ReactNode;
}

export interface LayoutInterface {
  children: ReactNode;
}

export interface DataTableProps<T extends MRT_RowData> {
  columns: MRT_ColumnDef<T>[];
  data: T[];
  isLoading?: boolean;
}
