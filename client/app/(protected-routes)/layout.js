import "../globals.css";
import { Inter } from "next/font/google";
import LayoutShell from "@/app/(protected-routes)/shell";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kuwona Idea Board",
  description:
    "A simple idea board where you can post your ideas and vote on others.",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/auth/login");
  }
  return <LayoutShell children={children} user={session.user} />;
}
