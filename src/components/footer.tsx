import React from "react";

function Footer() {
    return (
        <footer className="relative bottom-0 flex flex-col items-center text-white bg-black border-t-2 border-double h-36 border-t-white">
            <a
                href="#top"
                className="underline before:content-['⏫'] after:content-['⏫'] m-1 hover:scale-110 transition-all duration-200"
            >
                Scroll to top
            </a>
            <a
                className="flex flex-col items-center p-1 m-5 transition-all duration-200 border border-white border-double hover:scale-110"
                href="https://github.com/chemokita13/BeRealGate"
            >
                <img
                    src="https://logodix.com/logo/952890.png"
                    alt="GitHub source code"
                    width={50}
                    height={50}
                />
                <span>View source code</span>
            </a>
        </footer>
    );
}

export default Footer;
