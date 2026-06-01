import { ActivityIndicator, Alert, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native';
import { useLocalSearchParams, router, useRouter } from 'expo-router';
import { getUserProfileByUsername } from '@/services/UserService';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import GradientWrapper from '@/components/GradientWrapper';
import Header from '@/components/Header';
import { usePosts } from '@/hooks/usePosts';
import { Image } from 'expo-image'
import { COLORS } from '@/constants/colors';
import SCText from '@/components/CustomText';
import { Feather } from '@expo/vector-icons';
import dayjs from 'dayjs';
import PostsList from '@/components/PostsList';
import ImagePreviewModal from '@/modal/ImagePreviewModal';
import { useFollowUser } from '@/services/PostService';
import FollowingFollowersModal from '@/modal/FollowingFollowersModal';
import { useCurrentUser } from '@/hooks/useCurrentUser';

const ProfileDetails = () => {

    // console.log("Ther username is: ", username);

    // const route = useRoute()
    // console.log('Route Params:', route.params);

    // const { username } = route.params as {
    //     username: string;
    // };

    const { username } = useLocalSearchParams<{ username: string }>();
    console.log('The username is:', username);

    const { data: getUserProfileDetails, isLoading: isLoadingProfileDetails, refetch: onRefetchUserProfileData } = getUserProfileByUsername(username);

    console.log("The User Profile Details is: ", getUserProfileDetails);


    const { currentUser } = useCurrentUser();

    const { posts: userPosts, } = usePosts(username);
    const { mutateAsync: followUser, isPending: isFollowing } = useFollowUser();


    const insets = useSafeAreaInsets();

    const router = useRouter();

    const [visibleModal, setVisibleModal] = useState<boolean>(false)

    const [isViewFollowers, setViewFollowers] = useState<boolean>(false)
    const [isViewFollowing, setViewFollowing] = useState<boolean>(false)

    const isFollowingUser = currentUser?.following?.includes(getUserProfileDetails?._id);




    // console.log("The User Profile Details is: ", getUserProfileDetails);


    const handleFollow = async (targetUserId: string) => {

        await followUser(targetUserId);

        await Promise.all([
            onRefetchUserProfileData()
        ])

    }


    return (
        <GradientWrapper hideGlow style={{ flex: 1 }}>
            <SafeAreaView>

                <Header
                    showBackButton
                    onBack={() => router.back()}
                    leftTitle={`${getUserProfileDetails?.firstName} ${getUserProfileDetails?.lastName}`}

                    isUserPosts
                    userPosts={userPosts?.length}
                />

                <View >
                    <FlatList
                        data={getUserProfileDetails ? [getUserProfileDetails] : []}
                        renderItem={({ item, index }) => {

                            // console.log("The Item is: ", item);


                            return (
                                <View key={index}>
                                    <Image
                                        source={{
                                            uri:
                                                item.bannerImage ||
                                                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
                                        }}
                                        contentFit='cover'
                                        style={{
                                            height: 200,
                                            width: '100%'
                                        }}
                                    />

                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'flex-start',
                                            justifyContent: 'space-between',
                                            paddingHorizontal: 16,
                                        }}
                                    >
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            style={{
                                                marginTop: -50,
                                                padding: 4,
                                                borderRadius: 999,
                                                borderWidth: 2,
                                                borderColor: COLORS.gray100,

                                            }}

                                            onPress={() => setVisibleModal(true)}
                                        >
                                            <Image
                                                source={{ uri: getUserProfileDetails?.profilePicture }}
                                                style={{
                                                    width: 100,
                                                    height: 100,
                                                    borderRadius: 50,
                                                }}
                                                contentFit="cover"
                                            />
                                        </TouchableOpacity>

                                        {/* <TouchableOpacity
                                            style={{
                                                marginTop: 12,
                                                paddingVertical: 8,
                                                paddingHorizontal: 16,
                                                borderWidth: 1,
                                                borderColor: COLORS.white,
                                                borderRadius: 20,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        // onPress={() => setIsModal(true)}
                                        >
                                            <SCText
                                                varient="semibold"
                                                color={COLORS.white}
                                            >
                                                Edit Profile
                                            </SCText>
                                        </TouchableOpacity> */}

                                        <TouchableOpacity
                                            disabled={isFollowing}
                                            onPress={() => handleFollow(item._id)}
                                            style={{
                                                backgroundColor: isFollowingUser
                                                    ? "transparent"
                                                    : COLORS.lightBlue,

                                                borderWidth: isFollowingUser ? 1 : 0,
                                                borderColor: COLORS.gray500,

                                                paddingHorizontal: 16,
                                                paddingVertical: 8,
                                                borderRadius: 20,
                                                minWidth: 95,
                                                alignItems: "center",
                                                marginTop: 10
                                            }}
                                        >
                                            {isFollowing ? <ActivityIndicator
                                                size={'small'}
                                                color={'white'}
                                            /> : <SCText
                                                color={
                                                    isFollowingUser
                                                        ? COLORS.white
                                                        : COLORS.white
                                                }
                                                varient="semibold"
                                            >
                                                {isFollowingUser
                                                    ? "Following"
                                                    : "Follow"}
                                            </SCText>}
                                        </TouchableOpacity>



                                    </View>
                                    <View style={{ paddingHorizontal: 12, }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 15, marginBottom: 8 }}>

                                            <SCText varient='bold' size={18} color={COLORS.white}>
                                                {item?.firstName} {item?.lastName}
                                            </SCText>

                                            {<Feather name='check-circle' size={20} color={'#1da1f2'} />}

                                        </View>

                                        <SCText varient='bold' size={14} style={{
                                            marginBottom: 8
                                        }} color={COLORS.gray500}>@{item?.username}</SCText>
                                        <SCText varient='bold' size={14} color={COLORS.white}>{item?.bio}</SCText>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 15, marginBottom: 8 }}>

                                            {<Feather name='map-pin' size={20} color={COLORS.gray500} />}
                                            <SCText varient='bold' size={15} color={COLORS.white}>
                                                {item?.location}
                                            </SCText>


                                        </View>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                gap: 8,
                                                marginVertical: 8,
                                            }}
                                        >
                                            <Feather
                                                name="calendar"
                                                size={18}
                                                color={COLORS.gray500}
                                            />

                                            <SCText
                                                varient="bold"
                                                size={14}
                                                color={COLORS.white}
                                            >
                                                Joined {dayjs(getUserProfileDetails?.createdAt).format('MMM YYYY')}
                                            </SCText>
                                        </View>

                                        <View style={{ flexDirection: 'row', gap: 10, paddingTop: 4 }}>

                                            <TouchableOpacity onPress={() => setViewFollowing(true)}>

                                                <SCText color={COLORS.white}>
                                                    <SCText varient='bold'>{getUserProfileDetails?.following?.length}</SCText>
                                                    <SCText> Following</SCText>
                                                </SCText>

                                            </TouchableOpacity>
                                            <SCText color={COLORS.white}>•</SCText>
                                            <TouchableOpacity onPress={() => setViewFollowers(true)}>

                                                <SCText color={COLORS.white}>
                                                    <SCText varient='bold'>{getUserProfileDetails?.followers?.length}</SCText>
                                                    <SCText> Followers</SCText>
                                                </SCText>

                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <PostsList username={item?.username}

                                    />

                                    <ImagePreviewModal imageUrl={getUserProfileDetails?.profilePicture} visible={visibleModal} onClose={() => setVisibleModal(false)} />

                                    <FollowingFollowersModal

                                        show={isViewFollowers || isViewFollowing}
                                        close={() => {
                                            setViewFollowers(false);
                                            setViewFollowing(false);
                                        }}
                                        username={item.username}
                                        isFollowing={!!isViewFollowing}


                                    />

                                </View>
                            )
                        }}
                        contentContainerStyle={{
                            paddingBottom: 100 + insets.bottom
                        }}
                        showsVerticalScrollIndicator={false}

                        refreshControl={<RefreshControl refreshing={isLoadingProfileDetails} onRefresh={onRefetchUserProfileData} />}
                    />
                </View>
            </SafeAreaView>


        </GradientWrapper>
    )
}

export default ProfileDetails

const styles = StyleSheet.create({})