import MainLayout from "@/layout";
import { Stack, Title } from "@mantine/core";
import { useFetchAppointments } from "@/hooks/appoinment_hooks";
// import DataTable from "@/components/Table/DataTable";
import AppointmentTable from "@/components/Table/AppointmentTable";
import dayjs from "dayjs";

const Appointments = () => {
  const { data: appointments, isLoading } = useFetchAppointments();

  const AppointmentColumn = [
    {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      accessorKey: "userEmail",
      header: "User",
    },
    {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      accessorFn: (dataRow: any) => dayjs(dataRow.date).format("YYYY-MM-DD"),
      header: "Date",
    },
    {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      accessorKey: "time",
      header: "Time",
    },
    {
      // accessorKey: "serviceType",

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      accessorFn: (dataRow: any) => dataRow.serviceType,
      header: "Service Type",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
  ];
  return (
    <MainLayout>
      <Stack>
        <Title order={2}>Appointments</Title>
        {appointments && (
          <AppointmentTable
            data={appointments}
            columns={AppointmentColumn}
            isLoading={isLoading}
          />
        )}
      </Stack>
    </MainLayout>
  );
};

export default Appointments;
