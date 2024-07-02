/* eslint-disable @typescript-eslint/no-explicit-any */
import AddClientRecordModal from "@/components/Modal/Client Record/AddClientRecordModal";
import PetOwnerTable from "@/components/Table/PetOwnerTable";
import MainLayout from "@/layout";
import { useFetchClientRecord } from "@/hooks/client_record_hooks";
import { Title, Stack, Group } from "@mantine/core";
import dayjs from "dayjs";
import { AppLoading } from "@/components/Loaders/AppLoading";
import { useAppSelector } from "@/services/states/redux/hooks";
const PetOwnerRecords = () => {
  const { data, isLoading } = useFetchClientRecord();
  const { isAppLoading } = useAppSelector((state) => state.app);

  const PetOwnerColumn = [
    {
      accessorKey: "fullName",
      header: "Full Name",
    },
    {
      accessorKey: "address",
      header: "Adress",
    },

    {
      accessorKey: "contact",
      header: "Contact",
    },
    {
      accessorKey: "nameOfPet",
      header: "Name of Pet",
    },
    {
      accessorKey: "species",
      header: "Species",
    },
    {
      accessorKey: "petsBreed",
      header: "Pet's Breed",
    },
    {
      accessorKey: "petsSex",
      header: "Pet's Sex",
    },
    {
      accessorFn: (dataRow: any) =>
        dayjs(dataRow.petsBirthdate).format("MM/DD/YY"),
      header: "Pet's Birthday",
    },
  ];
  return (
    <MainLayout>
      <AppLoading isLoading={isAppLoading} />

      <Stack>
        <Group justify="space-between">
          <Title order={2}>Pet Owner Records</Title>
          <AddClientRecordModal />
        </Group>

        <PetOwnerTable
          isLoading={isLoading}
          columns={PetOwnerColumn}
          data={data!}
        />
      </Stack>
    </MainLayout>
  );
};

export default PetOwnerRecords;
