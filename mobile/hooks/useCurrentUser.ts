import { ApiUtility, useApiClient } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

export const useCurrentUser = () => {
  const api = useApiClient();

  const apiUtility = new ApiUtility(api);

  const {
    data: currentUser,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["authUser"],
    queryFn: () => apiUtility.getCurrentUser(),
    select: (response) => response.data.user,
  });

  return { currentUser, isLoading, error, refetch };
};
