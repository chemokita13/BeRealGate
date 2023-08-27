import Link from "next/link";

function Nav() {
    return (
        <nav
            className="flex items-center justify-between h-16 text-white bg-black drop-shadow-2xl sm:flex-row sm:h-36"
            id="top"
        >
            <Link
                href="/login"
                className="p-3 m-1 font-semibold underline transition-all duration-200 border border-white rounded-lg sm:p-5 sm:m-10 hover:scale-105 hover:text-xl"
            >
                Login
            </Link>
            <Link href="/">
                <h1 className="text-3xl font-extrabold transition-all cursor-pointer md:text-8xl sm:text-4xl hover:scale-105 hover:underline">
                    BeReal Gate
                </h1>
            </Link>
            <Link
                href="/posts"
                className="p-3 m-1 font-semibold underline transition-all duration-200 border border-white rounded-lg sm:p-5 sm:m-10 hover:scale-105 hover:text-xl"
            >
                Posts
            </Link>
        </nav>
    );
}

export default Nav;
