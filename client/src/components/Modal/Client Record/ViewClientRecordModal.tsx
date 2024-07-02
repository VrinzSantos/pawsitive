/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Modal,
  Button,
  ActionIcon,
  Tooltip,
  Table,
  Stack,
  Title,
  Textarea,
  Group,
} from "@mantine/core";
import { IconEye } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import dayjs from "dayjs";
import { DatePickerInput } from "@mantine/dates";
import axios from "axios";
import { useMutation } from "react-query";
import { ReactQueryClient } from "@/services/providers/ReactQueryProvider";
import { useAppDispatch } from "@/services/states/redux/hooks";
import { useState } from "react";
import { appInfoRedux } from "@/services/states/redux/slices/appSlice";

import GenerateClientHistory from "@/components/Excell-csv/GenerateClientHistory";
type ClientProps = {
  id: string;
  fullName: string;
  petsHistoryArray: string[];
  historyDateArray: string[];
  petsMedicationArray: string[];
  medicationDateArray: string[];
};
function combineArrays<T, U>(array1: T[], array2: U[]): [T, U][] {
  const combined: [T, U][] = [];

  for (let i = 0; i < array1.length; i++) {
    combined.push([array1[i], array2[i]]);
  }

  return combined;
}
const ViewClientRecordModal = ({
  id,
  petsHistoryArray,
  petsMedicationArray,
  historyDateArray,
  medicationDateArray,
  fullName,
}: ClientProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const dispatch = useAppDispatch();

  const [petsHistory, setPetsHistory] = useState("");
  const [petsHistoryDate, setPetsHistoryDate] = useState<Date | null>(null);

  const [petsMedication, setPetsMedication] = useState("");
  const [petsMedicationDate, setPetMedicationDate] = useState<Date | null>(
    null
  );

  // Combine arrays and sort them based on date
  const petsHistoryArrayCombine = combineArrays(
    petsHistoryArray,
    historyDateArray
  ).sort((a, b) => new Date(b[1]).getTime() - new Date(a[1]).getTime());

  const petsMedicationArrayCombine = combineArrays(
    petsMedicationArray,
    medicationDateArray
  ).sort((a, b) => new Date(b[1]).getTime() - new Date(a[1]).getTime());

  const petHistoryRow = petsHistoryArrayCombine.map(([name, date], index) => (
    <Table.Tr key={index}>
      <Table.Td>{name}</Table.Td>
      <Table.Td>{dayjs(date).format("MM/DD/YY")}</Table.Td>
    </Table.Tr>
  ));

  const petsMedicationArrayRow = petsMedicationArrayCombine.map(
    ([name, date], index) => (
      <Table.Tr key={index}>
        <Table.Td>{name}</Table.Td>
        <Table.Td>{dayjs(date).format("MM/DD/YY")}</Table.Td>
      </Table.Tr>
    )
  );

  const addPetsHistory = async (values: any) => {
    const response = await axios.post(
      "http://localhost:5000/api/client/add-pet-history",
      values
    );
    return response.data;
  };

  const addPetsMedication = async (values: any) => {
    const response = await axios.post(
      "http://localhost:5000/api/client/add-pet-medication",
      values
    );
    return response.data;
  };
  const { mutateAsync: addHistoryRecord } = useMutation({
    mutationFn: addPetsHistory,
    onSuccess: () => {
      ReactQueryClient.invalidateQueries({ queryKey: ["clientRecord"] });
      alert("Client Pet Added History successfully");
    },
    onError: () => {
      alert("Client record Error");
    },
  });

  const { mutateAsync: addMedicationRecord } = useMutation({
    mutationFn: addPetsMedication,
    onSuccess: () => {
      ReactQueryClient.invalidateQueries({ queryKey: ["clientRecord"] });
      alert("Client Pet Added Medication successfully");
    },
    onError: () => {
      alert("Client record Error");
    },
  });
  const handleAddPetsHistory = async () => {
    try {
      dispatch(
        appInfoRedux({
          isAppLoading: true,
        })
      );
      const values = {
        id: id,
        petsHistory: petsHistory,
        historyDate: petsHistoryDate,
      };

      await addHistoryRecord(values);
      setPetsHistory("");
      setPetsHistoryDate(null);
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(
        appInfoRedux({
          isAppLoading: false,
        })
      );
    }
  };

  const handleMedication = async () => {
    try {
      dispatch(
        appInfoRedux({
          isAppLoading: true,
        })
      );
      const values = {
        id: id,
        petsMedication: petsMedication,
        medicationDate: petsMedicationDate,
      };

      await addMedicationRecord(values);
      setPetsMedication("");
      setPetMedicationDate(null);
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(
        appInfoRedux({
          isAppLoading: false,
        })
      );
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="View Pet Owner Record"
        centered
        size="lg"
        closeOnClickOutside={false}
      >
        <Stack>
          {/* Pets History */}
          <Group justify="space-between">
            <Title order={3}>Pets History</Title>
            <GenerateClientHistory
              fileName={fullName}
              petsHistoryArray={petsHistoryArrayCombine}
              petsMedicationArray={petsMedicationArrayCombine}
            />
          </Group>
          <Table striped highlightOnHover withTableBorder withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Pet's History</Table.Th>
                <Table.Th>Date of History</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{petHistoryRow}</Table.Tbody>
          </Table>
          {/* Pets Medication */}
          <Title order={3}>Pets Medication</Title>
          <Table striped highlightOnHover withTableBorder withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Pet's History</Table.Th>
                <Table.Th>Date of History</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{petsMedicationArrayRow}</Table.Tbody>
          </Table>
          {/* Adding Entry */}
          <Title order={3}>Add Entry</Title>
          <Textarea
            placeholder="Pets History"
            value={petsHistory}
            onChange={(event) => setPetsHistory(event.currentTarget.value)}
          />
          <DatePickerInput
            placeholder="Pets History Date"
            value={petsHistoryDate}
            onChange={setPetsHistoryDate}
          />
          <Button
            color="violet"
            onClick={handleAddPetsHistory}
            mb={20}
            disabled={petsHistory === "" || petsHistoryDate === null}
          >
            Add History
          </Button>
          <Textarea
            placeholder="Pets Medication"
            value={petsMedication}
            onChange={(event) => setPetsMedication(event.currentTarget.value)}
          />
          <DatePickerInput
            placeholder="Pets Medication Date"
            value={petsMedicationDate}
            onChange={setPetMedicationDate}
          />
          <Button
            color="violet"
            disabled={petsMedication === "" || petsMedicationDate === null}
            onClick={handleMedication}
          >
            Add Medication
          </Button>
        </Stack>
      </Modal>
      <Tooltip label="View ">
        <ActionIcon color="gray" onClick={open}>
          <IconEye />
        </ActionIcon>
      </Tooltip>
    </>
  );
};

export default ViewClientRecordModal;
