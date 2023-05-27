import { FriendsPost, Post } from "@/types/types";
import React from "react";
import PostElement from "./post";

function FriendPosts({ FriendPost }: { FriendPost: FriendsPost }) {
    return (
        <div>
            <h1>{FriendPost.user.username}</h1>
            {FriendPost.posts.map((post: Post) => {
                return <PostElement post={post} key={post.id} />;
            })}
        </div>
    );
}

export default FriendPosts;
