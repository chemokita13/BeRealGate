"use client";
import React, { useEffect } from "react";
import Cookie from "cookie-universal";
import { useRouter } from "next/navigation";

function TokenGetter({ params }: { params: { token: string } }) {
    const cookies = Cookie();
    const router = useRouter();
    useEffect(() => {
        const token = params.token;
        if (!token || typeof token !== "string") {
            router.push("/");
            return;
        }
        // save token in cookies and localStorage
        cookies.set("token", token, { path: "/" });
        localStorage.setItem("token", token);
        // redirect to posts
        router.push("/posts");
        return;
    }, []);
    return <div>TokenGetter</div>;
}

export default TokenGetter;
