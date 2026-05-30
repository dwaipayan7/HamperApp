import React from 'react'
import { View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'
import { BlurView } from '@react-native-community/blur'
import { deviceWidth } from '@/utils/AllContext'


// const { width } = Dimensions.get('window')

type Props = {
    visible: boolean
    imageUrl: string
    onClose: () => void
}

const ImagePreviewModal = ({ visible, imageUrl, onClose }: Props) => {
    if (!imageUrl) {
        return
    }

    return (
        <Modal
            onBackButtonPress={onClose}
            isVisible={visible}
            style={{ margin: 0 }}
            backdropOpacity={0}
            onBackdropPress={onClose}
            // onBackButtonPress={onClose}
            animationIn="fadeIn"
            animationOut="fadeOut"
            statusBarTranslucent
        >
            <>

                <BlurView
                    style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 0 }}
                    blurType="light"
                    blurAmount={10}
                    reducedTransparencyFallbackColor="white"
                >
                    <TouchableOpacity activeOpacity={0.8} onPress={onClose} style={{ position: 'absolute', backgroundColor: '#00000020', top: 0, bottom: 0, left: 0, right: 0 }} />
                </BlurView>
                <View style={styles.center} >
                    <Image source={{ uri: imageUrl }} style={styles.avatar} />
                </View>
            </>
        </Modal>
    )
}

export default ImagePreviewModal


const styles = StyleSheet.create({
    overlay: {
        flex: 1
    },
    center: {
        zIndex: 2,
        alignItems: 'center'
    },
    avatar: {
        width: deviceWidth * 0.65,
        height: deviceWidth * 0.65,
        borderRadius: deviceWidth * 0.325,
        borderWidth: 3,
        borderColor: '#fff',
    },
    svgWrapper: {
        width: deviceWidth * 0.65,
        height: deviceWidth * 0.65,
        borderRadius: deviceWidth * 0.325,
        overflow: 'hidden',
        backgroundColor: '#fff',
        borderWidth: 3,
        borderColor: '#fff',
    },
})