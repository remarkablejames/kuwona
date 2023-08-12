'use client';
import Link from "next/link";
import { getTimeAgo } from "@/app/utils";
import {useState} from "react";
import {redirect} from "next/navigation";
import Image from "next/image";


// delete bookmark with its id

function IdeaCard({idea}) {
  console.log("IDEA", idea);
  return (
    <div className="mx-auto max-w-4xl pt-2 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="rounded-xl border p-5 hover:shadow-sm  duration-200  w-full bg-white hover:bg-gray-100 hover:border-gray-300 transition">
        <div className="flex w-full items-center justify-between border-b pb-3 ">
          <div className="flex items-center space-x-3">
            <div>
                <img className="w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1570215171323-4ec328f3f5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" />
            </div>
            <div className="text-lg font-normal text-slate-700">
              {idea.user.name}
            </div>
          </div>
          <div className="flex items-center space-x-8">
            <button className="rounded-2xl border bg-neutral-200 px-3 py-1 text-xs font-semibold">
              {idea.category}
            </button>
            <div className="text-xs text-neutral-500">
              {getTimeAgo(idea.created_at)}
            </div>
          </div>

        </div>
        <div className="mt-4 mb-6">
          <Link href={`/idea/${"idea.id"}`}>
            <div className="mb-3 text-xl font-bold text-blue-600 hover:underline">
              {idea.title}
            </div>
          </Link>
          <div className="text-md text-neutral-600 text-justify">
            {idea.description}
          </div>
            {/*{*/}
            {/*    idea.image && (*/}
            {/*        <div className="">*/}
            {/*            <div className="text-gray-400 font-medium text-sm mb-7 mt-6">*/}
            {/*                <img className="rounded w-full" src={ idea.image} />*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    )*/}
            {/*}*/}

        </div>
        <div>
        </div>
      </div>
    </div>
  );
}

export default IdeaCard;
