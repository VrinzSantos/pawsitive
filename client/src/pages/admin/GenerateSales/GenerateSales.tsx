import ExportSalesData from "@/components/Excell-csv/ExportSalesData";
import GenerateClientRecord from "@/components/Excell-csv/GenerateClientRecord";
import GenerateInventory from "@/components/Excell-csv/GenerateInventory";
import MainLayout from "@/layout";
import { Paper, SimpleGrid, Stack, Title, Flex } from "@mantine/core";
import SaleDataNavigatePdf from "./Navigate-Pdf/sales.data.button";
import InventoryRecordPdf from "./Navigate-Pdf/inventory.record.button";
import ClientRecordButtoNavigate from "./Navigate-Pdf/client.record.button";
const GenerateSales = () => {
  return (
    <MainLayout>
      <Stack>
        <Title order={2}>Generate Sales</Title>
        <SimpleGrid cols={3}>
          <Paper withBorder shadow="md" p={30} mt={40} radius="md">
            <Stack>
              <Title>Sales Data</Title>
              <Flex gap={"lg"}>
                <ExportSalesData />
                <SaleDataNavigatePdf />
              </Flex>
            </Stack>
          </Paper>
          <Paper withBorder shadow="md" p={30} mt={40} radius="md">
            <Stack>
              <Title>Inventory Record</Title>
              <Flex gap={"lg"}>
                <GenerateInventory />
                <InventoryRecordPdf />
              </Flex>
            </Stack>
          </Paper>
          <Paper withBorder shadow="md" p={30} mt={40} radius="md">
            <Stack>
              <Title>Client Record</Title>
              <Flex gap={"lg"}>
                <GenerateClientRecord />
                <ClientRecordButtoNavigate />
              </Flex>
            </Stack>
          </Paper>
          {/* <GenerateInventory />
          <GenerateClientRecord /> */}
        </SimpleGrid>
      </Stack>
    </MainLayout>
  );
};

export default GenerateSales;
