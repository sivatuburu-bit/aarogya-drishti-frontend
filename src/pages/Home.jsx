import { Link } from 'react-router-dom'
import hero from '../assets/hero.jpg'

const services = [
  { icon: '🩺', title: 'Book Appointments', text: 'Find verified specialists and pick a time slot that suits you.' },
  { icon: '💻', title: 'Online Consultation', text: 'Video or chat with a doctor from the comfort of your home.' },
  { icon: '💊', title: 'Medicine Reminders', text: 'Never miss a dose with smart, gentle reminders.' },
  { icon: '🧪', title: 'Lab Tests', text: 'Book tests, get reports digitally and share them in one tap.' },
  { icon: '📁', title: 'Health Records', text: 'Prescriptions and reports, safely stored and always available.' },
  { icon: '🚑', title: 'Emergency Help', text: 'Quick access to nearby hospitals and emergency contacts.' },
]

const steps = [
  { n: '01', title: 'Create your account', text: 'Sign up in under a minute.' },
  { n: '02', title: 'Choose a doctor', text: 'Filter by speciality, rating and availability.' },
  { n: '03', title: 'Get care', text: 'Visit in person or consult online. Records sync automatically.' },
]

const doctors = [
  { name: 'Dr. Ananya Rao', role: 'Cardiologist', exp: '12 yrs', rating: '4.9', color: '#0ea5a4' },
  { name: 'Dr. Rohit Varma', role: 'General Physician', exp: '9 yrs', rating: '4.8', color: '#6366f1' },
  { name: 'Dr. Sneha Reddy', role: 'Pediatrician', exp: '11 yrs', rating: '4.9', color: '#f59e0b' },
  { name: 'Dr. Kiran Kumar', role: 'Orthopedic', exp: '15 yrs', rating: '4.7', color: '#ec4899' },
]

const reviews = [
  { name: 'Lakshmi P.', text: 'Booked a specialist in two minutes. The reminders are a lifesaver for my parents.' },
  { name: 'Suresh M.', text: 'Online consultation saved me a long trip. Clean app, very easy to use.' },
  { name: 'Divya K.', text: 'All my reports in one place. I finally stopped carrying files to every visit.' },
]

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="blob b1" /><div className="blob b2" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="pill">✨ Trusted by 50,000+ patients</span>
            <h1>Healthcare, <span className="grad">made human.</span></h1>
            <p className="lead">Book trusted doctors, consult online and manage your health records — all in one simple, beautiful place.</p>
            <div className="hero-cta">
              <Link to="/register" className="btn btn-primary btn-lg">Book an appointment</Link>
              <Link to="/#how" className="btn btn-outline btn-lg">See how it works</Link>
            </div>
            <div className="hero-stats">
              <div><b>500+</b><span>Specialists</span></div>
              <div><b>4.9★</b><span>Avg. rating</span></div>
              <div><b>24/7</b><span>Support</span></div>
            </div>
          </div>

          <div className="hero-visual">
            <img src={hero} alt="Doctor with stethoscope" />
            <div className="float f1"><span>✅</span><div><b>Appointment confirmed</b><small>Today, 5:30 PM</small></div></div>
            <div className="float f2"><span>❤️</span><div><b>Heart rate</b><small>72 bpm · Normal</small></div></div>
          </div>
        </div>
      </section>

      <section id="services" className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Services</span>
            <h2>Everything you need for better health</h2>
            <p>Simple tools designed around patients and families.</p>
          </div>
          <div className="grid-3">
            {services.map((s) => (
              <div className="card service" key={s.title}>
                <div className="icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="section alt">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">How it works</span>
            <h2>Care in three easy steps</h2>
          </div>
          <div className="grid-3">
            {steps.map((s) => (
              <div className="step" key={s.n}>
                <div className="step-n">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="doctors" className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Our doctors</span>
            <h2>Meet top-rated specialists</h2>
          </div>
          <div className="grid-4">
            {doctors.map((d) => (
              <div className="card doctor" key={d.name}>
                <div className="avatar" style={{ background: d.color }}>{d.name.split(' ')[1][0]}</div>
                <h3>{d.name}</h3>
                <p className="muted">{d.role}</p>
                <div className="meta"><span>⭐ {d.rating}</span><span>{d.exp}</span></div>
                <Link to="/register" className="btn btn-outline btn-block">Book now</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="section alt">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Reviews</span>
            <h2>Loved by patients and families</h2>
          </div>
          <div className="grid-3">
            {reviews.map((r) => (
              <div className="card review" key={r.name}>
                <div className="stars">★★★★★</div>
                <p>“{r.text}”</p>
                <b>{r.name}</b>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta">
            <h2>Your health deserves better care.</h2>
            <p>Join CareConnect today and book your first appointment in minutes.</p>
            <Link to="/register" className="btn btn-white btn-lg">Create free account</Link>
          </div>
        </div>
      </section>
    </>
  )
}
