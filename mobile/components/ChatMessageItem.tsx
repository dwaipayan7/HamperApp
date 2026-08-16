import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { memo, useCallback, useMemo, useState } from 'react'
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { COLORS } from '@/constants/colors';
import SCText from './CustomText';
import dayjs from 'dayjs';
import EmojiPicker from '@/modal/EmojiPickerModal';
import { Feather } from '@expo/vector-icons';

interface Props {
    item: any;
    currentUserId: string;
    onSwipeToReply: (message: any) => void;
    onLongPress: (message: any) => void
}

const ChatMessageItem = memo(({ item, currentUserId, onSwipeToReply, onLongPress }: Props) => {
    // const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const translateX = useSharedValue(0);
    const isDragging = useSharedValue(false);

    const isMe = item.user._id.toString() === currentUserId?.toString();

    const triggerReply = useCallback(() => {
        onSwipeToReply(item);
    }, [item, onSwipeToReply]);

    const triggerLongPress = useCallback(() => {
        onLongPress(item)
    }, [item, onLongPress])

    // const openEmojiPicker = useCallback(() => {
    //     setShowEmojiPicker(true);
    // }, []);

    const panGesture = Gesture.Pan()
        .activeOffsetX([-10, 10])
        .failOffsetY([-8, 8])
        .onBegin(() => {
            isDragging.value = true;
        })
        .onUpdate((e) => {
            if (isDragging.value) {
                translateX.value = Math.max(0, Math.min(e.translationX, 80));
            }
        })
        .onEnd(() => {
            if (Math.abs(translateX.value) >= 60) {
                runOnJS(triggerReply)();
            }
            isDragging.value = false;
            translateX.value = withSpring(0);
        });

    const longPress = Gesture.LongPress()
        .minDuration(500)
        .onStart(() => {
            runOnJS(triggerLongPress)();
        });


    const gesture = Gesture.Race(longPress, panGesture);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    const iconOpacity = useAnimatedStyle(() => ({
        opacity: Math.min(Math.abs(translateX.value) / 50, 1),
        transform: [{ scale: Math.min(Math.abs(translateX.value) / 50, 1) }],
    }));

    const reactionSummary = useMemo(() => {
        if (!item.reactions?.length) {
            return [];
        }

        const map: Record<string, number> = {};

        item?.reactions.forEach((r: any) => {
            map[r.emoji] = (map[r.emoji] || 0) + 1;
        });

        return Object.entries(map);

    }, [item.reactions])







    return (
        <GestureDetector gesture={gesture}>
            <Animated.View
                style={[
                    {
                        alignItems: isMe ? 'flex-end' : 'flex-start',
                        marginVertical: 3,
                        overflow: 'visible',
                    },
                    animatedStyle,
                ]}
            >

                <Animated.View
                    style={[
                        {
                            position: 'absolute',
                            left: isMe ? undefined : -30,
                            right: isMe ? -30 : undefined,
                            alignSelf: 'center',
                            zIndex: 10,
                        },
                        iconOpacity,
                    ]}
                >
                    <Feather
                        name="corner-up-left"
                        size={20}
                        color={COLORS.white}
                    />
                </Animated.View>

                <TouchableOpacity
                    onLongPress={triggerLongPress}
                    delayLongPress={500}
                >



                    <View
                        style={{
                            maxWidth: '80%',
                            backgroundColor: isMe ? COLORS.lightBlue : '#1F2937',
                            paddingHorizontal: 14,
                            paddingVertical: 12,
                            // gap: 4,
                            borderTopLeftRadius: isMe ? 0 : 18,
                            borderTopRightRadius: !isMe ? 0 : 18,
                            borderBottomLeftRadius: !isMe ? 0 : 18,
                            borderBottomRightRadius: 18,
                        }}
                    >

                        {item.replyTo && (
                            <View style={styles.replyPreview}>
                                <View style={styles.replyBar} />

                                <View style={{ flex: 1, paddingVertical: 6, minWidth: 0, }}>
                                    <SCText
                                        color={isMe ? '#FFFFFF' : COLORS.lightBlue}
                                        style={{ fontWeight: '700', fontSize: 12 }}
                                    >
                                        {item.replyTo.sender?._id?.toString() === currentUserId?.toString()
                                            ? 'You'
                                            : item.replyTo.sender?.firstName}
                                    </SCText>

                                    <SCText
                                        numberOfLines={1}
                                        color={COLORS.white}
                                        style={{ opacity: 0.6, fontSize: 13, marginTop: 1 }}
                                    >
                                        {item.replyTo.text}
                                    </SCText>
                                </View>
                            </View>
                        )}

                        <SCText color="white">{item.text}</SCText>
                        <SCText
                            color={COLORS.white}
                            style={{ alignSelf: 'flex-end', fontSize: 10, marginTop: 4, opacity: 0.7 }}
                        >
                            {dayjs(item.createdAt).format('hh:mm A')}
                        </SCText>
                    </View>


                    {reactionSummary.length > 0 && (
                        <View style={[
                            styles.reactionsRow,
                            { justifyContent: isMe ? 'flex-end' : 'flex-start' }
                        ]}>
                            {reactionSummary.map(([emoji, count]) => (
                                <View key={emoji} style={styles.reactionBubble}>
                                    <SCText style={{}}>{emoji}</SCText>
                                    {count > 1 && (
                                        <SCText color="white" style={{}}>
                                            {count}
                                        </SCText>
                                    )}
                                </View>
                            ))}
                        </View>
                    )}
                </TouchableOpacity>


                {/* <EmojiPicker
                    show={showEmojiPicker}
                    close={() => setShowEmojiPicker(false)}
                    onSelect={(emoji) => {
                        console.log('Selected emoji:', emoji);
                        setShowEmojiPicker(false);
                    }}
                /> */}
            </Animated.View>
        </GestureDetector>
    );
});

export default ChatMessageItem;


const styles = StyleSheet.create({
    // replyPreview: {
    //     flexDirection: 'row',
    //     backgroundColor: 'rgba(255,255,255,0.08)',
    //     borderRadius: 10,
    //     marginBottom: 3,
    //     maxWidth: '80%',
    //     overflow: 'hidden',
    //     paddingVertical: 6,
    //     paddingRight: 10,
    // },
    // replyBar: {
    //     width: 3,
    //     backgroundColor: COLORS.lightBlue,
    //     marginRight: 8,
    //     borderRadius: 2,
    // },
    replyName: {


        marginBottom: 2,
    },
    replyText: {

        opacity: 0.7,
    },
    reactionsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 4,
        marginTop: 3,
    },
    reactionBubble: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1F2937',
        borderRadius: 12,
        paddingHorizontal: 6,
        paddingVertical: 2,
        gap: 2,
    },

    replyPreview: {
        flexDirection: 'row',
        alignItems: 'stretch',
        backgroundColor: 'rgba(0,0,0,0.18)',
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 4,
        minHeight: 46,

    },
    replyBar: {
        width: 3, height: '100%', backgroundColor: COLORS.lightBlue, borderRadius: 2, marginRight: 8

    },
});