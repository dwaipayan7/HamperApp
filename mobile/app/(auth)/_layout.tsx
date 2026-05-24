import { useAuth } from '@clerk/expo'
import { Redirect, Stack } from 'expo-router'
import { ActivityIndicator, View } from 'react-native'

export default function AuthRoutesLayout() {
    const { isSignedIn, isLoaded } = useAuth()

    if (!isLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
                <ActivityIndicator size="large" color="#1DA1F2" />
            </View>
        )
    }

    if (isSignedIn) {
        return <Redirect href={'/(tabs)'} />
    }

    return <Stack screenOptions={{ headerShown: false }} />;
}