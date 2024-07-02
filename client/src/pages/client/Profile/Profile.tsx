import { Avatar, rem } from "@mantine/core";
import { Menu, ActionIcon } from "@mantine/core";
import { IconUser, IconMail, IconLogout } from "@tabler/icons-react";
import { useAppSelector, useAppDispatch } from "@/services/states/redux/hooks";
import { clearClientRedux } from "@/services/states/redux/slices/clientSlice";
const Profile = () => {
  const dispatch = useAppDispatch();
  const { name, email } = useAppSelector((state) => state.client);
  return (
    <Menu shadow="md" width={200} withArrow offset={1}>
      <Menu.Target>
        <ActionIcon variant="transparent" radius={120}>
          <Avatar
            component="a"
            target="_blank"
            src="https://avatars.githubusercontent.com/u/10353856?v=4"
            size={30}
            alt="it's me"
          />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Account Details</Menu.Label>
        <Menu.Item
          leftSection={<IconUser style={{ width: rem(14), height: rem(14) }} />}
        >
          {name}
        </Menu.Item>
        <Menu.Item
          leftSection={<IconMail style={{ width: rem(14), height: rem(14) }} />}
        >
          {email}
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Settings</Menu.Label>
        <Menu.Item
          onClick={() => {
            dispatch(clearClientRedux());
          }}
          leftSection={
            <IconLogout style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default Profile;
