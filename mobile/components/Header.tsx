import { StyleSheet, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native';
import React from 'react';
import SCText from './CustomText';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Icon } from '@/utils/Icons';
import { COLORS } from '@/constants/colors';

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


    onRightSignOut,

    onCustomPost,
    onSettingAction,
    onEdit,
    onBack,
    onClose,
    onRightActions,
    onLeftActions,
}: HeaderProps) => {
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
                // flex: 1
                justifyContent: 'center',
                flexDirection: 'row'

            }}>

                {leftTitle && (
                    <SCText color='white' size={16} varient='semibold'>{leftTitle}</SCText>
                )}

                {showBackButton && (
                    <TouchableOpacity onPress={onBack}>
                        <Ionicons
                            name="arrow-back"
                            size={24}
                            color="#000"
                        />
                    </TouchableOpacity>
                )}

                {showCloseButton && (
                    <TouchableOpacity onPress={onClose}>
                        <Ionicons
                            name="close"
                            size={24}
                            color="#000"
                        />
                    </TouchableOpacity>
                )}

                {showIcon && (
                    <TouchableOpacity onPress={onLeftActions}>
                        {/* <Ionicons
                            name="logo-twitter"
                            size={24}
                            color="#1DA1F2"
                        /> */}
                        {/* <Image
                            source={require('../assets/images/hamper_logo.png')}
                            resizeMode="contain"
                            style={{
                                width: 34,
                                height: 34,
                            }}
                        /> */}

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
});