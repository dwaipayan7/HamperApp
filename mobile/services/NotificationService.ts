import { useMutation, useQuery } from "@tanstack/react-query";
import QueryKeys from "./QueryKeys";
import ApiUtility from "../utils/api";
import { queryClient } from "@/app/_layout";

export interface NotificationsResponse {
  notifications: Notification[];
}

export interface NotificationCountResponse {
  count: number;
}

// ─── Queries ──────────────────────────────────────────────────────────────────

/** Fetch the full notifications list */
export const useNotification = () => {
  return useQuery({
    queryKey: [QueryKeys.NotificationKey.notifications],
    queryFn: async () =>
      await ApiUtility.get<NotificationsResponse>("/notifications"),
  });
};

/** Fetch the unread notification count — used for the bell badge */
export const useNotificationCount = () => {
  return useQuery({
    queryKey: [QueryKeys.NotificationKey.notificationCount],
    queryFn: async () =>
      await ApiUtility.get<NotificationCountResponse>("/notifications/count"),
    // Refresh every 30 seconds as a fallback; FCM invalidation handles real-time
    refetchInterval: 30_000,
  });
};

// ─── Mutations ────────────────────────────────────────────────────────────────

/** Mark a single notification as read */
export const useMarkAsRead = () => {
  return useMutation({
    mutationFn: (notificationId: string) =>
      ApiUtility.patch(`/notifications/${notificationId}/read`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.NotificationKey.notifications],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.NotificationKey.notificationCount],
      });
    },
  });
};

/** Mark every notification as read */
export const useMarkAllAsRead = () => {
  return useMutation({
    mutationFn: () => ApiUtility.patch("/notifications/read-all"),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.NotificationKey.notifications],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.NotificationKey.notificationCount],
      });
    },
  });
};

/** Delete a single notification */
export const deleteNotification = () => {
  return useMutation({
    mutationFn: (notificationId: string) =>
      ApiUtility.delete(`/notifications/${notificationId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.NotificationKey.notifications],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.NotificationKey.notificationCount],
      });
    },
  });
};
