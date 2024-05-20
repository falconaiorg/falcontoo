const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // TODO Works, but need to replace with serverExternalPackages later
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack },
  ) => {
    // add externals
    config.externals = config.externals || [];
    config.externals.push(
      "puppeteer-extra",
      "puppeteer-extra-plugin-stealth",
      "puppeteer-extra-plugin-adblocker",
      "puppeteer-extra-plugin-block-resources",
      "turndown",
    );

    return config;
  },
  // Suppose to work but does not.
  // serverExternalPackages: [
  //   "puppeteer-extra",
  //   "puppeteer-extra-plugin-stealth",
  //   "puppeteer-extra-plugin-adblocker",
  //   "puppeteer-extra-plugin-block-resources",
  //   "turndown",
  // ],

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

module.exports = withBundleAnalyzer(withPWA(nextConfig));
