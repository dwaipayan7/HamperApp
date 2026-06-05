import { StyleSheet, View, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import GradientWrapper from '@/components/GradientWrapper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/Header';
import { router, useLocalSearchParams } from 'expo-router';
import { useSendMessage, useGetMessages } from '@/services/ChatService';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { GiftedChat, IMessage, InputToolbar, Send } from 'react-native-gifted-chat';
import { socket } from '@/sockets/socket';

interface ChatMessage {
    _id: string;
    text: string;
    createdAt: string;
    sender: {
        _id: string;
        firstName: string;
        lastName: string;
        profilePicture: string;
    };
    receiver: {
        _id: string;
        firstName: string;
        lastName: string;
        profilePicture: string;
    };
}

const ChatDetails = () => {
    const { userId, userName, userAvatar } = useLocalSearchParams<{
        userId: string;
    }>();

    const { currentUser } = useCurrentUser();
    const { data: messages, isLoading: isLoadingMessages } = useGetMessages(userId);
    const { mutateAsync: sendMessage } = useSendMessage();

    const [liveMessage, setLiveMessage] = useState<IMessage[]>([]);
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

    // 1. FIX: Dynamic Connection & Re-join Handler
    useEffect(() => {
        if (!currentUser?._id) return;

        const handleConnect = () => {
            console.log("Socket connected/reconnected. Joining room for:", currentUser._id);
            socket.emit("join", currentUser._id);
            socket.emit("get-online-users"); // Refresh online list instantly
        };

        // If already connected, join immediately
        if (socket.connected) {
            handleConnect();
        }

        // Listen for reconnects or delayed connections
        socket.on("connect", handleConnect);

        return () => {
            socket.off("connect", handleConnect);
        };
    }, [currentUser?._id]);

    // 2. Manage Global Online Status Lists
    useEffect(() => {
        socket.on("online-users", (users: string[]) => {
            setOnlineUsers(users);
        });

        return () => {
            socket.off("online-users");
        };
    }, []);

    // 3. Sync Database History with Local State
    useEffect(() => {
        if (!messages) return;

        const formatted = messages.map((msg: ChatMessage) => ({
            _id: msg._id,
            text: msg.text,
            createdAt: new Date(msg.createdAt),
            user: {
                _id: msg.sender._id,
                name: `${msg.sender.firstName} ${msg.sender.lastName}`,
                avatar: msg.sender.profilePicture,
            },
        }));

        setLiveMessage(formatted);
    }, [messages]);

    // 4. Listen for Incoming Real-Time Messages
    // useEffect(() => {
    //     const handleNewMessage = (message: ChatMessage) => {
    //         // Ensure message belongs to the currently open conversation
    //         const isCurrentChat = message.sender._id === userId || message.receiver._id === userId;
    //         if (!isCurrentChat) return;

    //         // Check if message is already appended to prevent duplicates
    //         setLiveMessage(prev => {
    //             if (prev.some(m => m._id === message._id)) return prev;

    //             return GiftedChat.append(prev, [{
    //                 _id: message._id,
    //                 text: message.text,
    //                 createdAt: new Date(message.createdAt),
    //                 user: {
    //                     _id: message.sender._id,
    //                     name: `${message.sender.firstName} ${message.sender.lastName}`,
    //                     avatar: message.sender.profilePicture,
    //                 },
    //             }]);
    //         });
    //     };

    //     socket.on("new-message", handleNewMessage);

    //     return () => {
    //         socket.off("new-message", handleNewMessage);
    //     };
    // }, [userId]);
    // Inside ChatDetails.tsx -> Locate your handleNewMessage useEffect block:

    useEffect(() => {
        const handleNewMessage = (message: ChatMessage) => {
            if (!userId || !message.sender?._id || !message.receiver?._id) return;

            // Normalize everything to clean strings to prevent object/string comparison mismatches
            const incomingSenderId = message.sender._id.toString();
            const incomingReceiverId = message.receiver._id.toString();
            const currentChatTargetId = userId.toString();

            // Verify if the incoming message belongs to this active room
            const isCurrentChat =
                incomingSenderId === currentChatTargetId ||
                incomingReceiverId === currentChatTargetId;

            if (!isCurrentChat) return;

            setLiveMessage(prev => {
                // Deduplication guard: ensure the message isn't already appended
                if (prev.some(m => m._id === message._id)) return prev;

                return GiftedChat.append(prev, [{
                    _id: message._id,
                    text: message.text,
                    createdAt: new Date(message.createdAt),
                    user: {
                        _id: message.sender._id,
                        name: `${message.sender.firstName} ${message.sender.lastName}`,
                        avatar: message.sender.profilePicture,
                    },
                }]);
            });
        };

        socket.on("new-message", handleNewMessage);

        return () => {
            socket.off("new-message", handleNewMessage);
        };
    }, [userId]);
    const isOnline = onlineUsers.includes(userId);

    // 5. Handlers for sending messages (Optimistic updates + API sync)
    const onSendHandler = async (newMessages: IMessage[] = []) => {
        const message = newMessages[0];

        // Path A: Append to UI instantly
        setLiveMessage((previous) => GiftedChat.append(previous, newMessages));

        // Path B: Fire off to backend DB
        try {
            await sendMessage({
                receiverId: userId,
                text: message.text,
            });
        } catch (error) {
            console.error("Failed to send message to database:", error);
        }
    };

    return (
        <GradientWrapper style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <Header
                    showBackButton
                    onBack={() => router.back()}
                    leftTitle={userName || 'Chat'}
                    showProfileImage={userAvatar}
                    subTitle={isOnline ? 'Online' : 'Offline'}
                />

                {isLoadingMessages ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color={COLORS.lightBlue} />
                    </View>
                ) : (
                    <GiftedChat
                        messages={liveMessage}
                        user={{
                            _id: currentUser?._id || '',
                            name: `${currentUser?.firstName} ${currentUser?.lastName}`,
                            avatar: currentUser?.profilePicture,
                        }}
                        onSend={onSendHandler}
                        renderSend={(props) => (
                            <Send {...props}>
                                <View style={styles.sendButtonContainer}>
                                    <Feather name="send" size={18} color="white" style={styles.sendIcon} />
                                </View>
                            </Send>
                        )}
                        renderInputToolbar={(props) => (
                            <InputToolbar
                                {...props}
                                containerStyle={styles.inputToolbar}
                            />
                        )}
                    />
                )}
            </SafeAreaView>
        </GradientWrapper>
    );
};

export default ChatDetails;

const styles = StyleSheet.create({
    sendButtonContainer: {
        marginRight: 10,
        marginBottom: 8,
        backgroundColor: COLORS.lightBlue,
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendIcon: {
        transform: [{ rotate: '-20deg' }],
    },
    inputToolbar: {
        backgroundColor: '#111827',
        borderTopWidth: 1,
        borderTopColor: '#374151',
        marginHorizontal: 12,
        borderRadius: 20,
    }
});