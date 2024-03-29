import Footer from "../components/footer";
import Nav from "../components/nav";
import { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Ganal from "@/components/ganal";
import React from "react";
export const metadata: Metadata = {
    title: "BeReal Gate",
    description: "View bereals without posting anything.",
    authors: {
        name: "Jose Maria Pahino",
        url: "https://github.com/chemokita13",
    },
    keywords:
        "BeReal, bereal, BeFake, BeReal API, BeReal API web, BeReal API web, bereal, BeRealGate, BeReal Gate, berealgate, bereal gate, Bereal gate, bereal trick",
};
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
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
