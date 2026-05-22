import { useEffect } from 'react'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ShoppingBag } from 'lucide-react'

export default function NotFound() {
  const navigate = useNavigate()

  useEffect(() => {
    document.title = '404 — Zapateria la 21'
    return () => { document.title = 'Zapateria la 21 — Estilo Salvaje' }
  }, [])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6 overflow-hidden">

      {/* Fondo decorativo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-shoe-yellow/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-shoe-orange/5 rounded-full blur-3xl" />
      </div>

      {/* Zapatos flotantes decorativos */}
      {['👟', '👟', '👟'].map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-4xl select-none pointer-events-none opacity-10"
          style={{
            left:  `${15 + i * 35}%`,
            top:   `${20 + (i % 2) * 55}%`,
            rotate: `${-20 + i * 20}deg`,
          }}
          animate={{ y: [0, -18, 0], rotate: [-20 + i * 20, -10 + i * 20, -20 + i * 20] }}
          transition={{ duration: 3 + i * 0.7, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
        >
          👟
        </motion.span>
      ))}

      <div className="relative z-10 text-center max-w-lg">

        {/* 404 grande */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1,   opacity: 1 }}
          transition={{ type: 'spring', stiffness: 180, damping: 18 }}
          className="mb-4"
        >
          <span
            className="text-[10rem] md:text-[13rem] font-black leading-none select-none"
            style={{
              fontFamily: 'Poppins, sans-serif',
              background: 'linear-gradient(180deg, #ffc222 0%, #f27d26 60%, rgba(255,194,34,0.15) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            404
          </span>
        </motion.div>

        {/* Línea divisoria */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="w-16 h-1 bg-shoe-yellow/40 rounded-full mx-auto mb-8"
        />

        {/* Texto */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          <p className="text-shoe-orange font-black text-xs tracking-[0.3em] uppercase mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
            Modelo no encontrado
          </p>
          <h1 className="text-white font-black text-3xl md:text-4xl leading-tight mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            ESTE PAR NO EXISTE<br />EN NUESTRO CATÁLOGO
          </h1>
          <p className="text-white/40 text-sm leading-relaxed mb-10" style={{ fontFamily: 'Inter, sans-serif' }}>
            La página que buscas fue descontinuada, nunca existió,<br className="hidden md:block" />
            o quizás escribiste mal la dirección.
          </p>
        </motion.div>

        {/* Botones */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => navigate('/catalogo')}
            className="flex items-center gap-2 bg-shoe-yellow text-black font-black text-sm tracking-widest uppercase px-8 py-4 rounded-full border-0 cursor-pointer hover:bg-shoe-orange hover:text-white transition-all"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            <ShoppingBag size={17} />
            VER CATÁLOGO
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 bg-white/5 border border-white/10 text-white font-black text-sm tracking-widest uppercase px-8 py-4 rounded-full cursor-pointer hover:bg-white/10 transition-all"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            <ArrowLeft size={17} />
            INICIO
          </button>
        </motion.div>

        {/* Link sutil */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-white/20 text-xs mt-10"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          ¿Necesitas ayuda?{' '}
          <a
            href="https://wa.me/5841236506"
            target="_blank"
            rel="noopener noreferrer"
            className="text-shoe-yellow/50 hover:text-shoe-yellow transition-colors underline"
          >
            Escríbenos por WhatsApp
          </a>
        </motion.p>

      </div>
    </div>
  )
}
