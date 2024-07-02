import { useFetchClientRecord } from "@/hooks/client_record_hooks";
import { Button, rem, Text } from "@mantine/core";
import { IconFileTypeCsv } from "@tabler/icons-react";
import { mkConfig, generateCsv, download } from "export-to-csv";

const GenerateClientRecord = () => {
  const { data } = useFetchClientRecord();
  const csvConfig = mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    useKeysAsHeaders: true,
    filename: "Client Record",
  });

  const handleExportData = () => {
    if (data) {
      const plainData = data.map((item) => ({
        fullName: item.fullName,
        address: item.address,
        contact: item.contact,
        nameOfPet: item.nameOfPet,
        species: item.species,
        petsBreed: item.petsBreed,
        petsSex: item.petsSex,
        petsBirthdate: item.petsBirthdate,
        petsHistory: item.petsHistory!.join(", "),
        historyDate: item.historyDate!.join(", "),
        petsMedication: item.petsMedication!.join(", "),
        medicationDate: item.medicationDate!.join(", "),
      }));

      const csv = generateCsv(csvConfig)(plainData);
      download(csvConfig)(csv);
    } else {
      console.error("Client record data is undefined.");
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

export default GenerateClientRecord;
