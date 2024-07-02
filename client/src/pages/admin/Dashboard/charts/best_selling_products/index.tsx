// import { useState } from "react";
import { Paper, Title, Center } from "@mantine/core";
// import BarBestProduct from "./BarBestProduct";
import MonthlyBestProduct from "./line.monthly.best.product";

const BestSellingProducts = () => {
  // const [checked, setChecked] = useState(false);

  return (
    <Paper withBorder shadow="md" p={30} radius="md">
      <Center mb={10}>
        <Title order={6}>Best Selling Products</Title>
      </Center>
      {/* <Switch
          label="Monthly Data"
          checked={checked}
          onChange={(event) => setChecked(event.currentTarget.checked)}
        /> */}

      <MonthlyBestProduct />
      {/* {checked ? <MonthlyBestProduct /> : <BarBestProduct />} */}
    </Paper>
  );
};

export default BestSellingProducts;
