import axios from "axios"

const API = import.meta.env.VITE_API_URL as string

export const api = axios.create({
  baseURL: API
})
