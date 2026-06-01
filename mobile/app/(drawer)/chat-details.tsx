import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ChatDetails = () => {
    const toGiftedMessage = (msg: any) => ({
        _id: msg._id,
        text: msg.text,
        createdAt: new Date(msg.createdAt),
        user: {
            _id: msg.sender._id,
            name: `${msg.sender.firstName} ${msg.sender.lastName}`,
            avatar: msg.sender.profilePicture,
        },
    });

    return (
        <View>
            <Text>ChatDetails</Text>
        </View>
    )
}

export default ChatDetails

const styles = StyleSheet.create({})