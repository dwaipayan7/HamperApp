import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons';
import { Divider } from '@/components/Divider';


const TRENDING_TOPICS = [
    { topic: "#ReactNative", tweets: "125K" },
    { topic: "#TypeScript", tweets: "89K" },
    { topic: "#WebDevelopment", tweets: "234K" },
    { topic: "#AI", tweets: "567K" },
    { topic: "#TechNews", tweets: "98K" },
];
const SearchScreen = () => {

    const [text, setText] = useState<string>("")



    return (
        <SafeAreaView className="flex-1 bg-white">
            <View style={{ marginTop: 10 }} className='px-4 py-3 border-b border-gray-100'>
                <View style={{ flexDirection: 'row', alignItems: 'center', borderRadius: 26, borderWidth: 0.5, paddingHorizontal: 12, marginHorizontal: 12, borderColor: 'gray', backgroundColor: '#F3F4F6' }}>
                    <Feather name='search' size={20} color={'#657786'} />
                    <TextInput
                        value={text}
                        onChangeText={setText}
                        placeholder='Search X'
                        className='flex-1 ml-3 text-base'
                        placeholderTextColor={'#657786'}

                    />

                </View>
            </View>

            <ScrollView className='flex-1' style={{ paddingHorizontal: 12 }}

                showsVerticalScrollIndicator={false}
            >
                <View style={{
                    marginTop: 20
                }} className='p-4'>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: '900',
                        color: 'black'
                    }}>
                        Trending for you
                    </Text>
                    {TRENDING_TOPICS.map((item, index) => (
                        <>

                            <TouchableOpacity key={index} style={{
                                marginTop: 10, gap: 5
                            }} className='py-3 border-b border-gray-100'>
                                <Text className='text-gray-500 text-sm'>Trending in Technology</Text>
                                <Text className='font-bold text-gray-900 text-lg'>{item.topic}</Text>
                                <Text className='text-gray-500 text-sm'>{item.tweets}</Text>
                            </TouchableOpacity>
                            <Divider style={{
                                marginVertical: 10
                            }} />
                        </>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SearchScreen

const styles = StyleSheet.create({})