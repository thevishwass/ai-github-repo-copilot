export const wakeServer = async () => {
  try {
    await fetch(import.meta.env.VITE_API_URL + "/health")
  } catch (err) {
    console.log("Server wake attempt failed")
  }
}