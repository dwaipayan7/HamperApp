import {
    ActivityIndicator,
    Modal,
    StyleSheet,
    TouchableOpacity,
    View,
    Alert,
} from 'react-native';
import React, { useEffect, useRef } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';

import GradientWrapper from '@/components/GradientWrapper';
import Header from '@/components/Header';
import SCText from '@/components/CustomText';
import { SCMultilineTextInput, SCTextInput } from '@/utils/CustomInputStore';
import ActionSheet, { ActionSheetRef, ScrollView } from 'react-native-actions-sheet';
import {
    SafeAreaView,
    useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { COLORS } from '@/constants/colors';

import { useCurrentUser } from '@/hooks/useCurrentUser';

import { useUpdateMutation } from '@/services/ProfileService';

interface iProps {
    show: boolean;
    close: () => any;
}

const validationSchema = yup.object().shape({
    firstName: yup
        .string()
        .trim(),
    // .required('First name is required'),

    lastName: yup
        .string()
        .trim(),
    // .required('Last name is required'),

    bio: yup
        .string()
        .trim()
        .max(200, 'Bio cannot exceed 200 characters'),

    location: yup
        .string()
        .trim()
        .max(
            100,
            'Location cannot exceed 100 characters'
        ),
});

const UpdateProfileModal = ({
    show,
    close,
}: iProps) => {
    const insets = useSafeAreaInsets();

    const { currentUser } =
        useCurrentUser();

    const {
        mutateAsync: save,
        isPending,
    } = useUpdateMutation();

    const actionSheetRef = useRef<ActionSheetRef>(null);

    useEffect(() => {
        if (show) {
            actionSheetRef.current?.show();
        } else {
            actionSheetRef.current?.hide();
        }
    }, [show]);
    return (
        <ActionSheet
            // gestureEnabled
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

            <SafeAreaView
                // edges={['top']}
                style={{
                    flex: 1,
                    backgroundColor: 'black',
                    marginTop: insets.top
                }}

            >
                <GradientWrapper hideGlow style={{ flex: 1 }}>

                    <Formik
                        enableReinitialize
                        validateOnMount
                        initialValues={{
                            firstName: currentUser?.firstName || '',

                            lastName: currentUser?.lastName || '',

                            bio: currentUser?.bio || '',

                            location: currentUser?.location || '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={async (
                            values
                        ) => {
                            try {
                                await save({
                                    firstName:
                                        values.firstName.trim(),

                                    lastName:
                                        values.lastName.trim(),

                                    bio: values.bio.trim(),

                                    location:
                                        values.location.trim(),
                                });

                                Alert.alert(
                                    'Success',
                                    'Profile updated successfully'
                                );

                                close();
                            } catch (error: any) {
                                Alert.alert(
                                    'Error',
                                    error?.response?.data
                                        ?.message ||
                                    'Something went wrong'
                                );
                            }
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isValid,
                        }) => {

                            console.log("The values are : ", values);


                            return (
                                <View style={{ flex: 1 }}>
                                    <Header
                                        leftTitle="Edit Profile"
                                        showClose
                                        onClose={close}
                                    />

                                    <ScrollView
                                        showsVerticalScrollIndicator={
                                            false
                                        }
                                        contentContainerStyle={{
                                            padding: 16,
                                            paddingBottom:
                                                100 + insets.bottom,
                                        }}
                                    >
                                        <SCTextInput
                                            label="First Name"
                                            placeholder="Enter first name"
                                            value={values.firstName}
                                            onChangeText={handleChange(
                                                'firstName'
                                            )}
                                            onBlur={handleBlur(
                                                'firstName'
                                            )}
                                            error={[
                                                errors.firstName,
                                                !!touched.firstName,
                                            ]}

                                        />

                                        <SCTextInput
                                            label="Last Name"
                                            placeholder="Enter last name"
                                            value={values.lastName}
                                            onChangeText={handleChange(
                                                'lastName'
                                            )}
                                            onBlur={handleBlur(
                                                'lastName'
                                            )}
                                            error={[
                                                errors.lastName,
                                                !!touched.lastName,
                                            ]}

                                        />

                                        <SCMultilineTextInput
                                            label="Bio"
                                            placeholder="Tell something about yourself"
                                            value={values.bio}
                                            onChangeText={handleChange(
                                                'bio'
                                            )}
                                            onBlur={handleBlur('bio')}
                                            extendingField
                                            maxLimit={200}
                                            error={[
                                                errors.bio,
                                                !!touched.bio,
                                            ]}

                                        />

                                        <SCTextInput
                                            label="Location"
                                            placeholder="Enter your location"
                                            value={values.location}
                                            onChangeText={handleChange(
                                                'location'
                                            )}
                                            onBlur={handleBlur(
                                                'location'
                                            )}
                                            error={[
                                                errors.location,
                                                !!touched.location,
                                            ]}
                                        />

                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            disabled={
                                                !isValid || isPending
                                            }
                                            onPress={() =>
                                                handleSubmit()
                                            }
                                            style={[
                                                styles.saveButton,
                                                {
                                                    opacity:
                                                        !isValid ||
                                                            isPending
                                                            ? 0.6
                                                            : 1,
                                                },
                                            ]}
                                        >
                                            {isPending ? (
                                                <ActivityIndicator
                                                    size="small"
                                                    color={
                                                        COLORS.white
                                                    }
                                                />
                                            ) : (
                                                <SCText
                                                    varient="semibold"
                                                    color={COLORS.white}
                                                >
                                                    Save Changes
                                                </SCText>
                                            )}
                                        </TouchableOpacity>
                                    </ScrollView>
                                </View>
                            )
                        }}
                    </Formik>
                </GradientWrapper>
            </SafeAreaView>
        </ActionSheet >
    );
};

export default UpdateProfileModal;

const styles = StyleSheet.create({
    saveButton: {
        backgroundColor:
            COLORS.lightBlue,

        marginTop: 14,

        paddingVertical: 14,

        borderRadius: 14,

        justifyContent: 'center',

        alignItems: 'center',
    },
});