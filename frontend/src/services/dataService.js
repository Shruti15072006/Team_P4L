// src/services/dataService.js
import { API_CONFIG } from '../config/api';
import authService from './auth';

class DataService {
  constructor() {
    this.apiKey = authService.getApiKey();
  }
  
  // Fetch all submissions
  async getSubmissions() {
    if (!this.apiKey) return [];
    
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.SUBMISSIONS}?apiKey=${this.apiKey}`
    );
    
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  }
  
  // Fetch dashboard stats
  async getStats() {
    if (!this.apiKey) {
      return {
        total: 0,
        today: 0,
        contactForms: 0,
        responseRate: 0
      };
    }
    
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.STATS}?apiKey=${this.apiKey}`
    );
    
    return await response.json();
  }
  
  // Fetch recent submissions
  async getRecentSubmissions() {
    if (!this.apiKey) return [];
    
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.RECENT}?apiKey=${this.apiKey}`
    );
    
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  }
}

export default new DataService();