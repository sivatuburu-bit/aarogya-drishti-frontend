import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Section from './pages/Section.jsx'
import AppLayout from './layouts/AppLayout.jsx'
import { useAuth } from './context/AuthContext.jsx'

function Protected({ children }) {
  const { user } = useAuth()
  const loc = useLocation()
  return user ? children : <Navigate to="/login" replace state={{ from: loc.pathname }} />
}

// Scrolls to #hash targets (and to top on route change); works with client-side <Link to="/#id">.
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }), 50)
    else window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  const inApp = useLocation().pathname.startsWith('/app')
  return (
    <>
      <ScrollManager />
      {!inApp && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/app" element={<Protected><AppLayout /></Protected>}>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path=":section" element={<Section />} />
          </Route>
          {/* legacy URLs from the previous version */}
          <Route path="/dashboard" element={<Navigate to="/app/overview" replace />} />
          <Route path="/ai-results" element={<Navigate to="/app/ai" replace />} />
          <Route path="/reports" element={<Navigate to="/app/reports" replace />} />
          <Route path="/analytics" element={<Navigate to="/app/analytics" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!inApp && <Footer />}
    </>
  )
}
