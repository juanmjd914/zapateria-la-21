import { useState } from 'react'
import { motion } from 'motion/react'
import { Phone, Clock, MapPin, Send, Camera, MessageSquare, PlayCircle, Share2 } from 'lucide-react'
import { useSEO } from '../hooks/useSEO'

const WA_URL = `https://wa.me/584123650 6`.replace(/\s/g, '')

const socials = [
  { icon: Camera,       label: 'Instagram',  href: '#' },
  { icon: MessageSquare,label: 'Twitter',    href: '#' },
  { icon: Share2,       label: 'Facebook',   href: '#' },
  { icon: PlayCircle,   label: 'YouTube',    href: '#' },
]

export default function Contacto() {
  useSEO({ title: 'Contacto', description: 'Contáctanos por WhatsApp, teléfono o formulario. Estamos en Caracas, Venezuela.' })
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', mensaje: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí irá la integración real (Supabase / EmailJS)
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setForm({ nombre: '', email: '', telefono: '', mensaje: '' })
  }

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-shoe-yellow/60 transition-colors"

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <span className="text-shoe-orange font-black text-xs tracking-[0.3em] uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>
            Estamos para ayudarte
          </span>
          <h1 className="text-white font-black text-5xl md:text-7xl leading-none mt-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
            CONTÁCTANOS<br /><span className="text-shoe-yellow">HOY</span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Formulario */}
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <h2 className="text-white font-black text-2xl mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Envíanos un mensaje
              </h2>
              <p className="text-white/40 text-sm mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
                Te respondemos en menos de 24 horas
              </p>

              {sent ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-12"
                >
                  <p className="text-5xl mb-4">✅</p>
                  <p className="text-white font-black text-xl" style={{ fontFamily: 'Poppins, sans-serif' }}>¡Mensaje enviado!</p>
                  <p className="text-white/50 text-sm mt-2" style={{ fontFamily: 'Inter, sans-serif' }}>Te contactamos pronto</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-white/40 text-xs tracking-wider uppercase block mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>Nombre</label>
                      <input name="nombre" value={form.nombre} onChange={handleChange} required placeholder="Tu nombre" className={inputClass} style={{ fontFamily: 'Inter, sans-serif' }} />
                    </div>
                    <div>
                      <label className="text-white/40 text-xs tracking-wider uppercase block mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>Teléfono</label>
                      <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="+(58) 4XX XXX XXXX" className={inputClass} style={{ fontFamily: 'Inter, sans-serif' }} />
                    </div>
                  </div>

                  <div>
                    <label className="text-white/40 text-xs tracking-wider uppercase block mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>Email</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="tu@email.com" className={inputClass} style={{ fontFamily: 'Inter, sans-serif' }} />
                  </div>

                  <div>
                    <label className="text-white/40 text-xs tracking-wider uppercase block mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>Mensaje</label>
                    <textarea
                      name="mensaje"
                      value={form.mensaje}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Cuéntanos qué modelo buscas, tu talla, cualquier pregunta..."
                      className={inputClass + ' resize-none'}
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-3 bg-shoe-yellow text-black font-black text-sm tracking-widest uppercase px-8 py-4 rounded-full border-0 cursor-pointer hover:bg-shoe-orange hover:text-white transition-all"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    <Send size={16} />
                    ENVIAR MENSAJE
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Info de contacto */}
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex flex-col gap-6"
          >

            {/* WhatsApp destacado */}
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-5 bg-[#25D366]/10 border border-[#25D366]/30 rounded-3xl p-6 no-underline hover:bg-[#25D366]/20 transition-all"
            >
              <div className="w-14 h-14 bg-[#25D366] rounded-2xl flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-7 h-7">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div>
                <p className="text-[#25D366] font-black text-xs tracking-widest uppercase mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>WhatsApp directo</p>
                <p className="text-white font-black text-2xl" style={{ fontFamily: 'Poppins, sans-serif' }}>+(58) 412 365 06</p>
                <p className="text-white/40 text-sm mt-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>Respuesta inmediata</p>
              </div>
            </a>

            {/* Info cards */}
            {[
              { icon: Phone,  title: 'Teléfono',  info: '+(58) 412 365 06',       sub: 'Lunes a Sábado 9am–7pm' },
              { icon: MapPin, title: 'Ubicación', info: 'Caracas, Venezuela',      sub: 'También hacemos delivery' },
              { icon: Clock,  title: 'Horario',   info: 'Lun–Sáb: 9am – 7pm',    sub: 'Dom: 10am – 3pm' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-5 bg-white/5 border border-white/10 rounded-2xl p-5">
                <div className="w-12 h-12 bg-shoe-yellow/10 rounded-xl flex items-center justify-center shrink-0">
                  <item.icon size={20} className="text-shoe-yellow" />
                </div>
                <div>
                  <p className="text-white/40 text-xs tracking-widest uppercase mb-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>{item.title}</p>
                  <p className="text-white font-bold text-base" style={{ fontFamily: 'Poppins, sans-serif' }}>{item.info}</p>
                  <p className="text-white/40 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>{item.sub}</p>
                </div>
              </div>
            ))}

            {/* Redes sociales */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <p className="text-white/40 text-xs tracking-widest uppercase mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>Síguenos en redes</p>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    title={label}
                    className="flex items-center justify-center w-11 h-11 bg-white/5 border border-white/10 rounded-xl text-white/50 hover:text-shoe-yellow hover:border-shoe-yellow/40 transition-all no-underline"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mapa placeholder */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-10 rounded-3xl overflow-hidden border border-white/10 h-64 relative bg-white/5 flex items-center justify-center"
        >
          <div className="absolute inset-0 opacity-30">
            <img src="https://bismrhwimuntpawgrdsa.supabase.co/storage/v1/object/public/VIDEOS%20WEB/4.jpg" alt="Mapa" className="w-full h-full object-cover" />
          </div>
          <div className="relative z-10 text-center">
            <MapPin size={32} className="text-shoe-yellow mx-auto mb-2" />
            <p className="text-white font-black text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>Caracas, Venezuela</p>
            <p className="text-white/50 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>Delivery disponible a toda la ciudad</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
