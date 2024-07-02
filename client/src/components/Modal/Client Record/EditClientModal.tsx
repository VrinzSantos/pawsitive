import {
  Button,
  Group,
  Modal,
  Stack,
  TextInput,
  Textarea,
  Select,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { DatePickerInput } from "@mantine/dates";
import { IconEdit } from "@tabler/icons-react";
import { useQueryClient, useMutation } from "react-query";
import axios from "axios";
import { useAppDispatch } from "@/services/states/redux/hooks";
import { appInfoRedux } from "@/services/states/redux/slices/appSlice";
type EditClientModal = {
  id: string;
  fullName: string;
  address: string;
  contact: string;
  nameOfPet: string;
  species: string;
  petsBreed: string;
  petsSex: string;
  petsBirthdate: Date | null;
};

const EditClientModal = (data: EditClientModal) => {
  const [opened, { open, close }] = useDisclosure(false);
  const clientQuery = useQueryClient();
  const dispatch = useAppDispatch();

  const form = useForm<EditClientModal>({
    initialValues: {
      id: data.id,
      fullName: data.fullName,
      address: data.address,
      contact: data.contact,
      nameOfPet: data.nameOfPet,
      species: data.species,
      petsBreed: data.petsBreed,
      petsSex: data.petsSex,
      petsBirthdate: data.petsBirthdate,
    },
    validate: {
      fullName: (value) => (value === "" ? "Please Input Full Name" : null),
      address: (value) => (value === "" ? "Please Input Address" : null),
      contact: (value) => (value === "" ? "Please Input Contact" : null),
      nameOfPet: (value) => (value === "" ? "Please Input Pet name" : null),
      species: (value) => (value === "" ? "Please Input Species" : null),
      petsBreed: (value) => (value === "" ? "Please Input Pet Breed" : null),
      petsSex: (value) => (value === "" ? "Please Input Pet Sex" : null),
      petsBirthdate: (value) =>
        value === null ? "Please Input Pet Birthdate" : null,
    },
  });
  const updateClientRecord = async (values: EditClientModal) => {
    const response = await axios.patch(
      "http://localhost:5000/api/client/update-record",
      values
    );
    return response.data;
  };

  const { mutateAsync: updateRecord } = useMutation({
    mutationFn: updateClientRecord,
    onSuccess: () => {
      clientQuery.invalidateQueries({ queryKey: ["clientRecord"] });
      alert("Client record Edit successfully");
    },
    onError: () => {
      alert("Client record Error");
    },
  });

  const handleSubmit = async () => {
    if (form.validate().hasErrors) {
      return;
    }
    try {
      dispatch(
        appInfoRedux({
          isAppLoading: true,
        })
      );
      await updateRecord(form.values);
      close();
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
        title="Edit Pet Owners Record"
        centered
        closeOnClickOutside={false}
      >
        <Stack>
          <TextInput
            label="Full Name"
            required
            placeholder="Input Full name"
            {...form.getInputProps("fullName")}
          />
          <Textarea
            label="Address"
            required
            placeholder="Input Address"
            {...form.getInputProps("address")}
          />
          <TextInput
            label="Contact "
            required
            placeholder="Input Contact"
            {...form.getInputProps("contact")}
          />
          <TextInput
            label="Name of Pet "
            required
            placeholder="Input Pet name"
            {...form.getInputProps("nameOfPet")}
          />
          <Select
            data={["Dog", "Cat", "Bird"]}
            label="Species "
            required
            placeholder="Select Pet species"
            {...form.getInputProps("species")}
          />
          <TextInput
            label="Pet's Breed "
            required
            placeholder="Input Pet's Breed"
            {...form.getInputProps("petsBreed")}
          />
          <Select
            data={["Male", "Female"]}
            label="Pet's Sex "
            required
            placeholder="Select Sex"
            {...form.getInputProps("petsSex")}
          />
          <DatePickerInput
            label="Pet's Birth Date"
            placeholder="Select Birth Date"
            {...form.getInputProps("petsBirthdate")}
          />
          <Group justify="flex-end">
            <Button color="red" onClick={close}>
              Cancel
            </Button>
            <Button color="green" onClick={handleSubmit}>
              Update
            </Button>
          </Group>
        </Stack>
      </Modal>
      <Tooltip label="Edit">
        <ActionIcon bg={"green"} onClick={open}>
          <IconEdit />
        </ActionIcon>
      </Tooltip>
    </>
  );
};

export default EditClientModal;
