
import DetailedIdeaCard from "./DetailedIdeaCard.jsx";
import {useEffect} from "react";

function CreatePost(){
    useEffect(()=>{
        // scroll to top
        window.scrollTo(0,0);
    },[])


    return (
        <>
            <main className=" overflow-y-scroll h-full  ">
                {/* Your content */}
                <div className="mx-auto max-w-4xl pt-2 sm:px-6 lg:px-8 flex items-center justify-center">
                    <div className="rounded-xl border p-5  shadow-md w-full bg-white">

                        {/*Comment component*/}
                        <>
                            <div className="bg-white pl-2   w-full">
                                <h3 className="text-xl font-semibold mb-4">Post new idea</h3>
                                <form className="mb-4">
                        <textarea
                            className="w-full rounded-md border p-2 mb-2 resize-none"
                            placeholder="Write your idea here..."
                            rows="3"
                        />
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                    >
                                        Publish
                                    </button>
                                </form>

                            </div>
                        </>
                    </div>
                </div>

                <div className=" p-4">
                    {/*    This element is hidden*/}
                </div>

            </main>
        </>
    )
}
export default CreatePost