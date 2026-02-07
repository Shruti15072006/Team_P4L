// src/config/api.js
export const API_CONFIG = {
  BASE_URL: "http://localhost:5000",
  
  // Authentication
  REGISTER: "/api/auth/register",
  LOGIN: "/api/auth/login",
  GET_KEY: "/api/user/keys",
  
  // Dashboard Data
  SUBMISSIONS: "/api/submissions",
  STATS: "/api/submissions/stats",
  RECENT: "/api/subscriptions",
  
  // Form Collection
  COLLECT: "/api/collect",
  
  // Demo & Health
  DEMO: "/demo",
  HEALTH: "/health"
};