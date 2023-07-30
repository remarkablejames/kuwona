import Image from "next/image";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
export default async function HomePage() {
  const session = await getServerSession(authOptions);
  console.log("ON PAGE", session);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold text-center">hello world</h1>
    </main>
  );
}
