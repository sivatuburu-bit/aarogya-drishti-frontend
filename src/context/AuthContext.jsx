import { createContext, useContext, useState } from 'react'
import { api } from '../services/api.js'
import { DEMO_USERS, ROLES } from '../config/roles.js'

const AuthContext = createContext(null)
const read = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d } catch { return d } }
const strip = ({ password, confirm, ...u }) => u

// Uses the real API when available; falls back to local demo accounts (localStorage) when it isn't.
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => read('cc_user', null))
  const save = (u) => { setUser(u); u ? localStorage.setItem('cc_user', JSON.stringify(u)) : localStorage.removeItem('cc_user') }
  const allUsers = () => [...DEMO_USERS, ...read('cc_users', [])]

  const login = async ({ email, password, role }) => {
    try {
      const d = await api('/auth/login', { method: 'POST', body: { email, password, role } })
      save({ ...d.user, token: d.token }); return d.user
    } catch (e) {
      if (!e.offline) throw e
      const u = allUsers().find((x) => x.email.toLowerCase() === email.toLowerCase() && x.password === password)
      if (!u) throw new Error('Incorrect email or password.')
      if (u.role !== role) throw new Error(`This account is a ${ROLES[u.role].label}. Select that role to continue.`)
      save(strip(u)); return u
    }
  }

  const register = async (payload) => {
    try {
      const d = await api('/auth/register', { method: 'POST', body: strip(payload) })
      save({ ...d.user, token: d.token }); return d.user
    } catch (e) {
      if (!e.offline) throw e
      if (allUsers().some((x) => x.email.toLowerCase() === payload.email.toLowerCase())) throw new Error('An account with this email already exists.')
      const u = { id: `u${Date.now()}`, ...strip(payload), password: payload.password }
      localStorage.setItem('cc_users', JSON.stringify([...read('cc_users', []), u]))
      save(strip(u)); return u
    }
  }

  const logout = () => save(null)
  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
