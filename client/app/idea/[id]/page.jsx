import DetailedIdeaCard from "@/app/idea/[id]/components/CommentCard";

export default function commentsPage(props) {
  console.log(props);
  return (
    <>
      <main className=" overflow-y-scroll w-full ">
        {/* Your content */}
        <DetailedIdeaCard />

        <div className=" p-4">{/*    This element is hidden*/}</div>
      </main>
    </>
  );
}
