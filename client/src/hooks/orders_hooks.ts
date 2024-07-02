import { useQuery, UseQueryResult, useMutation } from "react-query";
import axios, { AxiosError } from "axios";
import dayjs from "dayjs";
import { ReactQueryClient } from "@/services/providers/ReactQueryProvider";
import { requestOrderFunctionAPI } from "@/services/api/order.api";

interface Product {
  product: string;
  quantity: number;
}

interface Order {
  _id: string;
  products: Product[];
  totalAmount: number;
  orderDate: string;
  customerName: string;
  amountReceived: number;
  change: number;
}

export const useFetchOrders = (
  dateValue: Date | null
): UseQueryResult<Order[], AxiosError> => {
  return useQuery<Order[], AxiosError>(
    ["orders", dateValue?.toISOString()],
    async () => {
      const response = await axios.get<{ data: Order[] }>(
        "http://localhost:5000/api/orders"
      );
      let filteredOrders = response.data.data;
      if (dateValue) {
        const selectedDate = dayjs(dateValue).format("YYYY-MM-DD");
        filteredOrders = filteredOrders.filter((order) => {
          const orderDate = dayjs(order.orderDate).format("YYYY-MM-DD");
          return orderDate === selectedDate;
        });
      }
      return filteredOrders;
    },
    {
      staleTime: Infinity,
    }
  );
};

export const useCheckOutOrder = () => {
  const { mutateAsync: checkOutOrder } = useMutation({
    mutationFn: requestOrderFunctionAPI,
    onSuccess: () => {
      ReactQueryClient.invalidateQueries({ queryKey: ["InventoryData"] });
      alert("Item successfully checked out");
    },
  });

  return checkOutOrder;
};
