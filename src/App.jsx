import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import AdminDashboard from './pages/AdminDashboard'

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-brand-dark text-slate-100 flex flex-col font-sans selection:bg-brand-accent selection:text-brand-dark">
        {/* Barre de navigation fixe */}
        <Navbar />

        {/* Contenu principal dynamique selon la route */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>

        {/* Pied de page */}
        <Footer />
      </div>
    </Router>
  )
}