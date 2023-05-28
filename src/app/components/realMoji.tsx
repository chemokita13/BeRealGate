import { RealMojisEntity } from "@/types/types";
import React from "react";

function RealMoji({ realMoji }: { realMoji: RealMojisEntity }) {
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
}

export default RealMoji;
