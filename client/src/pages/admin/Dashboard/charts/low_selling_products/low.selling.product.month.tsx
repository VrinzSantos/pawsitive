/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFetchAllInventory } from "@/hooks/inventory_hooks";
import { BarChart } from "@mantine/charts";
import { generateRandomColor } from "../../utils";
import { useFetchMonthlyLowProducts } from "@/hooks/dashboard_hooks";
import { useState, useEffect, useMemo } from "react";
import { rem } from "@mantine/core";
import React from "react";

const LowSellingProductsMonthly = () => {
  const { data: productNames, isLoading: isLoadingProductNames } =
    useFetchAllInventory();
  const { data: monthlyLowProducts } = useFetchMonthlyLowProducts();
  const [names, setNames] = useState<string[]>([]);
  const PRIMARY_COL_HEIGHT = rem(400);
  const WIDTH_RATIO = rem(280);
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;
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

  if (!productNames || !monthlyLowProducts) {
    return <div>Error loading data</div>;
  }

  return (
    <>
      <BarChart
        tickLine="x"
        h={SECONDARY_COL_HEIGHT}
        w={WIDTH_RATIO}
        data={monthlyLowProducts}
        valueFormatter={(value) => new Intl.NumberFormat("en-US").format(value)}
        unit=" ₱"
        dataKey="date"
        series={series}
      />
    </>
  );
};

export default LowSellingProductsMonthly;
