import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useState } from 'react';
import { Image } from 'expo-image';
import { useUser } from '@clerk/expo';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';
import SCText from './CustomText';
import * as ImagePicker from 'expo-image-picker';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useCreatePost } from '@/services/PostService';
import { setMessage } from '@/redux/slices/snackbarSlice';
import { showMessage } from '@/utils/AllContext';

const PostComponent = () => {
    const MIN_HEIGHT = 40;
    const MAX_HEIGHT = 140;

    const [inputHeight, setInputHeight] =
        useState(MIN_HEIGHT);

    const [selectedImage, setSelectedImage] =
        useState<string | null>(null);

    const { user } = useUser();

    const { mutateAsync, isPending } =
        useCreatePost();

    const validationSchema = yup.object().shape({
        content: yup.string(),
    });

    const handleImagePicker = async (
        useCamera: boolean = false
    ) => {
        const permissionResult = useCamera
            ? await ImagePicker.requestCameraPermissionsAsync()
            : await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.status !== 'granted') {
            Alert.alert(
                'Permission needed',
                `Please grant permission`
            );
            return;
        }

        const pickerOptions = {
            allowsEditing: true,
            aspect: [16, 9] as [number, number],
            quality: 0.8,
        };

        const result = useCamera
            ? await ImagePicker.launchCameraAsync(
                pickerOptions
            )
            : await ImagePicker.launchImageLibraryAsync({
                ...pickerOptions,
                mediaTypes:
                    ImagePicker.MediaTypeOptions.Images,
            });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    return (
        <Formik
            initialValues={{ content: '' }}
            validationSchema={validationSchema}
            onSubmit={async (
                values,
                { resetForm }
            ) => {
                try {
                    const response = await mutateAsync({
                        content: values.content,
                        imageUri:
                            selectedImage || undefined,
                    });


                    if (response) {
                        showMessage("Post added successfully", 'success')
                    }
                    resetForm();
                    setSelectedImage(null);
                    setInputHeight(MIN_HEIGHT);
                } catch (error) {
                    console.log(error);
                }
            }}
        >
            {({
                handleChange,
                handleSubmit,
                values,
                setFieldValue
            }) => (
                <View
                    style={{
                        paddingVertical: 11,
                        paddingHorizontal: 12,
                        borderBottomWidth: 0.2,
                        borderBottomColor: '#E5E7EB',
                        borderTopWidth: 0.2,
                        borderColor: COLORS.divider2,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
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
                                borderRadius: 24,
                                backgroundColor: '#ddd',
                            }}
                        />

                        <View style={{ flex: 1 }}>
                            <TextInput
                                autoCorrect
                                placeholder="What's happening?"
                                placeholderTextColor={COLORS.lightGray}
                                multiline
                                value={values.content}
                                onChangeText={(text) => {
                                    handleChange('content')(text);

                                    if (text.trim().length === 0) {
                                        setInputHeight(MIN_HEIGHT);
                                    }
                                }}
                                maxLength={280}
                                textAlignVertical="top"
                                scrollEnabled={inputHeight >= MAX_HEIGHT}
                                onContentSizeChange={(event) => {
                                    const height =
                                        event.nativeEvent.contentSize.height;

                                    setInputHeight(
                                        Math.min(
                                            MAX_HEIGHT,
                                            Math.max(MIN_HEIGHT, height)
                                        )
                                    );
                                }}
                                style={{
                                    fontSize: 16,
                                    color: '#000',
                                    minHeight: inputHeight,
                                    maxHeight: MAX_HEIGHT,
                                    backgroundColor: COLORS.white,
                                    borderRadius: 6,
                                    paddingHorizontal: 10,
                                    paddingTop: 10,
                                    paddingBottom: 10,
                                }}
                            />
                        </View>
                    </View>

                    {selectedImage && (
                        <View
                            style={{ marginTop: 15 }}
                        >
                            <View
                                style={{
                                    position: 'relative',
                                }}
                            >
                                <Image
                                    source={{
                                        uri: selectedImage,
                                    }}
                                    contentFit="cover"
                                    style={{
                                        width: '100%',
                                        height: 250,
                                        borderRadius: 16,
                                        backgroundColor:
                                            '#ddd',
                                    }}
                                />

                                <TouchableOpacity
                                    onPress={() =>
                                        setSelectedImage(
                                            null
                                        )
                                    }
                                    style={{
                                        position:
                                            'absolute',
                                        top: 10,
                                        right: 10,
                                        backgroundColor:
                                            'rgba(0,0,0,0.6)',
                                        width: 30,
                                        height: 30,
                                        borderRadius: 15,
                                        justifyContent:
                                            'center',
                                        alignItems:
                                            'center',
                                    }}
                                >
                                    <SCText
                                        color="white"
                                        size={16}
                                        varient="medium"
                                    >
                                        ×
                                    </SCText>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent:
                                'space-between',
                            marginTop: 15,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                gap: 15,
                                marginTop: 15,
                            }}
                        >
                            <TouchableOpacity
                                onPress={() =>
                                    handleImagePicker(
                                        false
                                    )
                                }
                            >
                                <Feather
                                    name="image"
                                    size={20}
                                    color={'#1da1f2'}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() =>
                                    handleImagePicker(
                                        true
                                    )
                                }
                            >
                                <Feather
                                    name="camera"
                                    size={20}
                                    color={'#1da1f2'}
                                />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={{
                                paddingVertical: 6,
                                paddingHorizontal: 12,
                                backgroundColor:
                                    values.content.trim() ||
                                        selectedImage
                                        ? '#3B82F6'
                                        : '#F3F4F6',
                                marginTop: 4,
                                borderRadius: 12,
                            }}
                            onPress={() =>
                                handleSubmit()
                            }
                            disabled={
                                isPending ||
                                !(
                                    values.content.trim() ||
                                    selectedImage
                                )
                            }
                        >
                            {isPending ? (
                                <ActivityIndicator
                                    size="small"
                                    color="white"
                                />
                            ) : (
                                <SCText
                                    varient="semibold"
                                    color={
                                        values.content.trim() ||
                                            selectedImage
                                            ? COLORS.white
                                            : COLORS
                                                .lightGray
                                    }
                                >
                                    Post
                                </SCText>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </Formik>
    );
};

export default PostComponent;

const styles = StyleSheet.create({});