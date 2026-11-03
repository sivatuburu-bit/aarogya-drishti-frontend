import { HeartPulse, Users, CalendarDays, Share2, FileText, BarChart3, Brain, Home, UserCog, Stethoscope, ShieldCheck, Building2, Activity } from 'lucide-react'

export const DISTRICTS = ['Hyderabad', 'Rangareddy', 'Warangal', 'Karimnagar', 'Nizamabad', 'Khammam', 'Nalgonda', 'Medak']
export const CONDITIONS = ['Diabetes', 'Hypertension', 'Asthma', 'Heart disease', 'Thyroid', 'Allergies', 'None']
export const DEMO_PASSWORD = 'Demo@123'

export const NAV = {
  overview: { label: 'Overview', icon: Home },
  patients: { label: 'Patients', icon: Users },
  appointments: { label: 'Appointments', icon: CalendarDays },
  referrals: { label: 'Referrals', icon: Share2 },
  reports: { label: 'Reports', icon: FileText },
  analytics: { label: 'Analytics', icon: BarChart3 },
  ai: { label: 'AI Results', icon: Brain },
  management: { label: 'Management', icon: UserCog },
}

// menu = sidebar sections the role may open; can = fine-grained permissions per section.
export const ROLES = {
  patient: { label: 'Patient', icon: HeartPulse, blurb: 'Book visits, track medicines and view your reports.', demo: 'patient@careconnect.app', menu: ['overview', 'appointments', 'reports', 'ai'], can: { appointments: ['cancel'] } },
  health_worker: { label: 'Health Worker', icon: Activity, blurb: 'Register patients in the field and raise referrals.', demo: 'worker@careconnect.app', menu: ['overview', 'patients', 'referrals', 'appointments'], can: { patients: ['create'], referrals: ['create'] } },
  medical_officer: { label: 'Medical Officer', icon: Stethoscope, blurb: 'Review cases, manage appointments and refer to specialists.', demo: 'officer@careconnect.app', menu: ['overview', 'patients', 'appointments', 'referrals', 'reports', 'ai'], can: { patients: ['create'], appointments: ['update'], referrals: ['create', 'update'] } },
  specialist: { label: 'Specialist', icon: ShieldCheck, blurb: 'Accept referrals and give expert opinions.', demo: 'specialist@careconnect.app', menu: ['overview', 'patients', 'referrals', 'appointments', 'reports', 'ai'], can: { referrals: ['update'], appointments: ['update'] } },
  district_admin: { label: 'District Admin', icon: Building2, blurb: 'Monitor your district and manage its staff.', demo: 'district@careconnect.app', menu: ['overview', 'patients', 'appointments', 'referrals', 'analytics', 'management'], can: { management: ['update'] }, scoped: true },
  super_admin: { label: 'Super Admin', icon: UserCog, blurb: 'Full visibility and control across all districts.', demo: 'admin@careconnect.app', menu: ['overview', 'patients', 'appointments', 'referrals', 'reports', 'analytics', 'management'], can: { patients: ['create'], management: ['update'] } },
}

export const can = (role, section, action) => !!ROLES[role]?.can?.[section]?.includes(action)

export const DEMO_USERS = [
  { id: 'u1', name: 'Priya Sharma', role: 'patient', district: 'Hyderabad' },
  { id: 'u2', name: 'Ravi Kumar', role: 'health_worker', district: 'Warangal' },
  { id: 'u3', name: 'Dr. Meera Nair', role: 'medical_officer', district: 'Hyderabad' },
  { id: 'u4', name: 'Dr. Ananya Rao', role: 'specialist', district: 'Hyderabad' },
  { id: 'u5', name: 'Suresh Reddy', role: 'district_admin', district: 'Hyderabad' },
  { id: 'u6', name: 'Aisha Khan', role: 'super_admin', district: '' },
].map((u) => ({ ...u, email: ROLES[u.role].demo, password: DEMO_PASSWORD }))
