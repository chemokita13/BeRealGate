import { Post, RealMojisEntity } from "@/types/types";
import { useState } from "react";
import CommentsBox from "./commentsBox";
import RealMoji from "./realMoji";
import Music from "./music";

function PostElement({
    post,
    username,
    order,
    authorName,
    totalPosts,
}: {
    post: Post;
    username: string;
    order: number;
    authorName: string;
    totalPosts: number;
}) {
    const [postInstance, setPostInstance] = useState<Post>(post); // post state for updating it
    const [focusFirst, setFocusFirst] = useState<boolean>(true); // focusFirst state for focusing first img
    return (
        <div
            className="flex flex-col items-center justify-start w-screen h-full text-center sm:w-full"
            id={order.toString() + authorName}
        >
            <div className="relative">
                <img
                    onClick={() => setFocusFirst(!focusFirst)}
                    src={
                        focusFirst
                            ? postInstance.secondary.url
                            : postInstance.primary.url
                    }
                    //? width={1500 / 10}
                    //? height={2000 / 10}
                    className="absolute top-[10px] left-[10px] border-4 border-black rounded-lg m-0 min-w-[100px] min-h-[150px] max-w-[150px] max-h-[200px]"
                />
                <img
                    className="min-h-[400px] min-w-[300px] max-w-[375px] max-h-[500px] rounded-md"
                    src={
                        focusFirst
                            ? postInstance.primary.url
                            : postInstance.secondary.url
                    }
                    //? width={1500 / 4}
                    //? height={2000 / 4}
                />
            </div>
            <p>{postInstance.caption}</p>
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
            {totalPosts > 1 && (
                <a
                    href={`#${
                        order !== 0 ? order - 1 : totalPosts - 1
                    }${authorName}`}
                >
                    Previous
                </a>
            )}
            {order + 1} / {totalPosts}
            {totalPosts > 1 && (
                <a
                    href={`#${
                        order < totalPosts - 1 ? order + 1 : 0
                    }${authorName}`}
                >
                    Next
                </a>
            )}
        </div>
    );
}

export default PostElement;
