import 'dotenv/config'
import express from 'express'
import cors    from 'cors'
import path    from 'path'
import { fileURLToPath } from 'url'
import { MercadoPagoConfig, Preference, Payment } from 'mercadopago'
import supabase from './supabase.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const isProd    = process.env.NODE_ENV === 'production'

const app  = express()
const PORT = Number(process.env.PORT) || 3000

// ─── MercadoPago ──────────────────────────────────────────────────────────────
const mpClient = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN || 'TEST-0000000000000000-000000-00000000000000000000000000000000-000000000',
})

// ─── Middlewares ──────────────────────────────────────────────────────────────
// En desarrollo: permitir el puerto de Vite. En producción: todo viene del mismo origen
app.use(cors({ origin: isProd ? false : ['http://localhost:5174'] }))
app.use(express.json())

// ─── Archivos estáticos (producción) ─────────────────────────────────────────
if (isProd) {
  const distPath = path.join(__dirname, '..', 'dist')
  app.use(express.static(distPath))
}

// ─── Helper: guardar / actualizar pedido en Supabase ─────────────────────────
async function guardarPedido({ preference_id, payment_id, external_reference, status, comprador, items, total }) {
  try {
    // Si ya existe el pedido por preference_id, actualizar; si no, insertar
    const { data: existing } = await supabase
      .from('pedidos')
      .select('id')
      .eq('preference_id', preference_id)
      .maybeSingle()

    if (existing) {
      await supabase
        .from('pedidos')
        .update({ payment_id, external_reference, status, updated_at: new Date().toISOString() })
        .eq('id', existing.id)
      console.log(`📦 Pedido actualizado: ${existing.id} → ${status}`)
    } else {
      const { data, error } = await supabase
        .from('pedidos')
        .insert({
          preference_id,
          payment_id,
          external_reference,
          status: status || 'pending',
          nombre:    comprador?.nombre   || null,
          email:     comprador?.email    || null,
          telefono:  comprador?.telefono || null,
          direccion: comprador?.direccion || null,
          ciudad:    comprador?.ciudad   || null,
          items:     items || [],
          total:     total || 0,
        })
        .select('id')
        .single()

      if (error) throw error
      console.log(`📦 Pedido guardado: ${data.id}`)
    }
  } catch (err) {
    console.error('⚠️  Error guardando pedido en Supabase:', err.message)
  }
}

// ─── POST /api/crear-preferencia ─────────────────────────────────────────────
app.post('/api/crear-preferencia', async (req, res) => {
  const { items, comprador, back_urls } = req.body

  if (!items || !items.length) {
    return res.status(400).json({ error: 'No hay productos en el carrito' })
  }

  try {
    const preference = new Preference(mpClient)
    const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)

    const body = {
      items: items.map(item => ({
        id:          String(item.product.id),
        title:       `${item.product.brand} ${item.product.name} (Talla ${item.size})`,
        quantity:    item.quantity,
        unit_price:  item.product.price,
        currency_id: 'USD',
        picture_url: item.product.img,
      })),
      payer: {
        name:  comprador?.nombre  || '',
        email: comprador?.email   || '',
        phone: { number: comprador?.telefono || '' },
      },
      back_urls: {
        success: back_urls?.success || 'http://localhost:5174/checkout/exito',
        failure: back_urls?.failure || 'http://localhost:5174/checkout/fallo',
        pending: back_urls?.pending || 'http://localhost:5174/checkout/pendiente',
      },
      notification_url: process.env.PUBLIC_URL
        ? `${process.env.PUBLIC_URL}/api/webhook`
        : undefined,
      auto_return:          'approved',
      statement_descriptor: 'ZAPATERIA LA 21',
      external_reference:   `ORDER-${Date.now()}`,
    }

    const result = await preference.create({ body })

    // Guardar pedido inicial en Supabase (estado pending)
    await guardarPedido({
      preference_id:    result.id,
      payment_id:       null,
      external_reference: body.external_reference,
      status:           'pending',
      comprador,
      items,
      total,
    })

    res.json({
      id:                 result.id,
      init_point:         result.init_point,
      sandbox_init_point: result.sandbox_init_point,
    })
  } catch (err) {
    console.error('MercadoPago error:', err)
    res.status(500).json({ error: err.message || 'Error al crear preferencia' })
  }
})

// ─── POST /api/webhook  (notificaciones de MercadoPago) ──────────────────────
app.post('/api/webhook', async (req, res) => {
  // MercadoPago envía el evento como query param o en el body
  const topic  = req.query.topic  || req.body?.type
  const dataId = req.query.id     || req.body?.data?.id

  console.log(`\n🔔 Webhook recibido | topic: ${topic} | id: ${dataId}`)

  // Solo nos interesan notificaciones de pagos
  if (topic !== 'payment' && topic !== 'payment_intent') {
    return res.sendStatus(200)
  }

  try {
    const paymentApi = new Payment(mpClient)
    const payment    = await paymentApi.get({ id: dataId })

    const {
      id: payment_id,
      status,
      external_reference,
      preference_id,
      payer,
      transaction_amount,
    } = payment

    console.log(`   Estado: ${status} | Ref: ${external_reference}`)

    // Mapear estado MP → nuestro status
    const mappedStatus =
      status === 'approved'   ? 'approved'   :
      status === 'rejected'   ? 'rejected'   :
      status === 'in_process' ? 'in_process' :
      'pending'

    // Actualizar pedido en Supabase
    await guardarPedido({
      preference_id,
      payment_id:    String(payment_id),
      external_reference,
      status:        mappedStatus,
      comprador: {
        nombre:   payer?.first_name || '',
        email:    payer?.email      || '',
        telefono: payer?.phone?.number || '',
      },
      items:  [],   // ya se guardaron al crear la preferencia
      total:  transaction_amount || 0,
    })

    res.sendStatus(200)
  } catch (err) {
    console.error('⚠️  Error procesando webhook:', err.message)
    res.sendStatus(500)
  }
})

// ─── Middleware: verificar PIN de admin ───────────────────────────────────────
function requirePin(req, res, next) {
  const auth = req.headers['x-admin-pin'] || req.query.pin
  if (!auth || auth !== process.env.ADMIN_PIN) {
    return res.status(401).json({ error: 'PIN incorrecto' })
  }
  next()
}

// ─── GET /api/admin/pedidos ───────────────────────────────────────────────────
app.get('/api/admin/pedidos', requirePin, async (req, res) => {
  try {
    const { status } = req.query
    let query = supabase
      .from('pedidos')
      .select('*')
      .order('created_at', { ascending: false })

    if (status && status !== 'todos') query = query.eq('status', status)

    const { data, error } = await query
    if (error) throw error
    res.json(data)
  } catch (err) {
    console.error('Error leyendo pedidos:', err.message)
    res.status(500).json({ error: err.message })
  }
})

// ─── GET /api/admin/stats ─────────────────────────────────────────────────────
app.get('/api/admin/stats', requirePin, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('pedidos')
      .select('status, total')

    if (error) throw error

    const stats = {
      total:      data.length,
      aprobados:  data.filter(p => p.status === 'approved').length,
      pendientes: data.filter(p => p.status === 'pending').length,
      rechazados: data.filter(p => p.status === 'rejected').length,
      ingresos:   data
        .filter(p => p.status === 'approved')
        .reduce((sum, p) => sum + Number(p.total), 0),
    }
    res.json(stats)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ─── GET /api/productos ───────────────────────────────────────────────────────
app.get('/api/productos', async (_req, res) => {
  try {
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .eq('active', true)
      .order('id')

    if (error) throw error
    res.json(data)
  } catch (err) {
    console.error('Error leyendo productos:', err.message)
    res.status(500).json({ error: err.message })
  }
})

// ─── GET /api/salud ───────────────────────────────────────────────────────────
app.get('/api/salud', (_req, res) => {
  res.json({
    ok:        true,
    timestamp: new Date().toISOString(),
    supabase:  !!process.env.SUPABASE_URL,
    mp_token:  !!process.env.MP_ACCESS_TOKEN,
  })
})

// ─── SPA fallback (producción): cualquier ruta que no sea /api → index.html ──
if (isProd) {
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'))
  })
}

// ─── Arranque ─────────────────────────────────────────────────────────────────
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🚀 Servidor Zapateria la 21`)
  console.log(`   Puerto:      ${PORT}`)
  console.log(`   NODE_ENV:    ${process.env.NODE_ENV}`)
  console.log(`   MercadoPago: ${process.env.MP_ACCESS_TOKEN ? '✅ Token configurado' : '⚠️  Usando token de prueba'}`)
  console.log(`   Supabase:    ${process.env.SUPABASE_URL    ? '✅ Conectado'          : '⚠️  Sin configurar'}\n`)
})

server.on('error', (err) => {
  console.error('❌ Error al iniciar servidor:', err.message)
  process.exit(1)
})
