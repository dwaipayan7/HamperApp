import {
    ActivityIndicator,
    Modal,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useEffect, useRef } from 'react';
import { useGetPostById, useRepostPost } from '@/services/PostService';
import ActionSheet, {
    ActionSheetRef,
} from 'react-native-actions-sheet';
import GradientWrapper from '@/components/GradientWrapper';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '@/components/Header';
import { Formik } from 'formik';
import * as yup from 'yup';
import Loader from '@/components/Loader';
import { SCTextInput } from '@/utils/CustomInputStore';
import SCText from '@/components/CustomText';
import { COLORS } from '@/constants/colors';
import { Image } from 'expo-image'
import { deviceHeight, showMessage } from '@/utils/AllContext';
import SnackBar from '@/components/Snackbar';

interface iProps {
    show: boolean;
    close: () => boolean;
    postId: string;
}

const validationSchema = yup.object().shape({
    content: yup.string().trim().required("Please add your thoughts"),
});

const PostRepostModal = ({
    show,
    close,
    postId,
}: iProps) => {

    const insets = useSafeAreaInsets();

    const actionSheetRef =
        useRef<ActionSheetRef>(null);

    useEffect(() => {
        if (show) {
            actionSheetRef.current?.show();
        } else {
            actionSheetRef.current?.hide();
        }
    }, [show]);

    const { data } = useGetPostById(postId)

    const post = data;

    console.log("The Post Data is: ", post);


    const { mutateAsync: repostPost, isPending, } = useRepostPost();

    return (
        <Modal
            // ref={actionSheetRef}
            visible={show}
            onRequestClose={close}
            // gestureEnabled
            // containerStyle={{
            //     height: '100%',
            //     backgroundColor: '#12051F',
            //     borderTopLeftRadius: 20,
            //     borderTopRightRadius: 20,
            // }}
            // indicatorStyle={{
            //     height: 5, width: 40
            // }}

            animationType="slide"
            presentationStyle="fullScreen"
            statusBarTranslucent
        >
            <SafeAreaView style={{ flex: 1, backgroundColor: 'black', paddingTop: insets.top, }}>
                <GradientWrapper
                    hideGlow
                    style={{ flex: 1 }}
                >
                    <Loader show={isPending} />


                    <Formik
                        initialValues={{
                            content: '',
                        }}
                        validationSchema={
                            validationSchema
                        }
                        onSubmit={async (
                            values,
                            { resetForm }
                        ) => {
                            try {
                                await repostPost({
                                    postId,
                                    content: values.content,
                                });



                                resetForm();
                                close();
                                showMessage("Reposted successfully", 'success')
                            } catch (error) {
                                console.log(error);
                                showMessage("Error while reposting", 'error')

                            }
                        }}
                    >
                        {({
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            values,
                            errors,
                            touched
                        }) => (
                            <View
                                style={
                                    styles.container
                                }
                            >
                                <Header
                                    leftTitle="Repost"
                                    showClose
                                    onClose={close}
                                    customPost
                                    onCustomPost={handleSubmit}

                                />

                                <View
                                    style={{
                                        // flex: 1,
                                        marginRight: 10,
                                    }}
                                >
                                    <SCTextInput
                                        placeholder="Add your thoughts..."
                                        value={
                                            values.content
                                        }
                                        onChangeText={handleChange(
                                            'content'
                                        )}
                                        onBlur={handleBlur(
                                            'content'
                                        )}
                                        extendingField
                                        // wrapperStyle={{
                                        //     marginBottom: 16,
                                        // }}
                                        error={[errors.content, touched.content]}
                                    />
                                </View>

                                {data && (
                                    <View style={styles.originalPostContainer}>
                                        {/* <SCText
                                            varient="semibold"
                                            color={COLORS.white}
                                            size={16}
                                            style={{ marginBottom: 10 }}
                                        >
                                            {post.content}
                                        </SCText> */}
                                        {post?.user && (
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    gap: 8,
                                                    marginVertical: 10

                                                }}
                                            >
                                                <Image
                                                    source={{
                                                        uri: post.user.profilePicture,
                                                    }}
                                                    style={styles.userProfilePic}
                                                    contentFit="cover"
                                                />
                                                <View>
                                                    <SCText
                                                        color={COLORS.white}
                                                        varient="semibold"
                                                    >
                                                        {post.user.firstName}{' '}
                                                        {post.user.lastName}
                                                    </SCText>
                                                    <SCText
                                                        color={COLORS.lightGray}
                                                        style={{
                                                            fontSize: 12,
                                                        }}
                                                    >
                                                        @{post.user.username}
                                                    </SCText>
                                                </View>
                                            </View>
                                        )}
                                        <SCText
                                            color={COLORS.white}
                                            style={{
                                                marginTop: post?.image ? 8 : 0,
                                                marginBottom: 12,
                                                lineHeight: 18,
                                            }}
                                        >
                                            {post?.content}
                                        </SCText>
                                        {post?.image && (
                                            <Image
                                                source={{ uri: post.image }}
                                                style={styles.postImage}
                                                contentFit="cover"
                                            />
                                        )}



                                    </View>
                                )}

                                {/* <TouchableOpacity
                                    activeOpacity={
                                        0.8
                                    }
                                    onPress={() =>
                                        handleSubmit()
                                    }
                                    style={
                                        styles.submitButton
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
                                                COLORS.white
                                            }
                                        >
                                            Repost
                                        </SCText>
                                    )}
                                </TouchableOpacity> */}
                            </View>
                        )}
                    </Formik>
                </GradientWrapper>
            </SafeAreaView>
        </Modal>
    );
};

export default PostRepostModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        // paddingTop: 20,
    },

    submitButton: {
        backgroundColor: COLORS.lightBlue,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },

    originalPostContainer: {
        borderRadius: 12,

        borderColor: COLORS.divider2,
        padding: 12,
        marginBottom: deviceHeight * 0.18,
    },

    postImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
    },

    userProfilePic: {
        width: 32,
        height: 32,
        borderRadius: 16,
    },
});