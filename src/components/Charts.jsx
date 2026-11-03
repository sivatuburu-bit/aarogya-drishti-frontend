import { useState } from 'react'

const COLORS = ['#0d9488', '#6366f1', '#f59e0b', '#ec4899', '#0ea5e9']
const W = 520, H = 220, P = 32

function scale(vals, pad = 0.1) {
  const min = Math.min(...vals), max = Math.max(...vals), r = max - min || 1
  return [min - r * pad, max + r * pad]
}

export function LineChart({ labels, series, height = H }) {
  const [hover, setHover] = useState(null)
  const all = series.flatMap((s) => s.data)
  const [lo, hi] = scale(all)
  const x = (i) => P + (i * (W - P * 2)) / (labels.length - 1)
  const y = (v) => H - P - ((v - lo) / (hi - lo)) * (H - P * 2)
  return (
    <div className="chart">
      <svg viewBox={`0 0 ${W} ${H}`} style={{ height }} role="img" aria-label="Line chart" onMouseLeave={() => setHover(null)}>
        <defs>
          {series.map((s, k) => (
            <linearGradient key={k} id={`lg${k}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={s.color || COLORS[k]} stopOpacity=".28" /><stop offset="1" stopColor={s.color || COLORS[k]} stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>
        {[0, 1, 2, 3].map((g) => <line key={g} x1={P} x2={W - P} y1={P + (g * (H - P * 2)) / 3} y2={P + (g * (H - P * 2)) / 3} className="grid" />)}
        {series.map((s, k) => {
          const pts = s.data.map((v, i) => `${x(i)},${y(v)}`)
          return (
            <g key={s.name}>
              <polygon points={`${x(0)},${H - P} ${pts.join(' ')} ${x(labels.length - 1)},${H - P}`} fill={`url(#lg${k})`} />
              <polyline points={pts.join(' ')} fill="none" stroke={s.color || COLORS[k]} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="draw" pathLength="1" />
              {s.data.map((v, i) => <circle key={i} cx={x(i)} cy={y(v)} r={hover === i ? 6 : 3.5} fill="#fff" stroke={s.color || COLORS[k]} strokeWidth="2.5" />)}
            </g>
          )
        })}
        {labels.map((l, i) => (
          <g key={l}>
            <text x={x(i)} y={H - 8} textAnchor="middle" className="axis">{l}</text>
            <rect x={x(i) - 20} y={0} width="40" height={H} fill="transparent" onMouseEnter={() => setHover(i)} onFocus={() => setHover(i)} />
          </g>
        ))}
      </svg>
      <div className="legend">
        {series.map((s, k) => <span key={s.name}><i style={{ background: s.color || COLORS[k] }} />{s.name}{hover !== null && <b> {s.data[hover]}</b>}</span>)}
        {hover !== null && <em>{labels[hover]}</em>}
      </div>
    </div>
  )
}

export function BarChart({ labels, data, color = COLORS[0], height = H }) {
  const [hover, setHover] = useState(null)
  const max = Math.max(...data) * 1.1, bw = (W - P * 2) / data.length
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ height }} role="img" aria-label="Bar chart" onMouseLeave={() => setHover(null)}>
      {data.map((v, i) => {
        const h = (v / max) * (H - P * 2)
        return (
          <g key={labels[i]} onMouseEnter={() => setHover(i)}>
            <rect x={P + i * bw + bw * 0.18} y={H - P - h} width={bw * 0.64} height={h} rx="8" fill={hover === i ? COLORS[1] : color} className="bar" style={{ animationDelay: `${i * 70}ms` }} />
            <text x={P + i * bw + bw / 2} y={H - 10} textAnchor="middle" className="axis">{labels[i]}</text>
            {hover === i && <text x={P + i * bw + bw / 2} y={H - P - h - 8} textAnchor="middle" className="val">{v.toLocaleString()}</text>}
          </g>
        )
      })}
    </svg>
  )
}

export function Donut({ items }) {
  const [hover, setHover] = useState(null)
  const total = items.reduce((a, b) => a + b.value, 0)
  let acc = 0
  const R = 70, C = 2 * Math.PI * R
  return (
    <div className="donut-wrap">
      <svg viewBox="0 0 200 200" className="donut" role="img" aria-label="Department share">
        {items.map((it, i) => {
          const len = (it.value / total) * C, off = -acc
          acc += len
          return <circle key={it.name} cx="100" cy="100" r={R} fill="none" stroke={COLORS[i % 5]} strokeWidth={hover === i ? 26 : 20} strokeDasharray={`${len - 2} ${C - len + 2}`} strokeDashoffset={off} transform="rotate(-90 100 100)" onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} />
        })}
        <text x="100" y="98" textAnchor="middle" className="donut-n">{(hover === null ? total : items[hover].value).toLocaleString()}</text>
        <text x="100" y="116" textAnchor="middle" className="axis">{hover === null ? 'patients' : items[hover].name}</text>
      </svg>
      <ul className="legend col">
        {items.map((it, i) => <li key={it.name}><i style={{ background: COLORS[i % 5] }} />{it.name}<b>{Math.round((it.value / total) * 100)}%</b></li>)}
      </ul>
    </div>
  )
}

export function Meter({ value, level }) {
  return <div className={`meter ${level.toLowerCase()}`}><span style={{ width: `${value}%` }} /></div>
}
