import { useState } from "react"
import RepoInput from "../components/RepoInput"
import RepoStats from "../components/RepoStats"
import ChatBox from "../components/ChatBox"
import Navbar from "../components/Navbar"
import { useAuth } from "../context/AuthContext"

export default function GitHubCopilot() {

    const {user} = useAuth()

  const [repoData, setRepoData] = useState<any>(null)
  const [repoUrl, setRepoUrl] = useState<string>("")

  const repoSlug = repoUrl
    ? repoUrl.replace("https://github.com/", "").replace(/\/$/, "")
    : ""

    

  return (

    <>

    < Navbar />
    <div className="dark min-h-screen bg-gray-950 text-gray-200 flex flex-col md:flex-row">

      {/* Sidebar */}
<div className="w-full md:w-[280px]  border-b md:border-b-0 md:border-r border-gray-800 p-6">

  {/* <h2 className="text-2xl font-semibold mb-5 mt-4 text-center">
    GitHub Copilot
  </h2> */}

  <div className="text-xs text-gray-300  mb-3 mt-4 uppercase tracking-wider text-center">
    Active Repository
  </div>

  <div className="bg-black border text-white text-center border-gray-800 rounded-lg px-3 py-2 text-sm sm:text-[13px] mb-6">
    {repoSlug || "None"}
  </div>

  <RepoStats data={repoData} />

</div>

      {/* Main workspace */}
      <div className="flex-1 flex flex-col items-center px-4 sm:px-6 md:px-8 py-8 md:py-12">

        {/* Header */}
        <div className="text-center mb-10">

          <h1 className="text-2xl sm:text-3xl font-semibold">
  Hey{" "}
  <span className="font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
    {user?.name}
  </span>
   ! Got a repo for me?
</h1>

          {/* <p className="text-sm sm:text-[15px] text-gray-400 mt-2">
            Analyze repositories and ask questions about the codebase.
          </p> */}

        </div>
        
        {/* Repo Input */}
        <RepoInput
          setResult={setRepoData}
          setRepoUrl={setRepoUrl}
        />

        {/* Chat */}
        {repoData && (
          <div className="w-full max-w-[850px] mt-10">
            <ChatBox repoUrl={repoUrl} />
          </div>
        )}

      </div>

    </div>
          </>
  )
}