import { queryClient } from "@/app/_layout";
import { useApi } from "@/hooks/useAPi";
import { ApiUtility } from "@/utils/api";
import { useMutation } from "@tanstack/react-query";

const apiUtility = ApiUtility.getInstance();

export const useLikePost = () => {
  const api = useApi();

  return useMutation({
    mutationFn: (postId: string) => api.likePost(postId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });
};

export const useDeletePost = () => {
  const api = useApi();

  return useMutation({
    mutationFn: (postId: string) => api.deletePost(postId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });

      queryClient.invalidateQueries({
        queryKey: ["userPosts"],
      });
    },
  });
};

export const useRepostPost = () => {
  return useMutation({
    mutationFn: ({ postId, content }: { postId: string; content: string }) =>
      apiUtility.post(`/posts/${postId}/repost`, {
        content,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });

      queryClient.invalidateQueries({
        queryKey: ["userPosts"],
      });
    },
  });
};
