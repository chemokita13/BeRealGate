import RootLayout from "@/app/layout";
import { useState } from "react";
import axios from "@/constants/axiosInstance"; /// NOT AXIOS MODULE; AXIOS INSTANCE FROM CONSTANTS
import { ApiResponse } from "@/types/types";
import { useRouter } from "next/navigation";
import Cookie from "cookie-universal";
import { toast } from "react-toastify";

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
        try {
            const { data, status }: { data: ApiResponse; status: number } =
                await axios.post("login/send-code", {
                    phone: phone,
                });
            if (status !== 201) {
                toast.error("Error sending code");
                return;
            }
            setOtpSession(data.data.otpSesion);
            cookies.set("otpSession", data.data.otpSesion, { path: "/" }); // Save it in cookies if user reload page
            setSentCode(true);
            toast.info("Code sent");
        } catch (error) {
            toast.error("Error sending code");
            return;
        }
    };

    // Post otp code to get token
    const postOtpSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault(); // Prevents page reload

        try {
            // Check if otpSession is in state or cookies
            const otpSessionToPost: string =
                otpSession || cookies.get("otpSession");
            if (otpSessionToPost === "") {
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
        <RootLayout>
            <main>
                <h1> BeReal Login Form</h1>
                <form hidden={sentCode} onSubmit={(e) => postPhoneSubmit(e)}>
                    <input
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        placeholder="+00 111 11 11 11"
                        onChange={(e) => handlePhoneChange(e)}
                    />
                    <button type="submit">Submit</button>
                </form>
                <form hidden={!sentCode} onSubmit={(e) => postOtpSubmit(e)}>
                    <input
                        type="text"
                        name="otpCode"
                        id="otpCode"
                        placeholder="Otp code"
                        onChange={(e) => handleOtpChange(e)}
                    />
                    <button type="submit">Submit</button>
                    <span onClick={() => resendCode()}>Resend code?</span>
                </form>
            </main>
        </RootLayout>
    );
}

export default Login;
