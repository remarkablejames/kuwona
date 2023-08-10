import EditIdeaCard  from "@/app/(protected-routes)/idea/edit/[id]/components/EditIdeaCard";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function fetchIOneIdea(id) {
    const res = await fetch(`http://127.0.0.1:8002/api/ideas/${id}}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-cache",
    });
    const ideas = await res.json();
    return ideas;
}
async function editPage({params}){
    const session = await getServerSession(authOptions);
    // console.log(params);
    const idea = await fetchIOneIdea(params.id);
    return (
        <div>
            <EditIdeaCard idea={idea} token={session.token} user_id={session.user_id} />
        </div>
    );
}

export default editPage;