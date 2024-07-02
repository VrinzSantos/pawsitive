import { useFetchMonthlySales } from "@/hooks/dashboard_hooks";
import { LineChart } from "@mantine/charts";
import { Center, Paper, Title, rem } from "@mantine/core";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LineMonthlySales = () => {
  const { monthlySalesData } = useFetchMonthlySales();
  const PRIMARY_COL_HEIGHT = rem(200);
  const WIDTH_RATIO = rem(620);

  return (
    <Paper withBorder shadow="md" p={15} mt={20} radius="md">
      <Center mb={20}>
        <Title order={4}>Monthly Sales Chart</Title>
      </Center>
      <Center>
        <LineChart
          h={PRIMARY_COL_HEIGHT}
          unit=" ₱"
          valueFormatter={(value) =>
            new Intl.NumberFormat("en-US").format(value)
          }
          connectNulls
          w={WIDTH_RATIO}
          data={monthlySalesData!}
          dataKey="date"
          series={[{ name: "TotalAmount", color: "indigo.6" }]}
          curveType="linear"
        />
      </Center>
    </Paper>
  );
};

export default LineMonthlySales;
