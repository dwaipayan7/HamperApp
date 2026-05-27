import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useCreatePost } from '@/hooks/useCreatePost';
import { Image } from 'expo-image'
import { useUser } from '@clerk/expo';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';
import { SCTextInput } from '@/utils/CustomInputStore';
import SCText from './CustomText';

const PostComponent = () => {
    const MIN_HEIGHT = 40;
    const MAX_HEIGHT = 140;
    const [inputHeight, setInputHeight] = useState(MIN_HEIGHT);

    console.log("The input height is: ", inputHeight);


    const {

        content,
        setContent,
        isCreating,
        pickImageFromGallery,
        takePhoto,
        removeImage,
        createPost,
        selectedImage,


    } = useCreatePost();

    const { user } = useUser()

    return (
        <View
            style={{

                paddingVertical: 11,
                paddingHorizontal: 12,
                borderBottomWidth: 0.2,
                borderBottomColor: "#E5E7EB",
                borderTopWidth: 0.2,
                borderColor: COLORS.divider2,

            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    gap: 12,
                    alignItems: 'flex-start',
                }}
            >
                <Image
                    source={{ uri: user?.imageUrl }}
                    contentFit="cover"
                    style={{
                        height: 48,
                        width: 48,
                        borderRadius: 48 / 2,
                        backgroundColor: "#ddd",
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                />

                <View style={{ flex: 1 }}>
                    <TextInput
                        placeholder="What's happening?"
                        placeholderTextColor="#657786"
                        multiline
                        value={content}
                        onChangeText={setContent}
                        maxLength={280}
                        textAlignVertical="top"
                        scrollEnabled={inputHeight >= MAX_HEIGHT}
                        onContentSizeChange={(event) => {
                            const height = event.nativeEvent.contentSize.height;

                            setInputHeight(
                                Math.min(MAX_HEIGHT, Math.max(MIN_HEIGHT, height))
                            );
                        }}
                        style={{
                            fontSize: 16,
                            color: "#000",

                            minHeight: MIN_HEIGHT,
                            maxHeight: MAX_HEIGHT,
                            height: inputHeight,

                            backgroundColor: COLORS.white,
                            borderRadius: 6,

                            paddingHorizontal: 10,
                            paddingVertical: 10,
                        }}
                    />
                </View>
            </View>

            {selectedImage && (
                <View style={{ marginTop: 15 }}>
                    <View
                        style={{
                            position: "relative",
                        }}
                    >
                        <Image
                            source={{ uri: selectedImage }}
                            contentFit="cover"
                            style={{
                                width: "100%",
                                height: 250,
                                borderRadius: 16,
                                backgroundColor: "#ddd",
                            }}
                        />

                        <TouchableOpacity
                            onPress={removeImage}
                            style={{
                                position: "absolute",
                                top: 10,
                                right: 10,
                                backgroundColor: "rgba(0,0,0,0.6)",
                                width: 30,
                                height: 30,
                                borderRadius: 15,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <SCText
                                color='white'
                                size={16}
                                varient='medium'
                            // style={{
                            //     color: "white",
                            //     fontSize: 16,
                            //     fontWeight: "700",
                            // }}
                            >
                                ×
                            </SCText>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                <View style={{ flexDirection: 'row', gap: 15, marginTop: 15 }}>

                    <TouchableOpacity onPress={pickImageFromGallery}>
                        <Feather name='image' size={20} color={'#1da1f2'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={takePhoto}>
                        <Feather name='camera' size={20} color={'#1da1f2'} />
                    </TouchableOpacity>

                </View>
                <TouchableOpacity style={{
                    paddingVertical: 6, paddingHorizontal: 12,
                    backgroundColor: selectedImage ? '#3B82F6' : '#F3F4F6',
                    marginTop: 4,
                    borderRadius: 12
                }}
                    onPress={createPost}
                    disabled={isCreating || !(content.trim() || selectedImage)}
                >
                    {isCreating ? (
                        <ActivityIndicator size={'small'} color={'white'} />
                    ) : (
                        <Text style={{
                            fontWeight: '700',
                            color: content.trim() || selectedImage ? "#FFFFFF" : '#6B7280'
                        }}>
                            Post

                        </Text>
                    )}

                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PostComponent;

const styles = StyleSheet.create({});