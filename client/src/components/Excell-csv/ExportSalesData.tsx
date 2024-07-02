import { Button, Text } from "@mantine/core";
import { IconFileTypeCsv } from "@tabler/icons-react";
import { mkConfig, generateCsv, download } from "export-to-csv";
import { rem } from "@mantine/core";
import { useFetchDailySales } from "@/hooks/generate.sales.hooks";
const ExportSalesData = () => {
  const { data } = useFetchDailySales();
  // console.log("🚀 ~ ExportSalesData ~ data:", data);

  const csvConfig = mkConfig({
    useKeysAsHeaders: true,
    filename: "Sales",
  });

  const handleExportData = () => {
    if (data) {
      const csv = generateCsv(csvConfig)(data);
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
      // size="xs"
      // style={{ width: rem(500), height: rem(120) }}
      onClick={handleExportData}
      radius={rem(5)}
    >
      <Text size={rem(15)} fw="bold">
        Export CSV
      </Text>
    </Button>
  );
};

export default ExportSalesData;
