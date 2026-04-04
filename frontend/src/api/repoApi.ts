import axios from "axios"

const API = "http://localhost:5000"

export const analyzeRepo = async (repoUrl: string) => {
  const res = await axios.post(`${API}/api/repo/analyze`, {
    repoUrl
  })

  return res.data
}