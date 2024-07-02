import { Autocomplete, rem } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useFetchInventoryName } from "@/hooks/inventory_hooks";
import { setSelectedProductName } from "@/services/states/redux/slices/inventorySlice";
import { useAppDispatch, useAppSelector } from "@/services/states/redux/hooks";
const ProductName = () => {
  const dispatch = useAppDispatch();

  const { data } = useFetchInventoryName();
  const { selectedProductName } = useAppSelector((state) => state.inventory);

  return (
    <Autocomplete
      label="Product name"
      placeholder="Search by Product name"
      leftSection={
        <IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
      }
      data={data}
      value={selectedProductName}
      onChange={(value) => dispatch(setSelectedProductName(value))}
    />
  );
};

export default ProductName;
