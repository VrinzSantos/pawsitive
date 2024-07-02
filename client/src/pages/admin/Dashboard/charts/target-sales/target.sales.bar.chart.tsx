import { BarChart } from "@mantine/charts";
import { Center, Paper, Title, rem } from "@mantine/core";
const data = [
  { month: "Jan", TargetSales: 3000 },
  { month: "Feb", TargetSales: 5000 },
  { month: "March", TargetSales: 7000 },
  { month: "April", TargetSales: 8000 },
  { month: "May", TargetSales: 10000 },
  { month: "June", TargetSales: 15000 },
  { month: "July", TargetSales: 30000 },
  { month: "Aug", TargetSales: 50000 },
  { month: "Sept", TargetSales: 55000 },
  { month: "October", TargetSales: 60000 },
  { month: "Nov", TargetSales: 65000 },
  { month: "Dec", TargetSales: 70000 },
];
const TargetSalesBarChart = () => {
  const PRIMARY_COL_HEIGHT = rem(400);
  return (
    <Paper withBorder shadow="md" p={15} mt={20} radius="md">
      <Center mb={20}>
        <Title order={4}>Target Sales</Title>
      </Center>
      <BarChart
        h={PRIMARY_COL_HEIGHT}
        data={data}
        referenceLines={[
          {
            y: 10000,

            // x: 4000,
            color: "red",
            label: "Current",
            labelPosition: "insideTopLeft",
          },
          {
            y: 50000,

            // x: 4000,
            color: "red",
            label: "Jan-Aug Target Sales",
            labelPosition: "top",
          },

          {
            y: 70000,

            // x: 4000,
            color: "red",
            label: "Sep-Dec Target Sales ",
            labelPosition: "top",
          },
        ]}
        tickLine="y"
        gridAxis="xy"
        dataKey="month"
        unit=" ₱"
        valueFormatter={(value) => new Intl.NumberFormat("en-US").format(value)}
        series={[{ name: "TargetSales", color: "cyan" }]}
      />
    </Paper>
  );
};

export default TargetSalesBarChart;
