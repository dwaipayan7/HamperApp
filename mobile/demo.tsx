// // function findMaxDifference(arr: number[]) {
// //   if (arr.length < 2) {
// //     return 0;
// //   }

// import { constructFrom } from "date-fns";

// //   let minValue = arr[0];
// //   let maxValue = arr[0];

// //   for (let i = 0; i < arr.length; i++) {
// //     if (arr[i] < minValue) {
// //       minValue = arr[i];
// //     } else if (arr[i] > maxValue) {
// //       maxValue = arr[i];
// //     }
// //   }

// //   return console.log(maxValue - minValue);
// // }

// // var array = [12, 3, 45, 6, 99];
// // findMaxDifference(array);

// // console.log(a);
// // var a = 10;

// // function outer() {
// //   let count = 0;

// //   return function inner() {
// //     count++;
// //     return count;
// //   };
// // }

// // const fn = outer();

// // console.log(fn());
// // console.log(fn());

// (function (a, b) {
//   console.log(a + b);
// })(5, 10);

// const user = {
//   username: "dwaipayan",
//   price: 999,

//   welcomeMessage: function () {
//     console.log(`${this.username}, welcome to the website`);
//     console.log(this);
//   },
// };

// // user.welcomeMessage();
// // user.username = "Tatay";
// // user.welcomeMessage();

// console.log(this);

// const chai = () => {
//   let username = "Dwaipayan";
//   // console.log(this.username);
//   console.log(this);
// };

// chai();

// const addTwo = (num1: number, num2: number) => {
//   return num1 + num2;
// };

// console.log(addTwo(5, 8));



import {
    FlatList, Text, TextInput, TouchableOpacity,
    useWindowDimensions, View
} from 'react-native'
import React, { useState } from 'react'
import Animated, {
    useAnimatedStyle, useSharedValue, withSpring, runOnJS
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import EmojiPicker, { codePointToEmoji } from '../components/EmojiPicker';
// import EmojiPicker, { emojisByCategory } from 'rn-emoji-keyboard';

interface ListItemProps {
    id: string;
    dir: 'left' | 'right';
    msg: string;
    reaction?: string;
    onSwipeToReply: (id: string) => void;
    onEmojiReact: (emoji: string) => void;
}

const ListItem = ({ id, dir, msg, reaction, onSwipeToReply, onEmojiReact }: ListItemProps) => {
    const { width } = useWindowDimensions();
    const translateX = useSharedValue(0);
    const isDragging = useSharedValue(false);

    const [isEmojiOpen, setIsEmojiOpen] = useState(false);

    const openPicker = () => setIsEmojiOpen(true);

    const panGesture = Gesture.Pan()
        .onBegin(() => {
            isDragging.value = true;
        })
        .onUpdate((e) => {

            if (dir === 'left') {
                translateX.value = Math.max(0, Math.min(e.translationX, 80));
            } else {
                translateX.value = Math.min(0, Math.max(e.translationX, -80));
            }
        })
        .onEnd(() => {
            if (Math.abs(translateX.value) >= 80) {
                runOnJS(onSwipeToReply)(id);
            }
            isDragging.value = false;
            translateX.value = withSpring(0);
        });

    const longPress = Gesture.LongPress()
        .minDuration(500)
        .onStart(() => {
            runOnJS(openPicker)();
        });

    const gesture = Gesture.Simultaneous(longPress, panGesture);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
        opacity: isDragging.value ? 0.8 : 1,
    }));

    const iconStyle = useAnimatedStyle(() => ({
        opacity: Math.min(Math.abs(translateX.value) / 50, 1),
        transform: [{ scale: Math.min(Math.abs(translateX.value) / 50, 1) }],
    }));

    return (
        <>

            <GestureDetector gesture={gesture}>
                <Animated.View
                    style={[
                        { width, minHeight: 70, paddingHorizontal: 10, paddingVertical: 8, justifyContent: 'center' },
                        animatedStyle,
                    ]}
                >
                    {/* Swipe-to-reply arrow icon */}
                    <Animated.View
                        style={[
                            {
                                position: 'absolute',
                                left: dir === 'left' ? 20 : undefined,
                                right: dir === 'right' ? 20 : undefined,
                            },
                            iconStyle,
                        ]}
                    >
                        <Text style={{ fontSize: 24 }}>↩️</Text>
                    </Animated.View>

                    {/* Message bubble + emoji reaction badge */}
                    <View style={{ alignSelf: dir === 'left' ? 'flex-start' : 'flex-end' }}>
                        <Text
                            style={{
                                backgroundColor: dir === 'left' ? '#d4d4d4' : '#567dff',
                                paddingHorizontal: 20,
                                paddingVertical: 10,
                                borderRadius: 20,
                                color: dir === 'left' ? 'black' : 'white',
                                fontWeight: '600',
                                fontSize: 18,
                            }}
                        >
                            {msg}
                        </Text>

                        {reaction ? (
                            <View
                                style={{
                                    alignSelf: dir === 'left' ? 'flex-start' : 'flex-end',
                                    backgroundColor: 'white',
                                    borderRadius: 12,
                                    paddingHorizontal: 6,

                                    paddingVertical: 2,
                                    marginTop: -10,
                                    // marginLeft: dir === 'left' ? 8 : 0,
                                    // marginRight: dir === 'right' ? 8 : 0,
                                    elevation: 3,
                                    shadowColor: '#000',
                                    shadowOpacity: 0.12,
                                    shadowRadius: 3,
                                    shadowOffset: { width: 0, height: 1 },
                                }}
                            >
                                <Text style={{ fontSize: 18 }}>{codePointToEmoji(reaction)}</Text>
                            </View>
                        ) : null}
                    </View>
                </Animated.View>
            </GestureDetector>

            {/* <EmojiPicker
 defaultHeight={'40%'}
 open={isEmojiOpen}
 onClose={() => setIsEmojiOpen(false)}
 onEmojiSelected={(emojiObject) => {
 onEmojiReact(id, emojiObject.emoji);
 setIsEmojiOpen(false);
 }}
 enableSearchAnimation
 enableSearchBar
 // emojisByCategory={customEmojisByCategory}
 /> */}

            <EmojiPicker
                show={isEmojiOpen}
                close={() => setIsEmojiOpen(false)}
                onSelect={(emoji) => {

                    console.log("The Selected Emoji is: ", emoji);

                    onEmojiReact(emoji);
                    setIsEmojiOpen(false);
                }}
            />
        </>
    );
};

const DATA = [
    { id: '1', dir: 'left' as const, msg: 'hello' },
    { id: '2', dir: 'right' as const, msg: 'hi there' },
    { id: '3', dir: 'left' as const, msg: 'how are you' },
    { id: '4', dir: 'right' as const, msg: 'good !' },
];

const SwipeReply = () => {
    const [replyEnabled, setReplyEnabled] = useState(false);
    const [replyMsg, setReplyMsg] = useState('');
    const [msgText, setMsgText] = useState('');

    const [reactions, setReactions] = useState<Record<string, string>>({});

    const handleEmojiReact = (id: string, emoji: string) => {
        setReactions(prev => ({
            ...prev,
            [id]: emoji,
        }));
    };

    // Resolve the replied message text from its id
    const replyMsgText = DATA.find((d) => d.id === replyMsg)?.msg ?? '';

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <FlatList
                data={DATA}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ListItem
                        id={item.id}
                        dir={item.dir}
                        msg={item.msg}
                        reaction={reactions[item.id]}
                        onSwipeToReply={(id) => { setReplyEnabled(true); setReplyMsg(id); }}
                        onEmojiReact={(emoji) => handleEmojiReact(item.id, emoji)}
                    />
                )}
                contentContainerStyle={{ paddingTop: 100 }}
            />

            {replyEnabled && (
                <View style={{ width: '100%', backgroundColor: '#c5ff09', padding: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 10 }}>
                        <Text style={{ color: 'black', fontSize: 16 }}>Reply to friend</Text>
                        <TouchableOpacity onPress={() => setReplyEnabled(false)}>
                            <Text>✕</Text>
                        </TouchableOpacity>
                    </View>
                    <Text
                        style={{
                            color: 'black', fontSize: 14, backgroundColor: '#c1c1c1',
                            borderRadius: 8, paddingHorizontal: 8, paddingVertical: 6, marginTop: 4,
                        }}
                    >
                        {replyMsgText}
                    </Text>
                </View>
            )}

            <View
                style={{
                    width: '100%', minHeight: 60, backgroundColor: 'white',
                    flexDirection: 'row', alignItems: 'center',
                    paddingHorizontal: 12, paddingVertical: 8,
                    borderTopWidth: 1, borderTopColor: '#E5E7EB', marginBottom: 20,
                }}
            >
                <TextInput
                    placeholder="Write here..."
                    value={msgText}
                    onChangeText={setMsgText}
                    multiline
                    style={{
                        flex: 1, maxHeight: 120, backgroundColor: '#F3F4F6',
                        borderRadius: 25, paddingHorizontal: 16, paddingVertical: 10, fontSize: 16,
                    }}
                />
                <TouchableOpacity
                    style={{
                        marginLeft: 10, width: 45, height: 45, borderRadius: 22.5,
                        justifyContent: 'center', alignItems: 'center', backgroundColor: '#567dff',
                    }}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>➤</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SwipeReply;