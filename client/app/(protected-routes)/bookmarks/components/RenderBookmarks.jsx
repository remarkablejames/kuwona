import IdeaCard from "./IdeaCard.jsx";
import Link from "next/link";
import { sortArrayByDate } from "@/app/utils.js";

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

async function RenderBookmarks() {
  const ideas = sortArrayByDate(await fetchIdeas());
  return (
    <>
      {ideas ? (
        <main className=" overflow-y-scroll  ">
          <h2 className="font-bold text-4xl  text-center">Bookmarked ideas</h2>

          {/* Your content */}
          {ideas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
          <div className=" p-4">{/*    This element is hidden*/}</div>
        </main>
      ) : (
        <>No posts found</>
      )}
    </>
  );
}

export default RenderBookmarks;
