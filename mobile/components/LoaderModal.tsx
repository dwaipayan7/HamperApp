import { StyleSheet, Text, View, Modal, ActivityIndicator } from 'react-native'
import React from 'react'
import { COLORS } from '@/constants/colors'


const LoaderModal = ({ show }: { show: boolean }) => {
    return (
        <Modal transparent visible={show} animationType="fade" onRequestClose={() => { }}>
            <View style={{ flex: 1, backgroundColor: '#00000020', justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={COLORS.white} />
            </View>
        </Modal>
    )
}

export default LoaderModal

const styles = StyleSheet.create({})