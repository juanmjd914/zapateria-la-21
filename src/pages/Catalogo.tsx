import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ShoppingBag, Star, Search, SlidersHorizontal, X } from 'lucide-react'
import SizePickerModal, { type PickerProduct } from '../components/SizePickerModal'
import ProductSkeleton from '../components/ProductSkeleton'
import { useSEO } from '../hooks/useSEO'
import { supabase } from '../lib/supabase'

const CATEGORIES = ['Todos', 'Deportivo', 'Casual', 'Clásico', 'Running', 'Urbano']
const BRANDS = ['Todas', 'Nike', 'Adidas', 'Converse', 'Puma', 'Jordan', 'Vans', 'Reebok', 'New Balance']

// ── Datos locales de respaldo (se usan si Supabase no está configurado) ───────
const FALLBACK_PRODUCTS = [
  { id: 1,  brand: 'Nike',        name: 'Air Max 270',           price: 28, old_price: 35,   category: 'Running',    img: 'https://bismrhwimuntpawgrdsa.supabase.co/storage/v1/object/public/VIDEOS%20WEB/1.jpg', tag: 'MÁS VENDIDO', tag_color: 'bg-shoe-yellow text-black', rating: 5 },
  { id: 2,  brand: 'Adidas',      name: 'Ultraboost 22',         price: 32, old_price: null,  category: 'Running',    img: 'https://bismrhwimuntpawgrdsa.supabase.co/storage/v1/object/public/VIDEOS%20WEB/2.jpg', tag: 'NUEVO',       tag_color: 'bg-shoe-orange text-white', rating: 4 },
  { id: 3,  brand: 'Converse',    name: 'Chuck Taylor All Star', price: 15, old_price: 20,    category: 'Clásico',    img: 'https://bismrhwimuntpawgrdsa.supabase.co/storage/v1/object/public/VIDEOS%20WEB/3.jpg', tag: 'OFERTA',      tag_color: 'bg-red-500 text-white',     rating: 5 },
  { id: 4,  brand: 'Puma',        name: 'Suede Classic XXI',     price: 18, old_price: null,  category: 'Urbano',     img: 'https://bismrhwimuntpawgrdsa.supabase.co/storage/v1/object/public/VIDEOS%20WEB/4.jpg', tag: 'EXCLUSIVO',   tag_color: 'bg-shoe-purple text-white', rating: 4 },
  { id: 5,  brand: 'Jordan',      name: 'Air Jordan 1 Retro',    price: 45, old_price: 55,    category: 'Casual',     img: 'https://bismrhwimuntpawgrdsa.supabase.co/storage/v1/object/public/VIDEOS%20WEB/1.jpg', tag: 'PREMIUM',     tag_color: 'bg-shoe-yellow text-black', rating: 5 },
  { id: 6,  brand: 'Vans',        name: 'Old Skool Pro',         price: 22, old_price: null,  category: 'Casual',     img: 'https://bismrhwimuntpawgrdsa.supabase.co/storage/v1/object/public/VIDEOS%20WEB/2.jpg', tag: 'CLÁSICO',     tag_color: 'bg-white text-black',       rating: 4 },
  { id: 7,  brand: 'Nike',        name: 'React Infinity Run',    price: 35, old_price: 42,    category: 'Running',    img: 'https://bismrhwimuntpawgrdsa.supabase.co/storage/v1/object/public/VIDEOS%20WEB/3.jpg', tag: 'NUEVO',       tag_color: 'bg-shoe-orange text-white', rating: 5 },
  { id: 8,  brand: 'Adidas',      name: 'Forum Low',             price: 20, old_price: null,  category: 'Urbano',     img: 'https://bismrhwimuntpawgrdsa.supabase.co/storage/v1/object/public/VIDEOS%20WEB/4.jpg', tag: 'TENDENCIA',   tag_color: 'bg-shoe-yellow text-black', rating: 4 },
  { id: 9,  brand: 'Reebok',      name: 'Classic Leather',       price: 16, old_price: 22,    category: 'Clásico',    img: 'https://bismrhwimuntpawgrdsa.supabase.co/storage/v1/object/public/VIDEOS%20WEB/1.jpg', tag: 'OFERTA',      tag_color: 'bg-red-500 text-white',     rating: 4 },
  { id: 10, brand: 'New Balance', name: 'Fresh Foam 1080',       price: 38, old_price: null,  category: 'Running',    img: 'https://bismrhwimuntpawgrdsa.supabase.co/storage/v1/object/public/VIDEOS%20WEB/2.jpg', tag: 'PREMIUM',     tag_color: 'bg-shoe-yellow text-black', rating: 5 },
  { id: 11, brand: 'Converse',    name: 'Run Star Hike',         price: 19, old_price: 25,    category: 'Casual',     img: 'https://bismrhwimuntpawgrdsa.supabase.co/storage/v1/object/public/VIDEOS%20WEB/3.jpg', tag: 'NUEVO',       tag_color: 'bg-shoe-orange text-white', rating: 4 },
  { id: 12, brand: 'Puma',        name: 'RS-X Reinvention',      price: 24, old_price: null,  category: 'Deportivo',  img: 'https://bismrhwimuntpawgrdsa.supabase.co/storage/v1/object/public/VIDEOS%20WEB/4.jpg', tag: 'EXCLUSIVO',   tag_color: 'bg-shoe-purple text-white', rating: 3 },
]

type Product = typeof FALLBACK_PRODUCTS[number]

export default function Catalogo() {
  const [products, setProducts]             = useState<Product[]>(FALLBACK_PRODUCTS)
  const [loading, setLoading]               = useState(true)
  const [activeCat, setActiveCat]           = useState('Todos')
  const [activeBrand, setActiveBrand]       = useState('Todas')
  const [search, setSearch]                 = useState('')
  const [filterOpen, setFilterOpen]         = useState(false)
  const [pickingProduct, setPickingProduct] = useState<PickerProduct | null>(null)

  useSEO({ title: 'Catálogo', description: 'Explora nuestro catálogo completo de zapatillas Nike, Adidas, Jordan, Converse y más. Envío a todo Venezuela.' })

  // Cargar productos directamente desde Supabase (no necesita el servidor Express)
  useEffect(() => {
    supabase
      .from('productos')
      .select('*')
      .eq('active', true)
      .order('id')
      .then(({ data, error }) => {
        if (!error && Array.isArray(data) && data.length > 0) {
          setProducts(data)
        }
        // Si falla, queda con FALLBACK_PRODUCTS (datos hardcodeados)
        setLoading(false)
      })
  }, [])

  const openPicker = (p: Product) =>
    setPickingProduct({ id: p.id, brand: p.brand, name: p.name, price: p.price, oldPrice: p.old_price, img: p.img, tag: p.tag })

  const filtered = products.filter(p => {
    const matchCat    = activeCat   === 'Todos' || p.category === activeCat
    const matchBrand  = activeBrand === 'Todas' || p.brand    === activeBrand
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                        p.brand.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchBrand && matchSearch
  })

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <span className="text-shoe-orange font-black text-xs tracking-[0.3em] uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>
            Temporada 2026
          </span>
          <h1 className="text-white font-black text-5xl md:text-7xl leading-none mt-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
            CATÁLOGO<br /><span className="text-shoe-yellow">COMPLETO</span>
          </h1>
        </motion.div>

        {/* Barra de búsqueda + filtros */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex gap-3 mb-8"
        >
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Buscar modelo o marca..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full pl-11 pr-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-shoe-yellow/60 transition-colors"
              style={{ fontFamily: 'Inter, sans-serif' }}
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white bg-transparent border-0 cursor-pointer">
                <X size={16} />
              </button>
            )}
          </div>
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className={`flex items-center gap-2 px-5 py-3 rounded-full border font-bold text-sm transition-all cursor-pointer ${filterOpen ? 'bg-shoe-yellow text-black border-shoe-yellow' : 'bg-white/5 text-white border-white/10 hover:border-shoe-yellow/60'}`}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <SlidersHorizontal size={16} />
            <span className="hidden md:inline">Filtros</span>
          </button>
        </motion.div>

        {/* Panel de filtros */}
        <AnimatePresence>
          {filterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-8"
            >
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-5">
                <div>
                  <p className="text-white/40 text-xs tracking-widest uppercase mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>Categoría</p>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map(c => (
                      <button
                        key={c}
                        onClick={() => setActiveCat(c)}
                        className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all cursor-pointer border ${activeCat === c ? 'bg-shoe-yellow text-black border-shoe-yellow' : 'bg-transparent text-white/60 border-white/10 hover:border-white/30'}`}
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >{c}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-white/40 text-xs tracking-widest uppercase mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>Marca</p>
                  <div className="flex flex-wrap gap-2">
                    {BRANDS.map(b => (
                      <button
                        key={b}
                        onClick={() => setActiveBrand(b)}
                        className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all cursor-pointer border ${activeBrand === b ? 'bg-shoe-orange text-white border-shoe-orange' : 'bg-transparent text-white/60 border-white/10 hover:border-white/30'}`}
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >{b}</button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Skeleton de carga */}
        {loading && <ProductSkeleton count={8} />}

        {/* Count */}
        {!loading && (
          <p className="text-white/40 text-sm mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
            {filtered.length} producto{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
          </p>
        )}

        {/* Grid */}
        {!loading && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                whileHover={{ y: -6 }}
                className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-shoe-yellow/40 transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
                  <span className={`absolute top-3 left-3 ${p.tag_color} font-black text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full`} style={{ fontFamily: 'Inter, sans-serif' }}>{p.tag}</span>
                  <button
                    onClick={() => openPicker(p)}
                    className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-shoe-yellow text-black p-2.5 rounded-full border-0 cursor-pointer"
                  >
                    <ShoppingBag size={16} />
                  </button>
                </div>
                <div className="p-4">
                  <p className="text-shoe-orange font-black text-[11px] tracking-[0.2em] uppercase mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>{p.brand}</p>
                  <h3 className="text-white font-bold text-base mb-2 leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>{p.name}</h3>
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} size={11} className={j < p.rating ? 'text-shoe-yellow fill-shoe-yellow' : 'text-white/20'} />
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-shoe-yellow font-black text-xl" style={{ fontFamily: 'Poppins, sans-serif' }}>${p.price}</span>
                      {p.old_price && <span className="text-white/30 text-sm line-through">${p.old_price}</span>}
                    </div>
                    <button
                      onClick={() => openPicker(p)}
                      className="bg-white/10 text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/10 hover:bg-shoe-yellow hover:text-black hover:border-shoe-yellow transition-all cursor-pointer"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      Comprar
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>}

        {filtered.length === 0 && !loading && (
          <div className="text-center py-24">
            <p className="text-white/30 text-6xl mb-4">👟</p>
            <p className="text-white/50 font-bold text-xl" style={{ fontFamily: 'Poppins, sans-serif' }}>No encontramos ese modelo</p>
            <p className="text-white/30 text-sm mt-2" style={{ fontFamily: 'Inter, sans-serif' }}>Intenta con otro nombre o categoría</p>
          </div>
        )}
      </div>

      {/* Modal selector de talla */}
      <SizePickerModal
        product={pickingProduct}
        onClose={() => setPickingProduct(null)}
      />
    </div>
  )
}
