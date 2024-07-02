import { useAppSelector, useAppDispatch } from "@/services/states/redux/hooks";
import SelectedProductCard from "@/components/Card/SelectedProductCard";
import {
  Group,
  Stack,
  Title,
  Paper,
  NumberInput,
  NumberFormatter,
  Button,
} from "@mantine/core";
import { useState } from "react";

import { clearOrder } from "@/services/states/redux/slices/orderSlice";
import { useCheckOutOrder } from "@/hooks/orders_hooks";
const SelectedProducts = () => {
  const { totalAmount, customerName, items } = useAppSelector(
    (state) => state.order
  );
  const dispatch = useAppDispatch();
  const [payment, setPayment] = useState<string | number>(0);
  //   console.log(items);
  // Calculate change
  const requestOrderFunctionAPI = useCheckOutOrder();
  const change = Number(payment) - totalAmount;

  const requestBody = {
    products: items.map((item) => ({
      product: item._id,
      quantity: item.quantity,
    })),
    totalAmount: totalAmount,
    amountReceived: payment,
    change: change,
    customerName: customerName,
  };

  const handleCheckout = async () => {
    if (!customerName) {
      return alert("Please Enter a customer name");
    } else {
      requestOrderFunctionAPI(requestBody);
      dispatch(clearOrder());
    }
  };
  return (
    <>
      {items.length > 0 && (
        <Stack>
          <Title>Selected Products</Title>
          <Group>
            {items.map((item, index) => (
              <SelectedProductCard
                key={index}
                id={item._id}
                image={item.productImageUrl}
                productName={item.productName}
                productPrice={item.price}
                quantity={item.quantity}
              />
            ))}
          </Group>
          {totalAmount != 0 && (
            <Paper withBorder shadow="md" p={30} mt={40} radius="md">
              <Stack>
                <NumberInput
                  label="Amount Received"
                  required
                  value={payment}
                  min={0}
                  onChange={(value) => setPayment(Number(value))}
                />
                <Group>
                  <Title order={4}>
                    Total Amount:
                    <NumberFormatter
                      prefix=" ₱"
                      value={totalAmount}
                      thousandSeparator
                    />
                  </Title>
                </Group>
                <Group>
                  {change > 0 && (
                    <Title order={4}>
                      Change :
                      <NumberFormatter
                        prefix=" ₱"
                        value={change}
                        thousandSeparator
                      />
                    </Title>
                  )}
                  {Number(payment) > 0 && change >= 0 && (
                    <Button fullWidth onClick={handleCheckout}>
                      Check out
                    </Button>
                  )}
                </Group>
              </Stack>
            </Paper>
          )}
        </Stack>
      )}
    </>
  );
};

export default SelectedProducts;
