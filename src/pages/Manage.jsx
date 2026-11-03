import { useMemo, useState } from 'react'
import { Download, Plus } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { ROLES, can } from '../config/roles.js'
import Modal from '../components/Modal.jsx'
import PatientForm, { Field, emptyPatient } from '../components/PatientForm.jsx'
import { seed } from '../data/resources.js'
import { validatePatient } from '../utils/validation.js'

const CFG = {
  patients: { title: 'Patient records', cols: [['id', 'ID'], ['name', 'Name'], ['age', 'Age'], ['gender', 'Gender'], ['district', 'District'], ['condition', 'Condition']], statuses: ['Active', 'Follow-up', 'Critical'], add: 'Register patient' },
  appointments: { title: 'Appointments', cols: [['id', 'ID'], ['patient', 'Patient'], ['doctor', 'Doctor'], ['when', 'When']], statuses: ['Scheduled', 'Completed', 'Cancelled'] },
  referrals: { title: 'Referrals', cols: [['id', 'ID'], ['patient', 'Patient'], ['from', 'From'], ['to', 'To'], ['priority', 'Priority']], statuses: ['Pending', 'Accepted', 'Completed'], add: 'New referral' },
  management: { title: 'User management', cols: [['id', 'ID'], ['name', 'Name'], ['role', 'Role'], ['district', 'District']], statuses: ['Active', 'Suspended'] },
}
const tone = (s) => (['Active', 'Completed', 'Scheduled', 'Accepted'].includes(s) ? 'ok' : 'wait')

export default function Manage({ section }) {
  const { user } = useAuth()
  const cfg = CFG[section]
  const [rows, setRows] = useState(seed[section])
  const [q, setQ] = useState('')
  const [modal, setModal] = useState(null)
  const [pf, setPf] = useState(emptyPatient)
  const [rf, setRf] = useState({ patient: '', to: 'Cardiology', priority: 'Routine', reason: '' })
  const [errors, setErrors] = useState({})
  const [toast, setToast] = useState('')

  const isPatient = user.role === 'patient'
  const editable = can(user.role, section, 'update') || can(user.role, section, 'cancel')
  const visible = useMemo(() => rows
    .filter((r) => !ROLES[user.role].scoped || r.district === user.district)
    .filter((r) => !(isPatient && section === 'appointments') || r.patient === user.name)
    .filter((r) => Object.values(r).join(' ').toLowerCase().includes(q.toLowerCase())), [rows, q, user, isPatient, section])

  const flash = (m) => { setToast(m); setTimeout(() => setToast(''), 2500) }
  const setStatus = (id, status) => { setRows(rows.map((r) => (r.id === id ? { ...r, status } : r))); flash(`Status updated to ${status}.`) }

  const addPatient = (e) => {
    e.preventDefault()
    const errs = validatePatient(pf); setErrors(errs)
    if (Object.keys(errs).length) return
    setRows([{ id: `P-${1000 + rows.length + 1}`, name: pf.name.trim(), age: Number(pf.age), gender: pf.gender, district: pf.district, phone: pf.phone, condition: pf.history[0] || 'None', status: 'Active' }, ...rows])
    setModal(null); setPf(emptyPatient); flash('Patient registered.')
  }
  const addReferral = (e) => {
    e.preventDefault()
    const errs = {}
    if (!rf.patient) errs.patient = 'Select a patient.'
    if (rf.reason.trim().length < 5) errs.reason = 'Add a short reason.'
    setErrors(errs)
    if (Object.keys(errs).length) return
    const p = seed.patients.find((x) => x.name === rf.patient)
    setRows([{ id: `RF-${70 + rows.length + 1}`, patient: rf.patient, from: user.name, to: rf.to, priority: rf.priority, district: p?.district || user.district, status: 'Pending' }, ...rows])
    setModal(null); setRf({ patient: '', to: 'Cardiology', priority: 'Routine', reason: '' }); flash('Referral sent.')
  }
  const exportCsv = () => {
    const keys = [...cfg.cols.map((c) => c[0]), 'status']
    const csv = [keys.join(','), ...visible.map((r) => keys.map((k) => `"${r[k] ?? ''}"`).join(','))].join('\n')
    Object.assign(document.createElement('a'), { href: URL.createObjectURL(new Blob([csv], { type: 'text/csv' })), download: `${section}.csv` }).click()
  }
  const options = (r) => (isPatient ? [...new Set([r.status, 'Cancelled'])] : cfg.statuses)
  const canAdd = cfg.add && can(user.role, section, 'create')

  return (
    <section className="section dash app-bg">
      <div className="container">
        <h1 className="dash-title">{cfg.title}</h1>
        <p className="muted">{visible.length} record{visible.length === 1 ? '' : 's'}{ROLES[user.role].scoped ? ` in ${user.district}` : ''}</p>
        <div className="toolbar" style={{ marginTop: 16 }}>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" aria-label="Search" />
          <button className="btn btn-outline" onClick={exportCsv}><Download size={16} /> Export CSV</button>
          {canAdd && <button className="btn btn-primary" onClick={() => { setErrors({}); setModal(section) }}><Plus size={16} /> {cfg.add}</button>}
        </div>
        <div className="glass panel tbl-wrap">
          <table className="tbl">
            <thead><tr>{cfg.cols.map(([, l]) => <th key={l}>{l}</th>)}<th>Status</th></tr></thead>
            <tbody>
              {visible.map((r) => (
                <tr key={r.id}>
                  {cfg.cols.map(([k]) => <td key={k}>{r[k]}</td>)}
                  <td>{editable && (!isPatient || r.status === 'Scheduled')
                    ? <select className="mini" value={r.status} onChange={(e) => setStatus(r.id, e.target.value)} aria-label={`Status for ${r.id}`}>{options(r).map((s) => <option key={s}>{s}</option>)}</select>
                    : <span className={`tag ${tone(r.status)}`}>{r.status}</span>}</td>
                </tr>
              ))}
              {visible.length === 0 && <tr><td colSpan={cfg.cols.length + 1} className="muted empty">No records found.</td></tr>}
            </tbody>
          </table>
        </div>
        {toast && <div className="toast" role="status">{toast}</div>}
        {modal === 'patients' && <Modal title="Register patient" onClose={() => setModal(null)}><form onSubmit={addPatient} noValidate><PatientForm value={pf} onChange={setPf} errors={errors} /><button className="btn btn-primary btn-block" style={{ marginTop: 16 }}>Save patient</button></form></Modal>}
        {modal === 'referrals' && (
          <Modal title="New referral" onClose={() => setModal(null)}>
            <form className="form-grid one" onSubmit={addReferral} noValidate>
              <Field label="Patient" error={errors.patient}><select value={rf.patient} onChange={(e) => setRf({ ...rf, patient: e.target.value })}><option value="">Select patient</option>{seed.patients.map((p) => <option key={p.id}>{p.name}</option>)}</select></Field>
              <Field label="Refer to"><select value={rf.to} onChange={(e) => setRf({ ...rf, to: e.target.value })}>{['Cardiology', 'Endocrinology', 'Pulmonology', 'Neurology', 'Orthopedics'].map((d) => <option key={d}>{d}</option>)}</select></Field>
              <Field label="Priority"><select value={rf.priority} onChange={(e) => setRf({ ...rf, priority: e.target.value })}><option>Routine</option><option>Urgent</option></select></Field>
              <Field label="Reason" error={errors.reason}><textarea rows="3" value={rf.reason} onChange={(e) => setRf({ ...rf, reason: e.target.value })} /></Field>
              <button className="btn btn-primary btn-block">Send referral</button>
            </form>
          </Modal>
        )}
      </div>
    </section>
  )
}
