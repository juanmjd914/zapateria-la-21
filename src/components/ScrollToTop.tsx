import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Sube automáticamente al tope de la página cada vez que cambia la ruta.
 * Colocar dentro de <BrowserRouter> en App.tsx.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return null
}
