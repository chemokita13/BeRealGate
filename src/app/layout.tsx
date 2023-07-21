import Footer from "../components/footer";
import Nav from "../components/nav";
import { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { Analytics } from "@vercel/analytics/react";
import "react-toastify/dist/ReactToastify.css";
import Ganal from "@/components/ganal";
export const metadata: Metadata = {
    title: "BeReal Gate",
    description: "A new way to BeReal",
    authors: {
        name: "Jose Maria Pahino",
        url: "https://github.com/chemokita13",
    },
    keywords:
        "BeReal, BeFake, BeReal API, BeReal API web, BeReal API web, bereal, BeRealGate",
};
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <body>
                <Analytics />
                <Ganal />
                <Nav />
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
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
