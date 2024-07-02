import MainLayout from "@/layout";
import dayjs from "dayjs";
import OrdersTable from "@/components/Table/OrdersTable";
import { useFetchOrders } from "@/hooks/orders_hooks";
import { Stack, Title } from "@mantine/core";
import { useState } from "react";
import { DatePickerInput } from "@mantine/dates";
const Orders = () => {
  const today = new Date();

  const [dateValue, setDateValue] = useState<Date | null>(today);

  const { data, isLoading } = useFetchOrders(dateValue);

  const OrdersColumn = [
    {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      accessorFn: (dataRow: any) =>
        dayjs(dataRow.orderDate).format("YYYY-MM-DD"),
      header: "Order Date",
    },
    {
      accessorKey: "customerName",
      header: "Customer Name",
    },
    {
      accessorKey: "totalAmount",
      header: "Total Amount",
    },
    {
      accessorKey: "amountReceived",
      header: "Amount Received",
    },
    {
      accessorKey: "change",
      header: "Change",
    },
  ];
  return (
    <MainLayout>
      <Stack>
        <Title>Orders</Title>

        <>
          <DatePickerInput
            label="Select Order Date"
            placeholder="Pick date"
            w={"15rem"}
            value={dateValue}
            onChange={setDateValue}
          />
          <OrdersTable
            data={data!}
            columns={OrdersColumn}
            isLoading={isLoading}
          />
        </>
      </Stack>
    </MainLayout>
  );
};

export default Orders;
