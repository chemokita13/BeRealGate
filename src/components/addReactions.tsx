import axiosInstance from "@/constants/axiosInstance";
import React, { useEffect, useState } from "react";
import Cookie from "cookie-universal";
import { ApiResponse, realmojiOfUser } from "@/types/types";
import { toast } from "react-toastify";

function AddReactions({
    userId,
    postId,
    all,
}: {
    userId: string;
    postId: string;
    all: boolean;
}) {
    const cookie = Cookie();
    const token = localStorage.getItem("token") || cookie.get("token");
    const [toggled, setToggled] = useState(false);
    const [avalibleReactions, setAvalibleReactions] = useState<
        realmojiOfUser[]
    >([]);
    const MojiToText: { [key: string]: string } = {
        "😍": "heartEyes",
        "👍": "up",
        "😲": "surprised",
        "⚡": "instant",
    };
    const fecthApi = async (): Promise<void> => {
        const { status, data }: ApiResponse = await axiosInstance.get(
            "friends/me",
            {
                headers: {
                    token: token,
                },
            }
        );
        if (status != 200) {
            toast.error("Something went wrong while fetching reactions");
            return;
        }
        const realmojis: realmojiOfUser[] = data.data.realmojis;
        setAvalibleReactions(realmojis);
    };
    const handleReaction = async (emoji: string): Promise<void> => {
        if (!all) {
            const textMoji: string = MojiToText[emoji];
            if (!textMoji) {
                toast.error("Something went wrong while submitting reaction");
                return;
            }
            const response = await axiosInstance.put(
                `realmojis/${userId}/${postId}`,
                {
                    mojiType: textMoji,
                },
                {
                    headers: {
                        token: token,
                    },
                }
            );
            return;
        }
        const textMoji: string = MojiToText[emoji];
        if (!textMoji) {
            toast.error(
                "Something went wrong while submitting reactions to all posts"
            );
            return;
        }
        const response = await axiosInstance.post(
            "realmojis",
            {
                mojiType: textMoji,
            },
            {
                headers: {
                    token: token,
                },
            }
        );
        return;
    };
    useEffect(() => {
        fecthApi();
    }, []);

    return (
        <div className="w-5/6 border-white border rounded-lg flex flex-col items-center">
            <span className="font-semibold ">
                {all ? "React to all posts" : "React to post"}
            </span>
            <div className=" flex flex-row justify-center">
                {avalibleReactions &&
                    avalibleReactions.map((realMoji) => {
                        return (
                            <div
                                key={realMoji.id}
                                className="flex flex- items-center m-2"
                                onClick={() => {
                                    toast.promise(
                                        handleReaction(realMoji.emoji),
                                        {
                                            pending:
                                                "Submiting reaction, please, wait",
                                            success:
                                                "Reaction submited, reload page to see it",
                                            error: "Error submiting reaction, try again",
                                        }
                                    );
                                }}
                            >
                                <div className="relative w-[50px] aspect-square">
                                    <img
                                        src={realMoji.media.url}
                                        width={50}
                                        height={50}
                                        className="rounded-full"
                                        alt="realMoji"
                                    />
                                    <span className="absolute bottom-0 right-[-10px]">
                                        {realMoji.emoji}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

export default AddReactions;
