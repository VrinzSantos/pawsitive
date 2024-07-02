import { Card, Group, Stack, Title } from "@mantine/core";
import { ReactNode } from "react";

type DashboardProps = {
  title: string;
  bgColor: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  total: any;
  icon: ReactNode;
};
const DashboardCard = ({
  bgColor = "green",
  total,
  icon,
  title,
}: DashboardProps) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder bg={bgColor}>
      <Stack>
        <Title order={4} c="white">
          {title}
        </Title>
        <Group>
          {icon}
          <Title c="white " order={2}>
            {total}
          </Title>
        </Group>
      </Stack>
    </Card>
  );
};

export default DashboardCard;
