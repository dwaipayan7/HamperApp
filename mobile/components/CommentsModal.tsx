import { KeyboardAvoidingView, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Post } from '@/types'
import { createCommentMutation } from '@/services/CommentService';
import { Formik } from 'formik';
import * as yup from 'yup';
import SCText from './CustomText';
import { IconButton } from '@/utils/Icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { SCTextInput } from '@/utils/CustomInputStore';
import { COLORS } from '@/constants/colors';
import { Image } from 'expo-image';
import Header from './Header';
import GradientWrapper from './GradientWrapper';


interface Comment {
    selectedPost: Post
    onClose: () => void;
    show: boolean

}

const CommentsModal = ({ onClose, selectedPost, show }: Comment) => {

    console.log("The selected Post is: ", selectedPost);


    const { mutateAsync, isPending, error, } = createCommentMutation();

    const { currentUser } = useCurrentUser()

    const validationSchema = yup.object().shape({
        content: yup.string().trim().required("This field is required")
    })

    return (
        <Modal
            visible={show}
            onRequestClose={onClose}
            animationType='slide'
            presentationStyle='pageSheet'
        >
            <GradientWrapper style={{ flex: 1 }}>
                <SafeAreaView style={{ flex: 1, marginTop: 10 }} edges={['top']}>

                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>

                    <SCText>Comments</SCText>
                    <IconButton size={16} name='closeMore' onPress={onClose} />

                </View> */}

                    <Header leftTitle='Comments' showClose onClose={onClose} />

                    <View style={{ flex: 1, paddingHorizontal: 12 }}>
                        {selectedPost && (
                            <ScrollView
                                style={{
                                    flex: 1,
                                }}
                                contentContainerStyle={{
                                    paddingBottom: 20,
                                }}
                            >
                                <View
                                    style={{
                                        // backgroundColor: COLORS.white,
                                        borderRadius: 12,
                                        marginTop: 15,

                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'flex-start',
                                            justifyContent: 'center',
                                            // alignItems: 'center'
                                        }}
                                    >

                                        <Image
                                            source={{ uri: selectedPost.user.profilePicture }}
                                            contentFit="cover"
                                            style={{
                                                height: 48,
                                                width: 48,
                                                borderRadius: 24,
                                                marginRight: 10,
                                            }}
                                        />

                                        {/* Right Content */}
                                        <View
                                            style={{
                                                flex: 1,
                                            }}
                                        >
                                            {/* Name + Username */}
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    flexWrap: 'wrap',
                                                }}
                                            >
                                                <SCText

                                                    varient='semibold'
                                                    color='white'
                                                    style={{
                                                        marginRight: 5,

                                                    }}
                                                >
                                                    {selectedPost.user.firstName} {selectedPost.user.lastName}
                                                </SCText>

                                                <SCText
                                                    color={COLORS.gray500}
                                                >
                                                    @{selectedPost.user.username}
                                                </SCText>
                                            </View>


                                            {selectedPost.content && (
                                                <SCText
                                                    color='white'

                                                    style={{

                                                        marginTop: 4,
                                                        lineHeight: 20,

                                                    }}
                                                >
                                                    {selectedPost.content}
                                                </SCText>
                                            )}

                                            {selectedPost.image && (
                                                <Image
                                                    contentFit='cover'
                                                    source={{ uri: selectedPost.image }}
                                                    style={{
                                                        height: 200,
                                                        width: '100%',
                                                        borderRadius: 12,
                                                        marginTop: 10
                                                    }}
                                                />
                                            )}
                                        </View>
                                    </View>
                                </View>

                                {/* {Comment List} */}

                                {selectedPost.comments.map((comment, index) => (
                                    <View key={comment._id}
                                        style={{
                                            // backgroundColor: COLORS.white,
                                            borderColor: COLORS.gray100,
                                            borderBottomWidth: index === selectedPost.comments.length - 1 ? 0 : 0.2,
                                            paddingVertical: 8
                                        }}
                                    >

                                        <View style={{
                                            flexDirection: 'row',
                                            gap: 8,
                                            marginTop: 15
                                        }}>

                                            <Image

                                                source={{ uri: comment.user.profilePicture || "" }}
                                                contentFit='cover'
                                                style={{
                                                    width: 20,
                                                    height: 20,
                                                    borderRadius: 20 / 2
                                                }}
                                            />

                                            <View style={{ flex: 1 }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <SCText
                                                        style={{
                                                            fontWeight: 'bold',
                                                            color: COLORS.gray500
                                                        }}
                                                    >
                                                        {comment.user.firstName}{comment.user.lastName}
                                                    </SCText>

                                                    <SCText varient='bold' color={COLORS.gray500}>
                                                        {comment.user.username}
                                                    </SCText>
                                                </View>

                                                <SCText color={COLORS.white}>
                                                    {comment.content}
                                                </SCText>

                                            </View>

                                        </View>

                                    </View>
                                ))}

                                <View >
                                    <Formik
                                        initialValues={{ content: '' }}
                                        validationSchema={validationSchema}
                                        onSubmit={async (values, { resetForm }) => {
                                            try {
                                                await mutateAsync({
                                                    postId: selectedPost._id,
                                                    content: values.content,
                                                });

                                                resetForm();

                                            } catch (error) {
                                                console.log(error);
                                            }
                                        }}
                                    >
                                        {({
                                            handleChange,
                                            handleBlur,
                                            handleSubmit,
                                            values,
                                            errors,
                                            touched,
                                        }) => (
                                            <KeyboardAvoidingView
                                                style={{
                                                    marginTop: 15,
                                                    flexDirection: 'row',
                                                    alignItems: 'flex-start',
                                                }}
                                            >

                                                <View
                                                    style={{
                                                        flex: 1,
                                                        marginRight: 10,
                                                    }}
                                                >
                                                    <SCTextInput
                                                        onChangeText={handleChange('content')}
                                                        onBlur={handleBlur('content')}
                                                        value={values.content}
                                                        placeholder="Add Comment"
                                                        error={[errors.content, touched.content]}
                                                    />


                                                </View>

                                                <TouchableOpacity
                                                    onPress={() => handleSubmit()}
                                                    style={{
                                                        backgroundColor: COLORS.lightBlue,
                                                        paddingVertical: 12,
                                                        paddingHorizontal: 12,
                                                        borderRadius: 8,
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        marginTop: 2,
                                                    }}


                                                >
                                                    <SCText color={COLORS.white}>
                                                        Comment
                                                    </SCText>
                                                </TouchableOpacity>
                                            </KeyboardAvoidingView>
                                        )}
                                    </Formik>
                                </View>

                            </ScrollView>
                        )}

                    </View>

                </SafeAreaView>
            </GradientWrapper>
        </Modal >
    )
}

export default CommentsModal

const styles = StyleSheet.create({}) 