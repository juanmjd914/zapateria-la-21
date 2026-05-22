import { motion, AnimatePresence } from 'motion/react'
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, clearCart, totalItems, totalPrice } =
    useCartStore()
  const navigate = useNavigate()

  const total   = totalItems()
  const precio  = totalPrice()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
            onClick={closeCart}
          />

          {/* Panel */}
          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <ShoppingBag size={22} className="text-shoe-yellow" />
                <span
                  className="text-white font-black text-lg"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Carrito
                </span>
                {total > 0 && (
                  <span className="bg-shoe-yellow text-black font-black text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {total}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-white/30 hover:text-red-400 text-xs font-bold transition-colors bg-transparent border-0 cursor-pointer flex items-center gap-1"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    <Trash2 size={13} /> Vaciar
                  </button>
                )}
                <button
                  onClick={closeCart}
                  className="text-white/50 hover:text-white transition-colors bg-transparent border-0 cursor-pointer p-1"
                >
                  <X size={22} />
                </button>
              </div>
            </div>

            {/* Contenido */}
            <div className="flex-1 overflow-y-auto px-6 py-4" style={{ scrollbarWidth: 'none' }}>
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-full text-center gap-4"
                >
                  <ShoppingBag size={56} className="text-white/10" />
                  <p className="text-white/30 font-black text-xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Tu carrito está vacío
                  </p>
                  <p className="text-white/20 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Agrega modelos desde el catálogo
                  </p>
                  <button
                    onClick={closeCart}
                    className="mt-2 bg-shoe-yellow text-black font-black text-sm tracking-widest uppercase px-6 py-3 rounded-full border-0 cursor-pointer hover:bg-shoe-orange hover:text-white transition-all"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    Ver catálogo
                  </button>
                </motion.div>
              ) : (
                <div className="flex flex-col gap-4">
                  <AnimatePresence mode="popLayout">
                    {items.map(item => (
                      <motion.div
                        key={`${item.product.id}-${item.size}`}
                        layout
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 30, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="flex gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-white/20 transition-all"
                      >
                        {/* Imagen */}
                        <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                          <img
                            src={item.product.img}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p
                            className="text-shoe-orange font-black text-[10px] tracking-[0.2em] uppercase"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            {item.product.brand}
                          </p>
                          <p
                            className="text-white font-bold text-sm leading-tight mt-0.5 truncate"
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                          >
                            {item.product.name}
                          </p>
                          <p
                            className="text-white/30 text-xs mt-0.5"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            Talla: <span className="text-white/50">{item.size}</span>
                          </p>

                          <div className="flex items-center justify-between mt-3">
                            {/* Controles de cantidad */}
                            <div className="flex items-center gap-2 bg-white/5 rounded-full px-1 py-0.5">
                              <button
                                onClick={() =>
                                  updateQuantity(item.product.id, item.size, item.quantity - 1)
                                }
                                className="w-6 h-6 flex items-center justify-center text-white/60 hover:text-white rounded-full hover:bg-white/10 transition-all bg-transparent border-0 cursor-pointer"
                              >
                                <Minus size={12} />
                              </button>
                              <span
                                className="text-white font-black text-sm w-5 text-center"
                                style={{ fontFamily: 'Poppins, sans-serif' }}
                              >
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.product.id, item.size, item.quantity + 1)
                                }
                                className="w-6 h-6 flex items-center justify-center text-white/60 hover:text-white rounded-full hover:bg-white/10 transition-all bg-transparent border-0 cursor-pointer"
                              >
                                <Plus size={12} />
                              </button>
                            </div>

                            {/* Precio + eliminar */}
                            <div className="flex items-center gap-3">
                              <span
                                className="text-shoe-yellow font-black text-base"
                                style={{ fontFamily: 'Poppins, sans-serif' }}
                              >
                                ${(item.product.price * item.quantity).toFixed(0)}
                              </span>
                              <button
                                onClick={() => removeItem(item.product.id, item.size)}
                                className="text-white/20 hover:text-red-400 transition-colors bg-transparent border-0 cursor-pointer"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer con total y checkout */}
            {items.length > 0 && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="px-6 py-5 border-t border-white/10 flex flex-col gap-4"
              >
                {/* Desglose */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Subtotal ({total} {total === 1 ? 'artículo' : 'artículos'})
                    </span>
                    <span className="text-white font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      ${precio.toFixed(0)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Envío
                    </span>
                    <span className="text-shoe-yellow font-bold text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
                      A coordinar
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline border-t border-white/10 pt-3 mt-1">
                    <span
                      className="text-white font-black text-base"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      Total
                    </span>
                    <span
                      className="text-shoe-yellow font-black text-2xl"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      ${precio.toFixed(0)}
                    </span>
                  </div>
                </div>

                {/* Botón checkout */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { closeCart(); navigate('/checkout') }}
                  className="flex items-center justify-center gap-3 w-full bg-shoe-yellow text-black font-black text-sm tracking-widest uppercase py-4 rounded-full border-0 cursor-pointer hover:bg-shoe-orange hover:text-white transition-all"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  PROCEDER AL PAGO
                  <ArrowRight size={16} />
                </motion.button>

                {/* WhatsApp alternativo */}
                <a
                  href={`https://wa.me/5841236506?text=Hola%2C+quiero+pedir%3A+${encodeURIComponent(
                    items.map(i => `${i.quantity}x ${i.product.brand} ${i.product.name} (T.${i.size})`).join(', ')
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full border-2 border-[#25D366]/40 text-[#25D366] font-bold text-sm py-3 rounded-full no-underline hover:bg-[#25D366]/10 transition-all"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Pedir por WhatsApp
                </a>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
