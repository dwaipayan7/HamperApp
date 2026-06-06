import { View, Text, Alert, TouchableOpacity, TextInput, ScrollView, Image, Modal } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { CONVERSATIONS, ConversationType } from '@/data/conversations';
import { Feather } from '@expo/vector-icons';
import Header from '@/components/Header';
import GradientWrapper from '@/components/GradientWrapper';
import SCText from '@/components/CustomText';
import { useDeleteConversation, useGetChatList, useSearchUsers } from '@/services/ChatService';
import dayjs from 'dayjs';
import { router } from 'expo-router';
import LoaderModal from '@/components/LoaderModal';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useDebounce } from "use-debounce";
import { COLORS } from '@/constants/colors';

const MessageScreen = () => {

    const insets = useSafeAreaInsets();
    // const [searchText, setSearchText] = useState("");
    // const [conversationList, setConversationList] = useState(CONVERSATIONS); // hard coded
    // const [selectedConversation, setSelectedConversation] = useState<ConversationType | null>(null)
    // const [isChatOpen, setIsChatOpen] = useState(false);
    // const [newMessage, setNewMessage] = useState("")


    const { data: chatList, isLoading: isLoadingChatList, refetch: refetchChatList } = useGetChatList();
    const { mutateAsync: deleteMessage, isPending } = useDeleteConversation()

    const [searchText, setSearchText] = useState("");

    const [debouncedSearch] = useDebounce(searchText, 500);

    const { data: searchUsers } = useSearchUsers(debouncedSearch)

    const isSearching = debouncedSearch.trim().length > 0;

    console.log("The response of search Users are: ", searchUsers);


    console.log("The ChatList is: ", chatList);

    const validationSchema = yup.object().shape({
        search: yup.string().trim()
    });

    const deleteConversation = (conversationId: string) => {
        Alert.alert("Delete Conversation", "Are you sure you want to delete this conversation?", [
            { text: "Cancel", style: 'cancel' },
            {
                text: "Delete",
                style: 'destructive',
                onPress: () => {
                    // setConversationList((prev) => prev.filter((conv) => conv.id !== conversationId));
                    deleteMessage(conversationId)
                }
            }
        ])
    }


    const displayData = isSearching ? searchUsers : chatList;

    return (

        <GradientWrapper>
            <SafeAreaView edges={['top']} style={{ flex: 1, }}>
                <LoaderModal show={isPending} />

                {/* <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>

                <Text className='text-xl font-bold text-gray-900'>Messages</Text>
                <TouchableOpacity>
                    <Feather name='edit' size={20} color={'#1da1f2'} />
                </TouchableOpacity>
            </View> */}

                <Header leftTitle='Messages' showEdit onEdit={() => { }} />
                <View style={{ flex: 1, paddingHorizontal: 12 }}>


                    <Formik
                        initialValues={{ search: '' }}
                        validationSchema={validationSchema}
                        onSubmit={async (values, { resetForm }) => {
                            try {

                                resetForm();
                            } catch (error) {
                                console.log(error);
                            }
                        }}
                    >

                        {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, height: 40, borderColor: 'gray', borderRadius: 24, paddingHorizontal: 12, marginTop: 10, backgroundColor: '#F3F4F6' }}>
                                <Feather name="search" size={20} color="#657786" />
                                <TextInput
                                    placeholder="Search for people and groups"
                                    className="flex-1 ml-3 text-base"
                                    placeholderTextColor="#657786"
                                    value={values.search}
                                    onChangeText={(text) => {
                                        setFieldValue("search", text);
                                        setSearchText(text);
                                    }}
                                />
                            </View>
                        )}
                    </Formik>

                    <ScrollView
                        style={{ flex: 1 }}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingBottom: 100 + insets.bottom
                        }}
                    >

                        {isSearching ? (
                            <>


                                {searchUsers?.length > 0 ? (
                                    searchUsers.map((user: any) => (
                                        <TouchableOpacity
                                            key={user._id}
                                            onPress={() =>
                                                router.push({
                                                    pathname: "/chat-details",
                                                    params: {
                                                        userId: user._id,
                                                        userName: `${user.firstName} ${user.lastName}`,
                                                        userAvatar: user.profilePicture,
                                                    },
                                                })
                                            }
                                            style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                                paddingVertical: 14,
                                                paddingHorizontal: 10,
                                            }}
                                        >
                                            <Image
                                                source={{ uri: user.profilePicture }}
                                                style={{
                                                    width: 48,
                                                    height: 48,
                                                    borderRadius: 24,
                                                    marginRight: 12,
                                                }}
                                            />

                                            <View>
                                                <SCText color="white">
                                                    {user.firstName} {user.lastName}
                                                </SCText>

                                                <SCText color="#6B7280">
                                                    @{user.username}
                                                </SCText>
                                            </View>
                                        </TouchableOpacity>
                                    ))
                                ) : (
                                    <View
                                        style={{
                                            alignItems: "center",
                                            justifyContent: "center",
                                            paddingVertical: 40,
                                            flexDirection: 'row',
                                            gap: 10
                                        }}
                                    >
                                        <Feather name="search" style={{
                                            marginTop: 10
                                        }} size={24} color="#6B7280" />

                                        <SCText
                                            color={COLORS.white}
                                            style={{ marginTop: 10 }}
                                        >
                                            No users found
                                        </SCText>
                                    </View>
                                )}
                            </>
                        ) :
                            <>
                                {chatList?.map((chats: any) => (
                                    <TouchableOpacity
                                        key={chats?.user?.id}
                                        onPress={() => router.push({
                                            pathname: '/chat-details',
                                            params: {
                                                userId: chats?.user?._id,
                                                userName: `${chats?.user?.firstName} ${chats?.user?.lastName}`,
                                                userAvatar: chats?.user?.profilePicture,
                                            }
                                        })}
                                        onLongPress={() => deleteConversation(chats?.user?.id)}
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            paddingVertical: 14,
                                            paddingHorizontal: 10,
                                        }}
                                    >
                                        <Image
                                            source={{ uri: chats?.user?.profilePicture }}
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
                                                    <SCText
                                                        numberOfLines={1}
                                                        size={16}
                                                        color='white'
                                                        style={{
                                                            // fontSize: 16,
                                                            // fontWeight: '700',
                                                            // color: '#000',

                                                        }}
                                                    >
                                                        {chats?.user?.firstName}
                                                    </SCText>
                                                    <SCText
                                                        numberOfLines={1}
                                                        size={16}
                                                        color='white'
                                                        style={{


                                                        }}
                                                    >
                                                        {' '}{chats?.user?.lastName}
                                                    </SCText>
                                                </View>

                                                <View>

                                                    <SCText color={'#6B7280'} size={12}>{dayjs(chats?.lastMessage?.createdAt,).format('hh-mm A')}</SCText>
                                                </View>
                                            </View>

                                            <SCText
                                                numberOfLines={1}
                                                style={{
                                                    color: '#6B7280',
                                                    marginTop: 4,
                                                }}
                                            >
                                                {chats?.lastMessage?.text}
                                            </SCText>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </>}


                    </ScrollView>

                    <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 8, }}>
                        <SCText color='#657786'>
                            Tap to open • Long press to delete
                        </SCText>
                    </View>


                </View>

            </SafeAreaView>
        </GradientWrapper >
    )
}

export default MessageScreen