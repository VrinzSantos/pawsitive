import { useDisclosure } from "@mantine/hooks";
import { IconCheck } from "@tabler/icons-react";
import {
  Modal,
  Button,
  ActionIcon,
  Text,
  Group,
  Center,
  Stack,
  Tooltip,
} from "@mantine/core";
import axios from "axios";
type Props = {
  id: string;
  userId: string;
  service: string;
  description: string;
};
const ApproveAppointmentModal = ({
  id,
  userId,
  service,
  description,
}: Props) => {
  // console.log("🚀 ~ ApproveAppointmentModal ~ id:", id);
  const [opened, { open, close }] = useDisclosure(false);
  const handleClick = () => {
    close();
    // Define the URL of your API endpoint
    const updateStatusUrl = "http://localhost:5000/api/appointment/update";

    // Define the data to be sent in the request body
    const requestData = {
      userId,
      service,
      description,
      appointmentId: id, // Replace with the actual appointment ID
      newStatus: "Approved", // Replace with the new status you want to set
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
        title="Approve Appointment"
        centered
      >
        <Center>
          <Stack>
            <Text size="xl">Do you want to approve this appointment?</Text>
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

      <Tooltip label="Confirm">
        <ActionIcon color="green" onClick={open}>
          <IconCheck />
        </ActionIcon>
      </Tooltip>
    </>
  );
};

export default ApproveAppointmentModal;
