import { useDisclosure } from "@mantine/hooks";
import { IconTrashFilled } from "@tabler/icons-react";
import {
  Modal,
  Button,
  ActionIcon,
  Text,
  Group,
  Center,
  Stack,
} from "@mantine/core";
import axios from "axios";
import { useMutation } from "react-query";
import { ReactQueryClient } from "@/services/providers/ReactQueryProvider";
type Props = {
  id: string;
};
const DeleteAppointmentModal = ({ id }: Props) => {
  //   console.log("🚀 ~ DeleteAppointmentModal ~ id:", id);
  const [opened, { open, close }] = useDisclosure(false);

  const deleteAppointment = async (id: string) => {
    const response = await axios.delete(
      `http://localhost:5000/api/appointment/delete/${id}`
    );
    return response.data;
  };

  const mutation = useMutation(deleteAppointment, {
    onSuccess: () => {
      close();
      alert("Appointment deleted successfully");
      // Invalidate the appointments query after deletion
      ReactQueryClient.invalidateQueries("appointments");
    },
    onError: (error: Error) => {
      console.error("Error deleting appointment:", error);
      alert("Error deleting appointment: " + error.message);
    },
  });

  const handleClick = () => {
    mutation.mutate(id);
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Delete Appointment"
        centered
      >
        <Center>
          <Stack>
            <Text size="xl">Do you want to delete this appointment?</Text>
            <Center>
              <Group align="center">
                <Button color="red" onClick={handleClick}>
                  Delete
                </Button>
                <Button color="blue" onClick={close}>
                  Cancel
                </Button>
              </Group>
            </Center>
          </Stack>
        </Center>
      </Modal>

      <ActionIcon color="red" onClick={open}>
        <IconTrashFilled />
      </ActionIcon>
    </>
  );
};

export default DeleteAppointmentModal;
