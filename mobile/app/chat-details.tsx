import { StyleSheet, View, ActivityIndicator, Text, FlatList, SectionList, Platform, TouchableOpacity, useWindowDimensions } from 'react-native'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import GradientWrapper from '@/components/GradientWrapper';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '@/components/Header';
import { router, useLocalSearchParams } from 'expo-router';
import { useSendMessage, useGetMessages, useReactToMessage, useReplyToMessage } from '@/services/ChatService';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { GiftedChat, IMessage, InputToolbar, Send } from 'react-native-gifted-chat';
import { socket } from '@/sockets/socket';
import { useChatSocket } from '@/hooks/useChatSocket';
import SCText from '@/components/CustomText';
import dayjs from 'dayjs';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import TypingIndicator from '@/components/TypingIndicator';
import { SCTextInput } from '@/utils/CustomInputStore';
import { Formik } from 'formik';
import * as yup from 'yup';
import { isPending } from '@reduxjs/toolkit';
import { Icon } from '@/utils/Icons';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import EmojiPicker, { codePointToEmoji } from '@/modal/EmojiPickerModal';
import ChatMessageItem from '@/components/ChatMessageItem';


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
    // const { data: messages, isLoading: isLoadingMessages } = useGetMessages(userId);

    const { data: messages = [], isLoading: isLoadingMessages } = useGetMessages(userId);

    console.log("The messages are: ", messages);


    const { mutateAsync: sendMessage } = useSendMessage();

    const [liveMessages, setLiveMessages] = useState<IMessage[]>([]);
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

    const setFieldValueRef = useRef<((field: string, value: any) => void) | null>(null);
    const currentTextRef = useRef<string>('');


    const [emojiMode, setEmojiMode] = useState<'input' | 'reaction'>('input');


    // const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false)

    const [showScrollToBottom, setShowScrollToBottom] = useState(false);

    const [reactionTargetMessage, setReactionTargetMessage] = useState(null);
    const [showReactionPicker, setShowReactionPicker] = useState(false)


    const { mutateAsync: reactToMessage } = useReactToMessage();
    const { mutateAsync: replyToMessage } = useReplyToMessage();

    const onLongPressMessage = useCallback((message: any) => {
        setReactionTargetMessage(message);
        setEmojiMode('reaction')
        setShowReactionPicker(true);
    }, [])


    const handleScroll = useCallback((event: any) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        setShowScrollToBottom(offsetY > 100);
    }, []);

    const scrollToBottom = useCallback(() => {
        sectionListRef.current?.scrollToLocation({
            sectionIndex: 0,
            itemIndex: 0,
            animated: true,
        });
    }, []);

    const [replyMessage, setReplyMessage] = useState(null);

    const onSwipeToReply = (message: any) => {
        setReplyMessage(message);
    }

    const insets = useSafeAreaInsets()


    const sectionListRef = useRef<SectionList<any>>(null);

    // const sortedMessages = [...liveMessages].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());


    const validationSchema = yup.object().shape({
        text: yup.string().trim(),
    });


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

        const formatted: IMessage[] = messages.map((msg: any) => ({
            _id: msg._id,
            text: msg.text,
            createdAt: new Date(msg.createdAt),
            user: {
                _id: msg.sender._id,
                name: `${msg.sender.firstName} ${msg.sender.lastName}`,
                avatar: msg.sender.profilePicture,
            },
            ...(msg.replyTo && { replyTo: msg.replyTo }),
            ...(msg.reactions && { reactions: msg.reactions }),
        }));

        setLiveMessages(formatted);
    }, [messages]);


    const handleNewMessage = useCallback((message: ChatMessage) => {
        setLiveMessages(prev => {

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
                ...((message as any).replyTo && { replyTo: (message as any).replyTo }),
                ...((message as any).reactions && { reactions: (message as any).reactions }),
            };


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


            // return GiftedChat.append(prev, [incoming]);
            // return (prev, [incoming]);
            return [incoming, ...prev];
        });
    }, [currentUser?._id]);




    const { isReceiverTyping, onTyping, onStopTyping } = useChatSocket({
        currentUserId: currentUser?._id ?? "",
        receiverId: userId ?? "",
        onNewMessage: handleNewMessage,
    });


    const onSendHandler = async (text: string) => {
        if (!text.trim()) return;

        onStopTyping();

        const optimisticMessage: IMessage = {
            _id: `temp_${Date.now()}`,
            text,
            createdAt: new Date(),
            user: {
                _id: currentUser?._id || '',
                name: `${currentUser?.firstName} ${currentUser?.lastName}`,
                avatar: currentUser?.profilePicture,
            },

            ...(replyMessage && {
                replyTo: {
                    _id: replyMessage._id,
                    text: replyMessage.text,
                    sender: {
                        _id: replyMessage.user?._id,
                        firstName: replyMessage.user?.name?.split(' ')[0] || '',
                    },
                    createdAt: replyMessage.createdAt,
                },
            }),
        };

        setLiveMessages(prev => [optimisticMessage, ...prev]);
        setReplyMessage(null);

        try {

            if (replyMessage) {
                await replyToMessage({
                    receiverId: userId,
                    text,
                    replyTo: replyMessage._id
                });
            } else {
                await sendMessage({ receiverId: userId, text });
            }

            // await sendMessage({
            //     receiverId: userId,
            //     text,
            // });
        } catch (error) {
            setLiveMessages(prev =>
                prev.filter(m => m._id !== optimisticMessage._id)
            );
        }
    };



    const isOnline = onlineUsers.includes(userId);

    const groupedMessages = React.useMemo(() => {
        const groups: Record<string, IMessage[]> = {};

        liveMessages.forEach((message) => {
            let label = "";
            if (dayjs(message.createdAt).isSame(dayjs(), 'day')) {
                label = "Today";
            } else if (dayjs(message.createdAt).isSame(dayjs().subtract(1, 'day'), 'day')) {
                label = "Yesterday";
            } else {
                label = dayjs(message.createdAt).format("DD/MM/YYYY");
            }

            if (!groups[label]) groups[label] = [];
            groups[label].push(message);
        });

        const parseTitle = (t: string) => {
            if (t === "Today") return dayjs();
            if (t === "Yesterday") return dayjs().subtract(1, 'day');
            return dayjs(t, "DD/MM/YYYY");
        };

        return Object.entries(groups)
            .sort(([a], [b]) =>
                parseTitle(b).valueOf() - parseTitle(a).valueOf()
            )
            .map(([title, data]) => ({
                title,
                data: [...data].sort(
                    (a, b) => new Date(b.createdAt as any).getTime() - new Date(a.createdAt as any).getTime()
                ),
            }));
    }, [liveMessages]);

    useEffect(() => {
        if (groupedMessages.length === 0) return;
        sectionListRef.current?.scrollToLocation({
            sectionIndex: 0,
            itemIndex: 0,
            viewOffset: 0,
            animated: true
        });
    }, [liveMessages])


    return (
        <GradientWrapper style={{ flex: 1 }}>
            {/* <SafeAreaView style={{ flex: 1 }}> */}
            <KeyboardAvoidingView
                style={{ flex: 1, marginTop: insets.top }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}

                keyboardVerticalOffset={
                    Platform.OS === 'ios'
                        ? insets.top - 80
                        : 0
                }
            >
                <Header
                    showBackButton
                    onBack={() => router.back()}
                    leftTitle={userName || 'Chat'}
                    showProfileImage={userAvatar}
                    subTitle={isOnline ? 'Online' : 'Offline'}
                    isVerticalThreeDots
                    onVerticalThreeDots={() => { }}
                />

                {isLoadingMessages ? (
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" color={COLORS.lightBlue} />
                    </View>
                ) : (

                    <SectionList
                        onScroll={handleScroll}
                        scrollEventThrottle={16}
                        stickySectionHeadersEnabled={false}
                        ref={sectionListRef}
                        style={{ flex: 1 }}
                        sections={groupedMessages}
                        inverted
                        keyExtractor={(item: any) => item._id.toString()}
                        contentContainerStyle={{
                            paddingHorizontal: 12,
                            paddingVertical: 10,
                        }}

                        ListHeaderComponent={
                            <TypingIndicator visible={isReceiverTyping} />
                        }
                        renderSectionFooter={({ section }: any) => (
                            <View
                                style={{
                                    alignItems: "center",
                                    marginVertical: 12,
                                }}
                            >
                                <View
                                    style={{
                                        backgroundColor: "#202C33",
                                        paddingHorizontal: 12,
                                        paddingVertical: 4,
                                        borderRadius: 10,
                                    }}
                                >
                                    <SCText
                                        color="white"
                                        style={{
                                            fontSize: 12,
                                        }}
                                    >
                                        {section.title}
                                    </SCText>
                                </View>
                            </View>
                        )}
                        renderItem={({ item }: any) => {

                            return <ChatMessageItem
                                item={item}
                                onSwipeToReply={onSwipeToReply}
                                currentUserId={currentUser?._id}
                                onLongPress={onLongPressMessage}
                            />


                        }}
                    />



                )}

                {showScrollToBottom && (
                    <TouchableOpacity
                        onPress={scrollToBottom}
                        style={styles.scrollArrowButton}
                        activeOpacity={0.8}
                    >
                        <Feather name="chevron-down" size={22} color={COLORS.white} />
                    </TouchableOpacity>
                )}
                {replyMessage && (
                    <View style={styles.replyBar}>
                        <View style={styles.replyBarContent}>
                            <View style={styles.replyBarAccent} />
                            <View style={{ flex: 1 }}>
                                <SCText color={COLORS.lightBlue} >
                                    {replyMessage.user?.name?.split(' ')[0]}
                                </SCText>
                                <SCText color={COLORS.textBlack} style={{ opacity: 0.7 }} numberOfLines={1}>
                                    {replyMessage.text}
                                </SCText>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => setReplyMessage(null)}>
                            <Feather name="x" size={18} color={COLORS.textBlack} />
                        </TouchableOpacity>
                    </View>
                )}
                {/* {'Chat Input'} */}
                <Formik
                    initialValues={{ text: '' }}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { resetForm }) => {
                        try {
                            // await mutateAsync({
                            //     postId: selectedPost._id,
                            //     content: values.content,
                            // });
                            // handleNewMessage(values)

                            onSendHandler(values.text)


                            resetForm();
                        } catch (error) {
                            console.log(error);
                        }
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => {

                        setFieldValueRef.current = setFieldValue;
                        currentTextRef.current = values.text;

                        return (

                            <>

                                <View style={styles.inputBar}>
                                    <View style={{ flex: 1, marginRight: 10, }}>
                                        <SCTextInput
                                            placeholder="Write a message..."
                                            value={values.text}
                                            onChangeText={(text) => {
                                                handleChange('text')(text);

                                                if (text.trim().length > 0) {
                                                    onTyping();
                                                } else {
                                                    onStopTyping();
                                                }
                                            }}

                                            style={{
                                                paddingRight: 35
                                            }}


                                            wrapperStyle={{
                                                paddingLeft: 40,
                                            }}
                                            onBlur={handleBlur('text')}
                                            extendingField
                                        />
                                    </View>

                                    <View style={{
                                        position: 'absolute',
                                        left: 14,
                                        bottom: 32
                                    }}>
                                        <MaterialCommunityIcons

                                            onPress={() => {
                                                setEmojiMode('input');
                                                setReactionTargetMessage(null)
                                                setShowReactionPicker(true)
                                            }}

                                            color={COLORS.white} size={30} name='emoticon-outline' />
                                    </View>

                                    {!replyMessage && <View style={{
                                        position: 'absolute',

                                        bottom: 32,
                                        right: 70
                                    }}>
                                        <Feather onPress={() => { }} name='plus' size={30} />
                                    </View>}



                                    <TouchableOpacity
                                        disabled={!values.text.trim()}
                                        activeOpacity={0.8}
                                        onPress={() => handleSubmit()}
                                        style={styles.sendButton}
                                    >
                                        <Feather
                                            name="send"
                                            size={20}
                                            color={COLORS.white}
                                        />
                                    </TouchableOpacity>

                                </View>


                            </>
                        )
                    }}
                </Formik>
                {/* <View>
                        <SCTextInput

                        />
                    </View> */}

                <EmojiPicker
                    show={showReactionPicker}
                    close={() => setShowReactionPicker(false)}
                    onSelect={async (codepoint) => {
                        const emojiChar = codePointToEmoji(codepoint);
                        setShowReactionPicker(false);
                        // if (!reactionTargetMessage) return;

                        if (emojiMode === 'input') {

                            setFieldValueRef.current?.(
                                'text',
                                currentTextRef.current + emojiChar
                            );
                            return;
                        }

                        // ✅ Reaction mode — only runs on long press
                        if (!reactionTargetMessage) return;

                        try {
                            await reactToMessage({
                                messageId: reactionTargetMessage._id,
                                emoji: emojiChar,
                            });

                            setLiveMessages(prev => prev.map(m => {
                                if (m._id !== reactionTargetMessage._id) return m;
                                const existing = (m as any).reactions ?? [];
                                const idx = existing.findIndex(
                                    (r: any) => r.user._id === currentUser?._id
                                );
                                const updated = [...existing];
                                if (idx !== -1) {
                                    updated[idx] = { ...updated[idx], emoji: emojiChar };
                                } else {
                                    updated.push({ user: { _id: currentUser?._id }, emoji: emojiChar });
                                }
                                return { ...m, reactions: updated };
                            }));
                        } catch (e) {
                            console.warn('Reaction failed', e);
                        }
                        setReactionTargetMessage(null);
                    }}
                />
            </KeyboardAvoidingView>
            {/* </SafeAreaView> */}
        </GradientWrapper >
    );
};

export default ChatDetails;



const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },


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


    dot1: { opacity: 1 },
    dot2: { opacity: 0.6 },
    dot3: { opacity: 0.3 },
    typingLabel: {
        color: '#6B7280',
        fontSize: 12,
    },
    sendButton: {
        width: 40,
        height: 40,
        borderRadius: 24,
        backgroundColor: COLORS.lightBlue,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },


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
        // borderTopWidth: 1,
        // borderTopColor: '#374151',
        marginHorizontal: 12,
        borderRadius: 20,
    },
    inputBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 10,
        paddingBottom: 16,
        justifyContent: 'center',
        // borderTopWidth: 0.2,
        // borderColor: COLORS.gray100,
        backgroundColor: '#12051F',
    },


    scrollArrowButton: {
        position: 'absolute',
        bottom: 90,
        right: 16,
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: COLORS.lightBlue,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },

    replyBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.modalBackgroundColor,
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.08)',
        justifyContent: 'space-between',
    },
    replyBarContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        gap: 8,
        marginRight: 12,
    },
    replyBarAccent: {
        width: 3,
        height: 36,
        backgroundColor: COLORS.lightBlue,
        borderRadius: 2,
    },
});