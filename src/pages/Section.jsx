import { Navigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { ROLES } from '../config/roles.js'
import Dashboard from './Dashboard.jsx'
import RoleOverview from './RoleOverview.jsx'
import AIResults from './AIResults.jsx'
import Reports from './Reports.jsx'
import Analytics from './Analytics.jsx'
import Manage from './Manage.jsx'

// Resolves /app/:section, enforcing the role's menu (permission) list.
export default function Section() {
  const { section } = useParams()
  const { user } = useAuth()
  if (!ROLES[user.role].menu.includes(section)) return <Navigate to="/app/overview" replace />
  if (section === 'overview') return user.role === 'patient' ? <Dashboard /> : <RoleOverview />
  if (section === 'ai') return <AIResults />
  if (section === 'reports') return <Reports />
  if (section === 'analytics') return <Analytics />
  return <Manage key={section} section={section} />
}
