"use client";
import RootLayout from "@/app/layout";
import { useState } from "react";
import axios from "@/constants/axiosInstance"; /// NOT AXIOS MODULE; AXIOS INSTANCE FROM CONSTANTS
import { ApiResponse } from "@/types/types";
import Cookie from "cookie-universal";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
const Flip = require("react-reveal/Flip"); // Import doesnt working

function Login() {
    const cookies = Cookie();
    // Cookies instance
    const router = useRouter(); // Next router instance

    const [sentCode, setSentCode] = useState<boolean>(false); // If otpCode was sent to phone is true, else false
    const [phone, setPhone] = useState<string>(""); // Phone number state
    const [otpSession, setOtpSession] = useState<string>(""); // Otp token returned on postPhoneSubmit
    const [otp, setOtp] = useState<string>(""); // Otp code state

    // Post phone number to get otp code
    const postPhoneSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault(); // Prevents page reload
        if (!phone || phone.length === 0) {
            toast.warn("Please enter a valid phone number", {
                position: "top-center",
            });
            return;
        }
        try {
            const { data, status }: { data: ApiResponse; status: number } =
                await axios.post("login/send-code", {
                    phone: phone,
                    Headers: {
                        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                        cors: "*",
                    },
                });
            if (status !== 201) {
                toast.error("Error sending code");
                return;
            }
            setOtpSession(data.data.otpSession);
            cookies.set("otpSession", data.data.otpSession, { path: "/" }); // Save it in cookies if user reload page
            setSentCode(true);
            toast.success("Code sent");
        } catch (error) {
            toast.error("Error sending code");
            console.log(error);
            return;
        }
    };

    // Post otp code to get token
    const postOtpSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault(); // Prevents page reload
        if (!otp || otp.length === 0) {
            toast.warn("Please enter a valid otp code");
            return;
        }
        try {
            // Check if otpSession is in state or cookies
            const otpSessionToPost: string =
                otpSession || cookies.get("otpSession");
            if (!otpSessionToPost) {
                toast.warn("Error getting otp sesion code");
                return;
            }
            const { status, data } = await axios.post("login/verify", {
                otpSesion: otpSessionToPost,
                code: otp,
            });

            if (status !== 201) {
                toast.error("Error verifying otp code");
                return;
            }

            // delete otpSession from cookies
            cookies.remove("otpSession", { path: "/" });
            // save token in cookies
            cookies.set("token", data.data.token, { path: "/" });
            // save token in localStorage
            localStorage.setItem("token", data.data.token);
            // Notify user
            toast.success("Logged in");
            // redirect to posts page
            router.push("/posts");
        } catch (error) {
            toast.error("Error verifying otp code");
        }
    };

    // Input change handlers for phone and otp to state
    const handlePhoneChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setPhone(e.target.value);
    };
    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setOtp(e.target.value);
    };

    // Resend code handler
    const resendCode = async (): Promise<void> => {
        // Reset all
        setSentCode(false);
        setOtpSession("");
        setOtp("");
        setPhone("");
        cookies.remove("otpSession", { path: "/" });
    };

    return (
        <div className="flex flex-col items-center w-screen h-screen overflow-x-hidden text-white">
            <h1 className="m-5 text-5xl">Login Form</h1>
            <div className="flex flex-col items-center">
                <Flip top>
                    <form
                        className={`flex flex-col items-center p-10 border border-white rounded-lg w-3/4 sm:w-auto ${
                            sentCode && "hidden"
                        }`}
                        onSubmit={(e) =>
                            toast.promise(postPhoneSubmit(e), {
                                pending: "Sending code",
                                error: "Error sending code",
                            })
                        }
                    >
                        <span className="m-1">
                            Enter your phone number to get an otp code
                        </span>
                        <input
                            className="px-5 py-1 text-black rounded-md placeholder:text-center"
                            type="text"
                            name="phoneNumber"
                            id="phoneNumber"
                            placeholder="+00111223344"
                            onChange={(e) => handlePhoneChange(e)}
                        />
                        <button
                            type="submit"
                            className="px-2 py-1 m-2 border border-green-500 rounded-lg"
                        >
                            Submit
                        </button>
                    </form>
                </Flip>
                <Flip bottom>
                    <form
                        className={`flex flex-col items-center p-10 border-dashed border border-white rounded-lg w-3/4 sm:w-auto ${
                            !sentCode && "hidden"
                        }`}
                        onSubmit={(e) => postOtpSubmit(e)}
                    >
                        <span className="m-1">
                            Enter the otp code sent to your phone number
                        </span>
                        <input
                            className="px-5 py-1 text-black rounded-md placeholder:text-center"
                            type="text"
                            name="otpCode"
                            id="otpCode"
                            placeholder="0123456"
                            onChange={(e) => handleOtpChange(e)}
                        />
                        <button
                            type="submit"
                            className="px-2 py-1 m-2 border border-green-500 rounded-lg"
                        >
                            Submit
                        </button>
                        <span
                            onClick={() => resendCode()}
                            className="underline cursor-pointer"
                        >
                            Resend code?
                        </span>
                    </form>
                </Flip>
            </div>
        </div>
    );
}

export default Login;
