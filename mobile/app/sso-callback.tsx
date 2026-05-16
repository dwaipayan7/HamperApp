import { useAuth } from '@clerk/expo'
import { useEffect } from 'react'
import { ActivityIndicator, View, Text } from 'react-native'
import { router } from 'expo-router'

export default function SsoCallback() {
    const { isLoaded, isSignedIn } = useAuth()

    useEffect(() => {
        if (!isLoaded) {
            return
        }

        if (isSignedIn) {
            router.replace('/(tabs)')
        }
    }, [isLoaded, isSignedIn])

    return (
        <View className="flex-1 items-center justify-center bg-white px-8">
            <ActivityIndicator size="large" />
            <Text className="mt-4 text-center text-base text-black">Signing you in...</Text>
        </View>
    )
}
