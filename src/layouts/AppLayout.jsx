import { useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { LogOut, Menu, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { NAV, ROLES } from '../config/roles.js'

export default function AppLayout() {
  const { user, logout } = useAuth()
  const nav = useNavigate()
  const [open, setOpen] = useState(false)
  const role = ROLES[user.role]
  const RoleIcon = role.icon
  return (
    <div className="shell">
      <aside className={`side ${open ? 'open' : ''}`} aria-label="Sidebar">
        <Link to="/" className="brand light"><span className="brand-mark">+</span> CareConnect</Link>
        <div className="role-badge"><RoleIcon size={18} /> {role.label}</div>
        <nav>
          {role.menu.map((key) => {
            const Icon = NAV[key].icon
            return <NavLink key={key} to={`/app/${key}`} onClick={() => setOpen(false)}><Icon size={18} /> {NAV[key].label}</NavLink>
          })}
        </nav>
        <button className="side-out" onClick={() => { logout(); nav('/') }}><LogOut size={18} /> Log out</button>
      </aside>
      {open && <div className="scrim" onClick={() => setOpen(false)} />}
      <div className="shell-main">
        <header className="topbar glass">
          <button className="icon-btn" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X size={20} /> : <Menu size={20} />}</button>
          <div className="who"><b>{user.name}</b><small>{role.label}{user.district ? ` · ${user.district}` : ''}</small></div>
          <Link to="/" className="mini">Website</Link>
        </header>
        <Outlet />
      </div>
    </div>
  )
}
