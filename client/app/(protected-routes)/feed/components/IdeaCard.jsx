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
                      <button type="button"
                              onClick={() => deleteIdeas({...props,ideaId: idea.id})}
                              className="py-1 px-2 inline-flex justify-center items-center  rounded-md border border-transparent font-semibold bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                          Delete
                      </button>
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
            <div className="flex space-x-4 md:space-x-8">
              <div className="flex cursor-pointer items-center transition hover:text-slate-600 gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill={idea.comments.length > 0 ? "currentColor" : "none"}
                  className="w-6 h-6 group hover:text-red-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                  />
                </svg>

                <span className="text-sm">{idea.comments.length}</span>
              </div>
              <div className="flex cursor-pointer items-center transition hover:text-slate-600 gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={liked ? "gray" : "none"}
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 hover:text-red-600"
                    onClick={() => handleLikeAndDislike({...props,action: "like"})}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                  />
                </svg>
                <span className="text-sm">{likes}</span>
              </div>
              <div className="flex cursor-pointer items-center transition hover:text-slate-600 gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={disliked ? "gray" : "none"}
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                    onClick={() => handleLikeAndDislike({...props,action: "dislike"})}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"
                  />
                </svg>

                <span className="text-sm">{dislikes}</span>
              </div>
              <div className="flex cursor-pointer items-center transition hover:text-slate-600 gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={bookmarked ? "currentColor" : "none"}
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                  onClick={() => handleBookmark(props)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                  />

                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IdeaCard;
