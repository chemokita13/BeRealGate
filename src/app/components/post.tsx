import axiosInstance from "@/constants/axiosInstance";
import { ApiResponse, CommentsEntity, Post } from "@/types/types";
import { useState } from "react";
import Cookies from "universal-cookie";

function PostElement({ post }: { post: Post }) {
    const cookies = new Cookies(); // Cookies instance
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
    const [comment, setComment] = useState<string>(""); // comment state
    const [postInstance, setPostInstance] = useState<Post>(post); // post state for updating it
    return (
        <div>
            <p>{postInstance.caption}</p>
            <img
                src={postInstance.primary.url}
                width={postInstance.primary.width / 4}
                height={postInstance.primary.height / 4}
            />
            <img
                src={postInstance.secondary.url}
                width={postInstance.secondary.width / 8}
                height={postInstance.secondary.height / 8}
            />
            <div>
                {postInstance.comments.map((comment: CommentsEntity) => {
                    return (
                        <div key={comment.id}>
                            <h5>{comment.user.username}</h5>
                            <p>{comment.content}</p>
                        </div>
                    );
                })}
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

export default PostElement;
