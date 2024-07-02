import { useFetchGeneratedInventory } from "@/hooks/inventory_hooks";
import { Button, rem, Text } from "@mantine/core";
import { IconFileTypeCsv } from "@tabler/icons-react";

import { mkConfig, generateCsv, download } from "export-to-csv";

const GenerateInventory = () => {
  const { data } = useFetchGeneratedInventory();
  const csvConfig = mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    useKeysAsHeaders: true,
    filename: "Inventory Record",
  });

  const handleExportData = () => {
    if (data) {
      const plainData = data.map((item) => ({ ...item }));

      const csv = generateCsv(csvConfig)(plainData);
      download(csvConfig)(csv);
    } else {
      console.error("Monthly sales data is undefined.");
    }
  };

  return (
    <Button
      leftSection={<IconFileTypeCsv size={20} />}
      variant="filled"
      bg={"green"}
      onClick={handleExportData}
      radius={rem(5)}
    >
      <Text size={rem(15)} fw="bold">
        Export CSV
      </Text>
    </Button>
  );
};

export default GenerateInventory;
