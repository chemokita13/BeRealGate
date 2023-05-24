import { CommentsEntity, Post } from "@/types/types";

function PostElement({ post }: { post: Post }) {
    return (
        <div>
            <p>{post.caption}</p>
            <img
                src={post.primary.url}
                width={post.primary.width / 4}
                height={post.primary.height / 4}
            />
            <img
                src={post.secondary.url}
                width={post.secondary.width / 8}
                height={post.secondary.height / 8}
            />
            <div>
                {post.comments.map((comment: CommentsEntity) => {
                    return (
                        <div key={comment.id}>
                            <h5>{comment.user.username}</h5>
                            <p>{comment.content}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default PostElement;
