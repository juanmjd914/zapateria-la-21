import { motion } from 'motion/react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Clock, MessageCircle, RefreshCw } from 'lucide-react'

export default function CheckoutPendiente() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const paymentId   = searchParams.get('payment_id')
  const externalRef = searchParams.get('external_reference')

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6 py-20">
      <div className="max-w-md w-full">

        {/* Icono animado */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <div className="w-28 h-28 rounded-full bg-shoe-yellow/10 border border-shoe-yellow/20 flex items-center justify-center">
              <Clock size={56} className="text-shoe-yellow" />
            </div>
            {/* Ping suave */}
            <span className="absolute inset-0 rounded-full bg-shoe-yellow/10 animate-ping" style={{ animationDuration: '2s' }} />
          </div>
        </motion.div>

        {/* Texto */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="text-center mb-8"
        >
          <p className="text-shoe-yellow font-black text-xs tracking-[0.3em] uppercase mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            En proceso
          </p>
          <h1 className="text-white font-black text-4xl md:text-5xl leading-none mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
            PAGO PENDIENTE
          </h1>
          <p className="text-white/40 text-sm leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
            Tu pago está siendo procesado. Esto puede tardar unos minutos.
            Te notificaremos cuando se confirme.
          </p>
        </motion.div>

        {/* Referencia */}
        {(paymentId || externalRef) && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-6"
          >
            <p className="text-white/60 font-bold text-sm mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Información de seguimiento
            </p>
            {paymentId && (
              <div className="flex justify-between text-sm mb-2">
                <span className="text-white/40" style={{ fontFamily: 'Inter, sans-serif' }}>ID de pago</span>
                <span className="text-white/70 font-mono text-xs">{paymentId}</span>
              </div>
            )}
            {externalRef && (
              <div className="flex justify-between text-sm">
                <span className="text-white/40" style={{ fontFamily: 'Inter, sans-serif' }}>Referencia</span>
                <span className="text-white/70 font-mono text-xs">{externalRef}</span>
              </div>
            )}
          </motion.div>
        )}

        {/* Info adicional */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-shoe-yellow/5 border border-shoe-yellow/20 rounded-2xl p-4 mb-8"
        >
          <p className="text-shoe-yellow font-bold text-sm mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
            ¿Pagaste en efectivo?
          </p>
          <p className="text-white/50 text-xs leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
            Si pagaste en un punto de cobro (Rapipago, Pago Fácil, etc.),
            la confirmación puede demorar hasta 2 horas hábiles.
          </p>
        </motion.div>

        {/* Botones */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col gap-3"
        >
          <a
            href="https://wa.me/5841236506?text=Hola%2C+realic%C3%A9+un+pago+pendiente+en+Zapateria+La+21+y+quiero+confirmar+mi+pedido"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-shoe-yellow text-black font-black text-sm tracking-widest uppercase py-4 rounded-full no-underline hover:bg-shoe-orange hover:text-white transition-all"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            <MessageCircle size={16} />
            CONFIRMAR POR WHATSAPP
          </a>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center justify-center gap-2 w-full bg-white/5 border border-white/10 text-white font-bold text-sm py-4 rounded-full cursor-pointer hover:bg-white/10 transition-all"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <RefreshCw size={15} />
            Verificar estado
          </button>
          <button
            onClick={() => navigate('/')}
            className="text-white/30 hover:text-white/60 text-sm font-bold transition-colors bg-transparent border-0 cursor-pointer py-2"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Volver al inicio
          </button>
        </motion.div>

      </div>
    </div>
  )
}
