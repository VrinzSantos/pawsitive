/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { Box } from "@mantine/core";
import ApproveAppointmentModal from "../Modal/Appointment/ApproveAppointmentModal";
import DeleteAppointmentModal from "../Modal/Appointment/DeleteAppointmentModal";
import { DataTableProps } from "@/interfaces";

const AppointmentTable = <T extends Record<string, any>>({
  columns,
  data = [],
  isLoading = false,
}: DataTableProps<T>) => {
  // const renderActions = (status: string, id: string) => {
  //   if (status === "Approved") {
  //     return <CancelAppointmentModal id={id} />;
  //   } else if (status === "Rejected") {
  //     return <DeleteAppointmentModal id={id} />;
  //   } else {
  //     return <ApproveAppointmentModal id={id} />;
  //   }
  // };
  const memoizedColumns = useMemo(() => columns, [columns]);
  const table = useMantineReactTable({
    columns: memoizedColumns,
    data,
    enableRowActions: true,
    enableStickyHeader: true,
    positionActionsColumn: "last",
    getRowId: (row) => row.id,

    state: {
      showSkeletons: isLoading, //loading for the first time with no data
    },
    renderRowActions: ({ row }) => (
      <Box style={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
        {row.original.status === "Approved" ? null : (
          <ApproveAppointmentModal
            id={row.original._id}
            userId={row.original.userId}
            service={row.original.serviceType}
            description={row.original.description}
          />
        )}
        <DeleteAppointmentModal id={row.original._id} />
      </Box>
    ),
  });
  return <MantineReactTable table={table} />;
};

export default AppointmentTable;
