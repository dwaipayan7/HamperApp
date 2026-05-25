
import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView, ViewStyle } from 'react-native';
import React from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { deleteNotification, useNotification } from '@/services/NotificationService'
import SCText from '@/components/CustomText'
import { COLORS } from '@/constants/colors'
import { Feather } from '@expo/vector-icons'
import NoNotificationsFound from '@/components/NoNotificationsFound';

const NotificationsScreen = () => {

    const { data: notifications, isLoading, refetch, error } = useNotification();
    const { mutateAsync, isPending } = deleteNotification();


    const insets = useSafeAreaInsets();

    if (error) {
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            <TouchableOpacity onPress={() => refetch()}>
                <SCText color={COLORS.lightBlue}>Retry</SCText>
            </TouchableOpacity>

        </View>
    }




    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }} edges={['top']}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 12 }}>
                <SCText varient='semibold' color={COLORS.textBlack}>Notifications</SCText>
                <TouchableOpacity>
                    <Feather name='settings' size={20} color={'#657786'} />
                </TouchableOpacity>
            </View>

            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingBottom: 100 + insets.bottom }}
                showsVerticalScrollIndicator={false}
            >

                {isLoading ? (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size={'large'} />
                        <SCText color={COLORS.gray500}>Loading notifications...</SCText>
                    </View>
                ) : notifications?.result?.length === 0 ? (<View></View>) : (
                    <NoNotificationsFound />
                )}

            </ScrollView>
        </SafeAreaView>
    )
}

export default NotificationsScreen