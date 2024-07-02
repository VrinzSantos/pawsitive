import {
  TextInput,
  PasswordInput,
  Paper,
  Container,
  Button,
  Title,
  Center,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "@/services/states/redux/hooks";
import { setUserRedux } from "@/services/states/redux/slices/authSlice";

import axios from "axios";
import { useState } from "react";
import { AppLoading } from "@/components/Loaders/AppLoading";

const Login = () => {
  const navigate = useNavigate();
  // awodawdawdawd
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post<{ message: string }>(
        "http://localhost:5000/api/admin/login",
        {
          username,
          password,
        }
      );

      console.log(response.data.message);
      // Login successful
      dispatch(setUserRedux(response.data));
      navigate("/admin");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error:", error.response?.data.error); // Invalid credentials or server-side error
      setError(error.response?.data.error || "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <AppLoading isLoading={loading} />
      <Container size={470} my={100}>
        <Center my={40}>
          <Title order={2}>ADMIN AUTHENTICATION</Title>
        </Center>
        <Paper withBorder shadow="xl" p={30} radius="md">
          <form onSubmit={handleSubmit}>
            <TextInput
              label="Username"
              placeholder="Enter Username"
              required
              value={username}
              error={error}
              onChange={(e) => setUsername(e.target.value)}
            />
            <PasswordInput
              label="Password"
              placeholder="Enter Password"
              required
              error={error}
              mt="md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button fullWidth mt="xl" type="submit">
              Sign in
            </Button>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default Login;
