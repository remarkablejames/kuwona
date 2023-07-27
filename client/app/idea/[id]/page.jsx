import DetailedIdeaCard from "@/app/idea/[id]/components/CommentCard";

async function fetchIOneIdea(id) {
  const res = await fetch(`http://127.0.0.1:8002/api/ideas/${id}}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  });
  const ideas = await res.json();
  return ideas;
}

export default async function commentsPage({ params }) {
  // console.log(params);
  const idea = await fetchIOneIdea(params.id);
  //
  return (
    <>
      <main className=" overflow-y-scroll w-full ">
        {/* Your content */}
        <DetailedIdeaCard idea={idea} />

        <div className=" p-4">{/*    This element is hidden*/}</div>
      </main>
    </>
  );
}
