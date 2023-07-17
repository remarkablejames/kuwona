function Login(){
    return(
        <section className="flex items-center justify-center h-screen w-screen">
            <div className="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-20 max-w-7xl">
                <div className="w-full max-w-md mx-auto md:max-w-sm md:px-0 md:w-96 sm:px-4">
                    <div className="flex flex-col">
                        <div>
                            <h2 className="text-4xl text-black text-center">Login to continue</h2>
                        </div>
                    </div>
                    <form>
                        <input autoComplete="false" name="hidden" style={{ display: "none" }} />
                        <input
                            name="_redirect"
                            type="hidden"
                            defaultValue="https://jamstacker.studio/thankyou"
                        />
                        <div className="mt-4 space-y-6">
                            <div className="col-span-full">
                                <label
                                    className="block mb-3 text-sm font-medium text-gray-600"
                                    name="email"
                                >
                                    Email
                                </label>
                                <input
                                    className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                                    placeholder="Your email address"
                                    autoComplete="off"
                                    type="email"
                                />
                            </div>
                            <div className="col-span-full">
                                <label
                                    className="block mb-3 text-sm font-medium text-gray-600"
                                    name="password"
                                >
                                    Password
                                </label>
                                <input
                                    className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                                    placeholder="******"
                                    autoComplete="on"
                                    type="password"
                                />
                            </div>
                            <div className="col-span-full">
                                <button
                                    className="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
                                    type="submit"
                                >
                                    Login
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>

    )
}

export default Login