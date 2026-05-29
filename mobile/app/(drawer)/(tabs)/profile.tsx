import { View, Text, FlatList, Alert, TouchableOpacity, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import GradientWrapper from '@/components/GradientWrapper'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import Header from '@/components/Header'
import { Image } from "expo-image"
import { useSignOut } from '@/hooks/useSignOut'
import { useClerk } from '@clerk/expo'
import { COLORS } from '@/constants/colors'
import { deviceHeight } from '@/utils/AllContext'
import SCText from '@/components/CustomText'
import { Feather } from '@expo/vector-icons'
import dayjs from 'dayjs'
import { usePosts } from '@/hooks/usePosts'
import { useDeletePost, useLikePost } from '@/services/PostService'
import PostsList from '@/components/PostsList'
import UpdateProfileModal from '@/modal/UpdateProfileModal'

const ProfileScreen = () => {

    const { currentUser, } = useCurrentUser();

    const insets = useSafeAreaInsets();

    const { signOut } = useClerk();

    const { posts: userPosts, isLoading, checkIsLiked, refetch, error } = usePosts();

    // const { mutateAsync: deletePost, isPending: isDeletePending } = useDeletePost(currentUser?.username);

    // const { mutateAsync: likePost, isPending: isLikePending } = useLikePost(currentUser?.username)

    const [openModal, setIsModal] = useState<boolean>(false)


    return (
        <GradientWrapper style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <Header leftTitle={`${currentUser.firstName} ${currentUser.lastName}`}
                    rightIconSignOut
                    onRightSignOut={() => {
                        Alert.alert("Logout", "Are you sure you want to logout?", [
                            { text: "Cancel", style: "cancel" },
                            {
                                text: "Logout",
                                style: "destructive",
                                onPress: () => signOut(),
                            },
                        ])
                        return true

                    }}

                    isUserPosts
                    userPosts={userPosts?.length}
                />
                <View >
                    <FlatList
                        data={currentUser ? [currentUser] : []}
                        renderItem={({ item, index }) => {
                            return (
                                <View>
                                    <Image
                                        source={{
                                            uri:
                                                currentUser.bannerImage ||
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
                                        <View
                                            style={{
                                                marginTop: -50,
                                                padding: 4,
                                                borderRadius: 999,
                                                borderWidth: 2,
                                                borderColor: COLORS.gray100,

                                            }}
                                        >
                                            <Image
                                                source={{ uri: currentUser?.profilePicture }}
                                                style={{
                                                    width: 100,
                                                    height: 100,
                                                    borderRadius: 50,
                                                }}
                                                contentFit="cover"
                                            />
                                        </View>

                                        <TouchableOpacity
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
                                            onPress={() => setIsModal(true)}
                                        >
                                            <SCText
                                                varient="semibold"
                                                color={COLORS.white}
                                            >
                                                Edit Profile
                                            </SCText>
                                        </TouchableOpacity>



                                    </View>
                                    <View style={{ paddingHorizontal: 12, }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 15, marginBottom: 8 }}>

                                            <SCText varient='bold' size={18} color={COLORS.white}>
                                                {currentUser?.firstName} {currentUser?.lastName}
                                            </SCText>

                                            {<Feather name='check-circle' size={20} color={'#1da1f2'} />}

                                        </View>

                                        <SCText varient='bold' size={14} style={{
                                            marginBottom: 8
                                        }} color={COLORS.gray500}>@{currentUser?.username}</SCText>
                                        <SCText varient='bold' size={14} color={COLORS.white}>{currentUser?.bio}</SCText>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 15, marginBottom: 8 }}>

                                            {<Feather name='map-pin' size={20} color={COLORS.gray500} />}
                                            <SCText varient='bold' size={15} color={COLORS.white}>
                                                {currentUser?.location}
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
                                                Joined {dayjs(currentUser?.createdAt).format('MMM YYYY')}
                                            </SCText>
                                        </View>

                                        <View style={{ flexDirection: 'row', gap: 10, paddingTop: 4 }}>
                                            <TouchableOpacity onPress={() => { }}>

                                                <SCText color={COLORS.white}>
                                                    <SCText varient='bold'>{currentUser?.following?.length}</SCText>
                                                    <SCText> Following</SCText>
                                                </SCText>

                                            </TouchableOpacity>
                                            <SCText color={COLORS.white}>•</SCText>
                                            <TouchableOpacity onPress={() => { }}>

                                                <SCText color={COLORS.white}>
                                                    <SCText varient='bold'>{currentUser?.followers?.length}</SCText>
                                                    <SCText> Following</SCText>
                                                </SCText>

                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <PostsList username={currentUser?.username}

                                    />

                                </View>
                            )
                        }}
                        contentContainerStyle={{
                            paddingBottom: 100 + insets.bottom
                        }}
                        showsVerticalScrollIndicator={false}

                        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}
                    />
                </View>

                <UpdateProfileModal
                    show={openModal}
                    close={() => setIsModal(false)}
                />
            </SafeAreaView>
        </GradientWrapper >
    )
}

export default ProfileScreen