import { createClient } from '@supabase/supabase-js'

// Usa service_role para bypasear RLS y escribir desde el servidor
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession:   false,
    },
  }
)

export default supabase
