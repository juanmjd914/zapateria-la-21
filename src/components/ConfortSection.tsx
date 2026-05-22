import { motion, useMotionValue, useTransform, useSpring } from 'motion/react'
import { ArrowRight } from 'lucide-react'

const IMG = 'https://bismrhwimuntpawgrdsa.supabase.co/storage/v1/object/public/VIDEOS%20WEB/1.jpg'

interface Props {
  moveX: ReturnType<typeof useMotionValue<number>>
  moveY: ReturnType<typeof useMotionValue<number>>
}

export default function ConfortSection({ moveX, moveY }: Props) {
  const springConfig = { stiffness: 100, damping: 30 }
  const bgX = useSpring(useTransform(moveX, (v) => v * 30), springConfig)
  const bgY = useSpring(useTransform(moveY, (v) => v * 30), springConfig)

  return (
    <section className="relative w-full h-screen snap-start overflow-hidden flex items-center">
      {/* Fondo con paralaje */}
      <motion.img
        src={IMG}
        alt="Confort"
        style={{ x: bgX, y: bgY, scale: 1.12 }}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay lateral derecho para contraste */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

      {/* Contenido */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          {/* Etiqueta superior */}
          <span
            className="inline-block bg-shoe-yellow text-black font-black text-xs tracking-[0.25em] uppercase px-4 py-2 rounded-full mb-6"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            NUEVA COLECCIÓN
          </span>

          {/* Título principal */}
          <h2
            className="text-white font-black italic text-5xl md:text-8xl leading-[0.9] mb-6"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            CONFORT EN
            <br />
            <span className="text-shoe-yellow">TUS PISADAS</span>
          </h2>

          {/* Descripción */}
          <p
            className="text-white/90 font-bold text-lg md:text-xl max-w-md mb-10 leading-relaxed"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Pisada de aire, suave andar y horas de{' '}
            <span className="text-shoe-yellow">"Caminatas"</span>.
          </p>

          {/* Botón */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            className="group flex items-center gap-3 border-2 border-white/40 bg-white/5 backdrop-blur-md text-white font-bold text-sm tracking-[0.15em] uppercase px-8 py-4 rounded-full cursor-pointer transition-all duration-300 hover:bg-shoe-yellow hover:text-black hover:border-shoe-yellow"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            PROBAR AHORA
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
