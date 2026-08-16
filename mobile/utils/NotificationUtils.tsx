import notifee, {
    AndroidImportance,
    AndroidStyle,
    AndroidVisibility,
    EventType,
} from 'react-native-notify-kit';
import messaging from '@react-native-firebase/messaging';


const onNotification = async (firebaseResponse: any) => {
    console.log(firebaseResponse)
    const CHANNEL_NAME = 'Hamper.Notifications';
    const CHANNEL_ID = 'Hamper.Notifications';
    const channelId = await notifee.createChannel({
        id: CHANNEL_ID,
        name: CHANNEL_NAME,
        importance: AndroidImportance.HIGH,
        visibility: AndroidVisibility.PUBLIC,
    })
    // npm i @notifee/react-native
    try {
        await notifee.displayNotification({
            title: firebaseResponse?.data?.title || firebaseResponse?.notification?.title || '',
            body: firebaseResponse?.data?.body || firebaseResponse?.notification?.body || '',
            data: {
                ...firebaseResponse.data,
            },
            android: {
                channelId,
                vibrationPattern: [300, 500],
                smallIcon: 'ic_notification',
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

            }
        })
    } catch (err) {
        console.log('Notifee displayNotification error:', err)
    }

};

const requestUserPermission = async (): Promise<boolean> => {

    await notifee.requestPermission();

    const messagingStatus = await messaging().requestPermission();

    const granted =
        messagingStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        messagingStatus === messaging.AuthorizationStatus.PROVISIONAL;

    return granted;
};



messaging().setBackgroundMessageHandler(async (firebaseResponse) => {
    console.log('Background message received:', firebaseResponse);
    await onNotification(firebaseResponse);
});



const initNotificationService = (): (() => void) => {
    notifee.onBackgroundEvent(async ({ type, detail }) => {
        // PressAction(detail, type, true),
    });

    notifee.onForegroundEvent(async ({ type, detail }) => {
        // PressAction(detail, type, false),
    });

    // Returns an unsubscribe function
    const unsubscribeForeground = messaging().onMessage(async (remoteMessage) => {
        console.log('Foreground message received:', remoteMessage);
        await onNotification(remoteMessage);
    });

    return unsubscribeForeground;
};

export const NotificationUtilities = {
    initNotificationService,
    onNotification,
    requestUserPermission,
};
