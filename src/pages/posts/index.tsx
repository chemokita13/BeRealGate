import FriendPosts from "@/app/components/friendPosts";
import PostElement from "@/app/components/post";
import axiosInstance from "@/constants/axiosInstance";
import {
    ApiResponse,
    FriendsFeed,
    FriendsPost,
    Post,
    UserPosts,
} from "@/types/types";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

function PostFeed() {
    // Posts state
    const [posts, setPosts] = useState<FriendsPost[]>([]);
    // User post state
    const [userPost, setUserPost] = useState<UserPosts>();
    // Remaining posts state
    const [postsRemaining, setPostsRemaining] = useState<number>(0);

    const getPosts = async (token: string): Promise<void> => {
        const { status, data }: { status: number; data: ApiResponse } =
            await axiosInstance.get("friends/feed", {
                headers: {
                    token: token, // Send token in headers
                },
            });
        if (status !== 200) {
            alert("Error getting posts");
            return;
        }
        const PostData: FriendsFeed = data.data.data; // Get post data
        const UserPost: UserPosts = PostData.userPosts; // Get user posts
        const friendPosts: FriendsPost[] = PostData.friendsPosts; // Get friend posts
        setPosts(() => friendPosts); // Set posts state
        setUserPost(() => UserPost); // Set user post state
        setPostsRemaining(() => PostData.remainingPosts); // Set remaining posts state
    };

    useEffect(() => {
        const cookies = new Cookies(); // Cookies instance
        const token = cookies.get("token"); // Get token from cookies
        getPosts(token);
    }, []);

    return (
        <div className="MainComponentContainer">
            {userPost && (
                <div>
                    <h1>Your post: @{userPost.user.username}</h1>
                    {userPost.posts.map((post: Post) => {
                        return <PostElement post={post} key={post.id} />;
                    })}
                    <p>Posts made: {userPost.posts.length}</p>
                    <p>Remaining posts: {postsRemaining}</p>
                </div>
            )}
            <div>
                {posts.map((Fpost: FriendsPost) => {
                    return (
                        <FriendPosts FriendPost={Fpost} key={Fpost.user.id} />
                    );
                })}
            </div>
        </div>
    );
}

export default PostFeed;
