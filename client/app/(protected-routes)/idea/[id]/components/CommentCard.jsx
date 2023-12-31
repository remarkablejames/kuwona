"use client";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { getTimeAgo } from "@/app/utils";
import { sortArrayByDate } from "@/app/utils";

function DetailedIdeaCard({ idea, token, user_id }) {
  //sort comments by date, newest first
  idea.comments = sortArrayByDate(idea.comments);
console.log("IDEA", idea);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState("");
  function toggleCommentBox() {
    setShowCommentBox(!showCommentBox);
  }
  function addComment(e) {
    e.preventDefault();
    axios.post(
      `http://127.0.0.1:8002/api/comment`,
      {
        content: comment,
        idea_id: idea.id,
        user_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    // refresh the page
    window.location.reload();
  }
  const Comment = ({ avatarUrl, username, content, timestamp }) => {
    return (
      <>
        <div className="flex items-start mb-4">
          <div className="flex items-center">
            <img
              src={avatarUrl}
              alt="Avatar"
              className="w-10 h-10 rounded-full mr-4"
            />
            <div>
              <div className="flex items-center">
                <h4 className="font-semibold">{username}</h4>
                <div className="text-xs text-gray-500 ml-2">{timestamp}</div>
              </div>

              <p className="text-gray-800">{content}</p>
            </div>
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="mx-auto max-w-4xl pt-2 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="rounded-xl border p-5  shadow-md w-full bg-white">
        <div className="flex w-full items-center justify-between border-b pb-3">
          <div className="flex items-center space-x-3">
            <div>
              <img className="w-10 h-10 rounded-full" src={idea.user.image} />
            </div>
            <div className="text-lg font-normal text-slate-700">
              {idea.user.name}
            </div>
          </div>
          <div className="flex items-center space-x-8">
            <button className="rounded-2xl border bg-neutral-100 px-3 py-1 text-xs font-semibold">
              Category
            </button>
            <div className="text-xs text-neutral-500">
              {getTimeAgo(idea.created_at)}
            </div>
          </div>
        </div>
        <div className="mt-4 mb-6">
          <div className="mb-3 text-xl font-bold">{idea.title}</div>
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
              <div className="group flex relative cursor-pointer items-center transition hover:text-slate-600 gap-2">
                <div
                  className={`cursor-pointer flex gap-2 items-center justify-between w-full px-4 py-2 text-center text-white duration-200 ${idea.user.id == user_id? 'bg-gray-400 border-gray-400 cursor-not-allowed':'bg-black border-black hover:bg-transparent hover:border-black hover:text-black focus:outline-none'} border-2  rounded-full inline-flex  lg:w-auto focus-visible:outline-black text-sm focus-visible:ring-black`}
                  onClick={
                  idea.user.id !== user_id ? toggleCommentBox : null
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v12m6-6H6"
                    />
                  </svg>
                  <h2>Add comment</h2>
                </div>
                {
                    idea.user.id == user_id ? <span className="group-hover:opacity-100 transition-opacity bg-orange-800 px-1 text-sm text-gray-100 rounded-md absolute left-1/2
    -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto">
                    You can't comment on your own post
                    </span> : null
                }
              </div>
              <div className="flex cursor-pointer items-center transition hover:text-slate-600 gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                  />
                </svg>
                <span>{idea.likes}</span>
              </div>
              <div className="flex cursor-pointer items-center transition hover:text-slate-600 gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"
                  />
                </svg>

                <span>{idea.dislikes}</span>
              </div>
            </div>
          </div>
        </div>
        {/*Comment component*/}
        <>
          <div className="bg-white pl-2 mt-4  w-full">
            <form
              className={`mb-4 ${showCommentBox ? "" : "hidden"}`}
              onSubmit={addComment}
            >
              <textarea
                className="w-full rounded-md border p-2 mb-2 resize-none"
                placeholder="Write your comment here..."
                rows="3"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <input
                className="cursor-pointer flex gap-2 items-center justify-between w-full px-4 py-2 text-center text-white duration-200 bg-blue-600 border-2 border-blue-600 rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none lg:w-auto focus-visible:outline-black text-sm focus-visible:ring-black"
                type="submit"
                value="Post comment"
              />
            </form>
            <h3 className="text-lg font-semibold mb-2">Comments</h3>
            <div className="bg-gray-200 p-4 rounded-md">
              {idea.comments.length == 0 ? (
                <p>This post has no comments yet</p>
              ) : (
                <>
                  {idea.comments.map((comment) => (
                    <Comment
                      key={comment.id}
                      timestamp={getTimeAgo(comment.created_at)}
                      avatarUrl={comment.user.image}
                      username={comment.user.name}
                      content={comment.content}
                    />
                  ))}
                </>
              )}
            </div>
          </div>
        </>
      </div>
    </div>
  );
}

export default DetailedIdeaCard;


