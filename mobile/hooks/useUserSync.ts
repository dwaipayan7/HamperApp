import { useAuth } from "@clerk/expo";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useApi } from "./useAPi";

export const useUserSync = () => {
  const { isSignedIn, isLoaded } = useAuth();

  const api = useApi();

  const syncUserMutation = useMutation({
    mutationFn: () => api.syncUser(),
    // onSuccess: (response: any) =>
    //   console.log("User synced successfully: \n", response.data?.user),
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
