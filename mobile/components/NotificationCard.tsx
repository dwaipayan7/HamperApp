import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Notification } from '@/types'
import { Feather } from '@expo/vector-icons'
import { COLORS } from '@/constants/colors'
import { Image } from 'expo-image'
import SCText from './CustomText'
import { formatDate } from '@/utils/formatters'

interface NotificationCardProps {
    notification: Notification,
    onDelete: (notificationId: string) => void
}

const NotificationCard = ({ notification, onDelete }: NotificationCardProps) => {

    console.log("The Notification Details are: ", notification);


    const getNotificationText = () => {
        const name = `${notification.from.firstName} ${notification.from.lastName}`;
        switch (notification.type) {
            case 'like':
                return `${name} liked your post`
            case 'comment':
                return `${name} commented your post`
            case 'follow':
                return `${name} started following you`

            default:
                return "";
        }
    };

    const getNotificationIcon = () => {
        switch (notification.type) {
            case "like":

                return <Feather name='heart' size={20} color={'#e0245e'} />
            case "comment":

                return <Feather name='message-circle' size={20} color={'#1da1f2'} />
            case "follow":

                return <Feather name='user-plus' size={20} color={'#17bf63'} />

            default:
                return <Feather name='bell' size={20} color={'#657786'} />;
        }
    }

    const handleDelete = () => {
        Alert.alert("Delete Notification", "Are you sure you want to delete this notification?", [
            { text: "Cancel", style: 'cancel' },
            {
                text: "Delete",
                style: 'destructive',
                onPress: () => onDelete(notification._id)
            }
        ])
    }

    return (
        <View style={{ borderColor: COLORS.gray100 }}>
            <View style={{ flexDirection: 'row', paddingHorizontal: 14, paddingVertical: 12 }}>

                <View style={{ position: 'relative', marginRight: 20, }}>

                    <Image
                        source={{ uri: notification.from.profilePicture }}
                        contentFit='contain'
                        style={{
                            height: 40,
                            width: 40,
                            borderRadius: 40 / 2,
                        }}
                    />

                    <View style={{ position: 'absolute', top: 20, bottom: 10, right: 10, alignItems: 'center', justifyContent: 'center' }}>

                        {getNotificationIcon()}

                    </View>

                </View>

                <View style={{ flex: 1 }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>

                        <View style={{ flex: 1 }}>
                            <SCText color={COLORS.gray100} varient='semibold'>
                                {notification?.from?.firstName} {notification?.from?.lastName}
                            </SCText>

                            <SCText size={12} color={COLORS.gray400}>@{notification?.from?.username}</SCText>
                            <SCText style={{ marginTop: 4 }} color={COLORS.gray200}>{getNotificationText()}</SCText>
                        </View>
                        <TouchableOpacity style={{}} onPress={handleDelete}>
                            <Feather name='trash' size={16} color={COLORS.redColor} />
                        </TouchableOpacity>
                    </View>

                    {notification?.post && (
                        <View style={{ backgroundColor: COLORS.themePrimary, borderTopEndRadius: 4, borderTopLeftRadius: 12, padding: 8, borderBottomLeftRadius: !notification?.comment ? 4 : 0, borderBottomRightRadius: !notification?.comment ? 12 : 0 }}>

                            <SCText numberOfLines={3} color='white'>
                                {notification?.post?.content}
                            </SCText>
                            {notification?.post.image && (
                                <Image
                                    source={{ uri: notification?.post?.image }}
                                    style={{
                                        height: 32,
                                        width: 32,
                                        borderRadius: 16,
                                        resizeMode: 'cover'
                                    }}

                                />
                            )}
                        </View>
                    )}

                    {notification?.comment && (
                        <View style={{ backgroundColor: COLORS.borderColorCard, borderBottomEndRadius: 12, paddingHorizontal: 8, borderBottomLeftRadius: 4 }}>
                            <SCText color={COLORS.gray500}>Comment:</SCText>
                            <SCText numberOfLines={2} color={COLORS.gray500}>
                                &ldquo;{notification.comment.content}&rdquo;
                            </SCText>
                        </View>
                    )}

                    <SCText style={{ alignSelf: 'flex-end', paddingTop: 4 }} color='white'>{formatDate(notification.createdAt)}</SCText>

                </View>

            </View>
        </View >
    )
}

export default NotificationCard

const styles = StyleSheet.create({})