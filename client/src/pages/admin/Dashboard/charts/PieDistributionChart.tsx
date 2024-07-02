import { useFetchProductDistribution } from "@/hooks/dashboard_hooks";
import { BarChart } from "@mantine/charts";
import { Paper, Center, Title, rem } from "@mantine/core";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PieDistributionChart = () => {
  const { productDistribution } = useFetchProductDistribution();

  const PRIMARY_COL_HEIGHT = rem(485);
  const WIDTH_RATIO = rem(280);
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;
  return (
    <>
      {productDistribution && (
        <Paper withBorder shadow="md" p={5} radius="md">
          <Center mb={10}>
            <Title order={6}>Product Category Distribution</Title>
          </Center>
          <BarChart
            h={SECONDARY_COL_HEIGHT}
            // orientation="vertical"
            yAxisProps={{ width: 80 }}
            w={WIDTH_RATIO}
            data={productDistribution}
            dataKey="_id"
            series={[{ name: `count`, color: "blue" }]}
          />
          {/* <>
            <DonutChart
              h={SECONDARY_COL_HEIGHT}
              w={WIDTH_RATIO}
              size={285}
              paddingAngle={10}
              data={productDistribution}
            />
          </> */}
        </Paper>
      )}
    </>
  );
};

export default PieDistributionChart;
