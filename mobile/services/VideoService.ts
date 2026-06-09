import { ApiUtility } from "@/utils/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import QueryKeys from "./QueryKeys";
import { queryClient } from "@/app/_layout";

const apiUtility = ApiUtility.getInstance();

export const useGetAllVideos = () => {
  return useQuery({
    queryKey: [QueryKeys.Videos.allVideos],
    queryFn: async () => {
      await apiUtility.get("/videos");
    },
  });
};

export const useGetVideoById = (username: string) => {
  return useQuery({
    queryKey: [QueryKeys.Videos.videoById],
    queryFn: async () => await apiUtility.get(`/videos/${username}`),
  });
};

export const useLikeVideo = () => {
  return useMutation({
    mutationFn: (videoId: string) => apiUtility.put(`/videos/${videoId}/like`),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.Videos.allVideos] });
    },
  });
};

export const useCreateVideo = () => {
  return useMutation({
    mutationFn: async (formData: FormData) =>
      apiUtility.postForm("/videos", formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.Videos.allVideos],
      });
    },
  });
};
