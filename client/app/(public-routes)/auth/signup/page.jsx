'use client'
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    // image upload
    const [image, setImage] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();

        let data = new FormData();
        data.append('name', name);
        data.append('email', email);
        data.append('password', password);
        data.append('password_confirmation', password_confirmation);
        data.append('image', image); // Append the image file object

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8002/api/register/',

            data : data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setSuccess(true);
            })
            .catch((error) => {
                console.log(error);
                setError(error.response.data.message);

            });

    }

    const successPage = () => {
        return (
            <>
                {/* component */}
                {/* https://play.tailwindcss.com/PLrIiZQn2n */}
                <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12 bg-white">
                    <div className="max-w-xl px-5 text-center">
                        <h2 className="mb-2 text-[42px] font-bold text-zinc-800">
                            Welcome to Kuwona!
                        </h2>
                        <p className="mb-2 text-lg text-zinc-500">
                            You have successfully created an account. Please login to continue.
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
  return (
        <>
            {success ? successPage() : (
                <main className="w-full max-w-md mx-auto p-6">
                    <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-4 sm:p-7">
                            <div className="text-center">
                                <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                                    Sign up
                                </h1>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                    Already have an account?
                                    <Link
                                        className="text-blue-600 decoration-2 hover:underline font-medium"
                                        href="/auth/login"
                                    >
                                        Sign in here
                                    </Link>
                                </p>
                            </div>
                            <p className=" text-center text-xs text-red-600 mt-2" id="email-error">
                                {error}
                            </p>
                            <div className="mt-5">

                                {/* Form */}
                                <form onSubmit={handleSubmit}>
                                    <div className="grid gap-y-4">
                                        {/* Form Group */}
                                        <div>
                                            <label
                                                htmlFor="name"
                                                className="block text-sm mb-2 dark:text-white"
                                            >
                                                Full Name
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    className="py-3 px-4 block w-full border rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                                                    required=""
                                                    aria-describedby="name-error"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    placeholder={"Full name"}
                                                />

                                            </div>

                                        </div>
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
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder={"Email address"}
                                                />
                                                <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
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
                                            </div>
                                            <p className="hidden text-xs text-red-600 mt-2" id="email-error">
                                                Please include a valid email address so we can get back to you
                                            </p>
                                        </div>
                                        {/* End Form Group */}
                                        {/* Form Group */}
                                        <div>
                                            <label
                                                htmlFor="password"
                                                className="block text-sm mb-2 dark:text-white"
                                            >
                                                Password
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="password"
                                                    id="password"
                                                    name="password"
                                                    className="py-3 px-4 block w-full border rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                                                    required=""
                                                    aria-describedby="password-error"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    placeholder={"Password"}
                                                />
                                                <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
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
                                            </div>
                                            <p
                                                className="hidden text-xs text-red-600 mt-2"
                                                id="password-error"
                                            >
                                                8+ characters required
                                            </p>
                                        </div>
                                        {/* End Form Group */}
                                        {/* Form Group */}
                                        <div>
                                            <label
                                                htmlFor="confirm-password"
                                                className="block text-sm mb-2 dark:text-white"
                                            >
                                                Confirm Password
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="password"
                                                    id="confirm-password"
                                                    name="confirm-password"
                                                    className="py-3 px-4 block w-full border rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                                                    required=""
                                                    aria-describedby="confirm-password-error"
                                                    value={password_confirmation}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    placeholder={"Confirm password"}
                                                />
                                                <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
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
                                            </div>
                                            <p
                                                className="hidden text-xs text-red-600 mt-2"
                                                id="confirm-password-error"
                                            >
                                                Password does not match the password
                                            </p>
                                        </div>
                                        {/* End Form Group */}

                                        <div className="mt-1">
                                            <label
                                                htmlFor="hs-feedback-post-comment-textarea-1"
                                                className="block mb-2 text-sm font-medium dark:text-white"
                                            >
                                                Upload profile image
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="file"
                                                    id="hs-feedback-post-comment-textarea-1"
                                                    name="hs-feedback-post-comment-textarea-1"
                                                    onChange={(e) => setImage(e.target.files[0])}

                                                    className="py-3 px-4 block w-full border rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                                                />

                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                                        >
                                            Sign up
                                        </button>
                                    </div>
                                </form>
                                {/* End Form */}
                            </div>
                        </div>
                    </div>
                </main>
            )}

        </>

  );
}

export default SignupPage;
