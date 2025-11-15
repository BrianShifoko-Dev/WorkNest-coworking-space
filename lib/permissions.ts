// Role-based permissions for WorkNest Admin Panel

export type UserRole = 'manager' | 'reception' | 'staff' | 'accountant' | 'customer'

export interface Permission {
  view: boolean
  create: boolean
  edit: boolean
  delete: boolean
}

// Define what each role can access
export const rolePermissions: Record<UserRole, {
  dashboard: Permission
  bookings: Permission
  spaces: Permission
  events: Permission
  menu: Permission
  gallery: Permission
  customers: Permission
  payments: Permission
  emails: Permission
  reports: Permission
  users: Permission
  settings: Permission
}> = {
  manager: {
    dashboard: { view: true, create: true, edit: true, delete: true },
    bookings: { view: true, create: true, edit: true, delete: true },
    spaces: { view: true, create: true, edit: true, delete: true },
    events: { view: true, create: true, edit: true, delete: true },
    menu: { view: true, create: true, edit: true, delete: true },
    gallery: { view: true, create: true, edit: true, delete: true },
    customers: { view: true, create: true, edit: true, delete: true },
    payments: { view: true, create: true, edit: true, delete: true },
    emails: { view: true, create: false, edit: false, delete: false },
    reports: { view: true, create: true, edit: true, delete: true },
    users: { view: true, create: true, edit: true, delete: true },
    settings: { view: true, create: true, edit: true, delete: true },
  },
  
  accountant: {
    dashboard: { view: true, create: false, edit: false, delete: false },
    bookings: { view: true, create: false, edit: false, delete: false },
    spaces: { view: true, create: false, edit: false, delete: false },
    events: { view: false, create: false, edit: false, delete: false },
    menu: { view: false, create: false, edit: false, delete: false },
    gallery: { view: false, create: false, edit: false, delete: false },
    customers: { view: true, create: false, edit: false, delete: false },
    payments: { view: true, create: false, edit: true, delete: false }, // Can edit payment status
    emails: { view: true, create: false, edit: false, delete: false },
    reports: { view: true, create: true, edit: false, delete: false }, // Can generate reports
    users: { view: false, create: false, edit: false, delete: false },
    settings: { view: false, create: false, edit: false, delete: false },
  },
  
  reception: {
    dashboard: { view: true, create: false, edit: false, delete: false },
    bookings: { view: true, create: true, edit: true, delete: false },
    spaces: { view: true, create: false, edit: false, delete: false },
    events: { view: true, create: false, edit: false, delete: false },
    menu: { view: true, create: false, edit: false, delete: false },
    gallery: { view: true, create: false, edit: false, delete: false },
    customers: { view: true, create: true, edit: true, delete: false },
    payments: { view: true, create: false, edit: false, delete: false },
    emails: { view: true, create: false, edit: false, delete: false },
    reports: { view: true, create: false, edit: false, delete: false },
    users: { view: false, create: false, edit: false, delete: false },
    settings: { view: false, create: false, edit: false, delete: false },
  },
  
  staff: {
    dashboard: { view: true, create: false, edit: false, delete: false },
    bookings: { view: true, create: false, edit: false, delete: false },
    spaces: { view: true, create: false, edit: false, delete: false },
    events: { view: true, create: false, edit: false, delete: false },
    menu: { view: true, create: false, edit: false, delete: false },
    gallery: { view: true, create: false, edit: false, delete: false },
    customers: { view: true, create: false, edit: false, delete: false },
    payments: { view: false, create: false, edit: false, delete: false },
    emails: { view: false, create: false, edit: false, delete: false },
    reports: { view: false, create: false, edit: false, delete: false },
    users: { view: false, create: false, edit: false, delete: false },
    settings: { view: false, create: false, edit: false, delete: false },
  },
  
  customer: {
    dashboard: { view: false, create: false, edit: false, delete: false },
    bookings: { view: false, create: false, edit: false, delete: false },
    spaces: { view: false, create: false, edit: false, delete: false },
    events: { view: false, create: false, edit: false, delete: false },
    menu: { view: false, create: false, edit: false, delete: false },
    gallery: { view: false, create: false, edit: false, delete: false },
    customers: { view: false, create: false, edit: false, delete: false },
    payments: { view: false, create: false, edit: false, delete: false },
    emails: { view: false, create: false, edit: false, delete: false },
    reports: { view: false, create: false, edit: false, delete: false },
    users: { view: false, create: false, edit: false, delete: false },
    settings: { view: false, create: false, edit: false, delete: false },
  },
}

// Helper function to check if user has permission
export function hasPermission(
  role: UserRole,
  module: keyof typeof rolePermissions.manager,
  action: keyof Permission
): boolean {
  return rolePermissions[role]?.[module]?.[action] ?? false
}

// Helper function to get accessible modules for a role
export function getAccessibleModules(role: UserRole): string[] {
  const permissions = rolePermissions[role]
  return Object.entries(permissions)
    .filter(([_, permission]) => permission.view)
    .map(([module]) => module)
}

// Get role display name
export function getRoleDisplayName(role: UserRole): string {
  const roleNames: Record<UserRole, string> = {
    manager: 'Manager',
    accountant: 'Accountant',
    reception: 'Reception',
    staff: 'Staff',
    customer: 'Customer',
  }
  return roleNames[role] || role
}

// Get role color for badges
export function getRoleColor(role: UserRole): string {
  const roleColors: Record<UserRole, string> = {
    manager: 'bg-[#D4AF37] text-white',
    accountant: 'bg-green-600 text-white',
    reception: 'bg-blue-600 text-white',
    staff: 'bg-purple-600 text-white',
    customer: 'bg-gray-600 text-white',
  }
  return roleColors[role] || 'bg-gray-600 text-white'
}

// Financial modules that accountant can access
export const financialModules = [
  'dashboard',
  'bookings',
  'spaces',
  'customers',
  'payments',
  'emails',
  'reports',
] as const

// Check if module is financial
export function isFinancialModule(module: string): boolean {
  return financialModules.includes(module as any)
}

