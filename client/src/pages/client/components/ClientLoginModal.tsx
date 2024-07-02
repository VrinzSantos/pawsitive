import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Tabs, rem, Text } from "@mantine/core";
import { IconUser, IconMail } from "@tabler/icons-react";
import ClientLoginForm from "./client.login.form";
import ClientSignUpForm from "./client.signup.form";
const ClientLoginModal = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const iconStyle = { width: rem(12), height: rem(12) };
  return (
    <>
      <Modal opened={opened} onClose={close} title="Authentication" centered>
        <Tabs defaultValue="Sign In">
          <Tabs.List>
            <Tabs.Tab
              value="Sign In"
              leftSection={<IconUser style={iconStyle} />}
            >
              Sign In
            </Tabs.Tab>
            <Tabs.Tab
              value="Sign Up"
              leftSection={<IconMail style={iconStyle} />}
            >
              Sign Up
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="Sign In">
            <ClientLoginForm onClose={close} />
          </Tabs.Panel>

          <Tabs.Panel value="Sign Up">
            <ClientSignUpForm onClose={close} />
          </Tabs.Panel>
        </Tabs>
      </Modal>
      <Button radius={120} bg="white" onClick={open}>
        <Text c="black">Login</Text>
      </Button>
    </>
  );
};

export default ClientLoginModal;
