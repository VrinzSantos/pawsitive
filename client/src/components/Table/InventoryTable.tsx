/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";

import { DataTableProps } from "@/interfaces";
import DeleteItemModal from "../Modal/Inventory/DeleteItemModal";
import { Box } from "@mantine/core";
import EditItemModal from "../Modal/Inventory/EditItemModal";
const InventoryTable = <T extends Record<string, any>>({
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
    mantineSearchTextInputProps: {
      placeholder: "Search Product",
    },
    initialState: {
      showGlobalFilter: true,
      columnPinning: {
        left: ["mrt-row-expand", "mrt-row-select"],
        right: ["mrt-row-actions"],
      },
    },
    getRowId: (row) => row.id,

    state: {
      showSkeletons: isLoading, //loading for the first time with no data
    },
    renderRowActions: ({ row }) => (
      <Box style={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
        <EditItemModal
          _id={row.original._id}
          productCategory={row.original.productCategory}
          productName={row.original.productName}
          productDescription={row.original.productDescription}
          productPrice={row.original.productPrice}
          productImage={row.original.productImage}
          productQuantity={row.original.productQuantity}
          stocksLeft={row.original.stocksLeft}
        />
        <DeleteItemModal id={row.original._id} />
      </Box>
    ),
  });
  return <MantineReactTable table={table} />;
};

export default InventoryTable;
