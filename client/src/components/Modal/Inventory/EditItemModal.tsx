import React, { useReducer, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import {
  Modal,
  ActionIcon,
  Tooltip,
  TextInput,
  Group,
  Button,
  Stack,
  Image,
  Center,
  Select,
} from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { useFetchInventoryCategories } from "@/hooks/inventory_hooks";
import axios from "axios";
import { appInfoRedux } from "@/services/states/redux/slices/appSlice";
import { useAppDispatch } from "@/services/states/redux/hooks";
// Action types
const SET_FIELD = "SET_FIELD";

interface InventoryItem {
  _id?: string;
  productCategory?: string;
  productDescription: string;
  productImage?: string;
  productPrice: number;
  productName: string;
  productQuantity: number;
  stocksLeft: number;
}
// Define the action type
interface SetFieldAction {
  type: typeof SET_FIELD;
  field: keyof InventoryItem;
  payload: string | number;
}

// Reducer function
const reducer = (
  state: InventoryItem,
  action: SetFieldAction
): InventoryItem => {
  switch (action.type) {
    case SET_FIELD:
      return { ...state, [action.field]: action.payload };
    default:
      return state;
  }
};

const EditItemModal: React.FC<InventoryItem> = ({
  _id,
  productCategory,
  productDescription,
  productImage,
  productPrice,
  productName,
  productQuantity,
  stocksLeft,
}) => {
  // Initial state for modal inputs
  const initialState: InventoryItem = {
    productDescription,
    productPrice,
    productName,
    productQuantity,
    stocksLeft,
  };

  // State and dispatch function for managing modal inputs
  const [state, stateDispatch] = useReducer(reducer, initialState);
  const [categoryValue, setCategoryValue] = useState<string | null>(
    productCategory!
  );
  const dispatch = useAppDispatch();
  const [opened, { open, close }] = useDisclosure(false);
  const { data: categories } = useFetchInventoryCategories();
  // Function to handle changes in the input fields
  const handleInputChange = (
    field: keyof InventoryItem
  ): ((event: React.ChangeEvent<HTMLInputElement>) => void) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      stateDispatch({ type: SET_FIELD, field, payload: event.target.value });
    };
  };

  // Function to handle saving changes
  const handleSaveChanges = async () => {
    try {
      dispatch(
        appInfoRedux({
          isAppLoading: true,
        })
      );
      // Combine all the necessary fields into a single object
      const updatedItem: InventoryItem = {
        _id,
        productCategory: categoryValue!,
        ...state,
        productQuantity: parseInt(String(state.productQuantity)),
        stocksLeft: parseInt(String(state.stocksLeft)),
      };
      console.log("🚀 ~ handleSaveChanges ~ updatedItem:", updatedItem);

      // Send request using Axios
      const response = await axios.put(
        `http://localhost:5000/api/inventory/update/${_id}`,
        updatedItem
      );

      // Check response status
      if (response.status === 200) {
        // If successful, close the modal
        alert("Success updated");
        close();
      } else {
        // Handle error
        console.error("Error updating product:", response.data.message);
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error updating product:", error);
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
      <Modal opened={opened} onClose={close} title="Edit Item" centered>
        {/* Modal content */}
        <Center>
          <Image src={productImage} w={150} h={150} radius={10} mb={10} />
        </Center>
        <Stack gap="lg">
          <Select
            label="Product category"
            placeholder="Pick value"
            data={categories || []}
            value={categoryValue}
            onChange={setCategoryValue}
          />

          {Object.entries(state).map(([field, value]) => (
            <TextInput
              key={field}
              label={String(field)
                .replace(/([A-Z])/g, " $1")
                .trim()
                .toUpperCase()}
              placeholder="Input placeholder"
              value={value}
              onChange={handleInputChange(field as keyof InventoryItem)}
            />
          ))}
        </Stack>
        <Group justify="flex-end" my={10}>
          <Button bg="red" onClick={close}>
            Close
          </Button>
          <Button bg="green" onClick={handleSaveChanges}>
            Save
          </Button>
        </Group>
      </Modal>

      <Tooltip label="Edit">
        <ActionIcon bg={"green"} onClick={open}>
          <IconEdit />
        </ActionIcon>
      </Tooltip>
    </>
  );
};

export default EditItemModal;
