import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import AppTabs from '../components/AppTabs.jsx'
import { LineChart } from '../components/Charts.jsx'
import { appointments as a0, medicines as m0, vitals } from '../data/sampleData.js'

export default function Dashboard() {
  const { user } = useAuth()
  const [appts, setAppts] = useState(a0)
  const [meds, setMeds] = useState(m0)
  const [metric, setMetric] = useState('hr')

  const toggle = (id) => setMeds(meds.map((m) => (m.id === id ? { ...m, done: !m.done } : m)))
  const cancel = (id) => setAppts(appts.filter((a) => a.id !== id))
  const confirm = (id) => setAppts(appts.map((a) => (a.id === id ? { ...a, status: 'Confirmed' } : a)))
  const taken = meds.filter((m) => m.done).length

  const series = {
    hr: [{ name: 'Heart rate (bpm)', data: vitals.hr }],
    bp: [{ name: 'Systolic', data: vitals.bp.map((b) => b[0]) }, { name: 'Diastolic', data: vitals.bp.map((b) => b[1]), color: '#6366f1' }],
    sugar: [{ name: 'Glucose (mg/dL)', data: vitals.sugar, color: '#f59e0b' }],
  }[metric]

  return (
    <section className="section dash app-bg">
      <div className="container">
        <h1 className="dash-title">Hello, {user?.name} 👋</h1>
        <p className="muted">Here is your health overview for today.</p>
        <AppTabs />

        <div className="grid-4 stats">
          <div className="glass stat"><span>📅</span><b>{appts.length}</b><small>Upcoming visits</small></div>
          <div className="glass stat"><span>💊</span><b>{taken}/{meds.length}</b><small>Medicines taken</small></div>
          <div className="glass stat"><span>📁</span><b>{6}</b><small>Reports stored</small></div>
          <div className="glass stat"><span>❤️</span><b>72</b><small>Heart rate (bpm)</small></div>
        </div>

        <div className="glass panel">
          <div className="panel-head">
            <h3>Weekly vitals</h3>
            <div className="seg">
              {[['hr', 'Heart rate'], ['bp', 'Blood pressure'], ['sugar', 'Glucose']].map(([k, l]) => (
                <button key={k} className={metric === k ? 'on' : ''} onClick={() => setMetric(k)}>{l}</button>
              ))}
            </div>
          </div>
          <LineChart key={metric} labels={vitals.days} series={series} />
        </div>

        <div className="dash-grid">
          <div className="glass panel">
            <h3>Upcoming appointments</h3>
            {appts.length === 0 && <p className="muted empty">No upcoming visits. <Link to="/#doctors">Book a doctor</Link></p>}
            {appts.map((a) => (
              <div className="row" key={a.id}>
                <div><b>{a.doc}</b><small>{a.role} · {a.when}</small></div>
                <div className="actions">
                  <span className={`tag ${a.status === 'Confirmed' ? 'ok' : 'wait'}`}>{a.status}</span>
                  {a.status === 'Pending' && <button className="mini" onClick={() => confirm(a.id)}>Confirm</button>}
                  <button className="mini danger" onClick={() => cancel(a.id)}>Cancel</button>
                </div>
              </div>
            ))}
          </div>
          <div className="glass panel">
            <h3>Today's medicines</h3>
            <div className="meter low"><span style={{ width: `${(taken / meds.length) * 100}%` }} /></div>
            {meds.map((m) => (
              <div className="row" key={m.id}>
                <div><b>{m.name}</b><small>{m.time}</small></div>
                <button className={`tag ${m.done ? 'ok' : 'wait'} tag-btn`} onClick={() => toggle(m.id)}>{m.done ? 'Taken ✓' : 'Mark taken'}</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
