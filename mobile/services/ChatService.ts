import api, { ApiUtility } from "@/utils/api";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import QueryKeys from "./QueryKeys";
import { queryClient } from "@/app/_layout";

const apiUtility = ApiUtility.getInstance();

export const useSendMessage = () => {
  return useMutation({
    mutationFn: async ({
      receiverId,
      text,
    }: {
      receiverId: string;
      text: string;
    }) =>
      apiUtility.post("/messages/send-message", {
        receiverId,
        text,
      }),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.Messages.chatList],
      });

      queryClient.invalidateQueries({
        queryKey: [QueryKeys.Messages.messages, variables.receiverId],
      });
    },
  });
};

export const useGetMessages = (receiverId: string) => {
  return useQuery({
    queryKey: [QueryKeys.Messages.chatList],
    queryFn: async () => {
      const res = apiUtility.get(`/messages/chats/${receiverId}`);
      return res?.messages;
    },
  });
};

export const useGetChatList = () => {
  return useQuery({
    queryKey: [QueryKeys.Messages.chatList],
    queryFn: async () => {
      const res = await apiUtility.get(`/messages/conversations`);
      return res?.chatList;
    },
  });
};

export const useSearchUsers = (searchText: string) => {
  return useQuery({
    queryKey: [QueryKeys.Messages.searchUsers],
    queryFn: async () => {
      const res = await apiUtility.get(`/messages/search?name=${searchText}`);

      return res?.users;
    },
    enabled: searchText.length > 0,
  });
};
