import IdeaCard from "./IdeaCard.jsx";
import Link from "next/link";
import { sortArrayByDate } from "@/app/utils.js";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function fetchIdeas() {
  const res = await fetch("http://127.0.0.1:8002/api/ideas", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  });
  // console.log("res:=============>");
  const ideas = await res.json();
  // console.log(ideas);
  return ideas;
}

async function fetchBookmarks({token, user_id}) {
  const res = await fetch(`http://127.0.0.1:8002/api/bookmarks/${user_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    cache: "no-cache",
  });
  // console.log("res:=============>");
  const bookmarks = await res.json();
  // console.log(ideas);
  return bookmarks;
}

async function IdeaList() {
    const session = await getServerSession(authOptions);
  const ideas = sortArrayByDate(await fetchIdeas());
  let bookmarks = [];
  if(session) {
    bookmarks = await fetchBookmarks({token: session.token, user_id: session.user_id});
    ideas.map((idea) => {
      bookmarks.map((bookmark) => {
        if(idea.id == bookmark.idea.id) {
          idea.bookmarked = true;
            idea.bookmark_id = bookmark.id;
        }
      })
    })
  }

  return (
    <>
      {ideas ? (
        <main className=" overflow-y-scroll  ">
          <div className="mx-auto max-w-4xl pt-2 sm:px-6 lg:px-8 flex items-center justify-between">
            <h2 className="font-normal text-xl">Latest Posts</h2>
            <div className="flex items-center justify-end mb-4">
              <Link
                className="cursor-pointer flex gap-2 items-center justify-between w-full px-6 py-2 text-center text-white duration-200 bg-blue-500 border-2 border-blue-500 rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none lg:w-auto focus-visible:outline-black text-sm focus-visible:ring-black"
                href="/idea/new"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M12 .75a8.25 8.25 0 00-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 00.577.706c.352.083.71.148 1.074.195.323.041.6-.218.6-.544v-4.661a6.714 6.714 0 01-.937-.171.75.75 0 11.374-1.453 5.261 5.261 0 002.626 0 .75.75 0 11.374 1.452 6.712 6.712 0 01-.937.172v4.66c0 .327.277.586.6.545.364-.047.722-.112 1.074-.195a.75.75 0 00.577-.706c.02-.615.448-1.225 1.134-1.623A8.25 8.25 0 0012 .75z" />
                  <path
                    fillRule="evenodd"
                    d="M9.013 19.9a.75.75 0 01.877-.597 11.319 11.319 0 004.22 0 .75.75 0 11.28 1.473 12.819 12.819 0 01-4.78 0 .75.75 0 01-.597-.876zM9.754 22.344a.75.75 0 01.824-.668 13.682 13.682 0 002.844 0 .75.75 0 11.156 1.492 15.156 15.156 0 01-3.156 0 .75.75 0 01-.668-.824z"
                    clipRule="evenodd"
                  />
                </svg>
                <h2 className="font-bold">Create Idea post</h2>
              </Link>
            </div>
          </div>

          {/* Your content */}
          {ideas.map((idea) => (
            session ? <IdeaCard key={idea.id} idea={idea} token={session.token} user_id={session.user_id} /> : <IdeaCard key={idea.id} idea={idea} />
          ))}
          <div className=" p-4">{/*    This element is hidden*/}</div>
        </main>
      ) : (
        <>No posts found</>
      )}
    </>
  );
}

export default IdeaList;
