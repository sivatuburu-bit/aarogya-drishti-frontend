import { useState } from 'react'
import { Link } from 'react-router-dom'
import AppTabs from '../components/AppTabs.jsx'
import { Meter } from '../components/Charts.jsx'
import { aiFindings, symptomRules } from '../data/sampleData.js'

export default function AIResults() {
  const [text, setText] = useState('')
  const [busy, setBusy] = useState(false)
  const [result, setResult] = useState(null)

  const analyze = (e) => {
    e.preventDefault()
    const q = text.toLowerCase().trim()
    if (q.length < 3) return setResult({ error: 'Describe at least one symptom, e.g. "fever and sore throat".' })
    setBusy(true); setResult(null)
    setTimeout(() => {
      const hit = symptomRules.find((r) => r.keys.some((k) => q.includes(k)))
      setResult(hit || { dept: 'General Medicine', cond: 'No clear pattern. A doctor review is recommended.', conf: 55, urgent: false })
      setBusy(false)
    }, 1200)
  }

  return (
    <section className="section dash app-bg">
      <div className="container">
        <h1 className="dash-title">AI Results</h1>
        <p className="muted">AI-assisted insights from your reports. For guidance only, not a diagnosis.</p>
        <AppTabs />

        <div className="grid-2">
          {aiFindings.map((f) => (
            <div className="glass panel" key={f.id}>
              <div className="panel-head"><h3>{f.title}</h3><span className={`tag ${f.level === 'Low' ? 'ok' : 'wait'}`}>{f.level}</span></div>
              <div className="big">{f.score}<small>% risk score</small></div>
              <Meter value={f.score} level={f.level === 'Low' ? 'low' : 'mid'} />
              <p className="muted">{f.note}</p>
            </div>
          ))}
        </div>

        <form className="glass panel checker" onSubmit={analyze}>
          <h3>Symptom checker</h3>
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows="3" placeholder="Describe how you feel…" aria-label="Symptoms" />
          <button className="btn btn-primary" disabled={busy}>{busy ? 'Analyzing…' : 'Analyze symptoms'}</button>
          {busy && <div className="shimmer" aria-live="polite" />}
          {result?.error && <div className="error">{result.error}</div>}
          {result && !result.error && (
            <div className="result" aria-live="polite">
              {result.urgent && <div className="error">These symptoms can be serious. Seek urgent care if severe.</div>}
              <p><b>{result.cond}</b></p>
              <p className="muted">Suggested department: {result.dept} · Confidence {result.conf}%</p>
              <Meter value={result.conf} level="low" />
              <Link to="/#doctors" className="btn btn-outline">Find a {result.dept} doctor</Link>
            </div>
          )}
        </form>
      </div>
    </section>
  )
}
