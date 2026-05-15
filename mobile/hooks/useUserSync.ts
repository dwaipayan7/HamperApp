import { ApiUtility, useApiClient } from "@/utils/api";
import { useAuth } from "@clerk/expo";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

export const useUserSync = () => {
  const { isSignedIn } = useAuth();
  const apiClient = useApiClient();

  console.log("The Api Client is: ", apiClient);

  const apiUtility = new ApiUtility(apiClient);

  console.log("The api utility is: ", apiUtility);

  const syncUserMutation = useMutation({
    mutationFn: () => apiUtility.syncUser(),
    onSuccess: (response: any) =>
      console.log("User synced successfully: ", response.data.user),
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
    if (isSignedIn && !syncUserMutation.data) {
      syncUserMutation.mutate();
    }
  }, [isSignedIn]);

  return null;
};
