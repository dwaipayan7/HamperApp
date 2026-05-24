import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { usePosts } from '@/hooks/usePosts'
import { Ionicons } from '@expo/vector-icons'
import PostCard from './PostCard'

const PostsList = () => {

    const { currentUser, } = useCurrentUser()

    const { deletePost, posts, isLoading, refetch, toggleLike, checkIsLiked, error } = usePosts();

    console.log("THe currentUser data is: ", currentUser);

    console.log("THe posts are: ", posts);

    if (isLoading) {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center', alignItems: 'center'
            }}>

                <ActivityIndicator size={'large'} />

            </View>
        )
    }

    if (error) {
        return (<View style={{
            flex: 1,
            justifyContent: 'center', alignItems: 'center'
        }}>

            <TouchableOpacity style={{ flexDirection: 'row', gap: 6 }}>
                <Text>Retry</Text>
                <Ionicons name='refresh-circle' />
            </TouchableOpacity>

        </View>)
    }

    if (posts.length === 0) {
        return (<View style={{
            flex: 1,
            justifyContent: 'center', alignItems: 'center'
        }}>

            <Text>No posts yet</Text>

        </View>)
    }




    return (
        <View style={{ flex: 1 }}>
            <FlatList
                key={posts._id}
                data={posts}
                renderItem={({ item, index }) => {
                    return <PostCard
                        key={index}
                        post={item}
                        onLike={toggleLike}
                        onDelete={deletePost}
                        currentUser={currentUser}
                        isLiked={checkIsLiked(item.likes, currentUser)}
                    />
                }}

                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}


            />
        </View>
    )
}

export default PostsList

const styles = StyleSheet.create({})