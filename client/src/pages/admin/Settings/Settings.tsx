import { Tabs, rem } from "@mantine/core";
import { IconUserCheck, IconUserShield } from "@tabler/icons-react";
import MainLayout from "@/layout";
import AddUserPage from "./AddUserPage";
import UpdateAdminPage from "./UpdateAdminPage";
const Settings = () => {
  const iconStyle = { width: rem(25), height: rem(25) };
  return (
    <MainLayout>
      <Tabs defaultValue="admin">
        <Tabs.List grow>
          <Tabs.Tab
            value="admin"
            leftSection={<IconUserCheck style={iconStyle} />}
          >
            Add User Admin
          </Tabs.Tab>
          <Tabs.Tab
            value="update"
            leftSection={<IconUserShield style={iconStyle} />}
          >
            Update Profile
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="admin">
          <AddUserPage />
        </Tabs.Panel>

        <Tabs.Panel value="update">
          <UpdateAdminPage />
        </Tabs.Panel>
      </Tabs>
    </MainLayout>
  );
};

export default Settings;
