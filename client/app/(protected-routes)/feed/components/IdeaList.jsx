import IdeaCard from "./IdeaCard.jsx";
import Link from "next/link";
import { sortArrayByDate } from "@/app/utils.js";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SearchIdeas from "./SearchIdeas.jsx";

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
          <>
            {/* Hero */}
            <SearchIdeas />
            {/* End Hero */}
          </>
      {/*CUT FROM HERE-----------------------------------------------------*/}
      {/*    */}

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
