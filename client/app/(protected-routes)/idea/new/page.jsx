import NewIdeaForm from "./NewIdeaForm";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function NewIdeaPage(props) {
  const session = await getServerSession(authOptions);
  return (
    <div className="new-idea-page">
      <NewIdeaForm token={session.token} user_id={session.user_id} />
    </div>
  );
}
