import {
  Center,
  Stack,
  TextInput,
  Title,
  PasswordInput,
  Button,
} from "@mantine/core";
import axios from "axios";
import { FormEvent, useState } from "react";
import { useAppDispatch } from "@/services/states/redux/hooks";
import { clientUserRedux } from "@/services/states/redux/slices/clientSlice";
type loginForm = {
  onClose: () => void;
};
const ClientLoginForm = ({ onClose }: loginForm) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    try {
      setLoading(true);
      e.preventDefault();

      const result = await axios.post("http://localhost:5000/api/user/login", {
        email: email,
        password: password,
      });
      if (result.data.success) {
        dispatch(
          clientUserRedux({
            id: result.data.user._id,
            name: result.data.user.name,
            email: result.data.user.email,
            token: result.data.token,
          })
        );

        onClose();
      } else {
        setError(result.data.message);
        // onClose();
      }
      // if (result.data.status) {
      //   console.log("Login success");
      //   localStorage.setItem("token", result.data.token);
      // } else {
      //   setError(result.data.message);
      // }
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
          <Title order={2}>Sign In</Title>
        </Center>
        <form onSubmit={handleSignIn}>
          <Stack>
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

            <Button radius={50} loading={loading} type="submit">
              Login
            </Button>
          </Stack>
        </form>
      </Stack>
    </>
  );
};

export default ClientLoginForm;
