// Strong password validation utility

export interface PasswordValidation {
  isValid: boolean
  errors: string[]
  strength: 'weak' | 'medium' | 'strong' | 'very-strong'
  score: number
}

export function validatePassword(password: string): PasswordValidation {
  const errors: string[] = []
  let score = 0

  // Minimum length requirement
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long')
  } else {
    score += 1
    if (password.length >= 12) score += 1
    if (password.length >= 16) score += 1
  }

  // Uppercase letter requirement
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter (A-Z)')
  } else {
    score += 1
  }

  // Lowercase letter requirement
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter (a-z)')
  } else {
    score += 1
  }

  // Number requirement
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number (0-9)')
  } else {
    score += 1
  }

  // Special character requirement
  if (!/[!@#$%^&*(),.?":{}|<>_\-+=\[\]\\\/~`]/.test(password)) {
    errors.push('Password must contain at least one special character (!@#$%^&*(),.?":{}|<>_-+=[]\\\/~`)')
  } else {
    score += 1
  }

  // No common patterns
  const commonPatterns = [
    'password', '12345', 'qwerty', 'abc123', 'admin', 'letmein',
    '123456', 'password123', 'admin123', 'welcome', 'monkey'
  ]
  
  if (commonPatterns.some(pattern => password.toLowerCase().includes(pattern))) {
    errors.push('Password contains common words or patterns')
    score = Math.max(0, score - 2)
  }

  // No sequential characters
  if (/(?:abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|012|123|234|345|456|567|678|789)/i.test(password)) {
    errors.push('Avoid sequential characters (abc, 123, etc.)')
    score = Math.max(0, score - 1)
  }

  // Determine strength
  let strength: 'weak' | 'medium' | 'strong' | 'very-strong' = 'weak'
  if (score >= 7) strength = 'very-strong'
  else if (score >= 5) strength = 'strong'
  else if (score >= 3) strength = 'medium'

  return {
    isValid: errors.length === 0,
    errors,
    strength,
    score
  }
}

export function getPasswordStrengthColor(strength: PasswordValidation['strength']): string {
  switch (strength) {
    case 'very-strong':
      return 'text-green-600'
    case 'strong':
      return 'text-blue-600'
    case 'medium':
      return 'text-yellow-600'
    case 'weak':
      return 'text-red-600'
  }
}

export function getPasswordStrengthBgColor(strength: PasswordValidation['strength']): string {
  switch (strength) {
    case 'very-strong':
      return 'bg-green-500'
    case 'strong':
      return 'bg-blue-500'
    case 'medium':
      return 'bg-yellow-500'
    case 'weak':
      return 'bg-red-500'
  }
}

export function getPasswordStrengthLabel(strength: PasswordValidation['strength']): string {
  switch (strength) {
    case 'very-strong':
      return 'Very Strong'
    case 'strong':
      return 'Strong'
    case 'medium':
      return 'Medium'
    case 'weak':
      return 'Weak'
  }
}

// Generate a strong password suggestion
export function generateStrongPassword(length: number = 16): string {
  const uppercase = 'ABCDEFGHJKLMNPQRSTUVWXYZ' // Removed I, O
  const lowercase = 'abcdefghijkmnopqrstuvwxyz' // Removed l
  const numbers = '23456789' // Removed 0, 1
  const special = '!@#$%^&*()_-+=[]{}|;:,.<>?'
  
  const all = uppercase + lowercase + numbers + special
  
  let password = ''
  
  // Ensure at least one of each type
  password += uppercase[Math.floor(Math.random() * uppercase.length)]
  password += lowercase[Math.floor(Math.random() * lowercase.length)]
  password += numbers[Math.floor(Math.random() * numbers.length)]
  password += special[Math.floor(Math.random() * special.length)]
  
  // Fill the rest randomly
  for (let i = password.length; i < length; i++) {
    password += all[Math.floor(Math.random() * all.length)]
  }
  
  // Shuffle the password
  return password.split('').sort(() => Math.random() - 0.5).join('')
}

