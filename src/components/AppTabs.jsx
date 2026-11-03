import { NavLink, useLocation } from 'react-router-dom'

const tabs = [
  ['/app/overview', '🏠 Dashboard'], ['/app/ai', '🧠 AI Results'],
  ['/app/reports', '📄 Reports'], ['/app/analytics', '📊 Analytics'],
]

export default function AppTabs() {
  if (useLocation().pathname.startsWith('/app')) return null // sidebar replaces tabs
  return (
    <nav className="app-tabs glass" aria-label="Workspace">
      {tabs.map(([to, label]) => <NavLink key={to} to={to}>{label}</NavLink>)}
    </nav>
  )
}
