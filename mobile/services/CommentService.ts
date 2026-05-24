import { queryClient } from "@/app/_layout";
import { useApi } from "@/hooks/useAPi";
import { useMutation } from "@tanstack/react-query";
import QueryKeys from "./QueryKeys";
import { Alert } from "react-native";

export const useComments = () => {
  const api = useApi();
};

export const createCommentMutation = () => {
  const api = useApi();
  return useMutation({
    mutationFn: async ({
      postId,
      content,
    }: {
      postId: string;
      content: string;
    }) => {
      const response = await api.createComment(postId, content);

      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.PostKey.posts] });
    },

    onError: () => {
      Alert.alert("Error", "Failed to post comment");
    },
  });
};
