import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Post } from '@/types'
import { createCommentMutation } from '@/services/CommentService';
import { Formik } from 'formik';
import * as yup from 'yup';


interface Comment {
    selectedPost: Post
    onClose: () => boolean;

}

const CommentsModal = ({ onClose, selectedPost }: Comment) => {

    const { data, isPending, error, } = createCommentMutation();

    const validationSchema = yup.object().shape({
        content: yup.string().required("This field is required")
    })

    return (
        <View>
            <Formik
                initialValues={{ email: '' }}
                validationSchema={validationSchema}
                onSubmit={values => console.log(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                    <View>
                        <TextInput
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            placeholder="Email Address"
                        />
                        {errors.email && <Text>{errors.email}</Text>}


                    </View>
                )}
            </Formik>
        </View>
    )
}

export default CommentsModal

const styles = StyleSheet.create({}) 