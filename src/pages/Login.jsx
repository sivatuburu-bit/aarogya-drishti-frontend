import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { DEMO_PASSWORD, ROLES } from '../config/roles.js'
import { Field } from '../components/PatientForm.jsx'

export function RolePicker({ value, onChange, exclude = [] }) {
  return (
    <div className="roles" role="radiogroup" aria-label="Select role">
      {Object.entries(ROLES).filter(([k]) => !exclude.includes(k)).map(([k, r]) => {
        const Icon = r.icon
        return <button type="button" role="radio" aria-checked={value === k} key={k} className={`chip-role ${value === k ? 'on' : ''}`} onClick={() => onChange(k)}><Icon size={20} />{r.label}</button>
      })}
    </div>
  )
}

export default function Login() {
  const { user, login } = useAuth()
  const nav = useNavigate()
  const from = useLocation().state?.from
  const [role, setRole] = useState('patient')
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [show, setShow] = useState(false)
  if (user) return <Navigate to="/app/overview" replace />

  const submit = async (e) => {
    e.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(form.email) || !form.password) return setError('Enter a valid email and your password.')
    setBusy(true); setError('')
    try { await login({ ...form, role }); nav(from || '/app/overview', { replace: true }) }
    catch (err) { setError(err.message) } finally { setBusy(false) }
  }

  return (
    <section className="auth2">
      <aside className="auth-hero"><h1>One system for every role in care.</h1><p>{ROLES[role].blurb}</p></aside>
      <form className="auth-panel" onSubmit={submit} noValidate>
        <h2>Welcome back</h2>
        <p className="muted">Choose your role, then sign in.</p>
        <RolePicker value={role} onChange={(r) => { setRole(r); setError('') }} />
        <Field label="Email"><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} autoComplete="email" /></Field>
        <Field label="Password">
          <div className="pw"><input type={show ? 'text' : 'password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} autoComplete="current-password" />
            <button type="button" className="icon-btn" aria-label={show ? 'Hide password' : 'Show password'} onClick={() => setShow(!show)}>{show ? <EyeOff size={18} /> : <Eye size={18} />}</button></div>
        </Field>
        {error && <div className="error" role="alert">{error}</div>}
        <button className="btn btn-primary btn-block btn-lg" disabled={busy}>{busy ? 'Signing in…' : `Sign in as ${ROLES[role].label}`}</button>
        <button type="button" className="btn btn-outline btn-block" onClick={() => { setForm({ email: ROLES[role].demo, password: DEMO_PASSWORD }); setError('') }}>Fill demo account</button>
        <p className="switch">New here? <Link to="/register">Create an account</Link></p>
      </form>
    </section>
  )
}
