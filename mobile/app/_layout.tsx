import { ClerkProvider, useAuth } from '@clerk/expo'
import { tokenCache } from '@clerk/expo/token-cache'
import { Stack } from "expo-router";
import "../global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";

const queryClient = new QueryClient();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}



// export default function RootLayout() {
//   return (
//     <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
//       <QueryClientProvider client={queryClient}>
//         <StatusBar style="dark" />
//       </QueryClientProvider>
//     </ClerkProvider>
//   );
// }

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }}>
        </Stack>
        <StatusBar style="dark" />
      </QueryClientProvider>
    </ClerkProvider>
  );
}