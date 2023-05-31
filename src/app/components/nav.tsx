import Link from "next/link";
import React from "react";

function Nav() {
    return (
        <nav className="flex items-center justify-between h-16 text-white bg-black sm:flex-row sm:h-36">
            <Link
                href="/login"
                className="p-3 m-1 font-semibold underline border border-white rounded-lg sm:p-5 sm:m-10"
            >
                Login
            </Link>
            <h1 className="text-3xl font-extrabold sm:text-8xl">BeReal Gate</h1>
            <Link
                href="/posts"
                className="p-3 m-1 font-semibold underline border border-white rounded-lg sm:p-5 sm:m-10"
            >
                Posts
            </Link>
        </nav>
    );
}

export default Nav;
