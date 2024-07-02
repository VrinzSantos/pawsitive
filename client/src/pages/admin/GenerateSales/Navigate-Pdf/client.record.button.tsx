import { Button, rem, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { IconPdf } from "@tabler/icons-react";
const ClientRecordButtoNavigate = () => {
  return (
    <Link to={"/client-record-pdf-data"} target="_blank">
      <Button
        leftSection={<IconPdf size={20} />}
        variant="filled"
        bg={"blue"}
        // size="xs"
        // style={{ width: rem(500), height: rem(120) }}

        radius={rem(5)}
      >
        <Text size={rem(15)} fw="bold">
          Export PDF
        </Text>
      </Button>
    </Link>
  );
};

export default ClientRecordButtoNavigate;
