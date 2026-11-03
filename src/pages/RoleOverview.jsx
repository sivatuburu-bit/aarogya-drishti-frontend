import { useAuth } from '../context/AuthContext.jsx'
import { BarChart, Donut, LineChart } from '../components/Charts.jsx'
import useCountUp from '../hooks/useCountUp.js'
import { overview } from '../data/resources.js'

function Stat({ label, value }) {
  const v = useCountUp(value)
  return <div className="glass stat"><b>{v.toLocaleString('en-IN', { maximumFractionDigits: value % 1 ? 1 : 0, minimumFractionDigits: value % 1 ? 1 : 0 })}</b><small>{label}</small></div>
}

export default function RoleOverview() {
  const { user } = useAuth()
  const o = overview[user.role]
  return (
    <section className="section dash app-bg">
      <div className="container">
        <h1 className="dash-title">{o.title}</h1>
        <p className="muted">Welcome back, {user.name}.</p>
        <div className="grid-4 stats">{o.kpis.map(([l, v]) => <Stat key={l} label={l} value={v} />)}</div>
        <div className={o.donut ? 'dash-grid' : ''}>
          <div className="glass panel"><h3>{o.chart.title}</h3>
            {o.chart.kind === 'bar' ? <BarChart labels={o.chart.labels} data={o.chart.data} /> : <LineChart labels={o.chart.labels} series={o.chart.series} />}
          </div>
          {o.donut && <div className="glass panel"><h3>Case mix</h3><Donut items={o.donut} /></div>}
        </div>
        <div className="glass panel"><h3>Alerts</h3>
          {o.alerts.map(([t, k]) => <div className="row" key={t}><span>{t}</span><span className={`tag ${k}`}>{k === 'ok' ? 'Good' : 'Action'}</span></div>)}
        </div>
      </div>
    </section>
  )
}
