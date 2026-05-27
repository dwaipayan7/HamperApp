import { queryClient } from "@/app/_layout";
import { useApi } from "@/hooks/useAPi";
import { useMutation } from "@tanstack/react-query";

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
