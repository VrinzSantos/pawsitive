import { useDisclosure } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
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

type Props = {
  id: string;
};
const CancelAppointmentModal = ({ id }: Props) => {
  const [opened, { open, close }] = useDisclosure(false);

  const handleClick = () => {
    close();
    // Define the URL of your API endpoint
    const updateStatusUrl = "http://localhost:5000/api/appointment/update";

    // Define the data to be sent in the request body
    const requestData = {
      appointmentId: id, // Replace with the actual appointment ID
      newStatus: "Rejected", // Replace with the new status you want to set
    };

    // Make a PATCH request to update the status
    axios
      .patch<{ success: boolean; message?: string }>(
        updateStatusUrl,
        requestData
      )
      .then((response) => {
        // Handle successful response
        if (response.status === 200 && response.data.success) {
          alert("Status updated successfully");
        } else {
          alert("Error updating status: " + response.data.message);
        }
      })
      .catch((error: Error) => {
        // Handle error
        console.error("Error updating status:", error);
        alert(error.message);
      });
  };
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Cancel Appointment"
        centered
      >
        <Center>
          <Stack>
            <Text size="xl">Do you want to cancel this appointment?</Text>
            <Center>
              <Group align="center">
                <Button color="green" onClick={handleClick}>
                  Confirm
                </Button>
                <Button color="red" onClick={close}>
                  Cancel
                </Button>
              </Group>
            </Center>
          </Stack>
        </Center>
      </Modal>

      <ActionIcon color="red" onClick={open}>
        <IconTrash />
      </ActionIcon>
    </>
  );
};

export default CancelAppointmentModal;
