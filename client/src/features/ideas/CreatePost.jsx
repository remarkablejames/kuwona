
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
                                    <div className="my-2">
                                    <label>Idea title</label>
                                    <input
                                        name="icon"
                                        type="text"
                                        className="block w-1/2 px-4 py-2 text-sm font-normal text-gray-800 placeholder-gray-400 placeholder:italic bg-white border border-gray-300 rounded-md font-spline focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600/50 disabled:opacity-50"
                                        placeholder="Idea title goes here"
                                        required=""
                                    />
                                    </div>
                                    <div className="mb-4">
                                    <label>Content</label>
                                    <textarea
                                        className="w-full rounded-md border p-2 mb-2 resize-none placeholder:italic"
                                        placeholder="Write your idea here..."
                                        rows="3"
                                    />
                                    </div>
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