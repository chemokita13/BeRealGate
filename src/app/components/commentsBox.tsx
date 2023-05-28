import axiosInstance from "@/constants/axiosInstance";
import { ApiResponse, CommentsEntity, Post } from "@/types/types";
import React, { useState } from "react";
import Cookies from "universal-cookie";

function CommentsBox({
    setPostInstance,
    postInstance,
}: {
    setPostInstance: React.Dispatch<React.SetStateAction<Post>>;
    postInstance: Post;
}) {
    const cookies = new Cookies(); // Cookies instance
    const [comment, setComment] = useState<string>(""); // comment state
    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = cookies.get("token"); // Get new token
        const { status, data }: { status: number; data: ApiResponse } =
            await axiosInstance.post(
                "post/comment",
                {
                    comment: comment,
                    postId: postInstance.id,
                },
                {
                    headers: {
                        token: token,
                    },
                }
            );
        if (status !== 201) {
            alert("Something went wrong");
            return;
        }
        const newComent: CommentsEntity = data.data;

        setPostInstance(() => {
            return {
                ...postInstance,
                comments: [...postInstance.comments, newComent],
            };
        });
    };
    return (
        <div>
            <div>
                {postInstance.comments.map((comment: CommentsEntity) => {
                    return (
                        <div key={comment.id}>
                            <h5>{comment.user.username}</h5>
                            <p>{comment.content}</p>
                        </div>
                    );
                })}
            </div>
            <div>
                <form onSubmit={(e) => handleFormSubmit(e)}>
                    <input
                        type="text"
                        name="comment"
                        id="comment"
                        onChange={(e) => setComment(e.currentTarget.value)}
                    />
                    <button type="submit">Comment</button>
                </form>
            </div>
        </div>
    );
}

export default CommentsBox;
