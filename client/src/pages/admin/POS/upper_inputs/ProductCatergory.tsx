import { useFetchInventoryCategories } from "@/hooks/inventory_hooks";
import { Autocomplete } from "@mantine/core";

import { useAppDispatch, useAppSelector } from "@/services/states/redux/hooks";
import { setSelectedCategory } from "@/services/states/redux/slices/inventorySlice";
const ProductCategory = () => {
  const dispatch = useAppDispatch();
  const { data: categories } = useFetchInventoryCategories();
  const { selectedCategory } = useAppSelector((state) => state.inventory);
  //   console.log("🚀 ~ ProductCategory ~ categories:", categories);

  return (
    <Autocomplete
      label="Product Category"
      placeholder="Select Product Category"
      data={categories || []}
      value={selectedCategory}
      onChange={(value) => dispatch(setSelectedCategory(value))}
    />
  );
};

export default ProductCategory;
