import { Post } from "@/types/types";

function PostElement({ post }: { post: Post }) {
    //?console.log("🚀 ~ file: post.tsx:4 ~ post ~ Post:", Post);
    return (
        <div>
            <h1>{post.userName}</h1>
            <p>{post.caption}</p>
            <img
                src={post.photoURL}
                width={post.imageWidth / 4}
                height={post.imageHeight / 4}
            />
            <img
                src={post.secondaryPhotoURL}
                width={post.secondaryImageWidth / 8}
                height={post.secondaryImageHeight / 8}
            />
            <div>
                {post.comment.map((comment) => {
                    return (
                        <div key={comment.id}>
                            <h5>{comment.userName}</h5>
                            <p>{comment.text}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default PostElement;
