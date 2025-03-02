"use client"

import { trpc } from "@/utils/trpc"
import { getUser } from "./actions/user/getUser"

export default function Home() {
  const handleGetUser = async () => {
    const user = await getUser()
    console.log(user, "user from server action")
  }

  const handleFetchUserEndpoint = async () => {
    const user = await fetch("http://localhost:3000/api/user")
    console.log(user, "user from fetch endpoint")
  }

  const { data, isLoading, error } = trpc.user.getUser.useQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <main className="p-4 space-y-4">
      <div className="space-x-4">
        <button 
          onClick={handleGetUser}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Get user (Server Action)
        </button>
        <button 
          onClick={handleFetchUserEndpoint}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Get user (API Route)
        </button>
      </div>

      <div>
        <p>User from tRPC: {data?.name}</p>
      </div>
    </main>
  );
}
