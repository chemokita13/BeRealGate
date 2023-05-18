import Footer from "./components/footer";
import Nav from "./components/nav";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "BeFake API",
    description: "A BeReal client",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Nav />
                {children}
                <Footer />
            </body>
        </html>
    );
}
