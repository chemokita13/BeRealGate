import axiosInstance from "@/constants/axiosInstance";
import { PostData } from "@/types/types";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import Cookie from "cookie-universal";

function NewPost() {
    useRouter().push("/posts");
    useEffect(() => {
        alert("Actually not working, but it will be soon");
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
        //?console.log(postData);
        //* Create the form that will be sent
        const FormToSend = new FormData();
        // Add the data to the form, (img1, img2 and settings: postData)
        FormToSend.append(
            "postData",
            '{resize: true,visibility: "friends",caption: "solo estoy provando cosas, ignoradlo porfis <3",}'
        );
        img1 && FormToSend.append("img1", new Blob([img1]));
        img2 && FormToSend.append("img2", new Blob([img2]));
        const response = await axiosInstance.post("/post/new", FormToSend, {
            headers: {
                token: cookies.get("token"),
            },
        });
        console.log(response);
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
        <div>
            <form onSubmit={(e) => handleFormSubmit(e)}>
                <input
                    type="text"
                    name="caption"
                    id="title"
                    placeholder="Caption: "
                    onChange={(e) => handleInputChange(e)}
                />
                <input
                    type="file"
                    name="img1"
                    id="image"
                    onChange={(e) => handleImg1(e)}
                    accept=".jpg, .jpeg, .png, .webp"
                />
                <input
                    type="file"
                    name="img2"
                    id="image"
                    onChange={(e) => handleImg2(e)}
                    accept=".jpg, .jpeg, .png, .webp"
                />
                <input
                    type="text"
                    name="lat"
                    id="lat"
                    placeholder="Latitude: "
                    onChange={(e) => handleInputChange(e)}
                />
                <input
                    type="text"
                    name="lon"
                    id="lon"
                    placeholder="Longitude: "
                    onChange={(e) => handleInputChange(e)}
                />
                <button type="submit">Post</button>
            </form>
        </div>
    );
}

export default NewPost;
