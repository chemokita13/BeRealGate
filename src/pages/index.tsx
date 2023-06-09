import Layout from "@/app/layout";
import Link from "next/link";

export default function Home() {
    return (
        <Layout>
            <main
                id="main-index"
                className="flex flex-col justify-center text-left text-white align-middle"
            >
                <h1 className="p-1 text-5xl font-extrabold cursor-pointer ml-7 sm:ml-16 ">
                    A new way to BeReal.
                </h1>
                <h2 className="ml-10 text-2xl font-semibold cursor-pointer sm:ml-20">
                    Say &quot;Hello!&quot; to <u>BeReal Gate</u>
                </h2>
                <div className="flex flex-row items-center gap-5 m-5 mb-56 ml-14 sm:ml-24">
                    <Link
                        href="/login"
                        className="px-5 py-3 text-xl transition-all duration-150 border border-white rounded-lg hover:underline hover:scale-110"
                    >
                        Login
                    </Link>
                    <Link
                        href="/posts"
                        className="px-5 py-3 text-xl transition-all duration-150 border border-white rounded-lg hover:underline hover:scale-110"
                    >
                        Posts
                    </Link>
                    <a
                        href="https://github.com/chemokita13/BeRealGate"
                        className="px-5 py-3 text-xl transition-all duration-150 border border-white rounded-lg hover:underline hover:scale-110"
                    >
                        GitHub
                    </a>
                </div>
            </main>
        </Layout>
    );
}
