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
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cookie from "cookie-universal";
import { toast } from "react-toastify";

function PostFeed() {
    const cookies = Cookie(); // Cookies instance
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
                toast.warn("Error getting user info, something is going wrong");
            }
            const userInfoRes: UserInfo = data.data; // Get user info
            setUserInfo(userInfoRes); // Set user info state
        } catch (error) {
            toast.warn("Error getting user info, something is going wrong");
            console.error(error);
        }
    };

    const reFreshToken = async (): Promise<void> => {
        try {
            const oldToken =
                cookies.get("token") || localStorage.getItem("token"); // Get new token from cookies or localstorage
            const { data, status }: { data: ApiResponse; status: number } =
                await axiosInstance.post("login/refresh", { token: oldToken });
            if (status !== 201) {
                toast.warn(
                    "Error refreshing token, maybe you are gonna to be logged out"
                );
            }
            const newToken = data.data.token; // Get new token
            cookies.set("token", newToken, { path: "/" }); // Set new token in cookies
            localStorage.setItem("token", newToken); // Set new token in localstorage
        } catch (error) {
            toast.warn(
                "Error refreshing token, maybe you are gonna to be logged out"
            );
        }
    };

    const getPosts = async (): Promise<void> => {
        await reFreshToken(); // Refresh token
        try {
            const token = cookies.get("token") || localStorage.getItem("token"); // Get new token
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
            toast.error("Error getting posts, try login again");
            router.push("/login");
        }
    };

    useEffect(() => {
        toast.promise(getPosts(), {
            pending: "Loading posts, please, wait",
            success: "Posts loaded",
            error: "Error getting posts, try login again",
        });
    }, []);

    return (
        <Layout>
            <div className="min-h-screen pb-5 text-white bg-black min-w-screen sm:flex sm:flex-col sm:items-center">
                {userPost ? (
                    <div className="flex flex-col items-center mx-1 border-2 border-white rounded-xl sm:w-1/3">
                        <div className="flex flex-row gap-3 p-3">
                            <img
                                src={userPost.user.profilePicture.url}
                                className="rounded-full"
                                width={userPost.user.profilePicture.width / 10}
                                height={
                                    userPost.user.profilePicture.height / 10
                                }
                            />
                            <h1 className="text-2xl font-extrabold sm:text-4xl">
                                @{userPost.user.username}
                            </h1>
                        </div>
                        {userPost.posts.map((post: Post, index: number) => {
                            return (
                                <PostElement
                                    post={post}
                                    key={post.id}
                                    username={userPost.user.username}
                                    order={index}
                                    authorName={userPost.user.username}
                                    totalPosts={userPost.posts.length}
                                />
                            );
                        })}
                        <ul className="flex flex-col p-1 m-1 border border-white rounded-xl">
                            <li>Posts made: {userPost.posts.length}</li>
                            <li>Remaining posts: {postsRemaining}</li>
                        </ul>
                    </div>
                ) : (
                    <h1 className="text-center">
                        You don&apos;t have any posts yet
                    </h1>
                )}
                <div className="h-full mt-3 sm:flex sm:flex-row sm:flex-wrap sm:justify-center">
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
