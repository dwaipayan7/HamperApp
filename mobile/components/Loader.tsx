import { StyleSheet, Text, View, Modal, ActivityIndicator } from 'react-native'
import React from 'react'
import { COLORS } from '@/constants/colors'



const Loader = ({ show }: { show: boolean }) => {
    return show ? <View style={{ zIndex: 999, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: '#00000020', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={COLORS.white} />
    </View> : <></>

}

export default Loader

const styles = StyleSheet.create({})
