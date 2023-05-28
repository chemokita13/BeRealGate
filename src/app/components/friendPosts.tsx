import { FriendsPost, Post } from "@/types/types";
import React from "react";
import PostElement from "./post";

function FriendPosts({
    FriendPost,
    username,
}: {
    FriendPost: FriendsPost;
    username: string;
}) {
    return (
        <div>
            <h1>{FriendPost.user.username}</h1>
            {FriendPost.posts.map((post: Post) => {
                return (
                    <PostElement
                        post={post}
                        key={post.id}
                        username={username}
                    />
                );
            })}
        </div>
    );
}

export default FriendPosts;
