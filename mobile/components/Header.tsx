import { StyleSheet, TouchableOpacity, View, Image, ActivityIndicator, Text } from 'react-native';
import React from 'react';
import SCText from './CustomText';
import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons';
import { Icon } from '@/utils/Icons';
import { COLORS } from '@/constants/colors';
import { formatText } from '@/utils/AllContext';
import { useNotificationCount } from '@/services/NotificationService';

interface HeaderProps {
    title?: string;
    extraTitle?: string;

    showProfile?: boolean;
    showEdit?: boolean;

    showBackButton?: boolean;
    showCloseButton?: boolean;
    showIcon?: boolean;
    showSearchButton?: boolean;
    showClose?: boolean
    leftTitle?: string
    showSettingsIcon?: boolean
    rightActionLabel?: string;
    customPost?: boolean;
    isPendingCustomPost?: boolean
    rightIconSignOut?: boolean
    isUserPosts?: boolean
    userPosts?: number,
    isVerticalThreeDots?: boolean;
    showProfileImage?: string
    subTitle?: string
    showNotification?: boolean

    onPressNotification?: () => void;
    onVerticalThreeDots?: () => void;
    onRightSignOut?: () => void
    onEdit?: () => void;
    onBack?: () => void;
    onClose?: () => void;
    onRightActions?: () => void;
    onLeftActions?: () => void;
    onSettingAction?: () => void;
    onCustomPost?: () => void
}

const Header = ({
    title,
    extraTitle,

    showBackButton,
    showCloseButton,
    showIcon,
    showClose,
    leftTitle,
    rightActionLabel,
    showSettingsIcon,
    showEdit,
    customPost,
    isPendingCustomPost,
    rightIconSignOut,
    isUserPosts,
    userPosts,
    isVerticalThreeDots,
    showProfileImage,
    subTitle,
    showNotification,


    onPressNotification,
    onVerticalThreeDots,
    onRightSignOut,
    onCustomPost,
    onSettingAction,
    onEdit,
    onBack,
    onClose,
    onRightActions,
    onLeftActions,
}: HeaderProps) => {
    // const { data } = useNotificationCount();
    // const unreadCount = data?.count ?? 0;
    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 12,
            paddingVertical: 12,
        }}>
            {/* Left Section */}
            <View style={{
                // flexDirection: 'row',
                // alignItems: 'center',
                flex: 1,
                justifyContent: 'center',
                flexDirection: 'row',


            }}>

                {/* {!isUserPosts && leftTitle && (
                    <SCText color='white' size={16} varient='semibold'>{leftTitle}</SCText>
                )}

                {isUserPosts && leftTitle && (
                    <View style={{ gap: 4 }}>
                        <SCText color='white' size={16} varient='semibold'>{leftTitle}</SCText>
                        <SCText color='white' size={12} varient='regular'>{` ${userPosts} ${userPosts === 1 ? "Post" : "Posts"} `}</SCText>

                    </View>
                )}

                {showBackButton && (
                    <TouchableOpacity onPress={onBack}>
                        <Ionicons
                            name="arrow-back"
                            size={24}
                            color={COLORS.white}
                        />
                    </TouchableOpacity>
                )}

                {showBackButton && leftTitle}

                {showCloseButton && (
                    <TouchableOpacity onPress={onClose}>
                        <Ionicons
                            name="close"
                            size={24}
                            color="#000"
                        />
                    </TouchableOpacity>
                )} */}

                {showBackButton && (
                    <TouchableOpacity
                        onPress={onBack}
                        style={{ marginRight: 16 }}
                    >
                        <Ionicons
                            name="arrow-back"
                            size={24}
                            color={COLORS.white}
                        />
                    </TouchableOpacity>
                )}

                {(leftTitle && isUserPosts) && (
                    <View>
                        <SCText
                            color="white"
                            size={16}
                            varient="semibold"
                        >
                            {leftTitle}
                        </SCText>

                        {isUserPosts && (
                            <SCText
                                color="white"
                                varient="regular"
                                size={12}
                            >
                                {userPosts} {userPosts === 1 ? 'Post' : 'Posts'}
                            </SCText>
                        )}
                    </View>
                )}
                {(leftTitle && showProfileImage || leftTitle && subTitle) && (
                    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                        <Image source={{ uri: showProfileImage }}
                            style={{ height: 40, width: 40, borderRadius: 20 }}
                        />
                        <View style={{ gap: 4 }}>
                            <SCText
                                color="white"
                                size={16}
                                varient="semibold"
                            >
                                {formatText(leftTitle, 20)}
                            </SCText>

                            <SCText
                                color="white"
                                varient="regular"
                                size={12}>
                                {subTitle}
                            </SCText>

                        </View>

                        <View />
                    </View>
                )}

                {showIcon && (
                    <TouchableOpacity onPress={onLeftActions}>
                        <View
                            style={{
                                width: 26,
                                height: 26,
                                borderRadius: 19,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Image
                                source={require('../assets/images/hamper_logo.png')}
                                resizeMode="contain"
                                style={{
                                    width: 150,
                                    height: 150,
                                }}
                            />
                        </View>
                    </TouchableOpacity>
                )}
                {<View
                    style={{
                        // flex: 1,
                        justifyContent: 'center',
                        alignItems:
                            showIcon && title && !showClose
                                ? 'center'
                                : 'flex-start',
                        flexGrow: 1,
                        paddingRight: showIcon && title && !showClose ? 12 : 0
                    }}
                >
                    {title && (
                        <SCText
                            color='white'
                            varient='semibold'
                            size={16}
                            style={{ alignSelf: 'center' }}
                        >
                            {title}
                        </SCText>
                    )}

                    {extraTitle && (
                        <SCText
                            color='white'
                        >
                            {extraTitle}
                        </SCText>
                    )}
                </View>}

                <View style={{}}>
                    {rightActionLabel && (
                        <TouchableOpacity onPress={onRightActions}>
                            <SCText color='white' style={styles.actionLabel}>
                                {rightActionLabel}
                            </SCText>
                        </TouchableOpacity>
                    )}

                    {!showClose && customPost && (

                        <TouchableOpacity
                            style={{
                                paddingVertical: 6,
                                paddingHorizontal: 12,
                                backgroundColor: '#3B82F6',
                                marginTop: 4,
                                borderRadius: 12,
                                flexDirection: 'row'
                            }}
                            onPress={onCustomPost}
                        // disabled={
                        //     isPending ||
                        //     !(
                        //         values.content.trim() ||
                        //         selectedImage
                        //     )
                        // }
                        >
                            {isPendingCustomPost ? (
                                <ActivityIndicator
                                    size="small"
                                    color="white"
                                />
                            ) : (
                                <SCText
                                    varient="semibold"
                                    color={
                                        COLORS.white

                                    }
                                >
                                    Post
                                </SCText>
                            )}
                        </TouchableOpacity>
                    )}

                    {showClose && customPost && (
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                            <TouchableOpacity
                                style={{
                                    paddingVertical: 6,
                                    paddingHorizontal: 12,
                                    backgroundColor: '#3B82F6',
                                    borderRadius: 12,

                                }}
                                onPress={onCustomPost}
                            // disabled={
                            //     isPending ||
                            //     !(
                            //         values.content.trim() ||
                            //         selectedImage
                            //     )
                            // }
                            >
                                {isPendingCustomPost ? (
                                    <ActivityIndicator
                                        size="small"
                                        color="white"
                                    />
                                ) : (
                                    <SCText
                                        varient="semibold"
                                        color={
                                            COLORS.white

                                        }
                                    >
                                        Post
                                    </SCText>
                                )}
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onClose}>
                                <Icon name='closeMore' size={16} />
                            </TouchableOpacity>
                        </View>
                    )}

                    {!customPost && showClose && (
                        <TouchableOpacity onPress={onClose}>
                            <Icon name='closeMore' size={16} />
                        </TouchableOpacity>
                    )}

                    {rightIconSignOut && (
                        <TouchableOpacity onPress={onRightSignOut}>
                            <Feather size={24} name='log-out' color={COLORS.redColor} />
                        </TouchableOpacity>
                    )}

                    {showSettingsIcon && (
                        <TouchableOpacity onPress={onSettingAction}>
                            <Feather name='settings' size={20} color={'#657786'} />
                        </TouchableOpacity>
                    )}

                    {showEdit && (
                        <TouchableOpacity onPress={onEdit}>
                            <Feather name='edit' size={20} color={'#657786'} />
                        </TouchableOpacity>
                    )}

                    {isVerticalThreeDots && (
                        <FontAwesome onPress={onVerticalThreeDots} color={COLORS.white} size={24} name='ellipsis-v' />
                    )}

                    {showNotification && (
                        <TouchableOpacity
                            onPress={onPressNotification}
                            style={{ position: 'relative' }}
                        >
                            <Feather name="bell" size={20} color={COLORS.white} />
                            {/* {unreadCount > 0 && (
                                <View style={styles.badge}>
                                    <Text style={styles.badgeText}>
                                        {unreadCount > 9 ? '9+' : unreadCount}
                                    </Text>
                                </View>
                            )} */}
                        </TouchableOpacity>
                    )}

                    {/* {showEdit && (
                    <TouchableOpacity onPress={onEdit}>
                        <Ionicons
                            name="create-outline"
                            size={22}
                            color="#000"
                        />
                    </TouchableOpacity>
                )} */}
                </View>

            </View>

            {/* {showClose && showIcon && title && <View>
                {title && (
                    <SCText varient='semibold' style={{ alignSelf: 'center' }} >
                        {title}
                    </SCText>
                )}

                {extraTitle && (
                    <SCText >
                        {extraTitle}
                    </SCText>
                )}
            </View>} */}


        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {


    },

    // leftContainer: {

    // },





    actionLabel: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1DA1F2',
    },
    badge: {
        position: 'absolute',
        top: -6,
        right: -6,
        minWidth: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#E0245E',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 3,
        borderWidth: 1.5,
        borderColor: '#05010D',
    },
    badgeText: {
        color: '#fff',
        fontSize: 9,
        fontWeight: '700',
        lineHeight: 12,
    },
});