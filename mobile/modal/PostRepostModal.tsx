import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useRepostPost } from '@/services/PostService';
import ActionSheet, { ActionSheetRef, ScrollView } from 'react-native-actions-sheet';
import GradientWrapper from '@/components/GradientWrapper';
import { SafeAreaView } from 'react-native-safe-area-context';


interface iProps {
    show: boolean;
    close: () => boolean
}

const PostRepostModal = ({ show, close }: iProps) => {

    const actionSheetRef = useRef<ActionSheetRef>(null);

    useEffect(() => {
        if (show) {
            actionSheetRef.current?.show();
        } else {
            actionSheetRef.current?.hide();
        }
    }, [show]);

    const { mutateAsync: postWithContent, isPending } = useRepostPost();

    return (
        <ActionSheet
            ref={actionSheetRef}
            onRequestClose={close}
            containerStyle={{
                height: '80%',
                backgroundColor: '#12051F',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
            }}
        >
            <GradientWrapper hideGlow style={{ flex: 1, }} >
                <SafeAreaView>

                </SafeAreaView>
            </GradientWrapper>
        </ActionSheet>
    )
}

export default PostRepostModal

const styles = StyleSheet.create({})