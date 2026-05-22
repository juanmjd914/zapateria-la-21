-- ═══════════════════════════════════════════════════════════════
--  ZAPATERIA LA 21 — Schema Supabase
--  Ejecutar en: Dashboard → SQL Editor → New query
-- ═══════════════════════════════════════════════════════════════

-- ─── Tabla: productos ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS productos (
  id          SERIAL PRIMARY KEY,
  brand       TEXT NOT NULL,
  name        TEXT NOT NULL,
  price       NUMERIC(10,2) NOT NULL,
  old_price   NUMERIC(10,2),
  category    TEXT DEFAULT 'General',
  img         TEXT,
  tag         TEXT,
  tag_color   TEXT DEFAULT 'bg-shoe-yellow text-black',
  rating      INTEGER DEFAULT 4 CHECK (rating BETWEEN 1 AND 5),
  active      BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Tabla: pedidos ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS pedidos (
  id                  SERIAL PRIMARY KEY,
  preference_id       TEXT,
  payment_id          TEXT UNIQUE,
  external_reference  TEXT,
  status              TEXT NOT NULL DEFAULT 'pending',
  -- Comprador
  nombre              TEXT,
  email               TEXT,
  telefono            TEXT,
  direccion           TEXT,
  ciudad              TEXT,
  -- Pedido
  items               JSONB NOT NULL DEFAULT '[]',
  total               NUMERIC(10,2) NOT NULL DEFAULT 0,
  -- Timestamps
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Trigger: updated_at automático ──────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_updated_at ON pedidos;
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON pedidos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─── Row Level Security ───────────────────────────────────────────────────────
ALTER TABLE productos ENABLE ROW LEVEL SECURITY;
ALTER TABLE pedidos   ENABLE ROW LEVEL SECURITY;

-- productos: cualquiera puede LEER (anon key desde el frontend)
CREATE POLICY "Public can read active products"
  ON productos FOR SELECT
  USING (active = true);

-- pedidos: SOLO el server (service_role) puede leer/escribir
-- (sin policy = bloqueado para anon; service_role bypasea RLS por defecto)

-- ─── Datos iniciales: productos ───────────────────────────────────────────────
INSERT INTO productos (brand, name, price, old_price, category, img, tag, tag_color, rating) VALUES
  ('Nike',        'Air Max 270',           28, 35,   'Running',   'https://bismrhwimuntpawgrdsa.supabase.co/storage/v1/object/public/VIDEOS%20WEB/1.jpg', 'MÁS VENDIDO', 'bg-shoe-yellow text-black', 5),
  ('Adidas',      'Ultraboost 22',         32, NULL, 'Running',   'https://bismrhwimuntpawgrdsa.supabase.co/storage/v1/object/public/VIDEOS%20WEB/2.jpg', 'NUEVO',       'bg-shoe-orange text-white', 4),
  ('Converse',    'Chuck Taylor All Star', 15, 20,   'Clásico',   'https://bismrhwimuntpawgrdsa.supabase.co/storage/v1/object/public/VIDEOS%20WEB/3.jpg', 'OFERTA',      'bg-red-500 text-white',     5),
  ('Puma',        'Suede Classic XXI',     18, NULL, 'Urbano',    'https://bismrhwimuntpawgrdsa.supabase.co/storage/v1/object/public/VIDEOS%20WEB/4.jpg', 'EXCLUSIVO',   'bg-shoe-purple text-white', 4),
  ('Jordan',      'Air Jordan 1 Retro',   45, 55,   'Casual',    'https://bismrhwimuntpawgrdsa.supabase.co/storage/v1/object/public/VIDEOS%20WEB/1.jpg', 'PREMIUM',     'bg-shoe-yellow text-black', 5),
  ('Vans',        'Old Skool Pro',         22, NULL, 'Casual',    'https://bismrhwimuntpawgrdsa.supabase.co/storage/v1/object/public/VIDEOS%20WEB/2.jpg', 'CLÁSICO',     'bg-white text-black',       4),
  ('Nike',        'React Infinity Run',    35, 42,   'Running',   'https://bismrhwimuntpawgrdsa.supabase.co/storage/v1/object/public/VIDEOS%20WEB/3.jpg', 'NUEVO',       'bg-shoe-orange text-white', 5),
  ('Adidas',      'Forum Low',             20, NULL, 'Urbano',    'https://bismrhwimuntpawgrdsa.supabase.co/storage/v1/object/public/VIDEOS%20WEB/4.jpg', 'TENDENCIA',   'bg-shoe-yellow text-black', 4),
  ('Reebok',      'Classic Leather',       16, 22,   'Clásico',   'https://bismrhwimuntpawgrdsa.supabase.co/storage/v1/object/public/VIDEOS%20WEB/1.jpg', 'OFERTA',      'bg-red-500 text-white',     4),
  ('New Balance', 'Fresh Foam 1080',       38, NULL, 'Running',   'https://bismrhwimuntpawgrdsa.supabase.co/storage/v1/object/public/VIDEOS%20WEB/2.jpg', 'PREMIUM',     'bg-shoe-yellow text-black', 5),
  ('Converse',    'Run Star Hike',         19, 25,   'Casual',    'https://bismrhwimuntpawgrdsa.supabase.co/storage/v1/object/public/VIDEOS%20WEB/3.jpg', 'NUEVO',       'bg-shoe-orange text-white', 4),
  ('Puma',        'RS-X Reinvention',      24, NULL, 'Deportivo', 'https://bismrhwimuntpawgrdsa.supabase.co/storage/v1/object/public/VIDEOS%20WEB/4.jpg', 'EXCLUSIVO',   'bg-shoe-purple text-white', 3)
ON CONFLICT DO NOTHING;
