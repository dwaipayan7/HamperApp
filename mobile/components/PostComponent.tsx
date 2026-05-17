import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useCreatePost } from '@/hooks/useCreatePost';
import { Image } from 'expo-image'
import { useUser } from '@clerk/expo';
import { Feather } from '@expo/vector-icons';

const PostComponent = () => {

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
                backgroundColor: "#fff",
                paddingVertical: 4,
                paddingHorizontal: 12,
                borderBottomWidth: 1,
                borderBottomColor: "#E5E7EB",
                borderWidth: 1,
                borderColor: "#ccc",
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    gap: 12,
                    alignItems: 'center'
                }}
            >
                <Image
                    source={{ uri: user?.imageUrl }}
                    contentFit="cover"
                    style={{
                        height: 58,
                        width: 58,
                        borderRadius: 29,
                        backgroundColor: "#ddd",
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
                        style={{
                            fontSize: 16,
                            // minHeight: 80,
                            color: "#000",
                        }}
                    />
                </View>
            </View>

            {selectedImage && (
                <View style={{ marginTop: 12 }}>
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
                            <Text
                                style={{
                                    color: "white",
                                    fontSize: 16,
                                    fontWeight: "700",
                                }}
                            >
                                ×
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', gap: 15, marginTop: 4 }}>

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