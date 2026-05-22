import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen snap-start overflow-hidden flex items-center justify-center">
      {/* Video de fondo — sin overlay para mantener color completo */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="https://bismrhwimuntpawgrdsa.supabase.co/storage/v1/object/public/VIDEOS%20WEB/heronike.mp4"
      />

      {/* Gradiente sutil solo en esquinas para legibilidad de texto */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

      {/* Contenido */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-start justify-center h-full pt-20">

        {/* Nombre de la marca */}
        <motion.p
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-white font-black text-4xl md:text-5xl drop-shadow-[0_4px_15px_rgba(0,0,0,0.8)] mb-4"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Zapateria la 21
        </motion.p>

        {/* Títulos gigantes */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
          className="mb-6"
        >
          <h1
            className="ondas-textured text-[60px] md:text-[120px] font-black leading-[0.8] block"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            DESCANSO
          </h1>
          <h1
            className="ondas-textured text-[60px] md:text-[120px] font-black leading-[0.8] block"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            A TUS PIES
          </h1>
        </motion.div>

        {/* Badge inclinado */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotate: -3 }}
          animate={{ scale: 1, opacity: 1, rotate: -2 }}
          transition={{ duration: 0.7, delay: 0.45, type: 'spring', stiffness: 200 }}
          className="bg-white text-black px-5 py-2 rounded-sm mb-8 inline-block"
        >
          <span
            className="font-black text-sm md:text-base tracking-[0.2em] uppercase"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            NIKE. AIRBOND INFINITO.
          </span>
        </motion.div>

        {/* Botón CTA */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          whileHover={{ scale: 1.04 }}
          className="group flex items-center gap-3 bg-gradient-to-r from-shoe-orange to-shoe-yellow text-black font-black text-sm md:text-base tracking-[0.15em] uppercase px-8 py-4 rounded-full cursor-pointer border-0"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          EXPLORAR MODELOS
          <ArrowRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-2"
          />
        </motion.button>
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="animate-bounce-slow w-[2px] h-12 bg-gradient-to-b from-shoe-yellow to-transparent rounded-full" />
      </div>
    </section>
  )
}
