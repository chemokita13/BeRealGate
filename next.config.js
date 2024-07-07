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
    // webpack: (
    //     config,
    //     { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
    // ) => {
    //     // Important: return the modified config
    //     config.externals = {
    //         sharp: "commonjs sharp",
    //     };
    //     webpack.config.externals = {
    //         sharp: "commonjs sharp",
    //     };
    //     return config;
    // },
};

module.exports = nextConfig;
