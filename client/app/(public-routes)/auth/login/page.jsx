"use client";
// pages/login.js
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Import the useRouter hook

function Login() {
  const router = useRouter(); // Use the useRouter hook

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    // console.log("RESULT", result);

    if (result.error) {
      // Handle login error
      // console.error("Login failed:", result.error);
        setError(result.error);
      return;
    }

    // Check if there's a callback URL in the query parameters
    const callbackUrl = router?.query?.callback;

    // Redirect to /feed if there's no callback URL, otherwise, use the provided callback
    const destination = callbackUrl || "/feed";
    router.push(destination);
  };

  return (
    <div>
      <main className="w-full max-w-md mx-auto p-6">
        <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                Sign in
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Don't have an account yet? {" "}
                <Link
                    className="text-blue-600 decoration-2 hover:underline font-medium"
                    href="/auth/signup"
                >
                  Sign up here
                </Link>
              </p>
            </div>
            <p className=" text-xs text-center text-red-600 mt-2" id="email-error">
                {error}
            </p>
            <div className="mt-5">

              {/* Form */}
              <form onSubmit={loginUser}>

                <div className="grid gap-y-4">
                  {/* Form Group */}
                  <div>
                    <label
                        htmlFor="email"
                        className="block text-sm mb-2 dark:text-white"
                    >
                      Email address
                    </label>
                    <div className="relative">
                      <input
                          type="email"
                          id="email"
                          name="email"
                          className="py-3 px-4 block w-full border rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                          required=""
                          aria-describedby="email-error"
                          placeholder={"Enter your email"}
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setError("");
                          }}
                      />
                      {error && (
                          <div className=" absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                            <svg
                                className="h-5 w-5 text-red-500"
                                width={16}
                                height={16}
                                fill="currentColor"
                                viewBox="0 0 16 16"
                                aria-hidden="true"
                            >
                              <path
                                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                            </svg>
                          </div>
                      )}
                    </div>

                  </div>
                  {/* End Form Group */}
                  {/* Form Group */}
                  <div>
                    <div className="flex justify-between items-center">
                      <label
                          htmlFor="password"
                          className="block text-sm mb-2 dark:text-white"
                      >
                        Password
                      </label>
                      <a
                          className="text-sm text-blue-600 decoration-2 hover:underline font-medium"
                          href="../examples/html/recover-account.html"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <div className="relative">
                      <input
                          type="password"
                          id="password"
                          name="password"
                          className="py-3 px-4 block w-full border rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                          required=""
                          aria-describedby="password-error"
                            placeholder={"Enter your password"}
                          value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError("");
                            }}
                      />
                      {
                            error && (
                              <div className=" absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                                <svg
                                    className="h-5 w-5 text-red-500"
                                    width={16}
                                    height={16}
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                    aria-hidden="true"
                                >
                                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                </svg>
                              </div>
                            )
                      }
                    </div>
                  </div>
                  {/* End Form Group */}
                  {/* Checkbox */}

                  {/* End Checkbox */}
                  <button
                      type="submit"
                      className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                  >
                    Sign in
                  </button>
                </div>
              </form>
              {/* End Form */}
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}

export default Login;
