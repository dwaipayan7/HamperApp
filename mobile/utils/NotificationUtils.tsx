import notifee, {
    AndroidImportance,
    AndroidStyle,
    AndroidVisibility,
    EventType,
} from 'react-native-notify-kit';
import messaging from '@react-native-firebase/messaging';


const onNotification = async (firebaseResponse: any) => {
    // console.log(firebaseResponse)
    const CHANNEL_NAME = 'Hamper.Notifications';
    const CHANNEL_ID = 'Hamper.Notifications';
    const channelId = await notifee.createChannel({
        id: CHANNEL_ID,
        name: CHANNEL_NAME,
        importance: AndroidImportance.HIGH,
        visibility: AndroidVisibility.PUBLIC,
    })

    try {
        await notifee.displayNotification({
            title: firebaseResponse?.data?.title || firebaseResponse?.notification?.title || '',
            body: firebaseResponse?.data?.body || firebaseResponse?.notification?.body || '',
            data: {
                ...firebaseResponse.data,
            },
            remote: {
                messageId: firebaseResponse?.messageId,
                senderId: firebaseResponse?.data?.senderId
            },
            android: {
                channelId,
                vibrationPattern: [300, 500],
                smallIcon: 'ic_launcher',
                // largeIcon: 'ic_launcher_round',
                pressAction: {
                    id: 'default',
                },
                style: {
                    type: AndroidStyle.BIGTEXT,
                    text: firebaseResponse?.data?.body || firebaseResponse?.notification?.body || ''
                },
            },
            ios: {
                foregroundPresentationOptions: {
                    alert: true,
                    badge: true,
                    sound: true,
                },
                critical: true,
            }
        })
    } catch (err) {
        console.log(err)
    }

};

const requestUserPermission = async () => await messaging().requestPermission();


const initNotificationService = () => {
    notifee.onBackgroundEvent(async ({ type, detail }) => { }
        // PressAction(detail, type, true),
    );

    notifee.onForegroundEvent(async ({ type, detail }) => { }
        // PressAction(detail, type, false),
    );

    messaging().setBackgroundMessageHandler(async firebaseResponse => {
        onNotification(firebaseResponse);
    });
};

export const NotificationUtilities = {
    initNotificationService,
    onNotification,
    requestUserPermission,
};
