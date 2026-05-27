import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Post, User } from '@/types';
import { Image, } from 'expo-image';
import { formatDate, formatNumber } from '@/utils/formatters';
import ImageViewing from 'react-native-image-viewing';
import { AntDesign, Feather } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';
import SCText from './CustomText';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import Loader from './Loader';
interface PostCardProps {
    post: Post;
    onLike: (postId: string) => void;
    onDelete: (postId: string) => Promise<void>;
    isLiked?: boolean;
    currentUser?: User | null;
    onComment: (post: Post) => void;
    isDeleting?: boolean;
}

const PostCard = ({
    post,
    onLike,
    onDelete,
    currentUser,
    isLiked,
    onComment,
    isDeleting
}: PostCardProps) => {

    console.log("Liked Data is: ", isLiked);
    console.log("Liked Data is: ", post.likes?.length);

    const [isImageView, setIsImageView] = useState<boolean>(false)
    const [showLoader, setIsLoader] = useState<boolean>(false)




    const isOwnPost =
        post?.user?._id === currentUser?._id;

    const handleDelete = () => {
        Alert.alert(
            "Delete Post",
            "Are you sure you want to delete this post?",
            [
                {
                    text: "Cancel",
                    style: 'cancel'
                },
                {
                    text: "Delete",
                    style: 'destructive',
                    onPress: async () => {
                        // try {
                        //     setIsLoader(true);

                        //     await onDelete(post._id);

                        // } catch (error) {
                        //     console.log(error);
                        // } finally {
                        //     setIsLoader(false);
                        // }

                        await onDelete(post._id)
                    }
                }
            ]
        );
    };


    const shareImage = async (imageUrl: string) => {
        try {

            const fileUri =
                `${FileSystem} post-image.jpg`;

            const downloadedFile = await FileSystem.downloadAsync(
                imageUrl,
                fileUri
            );

            // Open native share sheet
            await Sharing.shareAsync(downloadedFile.uri, {
                mimeType: 'image/jpeg',
                dialogTitle: 'Share Image',
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={{ borderColor: COLORS.divider2 }}>
            <Loader show={isDeleting || false} />
            <View style={{ flexDirection: 'row', borderBottomWidth: 0.2, borderColor: COLORS.divider2 }}>


                <View style={{ flexDirection: 'row', padding: 20, paddingLeft: 12 }}>
                    <Image
                        source={{ uri: post.user.profilePicture || "" }}
                        style={{
                            height: 48,
                            width: 48,
                            borderRadius: 48 / 2
                        }}
                    />
                </View>
                <View style={{ flex: 1, marginTop: 20, marginRight: 12 }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <SCText varient='medium' color={COLORS.white}>
                                {post.user.firstName}  {post.user.lastName}
                            </SCText>
                            <SCText color='#6B7280' style={{ marginLeft: 10, }}>
                                @{post.user.username}·{formatDate(post.createdAt)}
                            </SCText>
                        </View>
                        {isOwnPost && (
                            <TouchableOpacity onPress={handleDelete}>
                                <Feather name='trash' size={20} color={'#657786'} />
                            </TouchableOpacity>
                        )}
                    </View>

                    {post.content && (
                        <SCText
                            color={COLORS.white}
                        >{post.content}

                        </SCText>
                    )}

                    {post.image && (
                        <>

                            <TouchableOpacity activeOpacity={0.8} onPress={() => setIsImageView(true)}>

                                <Image
                                    source={{ uri: post.image }}
                                    style={{ height: 200, width: '100%', marginTop: '5%', borderRadius: 12, }}
                                    contentFit='cover'
                                />
                            </TouchableOpacity>

                            <ImageViewing
                                images={[{ uri: post.image }]}
                                imageIndex={0}
                                visible={isImageView}
                                onRequestClose={() => setIsImageView(false)}
                                presentationStyle='fullScreen'
                                backgroundColor={COLORS.neutralColor}
                            />
                        </>

                    )}

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', paddingVertical: 10 }}>

                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }} onPress={() => onComment(post)}>

                            <Feather name='message-circle' size={24} color={'#657786'} />
                            <Text style={{ color: COLORS.gray500, fontSize: 14, }}>
                                {formatNumber(post.comments?.length || 0)}
                            </Text>
                        </TouchableOpacity>


                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }} onPress={() => { }}>

                            <Feather name='repeat' size={24} color={'#657786'} />
                            <Text style={{ color: COLORS.gray500, fontSize: 14, }}>
                                0
                            </Text>
                        </TouchableOpacity>


                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }} onPress={() => onLike(post._id)}>

                            {
                                isLiked ? (
                                    <AntDesign name='heart' size={24} color={COLORS.redColor} />
                                ) : (
                                    <Feather name='heart' size={24} color={'#657786'} />
                                )
                            }

                            <Text style={{ fontSize: 14, color: isLiked ? COLORS.textColorRed : COLORS.gray500 }}>
                                {formatNumber(post.likes?.length || 0)}
                            </Text>

                        </TouchableOpacity>


                        <TouchableOpacity
                            onPress={() => {
                                if (post.image) {
                                    shareImage(post.image);
                                }
                            }}
                        >
                            <Feather name='share' size={24} color={'#657786'} />
                        </TouchableOpacity>

                    </View>

                    <View>

                    </View>

                </View>



            </View>
        </View >
    );
};

export default PostCard;

const styles = StyleSheet.create({});