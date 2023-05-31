import { Post, RealMojisEntity, sc } from "@/types/types";
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
            {postInstance.screenshots && (
                <span className="text-left">
                    Screenshots:{" "}
                    {postInstance.screenshots.map((screenshot: sc) => {
                        return screenshot.user.username;
                    })}
                </span>
            )}
            <div className="relative">
                <img
                    onClick={() => setFocusFirst(!focusFirst)}
                    src={
                        focusFirst
                            ? postInstance.secondary.url
                            : postInstance.primary.url
                    }
                    //? width={1500 / 15}
                    //? height={2000 / 15}
                    className="absolute top-[10px] left-[10px] border-4 border-black rounded-lg m-0 min-w-[75px] min-h-[100px] max-w-[100px] max-h-[150px]"
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
            {postInstance.music && <Music music={postInstance.music} />}
            <div className="flex flex-row flex-wrap justify-center">
                {postInstance.realMojis.map((realMoji: RealMojisEntity) => {
                    return <RealMoji realMoji={realMoji} key={realMoji.id} />;
                })}
            </div>
            <CommentsBox
                postInstance={postInstance}
                setPostInstance={setPostInstance}
                username={username}
            />
            {/** Do not try to understand that, hahahah */}
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
