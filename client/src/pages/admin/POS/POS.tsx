import { useFetchInventoryItems } from "@/hooks/inventory_hooks";
import MainLayout from "@/layout";
import { Grid, Group, SimpleGrid, Stack, Title } from "@mantine/core";
import ProductCatergory from "./upper_inputs/ProductCatergory";
import ProductName from "./upper_inputs/ProductName";
import Customername from "./upper_inputs/Customername";
import { useAppSelector } from "@/services/states/redux/hooks";
import ProductCard from "@/components/Card/ProductCard";
import SelectedProducts from "./Selected _Items/SelectedProducts";
const PointOfSales = () => {
  const { selectedCategory, selectedProductName } = useAppSelector(
    (state) => state.inventory
  );

  const { data } = useFetchInventoryItems(
    selectedCategory,
    selectedProductName
  );

  // if (isLoading) return <div>Loading...</div>;
  // if (isError) return <div>Error fetching inventory items</div>;
  return (
    <MainLayout>
      <Stack>
        <Title order={2}>Create Order</Title>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
          <Grid>
            {data?.map((item, index) => (
              <Grid.Col span={5} key={index}>
                <ProductCard
                  id={item._id}
                  image={item.productImage}
                  productName={item.productName}
                  productPrice={item.productPrice}
                  stocks={item.stocksLeft}
                />
              </Grid.Col>
            ))}
          </Grid>
          <Grid gutter="sm">
            <Grid.Col>
              <Group gap="lg">
                <ProductCatergory />
                <ProductName />
                <Customername />
              </Group>
            </Grid.Col>

            <SelectedProducts />
          </Grid>
        </SimpleGrid>
      </Stack>
    </MainLayout>
  );
};

export default PointOfSales;
