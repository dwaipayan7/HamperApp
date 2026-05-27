import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { usePosts } from '@/hooks/usePosts'
import { Ionicons } from '@expo/vector-icons'
import PostCard from './PostCard'
import { Post } from '../types/index';
import CommentsModal from './CommentsModal'
import { COLORS } from '@/constants/colors'

const PostsList = () => {

    const [visibleModal, setVisibleModal] = useState<boolean>(false)

    const { currentUser, } = useCurrentUser()

    const { deletePost, posts, isLoading, refetch, toggleLike, checkIsLiked, error } = usePosts();

    const [selectedPostId, setSelectedPostId] = useState<string | null>(null)

    const selectedPost = selectedPostId ? posts.find((p: Post) => p._id === selectedPostId) : null;



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
                keyExtractor={(item) => item._id}
                data={posts}
                renderItem={({ item, index }) => {
                    return <PostCard
                        key={index}
                        post={item}
                        onLike={toggleLike}
                        onComment={(post: Post) => {
                            setVisibleModal(true);
                            setSelectedPostId(post._id);
                        }}
                        onDelete={deletePost}
                        currentUser={currentUser}
                        isLiked={checkIsLiked(item.likes, currentUser)}
                    />
                }}
                contentContainerStyle={{
                    gap: 10
                }}
                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}


            />

            <CommentsModal show={visibleModal} onClose={() => setVisibleModal(false)} selectedPost={selectedPost} />
        </View>
    )
}

export default PostsList

const styles = StyleSheet.create({})