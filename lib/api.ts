const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  private getAuthHeaders(): HeadersInit {
    const token = typeof window !== 'undefined' ? localStorage.getItem('ayursutra_token') : null;
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        ...this.getAuthHeaders(),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        if (response.status === 401) {
          // Token expired or invalid, clear local storage
          if (typeof window !== 'undefined') {
            localStorage.removeItem('ayursutra_user');
            localStorage.removeItem('ayursutra_token');
            window.location.href = '/auth/login';
          }
        }
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(email: string, password: string, displayName: string, role: 'patient' | 'practitioner') {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, displayName, role }),
    });
  }

  // Appointments endpoints
  async getAppointments() {
    return this.request('/appointments');
  }

  async createAppointment(appointmentData: any) {
    return this.request('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointmentData),
    });
  }

  async updateAppointment(id: string, status: string) {
    return this.request(`/appointments/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  async cancelAppointment(id: string) {
    return this.request(`/appointments/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status: 'cancelled' }),
    });
  }

  // Patients endpoints
  async getPatients() {
    return this.request('/patients');
  }

  // Analytics endpoints
  async getAnalytics() {
    return this.request('/analytics');
  }

  // Notifications endpoints
  async getNotifications() {
    return this.request('/notifications');
  }

  async markNotificationAsRead(id: string) {
    return this.request(`/notifications/${id}/read`, {
      method: 'PUT',
    });
  }

  async markAllNotificationsAsRead() {
    return this.request('/notifications/read-all', {
      method: 'PUT',
    });
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

export const apiService = new ApiService();
export const api = apiService;
export default apiService;

