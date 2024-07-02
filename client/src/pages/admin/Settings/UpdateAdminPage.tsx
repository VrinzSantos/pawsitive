import { AddUserProps } from "@/interfaces/admin.types";
import { updateAdminData } from "@/services/api/admin.api";
import { TextInput, PasswordInput, Title, Stack, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { AppLoading } from "@/components/Loaders/AppLoading";
import { useAppSelector } from "@/services/states/redux/hooks";
import { useAppDispatch } from "@/services/states/redux/hooks";
import { setUserRedux } from "@/services/states/redux/slices/authSlice";
const UpdateAdminPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useAppSelector((state) => state.auth);
  // console.log("🚀 ~ UpdateAdminPage ~ user:", user);

  const dispatch = useAppDispatch();
  const ininitialValue = {
    _id: user.data?._id,
    username: user.data?.username,
    password: user.data?.password,
    confirmPassword: user.data?.password,
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
      await updateAdminData(form.values);
      alert("User Updated Successfully");
      dispatch(setUserRedux(form.values));

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("🚀 ~ handleAddUser ~ error:", error);
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
        <Title order={2}>Update Profile</Title>
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

export default UpdateAdminPage;
