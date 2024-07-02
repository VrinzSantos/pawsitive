import {
  AppShell,
  Group,
  Burger,
  UnstyledButton,
  Tooltip,
  Box,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MainAppLogo } from "@/themes/images";
import { LayoutInterface } from "@/interfaces";
import { COLORS } from "@/themes/colors";
// import Navbar from "@/components/Navbar/Navbar";
// import { MantineLogo } from "@mantinex/mantine-logo";
import {
  IconHome,
  IconInfoCircle,
  IconUsers,
  IconClipboardHeart,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import classes from "../components/Navbar/MobileNavbar.module.css";
import Profile from "@/pages/client/Profile/Profile";
import { useAppSelector } from "@/services/states/redux/hooks";
import ClientLoginModal from "@/pages/client/components/ClientLoginModal";
import UserNotification from "@/pages/client/components/UserNotification";
const HeaderLayout = ({ children }: LayoutInterface) => {
  const navigate = useNavigate();
  const { token } = useAppSelector((state) => state.client);

  const [opened, { toggle }] = useDisclosure();

  const handleHomePages = () => {
    navigate("/");
  };

  const handleAboutPages = () => {
    navigate("/About");
  };

  const handleServicesPages = () => {
    navigate("/Services");
  };

  const handleDoctorsPages = () => {
    navigate("/Doctors");
  };

  return (
    <AppShell
      header={{ height: 80 }}
      navbar={{
        width: 300,
        breakpoint: "md",
        collapsed: { desktop: true, mobile: !opened },
      }}
    >
      <AppShell.Header>
        <Group h="100%" px="xl" bg={COLORS.secondary} justify="space-between">
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="md"
            size="md"
            style={{ color: "white" }}
          />
          <Group justify="space-between" style={{ flex: 10 }}>
            <img
              src={MainAppLogo}
              style={{
                width: 120,
                borderRadius: 5,
                height: 70,
              }}
              alt="App Logo"
            />

            <Group ml="sm" gap={20} visibleFrom="xl" style={{ color: "white" }}>
              <Tooltip label="Home" position="bottom">
                <IconHome
                  size={45}
                  onClick={handleHomePages}
                  className={classes.control}
                />
              </Tooltip>

              <Tooltip label="About" position="bottom">
                <IconInfoCircle
                  onClick={handleAboutPages}
                  size={45}
                  className={classes.control}
                />
              </Tooltip>

              <Tooltip label="Services">
                <IconClipboardHeart
                  size={45}
                  onClick={handleServicesPages}
                  className={classes.control}
                />
              </Tooltip>

              <Tooltip label="Doctors">
                <IconUsers
                  size={45}
                  onClick={handleDoctorsPages}
                  className={classes.control}
                />
              </Tooltip>
            </Group>

            {token ? <UserNotification /> : <ClientLoginModal />}
          </Group>

          {token ? <Profile /> : <Box />}
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        <UnstyledButton onClick={handleHomePages} className={classes.control}>
          Home
        </UnstyledButton>
        <UnstyledButton onClick={handleAboutPages} className={classes.control}>
          About
        </UnstyledButton>
        <UnstyledButton
          onClick={handleServicesPages}
          className={classes.control}
        >
          Services
        </UnstyledButton>
        <UnstyledButton
          onClick={handleDoctorsPages}
          className={classes.control}
        >
          Doctors
        </UnstyledButton>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default HeaderLayout;
