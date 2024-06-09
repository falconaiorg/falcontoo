import * as esbuild from "esbuild";
import { nodeExternalsPlugin } from "esbuild-node-externals";

esbuild
  .build({
    entryPoints: ["src/index.ts"],
    bundle: true,
    platform: "node",
    outfile: "dist/index.js",
    // external: [
    //   "express",
    //   "cors",
    //   "body-parser",
    //   "puppeteer-core",
    //   "puppeteer-extra",
    //   "puppeteer-extra-plugin-stealth",
    //   "puppeteer-extra-plugin-adblocker",
    //   "puppeteer-extra-plugin-block-resources",
    //   "@mozilla/readability",
    //   "jsdom",
    //   "@trpc/server",
    //   "turndown",
    //   "zod",
    //   "axios",
    //   "valid-url",
    //   "node-html-markdown",
    // ],
    plugins: [nodeExternalsPlugin()], // exclude node_modules
  })
  .catch(() => process.exit(1));
