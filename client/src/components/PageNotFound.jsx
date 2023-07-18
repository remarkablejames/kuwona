import {Link} from "react-router-dom";

function PageNotFound(){
    return(
        <div className="max-w-[50rem] flex flex-col mx-auto w-full h-full">
            <header className="mb-auto flex justify-center z-50 w-full py-4">
                <nav className="px-4 sm:px-6 lg:px-8" aria-label="Global">
                    <a
                        className="flex-none text-xl font-semibold sm:text-3xl dark:text-white"
                        href="#"
                        aria-label="Brand"
                    >
                        Kuwona
                    </a>
                </nav>
            </header>
            <div className="text-center py-10 px-4 sm:px-6 lg:px-8">
                <h1 className="block text-7xl font-bold text-gray-800 sm:text-9xl dark:text-white">
                    404
                </h1>
                <h1 className="block text-2xl font-bold text-white" />
                <p className="mt-3 text-gray-600 dark:text-gray-400">
                    Oops, something went wrong.
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                    Sorry, we couldn't find your page.
                </p>
                <div className="mt-5 flex flex-col justify-center items-center gap-2 sm:flex-row sm:gap-3">
                    <Link
                        className="w-full sm:w-auto inline-flex justify-center items-center gap-x-3 text-center bg-blue-600 hover:bg-blue-700 border border-transparent text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:focus:ring-offset-gray-800"
                        to="/feed"
                    >
                        <svg
                            className="w-3.5 h-3.5"
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={16}
                            fill="currentColor"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fillRule="evenodd"
                                d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
                            />
                            <path
                                fillRule="evenodd"
                                d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
                            />
                        </svg>
                        Go back home
                    </Link>

                </div>
            </div>
        </div>

    );
}

export default PageNotFound;