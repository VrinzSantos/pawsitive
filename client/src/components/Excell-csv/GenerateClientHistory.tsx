/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import { mkConfig, download } from "export-to-csv";
import dayjs from "dayjs";

interface GenerateClientHistoryProps {
  petsHistoryArray: [string, string][];
  petsMedicationArray: [string, string][];
  fileName: string;
}

const GenerateClientHistory: React.FC<GenerateClientHistoryProps> = ({
  petsHistoryArray,
  petsMedicationArray,
  fileName,
}) => {
  const formatDate = (date: string) => {
    return dayjs(date).format("MM/DD/YY");
  };

  const handleExportData = () => {
    // Sort pets history array by date in descending order
    const sortedPetsHistoryArray = petsHistoryArray.sort((a, b) => {
      return dayjs(b[1]).valueOf() - dayjs(a[1]).valueOf();
    });

    // Sort pets medication array by date in descending order
    const sortedPetsMedicationArray = petsMedicationArray.sort((a, b) => {
      return dayjs(b[1]).valueOf() - dayjs(a[1]).valueOf();
    });

    // Prepare pets history CSV data with column names
    const petsHistoryCsv = sortedPetsHistoryArray
      .map((row) => `"${row[0]}", "${formatDate(row[1])}"`)
      .join("\n");

    // Prepare pets medication CSV data with column names
    const petsMedicationCsv = sortedPetsMedicationArray
      .map((row) => `"${row[0]}", "${formatDate(row[1])}"`)
      .join("\n");

    // Combine CSV data with column names
    const combinedCsv: any = `Pets History, Date of History, Pet's Medication, Medication Date\n${combineColumns(
      petsHistoryCsv,
      petsMedicationCsv
    )}`;

    // Download combined CSV
    const combinedCsvConfig = mkConfig({
      fieldSeparator: ",",
      decimalSeparator: ".",
      useKeysAsHeaders: true,
      filename: fileName + " Pet's History",
    });

    download(combinedCsvConfig)(combinedCsv);
  };

  // Function to combine two CSV strings into one with rows side by side
  const combineColumns = (csv1: string, csv2: string) => {
    const rows1 = csv1.split("\n");
    const rows2 = csv2.split("\n");
    const maxLength = Math.max(rows1.length, rows2.length);
    let result = "";
    for (let i = 0; i < maxLength; i++) {
      result += (rows1[i] || "").trim() + ", " + (rows2[i] || "").trim() + "\n";
    }
    return result.trim();
  };

  return (
    <Button
      leftSection={<IconDownload />}
      variant="filled"
      size="xs"
      onClick={handleExportData}
    >
      Export Client History
    </Button>
  );
};

export default GenerateClientHistory;
