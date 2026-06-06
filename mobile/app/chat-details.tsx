import { StyleSheet, View, ActivityIndicator, Text } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
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
import { useChatSocket } from '@/hooks/useChatSocket';

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
        userName: string;
        userAvatar: string;
    }>();

    const { currentUser } = useCurrentUser();
    const { data: messages, isLoading: isLoadingMessages } = useGetMessages(userId);
    const { mutateAsync: sendMessage } = useSendMessage();

    const [liveMessages, setLiveMessages] = useState<IMessage[]>([]);
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

    useEffect(() => {
        const handleOnlineUsers = (users: string[]) => setOnlineUsers(users);
        socket.on("online-users", handleOnlineUsers);

        if (socket.connected) {
            socket.emit("get-online-users");
        } else {

            const onConnect = () => socket.emit("get-online-users");
            socket.once("connect", onConnect);
            return () => {
                socket.off("online-users", handleOnlineUsers);
                socket.off("connect", onConnect);
            };
        }

        return () => { socket.off("online-users", handleOnlineUsers); };
    }, []);


    useEffect(() => {
        if (!messages) return;

        const formatted: IMessage[] = messages.map((msg: ChatMessage) => ({
            _id: msg._id,
            text: msg.text,
            createdAt: new Date(msg.createdAt),
            user: {
                _id: msg.sender._id,
                name: `${msg.sender.firstName} ${msg.sender.lastName}`,
                avatar: msg.sender.profilePicture,
            },
        }));

        setLiveMessages(formatted);
    }, [messages]);


    const handleNewMessage = useCallback((message: ChatMessage) => {
        setLiveMessages(prev => {
            // Guard: skip if this exact _id already exists (hard duplicate)
            if (prev.some(m => m._id === message._id)) return prev;

            const incoming: IMessage = {
                _id: message._id,
                text: message.text,
                createdAt: new Date(message.createdAt),
                user: {
                    _id: message.sender._id,
                    name: `${message.sender.firstName} ${message.sender.lastName}`,
                    avatar: message.sender.profilePicture,
                },
            };

            // If this is the sender's own message echoed back → replace temp bubble
            const isMine = message.sender._id.toString() === currentUser?._id?.toString();
            if (isMine) {
                const tempIndex = prev.findIndex(m =>
                    m._id.toString().startsWith("temp_") &&
                    m.user._id.toString() === currentUser?._id?.toString()
                );
                if (tempIndex !== -1) {
                    const updated = [...prev];
                    updated[tempIndex] = incoming;
                    return updated;
                }
            }

            // Otherwise append (message from receiver)
            return GiftedChat.append(prev, [incoming]);
        });
    }, [currentUser?._id]);

    const { isReceiverTyping, onTyping, onStopTyping } = useChatSocket({
        currentUserId: currentUser?._id ?? "",
        receiverId: userId ?? "",
        onNewMessage: handleNewMessage,
    });

    // ─── 5. Send message ──────────────────────────────────────────────────────
    const onSendHandler = useCallback(async (newMessages: IMessage[] = []) => {
        const message = newMessages[0];

        // Stop typing indicator immediately on send
        onStopTyping();

        // Optimistic bubble with a temp ID — will be swapped out when
        // "new-message" arrives back from the server via socket
        const optimisticMessage: IMessage = {
            ...message,
            _id: `temp_${Date.now()}`,
        };

        setLiveMessages(prev => GiftedChat.append(prev, [optimisticMessage]));

        try {
            await sendMessage({
                receiverId: userId,
                text: message.text,
            });
            // Socket echo will replace the temp bubble via handleNewMessage
        } catch (error) {
            console.error("Failed to send message:", error);
            // Roll back the optimistic bubble on failure
            setLiveMessages(prev =>
                prev.filter(m => m._id !== optimisticMessage._id)
            );
        }
    }, [userId, onStopTyping]);


    const isOnline = onlineUsers.includes(userId);


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
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" color={COLORS.lightBlue} />
                    </View>
                ) : (
                    <GiftedChat
                        messages={liveMessages}
                        user={{
                            _id: currentUser?._id || '',
                            name: `${currentUser?.firstName} ${currentUser?.lastName}`,
                            avatar: currentUser?.profilePicture,
                        }}
                        onSend={onSendHandler}

                        // ── Typing detection ────────────────────────────────
                        onInputTextChanged={(text) => {
                            if (text.length > 0) {
                                onTyping();         // self-debouncing, safe to call every keystroke
                            } else {
                                onStopTyping();     // user cleared the input
                            }
                        }}

                        // ── Typing indicator footer ─────────────────────────
                        renderFooter={() =>
                            isReceiverTyping ? (
                                <View style={styles.typingContainer}>
                                    <View style={styles.typingBubble}>
                                        <View style={styles.dotRow}>
                                            <View style={[styles.dot, styles.dot1]} />
                                            <View style={[styles.dot, styles.dot2]} />
                                            <View style={[styles.dot, styles.dot3]} />
                                        </View>
                                    </View>
                                    <Text style={styles.typingLabel}>
                                        {userName} is typing…
                                    </Text>
                                </View>
                            ) : null
                        }

                        // ── Custom send button ──────────────────────────────
                        renderSend={(props) => (
                            <Send {...props}>
                                <View style={styles.sendButtonContainer}>
                                    <Feather
                                        name="send"
                                        size={18}
                                        color="white"
                                        style={styles.sendIcon}
                                    />
                                </View>
                            </Send>
                        )}

                        // ── Custom input toolbar ────────────────────────────
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

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    // ── Typing indicator ──────────────────────────────────────────────────────
    typingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: 8,
        gap: 8,
    },
    typingBubble: {
        backgroundColor: '#1F2937',
        borderRadius: 16,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    dotRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#9CA3AF',
    },
    // Animated dots would need Animated.View; these are static placeholders.
    // Swap these for Animated.View with looping opacity/scale for full effect.
    dot1: { opacity: 1 },
    dot2: { opacity: 0.6 },
    dot3: { opacity: 0.3 },
    typingLabel: {
        color: '#6B7280',
        fontSize: 12,
    },

    // ── Input ─────────────────────────────────────────────────────────────────
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
    },
});