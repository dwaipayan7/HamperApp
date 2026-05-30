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
