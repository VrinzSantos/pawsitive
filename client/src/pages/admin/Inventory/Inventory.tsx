import MainLayout from "@/layout";
import InventoryTable from "@/components/Table/InventoryTable";
import { useFetchAllInventory } from "@/hooks/inventory_hooks";
import { Stack, Title, Image, Box, Group } from "@mantine/core";
import { useAppSelector } from "@/services/states/redux/hooks";
import { AppLoading } from "@/components/Loaders/AppLoading";
import AddItemModal from "@/components/Modal/Inventory/AddItemModal";
const Inventory = () => {
  const { data, isLoading } = useFetchAllInventory();
  const { isAppLoading } = useAppSelector((state) => state.app);
  const InventoryColumn = [
    {
      // accessorKey: "productImage",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      accessorFn: (row: any) => (
        <Box>
          <Image src={row.productImage} w={80} h={80} radius={10} />
        </Box>
      ),
      header: "Product Photo",
      align: "center",
    },
    {
      accessorKey: "productCategory",
      header: "Category",
    },
    {
      accessorKey: "productName",
      header: "Name",
    },

    {
      accessorKey: "productDescription",
      header: "Description",
    },
    {
      accessorKey: "productPrice",
      header: "Price",
    },
    // {
    //   accessorKey: "productQuantity",
    //   header: "Quantity",
    // },
    {
      accessorKey: "stocksLeft",
      header: "Stocks",
    },
  ];
  return (
    <MainLayout>
      <AppLoading isLoading={isAppLoading} />
      <Stack>
        <Group justify="space-between">
          <Title>Inventory</Title>
          <AddItemModal />
        </Group>
        <>
          <InventoryTable
            data={data!}
            columns={InventoryColumn}
            isLoading={isLoading}
          />
        </>
      </Stack>
    </MainLayout>
  );
};

export default Inventory;
