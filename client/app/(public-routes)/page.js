'use client';
import Image from "next/image";
import Link from "next/link";
import redirect from 'next/navigation'
export default async function HomePage() {
  // redirect after 3 seconds
    setTimeout(() => {
      window.location.href = "/feed";
    }, 3000)


  return (
    <main className=" min-h-screen  p-24">
      <div  class="font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-blue-500 to-red-600">Welcome to Kuwona Idea board!</div>
      <p> you will be redirected shortly...</p>
    </main>
  );
}
