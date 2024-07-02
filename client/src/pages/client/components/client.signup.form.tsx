import { useAppDispatch } from "@/services/states/redux/hooks";
import { clientUserRedux } from "@/services/states/redux/slices/clientSlice";
import {
  Stack,
  Center,
  Title,
  TextInput,
  PasswordInput,
  Button,
} from "@mantine/core";
import axios from "axios";
import { FormEvent, useState } from "react";
type SignUpForm = {
  onClose: () => void;
};
const ClientSignUpForm = ({ onClose }: SignUpForm) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    try {
      setLoading(true);
      e.preventDefault();

      const result = await axios.post(
        "http://localhost:5000/api/user/register",
        {
          name: name,
          email: email,
          password: password,
        }
      );
      if (result.data.success) {
        dispatch(
          clientUserRedux({
            token: result.data.token,
            name: name,
            email: email,
          })
        );
        onClose();
      } else {
        setError(result.data.message);
      }
    } catch (error) {
      console.log("🚀 ~ handleSignIn ~ error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Stack my={10}>
        <Center>
          <Title order={2}>Sign Up</Title>
        </Center>
        <form onSubmit={handleSignUp}>
          <Stack>
            <TextInput
              required
              label="Name"
              placeholder="Input name"
              value={name}
              onChange={(event) => setName(event.currentTarget.value)}
            />

            <TextInput
              required
              error={error}
              label="Email"
              placeholder="@example.com"
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
            />
            <PasswordInput
              required
              error={error}
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
              label="Password"
              placeholder="*********"
            />

            <Button radius={50} type="submit" loading={loading}>
              Sign up
            </Button>
          </Stack>
        </form>
      </Stack>
    </>
  );
};

export default ClientSignUpForm;
