"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function LayoutShell({ children, user }) {
  useEffect(() => {
    import("preline");
  }, []);
  return (
    <html lang="en">
      <body>
        {/* ========== HEADER ========== */}
        {/* ========== HEADER ========== */}
        <div className=" sticky -top-px flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-black border-b border-gray-700 text-sm py-2.5 sm:py-4">
          <nav
            className="max-w-[85rem] flex basis-full items-center w-full mx-auto px-4 sm:px-6 lg:px-8"
            aria-label="Global"
          >
            <div className="mr-5 md:mr-8">
              <Link
                className="flex-none text-xl font-semibold text-white"
                href="/feed"
                aria-label="Brand"
              >
                Kuwona
              </Link>
            </div>
            <div className="w-full flex items-center justify-end ml-auto sm:justify-between sm:gap-x-3 sm:order-3">

              <div className="hidden mx-auto sm:block">

              </div>
              <div className="flex flex-row items-center justify-end gap-6">
                <div className="flex items-center justify-end">
                  <Link
                      className="cursor-pointer flex gap-2 items-center justify-between w-full px-6 py-2 text-center text-white duration-200 bg-blue-500 border-2 border-blue-500 rounded-full nline-flex hover:bg-blue-600 hover:border-blue-600 hover:text-white focus:outline-none lg:w-auto focus-visible:outline-black text-sm focus-visible:ring-black"
                      href="/idea/new"
                  >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4"
                    >
                      <path d="M12 .75a8.25 8.25 0 00-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 00.577.706c.352.083.71.148 1.074.195.323.041.6-.218.6-.544v-4.661a6.714 6.714 0 01-.937-.171.75.75 0 11.374-1.453 5.261 5.261 0 002.626 0 .75.75 0 11.374 1.452 6.712 6.712 0 01-.937.172v4.66c0 .327.277.586.6.545.364-.047.722-.112 1.074-.195a.75.75 0 00.577-.706c.02-.615.448-1.225 1.134-1.623A8.25 8.25 0 0012 .75z" />
                      <path
                          fillRule="evenodd"
                          d="M9.013 19.9a.75.75 0 01.877-.597 11.319 11.319 0 004.22 0 .75.75 0 11.28 1.473 12.819 12.819 0 01-4.78 0 .75.75 0 01-.597-.876zM9.754 22.344a.75.75 0 01.824-.668 13.682 13.682 0 002.844 0 .75.75 0 11.156 1.492 15.156 15.156 0 01-3.156 0 .75.75 0 01-.668-.824z"
                          clipRule="evenodd"
                      />
                    </svg>
                    <h2 className="font-bold">Create Idea post</h2>
                  </Link>
                </div>
                <div
                  className="hs-dropdown relative inline-flex"
                  data-hs-dropdown-placement="bottom-right"
                >
                  <button
                    id="hs-dropdown-with-header"
                    type="button"
                    className="inline-flex flex-shrink-0 justify-center items-center gap-2 h-[2.375rem] w-[2.375rem] rounded-full font-medium hover:bg-white/[.2] text-white align-middle focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all text-xs"
                  >
                    <img
                      className="inline-block h-[2.375rem] w-[2.375rem] rounded-full"
                      src={
                        user.image || "https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
                      }
                      alt="Image Description"
                    />
                  </button>
                  <div
                    className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-[15rem] z-10 bg-white shadow-md rounded-lg p-2 dark:bg-gray-800 dark:border dark:border-gray-700"
                    aria-labelledby="hs-dropdown-with-header"
                  >
                    <div className="py-3 px-5 -m-2 bg-gray-100 rounded-t-lg dark:bg-gray-700">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Signed in as
                      </p>
                      <p className="text-md font-bold text-gray-800 dark:text-gray-300">
                        {user.name}
                      </p>
                      <p className="text-xs font-medium text-gray-800 dark:text-gray-300">
                        {user.email}
                      </p>
                    </div>
                    <div className="mt-2 py-2 first:pt-0 last:pb-0">
                      <Link
                        className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                        href="/account"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        My account
                      </Link>
                      <Link
                        className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                        href="/bookmarks"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                          />
                        </svg>
                        Bookmarks
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
        {/* ========== END HEADER ========== */}
        {/* ========== MAIN CONTENT ========== */}
        <main id="content" role="main">
          {/* Nav */}
          {/* End Nav */}
          <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 min-h-[75rem]">
            {/* Page Heading */}
            {children}
            {/* End Page Heading */}
          </div>
        </main>
        {/* ========== END MAIN CONTENT ========== */}
      </body>
    </html>
  );
}
