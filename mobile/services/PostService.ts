import { queryClient } from "@/app/_layout";
import { useApi } from "@/hooks/useAPi";
import { ApiUtility } from "@/utils/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import QueryKeys from "./QueryKeys";

export interface CreatePostPayload {
  content: string;
  imageUri?: string;
}

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

export const useCreatePost = () => {
  return useMutation({
    mutationFn: async ({ content, imageUri }: CreatePostPayload) => {
      const formData = new FormData();
      if (content) {
        formData.append("content", content);
      }

      if (imageUri) {
        const uriParts = imageUri.split(".");
        const fileType = uriParts[uriParts.length - 1];

        formData.append("image", {
          uri: imageUri,
          name: fileType,
          type: fileType,
        } as any);
      }

      return apiUtility.postForm("/posts", formData);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.PostKey.posts],
      });
    },
  });
};

export const useGetPostById = (postId: string) => {
  return useQuery({
    queryFn: async () => {
      const response = await apiUtility.get<any>(`posts/${postId}`);
      return response?.post;
    },
    queryKey: [QueryKeys.PostKey.posts, postId],
    // enabled: postId!!,
  });
};
