import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SignOutButton from '@/components/SignOutButton'
import { useUserSync } from '@/hooks/useUserSync'
import { Ionicons } from '@expo/vector-icons'
import PostComponent from '@/components/PostComponent'
import PostsList from '@/components/PostsList'

const HomeScreen = () => {

    useUserSync();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            {/* <Text>HomeScreen</Text> */}

            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                // paddingVertical: 5,
                paddingHorizontal: 12,
                borderColor: '#F3F4F6'
            }}>


                <Ionicons name='logo-twitter' size={24} color={'#1da1f2'} />
                <Text style={{
                    fontWeight: '700',
                    fontSize: 16
                }}>Home</Text>
                <SignOutButton />

            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                    flex: 1,

                }}
                contentContainerStyle={{
                    paddingBottom: 80
                }}
            >
                <PostComponent />
                <PostsList />
            </ScrollView>

        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})