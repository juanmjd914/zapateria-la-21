import { motion } from 'motion/react'

const brands = ['NIKE', 'ADIDAS', 'CONVERSE', 'PUMA', 'REEBOK', 'VANS', 'NEW BALANCE', 'JORDAN']

// Duplicamos para el loop infinito
const track = [...brands, ...brands, ...brands]

export default function MarcasSection() {
  return (
    <section className="relative w-full snap-start bg-black py-20 overflow-hidden border-y border-white/10">

      {/* Título */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-14 px-6"
      >
        <span
          className="inline-block text-white/40 font-black text-xs tracking-[0.4em] uppercase mb-4"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Las mejores marcas del mundo
        </span>
        <h2
          className="text-white font-black text-4xl md:text-6xl leading-none"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          MARCAS QUE
          <br />
          <span className="text-shoe-yellow">MANEJAMOS</span>
        </h2>
      </motion.div>

      {/* Marquee fila 1 — izquierda a derecha */}
      <div className="relative overflow-hidden mb-6">
        {/* Gradiente izquierdo */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        {/* Gradiente derecho */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <div
          className="flex gap-10 w-max"
          style={{ animation: 'marquee-left 25s linear infinite' }}
        >
          {track.map((brand, i) => (
            <div
              key={i}
              className="flex items-center gap-10 shrink-0"
            >
              <span
                className={`font-black text-3xl md:text-4xl tracking-tighter whitespace-nowrap transition-colors duration-200 hover:text-shoe-yellow cursor-default ${
                  i % 3 === 0 ? 'text-white' : i % 3 === 1 ? 'text-white/30' : 'text-shoe-orange/70'
                }`}
                style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.03em' }}
              >
                {brand}
              </span>
              <span className="text-shoe-yellow/40 text-2xl select-none">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee fila 2 — derecha a izquierda */}
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <div
          className="flex gap-10 w-max"
          style={{ animation: 'marquee-right 30s linear infinite' }}
        >
          {[...track].reverse().map((brand, i) => (
            <div key={i} className="flex items-center gap-10 shrink-0">
              <span
                className={`font-black text-2xl md:text-3xl tracking-tighter whitespace-nowrap ${
                  i % 2 === 0 ? 'text-white/20' : 'text-shoe-yellow/50'
                }`}
                style={{ fontFamily: 'Poppins, sans-serif', fontStyle: 'italic' }}
              >
                {brand}
              </span>
              <span className="text-white/20 text-xl select-none">◆</span>
            </div>
          ))}
        </div>
      </div>

      {/* Keyframes inyectados en un style tag */}
      <style>{`
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        @keyframes marquee-right {
          0%   { transform: translateX(-33.33%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  )
}
