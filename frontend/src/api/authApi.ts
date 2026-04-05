import { api } from "./axios"

export const loginUser = async (email: string, password: string) => {
  const res = await api.post("/api/auth/login", {
    email,
    password
  })

  console.log("API URL:", import.meta.env.VITE_API_URL)

  return res.data
}

export const signupUser = async (name: string, email: string, password: string) => {
  const res = await api.post("/api/auth/signup", {
    name,
    email,
    password
  })

  return res.data
}

