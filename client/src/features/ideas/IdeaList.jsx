import IdeaCard from "./IdeaCard.jsx";

function IdeaList(){
    return(
        <>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">All Ideas</h1>
                </div>
            </header>
            <main className=" overflow-y-scroll  ">
                    {/* Your content */}
                    <IdeaCard />
                <IdeaCard />
                <IdeaCard />
                <div className=" p-4">
                {/*    This element is hidden*/}
                </div>

            </main>
        </>
    )
}

export default IdeaList