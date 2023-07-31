import "../globals.css";
import { Inter } from "next/font/google";
import LayoutShell from "@/app/(protected-routes)/shell";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kuwona Idea Board",
  description:
    "A simple idea board where you can post your ideas and vote on others.",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <title>My page</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
