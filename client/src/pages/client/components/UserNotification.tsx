/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Menu,
  Text,
  ActionIcon,
  Divider,
  Image,
  Title,
  Stack,
  Flex,
  Indicator,
  ScrollArea,
  Center,
} from "@mantine/core";
import { IconBell } from "@tabler/icons-react";
import {
  useFetchUserNotifications,
  UserUpdateNotification,
} from "@/hooks/notification_hooks";
import { useAppSelector } from "@/services/states/redux/hooks";
import { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const UserNotification = () => {
  const { id } = useAppSelector((state) => state.client);
  const { data } = useFetchUserNotifications(id);

  const updateNotificationSeen = UserUpdateNotification();
  const [prevData, setPrevData] = useState<any[] | null>(null);

  // Sort notifications by date in descending order
  const sortedData = data
    ? [...data].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    : [];

  useEffect(() => {
    // Check if there is new notification data
    if (prevData && data && data.length > prevData.length) {
      const latestNotification = sortedData[0];
      notifications.show({
        title: latestNotification.title,
        message: latestNotification.description,
        autoClose: false,
        color: "purple",
      });
    }
    // Update previous data
    setPrevData(data!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // Count the number of unseen notifications
  const count = data
    ? data.filter((notification: any) => !notification.seen).length
    : 0;

  const showIndicator = count === 0;

  dayjs.extend(relativeTime);
  const scrollAreaHeight =
    sortedData.length === 1 ? 100 : sortedData.length > 0 ? 500 : 30;
  return (
    <>
      <Menu shadow="md" width={350} withArrow offset={1}>
        <Menu.Target>
          <Indicator
            disabled={showIndicator}
            label={<Text size="xs">{count}</Text>}
            inline
            c="blue"
            size={20}
            radius={10}
          >
            <ActionIcon variant="transparent">
              <IconBell color="white" />
            </ActionIcon>
          </Indicator>
        </Menu.Target>
        <Menu.Dropdown>
          <ScrollArea h={scrollAreaHeight}>
            {sortedData.length > 0 ? (
              <>
                {sortedData.map((notification) => (
                  <Menu.Item
                    key={notification._id}
                    onClick={async () => {
                      await updateNotificationSeen(notification._id);
                    }}
                  >
                    <Indicator processing disabled={notification.seen}>
                      <Flex align="center" gap={"xl"}>
                        <Image
                          radius={10}
                          src={notification.image}
                          h={50}
                          w={50}
                        />
                        <Stack>
                          <Title order={6}>{notification.title}</Title>
                          <Text size="xs">{notification.description}</Text>
                          <Text size="xs">
                            {dayjs(notification.date).fromNow()}
                          </Text>
                        </Stack>
                      </Flex>
                    </Indicator>

                    <Divider my={10} />
                  </Menu.Item>
                ))}
              </>
            ) : (
              <Center>
                <Title order={4}>No Notifications</Title>
              </Center>
            )}
          </ScrollArea>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

export default UserNotification;
