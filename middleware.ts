export { default } from "next-auth/middleware";

const protectedRoutes = ["/protected", "home"];

const arrayForMatcher = protectedRoutes.map((route) => `${route}/:path*`);

export const config = {
  matcher: ["/protected/:path*", "/protected/:path*"],
};
