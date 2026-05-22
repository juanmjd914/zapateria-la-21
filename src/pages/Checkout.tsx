import { useState } from 'react'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { ShoppingBag, Trash2, ArrowLeft, CreditCard, Lock, Loader2 } from 'lucide-react'
import { useCartStore } from '../store/cartStore'

interface Comprador {
  nombre:    string
  email:     string
  telefono:  string
  direccion: string
  ciudad:    string
}

const ORIGIN = window.location.origin

export default function Checkout() {
  const { items, totalPrice, totalItems, removeItem } = useCartStore()
  const navigate  = useNavigate()
  const precio    = totalPrice()
  const cantidad  = totalItems()

  const [comprador, setComprador] = useState<Comprador>({
    nombre: '', email: '', telefono: '', direccion: '', ciudad: '',
  })
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComprador(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handlePagar = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!items.length) return
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/crear-preferencia', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          comprador,
          back_urls: {
            success: `${ORIGIN}/checkout/exito`,
            failure: `${ORIGIN}/checkout/fallo`,
            pending: `${ORIGIN}/checkout/pendiente`,
          },
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Error al conectar con MercadoPago')
      }

      const data = await res.json()

      // En sandbox usamos sandbox_init_point, en producción init_point
      const urlPago = data.sandbox_init_point || data.init_point
      if (!urlPago) throw new Error('No se recibió URL de pago')

      // Guardar datos del pedido antes de redirigir
      localStorage.setItem('ultimo_pedido', JSON.stringify({
        items, comprador, total: precio, preference_id: data.id,
      }))

      window.location.href = urlPago
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  if (!items.length) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag size={64} className="text-white/10 mx-auto mb-4" />
          <p className="text-white font-black text-2xl mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Tu carrito está vacío
          </p>
          <button
            onClick={() => navigate('/catalogo')}
            className="mt-4 bg-shoe-yellow text-black font-black px-6 py-3 rounded-full border-0 cursor-pointer"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Ver catálogo
          </button>
        </div>
      </div>
    )
  }

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-shoe-yellow/60 transition-colors"

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-4 mb-10"
        >
          <button
            onClick={() => navigate(-1)}
            className="text-white/40 hover:text-white transition-colors bg-transparent border-0 cursor-pointer"
          >
            <ArrowLeft size={22} />
          </button>
          <div>
            <span className="text-shoe-orange font-black text-xs tracking-[0.3em] uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>
              Paso final
            </span>
            <h1 className="text-white font-black text-4xl md:text-5xl leading-none" style={{ fontFamily: 'Poppins, sans-serif' }}>
              CHECKOUT
            </h1>
          </div>
        </motion.div>

        <form onSubmit={handlePagar}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

            {/* ── Formulario (3/5) ── */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-3 flex flex-col gap-6"
            >
              {/* Datos del comprador */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                <h2 className="text-white font-black text-xl mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Tus datos
                </h2>
                <p className="text-white/40 text-sm mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                  MercadoPago los usará para tu recibo
                </p>

                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-white/40 text-xs tracking-wider uppercase block mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Nombre completo *
                      </label>
                      <input
                        name="nombre" required value={comprador.nombre} onChange={handleChange}
                        placeholder="Tu nombre" className={inputClass}
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      />
                    </div>
                    <div>
                      <label className="text-white/40 text-xs tracking-wider uppercase block mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Teléfono *
                      </label>
                      <input
                        name="telefono" required value={comprador.telefono} onChange={handleChange}
                        placeholder="+(58) 4XX XXX XXXX" className={inputClass}
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-white/40 text-xs tracking-wider uppercase block mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Email *
                    </label>
                    <input
                      name="email" type="email" required value={comprador.email} onChange={handleChange}
                      placeholder="tu@email.com" className={inputClass}
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-white/40 text-xs tracking-wider uppercase block mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Dirección
                      </label>
                      <input
                        name="direccion" value={comprador.direccion} onChange={handleChange}
                        placeholder="Av. Principal, Casa 5" className={inputClass}
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      />
                    </div>
                    <div>
                      <label className="text-white/40 text-xs tracking-wider uppercase block mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Ciudad
                      </label>
                      <input
                        name="ciudad" value={comprador.ciudad} onChange={handleChange}
                        placeholder="Caracas" className={inputClass}
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Info de pago */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CreditCard size={20} className="text-shoe-yellow" />
                  <h2 className="text-white font-black text-xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Método de pago
                  </h2>
                </div>
                <div className="flex items-center gap-3 bg-[#009ee3]/10 border border-[#009ee3]/20 rounded-2xl p-4">
                  {/* Logo MercadoPago */}
                  <div className="w-10 h-10 bg-[#009ee3] rounded-xl flex items-center justify-center text-white font-black text-lg shrink-0">
                    MP
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      MercadoPago
                    </p>
                    <p className="text-white/40 text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Tarjeta, transferencia, efectivo · Pago seguro
                    </p>
                  </div>
                  <Lock size={16} className="text-shoe-yellow ml-auto" />
                </div>
                <p className="text-white/30 text-xs mt-3 flex items-center gap-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <Lock size={11} /> Serás redirigido a MercadoPago para completar el pago de forma segura.
                </p>
              </div>
            </motion.div>

            {/* ── Resumen del pedido (2/5) ── */}
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="lg:col-span-2 flex flex-col gap-4"
            >
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sticky top-28">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-white font-black text-xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Tu pedido
                  </h2>
                  <span className="text-white/40 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {cantidad} {cantidad === 1 ? 'ítem' : 'ítems'}
                  </span>
                </div>

                {/* Lista de productos */}
                <div className="flex flex-col gap-3 mb-5 max-h-64 overflow-y-auto pr-1" style={{ scrollbarWidth: 'none' }}>
                  {items.map(item => (
                    <div
                      key={`${item.product.id}-${item.size}`}
                      className="flex gap-3 items-center"
                    >
                      <img
                        src={item.product.img}
                        alt={item.product.name}
                        className="w-14 h-14 rounded-xl object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-white/40 text-[10px] font-black tracking-widest uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {item.product.brand}
                        </p>
                        <p className="text-white text-sm font-bold truncate" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {item.product.name}
                        </p>
                        <p className="text-white/30 text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
                          T.{item.size} × {item.quantity}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-shoe-yellow font-black text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          ${item.product.price * item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeItem(item.product.id, item.size)}
                          className="text-white/20 hover:text-red-400 transition-colors bg-transparent border-0 cursor-pointer"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totales */}
                <div className="border-t border-white/10 pt-4 flex flex-col gap-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40" style={{ fontFamily: 'Inter, sans-serif' }}>Subtotal</span>
                    <span className="text-white font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>${precio}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40" style={{ fontFamily: 'Inter, sans-serif' }}>Envío</span>
                    <span className="text-shoe-yellow font-bold text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>A coordinar</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-2 mt-1 border-t border-white/10">
                    <span className="text-white font-black" style={{ fontFamily: 'Poppins, sans-serif' }}>Total</span>
                    <span className="text-shoe-yellow font-black text-2xl" style={{ fontFamily: 'Poppins, sans-serif' }}>${precio}</span>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 bg-red-500/10 border border-red-500/20 rounded-xl p-3"
                  >
                    <p className="text-red-400 text-sm font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>
                      ⚠️ {error}
                    </p>
                  </motion.div>
                )}

                {/* Botón pagar */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={!loading ? { scale: 1.02 } : {}}
                  whileTap={!loading ? { scale: 0.98 } : {}}
                  className={`mt-4 flex items-center justify-center gap-3 w-full font-black text-sm tracking-widest uppercase py-4 rounded-full border-0 cursor-pointer transition-all ${
                    loading
                      ? 'bg-white/10 text-white/40 cursor-not-allowed'
                      : 'bg-[#009ee3] text-white hover:bg-[#007ec0]'
                  }`}
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      CONECTANDO...
                    </>
                  ) : (
                    <>
                      <CreditCard size={18} />
                      PAGAR CON MERCADOPAGO
                    </>
                  )}
                </motion.button>

                <p className="text-white/20 text-[11px] text-center mt-3 flex items-center justify-center gap-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <Lock size={10} /> Pago 100% seguro con MercadoPago
                </p>
              </div>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  )
}
