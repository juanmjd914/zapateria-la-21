import { motion, useMotionValue, useTransform, useSpring } from 'motion/react'
import { Award, Zap, Star } from 'lucide-react'

const IMG = 'https://bismrhwimuntpawgrdsa.supabase.co/storage/v1/object/public/VIDEOS%20WEB/2.jpg'

const cards = [
  {
    icon: Award,
    title: 'ZAPATOS SELECCIONADOS',
    desc: 'MARCAS 100% ORIGINALES.',
  },
  {
    icon: Zap,
    title: 'NIKE',
    desc: 'LOS MÁS VENDIDOS.',
  },
  {
    icon: Star,
    title: 'VUELTA A CLASES',
    desc: 'REEBOK URBANO.',
  },
]

interface Props {
  moveX: ReturnType<typeof useMotionValue<number>>
  moveY: ReturnType<typeof useMotionValue<number>>
}

export default function CalidadSection({ moveX, moveY }: Props) {
  const springConfig = { stiffness: 100, damping: 30 }
  const bgX = useSpring(useTransform(moveX, (v) => v * 30), springConfig)
  const bgY = useSpring(useTransform(moveY, (v) => v * 30), springConfig)

  return (
    <section className="relative w-full h-screen snap-start overflow-hidden flex items-center">
      {/* Fondo con paralaje */}
      <motion.img
        src={IMG}
        alt="Calidad Premium"
        style={{ x: bgX, y: bgY, scale: 1.12 }}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-l from-black/85 via-black/50 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

      {/* Contenido */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-end">
        <motion.div
          initial={{ x: 60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="max-w-xl w-full"
        >
          {/* Etiqueta superior */}
          <span
            className="inline-block bg-shoe-orange text-white font-black text-xs tracking-[0.2em] uppercase px-5 py-2 rounded-full mb-6"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            MATERIA PRIMA ARROLLADORA
          </span>

          {/* Título */}
          <h2
            className="text-white font-black text-5xl md:text-7xl leading-[0.9] mb-10"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            CALIDAD
            <br />
            <span className="text-shoe-yellow">PREMIUM</span>
          </h2>

          {/* Grid de características */}
          <div className="grid grid-cols-3 gap-4">
            {cards.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={i}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ y: -6 }}
                className="group bg-black/40 backdrop-blur-xl rounded-[2rem] border border-white/10 p-5 flex flex-col items-center text-center cursor-default transition-all duration-300 hover:bg-shoe-yellow"
              >
                <Icon
                  size={28}
                  className="mb-3 text-shoe-yellow transition-colors duration-300 group-hover:text-black"
                />
                <p
                  className="text-white font-black text-xs leading-tight mb-2 transition-colors duration-300 group-hover:text-black"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {title}
                </p>
                <p
                  className="text-white/70 text-[11px] leading-snug transition-colors duration-300 group-hover:text-black/80"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
