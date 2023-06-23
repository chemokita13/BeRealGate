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
        <div className="m-1 border border-white sm:flex sm:flex-col sm:w-[30%] sm:items-center rounded-md">
            {FriendPost.user.profilePicture ? (
                <div className="flex flex-row items-center gap-3 p-3">
                    <img
                        src={FriendPost.user.profilePicture.url}
                        className="rounded-full"
                        width={50}
                        height={50}
                        alt="Profile picture"
                    />
                    <h1 className="text-xl font-bold text-center underline sm:font-bold before:content-['@'] before:font-extrabold">
                        {FriendPost.user.username}
                    </h1>
                </div>
            ) : (
                <h1 className="text-xl p-3 font-bold text-center underline sm:font-bold before:content-['@'] before:font-extrabold">
                    {FriendPost.user.username}
                </h1>
            )}
            <div className="flex flex-row overflow-hidden min-w-[300px] w-[375px] carousel m-auto sm:m-0">
                {FriendPost.posts.map((post: Post, index: number) => {
                    return (
                        <PostElement
                            post={post}
                            key={post.id}
                            username={username}
                            order={index}
                            authorName={FriendPost.user.username}
                            totalPosts={FriendPost.posts.length}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default FriendPosts;
