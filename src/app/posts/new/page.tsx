"use client";
import axiosInstance from "@/constants/axiosInstance";
import { PostData } from "@/types/types";
import { useEffect, useState } from "react";
import Cookie from "cookie-universal";
import { toast } from "react-toastify";
import Link from "next/link";
import axios from "axios";

function NewPost() {
    function getBase64(file: any) {
        return new Promise((resolve) => {
            let fileInfo;
            let baseURL: any = "";
            let reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                baseURL = reader.result;
                resolve(baseURL);
            };
        });
    }

    // useEffect(() => {
    //     toast.warn("This page is in alpha version and may not work properly");
    // }, []);
    const cookies = Cookie();

    const [img1, setImg1] = useState<Uint8Array>();
    const [img2, setImg2] = useState<Uint8Array>();
    const [postData, setPostData] = useState<PostData>({
        visibility: "friends",
        late: true,
    });
    const [location, setLocation] = useState<{ lon?: number; lat?: number }>(
        {}
    );
    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let dataWillSend = {};
        // If location is set, add it to postData
        // location.lat &&
        //     location.lon &&
        //     setPostData({
        //         ...postData,
        //         location: [location.lat, location.lon],
        //     });

        if (location.lat && location.lon) {
            dataWillSend = {
                ...postData,
                location: [location.lat, location.lon],
            };
        } else {
            dataWillSend = { ...postData };
        }

        try {
            const { data } = await axiosInstance.get("/login/get-token", {
                headers: {
                    token: `${localStorage.getItem("token")}`,
                },
            });
            const token: string = data.data.data.access.token;
            const headers: { [key: string]: string } = data.data.headers;
            console.log(
                "🚀 ~ file: new.tsx:74 ~ handleFormSubmit ~ headers",
                dataWillSend
            );
            const firstResponse = await axios.post("/api", {
                headers: { ...headers, authorization: `Bearer ${token}` },
                img1: img1,
                img2: img2,
                datas: dataWillSend,
            });
            console.log(
                "🚀 ~ file: new.tsx:74 ~ handleFormSubmit ~ firstResponse",
                firstResponse
            );
            if (firstResponse.data.done) {
                toast.success("Post created");
            } else {
                toast.error("Error creating post");
            }
        } catch (error) {
            console.log(error);
            toast.error("Error creating post");
        }
    };
    const handleImg1 = (e: any) => {
        const file = e.target.files[0];

        console.log(file);

        getBase64(file).then((result: any) => {
            console.log(result);
            setImg1(result);
        });
    };
    const handleImg2 = (e: any) => {
        const file = e.target.files[0];

        getBase64(file).then((result: any) => {
            setImg2(result);
        });
    };
    const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        if (name === "lat" || name === "lon") {
            setLocation({ ...location, [name]: Number(value) });
            return;
        }
        setPostData({ ...postData, [name]: value });
    };
    const setLateChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        setPostData({ ...postData, [name]: value === "true" ? true : false });
    };
    const handleDateChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        setPostData({ ...postData, [name]: new Date(value).toISOString() });
    };
    return (
        <div className="flex flex-col items-center h-screen bg-black">
            <form
                onSubmit={(e) => handleFormSubmit(e)}
                className="flex flex-col w-screen p-1 border-4 border-white sm:p-5 sm:w-1/4 rounded-xl h-fit"
            >
                <div className="flex flex-col justify-center">
                    <label className="block mb-2 text-sm font-medium text-center text-gray-900 dark:text-white">
                        Upload first image
                    </label>
                    <input
                        className="w-full p-1 text-sm text-gray-500 border border-white rounded-lg cursor-pointer focus:outline-none"
                        id="file_input"
                        type="file"
                        name="img1"
                        onChange={(e) => handleImg1(e)}
                    />
                </div>
                <div className="flex flex-col justify-center">
                    <label className="block mb-2 text-sm font-medium text-center text-gray-900 dark:text-white">
                        Upload second image
                    </label>
                    <input
                        className="w-full p-1 text-sm text-gray-500 border border-white rounded-lg cursor-pointer focus:outline-none"
                        id="file_input"
                        type="file"
                        name="img2"
                        onChange={(e) => handleImg2(e)}
                    />
                </div>
                <input
                    type="text"
                    name="caption"
                    disabled={true}
                    id="title"
                    placeholder="Caption not working yet"
                    onChange={(e) => handleInputChange(e)}
                    className="p-1 mt-3 mb-1 rounded-lg placeholder:text-center"
                />
                <input
                    type="date"
                    name="date"
                    id="title"
                    placeholder="Date"
                    onChange={(e) => handleDateChange(e)}
                    className="p-1 mt-3 mb-1 rounded-lg placeholder:text-center"
                />
                <div className="flex flex-row justify-center gap-5 ">
                    <div className="flex flex-row gap-1 ">
                        <input
                            onChange={(e) => setLateChange(e)}
                            type="radio"
                            name="late"
                            id="late"
                            value="true"
                            className="p-1 rounded-lg placeholder:text-center"
                        />
                        <span className="text-white">Late</span>
                    </div>
                    <div className="flex flex-row gap-1 ">
                        <input
                            type="radio"
                            name="late"
                            id="late"
                            value="false"
                            onChange={(e) => setLateChange(e)}
                            className="p-1 rounded-lg placeholder:text-center"
                        />
                        <span className="text-white">Not late</span>
                    </div>
                </div>
                <div className="flex flex-col p-3 my-3 text-center text-white border border-white rounded-xl ">
                    <label className="my-1">Post coordinates</label>
                    <div className="flex flex-row justify-center gap-5 ">
                        <input
                            type="text"
                            name="lat"
                            id="lat"
                            placeholder="Latitude"
                            onChange={(e) => handleInputChange(e)}
                            className="p-1 rounded-lg placeholder:text-center text-black"
                        />
                        <input
                            type="text"
                            name="lon"
                            id="lon"
                            placeholder="Longitude"
                            onChange={(e) => handleInputChange(e)}
                            className="p-1 rounded-lg placeholder:text-center text-black"
                        />
                    </div>
                </div>

                <div className="flex flex-col p-3 my-3 text-center text-white border border-white rounded-xl ">
                    <label className="my-1">Post visibility</label>
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-row gap-1 ">
                            <input
                                type="radio"
                                name="visibility"
                                value="friends"
                                onChange={(e) => handleInputChange(e)}
                                className="p-1 rounded-lg placeholder:text-center"
                            />
                            <span className="text-white">
                                Friends (default)
                            </span>
                        </div>
                        <div className="flex flex-row gap-1 ">
                            <input
                                type="radio"
                                name="visibility"
                                id="public"
                                value="friends-of-friends"
                                onChange={(e) => handleInputChange(e)}
                                className="p-1 rounded-lg placeholder:text-center"
                            />
                            <span className="text-white">
                                Friends of friends
                            </span>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className="font-bold text-white transition-all duration-100 bg-blue-500 border-2 border-white rounded-xl hover:scale-105 hover:underline"
                >
                    Post
                </button>
            </form>
            <Link
                href="/posts"
                className="p-2 m-5 text-xl font-bold transition-all duration-100 bg-white rounded-lg sm:p-5 hover:scale-105 hover:underline"
            >
                Go back to posts
            </Link>
        </div>
    );
}

export default NewPost;
