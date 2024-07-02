import {
  notificationData,
  markNotificationAsSeen,
  userNotification,
  userMarkNotificationSeen,
} from "@/services/api/notification.api";
import { useQuery, useMutation } from "react-query";
import { ReactQueryClient } from "@/services/providers/ReactQueryProvider";
export const useFetchNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: notificationData,
  });
};

export const UpdateNotification = () => {
  const { mutateAsync: updateNotificationSeen } = useMutation({
    mutationFn: markNotificationAsSeen,
    onSuccess: () => {
      ReactQueryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  return updateNotificationSeen;
};

export const useFetchUserNotifications = (userId: string) => {
  const { data } = useQuery(
    ["usernotification", userId], // Query key includes fetch limit
    () => userNotification(userId),
    {
      staleTime: 10000,
    }
  );

  return { data };
  // return useQuery({
  //   queryKey: ["userNotifications"],
  //   queryFn: userNotification(userId),
  // });
};

export const UserUpdateNotification = () => {
  const { mutateAsync: updateNotificationSeen } = useMutation({
    mutationFn: userMarkNotificationSeen,
    onSuccess: () => {
      ReactQueryClient.invalidateQueries({ queryKey: ["usernotification"] });
    },
  });

  return updateNotificationSeen;
};
