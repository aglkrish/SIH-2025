// User types
export interface User {
  id: string
  email: string
  role: 'patient' | 'practitioner'
  displayName: string
  token?: string
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  message?: string
  data?: T
}

export interface AuthResponse {
  success: boolean
  message: string
  user: User
}

// Appointment types
export interface Appointment {
  id: string
  patient: string
  patientEmail: string
  patientPhone: string
  treatment: string
  date: string
  time: string
  duration: string
  status: 'confirmed' | 'pending' | 'cancelled' | 'in-progress' | 'completed'
  location: string
  notes?: string
  price: string
  paymentStatus: 'paid' | 'pending' | 'failed'
  avatar?: string
}

// Patient types
export interface Patient {
  id: string
  name: string
  email: string
  phone: string
  lastVisit: string
  condition: string
  progress: number
  nextAppointment: string
  avatar?: string
}

// Analytics types
export interface Analytics {
  totalPatients: number
  totalAppointments: number
  revenue: number
  successRate: number
  monthlyGrowth: number
}

// Session types
export interface Session {
  id: string
  type: string
  practitioner: string
  date: string
  time: string
  duration: string
  status: string
  location: string
  rating?: number
  notes?: string
}

// Wellness metrics types
export interface WellnessMetric {
  name: string
  value: number
  icon: string
  color: string
}

// Error types
export interface AppError {
  message: string
  code?: string
  status?: number
}

// Form types
export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm {
  email: string
  password: string
  displayName: string
  role: 'patient' | 'practitioner'
}

// Navigation types
export interface NavItem {
  name: string
  href: string
  icon: any
}

// Component props types
export interface LayoutProps {
  children: React.ReactNode
}

export interface AuthGuardProps {
  children: React.ReactNode
  redirectTo?: string
  requiredRole?: 'patient' | 'practitioner'
}

// API Service types
export interface ApiService {
  login(email: string, password: string): Promise<AuthResponse>
  register(email: string, password: string, displayName: string, role: 'patient' | 'practitioner'): Promise<AuthResponse>
  getAppointments(): Promise<ApiResponse<Appointment[]>>
  updateAppointment(id: string, status: string): Promise<ApiResponse>
  getPatients(): Promise<ApiResponse<Patient[]>>
  getAnalytics(): Promise<ApiResponse<Analytics>>
  healthCheck(): Promise<ApiResponse>
}
