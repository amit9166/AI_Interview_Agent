import axios from "axios";
import { getStoredToken } from "./authStorage";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://ai-interview-agent-k0lf.onrender.com/api",
  withCredentials: true,
});

api.interceptors.request.use((config)=>{
  const token = getStoredToken();
  if(token){
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
