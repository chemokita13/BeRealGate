/* eslint-disable @next/next/no-img-element */
"use client";
import FriendPosts from "@/components/friendPosts";
import PostElement from "@/components/post";
import axiosInstance from "@/constants/axiosInstance";
import {
    ApiResponse,
    FriendsFeed,
    FriendsPost,
    Post,
    UserInfo,
    UserPosts,
} from "@/types/types";
import { useEffect, useState } from "react";
import Cookie from "cookie-universal";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
            console.log("🚀 ~ file: page.tsx:43 ~ getUserInfo ~ error:", error);
            toast.warn("Error getting user info, something is going wrong");
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
                    "Error refreshing token, you may be logged out soon"
                );
            }
            const newToken = data.data.token; // Get new token
            cookies.set("token", newToken, { path: "/" }); // Set new token in cookies
            localStorage.setItem("token", newToken); // Set new token in localstorage
        } catch (error) {
            console.log(
                "🚀 ~ file: page.tsx:63 ~ reFreshToken ~ error:",
                error
            );
            toast.warn("Error refreshing token, you may be logged out soon");
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
            console.log("🚀 ~ file: page.tsx:94 ~ getPosts ~ error:", error);
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
        <div className="flex flex-col min-h-screen gap-5 pb-5 text-white bg-black min-w-screen sm:items-center ">
            {userPost ? (
                <div className="flex flex-col items-center mx-1 border-2 border-white rounded-xl sm:w-1/3">
                    <div className="flex flex-row gap-3 p-3">
                        <img
                            src={userPost.user.profilePicture.url}
                            className="rounded-full"
                            width={userPost.user.profilePicture.width / 10}
                            height={userPost.user.profilePicture.height / 10}
                            alt="profile picture"
                        />
                        <h1 className="text-2xl font-extrabold sm:text-4xl">
                            @{userPost.user.username}
                        </h1>
                    </div>
                    <div className="flex flex-row overflow-hidden min-w-[300px] w-[375px] carousel m-auto sm:m-0">
                        {userPost.posts.map((post: Post, index: number) => {
                            return (
                                <PostElement
                                    post={post}
                                    key={post.id}
                                    username={userPost.user.username}
                                    order={index}
                                    authorName={userPost.user.username}
                                    totalPosts={userPost.posts.length}
                                    realMojis={post.realMojis}
                                />
                            );
                        })}
                    </div>
                    <ul className="flex flex-col p-1 m-1 border border-white rounded-xl">
                        <li>Posts made: {userPost.posts.length}</li>
                        <li>Remaining posts: {postsRemaining}</li>
                    </ul>
                </div>
            ) : (
                <h1 className="text-center cursor-default">
                    You don&apos;t have any posts yet
                </h1>
            )}
            <Link
                className="py-3 m-3 text-xl text-center underline transition-all duration-150 border border-white rounded-lg sm:w-1/3 hover:underline hover:scale-110 hover:text-2xl"
                href={"/posts/friends-of-friends"}
            >
                See Friends-of-friends posts
            </Link>
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
    );
}

export default PostFeed;
