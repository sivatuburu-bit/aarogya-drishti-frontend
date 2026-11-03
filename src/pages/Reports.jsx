import { useMemo, useState } from 'react'
import AppTabs from '../components/AppTabs.jsx'
import Modal from '../components/Modal.jsx'
import { reports } from '../data/sampleData.js'

const types = ['All', ...new Set(reports.map((r) => r.type))]

function download(r) {
  const body = `CareConnect Medical Report\n${r.id} – ${r.title}\nDate: ${r.date}\nDoctor: ${r.doctor}\nStatus: ${r.status}\n\n${r.summary}\n`
  const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(new Blob([body], { type: 'text/plain' })), download: `${r.id}.txt` })
  a.click(); URL.revokeObjectURL(a.href)
}

export default function Reports() {
  const [q, setQ] = useState('')
  const [type, setType] = useState('All')
  const [open, setOpen] = useState(null)
  const list = useMemo(() => reports.filter((r) => (type === 'All' || r.type === type) && (r.title + r.doctor).toLowerCase().includes(q.toLowerCase())), [q, type])

  return (
    <section className="section dash app-bg">
      <div className="container">
        <h1 className="dash-title">Medical Reports</h1>
        <p className="muted">All your lab, imaging and cardiology reports in one place.</p>
        <AppTabs />
        <div className="toolbar">
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search reports or doctors" aria-label="Search reports" />
          <div className="seg">{types.map((t) => <button key={t} className={type === t ? 'on' : ''} onClick={() => setType(t)}>{t}</button>)}</div>
        </div>
        {list.length === 0 && <p className="muted empty">No reports match your search.</p>}
        <div className="grid-3">
          {list.map((r) => (
            <article className="glass panel report" key={r.id}>
              <div className="panel-head"><small>{r.id}</small><span className={`tag ${r.status === 'Normal' ? 'ok' : 'wait'}`}>{r.status}</span></div>
              <h3>{r.title}</h3>
              <p className="muted">{r.type} · {new Date(r.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}<br />{r.doctor}</p>
              <div className="actions">
                <button className="btn btn-outline mini" onClick={() => setOpen(r)}>View</button>
                <button className="btn btn-primary mini" onClick={() => download(r)}>Download</button>
              </div>
            </article>
          ))}
        </div>
        {open && (
          <Modal title={open.title} onClose={() => setOpen(null)}>
            <p className="muted">{open.id} · {open.doctor} · {open.date}</p>
            <p style={{ margin: '14px 0' }}>{open.summary}</p>
            <button className="btn btn-primary" onClick={() => download(open)}>Download report</button>
          </Modal>
        )}
      </div>
    </section>
  )
}
