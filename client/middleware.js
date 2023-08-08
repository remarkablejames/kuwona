export { default } from "next-auth/middleware";
export const config = { matcher: ["/bookmarks:path*", "/idea/:path*"] };
