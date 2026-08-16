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
import { globalStyles } from '@/utils/globalStyles';
import RequestRepostModal from '@/modal/RequestRepostModal';
import { useFollowUser } from '@/services/PostService';
import { getUserProfileByUsername } from '@/services/UserService';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
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

    // console.log("Liked Data is: ", isLiked);
    // console.log("Liked Data is: ", post.likes?.length);

    const [isImageView, setIsImageView] = useState<boolean>(false)
    const [showModal, setShowModal] = useState<boolean>(false)
    const { mutateAsync: followUser, isPending: isFollowing } = useFollowUser();

    const isOwnPost = post?.user?._id === currentUser?._id;
    // const isFollowingUser = currentUser?.following?.includes(post.user._id);
    const isFollowingUser = currentUser?.following?.includes(post.user._id);

    // const [selectUsername, setSelectUsername] = useState<string>("")


    // const { data: getUserProfileDetails } = getUserProfileByUsername(post?.user?.username);

    // console.log("The User Profile Details is: ", getUserProfileDetails);


    const isOwnProfile = currentUser?.username === post?.user?.username;

    const router = useRouter();

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

    // const navigation = useNavigation();

    const navigate = () => {
        return router.push({
            pathname: isOwnPost ? '/(drawer)/(tabs)/profile' : '/profile-details', params: {
                username: post?.user?.username,
                source: "post",
            }
        })


        // return navigation.navigate('/drawer')
    }

    return (
        <View style={{ borderColor: COLORS.divider2, paddingHorizontal: 12 }}>
            <Loader show={isDeleting || false} />
            <View style={{ flexDirection: 'row', borderBottomWidth: 0.2, borderColor: COLORS.divider2 }}>


                <TouchableOpacity style={{ flexDirection: 'row', paddingTop: 12, }} activeOpacity={0.8} onPress={navigate} >

                    <Image
                        source={{ uri: post.user.profilePicture || "" }}
                        style={{
                            height: 48,
                            width: 48,
                            borderRadius: 48 / 2
                        }}
                    />
                </TouchableOpacity>
                <View style={{ flex: 1, marginTop: 20, marginLeft: 10 }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>


                        <View style={{ ...globalStyles.rowBetweeen, gap: 5 }}>
                            <TouchableOpacity activeOpacity={0.8} onPress={navigate} style={{ alignItems: 'flex-start' }}>
                                <SCText varient='medium' color={COLORS.white}>
                                    {post.user.firstName}  {post.user.lastName}
                                </SCText>
                                <SCText color='#6B7280' >
                                    @{post.user.username}
                                </SCText>

                                {post.repostOf && (
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            gap: 5,
                                            marginBottom: 4,
                                            marginTop: 4,
                                        }}
                                    >
                                        <Feather
                                            name="repeat"
                                            size={14}
                                            color={COLORS.gray500}
                                        />

                                        <SCText color={COLORS.gray500}>
                                            {post.user.firstName} reposted
                                        </SCText>
                                    </View>
                                )}
                            </TouchableOpacity>
                            {!isOwnPost && <TouchableOpacity
                                disabled={isFollowing}
                                onPress={() => followUser(post.user._id)}
                            >
                                <SCText
                                    color={isFollowingUser ? COLORS.gray500 : COLORS.lightBlue}
                                    size={14}
                                    varient='bold'
                                >
                                    {isFollowing ? '...' : isFollowingUser ? 'Following' : 'Follow'}
                                </SCText>

                            </TouchableOpacity>}
                            <SCText style={{}} color={COLORS.gray400}>
                                • {formatDate(post.createdAt)}
                            </SCText>
                        </View>
                        {isOwnPost && (
                            <TouchableOpacity onPress={handleDelete}>
                                <Feather name='trash' size={20} color={COLORS.redColor} />
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


                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }} onPress={() => setShowModal(true)}>

                            <Feather name='repeat' size={24} color={'#657786'} />
                            <Text style={{ color: COLORS.gray500, fontSize: 14, }}>
                                {post?.repostCount || 0}
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

            <RequestRepostModal
                show={showModal}
                close={() => setShowModal(false)}
                postId={post._id}
            />
        </View >
    );
};

export default PostCard;

const styles = StyleSheet.create({});