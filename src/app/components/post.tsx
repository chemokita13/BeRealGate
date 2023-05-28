import axiosInstance from "@/constants/axiosInstance";
import {
    ApiResponse,
    CommentsEntity,
    Post,
    RealMojisEntity,
} from "@/types/types";
import { useState } from "react";
import Cookies from "universal-cookie";
import CommentsBox from "./commentsBox";

function PostElement({ post }: { post: Post }) {
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
            />

            <div>
                {postInstance.realMojis.map((realMoji: RealMojisEntity) => {
                    return (
                        <div key={realMoji.id}>
                            <img
                                src={realMoji.media.url}
                                width={realMoji.media.width / 10}
                                height={realMoji.media.height / 10}
                            />
                            <h3>
                                {realMoji.user.username} - {realMoji.type}
                            </h3>
                        </div>
                    );
                })}
            </div>
            {postInstance.music && (
                <div>
                    <h3>
                        <a href={postInstance.music.openUrl}>
                            {postInstance.music.track} -
                            {postInstance.music.artist}
                        </a>
                    </h3>
                </div>
            )}
        </div>
    );
}

export default PostElement;
