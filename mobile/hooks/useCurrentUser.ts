import { useQuery } from "@tanstack/react-query";
import { useApi } from "./useAPi";

export const useCurrentUser = () => {
  const api = useApi();

  const {
    data: currentUser,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["authUser"],
    queryFn: () => api.getCurrentUser(),
    select: (response) => response.data.user,
  });

  return { currentUser, isLoading, error, refetch };
};
