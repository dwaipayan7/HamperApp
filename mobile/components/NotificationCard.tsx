import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Notification } from '@/types'
import { Feather } from '@expo/vector-icons'
import { COLORS } from '@/constants/colors'
import { Image } from 'expo-image'

interface NotificationCardProps {
    notification: Notification,
    onDelete: (notificationId: string) => void
}

const NotificationCard = ({ notification, onDelete }: NotificationCardProps) => {

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

                <View style={{ position: 'relative', marginRight: 20 }}>

                    <Image
                        source={{ uri: notification.from.profilePicture }}
                        contentFit='contain'
                        style={{
                            height: 40,
                            width: 40,
                            borderRadius: 40 / 2
                        }}
                    />

                    <View style={{ position: 'absolute', bottom: 10, right: 10, alignItems: 'center', justifyContent: 'center' }}>

                        {getNotificationIcon()}

                    </View>

                </View>

            </View>
        </View>
    )
}

export default NotificationCard

const styles = StyleSheet.create({})