import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, ShoppingBag, Ruler } from 'lucide-react'
import { useCartStore } from '../store/cartStore'

export interface PickerProduct {
  id:       number
  brand:    string
  name:     string
  price:    number
  oldPrice?: number | null
  img:      string
  tag?:     string
}

interface Props {
  product: PickerProduct | null
  onClose: () => void
}

const SIZES = [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46]

export default function SizePickerModal({ product, onClose }: Props) {
  const { addItem } = useCartStore()
  const [selected, setSelected] = useState<number | null>(null)
  const [added, setAdded]       = useState(false)

  const handleAdd = () => {
    if (!product || !selected) return
    addItem(
      { id: product.id, brand: product.brand, name: product.name, price: product.price, img: product.img, tag: product.tag },
      String(selected)
    )
    setAdded(true)
    setTimeout(() => {
      setAdded(false)
      setSelected(null)
      onClose()
    }, 900)
  }

  const handleClose = () => {
    setSelected(null)
    setAdded(false)
    onClose()
  }

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Backdrop */}
          <motion.div
            key="sp-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[80]"
            onClick={handleClose}
          />

          {/* Panel — bottom sheet en móvil, centrado en desktop */}
          <motion.div
            key="sp-panel"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0,      opacity: 1 }}
            exit={{ y: '100%',    opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            className="fixed bottom-0 left-0 right-0 md:inset-0 md:flex md:items-center md:justify-center z-[90] pointer-events-none"
          >
            <div
              className="pointer-events-auto w-full md:w-[460px] bg-[#0e0e0e] border border-white/10 rounded-t-3xl md:rounded-3xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* Header con imagen */}
              <div className="relative h-40 overflow-hidden">
                <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-black/40 to-transparent" />

                {/* Cerrar */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 w-9 h-9 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white/70 hover:text-white border-0 cursor-pointer transition-colors"
                >
                  <X size={18} />
                </button>

                {/* Info producto */}
                <div className="absolute bottom-4 left-5 right-14">
                  <p className="text-shoe-orange font-black text-[10px] tracking-[0.25em] uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {product.brand}
                  </p>
                  <h3 className="text-white font-black text-xl leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {product.name}
                  </h3>
                </div>
              </div>

              {/* Cuerpo */}
              <div className="px-5 pt-5 pb-6">

                {/* Precio */}
                <div className="flex items-baseline gap-2 mb-5">
                  <span className="text-shoe-yellow font-black text-3xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    ${product.price}
                  </span>
                  {product.oldPrice && (
                    <span className="text-white/30 text-base line-through" style={{ fontFamily: 'Inter, sans-serif' }}>
                      ${product.oldPrice}
                    </span>
                  )}
                </div>

                {/* Selector de talla */}
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-white/60 text-xs font-black tracking-widest uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Selecciona tu talla (EU)
                    </p>
                    <a
                      href="https://wa.me/5841236506?text=Hola%2C+necesito+ayuda+para+saber+mi+talla"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-shoe-yellow/70 hover:text-shoe-yellow text-[11px] font-bold no-underline transition-colors"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      <Ruler size={11} />
                      Guía de tallas
                    </a>
                  </div>

                  <div className="grid grid-cols-6 gap-2">
                    {SIZES.map(size => (
                      <motion.button
                        key={size}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSelected(size)}
                        className={`
                          h-11 rounded-xl text-sm font-black border cursor-pointer transition-all duration-200
                          ${selected === size
                            ? 'bg-shoe-yellow text-black border-shoe-yellow shadow-[0_0_16px_rgba(255,194,34,0.4)]'
                            : 'bg-white/5 text-white/70 border-white/10 hover:border-white/30 hover:text-white'
                          }
                        `}
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        {size}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Botón agregar */}
                <motion.button
                  whileHover={selected ? { scale: 1.02 } : {}}
                  whileTap={selected  ? { scale: 0.97 } : {}}
                  onClick={handleAdd}
                  disabled={!selected || added}
                  className={`
                    w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-black text-sm tracking-widest uppercase border-0 transition-all duration-300
                    ${added
                      ? 'bg-green-500 text-white cursor-default'
                      : selected
                        ? 'bg-shoe-yellow text-black cursor-pointer hover:bg-shoe-orange hover:text-white'
                        : 'bg-white/5 text-white/20 cursor-not-allowed border border-white/5'
                    }
                  `}
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {added ? (
                    <>
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        ✓
                      </motion.span>
                      ¡AÑADIDO AL CARRITO!
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={17} />
                      {selected ? `AÑADIR TALLA ${selected}` : 'ELIGE UNA TALLA'}
                    </>
                  )}
                </motion.button>

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
