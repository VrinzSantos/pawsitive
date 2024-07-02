/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFetchWeeklySalesTotal } from "@/hooks/dashboard_hooks";
import { LineChart } from "@mantine/charts";
import { Center, Paper, Title, rem } from "@mantine/core";
// TODO
const BarchartWeekly = () => {
  const { dataResponse } = useFetchWeeklySalesTotal();
  const PRIMARY_COL_HEIGHT = rem(200);
  const WIDTH_RATIO = rem(620);

  return (
    <Paper withBorder shadow="md" p={15} mt={20} radius="md">
      <Center mb={20}>
        <Title order={4}>Weekly sales chart</Title>
      </Center>
      <LineChart
        h={PRIMARY_COL_HEIGHT}
        connectNulls
        w={WIDTH_RATIO}
        valueFormatter={(value) => new Intl.NumberFormat("en-US").format(value)}
        data={dataResponse}
        unit=" ₱"
        dataKey="date"
        series={[{ name: "totalSales", color: "indigo.6" }]}
        curveType="linear"
      />
    </Paper>
  );
};

export default BarchartWeekly;
