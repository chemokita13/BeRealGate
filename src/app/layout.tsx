import Footer from "./components/footer";
import Nav from "./components/nav";
import Head from "next/head";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { Analytics } from "@vercel/analytics/react";
import "react-toastify/dist/ReactToastify.css";
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Analytics />
            <Head>
                <title>BeReal API web</title>
                <meta
                    name="description"
                    content="BeReal API web from https://github.com/chemokita13/beReal-api"
                />
                <meta
                    name="author"
                    content="Jose Maria Pahino, @chemokita13 on github (https://github.com/chemokita13)"
                />
                <meta
                    name="keywords"
                    content="BeReal, BeFake, BeReal API, BeReal API web, BeReal API web"
                />
                <meta name="copiright" content="Any, license free!!" />
            </Head>
            <Nav />
            <main>
                <ToastContainer
                    theme="colored"
                    draggable
                    position="top-right"
                    pauseOnHover
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    closeButton={false}
                />
                {children}
            </main>
            <Footer />
        </div>
    );
}
