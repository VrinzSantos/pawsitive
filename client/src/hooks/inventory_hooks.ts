import { useQuery } from "react-query";
import axios from "axios";

export interface InventoryItem {
  _id: string;
  productCategory: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  productImage: string;
  productQuantity: number;
  stocksLeft: number;
  stocksOut?: number;
}

export const useFetchInventoryItems = (
  category: string | null,
  productName: string | null
) => {
  return useQuery<InventoryItem[]>(
    ["inventoryItems", category, productName], // Update the query key to include productName
    async () => {
      const { data } = await axios.get("http://localhost:5000/api/inventory");
      // Filter items based on category and productName
      const items = data.data.filter((item: InventoryItem) => {
        const categoryMatch = !category || item.productCategory === category;
        const productNameMatch =
          !productName ||
          item.productName.toLowerCase().includes(productName.toLowerCase());
        return categoryMatch && productNameMatch;
      });
      return items;
    }
  );
};

export const useFetchInventoryCategories = () => {
  return useQuery<string[]>("inventoryCategories", async () => {
    const { data } = await axios.get<{ data: { productCategory: string }[] }>(
      "http://localhost:5000/api/inventory"
    );
    // Extract categories from the response and return them
    const categories = data.data.map((item) => item.productCategory);
    // Deduplicate categories using Set and convert it back to array
    const uniqueCategories = Array.from(new Set(categories));
    return uniqueCategories;
  });
};

export const useFetchInventoryName = () => {
  return useQuery<string[]>("inventoryName", async () => {
    const { data } = await axios.get<{ data: { productName: string }[] }>(
      "http://localhost:5000/api/inventory"
    );
    // Extract categories from the response and return them
    const name = data.data.map((item) => item.productName);
    // Deduplicate categories using Set and convert it back to array
    const uniqueName = Array.from(new Set(name));
    return uniqueName;
  });
};

export const useFetchAllInventory = () => {
  return useQuery<InventoryItem[], string>("InventoryData", async () => {
    const { data } = await axios.get("http://localhost:5000/api/inventory");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // const name = data.data.map((item: any) => item.productName);
    return data.data;
  });
};

export const useFetchGeneratedInventory = () => {
  return useQuery<InventoryItem[], string>("generatedInventory", async () => {
    const { data } = await axios.get(
      "http://localhost:5000/api/inventory/generate-inventory"
    );
    // Sort the data based on productQuantity in ascending order
    const sortedData = data.data.sort(
      (a: InventoryItem, b: InventoryItem) =>
        a.productQuantity - b.productQuantity
    );
    return sortedData;
  });
};
