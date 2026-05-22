import { motion } from 'motion/react'
import { Award, ShoppingBag, Star, ArrowRight } from 'lucide-react'
import { useSEO } from '../hooks/useSEO'

const stats = [
  { value: '15+', label: 'Años de experiencia', icon: Award },
  { value: '8+',  label: 'Marcas originales',   icon: Star },
  { value: '500+',label: 'Clientes felices',    icon: ShoppingBag },
  { value: '100%',label: 'Productos originales',icon: Award },
]

const valores = [
  { title: 'Originalidad',  desc: 'Cada par que vendemos tiene certificación original. Sin copias, sin imitaciones. Nunca.' },
  { title: 'Estilo',        desc: 'Cubrimos todas las tendencias. Desde el clásico que no falla hasta el modelo más buscado del año.' },
  { title: 'Servicio',      desc: 'Te ayudamos a encontrar el par perfecto. Atención personalizada antes y después de tu compra.' },
  { title: 'Precio Justo',  desc: 'Precios accesibles sin sacrificar calidad. Pagos en cuotas con Cashea disponibles.' },
]

const equipo = [
  { nombre: 'Carlos Mendoza',    rol: 'Fundador & Director',     img: 'https://bismrhwimuntpawgrdsa.supabase.co/storage/v1/object/public/VIDEOS%20WEB/1.jpg' },
  { nombre: 'Alejandro Pérez',   rol: 'Comprador & Tendencias',  img: 'https://bismrhwimuntpawgrdsa.supabase.co/storage/v1/object/public/VIDEOS%20WEB/2.jpg' },
  { nombre: 'María González',    rol: 'Atención al Cliente',     img: 'https://bismrhwimuntpawgrdsa.supabase.co/storage/v1/object/public/VIDEOS%20WEB/3.jpg' },
]

export default function Nosotros() {
  useSEO({ title: 'Nosotros', description: 'Más de 15 años vistiendo los pies de Venezuela. Conoce la historia de Zapateria la 21.' })
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">

      {/* Hero de la página */}
      <div className="relative overflow-hidden mb-20">
        <img
          src="https://bismrhwimuntpawgrdsa.supabase.co/storage/v1/object/public/VIDEOS%20WEB/4.jpg"
          alt="Zapateria la 21"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-shoe-orange font-black text-xs tracking-[0.3em] uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>
              Nuestra historia
            </span>
            <h1 className="text-white font-black text-5xl md:text-7xl leading-none mt-2 mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              QUIÉNES<br /><span className="text-shoe-yellow">SOMOS</span>
            </h1>
            <p className="text-white/70 text-lg max-w-2xl leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              Zapateria la 21 nació en 2026 con una misión simple: llevar las mejores marcas del mundo a tus pies, con autenticidad garantizada y precios justos. Lo que empezó como un pequeño local se convirtió en el referente de calzado de la región.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Stats */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.85, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:border-shoe-yellow/30 transition-all"
            >
              <p className="text-shoe-yellow font-black text-4xl md:text-5xl mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>{s.value}</p>
              <p className="text-white/50 text-xs font-bold uppercase tracking-wider" style={{ fontFamily: 'Inter, sans-serif' }}>{s.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Historia */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-shoe-orange font-black text-xs tracking-[0.3em] uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>Nuestra historia</span>
            <h2 className="text-white font-black text-4xl md:text-5xl leading-tight mt-2 mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Desde la pasión<br /><span className="text-shoe-yellow">hasta el par perfecto</span>
            </h2>
            <div className="space-y-4 text-white/60 text-base leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              <p>Todo empezó con la convicción de que en nuestra región merecíamos acceso a las mejores marcas sin pagar precios exagerados ni arriesgarnos a productos falsos.</p>
              <p>Construimos relaciones directas con distribuidores oficiales de Nike, Adidas, Converse, Jordan y más, garantizando que cada par que llevas a casa es 100% auténtico.</p>
              <p>Hoy somos el punto de referencia para quienes saben que un buen par de zapatos no es un gasto, es una inversión en tu estilo y comodidad.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative"
          >
            <img
              src="https://bismrhwimuntpawgrdsa.supabase.co/storage/v1/object/public/VIDEOS%20WEB/3.jpg"
              alt="Tienda"
              className="w-full h-80 object-cover rounded-3xl"
            />
            <div className="absolute -bottom-4 -right-4 bg-shoe-yellow text-black font-black text-sm px-6 py-3 rounded-2xl rotate-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Estilo Salvaje<br />desde 2026
            </div>
          </motion.div>
        </div>

        {/* Valores */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <div className="text-center mb-10">
            <span className="text-shoe-orange font-black text-xs tracking-[0.3em] uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>Lo que nos define</span>
            <h2 className="text-white font-black text-4xl md:text-5xl mt-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
              NUESTROS <span className="text-shoe-yellow">VALORES</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {valores.map((v, i) => (
              <motion.div
                key={i}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-shoe-yellow/30 hover:bg-white/8 transition-all"
              >
                <div className="w-10 h-10 bg-shoe-yellow/10 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-shoe-yellow font-black text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>{i + 1}</span>
                </div>
                <h3 className="text-white font-black text-lg mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>{v.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Equipo */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <div className="text-center mb-10">
            <span className="text-shoe-orange font-black text-xs tracking-[0.3em] uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>Las personas detrás</span>
            <h2 className="text-white font-black text-4xl md:text-5xl mt-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
              NUESTRO <span className="text-shoe-yellow">EQUIPO</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {equipo.map((m, i) => (
              <motion.div
                key={i}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                whileHover={{ y: -4 }}
                className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-shoe-yellow/30 transition-all"
              >
                <div className="h-48 overflow-hidden">
                  <img src={m.img} alt={m.nombre} className="w-full h-full object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="text-white font-black text-lg mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>{m.nombre}</h3>
                  <p className="text-shoe-yellow text-sm font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>{m.rol}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-shoe-orange/20 via-shoe-yellow/10 to-shoe-orange/20 border border-shoe-yellow/20 rounded-3xl p-12"
        >
          <h3 className="text-white font-black text-3xl md:text-4xl mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
            ¿Listo para tu próximo par?
          </h3>
          <p className="text-white/50 mb-6 max-w-sm mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
            Explora nuestro catálogo completo o contáctanos directamente.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/catalogo" className="inline-flex items-center justify-center gap-2 bg-shoe-yellow text-black font-black text-sm tracking-widest uppercase px-8 py-4 rounded-full no-underline hover:bg-shoe-orange hover:text-white transition-all" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Ver catálogo <ArrowRight size={16} />
            </a>
            <a href="/contacto" className="inline-flex items-center justify-center gap-2 border-2 border-white/20 text-white font-black text-sm tracking-widest uppercase px-8 py-4 rounded-full no-underline hover:border-shoe-yellow hover:text-shoe-yellow transition-all" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Contactarnos
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
