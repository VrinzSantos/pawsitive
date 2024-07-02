/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { Box } from "@mantine/core";
import { DataTableProps } from "@/interfaces";

import EditClientModal from "../Modal/Client Record/EditClientModal";
import DeleteClientRecord from "../Modal/Client Record/DeleteClientRecord";
import ViewClientRecordModal from "../Modal/Client Record/ViewClientRecordModal";
const PetOwnerTable = <T extends Record<string, any>>({
  columns,
  data = [],
  isLoading = false,
}: DataTableProps<T>) => {
  const memoizedColumns = useMemo(() => columns, [columns]);
  const table = useMantineReactTable({
    columns: memoizedColumns,
    data,
    enableRowActions: true,
    mantineSearchTextInputProps: {
      placeholder: "Search Pet name",
    },
    initialState: {
      showGlobalFilter: true,
      columnPinning: {
        left: ["mrt-row-expand", "mrt-row-select"],
        right: ["mrt-row-actions"],
      },
    },
    enableStickyHeader: true,
    positionActionsColumn: "last",
    getRowId: (row) => row.id,

    state: {
      showSkeletons: isLoading, //loading for the first time with no data
    },
    renderRowActions: ({ row }) => (
      <Box
        style={{
          display: "flex",
          flexWrap: "nowrap",
          gap: "8px",
          padd: "20px",
        }}
      >
        <EditClientModal
          id={row.original._id}
          fullName={row.original.fullName}
          address={row.original.address}
          contact={row.original.contact}
          nameOfPet={row.original.nameOfPet}
          species={row.original.species}
          petsBreed={row.original.petsBreed}
          petsSex={row.original.petsSex}
          petsBirthdate={null}
        />
        <ViewClientRecordModal
          id={row.original._id}
          fullName={row.original.fullName}
          petsHistoryArray={row.original.petsHistory}
          historyDateArray={row.original.historyDate}
          petsMedicationArray={row.original.petsMedication}
          medicationDateArray={row.original.medicationDate}
        />

        <DeleteClientRecord id={row.original._id} />
      </Box>
    ),
  });
  return (
    <>
      <MantineReactTable table={table} />
    </>
  );
};

export default PetOwnerTable;
