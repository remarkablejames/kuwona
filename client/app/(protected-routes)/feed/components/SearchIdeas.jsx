
'use client'
import { useState } from "react";
async function searchIdeas(keyword) {
    const res = await fetch(`http://127.0.0.1:8002/api/ideas/search/${keyword}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });
    const ideas = await res.json();
    return ideas;

}
function SearchIdeas(props) {
    const [search, setSearch] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("searching for: ", search);
        // redirect to search page
        window.location.href = `/search?search=${search}`;
    }
    return (
        <div className="relative overflow-hidden ">
            <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8  sm:pb-12">
                <div className="text-center">

                    <div className=" sm:mt-12 mx-auto max-w-xl relative">
                        {/* Form */}
                        <form onSubmit={handleSubmit}>
                            <div className="relative z-10 flex space-x-3 p-3 bg-white rounded-lg shadow-lg shadow-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:shadow-gray-900/[.2]">
                                <div className="flex-[1_0_0%]"
                                >
                                    <label
                                        htmlFor="hs-search-article-1"
                                        className="block text-sm text-gray-700 font-medium dark:text-white"
                                    >
                                        <span className="sr-only">Search ideas</span>
                                    </label>
                                    <input
                                        id="hs-search-article-1"
                                        className="p-3 block w-full border rounded-md focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-400"
                                        type="text"
                                        placeholder={"Search ideas"}
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}

                                    />
                                </div>
                                <div className="flex-[0_0_auto]">
                                    <button
                                        className="p-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                                        type={"submit"}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={16}
                                            height={16}
                                            fill="currentColor"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </form>

                        {/*/++++++++++++++++++++++++++++++++++++++*/}


                        {/*/++++++++++++++++++++++++++++++++++++++*/}
                        {/* End Form */}
                        {/* SVG Element */}
                        <div className="hidden md:block absolute  top-0 right-0 -translate-y-12 translate-x-20">
                            <svg
                                className="w-16 h-auto text-orange-500 z-50"
                                width={121}
                                height={135}
                                viewBox="0 0 121 135"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164"
                                    stroke="currentColor"
                                    strokeWidth={10}
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5"
                                    stroke="currentColor"
                                    strokeWidth={10}
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874"
                                    stroke="currentColor"
                                    strokeWidth={10}
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>
                        {/* End SVG Element */}
                        {/* SVG Element */}
                        <div className="hidden md:block absolute bottom-0 left-0 translate-y-10 -translate-x-32">
                            <svg
                                className="w-40 h-auto text-cyan-500"
                                width={347}
                                height={188}
                                viewBox="0 0 347 188"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M4 82.4591C54.7956 92.8751 30.9771 162.782 68.2065 181.385C112.642 203.59 127.943 78.57 122.161 25.5053C120.504 2.2376 93.4028 -8.11128 89.7468 25.5053C85.8633 61.2125 130.186 199.678 180.982 146.248L214.898 107.02C224.322 95.4118 242.9 79.2851 258.6 107.02C274.299 134.754 299.315 125.589 309.861 117.539L343 93.4426"
                                    stroke="currentColor"
                                    strokeWidth={7}
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>
                        {/* End SVG Element */}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default SearchIdeas;