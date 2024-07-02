import { ActionIcon, Text, Tooltip } from "@mantine/core";
import { modals } from "@mantine/modals";
import axios from "axios";
import { useMutation } from "react-query";
import { ReactQueryClient } from "@/services/providers/ReactQueryProvider";
import { IconTrashFilled } from "@tabler/icons-react";

type Props = {
  id: string;
};
const DeleteOrderModal = ({ id }: Props) => {
  // console.log("🚀 ~ DeleteAppointmentModal ~ id:", id);

  const deleteAppointment = async (id: string) => {
    const response = await axios.delete(
      `http://localhost:5000/api/orders/delete/${id}`
    );
    return response.data;
  };

  const mutation = useMutation(deleteAppointment, {
    onSuccess: () => {
      // alert("Order deleted successfully");
      // Invalidate the appointments query after deletion
      ReactQueryClient.invalidateQueries("orders");
    },
    onError: (error: Error) => {
      console.error("Error deleting orders:", error);
      alert("Error deleting orders: " + error.message);
    },
  });

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: "Delete your Order",
      centered: true,
      children: (
        <Text size="sm">Are you sure you want to delete this order?</Text>
      ),
      labels: { confirm: "Delete", cancel: "No don't delete it" },
      confirmProps: { color: "red" },
      // onCancel: () => console.log("Cancel"),
      onConfirm: () => mutation.mutate(id),
    });
  return (
    <>
      <Tooltip label="Delete">
        <ActionIcon color="red" onClick={openDeleteModal}>
          <IconTrashFilled />
        </ActionIcon>
      </Tooltip>
    </>
  );
};

export default DeleteOrderModal;
