import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import "mantine-react-table/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import { MantineProvider } from "@mantine/core";
import { AppProviderInterface } from "@/interfaces";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
const MantineProviders = ({ children }: AppProviderInterface) => {
  return (
    <MantineProvider>
      <ModalsProvider>{children}</ModalsProvider>
      <Notifications />
    </MantineProvider>
  );
};

export default MantineProviders;
