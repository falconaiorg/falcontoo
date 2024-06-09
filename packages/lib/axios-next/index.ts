import axios from "axios";
import { cookies } from "next/headers";
import { isDev } from "../utils";

// const baseURL = process.env.RENDER
//   ? process.env.RENDER_EXTERNAL_URL + "/"
//   : "http://localhost:8000/";

const baseURL = isDev
  ? "http://localhost:8000"
  : "https://falcontoo.onrender.com"; // Use env var

const getTokens = () => {
  const nextCookies = cookies();

  const sessionToken = nextCookies.get("next-auth.session-token")?.value;
  const csrfToken = nextCookies
    .get("next-auth.csrf-token")
    ?.value?.split("|")[0];
  return {
    sessionToken,
    csrfToken,
  };
};

export const getHeaders = () => {
  const { sessionToken, csrfToken } = getTokens();
  return {
    Authorization: `Bearer ${sessionToken}`,
    "X-CSRF-Token": csrfToken,
  };
};

export const dracoAxios = axios.create({
  baseURL,
});
