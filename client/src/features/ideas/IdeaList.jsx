import IdeaCard from "./IdeaCard.jsx";

function IdeaList(){
    return(
        <>
            <main className=" overflow-y-scroll  ">
                <div className="mx-auto max-w-4xl pt-2 sm:px-6 lg:px-8 flex items-center justify-between">
                    <h2 className="font-normal text-xl">Latest Posts</h2>
                <div className="flex items-center justify-end mb-4">

                    <a className="w-full sm:w-auto inline-flex justify-center items-center gap-x-3 text-center bg-blue-600 hover:bg-blue-700 border border-transparent text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition p-2 px-4 dark:focus:ring-offset-gray-800"
                       href="https://github.com/htmlstreamofficial/preline/tree/main/examples/html" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path d="M12 .75a8.25 8.25 0 00-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 00.577.706c.352.083.71.148 1.074.195.323.041.6-.218.6-.544v-4.661a6.714 6.714 0 01-.937-.171.75.75 0 11.374-1.453 5.261 5.261 0 002.626 0 .75.75 0 11.374 1.452 6.712 6.712 0 01-.937.172v4.66c0 .327.277.586.6.545.364-.047.722-.112 1.074-.195a.75.75 0 00.577-.706c.02-.615.448-1.225 1.134-1.623A8.25 8.25 0 0012 .75z" />
                            <path fillRule="evenodd" d="M9.013 19.9a.75.75 0 01.877-.597 11.319 11.319 0 004.22 0 .75.75 0 11.28 1.473 12.819 12.819 0 01-4.78 0 .75.75 0 01-.597-.876zM9.754 22.344a.75.75 0 01.824-.668 13.682 13.682 0 002.844 0 .75.75 0 11.156 1.492 15.156 15.156 0 01-3.156 0 .75.75 0 01-.668-.824z" clipRule="evenodd" />
                        </svg>

                        Create Idea post
                    </a>

                </div>
                </div>

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