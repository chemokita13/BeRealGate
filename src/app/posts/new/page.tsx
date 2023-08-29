"use client";
import axiosInstance from "@/constants/axiosInstance";
import { PostData } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookie from "cookie-universal";
import { toast } from "react-toastify";
import Link from "next/link";

function NewPost() {
    const router = useRouter();
    useEffect(() => {
        toast.warn("This page is in alpha version and may not work properly");
    }, []);
    const cookies = Cookie();

    const [img1, setImg1] = useState<Uint8Array>();
    const [img2, setImg2] = useState<Uint8Array>();
    const [postData, setPostData] = useState<PostData>({
        visibility: "friends",
    });
    const [location, setLocation] = useState<{ lon?: number; lat?: number }>(
        {}
    );
    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // If location is set, add it to postData
        location.lat &&
            location.lon &&
            setPostData({
                ...postData,
                location: [location.lat, location.lon],
            });
        //* Create the form that will be sent
        const FormToSend = new FormData();
        // Add the data to the form, (img1, img2 and settings: postData)
        FormToSend.append("visibility", postData.visibility || "friends");
        postData.caption && FormToSend.append("caption", postData.caption);
        postData.location &&
            FormToSend.append(
                "location",
                [location.lat, location.lon].toString()
            );
        img1 && FormToSend.append("img1", new Blob([img1]));
        img2 && FormToSend.append("img2", new Blob([img2]));
        try {
            const response = await axiosInstance.post("/post/new", FormToSend, {
                headers: {
                    token: cookies.get("token"),
                },
            });
            console.log(response);
            toast.success("Post created successfully");
        } catch (error) {
            console.log(error);
            toast.error("Error creating post");
        }
    };
    const handleImg1 = (e: React.FormEvent<HTMLInputElement>) => {
        const file = e.currentTarget.files;

        const reader = new FileReader();
        if (file) {
            console.log("🚀 ~ file: new.tsx:28 ~ handleImg ~ file:", file);
            reader.readAsArrayBuffer(file[0]);
            reader.onloadend = () => {
                setImg1(new Uint8Array(reader.result as ArrayBuffer));
            };
        }
    };
    const handleImg2 = (e: React.FormEvent<HTMLInputElement>) => {
        const file = e.currentTarget.files;
        const reader = new FileReader();
        if (file) {
            console.log("🚀 ~ file: new.tsx:28 ~ handleImg ~ file:", file);
            reader.readAsArrayBuffer(file[0]);
            reader.onloadend = () => {
                setImg2(new Uint8Array(reader.result as ArrayBuffer));
            };
        }
    };
    const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        if (name === "lat" || name === "lon") {
            setLocation({ ...location, [name]: Number(value) });
            return;
        }
        setPostData({ ...postData, [name]: value });
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
                    id="title"
                    placeholder="Caption"
                    onChange={(e) => handleInputChange(e)}
                    className="p-1 mt-3 mb-1 rounded-lg placeholder:text-center"
                />
                <div className="flex flex-col p-3 my-3 text-center text-white border border-white rounded-xl ">
                    <label className="my-1">Post coordinates</label>
                    <div className="flex flex-row justify-center gap-5 ">
                        <input
                            type="text"
                            name="lat"
                            id="lat"
                            placeholder="Latitude"
                            onChange={(e) => handleInputChange(e)}
                            className="p-1 rounded-lg placeholder:text-center"
                        />
                        <input
                            type="text"
                            name="lon"
                            id="lon"
                            placeholder="Longitude"
                            onChange={(e) => handleInputChange(e)}
                            className="p-1 rounded-lg placeholder:text-center"
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
                        <div className="flex flex-row gap-1 ">
                            <input
                                type="radio"
                                name="visibility"
                                id="public"
                                value="public"
                                onChange={(e) => handleInputChange(e)}
                                className="p-1 rounded-lg placeholder:text-center"
                            />
                            <span className="text-white">Public</span>
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
