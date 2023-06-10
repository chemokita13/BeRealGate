import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import Cookie from "cookie-universal";

function TokenGetter() {
    const router = useRouter();
    const cookies = Cookie();
    useEffect(() => {
        const token = router.query.token;
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
    }, [router]);
    return <div>TokenGetter</div>;
}

export default TokenGetter;
