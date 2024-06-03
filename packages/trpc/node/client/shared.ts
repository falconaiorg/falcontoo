import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "../server";
import superjson from "superjson";
export const transformer = superjson;

// TODO Fix this to work with CORS reequest from 3000 to 8000
function getBaseUrl() {
  console.log("process.env.WEBSITE_SITE_NAME", process.env.WEBSITE_SITE_NAME);
  console.log("process.env.WEBSITE_HOSTNAME", process.env.WEBSITE_HOSTNAME);
  console.log("process.env.PORT", process.env.PORT);

  if (typeof window !== "undefined") return "";
  if (process.env.WEBSITE_SITE_NAME)
    return `https://${process.env.WEBSITE_HOSTNAME}`;
  return `http://localhost:${process.env.EXPRESS_LOCAL_PORT ?? 8000}`;
}

export function getUrl() {
  const baseUrl = getBaseUrl();
  console.log("baseUrl", baseUrl);
  return baseUrl + "/trpc";
}

/**
 * Inference helper for inputs.
 *
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>;
