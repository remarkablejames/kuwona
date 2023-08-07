import Link from "next/link";

function unauthenticatedPage() {
  return (
      <>
          {/* component */}
          {/* https://play.tailwindcss.com/PLrIiZQn2n */}
          <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12 bg-white">
              <div className="max-w-xl px-5 text-center">
                  <h2 className="mb-2 text-[42px] font-bold text-zinc-800">
                      You need to login first
                  </h2>
                  <p className="mb-2 text-lg text-zinc-500">
                        You need to login first to access this page or you can create a new account if you don't have one.
                  </p>
                  <Link
                      href="/auth/login"
                      className="mt-3 inline-block w-96 rounded bg-indigo-600 px-5 py-3 font-medium text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700"
                  >
                      Go to the Login page →
                  </Link>
              </div>
          </div>
      </>

  );

}

export default unauthenticatedPage;