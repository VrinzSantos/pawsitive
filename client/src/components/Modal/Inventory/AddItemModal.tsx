/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Modal,
  Select,
  Stack,
  TextInput,
  NumberInput,
  Textarea,
  rem,
  Group,
  Image,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconImageInPicture } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useAppDispatch } from "@/services/states/redux/hooks";
import { appInfoRedux } from "@/services/states/redux/slices/appSlice";

type Products = {
  productCategory: string;
  productName: string;
  productDescription: string;
  productPrice: string | number;
  productQuantity: string | number;
  productImage: File | null;
};
const AddItemModal = () => {
  const queryClient = useQueryClient();

  const form = useForm<Products>({
    initialValues: {
      productCategory: "",
      productName: "",
      productDescription: "",
      productPrice: 0,
      productQuantity: 0,
      productImage: null,
    },

    validate: {
      productCategory: (value) =>
        value === "" ? "Please Select Product Category" : null,
      productName: (value) =>
        value === "" ? "Please Input Product name" : null,
      productDescription: (value) =>
        value === "" ? "Please Input Product Description" : null,
      productPrice: (value) =>
        value === 0 ? "Please Input Product Price" : null,
      productQuantity: (value) =>
        value === 0 ? "Please Input Product Quantity" : null,
      productImage: (value) =>
        value === null ? "Please Select Product Image" : null,
    },
  });
  const [opened, { open, close }] = useDisclosure(false);

  const imageIcon = (
    <IconImageInPicture
      style={{ width: rem(18), height: rem(18) }}
      stroke={1.5}
    />
  );
  const dispatch = useAppDispatch();

  const AddProduct = async (values: Products) => {
    const response = await axios.post(
      "http://localhost:5000/api/inventory/add-product",
      values
    );
    return response.data;
  };
  const { mutateAsync: addProduct } = useMutation({
    mutationFn: AddProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["InventoryData"] });
      close();
      alert("Product added successfully");
    },
  });

  const handleImageUpload = async (event: any) => {
    const file = event.target.files[0];
    const reader: any = new FileReader();
    reader.onloadend = () => {
      form.setValues({ productImage: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (form.validate().hasErrors) {
      return;
    }
    try {
      dispatch(
        appInfoRedux({
          isAppLoading: true,
        })
      );
      await addProduct(form.values);
      form.setValues({
        productCategory: "",
        productDescription: "",
        productName: "",
        productPrice: 0,
        productQuantity: 0,
        productImage: null,
      });
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(
        appInfoRedux({
          isAppLoading: false,
        })
      );
    }
  };
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Add Product"
        centered
        closeOnClickOutside={false}
      >
        <Stack>
          {/* Product Category */}
          <Select
            required
            label="Product Category"
            {...form.getInputProps("productCategory")}
            placeholder="Select Category"
            data={["Vaccination", "Medication", "Check-up"]}
          />
          <TextInput
            required
            label="Product name"
            placeholder="Product name"
            {...form.getInputProps("productName")}
          />
          <Textarea
            required
            label="Product Description"
            placeholder="Product Description"
            {...form.getInputProps("productDescription")}
          />
          <NumberInput
            required
            label="Product Price"
            placeholder="Product Price"
            {...form.getInputProps("productPrice")}
          />
          <NumberInput
            required
            label="Product Quantity"
            placeholder="Product Quantity"
            {...form.getInputProps("productQuantity")}
          />
          {/* 
          <FileInput
            leftSection={icon}
            label="Product Photo"
            placeholder="Upload Product Photo"
            leftSectionPointerEvents="none"
            onChange={handleImageUpload}
            value={value}
          
          /> */}
          <Stack>
            <Title order={5}>Upload Image</Title>
            <Group>
              {imageIcon}
              <input type="file" onChange={handleImageUpload} />
              <p style={{ color: "red", fontSize: "12px" }}>
                {form.errors.productImage && form.errors.productImage}
              </p>
            </Group>
          </Stack>

          {form.values.productImage && (
            <Image radius="md" h={200} src={form.values.productImage} />
          )}
          <Group justify="flex-end">
            <Button color="red" onClick={close}>
              Cancel
            </Button>
            <Button color="green" onClick={handleSubmit}>
              Save
            </Button>
          </Group>
        </Stack>
      </Modal>
      <Button onClick={open}>Add Product</Button>
    </>
  );
};

export default AddItemModal;
