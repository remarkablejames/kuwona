"use client";
import { useState } from "react";
import axios from "axios";
import { redirect } from "next/navigation";
export default function NewIdeaForm({ token, user_id }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(title, description, category);
    // check if user is logged in with token
     if (!token) { return redirect("/unauthenticated"); }
    axios
      .post(
        "http://127.0.0.1:8002/api/ideas",
        {
          title,
          description,
          category,
          user_id,
          slug: "slug",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
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
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="category">Category</label>
        <input
          type="text"
          id="category"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
