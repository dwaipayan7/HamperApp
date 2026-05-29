import { queryClient } from "@/app/_layout";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useApi } from "./useAPi";

export const usePosts = (username?: string) => {

    const api = useApi();

    const {

        data: postsData,
        isLoading,
        error,
        refetch

    } = useQuery({
        queryKey: username ? ["userPosts", username] : ["posts"],
        queryFn: () => (username ? api.getUserPosts(username) : api.getPosts()),
        select: (response) => response.data.posts
    });




    const checkIsLiked = (postLikes: string[], currentUser: any) => {
        const isLiked = currentUser && postLikes?.includes(currentUser?._id);
        return isLiked;
    }

    return {
        posts: postsData || [],
        isLoading,
        error,
        refetch,
        // toggleLike: (postId: string) => likePostMutation.mutate(postId),
        // deletePost: (postId: string) => deleteMutation.mutate(postId),
        checkIsLiked,

    }

}
