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
        <div className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-black border-b border-gray-700 text-sm py-2.5 sm:py-4">
          <nav
            className="max-w-[85rem] flex basis-full items-center w-full mx-auto px-4 sm:px-6 lg:px-8"
            aria-label="Global"
          >
            <div className="mr-5 md:mr-8">
              <a
                className="flex-none text-xl font-semibold text-white"
                href="#"
                aria-label="Brand"
              >
                Kuwona
              </a>
            </div>
            <div className="w-full flex items-center justify-end ml-auto sm:justify-between sm:gap-x-3 sm:order-3">
              <div className="sm:hidden">
                <button
                  type="button"
                  className="inline-flex flex-shrink-0 justify-center items-center gap-2 h-[2.375rem] w-[2.375rem] rounded-full font-medium hover:bg-white/[.2] text-white align-middle focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all text-xs"
                >
                  <svg
                    className="w-3.5 h-3.5"
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
              <div className="hidden mx-auto sm:block">
                <label htmlFor="icon" className="sr-only">
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none z-20 pl-4">
                    <svg
                      className="h-4 w-4 text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="icon"
                    name="icon"
                    className="py-2 px-4 pl-11 pr-20 block w-92 md:w-96 bg-transparent border-gray-700 shadow-sm rounded-md text-sm text-gray-300 focus:z-10 focus:border-gray-900 focus:ring-gray-600 placeholder:text-gray-500"
                    placeholder="Search"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none z-20 pr-4">
                    <span className="text-gray-500">Ctrl + /</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center justify-end gap-2">
                <button
                  type="button"
                  className="inline-flex flex-shrink-0 justify-center items-center gap-2 h-[2.375rem] w-[2.375rem] rounded-full font-medium hover:bg-white/[.2] text-white align-middle focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all text-xs"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="inline-flex flex-shrink-0 justify-center items-center gap-2 h-[2.375rem] w-[2.375rem] rounded-full font-medium hover:bg-white/[.2] text-white align-middle focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all text-xs"
                  data-hs-offcanvas="#hs-offcanvas-right"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.5 2A3.5 3.5 0 0 0 2 5.5v5A3.5 3.5 0 0 0 5.5 14h5a3.5 3.5 0 0 0 3.5-3.5V8a.5.5 0 0 1 1 0v2.5a4.5 4.5 0 0 1-4.5 4.5h-5A4.5 4.5 0 0 1 1 10.5v-5A4.5 4.5 0 0 1 5.5 1H8a.5.5 0 0 1 0 1H5.5z" />
                    <path d="M16 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  </svg>
                </button>
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
                      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80"
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
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-300">
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
          <nav
            className="sticky -top-px bg-white text-sm font-medium text-black ring-1 ring-gray-900 ring-opacity-5 border-t shadow-sm shadow-gray-100 pt-6 md:pb-6 -mt-px dark:bg-slate-900 dark:border-gray-800 dark:shadow-slate-700/[.7]"
            aria-label="Jump links"
          >
            <div className="max-w-7xl snap-x w-full flex items-center overflow-x-auto scrollbar-x px-4 sm:px-6 lg:px-8 pb-4 md:pb-0 mx-auto dark:scrollbar-x">
              <div className="snap-center shrink-0 pr-5 sm:pr-8 sm:last-pr-0">
                <a
                  className="inline-flex items-center gap-x-2 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-500"
                  href="/feed"
                >
                  Home
                </a>
              </div>
              <div className="snap-center shrink-0 pr-5 sm:pr-8 sm:last:pr-0">
                <a
                  className="inline-flex items-center gap-x-2 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-500"
                  href="#"
                >
                  Explore
                </a>
              </div>
              <div className="snap-center shrink-0 pr-5 sm:pr-8 sm:last:pr-0">
                <a
                  className="inline-flex items-center gap-x-2 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-500"
                  href="#"
                >
                  Sports
                </a>
              </div>
              <div className="snap-center shrink-0 pr-5 sm:pr-8 sm:last:pr-0">
                <a
                  className="inline-flex items-center gap-x-2 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-500"
                  href="#"
                >
                  Gaming
                </a>
              </div>
              <div className="snap-center shrink-0 pr-5 sm:pr-8 sm:last:pr-0">
                <a
                  className="inline-flex items-center gap-x-2 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-500"
                  href="#"
                >
                  Business
                </a>
              </div>
              <div className="snap-center shrink-0 pr-5 sm:pr-8 sm:last:pr-0">
                <a
                  className="inline-flex items-center gap-x-2 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-500"
                  href="#"
                >
                  Fashion
                </a>
              </div>
            </div>
          </nav>
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
