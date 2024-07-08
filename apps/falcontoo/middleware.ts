export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/library/:path*",
    "/reader/:path*",
    "/sprint/:path*",
    "/draco/:path*",
    "/settings/:path*",
    "/stats/:path*",
    "/home/:path*",
    "/protected/:path*",
  ],
};
