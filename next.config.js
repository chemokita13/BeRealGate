/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: process.env.API_URL,
    },
    experimental: {
        serverActions: {
            bodySizeLimit: "12mb", // Set desired value here
        },
    },
};

module.exports = nextConfig;
