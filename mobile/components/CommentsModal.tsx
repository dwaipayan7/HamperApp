import {
    ActivityIndicator,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useEffect, useRef } from 'react';
import { Post } from '@/types';
import { createCommentMutation } from '@/services/CommentService';
import { Formik } from 'formik';
import * as yup from 'yup';
import SCText from './CustomText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SCTextInput } from '@/utils/CustomInputStore';
import { COLORS } from '@/constants/colors';
import { Image } from 'expo-image';
import Header from './Header';
import GradientWrapper from './GradientWrapper';
import Loader from './Loader';
import ActionSheet, { ActionSheetRef, ScrollView } from 'react-native-actions-sheet';

interface CommentProps {
    selectedPost: Post;
    onClose: () => boolean;
    show: boolean;
}

const CommentsModal = ({ show, onClose, selectedPost }: CommentProps) => {
    const actionSheetRef = useRef<ActionSheetRef>(null);

    useEffect(() => {
        if (show) {
            actionSheetRef.current?.show();
        } else {
            actionSheetRef.current?.hide();
        }
    }, [show]);

    const { mutateAsync, isPending } = createCommentMutation();

    const validationSchema = yup.object().shape({
        content: yup.string().trim().required('Required'),
    });

    if (!selectedPost) return null;

    return (
        <ActionSheet
            ref={actionSheetRef}
            onRequestClose={onClose}
            containerStyle={{
                height: '100%',
                backgroundColor: '#12051F',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
            }}
        >
            <GradientWrapper hideGlow style={{ flex: 1 }}>
                {/* <Loader show={isPending} /> */}

                <SafeAreaView style={{ flex: 1 }}>
                    <Header
                        leftTitle="Comments"
                        showClose
                        onClose={onClose}
                    />

                    <ScrollView
                        style={{ flex: 1 }}
                        contentContainerStyle={{
                            paddingHorizontal: 12,
                            paddingBottom: 20,
                        }}
                        keyboardShouldPersistTaps="handled"
                    >

                        <View style={{ borderRadius: 12, marginTop: 15 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>

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

                                <View style={{ flex: 1 }}>

                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        flexWrap: 'wrap',
                                    }}>
                                        <SCText
                                            varient='semibold'
                                            color='white'
                                            style={{ marginRight: 5 }}
                                        >
                                            {selectedPost.user.firstName} {selectedPost.user.lastName}
                                        </SCText>
                                        <SCText color={COLORS.gray500}>
                                            @{selectedPost.user.username}
                                        </SCText>
                                    </View>


                                    {selectedPost.content && (
                                        <SCText
                                            color='white'
                                            style={{ marginTop: 4, lineHeight: 20 }}
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
                                                marginTop: 10,
                                            }}
                                        />
                                    )}
                                </View>

                            </View>
                        </View>


                        <View style={{
                            height: 0.5,
                            backgroundColor: COLORS.gray100,
                            marginVertical: 12,
                        }} />


                        {selectedPost.comments.map((comment, index) => (
                            <View
                                key={comment._id}
                                style={{
                                    borderColor: COLORS.gray100,
                                    borderBottomWidth:
                                        index === selectedPost.comments.length - 1 ? 0 : 0.2,
                                    paddingVertical: 8,
                                }}
                            >
                                <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
                                    <Image
                                        source={{ uri: comment.user.profilePicture || '' }}
                                        contentFit='cover'
                                        style={{ width: 32, height: 32, borderRadius: 16 }}
                                    />
                                    <View style={{ flex: 1 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                            <SCText varient='semibold' color={COLORS.white}>
                                                {comment.user.firstName} {comment.user.lastName}
                                            </SCText>
                                            <SCText color={COLORS.gray500}>
                                                @{comment.user.username}
                                            </SCText>
                                        </View>
                                        <SCText color={COLORS.white} style={{ marginTop: 2 }}>
                                            {comment.content}
                                        </SCText>
                                    </View>
                                </View>
                            </View>
                        ))}

                    </ScrollView>

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
                        {({ handleChange, handleBlur, handleSubmit, values }) => (
                            <View style={styles.inputBar}>
                                <View style={{ flex: 1, marginRight: 10 }}>
                                    <SCTextInput
                                        placeholder="Add a comment..."
                                        value={values.content}
                                        onChangeText={handleChange('content')}
                                        onBlur={handleBlur('content')}
                                    />
                                </View>

                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => handleSubmit()}
                                    style={styles.submitButton}
                                >
                                    {isPending ? (
                                        <ActivityIndicator size="small" color="white" />
                                    ) : (
                                        <SCText varient='semibold' color={COLORS.white}>Post</SCText>
                                    )}
                                </TouchableOpacity>
                            </View>
                        )}
                    </Formik>

                </SafeAreaView>
            </GradientWrapper>
        </ActionSheet>
    );
};

export default CommentsModal;

const styles = StyleSheet.create({
    inputBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 10,
        paddingBottom: 16,
        borderTopWidth: 0.2,
        borderColor: COLORS.gray100,
        backgroundColor: '#12051F',
    },
    submitButton: {
        backgroundColor: COLORS.lightBlue,
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
});