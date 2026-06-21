import api, { ApiUtility } from "@/utils/api";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import QueryKeys from "./QueryKeys";
import { queryClient } from "@/app/_layout";
import {
  getConversations,
  getMessagesByReceiver,
  saveConversations,
  saveMessages,
} from "./DatabaseService";

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
    queryKey: [QueryKeys.Messages.messages, receiverId],
    queryFn: async () => {
      try {
        const res = await apiUtility.get(`/messages/chats/${receiverId}`);
        const messages = res?.messages || [];

        // save local database

        if (messages.length > 0) {
          await saveMessages(messages, receiverId);
        }

        return messages;
      } catch (error) {
        console.log("Using local database for messages");
        const cachedMessages = await getMessagesByReceiver(receiverId);
        return cachedMessages;
      }

      // const res = await apiUtility.get(`/messages/chats/${receiverId}`);
      // return res?.messages;
    },
    enabled: !!receiverId,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

// export const useGetChatList = () => {
//   return useQuery({
//     queryKey: [QueryKeys.Messages.chatList],
//     queryFn: async () => {
//       const res = await apiUtility.get(`/messages/conversations`);
//       return res?.chatList;
//     },
//   });
// };

export const useGetChatList = () => {
  return useQuery({
    queryKey: [QueryKeys.Messages.chatList],
    queryFn: async () => {
      try {
        // Fetch from API
        const res = await apiUtility.get(`/messages/conversations`);
        console.log("API Response for chat list:", res);
        const chatList = res?.chatList || [];
        console.log("Processed chat list:", chatList);

        // Save to local database
        if (chatList.length > 0) {
          try {
            await saveConversations(chatList);
          } catch (saveError) {
            console.error(
              "Error saving conversations to local database:",
              saveError,
            );
            // Continue anyway - return the API data even if local save fails
          }
        }

        return chatList;
      } catch (error) {
        // Fallback to local database
        console.log(
          "API call failed, using local database for chat list, Error:",
          error,
        );
        try {
          const cachedConversations = await getConversations();
          console.log("Cached conversations:", cachedConversations);
          return cachedConversations;
        } catch (dbError) {
          console.error("Error retrieving cached conversations:", dbError);
          return [];
        }
      }
    },
    staleTime: 3 * 60 * 1000, // 3 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
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

export const useDeleteConversation = () => {
  return useMutation({
    mutationFn: async (receiverId: string) =>
      apiUtility.delete(`/messages/conversation/${receiverId}`),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.Messages.chatList],
      });
    },
  });
};

export const useReactToMessage = () => {
  return useMutation({
    mutationFn: ({ messageId, emoji }: { messageId: string; emoji: string }) =>
      api.post(`/messages/${messageId}/reaction`, { emoji }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.Messages.chatList],
      });
    },
  });
};

export const useReplyToMessage = () => {
  return useMutation({
    mutationFn: ({
      receiverId,
      text,
      replyTo,
    }: {
      receiverId: string;
      text: string;
      replyTo: string;
    }) => api.post(`/messages/reply-message`, { receiverId, text, replyTo }),
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
