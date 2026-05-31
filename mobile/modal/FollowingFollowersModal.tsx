import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import ActionSheet, { ActionSheetRef, FlatList } from 'react-native-actions-sheet';
import GradientWrapper from '@/components/GradientWrapper';
import { getFollowersByUsername, getFollowingByUsername } from '@/services/UserService';
import { Image } from "expo-image";
import SCText from "@/components/CustomText";
import { COLORS } from "@/constants/colors";
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useFollowUser } from '@/services/PostService';


interface iProps {
    show: boolean;
    close: () => any;
    username: string
    isFollowing?: boolean;
    isFollowers?: boolean
}

const FollowingFollowersModal = ({
    show, close, username, isFollowing, isFollowers
}: iProps) => {

    const insets = useSafeAreaInsets();
    const actionSheetRef = useRef<ActionSheetRef>(null);

    useEffect(() => {
        if (show) {
            actionSheetRef.current?.show();
        } else {
            actionSheetRef.current?.hide();
        }
    }, [show]);

    const { currentUser, refetch: invalidateCurrentUser } = useCurrentUser();

    const { data: followers, isLoading: isLoadingFollowers } = getFollowersByUsername(username);
    const { data: following, isLoading: isLoadingFollowing } = getFollowingByUsername(username);

    const { mutateAsync: followUser, isPending: isFollowingUser } = useFollowUser();


    const data = isFollowing ? following : followers;


    console.log("The following and followers data are: ", followers, following);


    return (
        <ActionSheet
            gestureEnabled
            ref={actionSheetRef}
            onRequestClose={close}
            containerStyle={{
                height: '80%',
                backgroundColor: 'black',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
            }}
            indicatorStyle={{ height: 5, width: 40 }}
        >
            {/* <SafeAreaView
                // edges={['top']}
                style={{
                    flex: 1,
                    backgroundColor: 'black',
                    marginTop: insets.top
                }}

            > */}
            <GradientWrapper hideGlow style={{ flex: 1 }}>
                <View>

                    <FlatList
                        data={data}
                        keyExtractor={(item) => item._id}
                        contentContainerStyle={{
                            paddingHorizontal: 16,
                            paddingTop: 16,
                        }}
                        renderItem={({ item }) => {
                            const isFollowingUser =
                                currentUser?.following?.includes(item._id);

                            return (
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        marginBottom: 16,
                                    }}
                                >
                                    {/* User Info */}
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            flex: 1,
                                        }}
                                    >
                                        <Image
                                            source={{
                                                uri: item.profilePicture,
                                            }}
                                            style={{
                                                width: 52,
                                                height: 52,
                                                borderRadius: 26,
                                            }}
                                        />

                                        <View
                                            style={{
                                                marginLeft: 12,
                                                flex: 1,
                                            }}
                                        >
                                            <SCText
                                                color={COLORS.white}
                                                varient="semibold"
                                                size={15}
                                            >
                                                {item.firstName} {item.lastName}
                                            </SCText>

                                            <SCText
                                                color={COLORS.gray500}
                                                size={13}
                                            >
                                                @{item.username}
                                            </SCText>
                                        </View>
                                    </View>

                                    {/* Follow Button */}
                                    <TouchableOpacity
                                        onPress={() =>
                                            // handleFollow(item._id)
                                            followUser(item._id)

                                        }
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
                                        }}
                                    >
                                        <SCText
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
                                        </SCText>
                                    </TouchableOpacity>
                                </View>
                            );
                        }}
                    />

                </View>
            </GradientWrapper>
            {/* </SafeAreaView> */}
        </ActionSheet>
    )
}

export default FollowingFollowersModal

const styles = StyleSheet.create({})