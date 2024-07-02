import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Table, Rating } from "@mantine/core";
import { useFetchFeedbackData } from "@/hooks/dashboard_hooks";
import { Feedback } from "@/interfaces/dashboard.types";
const ViewFeedbackmodal = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { data } = useFetchFeedbackData();
  console.log("🚀 ~ ViewFeedbackmodal ~ data:", data);
  const rows = data.map((data: Feedback, index) => (
    <Table.Tr key={index}>
      <Table.Td>{data.category}</Table.Td>
      <Table.Td>{data.feedback}</Table.Td>
      <Table.Td>
        <Rating defaultValue={data.ratings} />
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Feedbacks"
        centered
        size="lg"
      >
        {/* Modal content */}
        <Table striped highlightOnHover withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Category</Table.Th>
              <Table.Th>Feedback</Table.Th>
              <Table.Th>Ratings</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Modal>

      <Button variant="transparent" onClick={open} size="xs">
        View Feedbacks
      </Button>
    </>
  );
};

export default ViewFeedbackmodal;
