import { queryClient } from "@/app/_layout";
import { useApi } from "@/hooks/useAPi";
import { useMutation, useQuery } from "@tanstack/react-query";
import QueryKeys from "./QueryKeys";
import { Alert } from "react-native";
import { ApiUtility } from "@/utils/api";

const apiUtility = ApiUtility.getInstance();

export const useGetCommentById = (postId: string) => {
  return useQuery({
    queryFn: async () => apiUtility.get(`comments/post/${postId}`),
    queryKey: [QueryKeys.CommentKey.comments],
  });
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

export const deleteCommentMutation = () => {
  return useMutation({
    mutationFn: async (commentId: string) =>
      apiUtility.delete(`/comments/${commentId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.CommentKey.comments],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.PostKey.posts],
      });
    },
  });
};

export const likeCommentMutation = () => {
  return useMutation({
    mutationFn: async (commentId: string) =>
      apiUtility.post(`/comments/${commentId}/like`, {}),
    onSuccess: () => {
      // Invalidate both posts and comments queries to ensure UI updates
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.CommentKey.comments],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.PostKey.posts],
      });
    },
    onError: (error: any) => {
      console.error("Error liking comment:", error);
      Alert.alert("Error", "Failed to like comment");
    },
  });
};
