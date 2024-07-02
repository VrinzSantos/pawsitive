import {
  Button,
  Group,
  Modal,
  Stack,
  TextInput,
  Textarea,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { DatePickerInput } from "@mantine/dates";
import { useAppDispatch } from "@/services/states/redux/hooks";
import { useQueryClient, useMutation } from "react-query";
import axios from "axios";
import { appInfoRedux } from "@/services/states/redux/slices/appSlice";
import React from "react";
type ClientRecordModal = {
  fullName: string;
  address: string;
  contact: string;
  nameOfPet: string;
  species: string;
  petsBreed: string;
  petsSex: string;
  petsBirthdate: Date | null;
};

const AddClientRecordModal = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const dispatch = useAppDispatch();

  const clientQuery = useQueryClient();
  const form = useForm<ClientRecordModal>({
    initialValues: {
      fullName: "",
      address: "",
      contact: "",
      nameOfPet: "",
      species: "",
      petsBreed: "",
      petsSex: "",
      petsBirthdate: null,
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

  const createClientRecord = async (values: ClientRecordModal) => {
    const response = await axios.post(
      "http://localhost:5000/api/client/create-record",
      values
    );
    return response.data;
  };

  const { mutateAsync: createRecord } = useMutation({
    mutationFn: createClientRecord,
    onSuccess: () => {
      clientQuery.invalidateQueries({ queryKey: ["clientRecord"] });
      alert("Client record Added successfully");
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
      await createRecord(form.values);
      close();
      form.setValues({
        fullName: "",
        address: "",
        contact: "",
        nameOfPet: "",
        species: "",
        petsBreed: "",
        petsSex: "",
        petsBirthdate: null,
      });
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
        title="Create Pet Owners Record"
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
              Save
            </Button>
          </Group>
        </Stack>
      </Modal>
      <Button onClick={open}>Add Pet Owners Record</Button>
    </>
  );
};

export default AddClientRecordModal;
