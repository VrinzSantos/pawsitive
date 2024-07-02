import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Center,
  Stack,
  NumberInput,
} from "@mantine/core";
import { useAppDispatch } from "@/services/states/redux/hooks";
import { removeItem } from "@/services/states/redux/slices/orderSlice";
import { updateQuantity } from "@/services/states/redux/slices/orderSlice";
type ProductProps = {
  id: string;
  image: string;
  productName: string;
  productPrice: number;
  quantity: number;
};
const SelectedProductCard = ({
  image,
  productName,
  productPrice,
  quantity,
  id,
}: ProductProps) => {
  const dispatch = useAppDispatch();
  // console.log("🚀 ~ image:", image);
  const handleRemoveItem = () => {
    dispatch(removeItem(id));
  };
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder h={370}>
      <Image src={image} h={120} radius={"lg"} alt={productName} />
      <Stack mt={10}>
        <Center>
          <Text fw={500} style={{ textAlign: "center" }}>
            {productName}
          </Text>
        </Center>

        <Group justify="space-between" mt="md" mb="xs">
          <Badge color="pink">₱ {productPrice}</Badge>
          <Badge color="green">Quantity: {quantity}</Badge>
        </Group>
      </Stack>
      <NumberInput
        label="Quantity"
        value={quantity}
        placeholder="Input Quantity"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange={(value: any) => {
          // Parse the value as a number
          const parsedValue = parseInt(value, 10);
          // Check if the parsed value is a valid number
          if (!isNaN(parsedValue)) {
            dispatch(updateQuantity({ _id: id, quantity: parsedValue }));
          }
        }}
      />

      <Button
        color="red"
        fullWidth
        mt="md"
        radius="md"
        onClick={handleRemoveItem}
      >
        REMOVE
      </Button>
    </Card>
  );
};

export default SelectedProductCard;
