import { motion, useMotionValue, useTransform, useSpring } from 'motion/react'
import { ArrowRight } from 'lucide-react'

const IMG = 'https://bismrhwimuntpawgrdsa.supabase.co/storage/v1/object/public/VIDEOS%20WEB/3.jpg'

interface Props {
  moveX: ReturnType<typeof useMotionValue<number>>
  moveY: ReturnType<typeof useMotionValue<number>>
}

export default function TripleEstiloSection({ moveX, moveY }: Props) {
  const springConfig = { stiffness: 100, damping: 30 }
  const bgX = useSpring(useTransform(moveX, (v) => v * 30), springConfig)
  const bgY = useSpring(useTransform(moveY, (v) => v * 30), springConfig)

  return (
    <section className="relative w-full h-screen snap-start overflow-hidden flex items-end">
      {/* Fondo con paralaje */}
      <motion.img
        src={IMG}
        alt="Triple Estilo"
        style={{ x: bgX, y: bgY, scale: 1.12 }}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay  */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

      {/* Contenido anclado al fondo */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-36 md:pb-48">
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          {/* Etiqueta promo */}
          <span
            className="inline-block bg-shoe-orange/90 text-white font-black text-xs tracking-[0.2em] uppercase px-5 py-2 rounded-full mb-6"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            PROMOCIÓN ESPECIAL
          </span>

          {/* Título gigante */}
          <h2
            className="text-white font-black italic text-5xl md:text-[140px] leading-[0.8] mb-6 drop-shadow-2xl"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            TRIPLE
            <br />
            <span className="text-shoe-yellow uppercase">ESTILO</span>
          </h2>

          {/* Subtítulo */}
          <p
            className="text-white/90 font-bold text-lg md:text-xl max-w-lg mb-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            PROMOCIÓN 2X1 — el ahorro que pisas fuerte.{' '}
            <span className="text-shoe-yellow">Lleva tres pares y paga 2.</span>
          </p>

          {/* Botón */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            className="group flex items-center gap-3 bg-shoe-orange text-white font-black text-sm tracking-[0.15em] uppercase px-10 py-4 rounded-full cursor-pointer border-0 transition-all duration-300 hover:bg-shoe-yellow hover:text-black"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            COMPRAR AHORA
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
