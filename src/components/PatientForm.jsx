import { CONDITIONS, DISTRICTS } from '../config/roles.js'

export const emptyPatient = { name: '', email: '', password: '', confirm: '', age: '', gender: '', phone: '', address: '', district: '', history: [], notes: '', emergencyName: '', emergencyPhone: '' }

export function Field({ label, error, children, wide }) {
  return (
    <label className={`field ${error ? 'bad' : ''} ${wide ? 'wide' : ''}`}>
      <span>{label}</span>{children}
      {error && <small className="err" role="alert">{error}</small>}
    </label>
  )
}

export function DistrictSelect({ value, onChange }) {
  return <select value={value} onChange={onChange}><option value="">Select district</option>{DISTRICTS.map((d) => <option key={d}>{d}</option>)}</select>
}

// Shared by public registration (account=true) and "Register patient" inside dashboards.
export default function PatientForm({ value: v, onChange, errors = {}, account = false }) {
  const set = (k) => (e) => onChange({ ...v, [k]: e.target.value })
  const toggle = (c) => onChange({ ...v, history: v.history.includes(c) ? v.history.filter((x) => x !== c) : [...v.history, c] })
  return (
    <div className="form-grid">
      <Field label="Full name" error={errors.name}><input value={v.name} onChange={set('name')} autoComplete="name" /></Field>
      <Field label="Age" error={errors.age}><input type="number" min="0" max="120" value={v.age} onChange={set('age')} /></Field>
      <Field label="Gender" error={errors.gender}>
        <select value={v.gender} onChange={set('gender')}><option value="">Select</option><option>Female</option><option>Male</option><option>Other</option></select>
      </Field>
      <Field label="Mobile number" error={errors.phone}><input inputMode="numeric" maxLength="10" value={v.phone} onChange={set('phone')} placeholder="10 digits" /></Field>
      <Field label="Address" error={errors.address} wide><input value={v.address} onChange={set('address')} autoComplete="street-address" /></Field>
      <Field label="District" error={errors.district}><DistrictSelect value={v.district} onChange={set('district')} /></Field>
      {account && <Field label="Email" error={errors.email}><input type="email" value={v.email} onChange={set('email')} autoComplete="email" /></Field>}
      <div className="field wide">
        <span>Medical history</span>
        <div className="chips">{CONDITIONS.map((c) => <button type="button" key={c} className={v.history.includes(c) ? 'on' : ''} onClick={() => toggle(c)} aria-pressed={v.history.includes(c)}>{c}</button>)}</div>
      </div>
      <Field label="Other notes (allergies, medicines)" wide><textarea rows="2" value={v.notes} onChange={set('notes')} /></Field>
      <Field label="Emergency contact name" error={errors.emergencyName}><input value={v.emergencyName} onChange={set('emergencyName')} /></Field>
      <Field label="Emergency contact number" error={errors.emergencyPhone}><input inputMode="numeric" maxLength="10" value={v.emergencyPhone} onChange={set('emergencyPhone')} /></Field>
      {account && <>
        <Field label="Password" error={errors.password}><input type="password" value={v.password} onChange={set('password')} autoComplete="new-password" /></Field>
        <Field label="Confirm password" error={errors.confirm}><input type="password" value={v.confirm} onChange={set('confirm')} autoComplete="new-password" /></Field>
      </>}
    </div>
  )
}
