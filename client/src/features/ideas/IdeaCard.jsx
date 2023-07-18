function IdeaCard(){

    return (
        <div className="mx-auto max-w-4xl pt-2 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="rounded-xl border p-5  shadow-md w-full bg-white">
            <div className="flex w-full items-center justify-between border-b pb-3">
                <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-slate-400 bg-[url('https://i.pravatar.cc/32')]" />
                    <div className="text-lg font-bold text-slate-700">Joe Smith</div>
                </div>
                <div className="flex items-center space-x-8">
                    <button className="rounded-2xl border bg-neutral-100 px-3 py-1 text-xs font-semibold">
                        Category
                    </button>
                    <div className="text-xs text-neutral-500">2 hours ago</div>
                </div>
            </div>
            <div className="mt-4 mb-6">
                <div className="mb-3 text-xl font-bold">
                    Quantum Chef: A Culinary Adventure in Parallel Flavors
                </div>
                <div className="text-sm text-neutral-600 text-justify">
                    Step into a futuristic kitchen where quantum computing meets gastronomy. Quantum Chef whisks you away on a taste-bud tingling journey, where ingredients exist in superposition and flavors entangle. Experience multi-dimensional meals, taste parallel dishes simultaneously, and savor the delights of quantum entangled cuisine. Bon appétit! 🍽️🚀
                </div>
            </div>
            <div>
                <div className="flex items-center justify-between text-slate-500">
                    <div className="flex space-x-4 md:space-x-8">
                        <div className="flex cursor-pointer items-center transition hover:text-slate-600 gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="currentColor" className="w-4 h-4 group hover:text-red-500">
                                <path strokeLinecap="round" strokeLinejoin="round" className="fill-current" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                            </svg>


                            <span className="text-sm">125</span>
                        </div>
                        <div className="flex cursor-pointer items-center transition hover:text-slate-600 gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 hover:text-red-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                            </svg>
                            <span className="text-sm">4</span>
                        </div>
                        <div className="flex cursor-pointer items-center transition hover:text-slate-600 gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384" />
                            </svg>

                            <span className="text-sm">4</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        </div>
    )
}

export default IdeaCard