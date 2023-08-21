export default function About() {
    return (
        <div
            id="main-index"
            className="flex flex-col items-center p-5 text-left text-white sm:items-start"
        >
            <div className="flex flex-col items-center gap-3 sm:ml-5 w-min">
                <h1 className="p-1 text-3xl font-extrabold cursor-pointer sm:text-6xl w-max">
                    About BeReal Gate.
                </h1>
                <p className="w-3/4 text-xl font-semibold text-justify">
                    BeReal Gate is a web application that allows you to use
                    BeReal web without any requirement. You can view your
                    friends posts without upload your own post. You can also can
                    comment in each post, and see the comments of other users.
                    Take screnshots without alerting the other user and more!
                </p>
                <h2 className="mt-10 text-4xl font-bold">
                    Who is behind of that?
                </h2>
                <p className="w-3/4 text-xl font-semibold text-justify">
                    Me, a hobby developer who only wants to learn and have fun.
                    But if exists an option to work catch it! You can follow me
                    in{" "}
                    <a
                        href="https://github.com/chemokita13"
                        className="underline"
                    >
                        Github
                    </a>
                </p>
                <h2 className="mt-10 text-4xl font-bold">Is that secure?</h2>
                <p className="w-3/4 text-xl font-semibold text-justify">
                    Yes, this proyect is open source, you can see the code in{" "}
                    <a
                        href="https://github.com/chemokita13/BeRealGate"
                        className="underline"
                    >
                        Github
                    </a>{" "}
                    and, if you want, you can deploy your own version in a
                    localhost. You can also see the code of the{" "}
                    <a
                        href="https://github.com/chemokita13/beReal-api"
                        className="underline"
                    >
                        API
                    </a>{" "}
                    used in.
                </p>
                <h2 className="mt-10 text-4xl font-bold"> Contribute </h2>
                <p className="w-3/4 mb-10 text-xl font-semibold text-justify">
                    If you want to contribute to this project, you can do it in
                    the{" "}
                    <a
                        href="https://github.com/chemokita13/BeRealGate"
                        className="underline"
                    >
                        GitHub repository
                    </a>
                    . You can also contribute to the{" "}
                    <a
                        href="https://github.com/chemokita13/beReal-api"
                        className="underline"
                    >
                        API
                    </a>
                    . If you want to donate, you can do it with ETH{" "}
                    <a
                        href="https://github.com/chemokita13#donate"
                        className="underline"
                    >
                        here
                    </a>
                </p>
            </div>
        </div>
    );
}
