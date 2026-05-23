import api from "@/utils/api";
import { useAuth } from "@clerk/expo";
import { useEffect } from "react";

export const useApi = () => {
  const { getToken } = useAuth();

  useEffect(() => {
    api.setTokenGetter(getToken);
  }, [getToken]);

  return api;
};
