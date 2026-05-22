import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useCartStore } from '../store/cartStore'

const links = [
  { label: 'Inicio',    to: '/' },
  { label: 'Catálogo',  to: '/catalogo' },
  { label: 'Marcas',    to: '/marcas' },
  { label: 'Nosotros',  to: '/nosotros' },
  { label: 'Contacto',  to: '/contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const { pathname }              = useLocation()
  const { toggleCart, totalItems } = useCartStore()
  const cartCount = totalItems()

  // En la home escuchamos el scroll del contenedor snap
  useEffect(() => {
    const container = document.querySelector('[data-scroll-container]') as HTMLElement | null
    const el = container ?? window as unknown as HTMLElement
    const onScroll = () => {
      const top = container ? container.scrollTop : window.scrollY
      setScrolled(top > 60)
    }
    el.addEventListener('scroll', onScroll)
    return () => el.removeEventListener('scroll', onScroll)
  }, [pathname])

  // En páginas internas siempre oscuro
  const isHome      = pathname === '/'
  const isDark      = !isHome || scrolled

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isDark
            ? 'bg-black/85 backdrop-blur-xl border-b border-white/10 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="no-underline">
            <span
              className="text-white font-black text-2xl tracking-tight"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              La<span className="text-shoe-yellow"> 21</span>
            </span>
          </Link>

          {/* Links desktop */}
          <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
            {links.map(({ label, to }) => {
              const active = pathname === to
              return (
                <li key={to}>
                  <Link
                    to={to}
                    className={`font-bold text-sm tracking-wide transition-colors duration-200 no-underline ${
                      active ? 'text-shoe-yellow' : 'text-white/70 hover:text-shoe-yellow'
                    }`}
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {label}
                    {active && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="h-0.5 bg-shoe-yellow mt-0.5 rounded-full"
                      />
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Acciones */}
          <div className="flex items-center gap-4">
            <motion.button
              onClick={toggleCart}
              whileTap={{ scale: 0.9 }}
              className="relative text-white hover:text-shoe-yellow transition-colors duration-200 bg-transparent border-0 cursor-pointer"
              title="Carrito"
            >
              <ShoppingBag size={22} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1.5 -right-1.5 bg-shoe-yellow text-black text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center"
                  >
                    {cartCount > 9 ? '9+' : cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <button
              className="md:hidden text-white bg-transparent border-0 cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Menú mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 left-0 right-0 z-40 bg-black/95 backdrop-blur-xl border-b border-white/10 py-6 px-6"
          >
            <ul className="flex flex-col gap-5 list-none m-0 p-0">
              {links.map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    onClick={() => setMenuOpen(false)}
                    className={`font-black text-xl hover:text-shoe-yellow transition-colors duration-200 no-underline ${
                      pathname === to ? 'text-shoe-yellow' : 'text-white'
                    }`}
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
