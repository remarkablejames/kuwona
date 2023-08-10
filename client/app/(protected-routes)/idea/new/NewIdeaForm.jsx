"use client";
import { useState } from "react";
import axios from "axios";
import { redirect } from "next/navigation";
export default function NewIdeaForm({ token, user_id }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  // image upload
    const [image, setImage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(title, description, category);

        if (!token) { return redirect("/unauthenticated"); }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("user_id", user_id);
        formData.append("slug", "slug");
        formData.append("image", image); // Append the image file object

        axios.post(
            "http://127.0.0.1:8002/api/ideas",
            formData, // Use formData instead of a plain object
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                    // No need to set Content-Type for FormData
                },
            }
        )
            .then((res) => {
                console.log("GOT RESPONSE", res);
                // redirect to home page
                window.location.href = "/feed";
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
    <div>

        <>
            {/* Comment Form */}
            <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                <div className="mx-auto max-w-2xl">
                    <div className="text-center">
                        <h2 className="text-xl text-gray-800 font-bold sm:text-3xl dark:text-white">
                            Post new idea
                        </h2>
                    </div>
                    {/* Card */}
                    <div className="mt-5 p-4 relative z-10 bg-white border rounded-xl sm:mt-10 md:p-10 dark:bg-gray-800 dark:border-gray-700">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4 sm:mb-8">
                                <label
                                    htmlFor="hs-feedback-post-comment-name-1"
                                    className="block mb-2 text-sm font-medium dark:text-white"
                                >
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="hs-feedback-post-comment-name-1"
                                    className="py-3 px-4 block w-full border rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                                    placeholder="Idea title"
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title}
                                />
                            </div>
                            <div className="mb-4 sm:mb-8">
                                <label
                                    htmlFor="hs-feedback-post-comment-email-1"
                                    className="block mb-2 text-sm font-medium dark:text-white"
                                >
                                    Category
                                </label>
                                <input
                                    type="text"
                                    id="hs-feedback-post-comment-email-1"
                                    className="py-3 px-4 block w-full border rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                                    placeholder="Idea category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}

                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="hs-feedback-post-comment-textarea-1"
                                    className="block mb-2 text-sm font-medium dark:text-white"
                                >
                                    Description
                                </label>
                                <div className="mt-1">
              <textarea
                  id="hs-feedback-post-comment-textarea-1"
                  name="hs-feedback-post-comment-textarea-1"
                  rows={3}
                  className="py-3 px-4 block w-full border rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                  placeholder="Idea description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}

              />
                                </div>

                            {/*   upload Idea image*/}
                            <div className="mt-1">
                                <label
                                    htmlFor="hs-feedback-post-comment-textarea-1"
                                    className="block mb-2 text-sm font-medium dark:text-white"
                                >
                                    Upload image
                                </label>
                                <div className="mt-1">
                <input
                    type="file"
                    id="hs-feedback-post-comment-textarea-1"
                    name="hs-feedback-post-comment-textarea-1"
                    onChange={(e) => setImage(e.target.files[0])}

                    className="py-3 px-4 block w-full border rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                    />

                                </div>
                            </div>
                            </div>
                            <div className="mt-6 grid">
                                <button
                                    type="submit"
                                    className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all dark:focus:ring-offset-gray-800"
                                >
                                    Post
                                </button>
                            </div>
                        </form>
                    </div>
                    {/* End Card */}
                </div>
            </div>
            {/* End Comment Form */}
        </>

    </div>
  );
}
