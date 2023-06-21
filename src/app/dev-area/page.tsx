"use client";
import axios from "axios";
import Cookie from "cookie-universal";
import { useEffect, useState } from "react";

function DevPage() {
    async function getLastGitHubCommit(): Promise<string> {
        try {
            const response = await axios.get(
                "https://api.github.com/repos/chemokita13/berealgate/commits"
            );
            const lastCommitId = response.data[0].sha;
            return lastCommitId;
        } catch (error) {
            return "Not setted";
        }
    }

    const cookie = Cookie();
    const [token, setToken] = useState<string>("Not setted");
    const [lastCommitId, setLastCommitId] = useState<string>("Not setted");

    useEffect(() => {
        async function getTokenAndCommit() {
            try {
                setToken(
                    cookie.get("token") ||
                        localStorage.getItem("token") ||
                        "Not setted"
                );
            } catch (error) {
                setToken("Error while setting token");
            }
            try {
                const lastCommit: string = await getLastGitHubCommit();
                setLastCommitId(lastCommit);
            } catch (error) {
                setLastCommitId("Error while getting last commit");
            }
        }
        getTokenAndCommit();
    }, [cookie]);

    return (
        <div className="flex flex-col items-center h-screen text-white bg-black">
            <h1 className="text-xl underline decoration-amber-400 text-center before:content-['⚠️'] before:bg-white before:rounded-sm after:content-['⚠️'] after:bg-white after:rounded-sm">
                &nbsp;You are in the developers area, please do not share this
                with someonse not related to the project&nbsp;
            </h1>
            <div className="flex flex-col items-center flex-grow w-1/2">
                <h2 className="text-lg">Your token is:</h2>
                <p className="text-xs break-all">{token}</p>
            </div>
            <div className="flex flex-col items-center flex-grow w-1/2">
                <h2 className="text-lg">Last commit on GitHub:</h2>
                <p className="text-xs break-all">{lastCommitId}</p>
            </div>
        </div>
    );
}

export default DevPage;
