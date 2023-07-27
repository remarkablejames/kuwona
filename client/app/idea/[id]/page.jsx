import DetailedIdeaCard from "@/app/idea/[id]/components/CommentCard";

export default function commentsPage({ params }) {
  // console.log(params);
  return (
    <>
      <main className=" overflow-y-scroll w-full ">
        {/* Your content */}
        <DetailedIdeaCard id={params.id} />

        <div className=" p-4">{/*    This element is hidden*/}</div>
      </main>
    </>
  );
}
