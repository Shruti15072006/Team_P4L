// src/services/auth.js
import { API_CONFIG } from '../config/api';

class AuthService {
  // Register user and get tracking key
  async register(email) {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.REGISTER}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    
    const data = await response.json();
    
    if (data.success) {
      localStorage.setItem('dp_email', email);
      localStorage.setItem('dp_apiKey', data.dataPulseKey);
    }
    
    return data;
  }
  
  // Login user
  async login(email) {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.LOGIN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    
    const data = await response.json();
    
    if (data.success) {
      localStorage.setItem('dp_email', email);
      localStorage.setItem('dp_apiKey', data.dataPulseKey);
    }
    
    return data;
  }
  
  // Get current user's API key
  getApiKey() {
    return localStorage.getItem('dp_apiKey');
  }
  
  // Get current user's email
  getEmail() {
    return localStorage.getItem('dp_email');
  }
  
  // Logout
  logout() {
    localStorage.removeItem('dp_email');
    localStorage.removeItem('dp_apiKey');
  }
}

export default new AuthService();