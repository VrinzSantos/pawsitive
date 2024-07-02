/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { Box } from "@mantine/core";

import { DataTableProps } from "@/interfaces";

import DeleteOrderModal from "../Modal/Order/DeleteOrderModal";

const OrdersTable = <T extends Record<string, any>>({
  columns,
  data = [],
  isLoading = false,
}: DataTableProps<T>) => {
  const memoizedColumns = useMemo(() => columns, [columns]);
  const table = useMantineReactTable({
    columns: memoizedColumns,
    data,
    enableRowActions: true,
    enableStickyHeader: true,

    positionActionsColumn: "last",
    mantinePaginationProps: {
      showRowsPerPage: false,
    },
    paginationDisplayMode: "pages",
    getRowId: (row) => row.id,

    state: {
      showSkeletons: isLoading, //loading for the first time with no data
    },
    renderRowActions: ({ row }) => (
      <Box style={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
        <DeleteOrderModal id={row.original._id} />
      </Box>
    ),
  });
  return (
    <>
      <MantineReactTable table={table} />
    </>
  );
};

export default OrdersTable;
