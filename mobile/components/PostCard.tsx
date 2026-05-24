import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Post, User } from '@/types';
import { Image } from 'expo-image';
import { formatDate, formatNumber } from '@/utils/formatters';
import { AntDesign, Feather } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';

interface PostCardProps {
    post: Post;
    onLike: (postId: string) => void;
    onDelete: (postId: string) => void;
    isLiked?: boolean;
    currentUser?: User | null;
}

const PostCard = ({
    post,
    onLike,
    onDelete,
    currentUser,
    isLiked
}: PostCardProps) => {

    console.log("Liked Data is: ", isLiked);
    console.log("Liked Data is: ", post.likes?.length);


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
                    onPress: () => onDelete(post._id)
                }
            ]
        );
    };

    return (
        <View style={{
            borderColor: '#F3F4F6',
            borderWidth: 0.6,
            backgroundColor: 'white'

        }}>
            <View style={{ flexDirection: 'row', }}>


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
                            <Text style={{
                                fontWeight: '800',

                            }}>
                                {post.user.firstName}  {post.user.lastName}
                            </Text>
                            <Text style={{ marginLeft: 10, color: '#6B7280' }}>
                                @{post.user.username}·{formatDate(post.createdAt)}
                            </Text>
                        </View>
                        {isOwnPost && (
                            <TouchableOpacity onPress={handleDelete}>
                                <Feather name='trash' size={20} color={'#657786'} />
                            </TouchableOpacity>
                        )}
                    </View>

                    {post.content && (
                        <Text
                            style={{ color: '#1a202c', fontWeight: '600' }}
                        >{post.content}

                        </Text>
                    )}

                    {post.image && (
                        <Image
                            source={{ uri: post.image }}
                            style={{ height: 200, width: '100%', marginTop: '5%', borderRadius: 12, }}
                            contentFit='cover'
                        />
                    )}

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', paddingVertical: 10 }}>

                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }} onPress={() => { }}>

                            <Feather name='message-circle' size={24} color={'#657786'} />
                            <Text style={{ color: COLORS.gray500, fontSize: 14, }}>
                                {formatNumber(post.comments?.length || 0)}
                            </Text>
                        </TouchableOpacity>


                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }} onPress={() => { }}>

                            <Feather name='repeat' size={24} color={'#657786'} />
                            <Text style={{ color: COLORS.gray500, fontSize: 14, }}>
                                {formatNumber(post.comments?.length || 0)}
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


                        <TouchableOpacity>

                            <Feather name='share' size={24} color={'#657786'} />

                        </TouchableOpacity>

                    </View>

                    <View>

                    </View>

                </View>



            </View>
        </View>
    );
};

export default PostCard;

const styles = StyleSheet.create({});