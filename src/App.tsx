import { useCallback } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useMotionValue, useTransform, useSpring } from 'motion/react'
import './index.css'

// Layout
import Navbar         from './components/Navbar'
import WhatsAppButton from './components/WhatsAppButton'
import CartDrawer     from './components/CartDrawer'
import FooterSection  from './components/FooterSection'
import ScrollToTop    from './components/ScrollToTop'

// Secciones de la Home
import HeroSection       from './components/HeroSection'
import MarcasSection     from './components/MarcasSection'
import ConfortSection    from './components/ConfortSection'
import NuevosModelos     from './components/NuevosModelos'
import CalidadSection    from './components/CalidadSection'
import TripleEstiloSection from './components/TripleEstiloSection'
import CasheaSection     from './components/CasheaSection'

// Páginas
import Catalogo           from './pages/Catalogo'
import Marcas             from './pages/Marcas'
import Nosotros           from './pages/Nosotros'
import Contacto           from './pages/Contacto'
import Checkout           from './pages/Checkout'
import CheckoutExito      from './pages/CheckoutExito'
import CheckoutFallo      from './pages/CheckoutFallo'
import CheckoutPendiente  from './pages/CheckoutPendiente'
import NotFound           from './pages/NotFound'
import Admin             from './pages/Admin'

const springConfig = { stiffness: 100, damping: 30 }

// ─── Página de inicio (scroll snap) ────────────────────────────────────────
function Home() {
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const moveX = useSpring(useTransform(rawX, [-0.5, 0.5], [-30, 30]), springConfig)
  const moveY = useSpring(useTransform(rawY, [-0.5, 0.5], [-30, 30]), springConfig)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const { clientX, clientY, currentTarget } = e
      const { width, height } = currentTarget.getBoundingClientRect()
      rawX.set(clientX / width - 0.5)
      rawY.set(clientY / height - 0.5)
    },
    [rawX, rawY]
  )

  return (
    <div
      data-scroll-container
      className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-black selection:bg-shoe-yellow selection:text-black"
      onMouseMove={handleMouseMove}
      style={{ scrollbarWidth: 'none' }}
    >
      <HeroSection />
      <MarcasSection />
      <ConfortSection moveX={moveX} moveY={moveY} />
      <NuevosModelos />
      <CalidadSection moveX={moveX} moveY={moveY} />
      <TripleEstiloSection moveX={moveX} moveY={moveY} />
      <CasheaSection />
      <FooterSection />
    </div>
  )
}

// ─── Layout de páginas internas ─────────────────────────────────────────────
function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black">
      {children}
      <FooterSection />
    </div>
  )
}

// ─── App root ────────────────────────────────────────────────────────────────
function App() {
  return (
    <BrowserRouter>
      {/* Filtro SVG global */}
      <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
        <defs>
          <filter id="rough-edges">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" />
          </filter>
        </defs>
      </svg>

      {/* Scroll al tope en cada cambio de ruta */}
      <ScrollToTop />

      {/* Navbar, Carrito y WhatsApp siempre visibles */}
      <Navbar />
      <CartDrawer />
      <WhatsAppButton />

      <Routes>
        <Route path="/"                    element={<Home />} />
        <Route path="/catalogo"            element={<PageLayout><Catalogo /></PageLayout>} />
        <Route path="/marcas"              element={<PageLayout><Marcas /></PageLayout>} />
        <Route path="/nosotros"            element={<PageLayout><Nosotros /></PageLayout>} />
        <Route path="/contacto"            element={<PageLayout><Contacto /></PageLayout>} />
        {/* Checkout */}
        <Route path="/checkout"            element={<Checkout />} />
        <Route path="/checkout/exito"      element={<CheckoutExito />} />
        <Route path="/checkout/fallo"      element={<CheckoutFallo />} />
        <Route path="/checkout/pendiente"  element={<CheckoutPendiente />} />
        {/* Admin */}
        <Route path="/admin" element={<Admin />} />
        {/* 404 — cualquier ruta desconocida */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
