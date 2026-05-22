import { useState } from 'react'
import { motion } from 'motion/react'
import { ShoppingBag, Star } from 'lucide-react'
import SizePickerModal, { type PickerProduct } from './SizePickerModal'

const products = [
  {
    id: 1,
    brand: 'NIKE',
    name: 'Air Max 270',
    price: 28,
    oldPrice: 35,
    tag: 'MÁS VENDIDO',
    tagColor: 'bg-shoe-yellow text-black',
    img: 'https://bismrhwimuntpawgrdsa.supabase.co/storage/v1/object/public/VIDEOS%20WEB/1.jpg',
    rating: 5,
  },
  {
    id: 2,
    brand: 'ADIDAS',
    name: 'Ultraboost 22',
    price: 32,
    oldPrice: null,
    tag: 'NUEVO',
    tagColor: 'bg-shoe-orange text-white',
    img: 'https://bismrhwimuntpawgrdsa.supabase.co/storage/v1/object/public/VIDEOS%20WEB/2.jpg',
    rating: 4,
  },
  {
    id: 3,
    brand: 'CONVERSE',
    name: 'Chuck Taylor All Star',
    price: 15,
    oldPrice: 20,
    tag: 'OFERTA',
    tagColor: 'bg-red-500 text-white',
    img: 'https://bismrhwimuntpawgrdsa.supabase.co/storage/v1/object/public/VIDEOS%20WEB/3.jpg',
    rating: 5,
  },
  {
    id: 4,
    brand: 'PUMA',
    name: 'Suede Classic XXI',
    price: 18,
    oldPrice: null,
    tag: 'EXCLUSIVO',
    tagColor: 'bg-shoe-purple text-white',
    img: 'https://bismrhwimuntpawgrdsa.supabase.co/storage/v1/object/public/VIDEOS%20WEB/4.jpg',
    rating: 4,
  },
  {
    id: 5,
    brand: 'JORDAN',
    name: 'Air Jordan 1 Retro',
    price: 45,
    oldPrice: 55,
    tag: 'PREMIUM',
    tagColor: 'bg-shoe-yellow text-black',
    img: 'https://bismrhwimuntpawgrdsa.supabase.co/storage/v1/object/public/VIDEOS%20WEB/1.jpg',
    rating: 5,
  },
  {
    id: 6,
    brand: 'VANS',
    name: 'Old Skool Pro',
    price: 22,
    oldPrice: null,
    tag: 'CLÁSICO',
    tagColor: 'bg-white text-black',
    img: 'https://bismrhwimuntpawgrdsa.supabase.co/storage/v1/object/public/VIDEOS%20WEB/2.jpg',
    rating: 4,
  },
]

export default function NuevosModelos() {
  const [pickingProduct, setPickingProduct] = useState<PickerProduct | null>(null)

  const openPicker = (p: typeof products[number]) =>
    setPickingProduct({ id: p.id, brand: p.brand, name: p.name, price: p.price, oldPrice: p.oldPrice, img: p.img, tag: p.tag })

  return (
    <section className="relative w-full snap-start bg-black py-20 px-6 md:px-12 overflow-hidden">
      {/* Fondo sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,194,34,0.05)_0%,_transparent_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Encabezado */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
        >
          <div>
            <span
              className="inline-block text-shoe-orange font-black text-xs tracking-[0.3em] uppercase mb-3"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Temporada 2026
            </span>
            <h2
              className="text-white font-black text-5xl md:text-7xl leading-none"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              NUEVA
              <br />
              <span className="text-shoe-yellow">LLEGADA</span>
            </h2>
          </div>

          <motion.button
            whileHover={{ scale: 1.04 }}
            className="self-start md:self-auto border-2 border-white/20 text-white font-bold text-sm tracking-widest uppercase px-7 py-3 rounded-full bg-transparent hover:border-shoe-yellow hover:text-shoe-yellow transition-all duration-300 cursor-pointer"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Ver todo el catálogo →
          </motion.button>
        </motion.div>

        {/* Grid de productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden cursor-default transition-all duration-300 hover:border-shoe-yellow/40 hover:bg-white/8"
            >
              {/* Imagen */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay suave en hover */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />

                {/* Tag */}
                <span
                  className={`absolute top-4 left-4 ${p.tagColor} font-black text-[11px] tracking-widest uppercase px-3 py-1 rounded-full`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {p.tag}
                </span>

                {/* Botón rápido que aparece en hover */}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => openPicker(p)}
                  className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-shoe-yellow text-black p-3 rounded-full border-0 cursor-pointer"
                  title="Agregar al carrito"
                >
                  <ShoppingBag size={18} />
                </motion.button>
              </div>

              {/* Info */}
              <div className="p-5">
                <p
                  className="text-shoe-orange font-black text-xs tracking-[0.2em] uppercase mb-1"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {p.brand}
                </p>
                <h3
                  className="text-white font-bold text-lg mb-2 leading-tight"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {p.name}
                </h3>

                {/* Estrellas */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      size={13}
                      className={j < p.rating ? 'text-shoe-yellow fill-shoe-yellow' : 'text-white/20'}
                    />
                  ))}
                </div>

                {/* Precio + botón */}
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span
                      className="text-shoe-yellow font-black text-2xl"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      ${p.price}
                    </span>
                    {p.oldPrice && (
                      <span
                        className="text-white/30 text-sm line-through"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        ${p.oldPrice}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => openPicker(p)}
                    className="bg-white/10 text-white font-bold text-xs tracking-wide px-4 py-2 rounded-full border border-white/10 hover:bg-shoe-yellow hover:text-black hover:border-shoe-yellow transition-all duration-300 cursor-pointer"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Comprar
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal selector de talla */}
      <SizePickerModal
        product={pickingProduct}
        onClose={() => setPickingProduct(null)}
      />
    </section>
  )
}
