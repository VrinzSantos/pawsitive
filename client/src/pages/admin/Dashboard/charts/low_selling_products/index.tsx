import { Center, Paper, Title } from "@mantine/core";
// import LowSellingProductChart from "./LowSellingProductChart";

import LowSellingProductsMonthly from "./low.selling.product.month";

const LowSellingProducstCharts = () => {
  // const [checked, setChecked] = useState(false);

  return (
    <Paper withBorder shadow="md" p={30} radius="md">
      <Center mb={10}>
        <Title order={6}>Low Selling Products</Title>
      </Center>
      <LowSellingProductsMonthly />
      {/* {checked ? <LowSellingProductsMonthly /> : <LowSellingProductChart />} */}
    </Paper>
  );
};

export default LowSellingProducstCharts;
