import { ActionIcon, Text, Tooltip } from "@mantine/core";
import { modals } from "@mantine/modals";
import axios from "axios";
import { useMutation } from "react-query";
import { ReactQueryClient } from "@/services/providers/ReactQueryProvider";
import { IconTrashFilled } from "@tabler/icons-react";
type Props = {
  id: string;
};
const DeleteClientRecord = ({ id }: Props) => {
  // console.log("🚀 ~ DeleteAppointmentModal ~ id:", id);

  const deleteAppointment = async (id: string) => {
    const response = await axios.delete(
      `http://localhost:5000/api/client/delete-record/${id}`
    );
    return response.data;
  };

  const mutation = useMutation(deleteAppointment, {
    onSuccess: () => {
      close();
      alert("Item deleted successfully");
      // Invalidate the appointments query after deletion
      ReactQueryClient.invalidateQueries("clientRecord");
    },
    onError: (error: Error) => {
      console.error("Error deleting Items:", error);
      alert("Error deleting Items: " + error.message);
    },
  });

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: "Confirm Deletion",
      centered: true,
      children: (
        <Text size="sm">Are you sure you want to delete this record?</Text>
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

export default DeleteClientRecord;
