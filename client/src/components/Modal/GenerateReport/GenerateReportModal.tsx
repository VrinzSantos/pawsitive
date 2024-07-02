import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Group } from "@mantine/core";
import GenerateSales from "@/components/Excell-csv/GenerateSales";
import GenerateClientRecord from "@/components/Excell-csv/GenerateClientRecord";
import { IconCsv } from "@tabler/icons-react";
import GenerateInventory from "@/components/Excell-csv/GenerateInventory";

const GenerateReportModal = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Generate Reports"
        size="lg"
        centered
      >
        {/* Modal content */}
        <Group justify="space-around">
          <GenerateSales />
          <GenerateClientRecord />
          <GenerateInventory />
        </Group>
      </Modal>

      <Button onClick={open} color="green" leftSection={<IconCsv />}>
        Summary Reports
      </Button>
    </>
  );
};

export default GenerateReportModal;
