"use client";
import FriendOfFriendPosts from "@/components/friend-of-friend";
import axiosInstance from "@/constants/axiosInstance";
import { ApiResponse, Post_FoF } from "@/types/types";
import { useEffect, useState } from "react";
import Cookie from "cookie-universal";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

function FriendsOfFriends() {
    const [posts, setPosts] = useState<Post_FoF[]>();
    const cookies = Cookie(); // Cookies instance
    const router = useRouter(); // Next router instance
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
                "friends/friends-of-friends",
                {
                    headers: {
                        token: token, // Send token in headers
                    },
                }
            );
            const PostData: { data: Post_FoF[]; next: string } = data.data.data; // Get post data
            console.log(
                "🚀 ~ file: page.tsx:58 ~ getPosts ~ PostData:",
                PostData
            );
            setPosts(PostData.data); // Set posts state
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
        <div className="flex flex-col min-h-screen pb-5 text-white bg-black min-w-screen sm:items-center">
            <div className="h-full sm:flex sm:flex-row sm:flex-wrap sm:justify-center">
                {posts?.map((Fpost: Post_FoF, index: number) => {
                    return (
                        <FriendOfFriendPosts
                            FriendOfFriend={Fpost}
                            key={index}
                            username={"no needed but required"}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default FriendsOfFriends;
