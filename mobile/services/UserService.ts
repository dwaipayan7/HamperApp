import { ApiUtility } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import QueryKeys from "./QueryKeys";

const apiUtility = ApiUtility.getInstance();

export const getUserProfileByUsername = (username: string) => {
  return useQuery({
    queryKey: [QueryKeys.UserProfile.username, username],
    queryFn: async () => {
      const response = await apiUtility.get(`/users/profile/${username}`);
      return response?.user;
    },
  });
};

export const getFollowersByUsername = (username: string) => {
  return useQuery({
    queryKey: [QueryKeys.UserProfile.followers, username],
    queryFn: async () => {
      const response = await apiUtility.get(`users/followers/${username}`);

      return response?.followers;
    },
  });
};
export const getFollowingByUsername = (username: string) => {
  return useQuery({
    queryKey: [QueryKeys.UserProfile.following, username],
    queryFn: async () => {
      const response = await apiUtility.get(`users/following/${username}`);

      return response?.following;
    },
  });
};
