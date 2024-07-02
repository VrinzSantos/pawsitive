import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Center,
  Stack,
} from "@mantine/core";
import { useAppDispatch } from "@/services/states/redux/hooks";
import { addItem } from "@/services/states/redux/slices/orderSlice";
type ProductProps = {
  id: string;
  image: string;
  productName: string;
  productPrice: number;
  stocks: number;
};
const ProductCard = ({
  image,
  productName,
  productPrice,
  stocks,
  id,
}: ProductProps) => {
  const dispatch = useAppDispatch();
  // console.log("🚀 ~ image:", image);
  const handleAddItem = () => {
    dispatch(
      addItem({
        _id: id,
        productName: productName,
        price: productPrice,
        quantity: 1,
        productImageUrl: image,
      })
    );
  };
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder h={350}>
      <Image src={image} h={120} radius={"lg"} alt={productName} />
      <Stack mt={10}>
        <Center>
          <Text fw={500} style={{ textAlign: "center" }}>
            {productName}
          </Text>
        </Center>

        <Group justify="space-between" mt="md" mb="xs">
          <Badge color="pink">₱ {productPrice}</Badge>
          <Badge color="green">Stocks: {stocks}</Badge>
        </Group>
      </Stack>

      <Button
        color="blue"
        pos={"absolute"}
        w={"80%"}
        mt={"270px"}
        radius="md"
        onClick={handleAddItem}
      >
        ADD
      </Button>
    </Card>
  );
};

export default ProductCard;
