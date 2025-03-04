import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:3000", // Adjust the URL if needed
})

export default api
