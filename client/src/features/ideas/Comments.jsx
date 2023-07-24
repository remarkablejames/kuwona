
import DetailedIdeaCard from "./DetailedIdeaCard.jsx";

function Comments(){

    return (
        <>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Comments</h1>
                </div>
            </header>
            <main className=" overflow-y-scroll  ">
                {/* Your content */}
                <DetailedIdeaCard />

                <div className=" p-4">
                    {/*    This element is hidden*/}
                </div>

            </main>
        </>
    )
}
export default Comments