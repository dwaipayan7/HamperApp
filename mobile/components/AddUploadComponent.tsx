import { ActivityIndicator, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Formik } from 'formik';
import * as yup from 'yup';
import { SCTextInput } from '@/utils/CustomInputStore';
import { COLORS } from '@/constants/colors';
import SCText from './CustomText';
import { useCreateVideo } from '@/services/VideoService';
import FileComponentModal from '../components/FileUploadComponent';

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

    const handlePickVideo = () => {
        setPickFile(true);
    }


    const handleFileSelect = (files: any) => {


        setAttachment(files);
        setPickFile(false)

    }


    const handleSubmitForm = async (
        values: { title: string; caption: string },
        resetForm: () => void
    ) => {

        setLoading(true)
        setProgress(0);

        try {
            const formData = new FormData();

            formData.append("title", values.title);
            formData.append("caption", values.caption);

            if (attachment.length > 0) {
                formData.append("video", {
                    uri: attachment[0].uri,
                    type: attachment[0].mimeType || "video/mp4",
                    name:
                        attachment[0].fileName ||
                        `video-${Date.now()}.mp4`,
                } as any);
            }

            await uploadVideo({
                formData, onProgress: (percent) => {
                    setProgress(percent)
                }
            });

            setLoading(false);
            resetForm();

            setAttachment([]);
            setPickFile(false);

            onUploadSuccess();
            close();
        } catch (error) {
            console.log(error);
        }
    };



    return (
        <Modal
            visible={show}
            animationType="slide"
            transparent={false}
            onRequestClose={close}
        >
            <View
                style={{
                    flex: 1,
                    backgroundColor: "#12051F",
                    padding: 20,
                    justifyContent: "center",
                }}
            >
                <Formik
                    initialValues={{ title: "", caption: "" }}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { resetForm }) => {



                        try {
                            // console.log(values);
                            // resetForm();
                            handleSubmitForm(values, resetForm);

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
                    }) => (
                        <>
                            <SCText color="white" size={24}>
                                Upload Video
                            </SCText>

                            <View style={{ marginTop: 20 }}>
                                <SCTextInput
                                    placeholder="Add a title..."
                                    value={values.title}
                                    onChangeText={handleChange("title")}
                                    onBlur={handleBlur("title")}
                                    extendingField
                                />
                            </View>

                            <View style={{ marginTop: 12 }}>
                                <SCTextInput
                                    placeholder="Add a caption..."
                                    value={values.caption}
                                    onChangeText={handleChange("caption")}
                                    onBlur={handleBlur("caption")}
                                    extendingField
                                />
                            </View>

                            {attachment.length > 0 && (
                                <View
                                    style={{
                                        marginTop: 12,
                                        padding: 12,
                                        borderRadius: 8,
                                        backgroundColor: "#1E1E1E",
                                    }}
                                >
                                    <SCText color="white">
                                        {attachment[0]?.fileName ||
                                            attachment[0]?.uri?.split("/").pop()}
                                    </SCText>
                                </View>
                            )}

                            <TouchableOpacity
                                onPress={handlePickVideo}
                                style={{
                                    marginTop: 16,
                                    padding: 14,
                                    borderRadius: 8,
                                    borderWidth: 1,
                                    borderColor: "#666",
                                    alignItems: "center",
                                }}
                            >
                                <SCText color="white">
                                    {attachment.length > 0
                                        ? "Video Selected ✓"
                                        : "Choose Video"}
                                </SCText>
                            </TouchableOpacity>

                            {loading && (
                                <View style={{ marginTop: 20 }}>
                                    <SCText color="white">
                                        Uploading... {progress}%
                                    </SCText>

                                    <View
                                        style={{
                                            height: 8,
                                            backgroundColor: "#333",
                                            borderRadius: 10,
                                            marginTop: 10,
                                        }}
                                    >
                                        <View
                                            style={{
                                                height: 8,
                                                width: `${progress}%`,
                                                backgroundColor: "#8B5CF6",
                                                borderRadius: 10,
                                            }}
                                        />
                                    </View>
                                </View>
                            )}

                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => handleSubmit()}
                                style={[styles.submitButton, { marginTop: 20 }]}
                            >
                                <SCText
                                    varient="semibold"
                                    color={COLORS.white}
                                >
                                    Post
                                </SCText>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={close}
                                style={{
                                    marginTop: 10,
                                    alignItems: "center",
                                    backgroundColor: COLORS.white,
                                    padding: 10,
                                    borderRadius: 8
                                }}
                            >
                                <SCText color={COLORS.textBlack}>Close</SCText>
                            </TouchableOpacity>

                            <FileComponentModal
                                show={pickFile}
                                close={() => setPickFile(false)}
                                onFileSelect={handleFileSelect}
                            />
                        </>
                    )}
                </Formik>
            </View>
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