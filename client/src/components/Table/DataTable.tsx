/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import {
  MantineReactTable,
  useMantineReactTable,
  MRT_ColumnDef,
  MRT_RowData,
} from "mantine-react-table";
import { Box, ActionIcon, Paper } from "@mantine/core";
import { IconEdit, IconTrash, IconCheck } from "@tabler/icons-react";

interface DataTableProps<T extends MRT_RowData> {
  columns: MRT_ColumnDef<T>[];
  data: T[];
  enableRowAction?: boolean;
  isLoading?: boolean;
  showApprovedDeleteAppointment?: boolean;
}

const DataTable = <T extends Record<string, any>>({
  columns,
  data,
  enableRowAction = false,
  isLoading = false,
  showApprovedDeleteAppointment = false,
}: DataTableProps<T>) => {
  const memoizedColumns = useMemo(() => columns, [columns]);
  const handleSave = () => {
    console.log("Save");
  };
  const table = useMantineReactTable({
    columns: memoizedColumns,
    data,
    enableRowActions: enableRowAction,
    enableStickyHeader: true,
    positionActionsColumn: "last",
    getRowId: (row) => row.id,
    onEditingRowSave: handleSave,
    state: {
      showSkeletons: isLoading, //loading for the first time with no data
    },
    renderRowActions: ({ row }) =>
      showApprovedDeleteAppointment ? (
        <ActionIcon
          color="green"
          onClick={() => {
            console.log("Update");
          }}
        >
          <IconCheck />
        </ActionIcon>
      ) : (
        <Box style={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
          <ActionIcon
            color="green"
            onClick={() => {
              table.setEditingRow(row);
            }}
          >
            <IconEdit />
          </ActionIcon>
          <ActionIcon
            color="red"
            onClick={() => {
              data.splice(row.index, 1); //assuming simple data table
              // setData([...data]);
            }}
          >
            <IconTrash />
          </ActionIcon>
        </Box>
      ),
  });

  return (
    <Paper shadow="xs" p="sm" radius={10}>
      <MantineReactTable table={table} />
    </Paper>
  );
};

export default DataTable;
