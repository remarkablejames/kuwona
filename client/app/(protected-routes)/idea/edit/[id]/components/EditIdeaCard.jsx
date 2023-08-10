"use client";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { getTimeAgo } from "@/app/utils";
import { sortArrayByDate } from "@/app/utils";

function EditIdeaCard({ idea, token, user_id }) {
  //sort comments by date, newest first
  idea.comments = sortArrayByDate(idea.comments);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState("");
  const [title, setTitle] = useState(idea.title);
    const [description, setDescription] = useState(idea.description);
    const [category, setCategory] = useState(idea.category);
  const [previewUrl, setPreviewUrl] = useState(idea.image); // Add this state variable for the preview URL

  // image upload
    const [image, setImage] = useState(idea.image);
  function toggleCommentBox() {
    setShowCommentBox(!showCommentBox);
  }
  async function updateIdea(e) {
    e.preventDefault();

    // console.log("FORM DATA", formData);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("user_id", user_id);
      formData.append("slug", "slug");
      formData.append("image", image); // Append the image file object

      let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: `http://127.0.0.1:8002/api/ideas/${idea.id}`,
          headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${token}`
          },
            data : formData
      };

      axios.request(config)
          .then((response) => {
              console.log(JSON.stringify(response.data));
          })
          .catch((error) => {
              console.log("Error:",error);
          });

    // redirect to home page
    window.location.href = "/feed";
  }
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
        <form onSubmit={updateIdea}>
          <div className="mt-4">
            <div className="mb-3 text-xl font-bold">
                <input className="focus:outline-none w-full" type={"text"} value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="text-md text-neutral-600 text-justify">
                <textarea className="focus:outline-none w-full" value={description} onChange={(e) => setDescription(e.target.value)} />

            </div>
            {
                previewUrl && (
                    <div className="">
                      <div className="text-gray-400 font-medium text-sm mt-6">
                        <img className="rounded w-full" src={previewUrl} />
                      </div>
                    </div>
                )
            }
          </div>
        {/*    change image*/}
            <div className="mt-4">
                <div className="mb-3 text-xl font-bold">
                    <input className="py-3 px-4 block w-full border rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400" type={"file"}
                           onChange={(e) => {
                             const file = e.target.files[0];
                             setImage(file); // Set the image file
                             setPreviewUrl(URL.createObjectURL(file)); // Create and set the preview URL
                           }}
                            />
                </div>
            </div>

          <button
              type="submit"
              className="py-3 px-4 w-full inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all dark:focus:ring-offset-gray-800"
          >
            Update Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditIdeaCard;


