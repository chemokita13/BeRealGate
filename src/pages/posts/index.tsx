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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

function PostFeed() {
    const cookies = new Cookies(); // Cookies instance
    const router = useRouter(); // Next router instance
    // Posts state
    const [posts, setPosts] = useState<FriendsPost[]>([]);
    // User post state
    const [userPost, setUserPost] = useState<UserPosts>();
    // Remaining posts state
    const [postsRemaining, setPostsRemaining] = useState<number>(0);

    const getPosts = async (): Promise<void> => {
        try {
            const token = cookies.get("token"); // Get new token
            const { data }: { data: ApiResponse } = await axiosInstance.get(
                "friends/feed",
                {
                    headers: {
                        token: token, // Send token in headers
                    },
                }
            );
            const PostData: FriendsFeed = data.data.data; // Get post data
            const UserPost: UserPosts = PostData.userPosts; // Get user posts
            const friendPosts: FriendsPost[] = PostData.friendsPosts; // Get friend posts
            setPosts(() => friendPosts); // Set posts state
            setUserPost(() => UserPost); // Set user post state
            setPostsRemaining(() => PostData.remainingPosts); // Set remaining posts state
        } catch (error) {
            alert("Error getting posts, try login again");
            router.push("/login");
        }
    };

    useEffect(() => {
        getPosts();
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
