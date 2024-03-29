import { Music } from "@/types/types";

function Music({ music }: { music: Music }) {
    return (
        <div>
            <h3 className="underline">
                <a href={music.openUrl}>
                    🎵 {music.track} -{music.artist} 🎵
                </a>
            </h3>
        </div>
    );
}

export default Music;
