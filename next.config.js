/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: process.env.API_URL,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "logodix.com",
            },
        ],
    },
};

module.exports = nextConfig;
