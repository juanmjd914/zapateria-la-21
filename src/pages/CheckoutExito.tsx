import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { CheckCircle, ShoppingBag, ArrowRight, Package } from 'lucide-react'
import { useCartStore } from '../store/cartStore'

interface PedidoGuardado {
  items: { product: { brand: string; name: string; price: number; img: string }; size: string; quantity: number }[]
  comprador: { nombre: string; email: string; telefono: string }
  total: number
  preference_id: string
}

export default function CheckoutExito() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { clearCart } = useCartStore()
  const [pedido, setPedido] = useState<PedidoGuardado | null>(null)

  const paymentId      = searchParams.get('payment_id')
  const status         = searchParams.get('status')
  const externalRef    = searchParams.get('external_reference')

  useEffect(() => {
    // Limpiar carrito tras pago exitoso
    clearCart()

    // Recuperar datos del pedido guardado
    const saved = localStorage.getItem('ultimo_pedido')
    if (saved) {
      try { setPedido(JSON.parse(saved)) } catch {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6 py-20">
      <div className="max-w-lg w-full">

        {/* Icono animado */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <div className="w-28 h-28 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
              <CheckCircle size={56} className="text-green-400" />
            </div>
            {/* Ping */}
            <span className="absolute inset-0 rounded-full bg-green-500/20 animate-ping" />
          </div>
        </motion.div>

        {/* Título */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="text-center mb-8"
        >
          <p className="text-green-400 font-black text-xs tracking-[0.3em] uppercase mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            ¡Pago confirmado!
          </p>
          <h1 className="text-white font-black text-4xl md:text-5xl leading-none mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
            ¡GRACIAS{pedido?.comprador?.nombre ? `, ${pedido.comprador.nombre.split(' ')[0].toUpperCase()}` : ''}!
          </h1>
          <p className="text-white/40 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
            Tu pedido fue recibido y está siendo procesado.
            {pedido?.comprador?.email && (
              <> Te enviaremos una confirmación a <span className="text-white/70">{pedido.comprador.email}</span>.</>
            )}
          </p>
        </motion.div>

        {/* Tarjeta de resumen */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-6"
        >
          {/* Referencia */}
          <div className="flex items-center gap-3 mb-5">
            <Package size={18} className="text-shoe-yellow" />
            <span className="text-white font-black text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Detalles del pedido
            </span>
          </div>

          {paymentId && (
            <div className="flex justify-between text-sm mb-2">
              <span className="text-white/40" style={{ fontFamily: 'Inter, sans-serif' }}>ID de pago</span>
              <span className="text-white/70 font-mono text-xs">{paymentId}</span>
            </div>
          )}
          {externalRef && (
            <div className="flex justify-between text-sm mb-2">
              <span className="text-white/40" style={{ fontFamily: 'Inter, sans-serif' }}>Referencia</span>
              <span className="text-white/70 font-mono text-xs">{externalRef}</span>
            </div>
          )}
          {status && (
            <div className="flex justify-between text-sm mb-4">
              <span className="text-white/40" style={{ fontFamily: 'Inter, sans-serif' }}>Estado</span>
              <span className="text-green-400 font-bold text-xs uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>{status}</span>
            </div>
          )}

          {/* Productos */}
          {pedido?.items && pedido.items.length > 0 && (
            <>
              <div className="border-t border-white/10 pt-4 flex flex-col gap-3">
                {pedido.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <img
                      src={item.product.img}
                      alt={item.product.name}
                      className="w-12 h-12 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-bold truncate" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {item.product.brand} {item.product.name}
                      </p>
                      <p className="text-white/30 text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
                        T.{item.size} × {item.quantity}
                      </p>
                    </div>
                    <span className="text-shoe-yellow font-black text-sm shrink-0" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      ${item.product.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 pt-4 mt-4 flex justify-between items-baseline">
                <span className="text-white font-black" style={{ fontFamily: 'Poppins, sans-serif' }}>Total pagado</span>
                <span className="text-shoe-yellow font-black text-2xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  ${pedido.total}
                </span>
              </div>
            </>
          )}
        </motion.div>

        {/* Próximos pasos */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="bg-shoe-yellow/5 border border-shoe-yellow/20 rounded-2xl p-4 mb-8"
        >
          <p className="text-shoe-yellow font-bold text-sm mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
            ¿Qué sigue?
          </p>
          <p className="text-white/50 text-xs leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
            Nos pondremos en contacto contigo para coordinar el envío.
            Si tienes dudas, escríbenos por WhatsApp al <span className="text-white/70">+(58) 412-365-06</span>.
          </p>
        </motion.div>

        {/* Botones */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <button
            onClick={() => navigate('/catalogo')}
            className="flex-1 flex items-center justify-center gap-2 bg-shoe-yellow text-black font-black text-sm tracking-widest uppercase py-4 rounded-full border-0 cursor-pointer hover:bg-shoe-orange hover:text-white transition-all"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            <ShoppingBag size={16} />
            SEGUIR COMPRANDO
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex-1 flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white font-black text-sm tracking-widest uppercase py-4 rounded-full cursor-pointer hover:bg-white/10 transition-all"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            INICIO
            <ArrowRight size={16} />
          </button>
        </motion.div>

      </div>
    </div>
  )
}
