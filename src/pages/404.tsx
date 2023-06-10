import Layout from "@/app/layout";
import Link from "next/link";
import React from "react";

function NotFound() {
    return (
        <Layout>
            <main className="flex flex-col items-center h-screen text-white">
                <h1 className="text-4xl font-extrabold text-center before:content-['404'] before:text-red-500">
                    &nbsp;- Page Not Found
                </h1>
                <h2 className="w-3/4 text-xl font-semibold text-center">
                    Maybe you are in the wrong place, check the url or go{" "}
                    <Link
                        className="underline transition-all duration-100 hover:text-2xl hover:text-bold"
                        href="/"
                    >
                        home
                    </Link>
                    ,&nbsp;
                    <Link
                        className="underline transition-all duration-100 hover:text-2xl hover:text-bold"
                        href={"/login"}
                    >
                        login
                    </Link>{" "}
                    or{" "}
                    <Link
                        className="underline transition-all duration-100 hover:text-2xl hover:text-bold"
                        href={"/posts"}
                    >
                        posts
                    </Link>
                    .
                </h2>
                <p>
                    Need support? Write an iusse in{" "}
                    <a
                        href="https://github.com/chemokita13/BeRealGate/issues"
                        className="underline"
                    >
                        GitHub
                    </a>
                </p>
            </main>
        </Layout>
    );
}

export default NotFound;
