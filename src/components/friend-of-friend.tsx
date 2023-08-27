/* eslint-disable @next/next/no-img-element */
import { Post_FoF } from "@/types/types";
import React from "react";
import PostElement from "./post";

function FriendOfFriendPosts({
    FriendOfFriend,
    username,
}: {
    FriendOfFriend: Post_FoF;
    username: string;
}) {
    return (
        <div className="m-1 border border-white sm:flex sm:flex-col sm:w-[30%] sm:items-center rounded-md">
            {FriendOfFriend.user.profilePicture ? (
                <>
                    <div className="flex flex-row items-center gap-3 p-3">
                        <img
                            src={FriendOfFriend.user.profilePicture.url}
                            className="rounded-full"
                            width={50}
                            height={50}
                            alt="Profile picture"
                        />
                        <h1 className="text-xl font-bold text-center underline sm:font-bold before:content-['@'] before:font-extrabold">
                            {FriendOfFriend.user.username}
                        </h1>
                    </div>
                    <h2 className="p-2 text-sm text-center text-gray-400">
                        Friend of:{" "}
                        {FriendOfFriend.user.relationship.commonFriends.map(
                            (friend) => {
                                return " " + friend.username + ",";
                            }
                        )}
                    </h2>
                </>
            ) : (
                <>
                    <h1 className="text-xl p-3 font-bold text-center underline sm:font-bold before:content-['@'] before:font-extrabold">
                        {FriendOfFriend.user.username}
                    </h1>
                    <h2 className="p-2 text-sm text-center text-gray-400">
                        Friend of:{" "}
                        {FriendOfFriend.user.relationship.commonFriends.map(
                            (friend) => {
                                return " " + friend.username + ",";
                            }
                        )}
                    </h2>
                </>
            )}
            <div className="flex flex-row overflow-hidden min-w-[300px] w-[375px] carousel m-auto sm:m-0">
                <PostElement
                    post={FriendOfFriend}
                    key={FriendOfFriend.id}
                    username={username}
                    order={0}
                    authorName={FriendOfFriend.user.username}
                    totalPosts={1}
                    realMojis={FriendOfFriend.realmojis.sample}
                />
            </div>
        </div>
    );
}

export default FriendOfFriendPosts;
