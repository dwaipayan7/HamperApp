import { queryClient } from "@/app/_layout";
import { ApiUtility, useApiClient } from "@/utils/api"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const usePosts = () => {

    const api = useApiClient();

    const apiUtility = new ApiUtility(api);
    const {

        data: postsData,
        isLoading,
        error,
        refetch

    } = useQuery({
        queryKey: ["posts"],
        queryFn: () => apiUtility.getPosts(),
        select: (response) => response.data.posts
    });


    const likePostMutation = useMutation({
        mutationFn: (postId: string) => apiUtility.likePost(postId),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] })
    });

    const deleteMutation = useMutation({
        mutationFn: (postId: string) => apiUtility.deletePost(postId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            queryClient.invalidateQueries({ queryKey: ["userPosts"] });
        }
    })

    const checkIsLiked = (postLikes: string[], currentUser: any) => {
        const isLiked = currentUser && postLikes?.includes(currentUser?._id);
        return isLiked;
    }

    return {
        posts: postsData || [],
        isLoading,
        error,
        refetch,
        toggleLike: (postId: string) => likePostMutation.mutate(postId),
        deletePost: (postId: string) => deleteMutation.mutate(postId),
        checkIsLiked
    }

}