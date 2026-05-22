import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { XCircle, RotateCcw, MessageCircle } from 'lucide-react'

export default function CheckoutFallo() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6 py-20">
      <div className="max-w-md w-full">

        {/* Icono */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <div className="w-28 h-28 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <XCircle size={56} className="text-red-400" />
          </div>
        </motion.div>

        {/* Texto */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="text-center mb-8"
        >
          <p className="text-red-400 font-black text-xs tracking-[0.3em] uppercase mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            Pago no completado
          </p>
          <h1 className="text-white font-black text-4xl md:text-5xl leading-none mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
            ALGO SALIÓ MAL
          </h1>
          <p className="text-white/40 text-sm leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
            No pudimos procesar tu pago. No se realizó ningún cargo.
            Puedes intentarlo de nuevo o contactarnos por WhatsApp.
          </p>
        </motion.div>

        {/* Causas comunes */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-8"
        >
          <p className="text-white/60 font-bold text-sm mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Posibles causas:
          </p>
          <ul className="flex flex-col gap-2">
            {[
              'Fondos insuficientes en la tarjeta',
              'Datos de pago incorrectos',
              'Tarjeta no habilitada para compras online',
              'Sesión de pago expirada',
            ].map((causa, i) => (
              <li key={i} className="flex items-start gap-2 text-white/40 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                <span className="text-red-400/60 mt-0.5">•</span>
                {causa}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Botones */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="flex flex-col gap-3"
        >
          <button
            onClick={() => navigate('/checkout')}
            className="flex items-center justify-center gap-2 w-full bg-shoe-yellow text-black font-black text-sm tracking-widest uppercase py-4 rounded-full border-0 cursor-pointer hover:bg-shoe-orange hover:text-white transition-all"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            <RotateCcw size={16} />
            INTENTAR DE NUEVO
          </button>
          <a
            href="https://wa.me/5841236506?text=Hola%2C+tuve+un+problema+con+mi+pago+en+Zapateria+La+21"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full border-2 border-[#25D366]/40 text-[#25D366] font-bold text-sm py-4 rounded-full no-underline hover:bg-[#25D366]/10 transition-all"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <MessageCircle size={16} />
            Pedir ayuda por WhatsApp
          </a>
          <button
            onClick={() => navigate('/catalogo')}
            className="text-white/30 hover:text-white/60 text-sm font-bold transition-colors bg-transparent border-0 cursor-pointer py-2"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Volver al catálogo
          </button>
        </motion.div>

      </div>
    </div>
  )
}
