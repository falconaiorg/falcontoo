import { TRPCError } from "@trpc/server";
import "server-only";
import { isUri } from "valid-url";
import axios from "axios";
import { privateIpPatterns } from "./config";

const convertToHttpsOrThrow = async (url: URL) => {
  if (url.protocol === "https:") {
    return url;
  }
  const httpsUrl = new URL(url.href);
  httpsUrl.protocol = "https:";

  try {
    await axios.head(httpsUrl.href);
  } catch (err) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "The URL is not secure",
    });
  }

  return httpsUrl;
};

const ensurePublicIpOrThrow = (url: URL) => {
  const isPrivateIp = privateIpPatterns.some((pattern) =>
    pattern.test(url.href),
  );
  if (isPrivateIp) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Private and local IP addresses are not allowed.",
    });
  }
  return url;
};

const checkIsUrlOrThrow = (url: string) => {
  const urlWithoutWhitespace = url.trim();

  if (!isUri(urlWithoutWhitespace)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Invalid URL",
    });
  }
  return new URL(urlWithoutWhitespace);
};

export const parseUrl = async ({ url }: { url: string }) => {
  const validUrl = checkIsUrlOrThrow(url);
  const httpsUrl = await convertToHttpsOrThrow(validUrl);
  const publicUrl = ensurePublicIpOrThrow(httpsUrl);
  return publicUrl;
};
