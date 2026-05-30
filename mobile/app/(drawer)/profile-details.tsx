import { Alert, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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

    const { posts: userPosts, isLoading, checkIsLiked, refetch, error } = usePosts(username);

    const insets = useSafeAreaInsets();

    const router = useRouter();

    const [visibleModal, setVisibleModal] = useState<boolean>(false)


    console.log("The User Profile Details is: ", getUserProfileDetails);

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

                                            <TouchableOpacity onPress={() => { }}>

                                                <SCText color={COLORS.white}>
                                                    <SCText varient='bold'>{getUserProfileDetails?.following?.length}</SCText>
                                                    <SCText> Following</SCText>
                                                </SCText>

                                            </TouchableOpacity>
                                            <SCText color={COLORS.white}>•</SCText>
                                            <TouchableOpacity onPress={() => { }}>

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