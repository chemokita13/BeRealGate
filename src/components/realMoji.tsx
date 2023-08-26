import { RealMojisEntity } from "@/types/types";
import React from "react";

function RealMoji({ realMoji }: { realMoji: RealMojisEntity }) {
    const textToMogi = {
        heartEyes: "😍",
        up: "👍",
        happy: "😀",
        surprised: "😮",
        instant: "⚡",
        "😍": "😍",
        "👍": "👍",
        "😮": "😮",
        "⚡": "⚡",
    };
    return (
        <div key={realMoji.id} className="flex flex-col items-center m-2">
            <div className="relative w-[50px] aspect-square">
                <img
                    src={realMoji.media.url}
                    width={50}
                    height={50}
                    className="rounded-full"
                    alt="realMoji"
                />
                <span className="absolute bottom-0 right-[-10px]">
                    {realMoji.emoji || textToMogi[realMoji.type]}
                </span>
            </div>
            <p className="text-xs">@{realMoji.user.username}</p>
        </div>
    );
}

export default RealMoji;
