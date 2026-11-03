import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="brand light"><span className="brand-mark">+</span> CareConnect</div>
          <p>Quality healthcare, a tap away. Book doctors, consult online and keep your records in one place.</p>
        </div>
        <div>
          <h4>Product</h4>
          <Link to="/#services">Services</Link>
          <Link to="/#doctors">Doctors</Link>
          <Link to="/#how">How it works</Link>
        </div>
        <div>
          <h4>Account</h4>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/app/overview">Workspace</Link>
        </div>
        <div>
          <h4>Contact</h4>
          <span>support@careconnect.app</span>
          <span>Mon–Sat, 8am – 9pm</span>
        </div>
      </div>
      <div className="container copy">© {new Date().getFullYear()} CareConnect. All rights reserved.</div>
    </footer>
  )
}
