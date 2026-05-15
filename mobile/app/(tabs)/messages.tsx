import { View, Text, Alert, TouchableOpacity, TextInput, ScrollView, Image, Modal } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { CONVERSATIONS, ConversationType } from '@/data/conversations';
import { Feather } from '@expo/vector-icons';

const MessageScreen = () => {

    const insets = useSafeAreaInsets();
    const [searchText, setSearchText] = useState("");
    const [conversationList, setConversationList] = useState(CONVERSATIONS);
    const [selectedConversation, setSelectedConversation] = useState<ConversationType | null>(null)
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [newMessage, setNewMessage] = useState("")


    const deleteConversation = (conversationId: number) => {
        Alert.alert("Delete Conversation", "Are you sure you want to delete this conversation?", [
            { text: "Cancel", style: 'cancel' },
            {
                text: "Delete",
                style: 'destructive',
                onPress: () => {
                    setConversationList((prev) => prev.filter((conv) => conv.id !== conversationId));
                }
            }
        ])
    }

    const openConversation = (conversation: ConversationType) => {
        setSelectedConversation(conversation);
        setIsChatOpen(true);
    }

    const closeChatModal = () => {
        setIsChatOpen(false);
        setSelectedConversation(null);
        setNewMessage("");
    }

    const sendMessage = () => {
        if (newMessage.trim() && selectedConversation) {
            // update last message in conversation
            setConversationList((prev) =>
                prev.map((conv) =>
                    conv.id === selectedConversation.id
                        ? { ...conv, lastMessage: newMessage, time: "now" }
                        : conv
                )
            );
            setNewMessage("");
            Alert.alert(
                "Message Sent!",
                `Your message has been sent to ${selectedConversation.user.name}`
            );
        }
    };



    return (
        <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 12 }}>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>

                <Text className='text-xl font-bold text-gray-900'>Messages</Text>
                <TouchableOpacity>
                    <Feather name='edit' size={20} color={'#1da1f2'} />
                </TouchableOpacity>
            </View>


            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, height: 40, borderColor: 'gray', borderRadius: 24, paddingHorizontal: 12, marginTop: 10, backgroundColor: '#F3F4F6' }}>
                <Feather name="search" size={20} color="#657786" />
                <TextInput
                    placeholder="Search for people and groups"
                    className="flex-1 ml-3 text-base"
                    placeholderTextColor="#657786"
                    value={searchText}
                    onChangeText={setSearchText}
                />
            </View>

            <ScrollView
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 100 + insets.bottom
                }}
            >
                {conversationList.map((conversation) => (
                    <TouchableOpacity
                        key={conversation.id}
                        onPress={() => openConversation(conversation)}
                        onLongPress={() => deleteConversation(conversation.id)}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingVertical: 14,
                            paddingHorizontal: 10,
                        }}
                    >
                        <Image
                            source={{ uri: conversation.user.avatar }}
                            style={{
                                width: 48,
                                height: 48,
                                borderRadius: 24,
                                marginRight: 12,
                            }}
                        />

                        <View style={{ flex: 1 }}>


                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text
                                        numberOfLines={1}
                                        style={{
                                            fontSize: 16,
                                            fontWeight: '700',
                                            color: '#000',
                                            maxWidth: '85%',
                                        }}
                                    >
                                        {conversation.user.name}
                                    </Text>

                                    {conversation.user?.verified === true && (
                                        <Feather
                                            name="check-circle"
                                            size={16}
                                            color="#1DA1F2"
                                            style={{
                                                marginLeft: 6,
                                            }}
                                        />
                                    )}
                                </View>

                                <Text style={{
                                    color: '#6B7280',
                                    fontSize: 12
                                }} >{conversation.time}</Text>
                            </View>

                            <Text
                                numberOfLines={1}
                                style={{
                                    color: '#6B7280',
                                    marginTop: 4,
                                }}
                            >
                                {conversation.lastMessage}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 8, backgroundColor: '#F9FAFB' }}>
                <Text style={{ color: '#657786' }}>
                    Tap to open • Long press to delete
                </Text>
            </View>

            <Modal
                visible={isChatOpen}
                animationType='slide'
                presentationStyle='pageSheet'
                onDismiss={closeChatModal}
                onRequestClose={closeChatModal}

            >
                {selectedConversation && (
                    <SafeAreaView style={{ flex: 1 }}>
                        {/* {Header} */}
                        <View style={{
                            flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 12, backgroundColor: 'F3F4F6', gap: 5
                        }}>

                            <TouchableOpacity onPress={closeChatModal} >
                                <Feather name='arrow-left' size={24} color={'#1da1f2'} />
                            </TouchableOpacity>

                            <Image

                                source={{ uri: selectedConversation.user.avatar }}
                                style={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: 24,
                                    marginRight: 12,
                                }}
                            />

                            <View>
                                <Text style={{
                                    fontSize: 15,
                                    fontWeight: '700'
                                }}>{selectedConversation.user.name}</Text>
                                <Text style={{
                                    color: '#6B7280',
                                    fontSize: 12
                                }}> {selectedConversation.user.username}</Text>
                            </View>

                        </View>
                        <View style={{ flex: 1, }}>
                            <View style={{
                                justifyContent: 'center', alignItems: 'center',
                                paddingVertical: 10
                            }}>
                                <Text style={{
                                    textAlign: 'center',

                                    fontSize: 12,
                                    color: '#6B7280',
                                }}>
                                    This is the beginning of your conversation with {selectedConversation.user.name}
                                </Text>
                            </View>
                            <ScrollView style={{ flex: 1, }}>

                                {selectedConversation.messages.map((message) => (
                                    <View
                                        key={message.id}
                                        style={{
                                            flexDirection: 'row',
                                            marginBottom: 16,
                                            justifyContent: message.fromUser ? "flex-end" : 'flex-start',
                                            alignItems: 'flex-end',
                                            paddingHorizontal: 12
                                        }}
                                    >

                                        {!message.fromUser && (
                                            <Image
                                                source={{ uri: selectedConversation.user.avatar }}
                                                style={{
                                                    width: 32,
                                                    height: 32,
                                                    borderRadius: 16,
                                                    marginRight: 8,
                                                }}
                                            />
                                        )}


                                        <View style={{
                                            maxWidth: '75%',
                                            alignItems: message.fromUser ? 'flex-end' : 'flex-start'
                                        }}>

                                            <View style={{
                                                backgroundColor: message.fromUser ? "#3b82f6" : "#E5E7EB",
                                                paddingHorizontal: 14,
                                                paddingVertical: 10,
                                                borderRadius: 16,
                                                borderBottomRightRadius: message.fromUser ? 4 : 16,
                                                borderBottomLeftRadius: message.fromUser ? 16 : 4,
                                            }}>
                                                <Text style={{
                                                    color: message.fromUser ? "#FFFFFF" : "#1F2937",
                                                    fontSize: 14,
                                                    lineHeight: 20
                                                }}>
                                                    {message.text}
                                                </Text>
                                            </View>


                                            <Text style={{
                                                fontSize: 11,
                                                color: "#9CA3AF",
                                                marginTop: 4,
                                                marginHorizontal: 4
                                            }}>
                                                {message.time}
                                            </Text>
                                        </View>

                                    </View>
                                ))}
                            </ScrollView>
                        </View>


                    </SafeAreaView>
                )}
            </Modal>

        </SafeAreaView>
    )
}

export default MessageScreen