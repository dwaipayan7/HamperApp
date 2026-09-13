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

interface SearchUsersResponse {
  success: boolean;
  data: SearchUser[];
  message?: string;
}

const apiUtility = ApiUtility.getInstance();

export const useSearchUsers = (query: string) => {
  const searchQuery = query.trim();

  return useQuery<SearchUser[]>({
    queryKey: [QueryKeys.Search.searchUsers, searchQuery],

    queryFn: async () => {
      const response = await apiUtility.get<SearchUsersResponse>(
        `/search/users?q=${encodeURIComponent(searchQuery)}`,
      );

      console.log("SEARCH RESPONSE:", response);
      console.log("SEARCH DATA:", response?.data);

      return response?.data ?? [];
    },

    enabled: searchQuery.length > 0,

    staleTime: 30 * 1000,
  });
};
