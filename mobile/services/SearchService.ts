import { ApiUtility } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import QueryKeys from "./QueryKeys";

export interface SearchUser {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
}

const apiUtility = ApiUtility.getInstance();

// export const getUserProfileByUsername = (username: string) => {
//   return useQuery({
//     queryKey: [QueryKeys.UserProfile.username, username],
//     queryFn: async () => {
//       const response = await apiUtility.get(`/users/profile/${username}`);
//       return response?.user;
//     },
//   });
// };

export const userSearchUsers = (query: string) => {
  return useQuery<SearchUser[]>({
    queryKey: [QueryKeys.Search.searchUsers, query.trim()],

    queryFn: async () => {
      const response = await apiUtility.get(
        `/search/users?q=${encodeURIComponent(query.trim())}`,
      );

      console.log("The Response is: ", response);

      return response?.data ?? [];
    },

    enabled: query.trim().length > 0,

    staleTime: 30 * 1000,
  });
};
