import FriendPosts from "@/app/components/friendPosts";
import PostElement from "@/app/components/post";
import Layout from "@/app/layout";
import axiosInstance from "@/constants/axiosInstance";
import {
    ApiResponse,
    FriendsFeed,
    FriendsPost,
    Post,
    UserInfo,
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
    // User info state
    const [userInfo, setUserInfo] = useState<UserInfo>();

    const getUserInfo = async (token: string): Promise<void> => {
        try {
            const { data, status } = await axiosInstance.get("friends/me", {
                headers: {
                    token: token, // Send token in headers
                },
            }); // Get user info
            if (status !== 200) {
                alert("Error getting user info, something is going wrong");
            }
            const userInfoRes: UserInfo = data.data; // Get user info
            setUserInfo(userInfoRes); // Set user info state
        } catch (error) {
            alert("Error getting user info, something is going wrong");
            console.error(error);
        }
    };

    const reFreshToken = async (): Promise<void> => {
        const oldToken = cookies.get("token"); // Get new token
        const { data, status }: { data: ApiResponse; status: number } =
            await axiosInstance.post("login/refresh", { token: oldToken });
        if (status !== 201) {
            alert(
                "Error refreshing token, maybe you are gonna to be logged out"
            );
        }
        const newToken = data.data.token; // Get new token
        console.log(data);
        cookies.set("token", newToken, { path: "/" }); // Set new token
    };

    const getPosts = async (): Promise<void> => {
        await reFreshToken(); // Refresh token
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
            await getUserInfo(token); // Get user info
        } catch (error) {
            alert("Error getting posts, try login again");
            router.push("/login");
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <Layout>
            <div className="MainComponentContainer">
                {userPost ? (
                    <div>
                        <h1>Your post: @{userPost.user.username}</h1>
                        {userPost.posts.map((post: Post) => {
                            return (
                                <PostElement
                                    post={post}
                                    key={post.id}
                                    username={userInfo?.username || ""}
                                />
                            );
                        })}
                        <p>Posts made: {userPost.posts.length}</p>
                        <p>Remaining posts: {postsRemaining}</p>
                    </div>
                ) : (
                    <h1>You don't have any post</h1>
                )}
                <div>
                    {posts.map((Fpost: FriendsPost) => {
                        return (
                            <FriendPosts
                                FriendPost={Fpost}
                                username={userInfo?.username || ""}
                                key={Fpost.user.id}
                            />
                        );
                    })}
                </div>
            </div>
        </Layout>
    );
}

export default PostFeed;
