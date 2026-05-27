
import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView, ViewStyle, RefreshControl, FlatList } from 'react-native';
import React from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { deleteNotification, useNotification } from '@/services/NotificationService'
import SCText from '@/components/CustomText'
import { COLORS } from '@/constants/colors'
import { Feather } from '@expo/vector-icons'
import NoNotificationsFound from '@/components/NoNotificationsFound';
import Header from '@/components/Header';
import GradientWrapper from '@/components/GradientWrapper';
import { Notification } from '@/types';
import NotificationCard from '@/components/NotificationCard';
import LoaderModal from '@/components/LoaderModal';

const NotificationsScreen = () => {

    // const { data, isLoading, refetch, error } = useNotification();
    const { mutateAsync: deleteNotifi, isPending } = deleteNotification();


    const { data, isLoading, refetch, error } = useNotification();

    const notifications = data?.notifications || [];

    // console.log("The Notifications are: ", notifications);


    const insets = useSafeAreaInsets();

    if (error) {
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            <TouchableOpacity onPress={() => refetch()}>
                <SCText color={COLORS.lightBlue}>Retry</SCText>
            </TouchableOpacity>

        </View>
    }




    return (
        <GradientWrapper>
            <LoaderModal show={isPending} />
            <SafeAreaView style={{ flex: 1, }} edges={['top']}>
                {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 12 }}>
                <SCText varient='semibold' color={COLORS.textBlack}>Notifications</SCText>
                <TouchableOpacity>
                    <Feather name='settings' size={20} color={'#657786'} />
                </TouchableOpacity>
            </View> */}

                <Header leftTitle='Notifications' showSettingsIcon onSettingAction={() => { }} />

                <FlatList
                    data={notifications || []}
                    keyExtractor={(item: Notification) => item._id}
                    style={{ flex: 1 }}
                    contentContainerStyle={{
                        paddingBottom: 100 + insets.bottom,
                        flexGrow: 1,
                    }}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={isLoading}
                            onRefresh={refetch}
                        />
                    }
                    ListEmptyComponent={
                        isLoading ? (
                            <View
                                style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: 50,
                                }}
                            >
                                <SCText color={COLORS.gray500}>
                                    Loading notifications...
                                </SCText>
                            </View>
                        ) : (
                            <NoNotificationsFound />
                        )
                    }
                    renderItem={({ item, index }) => {
                        console.log("The Item is: ", item);

                        return (

                            <NotificationCard
                                notification={item}
                                onDelete={(notificationId) => deleteNotifi(item._id)}
                            />
                        )
                    }
                    }
                />
            </SafeAreaView>
        </GradientWrapper>
    )
}

export default NotificationsScreen