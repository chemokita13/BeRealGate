import PostElement from "@/app/components/post";
import axiosInstance from "@/constants/axiosInstance";
import { ApiResponse, Post } from "@/types/types";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

function PostFeed() {
    // Posts state
    const [posts, setPosts] = useState<Post[]>([]);

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
        setPosts(() => data.data.data); // Set posts state
    };

    useEffect(() => {
        const cookies = new Cookies(); // Cookies instance
        const token = cookies.get("token"); // Get token from cookies
        getPosts(token);
    }, []);

    return (
        <div>
            {posts.map((post: Post) => {
                return <PostElement post={post} key={post.id} />;
            })}
        </div>
    );
}

export default PostFeed;
