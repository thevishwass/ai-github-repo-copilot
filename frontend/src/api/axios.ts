import axios from "axios"

const API = import.meta.env.VITE_API_URL as string || "https://ai-github-repo-copilot.onrender.com"

console.log("API URL:", import.meta.env.VITE_API_URL)

export const api = axios.create({
  baseURL: API
})