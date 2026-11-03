import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Navbar() {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const nav = useNavigate()

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">+</span> CareConnect
        </Link>

        <nav className={`nav-links ${open ? 'open' : ''}`}>
          <Link to="/#services" onClick={() => setOpen(false)}>Services</Link>
          <Link to="/#how" onClick={() => setOpen(false)}>How it works</Link>
          <Link to="/#doctors" onClick={() => setOpen(false)}>Doctors</Link>
          <Link to="/#reviews" onClick={() => setOpen(false)}>Reviews</Link>
          {user ? (
            <>
              <NavLink to="/app/overview" onClick={() => setOpen(false)}>My workspace</NavLink>
              <button className="btn btn-ghost" onClick={() => { logout(); nav('/') }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost" onClick={() => setOpen(false)}>Login</Link>
              <Link to="/register" className="btn btn-primary" onClick={() => setOpen(false)}>Get started</Link>
            </>
          )}
        </nav>

        <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span /><span /><span />
        </button>
      </div>
    </header>
  )
}
