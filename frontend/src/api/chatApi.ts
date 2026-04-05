import { api } from "./axios"

export const askAI = async (question: string, repoUrl: string) => {
  const res = await api.post("/api/chat", {
    question,
    repoUrl
    
  })

  console.log("API URL:", import.meta.env.VITE_API_URL)

  return res.data
}