import axiosInstance from "@/constants/axiosInstance";
import { ApiResponse, CommentsEntity, Post } from "@/types/types";
import React, { useState } from "react";
import Cookie from "cookie-universal";

function CommentsBox({
    setPostInstance,
    postInstance,
    username,
}: {
    setPostInstance: React.Dispatch<React.SetStateAction<Post>>;
    postInstance: Post;
    username: string;
}) {
    const cookies = Cookie();
    // Cookies instance
    const [comment, setComment] = useState<string>(""); // comment state
    const handleDeleteComment = async (commentId: string) => {
        const token = cookies.get("token"); // Get new token
        const { status, data }: { status: number; data: ApiResponse } =
            await axiosInstance.delete(`post/comment`, {
                headers: {
                    token: token,
                },
                data: {
                    commentId: commentId,
                    postId: postInstance.id,
                },
            });
        if (status !== 201) {
            alert("Something went wrong");
            return;
        }
        setPostInstance(() => {
            return {
                ...postInstance,
                comments: postInstance.comments.filter(
                    (comment: CommentsEntity) => comment.id !== commentId
                ),
            };
        });
        alert(data.message);
    };
    const handleFormSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
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
                            <h5 className="font-bold text-center underline">
                                @{comment.user.username}
                            </h5>
                            <div className="flex flex-col">
                                <p className="text-left">{comment.content}</p>
                                {comment.user.username === username && (
                                    <button
                                        onClick={() =>
                                            handleDeleteComment(comment.id)
                                        }
                                        className="text-red-500"
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
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
                        className="bg-black border border-white"
                    />
                    <button type="submit">Comment</button>
                </form>
            </div>
        </div>
    );
}

export default CommentsBox;
