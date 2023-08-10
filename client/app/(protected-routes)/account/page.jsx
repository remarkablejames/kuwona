import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/dist/server/api-utils";
import axios from "axios";
import {getTimeAgo, sortArrayByDate} from "@/app/utils";
import Link from "next/link";

async function  fetchAllUserIdeas({token, user_id}){
  const res = await fetch(`http://127.0.0.1:8002/api/userideas/${user_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    cache: "no-cache",
  });
  // console.log("res:=============>");
  const ideas = await res.json();
  // console.log(ideas);
    return ideas;
}
export default async function accountPage() {
  const session = await getServerSession(authOptions);
  console.log("SESSION", session);
  if (!session) {
    return redirect('/auth/login');
  }

    const userIdeas = sortArrayByDate(await fetchAllUserIdeas({token: session.token, user_id: session.user_id}));

  return (
    <>
      <div className="h-full">
        <div className="bg-white rounded-lg shadow-xl pb-8">
          <div className="absolute right-12 mt-4 rounded"></div>
          <div className="w-full h-[250px]">
            <img
              src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg"
              className="w-full h-full rounded-tl-lg rounded-tr-lg"
            />
          </div>
          <div className="flex flex-col items-center -mt-20">
            <img
              src={session.user.image}
              className="w-40 h-40 border-4 border-white rounded-full"
            />
            <div className="flex items-center space-x-2 mt-2">
              <p className="text-2xl">{session.user.name}</p>
              <span className="bg-blue-500 rounded-full p-1" title="Verified">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-gray-100 h-2.5 w-2.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={4}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </span>
            </div>
            <p className="text-gray-700">
              Senior Software Engineer at Tailwind CSS
            </p>
            <p className="text-sm text-gray-500">New York, USA</p>
          </div>
          <div className="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">

          </div>
        </div>
        <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
          <div className="w-full flex flex-col 2xl:w-1/3">
            <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
              <h4 className="text-xl text-gray-900 font-bold">Personal Info</h4>
              <ul className="mt-2 text-gray-700">
                <li className="flex border-y py-2">
                  <span className="font-bold w-24">Full name:</span>
                  <span className="text-gray-700">
                    {session.user.name}
                  </span>
                </li>
                <li className="flex border-b py-2">
                  <span className="font-bold w-24">Birthday:</span>
                  <span className="text-gray-700">24 Jul, 1991</span>
                </li>
                <li className="flex border-b py-2">
                  <span className="font-bold w-24">Joined:</span>
                  <span className="text-gray-700">
                    {new Date(session.created_at).toLocaleDateString()}
                  </span>
                </li>

                <li className="flex border-b py-2">
                  <span className="font-bold w-24">Email:</span>
                  <span className="text-gray-700">{session.user.email}</span>
                </li>



              </ul>
            </div>
            <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
              <h4 className="text-xl text-gray-900 font-bold">Activity log ( Posted ideas )</h4>
              <div className="relative px-4">
                <div className="absolute h-full border border-dashed border-opacity-20 border-secondary" />
                {/* start::Timeline item */}

                {userIdeas.length > 0 ? (
                    userIdeas.map((idea) => (
                        <div className="flex items-center w-full my-6 -ml-1.5">
                            <div className="w-1/12 z-10">
                                <div className="w-3.5 h-3.5 bg-blue-600 rounded-full" />
                            </div>
                            <div className="w-11/12">
                                <Link href={`/idea/${idea.id}`} className="text-sm text-blue-600">{idea.title}</Link>
                                <p className="text-xs text-gray-500">
                                  {getTimeAgo(idea.created_at)}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex items-center w-full my-6 -ml-1.5">

                      <div className="bg-orange-500 text-sm text-white rounded-md p-4" role="alert">
                        <span className="font-bold">You have not posted any ideas yet.</span>
                      </div>
                    </div>
                )

                }

              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
