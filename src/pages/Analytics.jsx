import AppTabs from '../components/AppTabs.jsx'
import { BarChart, Donut, LineChart } from '../components/Charts.jsx'
import useCountUp from '../hooks/useCountUp.js'
import { hospital as h } from '../data/sampleData.js'

function Kpi({ label, value, suffix = '', delta, dec = 0 }) {
  const v = useCountUp(value)
  const good = label === 'Avg. wait time' ? delta < 0 : delta > 0
  return (
    <div className="glass stat">
      <b>{v.toLocaleString('en-IN', { maximumFractionDigits: dec, minimumFractionDigits: dec })}{suffix}</b>
      <small>{label}</small>
      <span className={`delta ${good ? 'up' : 'down'}`}>{delta > 0 ? '▲' : '▼'} {Math.abs(delta)}% vs last month</span>
    </div>
  )
}

export default function Analytics() {
  return (
    <section className="section dash app-bg">
      <div className="container">
        <h1 className="dash-title">Hospital Analytics</h1>
        <p className="muted">Operational overview, May – Oct 2026 (sample data).</p>
        <AppTabs />
        <div className="grid-4 stats">{h.kpis.map((k) => <Kpi key={k.label} {...k} />)}</div>
        <div className="dash-grid">
          <div className="glass panel"><h3>Admissions trend</h3><BarChart labels={h.months} data={h.admissions} /></div>
          <div className="glass panel"><h3>Patients by department</h3><Donut items={h.departments} /></div>
        </div>
        <div className="glass panel"><h3>Revenue (₹ lakh)</h3><LineChart labels={h.months} series={[{ name: 'Revenue', data: h.revenue, color: '#6366f1' }]} /></div>
      </div>
    </section>
  )
}
