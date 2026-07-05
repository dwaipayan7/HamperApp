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
import * as WebBrowser from "expo-web-browser";
import { useEffect } from 'react';
import { database } from '@/database';
import { ReanimatedTrueSheetProvider } from '@lodev09/react-native-true-sheet/reanimated';
import { NotificationUtilities } from '@/utils/NotificationUtils';
import api from '@/utils/api';
import messaging from '@react-native-firebase/messaging';

export const queryClient = new QueryClient();
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

WebBrowser.maybeCompleteAuthSession();


NotificationUtilities.initNotificationService();

export default function RootLayout() {

  // useSyncAuth();

  // "reactCompiler": true

  useEffect(() => {
    const initDB = async () => {
      try {

        await database.write(async () => {
          console.log("Database initialize successful");

        })

      } catch (error) {
        console.log("Database init error", error);

      }
    }

    initDB();
  }, [])

  useEffect(() => {
    const setupNotifications = async () => {
      try {
        const hasPermission = await NotificationUtilities.requestUserPermission();
        if (hasPermission) {
          if (!messaging().isDeviceRegisteredForRemoteMessages) {
            await messaging().registerDeviceForRemoteMessages();
          }
          const token = await messaging().getToken();
          if (token) {
            console.log('FCM Token:', token);
            await api.saveFCMToken(token);
          }

          messaging().onTokenRefresh(async (newToken) => {
            console.log('FCM Token refreshed:', newToken);
            await api.saveFCMToken(newToken);
          });
        }
      } catch (error) {
        console.error('Error setting up notifications:', error);
      }
    };

    setupNotifications();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ReanimatedTrueSheetProvider>

        <KeyboardProvider>
          <StoreProvider store={store}>
            <BottomSheetModalProvider>
              <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
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
              </ClerkProvider>
            </BottomSheetModalProvider>
          </StoreProvider>
        </KeyboardProvider>
      </ReanimatedTrueSheetProvider>
    </GestureHandlerRootView >
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