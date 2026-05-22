import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  Lock, ShoppingBag, CheckCircle, Clock, XCircle,
  RefreshCw, LogOut, TrendingUp, Package, MessageCircle,
  ChevronDown, ChevronUp, Loader2,
} from 'lucide-react'
import { useSEO } from '../hooks/useSEO'

// ─── Tipos ────────────────────────────────────────────────────────────────────
interface Pedido {
  id:                 number
  preference_id:      string | null
  payment_id:         string | null
  external_reference: string | null
  status:             'pending' | 'approved' | 'rejected' | 'in_process'
  nombre:             string | null
  email:              string | null
  telefono:           string | null
  direccion:          string | null
  ciudad:             string | null
  items:              { product: { brand: string; name: string; price: number; img: string }; size: string; quantity: number }[]
  total:              number
  created_at:         string
  updated_at:         string
}

interface Stats {
  total: number; aprobados: number; pendientes: number; rechazados: number; ingresos: number
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
  approved:   { label: 'Aprobado',   color: 'text-green-400',      bg: 'bg-green-500/10 border-green-500/20',  icon: CheckCircle },
  pending:    { label: 'Pendiente',  color: 'text-shoe-yellow',    bg: 'bg-shoe-yellow/10 border-shoe-yellow/20', icon: Clock },
  in_process: { label: 'En proceso', color: 'text-blue-400',       bg: 'bg-blue-500/10 border-blue-500/20',    icon: Clock },
  rejected:   { label: 'Rechazado',  color: 'text-red-400',        bg: 'bg-red-500/10 border-red-500/20',      icon: XCircle },
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleString('es-VE', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

// ─── Pantalla de login ────────────────────────────────────────────────────────
function PinScreen({ onSuccess }: { onSuccess: (pin: string) => void }) {
  const [pin, setPin]     = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(false)
    try {
      const res = await fetch('/api/admin/stats', {
        headers: { 'x-admin-pin': pin },
      })
      if (res.ok) {
        sessionStorage.setItem('admin_pin', pin)
        onSuccess(pin)
      } else {
        setError(true)
        setPin('')
      }
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1,   opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="w-full max-w-sm"
      >
        {/* Ícono */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 rounded-3xl bg-shoe-yellow/10 border border-shoe-yellow/20 flex items-center justify-center">
            <Lock size={36} className="text-shoe-yellow" />
          </div>
        </div>

        <h1 className="text-white font-black text-3xl text-center mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Panel Admin
        </h1>
        <p className="text-white/40 text-sm text-center mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
          Zapateria la 21
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <input
              type="password"
              placeholder="PIN de acceso"
              value={pin}
              onChange={e => setPin(e.target.value)}
              className={`w-full bg-white/5 border rounded-2xl px-5 py-4 text-white text-center text-2xl tracking-[0.4em] placeholder-white/20 focus:outline-none transition-colors ${
                error ? 'border-red-500/60' : 'border-white/10 focus:border-shoe-yellow/60'
              }`}
              style={{ fontFamily: 'Poppins, sans-serif' }}
              autoFocus
            />
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-400 text-sm text-center mt-2"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  PIN incorrecto
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          <button
            type="submit"
            disabled={!pin || loading}
            className="flex items-center justify-center gap-2 w-full bg-shoe-yellow text-black font-black text-sm tracking-widest uppercase py-4 rounded-2xl border-0 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:bg-shoe-orange hover:text-white transition-all"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Lock size={18} />}
            ENTRAR
          </button>
        </form>
      </motion.div>
    </div>
  )
}

// ─── Tarjeta de pedido ────────────────────────────────────────────────────────
function PedidoCard({ pedido }: { pedido: Pedido }) {
  const [expanded, setExpanded] = useState(false)
  const cfg = STATUS_CONFIG[pedido.status] ?? STATUS_CONFIG.pending
  const Icon = cfg.icon

  const waMsg = encodeURIComponent(
    `Hola ${pedido.nombre || ''}, te escribimos de Zapateria la 21 sobre tu pedido #${pedido.id} por $${pedido.total}.`
  )

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-colors"
    >
      {/* Cabecera */}
      <div className="p-5 flex flex-col sm:flex-row sm:items-center gap-4">
        {/* ID + fecha */}
        <div className="shrink-0">
          <p className="text-white/40 text-xs font-mono" style={{ fontFamily: 'Inter, sans-serif' }}>
            #{String(pedido.id).padStart(4, '0')}
          </p>
          <p className="text-white/30 text-xs mt-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>
            {fmtDate(pedido.created_at)}
          </p>
        </div>

        {/* Comprador */}
        <div className="flex-1 min-w-0">
          <p className="text-white font-bold text-sm truncate" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {pedido.nombre || '—'}
          </p>
          <p className="text-white/40 text-xs truncate" style={{ fontFamily: 'Inter, sans-serif' }}>
            {pedido.email || ''}{pedido.ciudad ? ` · ${pedido.ciudad}` : ''}
          </p>
        </div>

        {/* Total + estado */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-shoe-yellow font-black text-xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
            ${Number(pedido.total).toFixed(0)}
          </span>
          <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold ${cfg.bg} ${cfg.color}`}
            style={{ fontFamily: 'Inter, sans-serif' }}>
            <Icon size={12} />
            {cfg.label}
          </span>
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-2 shrink-0">
          {pedido.telefono && (
            <a
              href={`https://wa.me/${pedido.telefono.replace(/\D/g, '')}?text=${waMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center text-[#25D366] hover:bg-[#25D366]/20 transition-colors"
              title="Contactar por WhatsApp"
            >
              <MessageCircle size={15} />
            </a>
          )}
          <button
            onClick={() => setExpanded(v => !v)}
            className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>
        </div>
      </div>

      {/* Detalle expandible */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-white/10"
          >
            <div className="p-5 flex flex-col gap-4">

              {/* Productos */}
              {Array.isArray(pedido.items) && pedido.items.length > 0 && (
                <div>
                  <p className="text-white/40 text-xs tracking-widest uppercase mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Productos
                  </p>
                  <div className="flex flex-col gap-2">
                    {pedido.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <img
                          src={item.product?.img}
                          alt={item.product?.name}
                          className="w-12 h-12 rounded-xl object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-bold truncate" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            {item.product?.brand} {item.product?.name}
                          </p>
                          <p className="text-white/30 text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
                            Talla {item.size} · x{item.quantity}
                          </p>
                        </div>
                        <span className="text-shoe-yellow font-black text-sm shrink-0" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          ${(item.product?.price ?? 0) * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Info extra */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {[
                  { label: 'Teléfono',    val: pedido.telefono },
                  { label: 'Dirección',   val: pedido.direccion },
                  { label: 'Ciudad',      val: pedido.ciudad },
                  { label: 'ID de pago',  val: pedido.payment_id },
                  { label: 'Referencia',  val: pedido.external_reference },
                  { label: 'Actualizado', val: fmtDate(pedido.updated_at) },
                ].filter(r => r.val).map(row => (
                  <div key={row.label}>
                    <p className="text-white/30 text-xs mb-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>{row.label}</p>
                    <p className="text-white/70 font-mono text-xs break-all" style={{ fontFamily: 'Inter, sans-serif' }}>{row.val}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
const FILTROS = ['todos', 'approved', 'pending', 'rejected'] as const
type Filtro = typeof FILTROS[number]

const FILTRO_LABELS: Record<Filtro, string> = {
  todos:    'Todos',
  approved: 'Aprobados',
  pending:  'Pendientes',
  rejected: 'Rechazados',
}

function Dashboard({ pin, onLogout }: { pin: string; onLogout: () => void }) {
  const [pedidos, setPedidos]   = useState<Pedido[]>([])
  const [stats, setStats]       = useState<Stats | null>(null)
  const [filtro, setFiltro]     = useState<Filtro>('todos')
  const [loading, setLoading]   = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const headers = { 'x-admin-pin': pin }

  const load = useCallback(async (showRefresh = false) => {
    if (showRefresh) setRefreshing(true)
    else setLoading(true)
    try {
      const [pRes, sRes] = await Promise.all([
        fetch(`/api/admin/pedidos?status=${filtro}`, { headers }),
        fetch('/api/admin/stats', { headers }),
      ])
      if (pRes.ok) setPedidos(await pRes.json())
      if (sRes.ok) setStats(await sRes.json())
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [filtro, pin]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { load() }, [load])

  return (
    <div className="min-h-screen bg-black text-white pt-20 pb-16 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-shoe-orange font-black text-xs tracking-[0.3em] uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>
              Panel de gestión
            </p>
            <h1 className="text-white font-black text-4xl leading-none" style={{ fontFamily: 'Poppins, sans-serif' }}>
              PEDIDOS
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => load(true)}
              disabled={refreshing}
              className="flex items-center gap-2 bg-white/5 border border-white/10 text-white/60 hover:text-white text-sm font-bold px-4 py-2.5 rounded-xl cursor-pointer transition-all hover:bg-white/10"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
              <span className="hidden sm:inline">Actualizar</span>
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 bg-white/5 border border-white/10 text-white/60 hover:text-red-400 text-sm font-bold px-4 py-2.5 rounded-xl cursor-pointer transition-all hover:border-red-500/30"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </div>

        {/* Stats cards */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total pedidos', value: stats.total,      icon: Package,    color: 'text-white' },
              { label: 'Aprobados',     value: stats.aprobados,  icon: CheckCircle,color: 'text-green-400' },
              { label: 'Pendientes',    value: stats.pendientes, icon: Clock,      color: 'text-shoe-yellow' },
              { label: 'Ingresos',      value: `$${stats.ingresos.toFixed(0)}`, icon: TrendingUp, color: 'text-shoe-yellow' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.07 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-5"
              >
                <s.icon size={20} className={`${s.color} mb-3`} />
                <p className={`font-black text-2xl ${s.color}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {s.value}
                </p>
                <p className="text-white/40 text-xs mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Filtros */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {FILTROS.map(f => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap border transition-all cursor-pointer ${
                filtro === f
                  ? 'bg-shoe-yellow text-black border-shoe-yellow'
                  : 'bg-white/5 text-white/60 border-white/10 hover:border-white/30 hover:text-white'
              }`}
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {FILTRO_LABELS[f]}
            </button>
          ))}
        </div>

        {/* Lista de pedidos */}
        {loading ? (
          <div className="flex items-center justify-center py-24 gap-3 text-white/30">
            <Loader2 size={20} className="animate-spin" />
            <span style={{ fontFamily: 'Inter, sans-serif' }}>Cargando pedidos...</span>
          </div>
        ) : pedidos.length === 0 ? (
          <div className="text-center py-24">
            <ShoppingBag size={48} className="text-white/10 mx-auto mb-4" />
            <p className="text-white/30 font-bold text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Sin pedidos {filtro !== 'todos' ? `con estado "${FILTRO_LABELS[filtro]}"` : 'todavía'}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <p className="text-white/30 text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
              {pedidos.length} pedido{pedidos.length !== 1 ? 's' : ''}
            </p>
            <AnimatePresence mode="popLayout">
              {pedidos.map(p => <PedidoCard key={p.id} pedido={p} />)}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Página principal Admin ───────────────────────────────────────────────────
export default function Admin() {
  useSEO({ title: 'Admin' })

  const [pin, setPin] = useState<string | null>(
    () => sessionStorage.getItem('admin_pin')
  )

  const handleLogout = () => {
    sessionStorage.removeItem('admin_pin')
    setPin(null)
  }

  if (!pin) return <PinScreen onSuccess={setPin} />
  return <Dashboard pin={pin} onLogout={handleLogout} />
}
