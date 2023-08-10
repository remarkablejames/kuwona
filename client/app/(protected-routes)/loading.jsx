function LoadingPage() {
    return(
        <div className="min-h-[90vh] h-full bg-slate-100  w-full flex   items-center justify-center">
            <div className="flex items-center justify-center ">
                {/*<!-- Outer Ring-->*/}


                {/*<!-- Inner Ring -->*/}
                <div className="w-24 h-24 rounded-full animate-spin
                            border border-solid border-yellow-900 border-t-transparent shadow-md"></div>
            </div>
        </div>
    )
}

export default LoadingPage;