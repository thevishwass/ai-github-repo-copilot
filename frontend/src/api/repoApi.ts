import { api } from "./axios"

export const analyzeRepo = async (repoUrl: string) => {
  const res = await api.post("/api/repo/analyze", {
    repoUrl
  })

  return res.data
}