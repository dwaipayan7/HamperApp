import { View, Text } from 'react-native'
import React from 'react'
import GradientWrapper from '@/components/GradientWrapper'
import { SafeAreaView } from 'react-native-safe-area-context'

const ProfileScreen = () => {
    return (
        <GradientWrapper>
            <SafeAreaView>
                <Text>ProfileScreen</Text>
            </SafeAreaView>
        </GradientWrapper>
    )
}

export default ProfileScreen