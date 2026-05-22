import { createClient } from '@supabase/supabase-js'

const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL  as string
const supabaseAnon = import.meta.env.VITE_SUPABASE_ANON_KEY as string

export const supabase = createClient(supabaseUrl, supabaseAnon)

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface Producto {
  id:         number
  brand:      string
  name:       string
  price:      number
  old_price:  number | null
  category:   string
  img:        string
  tag:        string
  tag_color:  string
  rating:     number
  active:     boolean
  created_at: string
}

export interface Pedido {
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
  items:              unknown
  total:              number
  created_at:         string
  updated_at:         string
}
