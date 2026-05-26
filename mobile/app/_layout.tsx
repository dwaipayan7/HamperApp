import { ClerkProvider } from '@clerk/expo'
import { tokenCache } from '@clerk/expo/token-cache'
import { Stack } from "expo-router";
import "../global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { persistor, store } from '@/redux/store/store';
import { PersistGate } from 'redux-persist/integration/react'
import { View } from 'react-native';

export const queryClient = new QueryClient();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <StoreProvider store={store}>
        <PaperProvider>
          <QueryClientProvider client={queryClient}>
            <PersistGate

              loading={<View style={{ flex: 1, backgroundColor: '#fff' }} />}
              persistor={persistor}
            >
              <StatusBar style='light' />
              <Stack screenOptions={{ headerShown: false }} />
              {/* <Stack /> */}
            </PersistGate>
            <StatusBar style="dark" />
          </QueryClientProvider>
        </PaperProvider>
      </StoreProvider>
    </ClerkProvider>
  );
}