import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SignOutButton from '@/components/SignOutButton'
import { useUserSync } from '@/hooks/useUserSync'
import { Ionicons } from '@expo/vector-icons'
import PostComponent from '@/components/PostComponent'
import PostsList from '@/components/PostsList'
import { usePosts } from '@/hooks/usePosts'
import Header from '@/components/Header'
import { useSignOut } from '@/hooks/useSignOut'
import { LinearGradient } from 'expo-linear-gradient'
import GradientWrapper from '@/components/GradientWrapper'

import { useNavigation, useRouter } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';


const HomeScreen = () => {

    const navigation = useNavigation();

    const openDrawer = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    };

    const router = useRouter();

    useUserSync();

    return (
        <GradientWrapper>
            <SafeAreaView style={{ flex: 1 }}>
                <Header
                    title="Home"
                    showIcon
                    onLeftActions={openDrawer}
                    showNotification
                    onPressNotification={() => router.push('/notifications')}
                // rightActionLabel="sign out"
                // onRightActions={handleSignOut}
                />

                <PostComponent />
                <PostsList />
            </SafeAreaView>
        </GradientWrapper>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})

// <LinearGradient
//     colors={["#05010D", "#140821", "#24103D", "#05010D"]}
//     locations={[0, 0.4, 0.75, 1]}
//     style={{ flex: 1 }}
// >
//     <SafeAreaView style={{ flex: 1 }}>
//         <View style={{ flex: 1 }}>

//             {/* Glow */}
//             <LinearGradient
//                 colors={[
//                     "rgba(168,85,247,0.28)",
//                     "rgba(168,85,247,0.10)",
//                     "transparent",
//                 ]}
//                 start={{ x: 0.5, y: 0 }}
//                 end={{ x: 0.5, y: 1 }}
//                 style={{
//                     position: 'absolute',
//                     top: -120,
//                     alignSelf: 'center',
//                     width: 350,
//                     height: 350,
//                     borderRadius: 999,
//                 }}
//             />

//             <Header
//                 title='Home'
//                 showIcon
//             // rightActionLabel='sign out'
//             // onRightActions={handleSignOut}
//             />

//             <PostComponent />
//             <PostsList />
//         </View>
//     </SafeAreaView>
// </LinearGradient>
