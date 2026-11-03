import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { ROLES } from '../config/roles.js'
import PatientForm, { DistrictSelect, Field, emptyPatient } from '../components/PatientForm.jsx'
import { RolePicker } from './Login.jsx'
import { validatePatient, validateStaff } from '../utils/validation.js'

export default function Register() {
  const { user, register } = useAuth()
  const nav = useNavigate()
  const [role, setRole] = useState('patient')
  const [f, setF] = useState({ ...emptyPatient, regNo: '' })
  const [errors, setErrors] = useState({})
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  if (user) return <Navigate to="/app/overview" replace />

  const isPatient = role === 'patient'
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const submit = async (e) => {
    e.preventDefault()
    const errs = isPatient ? validatePatient(f, { account: true }) : validateStaff(f)
    setErrors(errs); setError('')
    if (Object.keys(errs).length) return
    setBusy(true)
    try { await register({ ...f, role, email: f.email.trim(), name: f.name.trim() }); nav('/app/overview', { replace: true }) }
    catch (err) { setError(err.message) } finally { setBusy(false) }
  }

  return (
    <section className="auth2">
      <aside className="auth-hero"><h1>Join CareConnect.</h1><p>{ROLES[role].blurb}</p><p className="muted-w">Super Admin accounts are created by invitation only.</p></aside>
      <form className="auth-panel wide-panel" onSubmit={submit} noValidate>
        <h2>Create your {ROLES[role].label.toLowerCase()} account</h2>
        <RolePicker value={role} onChange={(r) => { setRole(r); setErrors({}) }} exclude={['super_admin']} />
        {isPatient ? <PatientForm value={f} onChange={setF} errors={errors} account /> : (
          <div className="form-grid">
            <Field label="Full name" error={errors.name}><input value={f.name} onChange={set('name')} /></Field>
            <Field label="Email" error={errors.email}><input type="email" value={f.email} onChange={set('email')} /></Field>
            <Field label="Mobile number" error={errors.phone}><input inputMode="numeric" maxLength="10" value={f.phone} onChange={set('phone')} /></Field>
            <Field label="District" error={errors.district}><DistrictSelect value={f.district} onChange={set('district')} /></Field>
            <Field label="Registration / staff ID" error={errors.regNo} wide><input value={f.regNo} onChange={set('regNo')} /></Field>
            <Field label="Password" error={errors.password}><input type="password" value={f.password} onChange={set('password')} autoComplete="new-password" /></Field>
            <Field label="Confirm password" error={errors.confirm}><input type="password" value={f.confirm} onChange={set('confirm')} autoComplete="new-password" /></Field>
          </div>
        )}
        {error && <div className="error" role="alert">{error}</div>}
        <button className="btn btn-primary btn-block btn-lg" disabled={busy}>{busy ? 'Creating account…' : 'Create account'}</button>
        <p className="switch">Already registered? <Link to="/login">Sign in</Link></p>
      </form>
    </section>
  )
}
