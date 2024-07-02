import { Flex, Select } from "@mantine/core";
import { BarChart } from "@mantine/charts";
import { useFetchLowSellingProducts } from "@/hooks/dashboard_hooks";
import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LowSellingProductChart = () => {
  const [value, setValue] = useState<string | null>("3");

  const { lowSellingProducts } = useFetchLowSellingProducts(value!);

  return (
    <>
      <Flex justify="flex-end" mb={50}>
        <Select
          placeholder="Pick value"
          data={["3", "5", "8", "12"]}
          value={value}
          onChange={setValue}
        />
      </Flex>
      <BarChart
        h={300}
        w={500}
        data={lowSellingProducts}
        dataKey="productName"
        series={[{ name: "totalSales", color: "red" }]} // Use the generated colors array
        tickLine="none"
        gridAxis="y"
      />
    </>
  );
};

export default LowSellingProductChart;
