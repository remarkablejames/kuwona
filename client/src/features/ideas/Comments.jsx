
import DetailedIdeaCard from "./DetailedIdeaCard.jsx";
import {useEffect} from "react";

function Comments(){
    useEffect(()=>{
        // scroll to top
        window.scrollTo(0,0);
    },[])

    return (
        <>
            <main className=" overflow-y-scroll  ">
                {/* Your content */}
                <DetailedIdeaCard />

                <div className=" p-4">
                    {/*    This element is hidden*/}
                </div>

            </main>
        </>
    )
}
export default Comments