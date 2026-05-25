import { useMutation, useQuery } from "@tanstack/react-query";
import QueryKeys from "./QueryKeys";
import api from "@/utils/api";
import ApiUtility from "../utils/api";
import { queryClient } from "@/app/_layout";

export const useNotification = () => {
  return useQuery({
    queryKey: [QueryKeys.NotificationKey.notifications],
    queryFn: async () => await ApiUtility.get("/notifications"),
  });
};

export const deleteNotification = () => {
  return useMutation({
    mutationFn: (notificationId: string) =>
      ApiUtility.delete(`/notifications/${notificationId}`),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.NotificationKey.notifications],
      }),
  });
};
