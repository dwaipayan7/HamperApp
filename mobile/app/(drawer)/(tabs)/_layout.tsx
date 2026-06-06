import { View, Text } from 'react-native'
import React from 'react'
import { Redirect, Tabs } from 'expo-router'

import { Feather } from "@expo/vector-icons"
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAuth } from '@clerk/expo'
import { useUserSync } from '@/hooks/useUserSync'

const TabsLayout = () => {

    const insets = useSafeAreaInsets();

    // useUserSync();


    const { isSignedIn, isLoaded } = useAuth();

    if (!isLoaded) {
        return null;
    }

    if (!isSignedIn) {
        return <Redirect href={'/(auth)'} />
    }

    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "#1DA1F2",
            tabBarInactiveTintColor: "#657786",
            tabBarStyle: {
                backgroundColor: '#05010D',
                height: 50 + insets.bottom,
                paddingTop: 8,
            },


        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "",
                    tabBarIcon: ({ color, size }) => <Feather name="home" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: "",

                    tabBarIcon: ({ color, size }) => <Feather name="search" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="addVideo"
                options={{
                    title: "",

                    tabBarIcon: ({ color, size }) => <Feather name="plus-circle" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="messages"
                options={{
                    title: "",

                    tabBarIcon: ({ color, size }) => <Feather name="mail" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "",
                    tabBarIcon: ({ color, size }) => <Feather name="user" size={size} color={color} />,
                }}
            />
        </Tabs >
    )
}

export default TabsLayout