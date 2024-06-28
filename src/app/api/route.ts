import axios from "axios";

import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

// export const config = {
//     api: {
//         bodyParser: { sizeLimit: '12mb', },
//     }
// };

export async function POST(
    req: NextRequest
) {
    const { headers, img1, img2, datas } = await req.json();

    let primaryb64 = img1
    let secondaryb64 = img2;

    // console.log(primaryb64, secondaryb64);
    // console.log(((await axios.post("https://berealapi.fly.dev/ping", {
    //     data: { "hello": "core" },
    // }, {
    //     validateStatus: function (status) {
    //         return true
    //     }
    // })).request))
    // return NextResponse.json({ message: "Hello World" });

    primaryb64 = primaryb64.replace(/^data:(image|application)\/(png|webp|jpeg|jpg|octet-stream);base64,/, "");
    secondaryb64 = secondaryb64.replace(/^data:(image|application)\/(png|webp|jpeg|jpg|octet-stream);base64,/, "");
    /* primaryb64 = primaryb64.replace(/^data:image\/(png|jpeg|jpg|octet-stream);base64,/, "");
    secondaryb64 = secondaryb64.replace(/^data:image\/(png|jpeg|jpg|octet-stream);base64,/, ""); */

    // ============================================================================================

    //convert base64 to buffer

    let primary_image_buffer = Buffer.from(primaryb64, 'base64');
    let secondary_image_buffer = Buffer.from(secondaryb64, 'base64');

    let sharp_primary = await sharp(primary_image_buffer).rotate().toBuffer();
    let sharp_secondary = await sharp(secondary_image_buffer).rotate().toBuffer();

    const primary_mime_type = (await sharp(sharp_primary).metadata()).format;
    const secondary_mime_type = (await sharp(sharp_secondary).metadata()).format;


    const primary_resolution = await sharp(sharp_primary).metadata();
    console.log("Primary resolution: ", primary_resolution.width, "x", primary_resolution.height, primary_resolution);

    const secondary_resolution = await sharp(sharp_secondary).metadata();
    console.log("Secondary resolution: ", secondary_resolution.width, "x", secondary_resolution.height);


    if (primary_mime_type != 'webp') {
        sharp_primary = await sharp(sharp_primary).toFormat('webp').toBuffer();
    }
    if (secondary_mime_type != 'webp') {
        sharp_secondary = await sharp(sharp_secondary).toFormat('webp').toBuffer();
    }

    // Check size of imgs
    const primary_size = (await sharp(sharp_primary).metadata()).size;
    const secondary_size = (await sharp(sharp_secondary).metadata()).size;

    console.log("Primary size: ", primary_size);
    console.log("Secondary size: ", secondary_size);

    // if (primary_size > 1048576) {
    //  sharp_primary = await sharp(sharp_primary).resize(1500, 2000).toBuffer();
    // }
    // if (secondary_size > 1048576) {
    // sharp_secondary = await sharp(sharp_secondary).resize(1500, 2000).toBuffer();
    // }

    const firstResponse = await axios.get("https://mobile.bereal.com/api/content/posts/upload-url?mimeType=image/webp", {
        headers: headers,
        validateStatus: function (status) {
            return true
        }
    })

    console.log("First request status: ", firstResponse.status)
    if (firstResponse.status != 200) {
        return NextResponse.json({ message: "Error doing post init", done: false });
    }
    // console.log("First request data: ", firstResponse.data)


    /// FIRST PHOTO SUBMIT (SECOND REQUEST)
    const secondResponse = await axios.put(firstResponse.data.data[0].url,
        (await sharp(sharp_primary).toBuffer())
        , {
            headers: firstResponse.data.data[0].headers,
            validateStatus: function (status) {
                return true
            }
        },)

    console.log("Second response status: ", secondResponse.status);
    if (secondResponse.status != 200) {
        return NextResponse.json({ message: "Error submiting the primary photo", done: false });
    }

    // console.log("Second response data: ", secondResponse.data)

    /// SECOND PHOTO SUBMIT (THIRD REQUEST)
    const thirdResponse = await axios.put(firstResponse.data.data[1].url,
        (await sharp(sharp_secondary).toBuffer())
        , {
            headers: firstResponse.data.data[1].headers,
            validateStatus: function (status) {
                return true
            }
        })

    if (thirdResponse.status != 200) {
        return NextResponse.json({ message: "Error submiting the secondary photo", done: false });
    }

    console.log("Third response status: ", thirdResponse.status);
    // console.log("Third response data: ", thirdResponse.data)


    // return NextResponse.json({ message: "Hello World" });

    let dateToPost = datas.date || new Date().toISOString();

    if (!datas.late) {
        /// FOURTH REQUEST DATE REQUEST 
        const fourthrespone = await axios.get("https://mobile.bereal.com/api/bereal/moments/last/europe-west", {
            headers: headers,
            validateStatus: function (status) {
                return true
            }
        })

        if (fourthrespone.status != 200) {
            return NextResponse.json({ message: "Error getting the last moment", done: false });
        }

        console.log("Fourth response status: ", fourthrespone.status);
        // console.log("Fourth response data: ", fourthrespone.data);

        const postDate = new Date(fourthrespone.data.startDate).toISOString();
        /// Add 13 seconds to the date
        const newDate = new Date(postDate);
        newDate.setSeconds(newDate.getSeconds() + 13);
        dateToPost = newDate.toISOString();
    }


    /// FIFTH REQUEST POST REQUEST

    let dataToSend: any = {

        "isLate": datas.late,
        "retakeCounter": 0,
        takenAt: dateToPost,
        /* content: caption.toString(), */ // might not be working
        visibility: [datas.visibility],
        backCamera: {
            bucket: firstResponse.data.data[0].bucket,
            height: 2000,
            width: 1500,
            path: firstResponse.data.data[0].path,
        },
        frontCamera: {
            bucket: firstResponse.data.data[1].bucket,
            height: 2000,
            width: 1500,
            path: firstResponse.data.data[1].path,
        },

    }

    if (datas.location) {
        dataToSend = {
            ...dataToSend, location: {
                latitude: datas.location[0],
                longitude: datas.location[1],
            }
        }
    }

    const fifthResponse = await axios.post("https://mobile.bereal.com/api/content/posts", dataToSend, {
        headers: headers,
        validateStatus: function (status) {
            return true
        }
    })

    if (fifthResponse.status != 201) {
        return NextResponse.json({ message: "Error posting the moment", done: false });
    }

    console.log("Fifth response status: ", fifthResponse.status);
    console.log("Fifth response data: ", fifthResponse.data);
    // console.log("data to send: ", dataToSend);




    // console.log(firstResponse.status, secondResponse.status, thirdResponse.status, fourthrespone.status, fifthResponse.status
    // );

    return NextResponse.json({ message: "Moment posted", done: true });
}