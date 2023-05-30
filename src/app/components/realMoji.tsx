import { RealMojisEntity } from "@/types/types";
import React from "react";

function RealMoji({ realMoji }: { realMoji: RealMojisEntity }) {
    const textToMogi = {
        heartEyes: "😍",
        up: "👍",
        happy: "😀",
        surprised: "😮",
        instant: "⚡",
    };
    return (
        <div key={realMoji.id}>
            <div className="relative w-[50px] aspect-square">
                <img
                    src={realMoji.media.url}
                    width={50}
                    height={50}
                    className="rounded-full"
                />
                <span className="absolute bottom-0 right-[-10px]">
                    {textToMogi[realMoji.type]}
                </span>
            </div>
            <h3>@{realMoji.user.username}</h3>
        </div>
    );
}

export default RealMoji;
