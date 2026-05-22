import { useEffect } from 'react'

interface SEOOptions {
  title:       string
  description?: string
}

/**
 * Actualiza el <title> y la meta description de la página actual.
 * Al desmontar restaura los valores por defecto.
 */
export function useSEO({ title, description }: SEOOptions) {
  useEffect(() => {
    const prevTitle = document.title
    const metaDesc  = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    const prevDesc  = metaDesc?.content ?? ''

    document.title = `${title} — Zapateria la 21`
    if (metaDesc && description) metaDesc.content = description

    return () => {
      document.title = prevTitle
      if (metaDesc) metaDesc.content = prevDesc
    }
  }, [title, description])
}
