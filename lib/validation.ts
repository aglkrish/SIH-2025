// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Password validation
export const isValidPassword = (password: string): { isValid: boolean; message?: string } => {
  if (password.length < 6) {
    return { isValid: false, message: 'Password must be at least 6 characters long' }
  }
  if (password.length > 128) {
    return { isValid: false, message: 'Password must be less than 128 characters' }
  }
  return { isValid: true }
}

// Name validation
export const isValidName = (name: string): { isValid: boolean; message?: string } => {
  if (name.length < 2) {
    return { isValid: false, message: 'Name must be at least 2 characters long' }
  }
  if (name.length > 50) {
    return { isValid: false, message: 'Name must be less than 50 characters' }
  }
  if (!/^[a-zA-Z\s]+$/.test(name)) {
    return { isValid: false, message: 'Name can only contain letters and spaces' }
  }
  return { isValid: true }
}

// Phone validation
export const isValidPhone = (phone: string): { isValid: boolean; message?: string } => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
  if (!phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))) {
    return { isValid: false, message: 'Please enter a valid phone number' }
  }
  return { isValid: true }
}

// Form validation helper
export const validateForm = (data: Record<string, any>, rules: Record<string, (value: any) => { isValid: boolean; message?: string }>) => {
  const errors: Record<string, string> = {}
  
  for (const [field, value] of Object.entries(data)) {
    if (rules[field]) {
      const validation = rules[field](value)
      if (!validation.isValid) {
        errors[field] = validation.message || 'Invalid value'
      }
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

// Common validation rules
export const validationRules = {
  email: (value: string) => {
    if (!value) return { isValid: false, message: 'Email is required' }
    if (!isValidEmail(value)) return { isValid: false, message: 'Please enter a valid email address' }
    return { isValid: true }
  },
  password: (value: string) => {
    if (!value) return { isValid: false, message: 'Password is required' }
    return isValidPassword(value)
  },
  displayName: (value: string) => {
    if (!value) return { isValid: false, message: 'Name is required' }
    return isValidName(value)
  },
  role: (value: string) => {
    if (!value) return { isValid: false, message: 'Role is required' }
    if (!['patient', 'practitioner'].includes(value)) {
      return { isValid: false, message: 'Please select a valid role' }
    }
    return { isValid: true }
  }
}
