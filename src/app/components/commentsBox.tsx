import axiosInstance from "@/constants/axiosInstance";
import { ApiResponse, CommentsEntity, Post } from "@/types/types";
import React, { useState } from "react";
import Cookie from "cookie-universal";
import { toast } from "react-toastify";

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
    const newCommentInputRef = React.createRef<HTMLInputElement>(); // New comment input ref
    // Cookies instance
    const [comment, setComment] = useState<string>(""); // comment state
    const [showComments, setShowComments] = useState<boolean>(false); // Show comments state
    const handleDeleteComment = async (commentId: string) => {
        const token = cookies.get("token") || localStorage.getItem("token"); // Get new token
        const { status, data }: { status: number; data: ApiResponse } =
            await axiosInstance.delete("post/comment", {
                headers: {
                    token: token,
                },
                data: {
                    commentId: commentId,
                    postId: postInstance.id,
                },
            });
        setPostInstance(() => {
            return {
                ...postInstance,
                comments: postInstance.comments.filter(
                    (comment: CommentsEntity) => comment.id !== commentId
                ),
            };
        });
        toast.success("Comment deleted");
    };
    const handleFormSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();
        try {
            const token = cookies.get("token"); // Get new token
            const { data }: { status: number; data: ApiResponse } =
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
            const newComent: CommentsEntity = data.data;

            setPostInstance(() => {
                return {
                    ...postInstance,
                    comments: [...postInstance.comments, newComent],
                };
            });
            newCommentInputRef.current!.value = "";
            toast.success("Comment posted");
        } catch (error) {
            toast.error("Error posting comment");
            return;
        }
    };
    return (
        <div className="flex flex-col items-center w-full">
            <div
                className={`flex flex-col items-center w-3/2 ${
                    showComments ? "h-full" : "h-0"
                } overflow-hidden`}
            >
                {postInstance.comments.map((comment: CommentsEntity) => {
                    return (
                        <div
                            key={comment.id}
                            className={`${
                                comment.user.username === username
                                    ? "text-right self-end"
                                    : "text-left self-start"
                            } w-1/2`}
                        >
                            <h5 className="font-bold underline">
                                @{comment.user.username}
                            </h5>
                            <div className="flex flex-col">
                                <p className="border-t border-white">
                                    {comment.content}
                                </p>
                                {comment.user.username === username && (
                                    <button
                                        onClick={() =>
                                            handleDeleteComment(comment.id)
                                        }
                                        className="text-red-500 border border-red-500 rounded-md"
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
            <button
                className="text-white underline"
                onClick={() => {
                    postInstance.comments.length > 0 &&
                        setShowComments(!showComments);
                }}
            >
                {postInstance.comments.length <= 0
                    ? "no comments yet"
                    : `${
                          showComments
                              ? "Hide"
                              : "Show " + postInstance.comments.length
                      } comments`}
            </button>
            <div className="p-1 m-1 border border-white border-dashed rounded-md">
                <form onSubmit={(e) => handleFormSubmit(e)}>
                    <input
                        type="text"
                        name="comment"
                        id="comment"
                        ref={newCommentInputRef}
                        onChange={(e) => setComment(e.currentTarget.value)}
                        className="bg-black border border-white"
                    />
                    <button
                        type="submit"
                        className="text-black bg-white border border-black rounded-md"
                    >
                        Comment
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CommentsBox;
