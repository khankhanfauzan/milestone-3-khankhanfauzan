import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactCompiler: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "i.imgur.com",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "images.escuelajs.co",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "picsum.photos",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
