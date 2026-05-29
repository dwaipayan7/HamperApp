import { queryClient } from "@/app/_layout";
import { ApiUtility } from "@/utils/api";
import { useMutation } from "@tanstack/react-query";
import QueryKeys from "./QueryKeys";

const apiUtility = ApiUtility.getInstance();

export const useUpdateMutation = () => {
  return useMutation({
    mutationFn: (profileData: any) => apiUtility.updateProfile(profileData),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.Auth.authUser],
      });

      //   queryClient.invalidateQueries({
      //     queryKey: [QueryKeys.PostKey.posts],
      //   });
    },
  });
};
