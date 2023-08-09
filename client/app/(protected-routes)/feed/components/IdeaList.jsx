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

// Fetch liked and disliked ideas

async function fetchLikesAndDislikes({token, user_id}) {
  const res = await fetch(`http://127.0.0.1:8002/api/likes/${user_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    cache: "no-cache",
  });

  const likesAndDislikes = await res.json();
  //
  return likesAndDislikes;
}



async function IdeaList() {
    const session = await getServerSession(authOptions);
  const ideas = sortArrayByDate(await fetchIdeas());
  let bookmarks = [];
  let likesAndDislikes = [];
  if(session) {
    bookmarks = await fetchBookmarks({token: session.token, user_id: session.user_id});
    likesAndDislikes = await fetchLikesAndDislikes({token: session.token, user_id: session.user_id});
    const likes = likesAndDislikes.likes;
    const dislikes = likesAndDislikes.dislikes;
    ideas.map((idea) => {
      if(bookmarks.length > 0) {
        bookmarks.map((bookmark) => {
          if(idea.id == bookmark.idea.id) {
            idea.bookmarked = true;
            idea.bookmark_id = bookmark.id;
          }
        })
      }

        likes.map((like) => {
            if(idea.id == like.idea_post_id) {
                idea.liked = true;
            }
        })

        dislikes.map((dislike) => {
            if(idea.id == dislike.idea_post_id) {
                idea.disliked = true;
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
          <div className="mx-auto max-w-4xl pt-2 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="bg-white shadow rounded-lg">
            <div className="flex flex-row px-2 py-3 mx-3">
              <div className="w-auto h-auto rounded-full border-2 border-green-500">
                <img
                    className="w-12 h-12 object-cover rounded-full shadow cursor-pointer"
                    alt="User avatar"
                    src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200"
                />
              </div>
              <div className="flex flex-col mb-2 ml-4 mt-1">
                <div className="text-gray-600 text-sm font-semibold">Sara Lauren</div>
                <div className="flex w-full mt-1">
                  <div className="text-blue-700 font-base text-xs mr-1 cursor-pointer">
                    UX Design
                  </div>
                  <div className="text-gray-400 font-thin text-xs">• 1 day ago</div>
                </div>
              </div>
            </div>
            <div className="border-b border-gray-100" />
            <div className="text-gray-400 font-medium text-sm mb-7 mt-6 mx-3 px-2">
              <img className="rounded w-full" src="https://images.unsplash.com/photo-1519682337058-a94d519337bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" />
            </div>
            <div className="text-gray-600 font-semibold  mb-2 mx-3 px-2">
              Dummy text of the printing and typesetting industry
            </div>
            <div className="text-gray-500 text-sm mb-6 mx-3 px-2">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500
            </div>
            <div className="flex justify-start mb-4 border-t border-gray-100">
              <div className="flex w-full mt-1 pt-2 pl-5">
      <span className="bg-white transition ease-out duration-300 hover:text-red-500 border w-8 h-8 px-2 pt-2 text-center rounded-full text-gray-400 cursor-pointer mr-2">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            width="14px"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
          <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
          />
        </svg>
      </span>
                <img
                    className="inline-block object-cover w-8 h-8 text-white border-2 border-white rounded-full shadow-sm cursor-pointer"
                    src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                />
                <img
                    className="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer"
                    src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                />
                <img
                    className="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                    alt=""
                />
                <img
                    className="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer"
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                    alt=""
                />
              </div>
              <div className="flex justify-end w-full mt-1 pt-2 pr-5">
      <span className="transition ease-out duration-300 hover:bg-blue-50 bg-blue-100 w-8 h-8 px-2 py-2 text-center rounded-full text-blue-400 cursor-pointer mr-2">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            width="14px"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
          <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
          />
        </svg>
      </span>
                <span className="transition ease-out duration-300 hover:bg-gray-50 bg-gray-100 h-8 px-2 py-2 text-center rounded-full text-gray-100 cursor-pointer">
        <svg
            className="h-4 w-4 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
          <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
          />
        </svg>
      </span>
              </div>
            </div>
            <div className="flex w-full border-t border-gray-100">
              <div className="mt-3 mx-5 flex flex-row text-xs">
                <div className="flex text-gray-700 font-normal rounded-md mb-2 mr-4 items-center">
                  Comments:<div className="ml-1 text-gray-400 text-ms"> 30</div>
                </div>
                <div className="flex text-gray-700 font-normal rounded-md mb-2 mr-4 items-center">
                  Views: <div className="ml-1 text-gray-400 text-ms"> 60k</div>
                </div>
              </div>
              <div className="mt-3 mx-5 w-full flex justify-end text-xs">
                <div className="flex text-gray-700  rounded-md mb-2 mr-4 items-center">
                  Likes: <div className="ml-1 text-gray-400 text-ms"> 120k</div>
                </div>
              </div>
            </div>
            <div className="relative flex items-center self-center w-full max-w-xl p-4 overflow-hidden text-gray-600 focus-within:text-gray-400">
              <img
                  className="w-10 h-10 object-cover rounded-full shadow mr-2 cursor-pointer"
                  alt="User avatar"
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-6">
      <button
          type="submit"
          className="p-1 focus:outline-none focus:shadow-none hover:text-blue-500"
      >
        <svg
            className="w-6 h-6 transition ease-out duration-300 hover:text-blue-500 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
          <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    </span>
              <input
                  type="search"
                  className="w-full py-2 pl-4 pr-10 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:text-gray-900 focus:shadow-outline-blue"
                  style={{ borderRadius: 25 }}
                  placeholder="Post a comment..."
                  autoComplete="off"
              />
            </div>
          </div>
        </div>

          <div className=" p-4">{/*    This element is hidden*/}</div>
        </main>
      ) : (
        <>No posts found</>
      )}
    </>
  );
}

export default IdeaList;
