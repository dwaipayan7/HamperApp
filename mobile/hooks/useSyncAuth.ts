import { setAuthenticated } from "@/redux/slices/AuthSlice";
import { useAuth } from "@clerk/expo";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useSyncAuth = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoaded) {
      dispatch(setAuthenticated(!!isSignedIn));
    }
  }, [isSignedIn, isLoaded]);
};
