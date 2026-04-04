import axios from "axios"

const API = "http://localhost:5000"

export const askAI = async (question: string, repoUrl: string) => {

  const res = await axios.post(`${API}/api/chat`, {
    question,
    repoUrl
  })

  return res.data
}