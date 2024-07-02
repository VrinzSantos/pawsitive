import { BarChart } from "@mantine/charts";
import { useFetchBestSellingItem } from "@/hooks/dashboard_hooks";
import { useState } from "react";
import { Flex, Select } from "@mantine/core";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BarBestProduct = () => {
  const [value, setValue] = useState<string | null>("3");
  const { bestSellingProducts } = useFetchBestSellingItem(value!);

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
        valueFormatter={(value) => new Intl.NumberFormat("en-US").format(value)}
        unit=" ₱"
        data={bestSellingProducts}
        dataKey="productName"
        series={[{ name: "totalSales", color: "cyan" }]} // Use the generated colors array
        tickLine="none"
        gridAxis="y"
      />
    </>
  );
};

export default BarBestProduct;
