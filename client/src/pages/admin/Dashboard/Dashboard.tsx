import MainLayout from "@/layout";
// import { Grid, Stack } from "@mantine/core";
import BarchartWeekly from "./charts/BarchartWeekly";
import PieDistributionChart from "./charts/PieDistributionChart";
import LineMonthlySales from "./charts/LineMonthlySales";
import { Grid, SimpleGrid, Stack } from "@mantine/core";
import FeedbackBarChart from "./charts/FeedbackBarChart";
// import GenerateReportModal from "@/components/Modal/GenerateReport/GenerateReportModal";
import UpperCards from "./UpperCard";
import BestSellingProducts from "./charts/best_selling_products";
import LowSellingProducstCharts from "./charts/low_selling_products";
import TargetSalesBarChart from "./charts/target-sales/target.sales.bar.chart";
import PetOwnerLocationChart from "./charts/client-location/pet.owner.locations.chart";
const Dashboard = () => {
  return (
    <MainLayout>
      <Stack>
        <UpperCards />
      </Stack>
      <>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 2 }} spacing="md">
          <BarchartWeekly />
          <LineMonthlySales />
          <Grid>
            <Grid.Col span={6}>
              <BestSellingProducts />
            </Grid.Col>
            <Grid.Col span={6}>
              <LowSellingProducstCharts />
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={6}>
              <FeedbackBarChart />
            </Grid.Col>
            <Grid.Col span={6}>
              <PieDistributionChart />
            </Grid.Col>
          </Grid>
        </SimpleGrid>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
          <TargetSalesBarChart />
          <PetOwnerLocationChart />
        </SimpleGrid>
      </>
    </MainLayout>
  );
};

export default Dashboard;
