import { Post, RealMojisEntity } from "@/types/types";
import { useState } from "react";
import CommentsBox from "./commentsBox";
import RealMoji from "./realMoji";
import Music from "./music";

function PostElement({ post, username }: { post: Post; username: string }) {
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

            <CommentsBox
                postInstance={postInstance}
                setPostInstance={setPostInstance}
                username={username}
            />

            <div>
                {postInstance.realMojis.map((realMoji: RealMojisEntity) => {
                    return <RealMoji realMoji={realMoji} key={realMoji.id} />;
                })}
            </div>
            {postInstance.music && <Music music={postInstance.music} />}
        </div>
    );
}

export default PostElement;
