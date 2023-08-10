'use client';
import Link from "next/link";
import { getTimeAgo } from "@/app/utils";
import {useState} from "react";
import {redirect} from "next/navigation";
import Image from "next/image";

async function createBookmark({idea,token,user_id}) {

  const res = await fetch(`http://127.0.0.1:8002/api/bookmarks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    cache: "no-cache",
    body: JSON.stringify({
      idea_post_id: idea.id,
      user_id,
    }),
  })
}

// delete bookmark with its id
async function deleteBookmark({bookmarkId,token,}) {
    const res = await fetch(`http://127.0.0.1:8002/api/bookmarks/${bookmarkId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
        cache: "no-cache",
    })
}

// Like or dislike an idea
async function likeOrDislikeIdea({user_id,idea_post_id,token,action}) {
  const res = await fetch(`http://127.0.0.1:8002/api/likes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    body: JSON.stringify({
        user_id,
        idea_post_id,
        action
    }),
    cache: "no-cache",
  })
}

async function deleteIdeas({ideaId,token,}) {
    const res = await fetch(`http://127.0.0.1:8002/api/ideas/${ideaId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
        });
    window.location.reload();
}

function IdeaCard(props) {
  const { idea } = props;
  const [bookmarked, setBookmarked] = useState(idea.bookmarked);
  const [liked, setLiked] = useState(idea.liked);
    const [disliked, setDisliked] = useState(idea.disliked);
    const [likes, setLikes] = useState(idea.likes);
    const [dislikes, setDislikes] = useState(idea.dislikes);
    const handleBookmark = async (props) => {
      console.log("props:=============>", props);
      const {idea,token,user_id} = props;
      if(!props.token) {
        return redirect('/unauthenticated')
      }
        if(bookmarked) {
            setBookmarked(false);
            await deleteBookmark({bookmarkId: idea.bookmark_id,token})
        } else {
            setBookmarked(true);
            await createBookmark({idea,token,user_id})
        }


    }

    const handleLikeAndDislike = async (props) => {
        const {idea,token,user_id,action} = props;
        if(!props.token) {
            return redirect('/unauthenticated')
        }
        // if action is like and user has already liked the idea, then unlike it by passing action as deleteLike
        if(action == "like" && liked) {
            setLiked(false);
            // if likes is 0, then set it to 0, else decrement it by 1
            setLikes(likes == 0 ? 0 : likes - 1);
            await likeOrDislikeIdea({user_id,idea_post_id: idea.id,token,action: "deleteLike"})
        }

        // if action is dislike and user has already disliked the idea, then undislike it by passing action as deleteDislike
        if(action == "dislike" && disliked) {
            setDisliked(false);
            // if dislikes is 0, then set it to 0, else decrement it by 1
            setDislikes(dislikes == 0 ? 0 : dislikes - 1);
            await likeOrDislikeIdea({user_id,idea_post_id: idea.id,token,action: "deleteDislike"})
        }

        // if action is like and user has not liked the idea, then like it by passing action as like
        if(action == "like" && !liked) {
            setLiked(true);
            setLikes(likes + 1);
            await likeOrDislikeIdea({user_id,idea_post_id: idea.id,token,action: "like"})
        }

        // if action is dislike and user has not disliked the idea, then dislike it by passing action as dislike
        if(action == "dislike" && !disliked) {
            setDisliked(true);
            setDislikes(dislikes + 1);
            await likeOrDislikeIdea({user_id,idea_post_id: idea.id,token,action: "dislike"})
        }

        // if action is like and user has already disliked the idea, then delete the dislike and like the idea by passing action as like
        if(action == "like" && disliked) {
            setLiked(true);
            setDisliked(false);
          // if dislikes is 0, then set it to 0, else decrement it by 1
          setDislikes(dislikes == 0 ? 0 : dislikes - 1);
            setLikes(likes + 1);
            await likeOrDislikeIdea({user_id,idea_post_id: idea.id,token,action: "like"})
        }

        // if action is dislike and user has already liked the idea, then delete the like and dislike the idea by passing action as dislike
        if(action == "dislike" && liked) {
            setLiked(false);
            setDisliked(true);
            setDislikes(dislikes + 1);
          // if likes is 0, then set it to 0, else decrement it by 1
          setLikes(likes == 0 ? 0 : likes - 1);
            await likeOrDislikeIdea({user_id,idea_post_id: idea.id,token,action: "dislike"})
        }
    }
  return (
    <div className="mx-auto max-w-4xl pt-2 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="rounded-xl border p-5 hover:shadow-sm  duration-200  w-full bg-white hover:bg-gray-100 hover:border-gray-300 transition">
        <div className="flex w-full items-center justify-between border-b pb-3 ">
          <div className="flex items-center space-x-3">
            <div>
                <img className="w-10 h-10 rounded-full" src={idea.user.image} />
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
              {
                    idea.user_id == props.user_id && (
                      // <button type="button"
                      //         onClick={() => deleteIdeas({...props,ideaId: idea.id})}
                      //         className="py-1 px-2 inline-flex justify-center items-center  rounded-md border border-transparent font-semibold bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                      //     Delete
                      // </button>
                      <div
                          className="hs-dropdown"
                          data-hs-dropdown-placement="bottom-right"
                          data-hs-dropdown-offset={30}
                      >
                          <a
                              className="hs-dropdown-toggle hs-dark-mode group flex items-center text-gray-600 hover:text-blue-600 font-medium dark:text-gray-400 dark:hover:text-gray-500"
                              href="javascript:;"
                          >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                              </svg>

                          </a>
                          <div
                              id="selectThemeDropdown"
                              className="hs-dropdown-menu hs-dropdown-open:opacity-100 mt-2 hidden z-10 transition-[margin,opacity] opacity-0 duration-300 mb-2 origin-bottom-left bg-white shadow-md rounded-lg p-2 space-y-1 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700"
                          >
                              <div
                                  className="hs-auto-mode-active:bg-gray-100 flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-red-600 hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                                  onClick={() => deleteIdeas({...props,ideaId: idea.id})}
                              >
                                  Delete this idea
                              </div>
                              <Link
                                    href={`/idea/edit/${idea.id}`}
                                  className="hs-auto-mode-active:bg-gray-100 flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-red-600 hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                              >
                                  Edit this idea
                              </Link>
                          </div>
                      </div>

                  )
              }
          </div>

        </div>
        <div className="mt-4 mb-6">
          <Link href={`/idea/${idea.id}`}>
            <div className="mb-3 text-xl font-bold text-blue-600 hover:underline">
              {idea.title}
            </div>
          </Link>
          <div className="text-md text-neutral-600 text-justify">
            {idea.description}
          </div>
            {
                idea.image && (
                    <div className="">
                        <div className="text-gray-400 font-medium text-sm mb-7 mt-6">
                            <img className="rounded w-full" src={ idea.image} />
                        </div>
                    </div>
                )
            }

        </div>
        <div>
          <div className="flex items-center justify-between text-slate-500">
            <div className="flex space-x-2 md:space-x-6">
              <div className="flex cursor-pointer items-center transition hover:text-slate-600">
                  <span className="bg-white transition ease-out duration-300 hover:text-red-500 border w-8 h-8 px-2 pt-2 text-center rounded-full text-gray-400 cursor-pointer mr-2"
                  >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill={idea.comments.length > 0 ? "currentColor" : "none"}
                            width="14px"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                          <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                          />
                        </svg>
                  </span>

                <span className="text-sm">{idea.comments.length}</span>
              </div>
              <div className="flex cursor-pointer items-center transition hover:text-slate-600 ">
                  <span className="bg-white transition ease-out duration-300 hover:text-red-500 border w-8 h-8 px-2 pt-2 text-center rounded-full text-gray-400 cursor-pointer mr-2"
                        onClick={() => handleLikeAndDislike({...props,action: "like"})}
                  >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill={bookmarked ? "currentColor" : "none"}
                            width="14px"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                          <path fill={liked ? "gray" : "none"} d="M20.8955078,11.1943359l-8.5-11c-0.0946341-0.1224389-0.2448235-0.1942164-0.3950672-0.1943359	c-0.1505375-0.0001198-0.3011293,0.0716577-0.3959484,0.1943359l-8.5,11	c-0.1166992,0.1508789-0.137207,0.3549805-0.0532227,0.5258789C3.1352539,11.8916016,3.309082,12,3.5,12H8v11.5	C8,23.7763672,8.2236328,24,8.5,24h7c0.2763672,0,0.5-0.2236328,0.5-0.5V12h4.5c0.190918,0,0.3647461-0.1083984,0.4487305-0.2797852	C21.0327148,11.5493164,21.012207,11.3452148,20.8955078,11.1943359z"></path>

                        </svg>
                  </span>
                <span className="text-sm">{likes}</span>
              </div>
              <div className="flex cursor-pointer items-center transition hover:text-slate-600">
                  <span className="bg-white transition ease-out duration-300 hover:text-red-500 border w-8 h-8 px-2 pt-2 text-center rounded-full text-gray-400 cursor-pointer mr-2"
                        onClick={() => handleLikeAndDislike({...props,action: "dislike"})}
                  >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14px"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            transform="rotate(180)"
                            strokeWidth={2}
                        >
                            <path fill={disliked ? "gray" : "none"} d="M20.8955078,11.1943359l-8.5-11c-0.0946341-0.1224389-0.2448235-0.1942164-0.3950672-0.1943359	c-0.1505375-0.0001198-0.3011293,0.0716577-0.3959484,0.1943359l-8.5,11	c-0.1166992,0.1508789-0.137207,0.3549805-0.0532227,0.5258789C3.1352539,11.8916016,3.309082,12,3.5,12H8v11.5	C8,23.7763672,8.2236328,24,8.5,24h7c0.2763672,0,0.5-0.2236328,0.5-0.5V12h4.5c0.190918,0,0.3647461-0.1083984,0.4487305-0.2797852	C21.0327148,11.5493164,21.012207,11.3452148,20.8955078,11.1943359z"></path>

                        </svg>
                  </span>

                <span className="text-sm">{dislikes}</span>
              </div>
              <div className="flex cursor-pointer items-center transition hover:text-slate-600 gap-2">
                  <span className="bg-white transition ease-out duration-300 hover:text-red-500 border w-8 h-8 px-2 pt-2 text-center rounded-full text-gray-400 cursor-pointer mr-2"
                        onClick={() => handleBookmark(props)}
                  >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill={bookmarked ? "currentColor" : "none"}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IdeaCard;
