// src/services/socketService.js
import { io } from 'socket.io-client';
import authService from './auth';

class SocketService {
  constructor() {
    this.socket = null;
    this.listeners = new Map();
    this.isConnected = false;
  }
  
  connect() {
    if (this.isConnected) return;
    
    const apiKey = authService.getApiKey();
    if (!apiKey) return;
    
    // Connect to backend WebSocket
    this.socket = io('http://localhost:5000', {
      transports: ['websocket', 'polling']
    });
    
    // Connection events
    this.socket.on('connect', () => {
      console.log('✅ Connected to DataPulse server');
      this.isConnected = true;
      
      // Join the room for this API key
      this.socket.emit('join', apiKey);
    });
    
    this.socket.on('newSubmission', (submission) => {
      console.log('📨 New submission received:', submission);
      
      // Notify all listeners
      this.notifyListeners('newSubmission', submission);
    });
    
    this.socket.on('disconnect', () => {
      console.log('❌ Disconnected from server');
      this.isConnected = false;
    });
    
    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });
  }
  
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }
  
  // Add event listener
  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
    
    // Return unsubscribe function
    return () => {
      const callbacks = this.listeners.get(event) || [];
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    };
  }
  
  // Notify all listeners of an event
  notifyListeners(event, data) {
    const callbacks = this.listeners.get(event) || [];
    callbacks.forEach(callback => callback(data));
  }
}

export default new SocketService();