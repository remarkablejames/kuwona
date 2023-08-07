import IdeaCard from "./IdeaCard.jsx";
import Link from "next/link";
import {getTimeAgo, sortArrayByDate} from "@/app/utils.js";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";
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

async function RenderBookmarks() {
  const session = await getServerSession(authOptions);
  if(!session) {
    return redirect('/auth/login')
  }
  const bookmarks = await fetchBookmarks({token: session.token, user_id: session.user_id});
  console.log("BOOKMARK",bookmarks);
  return (
    <>
      {bookmarks ? (
        <main className=" overflow-y-scroll  ">
          <h2 className="font-bold text-4xl  text-center">Bookmarked ideas</h2>

          <>
            {/* Card Section */}
            <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
              {/* Grid */}
              <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">


                {/*/!* Your content *!/*!/*/}
                {bookmarks.map((bookmark) => (
                    <Link
                        className="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-slate-900 dark:border-gray-800"
                        href={`/idea/${bookmark.idea.id}`}
                    >
                      <div className="p-4 md:p-5">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="group-hover:text-blue-600 font-semibold text-blue-600 dark:group-hover:text-gray-400 dark:text-gray-200">
                                {bookmark.idea.title}
                            </h3>
                            <p className="text-sm text-gray-500"> Bookmarked:
                                {
                                  " " + getTimeAgo(bookmark.created_at)
                                }
                            </p>
                          </div>
                          <div className="pl-3">
                            <svg
                                className="w-3.5 h-3.5 text-gray-500"
                                width={16}
                                height={16}
                                viewBox="0 0 16 16"
                                fill="none"
                            >
                              <path
                                  d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </Link>
                ))}

              </div>
              {/* End Grid */}
            </div>
            {/* End Card Section */}
          </>


          {/*/!* Your content *!/*/}
          {/*{bookmarks.map((bookmark) => (*/}
          {/*  <IdeaCard key={bookmark.id} idea={bookmark.idea.id} />*/}
          {/*))}*/}
          <div className=" p-4">{/*    This element is hidden*/}</div>
        </main>
      ) : (
        <>No posts found</>
      )}
    </>
  );
}

export default RenderBookmarks;
