import Footer from "./components/footer";
import Nav from "./components/nav";
import Head from "next/head";
import "./globals.css";
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
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
            {children}
            <Footer />
        </div>
    );
}
