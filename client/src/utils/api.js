import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://ai-interview-agent-k0lf.onrender.com/api",
  withCredentials: true,
});

export default api;
