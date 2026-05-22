import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { useSEO } from '../hooks/useSEO'

const brands = [
  {
    name: 'NIKE',
    slogan: 'Just Do It',
    desc: 'La marca deportiva más icónica del mundo. Innovación constante en cada suela, cada costura, cada par.',
    color: 'from-orange-500/20 to-transparent',
    accent: 'text-orange-400',
    products: 48,
    img: 'https://bismrhwimuntpawgrdsa.supabase.co/storage/v1/object/public/VIDEOS%20WEB/1.jpg',
    featured: ['Air Max 270', 'React Infinity Run', 'Air Force 1'],
  },
  {
    name: 'ADIDAS',
    slogan: 'Impossible Is Nothing',
    desc: 'Tres rayas que marcaron generaciones. Del campo de fútbol a las calles, Adidas nunca pasa de moda.',
    color: 'from-blue-500/20 to-transparent',
    accent: 'text-blue-400',
    products: 35,
    img: 'https://bismrhwimuntpawgrdsa.supabase.co/storage/v1/object/public/VIDEOS%20WEB/2.jpg',
    featured: ['Ultraboost 22', 'Forum Low', 'Stan Smith'],
  },
  {
    name: 'CONVERSE',
    slogan: 'Shoes Are Boring. Wear Sneakers.',
    desc: 'El Chuck Taylor lleva más de 100 años pisando fuerte. Un clásico que nunca envejece.',
    color: 'from-red-500/20 to-transparent',
    accent: 'text-red-400',
    products: 22,
    img: 'https://bismrhwimuntpawgrdsa.supabase.co/storage/v1/object/public/VIDEOS%20WEB/3.jpg',
    featured: ['Chuck Taylor All Star', 'Run Star Hike', 'One Star'],
  },
  {
    name: 'JORDAN',
    slogan: 'Fly High',
    desc: 'La línea del mejor jugador de baloncesto de todos los tiempos. Coleccionables, icónicos, eternos.',
    color: 'from-shoe-yellow/20 to-transparent',
    accent: 'text-shoe-yellow',
    products: 18,
    img: 'https://bismrhwimuntpawgrdsa.supabase.co/storage/v1/object/public/VIDEOS%20WEB/4.jpg',
    featured: ['Air Jordan 1 Retro', 'Jordan 3', 'Jordan 11'],
  },
  {
    name: 'PUMA',
    slogan: 'Forever Faster',
    desc: 'Velocidad y estilo alemán. Desde el atletismo hasta la moda urbana, Puma domina el paso.',
    color: 'from-yellow-500/20 to-transparent',
    accent: 'text-yellow-400',
    products: 27,
    img: 'https://bismrhwimuntpawgrdsa.supabase.co/storage/v1/object/public/VIDEOS%20WEB/1.jpg',
    featured: ['Suede Classic XXI', 'RS-X Reinvention', 'Future Rider'],
  },
  {
    name: 'VANS',
    slogan: 'Off The Wall',
    desc: 'Nacidos en el skateboarding de California. Auténticos, rebeldes, y con un estilo que no se discute.',
    color: 'from-sky-500/20 to-transparent',
    accent: 'text-sky-400',
    products: 20,
    img: 'https://bismrhwimuntpawgrdsa.supabase.co/storage/v1/object/public/VIDEOS%20WEB/2.jpg',
    featured: ['Old Skool Pro', 'Sk8-Hi', 'Authentic'],
  },
]

export default function Marcas() {
  useSEO({ title: 'Marcas', description: 'Conoce todas las marcas que trabajamos: Nike, Adidas, Jordan, Converse, Vans, Puma y más. Productos 100% originales.' })
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <span className="text-shoe-orange font-black text-xs tracking-[0.3em] uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>
            100% originales
          </span>
          <h1 className="text-white font-black text-5xl md:text-7xl leading-none mt-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
            NUESTRAS<br /><span className="text-shoe-yellow">MARCAS</span>
          </h1>
          <p className="text-white/50 max-w-lg mx-auto mt-4 text-base" style={{ fontFamily: 'Inter, sans-serif' }}>
            Trabajamos directamente con las marcas más reconocidas del mundo. Todos nuestros productos son 100% originales y con garantía.
          </p>
        </motion.div>

        {/* Grid de marcas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {brands.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-300"
            >
              {/* Imagen de fondo */}
              <div className="relative h-52 overflow-hidden">
                <img src={brand.img} alt={brand.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className={`absolute inset-0 bg-gradient-to-r ${brand.color} via-black/60 to-black/80`} />

                {/* Nombre gigante superpuesto */}
                <div className="absolute inset-0 flex items-center px-8">
                  <div>
                    <h2
                      className={`font-black text-5xl md:text-6xl leading-none ${brand.accent} drop-shadow-2xl`}
                      style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.03em' }}
                    >
                      {brand.name}
                    </h2>
                    <p className="text-white/60 font-bold text-sm italic mt-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      "{brand.slogan}"
                    </p>
                  </div>
                </div>

                {/* Badge de productos */}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1">
                  <span className="text-shoe-yellow font-black text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {brand.products} modelos
                  </span>
                </div>
              </div>

              {/* Contenido inferior */}
              <div className="p-6">
                <p className="text-white/60 text-sm leading-relaxed mb-5" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {brand.desc}
                </p>

                {/* Modelos destacados */}
                <div className="mb-5">
                  <p className="text-white/30 text-xs tracking-widest uppercase mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Modelos destacados</p>
                  <div className="flex flex-wrap gap-2">
                    {brand.featured.map(f => (
                      <span
                        key={f}
                        className="bg-white/5 border border-white/10 text-white/70 text-xs px-3 py-1 rounded-full"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="group/btn flex items-center gap-2 text-shoe-yellow font-bold text-sm hover:gap-3 transition-all bg-transparent border-0 cursor-pointer p-0" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Ver colección completa
                  <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA inferior */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 text-center bg-white/5 border border-white/10 rounded-3xl p-10"
        >
          <p className="text-shoe-yellow font-black text-xs tracking-[0.3em] uppercase mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>¿No encuentras tu marca?</p>
          <h3 className="text-white font-black text-3xl md:text-4xl mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Contáctanos y la conseguimos
          </h3>
          <p className="text-white/50 max-w-sm mx-auto mb-6 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
            Si buscas un modelo específico que no ves en nuestro catálogo, escríbenos. Trabajamos para conseguirte lo que necesitas.
          </p>
          <a
            href="https://wa.me/5841236506"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-shoe-yellow text-black font-black text-sm tracking-widest uppercase px-8 py-4 rounded-full no-underline hover:bg-shoe-orange hover:text-white transition-all duration-300"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Escribir por WhatsApp <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </div>
  )
}
