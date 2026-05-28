import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import { Easing } from 'react-native-reanimated'
import { COLORS } from '@/constants/colors'
import { useRepostPost } from '@/services/PostService'
import ActionSheet, { ActionSheetRef, ScrollView } from 'react-native-actions-sheet';
import GradientWrapper from '@/components/GradientWrapper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons'
import SCText from '@/components/CustomText'
import PostRepostModal from './PostRepostModal'

interface iProps {
    show: boolean
    close: () => boolean
    // title?: string
    // onDiscard: () => void
    onSubmit?: () => void
    postId: string
    // children?: ReactNode
    // showImage?: boolean,
    // loading?: boolean,
    // submitLabel?: string,
    // discardLabel?: string
}

const RequestRepostModal = ({ show, close, onSubmit, postId }: iProps) => {

    const [openPostRepost, setOpenPostRepost] = useState<boolean>(false);

    // const bottomSheetRef = useRef<BottomSheetModal>(null);

    const { mutateAsync: postWithoutContent, isPending } = useRepostPost();

    // const snapPoints = useMemo(() => ['45%'], [])

    const actionSheetRef = useRef<ActionSheetRef>(null);

    useEffect(() => {
        if (show) {
            actionSheetRef.current?.show();
        } else {
            actionSheetRef.current?.hide();
        }
    }, [show]);
    const renderBackdrop = (props: any) => (
        <BottomSheetBackdrop
            {...props}
            opacity={0.1}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            pressBehavior="close"
        />
    )

    const handleRepost = async () => {
        try {

            await postWithoutContent({
                postId: postId,
                content: ""
            });

            close();

        } catch (error) {
            console.log("The Error while reposing is: ", error);

        }
    }

    return (
        <ActionSheet
            gestureEnabled
            ref={actionSheetRef}
            onRequestClose={close}
            containerStyle={{
                height: '20%',
                backgroundColor: '#12051F',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
            }}
            indicatorStyle={{ height: 5, width: 40 }}
        >
            <GradientWrapper hideGlow style={{ flex: 1, }} >
                <SafeAreaView style={{ padding: 20, gap: 20, }}>
                    <TouchableOpacity style={{ flexDirection: 'row', gap: 10, alignItems: 'center', justifyContent: 'flex-start' }} onPress={() => {
                        setOpenPostRepost(true);
                        // close();
                    }} >
                        <Feather name='edit' color={COLORS.white} size={24} />
                        <SCText size={16} varient='bold' color={COLORS.white}>Repost with your thoughts</SCText>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row', gap: 10, alignItems: 'center', justifyContent: 'flex-start' }} onPress={handleRepost}>
                        <Feather name='repeat' color={COLORS.white} size={24} />
                        <SCText size={16} varient='bold' color={COLORS.white}>Repost</SCText>
                    </TouchableOpacity>
                </SafeAreaView>
            </GradientWrapper>

            <PostRepostModal show={openPostRepost} close={() => setOpenPostRepost(false)} />
        </ActionSheet>
    )
}

export default RequestRepostModal

const styles = StyleSheet.create({})