import { ActivityIndicator, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Formik } from 'formik';
import * as yup from 'yup';
import { SCTextInput } from '@/utils/CustomInputStore';
import { COLORS } from '@/constants/colors';
import SCText from './CustomText';
import { useCreateVideo } from '@/services/VideoService';


interface Props {
    show: boolean;
    close: () => void;
    onUploadSuccess: () => void;
}

const AddUploadComponent = ({ show, close, onUploadSuccess }: Props) => {

    const [attachment, setAttachment] = useState<any[]>([])
    const [pickFile, setPickFile] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [progress, setProgress] = useState<number>(0)

    const validationSchema = yup.object().shape({
        title: yup.string().trim().required('Required'),
        caption: yup.string().trim()
    });

    console.log("The Attachments are: ", attachment);

    const { mutateAsync: uploadVideo, isPaused } = useCreateVideo();

    return (
        <Modal
            visible={show}
            onDismiss={close}
            animationType='slide'
        >
            <Formik
                initialValues={{ title: '', caption: '' }}
                validationSchema={validationSchema}
                onSubmit={async (values, { resetForm }) => {
                    try {
                        // await mutateAsync({
                        //     postId: selectedPost._id,
                        //     content: values.content,
                        // });

                        const formData = new FormData();




                        resetForm();
                    } catch (error) {
                        console.log(error);
                    }
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <View >
                        <View style={{ flex: 1, marginRight: 10 }}>
                            <SCTextInput
                                placeholder="Add a title..."
                                value={values.title}
                                onChangeText={handleChange('content')}
                                onBlur={handleBlur('content')}
                                extendingField
                            />
                        </View>
                        <View style={{ flex: 1, marginRight: 10 }}>
                            <SCTextInput
                                placeholder="Add a caption..."
                                value={values.caption}
                                onChangeText={handleChange('content')}
                                onBlur={handleBlur('content')}
                                extendingField
                            />
                        </View>

                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => handleSubmit()}
                            style={styles.submitButton}
                        >
                            {false ? (
                                <ActivityIndicator size="small" color="white" />
                            ) : (
                                <SCText varient='semibold' color={COLORS.white}>Post</SCText>
                            )}
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
        </Modal>
    )
}

export default AddUploadComponent

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
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
})