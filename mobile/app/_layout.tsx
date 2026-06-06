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
import Drawer from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CustomDrawerContent from '@/components/CustomDrawerComponent';
import { useSyncAuth } from '@/hooks/useSyncAuth';
import { KeyboardProvider } from "react-native-keyboard-controller";
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import SnackBar from '@/components/Snackbar';
import { useSocket } from '@/hooks/useSocket';

export const queryClient = new QueryClient();
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

export default function RootLayout() {

  // useSyncAuth();

  // "reactCompiler": true

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardProvider>
        <BottomSheetModalProvider>
          <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
            <StoreProvider store={store}>
              <PaperProvider>
                <QueryClientProvider client={queryClient}>
                  <PersistGate

                    loading={<View style={{ flex: 1, backgroundColor: '#fff' }} />}
                    persistor={persistor}
                  >
                    {/* <Stack screenOptions={{ headerShown: false }} /> */}

                    {/* <CustomDrawerContent /> */}
                    {/* <Drawer /> */}
                    {/* <Stack /> */}

                    <RootContent />
                  </PersistGate>
                  <StatusBar style="dark" />
                </QueryClientProvider>
              </PaperProvider>
            </StoreProvider>
          </ClerkProvider>
        </BottomSheetModalProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}

function RootContent() {
  useSyncAuth();
  useSocket()
  return (
    <>
      <StatusBar style='light' />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="(drawer)"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="profile-details"
          options={{
            headerShown: false,
            presentation: "card",
            animation: "slide_from_right",
          }}
        />

        <Stack.Screen
          name="chat-details"
          options={{
            headerShown: false,
            presentation: "card",
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="notifications"
          options={{
            headerShown: false,
            presentation: "card",
            animation: "slide_from_right",
          }}
        />

      </Stack>
      <SnackBar />
    </>
  );
}