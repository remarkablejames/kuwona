import IdeaList from "./components/IdeaList.jsx";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function FeedPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("NOT LOGGED IN");
    return redirect(`/auth/login`);
  }
  return (
    <div className="h-fulln min-h-screen">
      <IdeaList />
    </div>
  );
}
