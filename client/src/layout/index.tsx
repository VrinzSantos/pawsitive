import { AppShell, Burger, Group, Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Notification from "@/components/Notification/Notification";
import { MainAppLogo } from "@/themes/images";
import { LayoutInterface } from "@/interfaces";
import { COLORS } from "@/themes/colors";
import Sidebar from "@/components/Sidebar/Sidebar";

const MainLayout = ({ children }: LayoutInterface) => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 80 }}
      // footer={{ height: 60 }}
      navbar={{ width: 80, breakpoint: "sm", collapsed: { mobile: !opened } }}
      aside={{
        width: 300,
        breakpoint: "md",
        collapsed: { desktop: false, mobile: true },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="xl" bg={COLORS.primary} justify="space-between">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <img src={MainAppLogo} style={{ width: 120 }} alt="App Logo" />
          <Notification />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar>
        <Sidebar />
      </AppShell.Navbar>
      <AppShell.Main bg={"#E8F4FE"}>
        <Box w={{ base: 200, sm: 400, md: 900, lg: 1400 }} p={5}>
          {children}
        </Box>
      </AppShell.Main>
      {/* <AppShell.Footer p="md" bg={COLORS.primary} color="white">
        <FooterDetails />
      </AppShell.Footer> */}
    </AppShell>
  );
};

export default MainLayout;
