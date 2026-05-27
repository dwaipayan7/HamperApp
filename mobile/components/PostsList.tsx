import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { usePosts } from '@/hooks/usePosts'
import { Ionicons } from '@expo/vector-icons'
import PostCard from './PostCard'
import { Post } from '../types/index';
import CommentsModal from './CommentsModal'
import { COLORS } from '@/constants/colors'
import { useDeletePost, useLikePost } from '@/services/PostService'

const PostsList = () => {

    const [visibleModal, setVisibleModal] = useState<boolean>(false)

    const { currentUser, } = useCurrentUser()

    const { posts, isLoading, refetch, checkIsLiked, error, } = usePosts();

    const { mutateAsync: deletePost, isPending: isDeleting } = useDeletePost()

    const { mutateAsync: likePost, isPending: isLiking } = useLikePost()

    const [selectedPostId, setSelectedPostId] = useState<string | null>(null)

    const selectedPost = selectedPostId ? posts.find((p: Post) => p._id === selectedPostId) : null;

    const [deletingPostId, setDeletingPostId] = useState<string | null>(null);

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
                        onLike={() => {
                            console.log("The liked post id is: ", item._id);

                            likePost(item._id)
                        }}
                        onComment={(post: Post) => {
                            setVisibleModal(true);
                            setSelectedPostId(post._id);
                        }}
                        // onDelete={async (postId: string) => deletePost(postId)}
                        onDelete={async (postId: string) => {
                            try {
                                setDeletingPostId(postId);

                                await deletePost(postId);

                            } catch (error) {
                                console.log(error);
                            } finally {
                                setDeletingPostId(null);
                            }
                        }}
                        currentUser={currentUser}
                        isLiked={checkIsLiked(item.likes, currentUser)}
                        isDeleting={deletingPostId === item._id}
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