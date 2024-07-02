/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFetchMonthlyBestProducts } from "@/hooks/dashboard_hooks";
import { useFetchAllInventory } from "@/hooks/inventory_hooks";
import { BarChart } from "@mantine/charts";
import { generateRandomColor } from "../../utils";
import { useState, useEffect, useMemo } from "react";
import { rem } from "@mantine/core";

// Function to generate random colors

const MonthlyBestProduct = () => {
  const PRIMARY_COL_HEIGHT = rem(400);
  const WIDTH_RATIO = rem(280);
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;
  const { data: monthlyBestProduct } = useFetchMonthlyBestProducts();
  const { data: productNames, isLoading: isLoadingProductNames } =
    useFetchAllInventory();

  const [names, setNames] = useState<string[]>([]);

  useEffect(() => {
    if (productNames && productNames.length > 0) {
      setNames(productNames.map((item: any) => item.productName));
    }
  }, [productNames]);

  const series = useMemo(() => {
    return names.map((item) => ({
      name: item,
      color: generateRandomColor(),
    }));
  }, [names]);
  if (isLoadingProductNames) {
    return <div>Loading...</div>;
  }

  if (!productNames) {
    return <div>Error loading data</div>;
  }

  return (
    <>
      <BarChart
        h={SECONDARY_COL_HEIGHT}
        w={WIDTH_RATIO}
        data={monthlyBestProduct}
        valueFormatter={(value) => new Intl.NumberFormat("en-US").format(value)}
        unit=" ₱"
        dataKey="date"
        series={series}
      />
    </>
  );
};

export default MonthlyBestProduct;
