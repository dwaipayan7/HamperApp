import { ApiUtility, useApiClient } from "@/utils/api";
import { useAuth } from "@clerk/expo";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

export const useUserSync = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const apiClient = useApiClient();

  const apiUtility = new ApiUtility(apiClient);

  const syncUserMutation = useMutation({
    mutationFn: () => apiUtility.syncUser(),
    onSuccess: (response: any) =>
      console.log("User synced successfully:", response.data?.user),
    onError: (error: any) => {
      console.log("User sync failed", error);
      console.log(
        "User sync error response",
        error?.response?.status,
        error?.response?.data,
      );
    },
  });

  useEffect(() => {
    if (isLoaded && isSignedIn && !syncUserMutation.data) {
      syncUserMutation.mutateAsync();
    }
  }, [isSignedIn, isLoaded, syncUserMutation.data]);

  return null;
};
