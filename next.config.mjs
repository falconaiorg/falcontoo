/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "i.ytimg.com",
      "img.youtube.com",
      "falconone.blr1.cdn.digitaloceanspaces.com",
      "falconone.blr1.digitaloceanspaces.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/a/**",
      },
    ],
  },
};

export default nextConfig;
