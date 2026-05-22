import { motion } from 'motion/react'
import { Camera, MessageSquare, Share2, PlayCircle } from 'lucide-react'

const IMG = 'https://bismrhwimuntpawgrdsa.supabase.co/storage/v1/object/public/VIDEOS%20WEB/4.jpg'

const deportivos = [
  { nombre: 'Adidas desde', precio: '$12', desc: 'Air, urbano, casual y todo uso.' },
  { nombre: 'Nike Air Max', precio: '$25', desc: 'El clásico que no falla.' },
  { nombre: 'Converse Chuck', precio: '$15', desc: 'Para cada estilo y ocasión.' },
  { nombre: 'Puma Suede', precio: '$18', desc: 'Estilo urbano garantizado.' },
]

const especiales = [
  { nombre: 'Air Max 97', precio: '$35', desc: 'En modelos urbanos y clásicos.' },
  { nombre: 'Jordan 1 Retro', precio: '$45', desc: 'Icónico, coleccionable.' },
  { nombre: 'Yeezy Boost', precio: '$40', desc: 'Confort de otro nivel.' },
]

const socials = [
  { icon: Camera, label: 'Instagram' },
  { icon: MessageSquare, label: 'Twitter' },
  { icon: Share2, label: 'Facebook' },
  { icon: PlayCircle, label: 'Youtube' },
]

export default function CasheaSection() {
  return (
    <section className="relative w-full min-h-screen snap-start overflow-hidden flex flex-col justify-between">
      {/* Fondo */}
      <img
        src={IMG}
        alt="Cashea"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />

      {/* Grid principal */}
      <div className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

        {/* Columna izquierda — Deportivos */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h3
            className="font-black italic text-3xl md:text-4xl text-shoe-orange mb-8"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Deportivos
          </h3>
          <ul className="flex flex-col gap-6">
            {deportivos.map((item, i) => (
              <li key={i} className="border-b border-white/10 pb-4">
                <div className="flex justify-between items-baseline mb-1">
                  <span
                    className="text-white font-bold text-base md:text-lg transition-colors duration-200 hover:text-shoe-yellow cursor-default"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {item.nombre}
                  </span>
                  <span
                    className="text-shoe-yellow font-black text-lg"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {item.precio}
                  </span>
                </div>
                <p
                  className="text-white/60 text-sm"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {item.desc}
                </p>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Columna central — Cinemática */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="flex flex-col items-center justify-center text-center py-8"
        >
          <p
            className="text-shoe-orange font-bold text-2xl md:text-3xl mb-4 italic"
            style={{ fontFamily: 'Dancing Script, cursive' }}
          >
            Reserva el tuyo ya
          </p>
          <div className="ondas-textured text-7xl md:text-[100px] font-black leading-[0.85] drop-shadow-[0_20px_50px_rgba(0,0,0,1)]"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            CANCELA
            <br />
            EN
            <br />
            CUOTAS
          </div>
        </motion.div>

        {/* Columna derecha — Especiales */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="flex flex-col items-end"
        >
          <h3
            className="font-black italic text-3xl md:text-4xl text-shoe-orange mb-8"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Especiales
          </h3>
          <ul className="flex flex-col gap-6 w-full">
            {especiales.map((item, i) => (
              <li key={i} className="border-b border-white/10 pb-4 text-right">
                <div className="flex justify-between items-baseline mb-1 flex-row-reverse">
                  <span
                    className="text-white font-bold text-base md:text-lg transition-colors duration-200 hover:text-shoe-yellow cursor-default"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {item.nombre}
                  </span>
                  <span
                    className="text-shoe-yellow font-black text-lg"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {item.precio}
                  </span>
                </div>
                <p
                  className="text-white/60 text-sm"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {item.desc}
                </p>
              </li>
            ))}
          </ul>

          {/* Badge giratorio */}
          <div
            className="mt-8 bg-shoe-yellow text-black font-black text-sm tracking-widest uppercase px-6 py-3 rotate-2 rounded-sm"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Fresh Steps / &amp; Style
          </div>
        </motion.div>
      </div>

      {/* Footer de sección */}
      <div className="relative z-10 w-full border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Izquierda — Redes */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <p
              className="text-white/80 font-bold text-sm tracking-widest uppercase"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Sigue la ruta del estilo
            </p>
            <div className="flex gap-4">
              {socials.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  title={label}
                  className="text-white/60 hover:text-shoe-yellow transition-colors duration-200 cursor-pointer bg-transparent border-0"
                >
                  <Icon size={22} />
                </button>
              ))}
            </div>
          </div>

          {/* Derecha — Delivery */}
          <div className="text-center md:text-right">
            <p
              className="text-white/70 font-bold text-sm uppercase tracking-widest mb-1"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Delivery Order:
            </p>
            <p
              className="text-shoe-yellow text-2xl md:text-3xl font-black"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              +(58) 412 365 06
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
