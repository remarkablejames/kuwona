import DetailedIdeaCard from "@/app/comments/components/CommentCard";

export default function commentsPage() {
    return (
        <>
            <main className=" overflow-y-scroll w-full ">
                {/* Your content */}
                <DetailedIdeaCard />

                <div className=" p-4">
                    {/*    This element is hidden*/}
                </div>

            </main>
        </>
    )
}