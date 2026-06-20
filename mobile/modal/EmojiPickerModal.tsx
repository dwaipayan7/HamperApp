import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import LottieView from 'lottie-react-native';
import { SCTextInput } from '@/utils/CustomInputStore';
import { deviceWidth } from '@/utils/AllContext';

export const codePointToEmoji = (codepoint: string) => {
    return String.fromCodePoint(parseInt(codepoint, 16));
};

const EmojiPicker = ({ show, close, onSelect }: {
    show: boolean, close: () => void, onSelect: (emoji: any) => void
}) => {

    // const [showEmojiPicker, setShowEmojiPicker] = useState(false); 

    // const [selectedEmoji, setSelectedEmoji] = useState<any>(null); 

    const [emojis, setEmojis] = useState<any[]>([]);

    const fetchNotoEmojis = async () => {
        const response = await fetch(
            'https://googlefonts.github.io/noto-emoji-animation/data/api.json'
        );

        const data = await response.json();

        console.log(data);
        return data.icons;
    };

    useEffect(() => {
        fetchNotoEmojis().then(setEmojis);
    }, []);

    return (
        <Modal
            visible={show}
            transparent
            animationType="slide"
            onRequestClose={close}
            onDismiss={close}
        >

            <View
                style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    backgroundColor: 'rgba(0,0,0,0.4)',
                }}
            >
                <View
                    style={{
                        height: 400,
                        backgroundColor: 'white',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        alignItems: 'center',
                        paddingTop: 20
                    }}
                >

                    <SCTextInput
                        wrapperStyle={{ width: deviceWidth - 40 }}
                        placeholder='Search Emoji'
                    />

                    <FlatList
                        data={emojis}
                        numColumns={9}
                        keyExtractor={(item) => item.codepoint}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => {
                                    // onSelect(item); 
                                    onSelect(item.codepoint);
                                    close();
                                }}
                            >

                                <Text style={{ fontSize: 35 }}>
                                    {codePointToEmoji(item.codepoint)}
                                </Text>

                                {/* <Text style={{ fontSize: 32 }}> 
 {item.emoji} 
 </Text> */}
                                {/* <LottieView 
 source={{ uri: item?.animation }} 
 autoPlay 
 loop 
 style={{ 
 width: 60, 
 height: 60, 
 }} 
 /> */}
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>

        </Modal>
    )
}

export default EmojiPicker

const styles = StyleSheet.create({})