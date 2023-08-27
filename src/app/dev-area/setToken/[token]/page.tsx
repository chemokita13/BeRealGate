"use client";
import { useEffect } from "react";
import Cookie from "cookie-universal";
import { useRouter } from "next/navigation";

function TokenGetter({ params }: { params: { token: string } }) {
    const cookies = Cookie();
    const router = useRouter();
    useEffect(() => {
        try {
            const token = params.token;
            if (!token || typeof token !== "string") {
                router.push("/");
                return;
            }
            // save token in cookies and localStorage
            cookies.set("token", token, { path: "/" });
            localStorage.setItem("token", token);
            // redirect to posts
            router.push("/");
            return;
        } catch (error) {
            console.log("🚀 ~ file: page.tsx:23 ~ useEffect ~ error:", error);
            router.push("/");
        }
    }, [cookies, router, params]);
    return <div>TokenGetter, please wait, you will be redirected</div>;
}

export default TokenGetter;
