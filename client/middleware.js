export { default } from "next-auth/middleware";
// const routeRegex = /^(?!\/auth\/).*/;
export const config = { matcher: ["/(^(?!/auth).*$)", "/idea/:path*"] };
