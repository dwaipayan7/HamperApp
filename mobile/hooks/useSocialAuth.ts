// import { useSSO } from "@clerk/expo";
// import { router } from "expo-router";
// import { useState } from "react";
// import { Alert } from "react-native";

// export const useSocialAuth = () => {
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   const { startSSOFlow } = useSSO();

//   const handleSocialAuth = async (strategy: "oauth_google" | "oauth_apple") => {
//     setIsLoading(true);
//     try {
//       const { createdSessionId, setActive } = await startSSOFlow({ strategy });
//       if (createdSessionId && setActive) {
//         await setActive({ session: createdSessionId });
//         // router.replace("/(tabs)");
//       }
//     } catch (error) {
//       console.log("Error is social auth", error);
//       const provider = strategy === "oauth_google" ? "Google" : "Apple";
//       Alert.alert(
//         `Error", "Failed to sign in with ${provider}. Please try again`,
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return {
//     isLoading,
//     handleSocialAuth,
//   };
// };

import { useSSO } from "@clerk/expo";
import * as Linking from "expo-linking";
import { router } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

export const useSocialAuth = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { startSSOFlow } = useSSO();

  const handleSocialAuth = async (strategy: "oauth_google" | "oauth_apple") => {
    setIsLoading(true);
    try {
      // This is what was missing — Clerk needs to know where to redirect back
      const redirectUrl = Linking.createURL("/");

      const { createdSessionId, setActive } = await startSSOFlow({
        strategy,
        redirectUrl, // ← ADD THIS
      });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        // Navigate immediately here — don't rely on the useEffect chain
        router.replace("/(drawer)/(tabs)");
      }
    } catch (error) {
      console.log("Error in social auth", error);
      const provider = strategy === "oauth_google" ? "Google" : "Apple";
      Alert.alert(
        "Error",
        `Failed to sign in with ${provider}. Please try again`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleSocialAuth };
};
