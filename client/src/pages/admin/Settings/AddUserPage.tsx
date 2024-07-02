import { AddUserProps } from "@/interfaces/admin.types";
import { addAdminUser } from "@/services/api/admin.api";
import { TextInput, PasswordInput, Title, Stack, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { AppLoading } from "@/components/Loaders/AppLoading";
const AddUserPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const ininitialValue = {
    username: "",
    password: "",
    confirmPassword: "",
  };
  const form = useForm<AddUserProps>({
    initialValues: ininitialValue,
    validate: {
      username: (value) => (value === "" ? "Username Required" : null),
      password: (value) => (value === "" ? "Password Required" : null),
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
    },
  });

  const handleAddUser = async () => {
    if (form.validate().hasErrors) {
      return;
    }
    try {
      setIsLoading(true);
      await addAdminUser(form.values);
      alert("User added successfully");
      form.setValues(ininitialValue);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert(error.response?.data.error);
      console.error("Error:", error.response?.data.error); // Invalid credentials or server-side error

      setError(error.response?.data.error || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <AppLoading isLoading={isLoading} />
      <Stack mt={50}>
        <Title order={2}>Add User</Title>
        <TextInput
          error={error}
          required
          label="Username"
          placeholder="Input Username"
          {...form.getInputProps("username")}
        />
        <PasswordInput
          required
          label="Password"
          placeholder="Input Password"
          {...form.getInputProps("password")}
        />
        <PasswordInput
          required
          label="Confirm Password"
          placeholder="Confirm Password"
          {...form.getInputProps("confirmPassword")}
        />
        <Button onClick={handleAddUser}>SAVE</Button>
      </Stack>
    </>
  );
};

export default AddUserPage;
