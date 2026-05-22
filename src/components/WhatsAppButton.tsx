import { motion, AnimatePresence } from 'motion/react'
import { useState } from 'react'
import { X } from 'lucide-react'

const PHONE = '584123650 6'.replace(/\s/g, '')
const WA_URL = `https://wa.me/${PHONE}?text=Hola%20Zapateria%20la%2021%2C%20estoy%20interesado%20en%20sus%20productos%20%F0%9F%91%9F`

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className="fixed bottom-7 right-7 z-50 flex flex-col items-end gap-3">

      {/* Tooltip / burbuja de mensaje */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="relative bg-white text-black rounded-2xl rounded-br-sm shadow-2xl p-4 max-w-[230px]"
          >
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute top-2 right-2 text-black/40 hover:text-black bg-transparent border-0 cursor-pointer"
            >
              <X size={14} />
            </button>
            <p
              className="font-black text-sm mb-1"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              ¡Hola! 👟
            </p>
            <p
              className="text-black/70 text-xs leading-relaxed"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              ¿Buscas un modelo? Escríbenos y te ayudamos ahora.
            </p>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 bg-[#25D366] text-white font-bold text-xs px-4 py-2 rounded-full no-underline hover:bg-[#1ebe5d] transition-colors"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Chatear ahora →
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón principal */}
      <div className="relative">
        {/* Anillo pulsante */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping" />

        <motion.a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowTooltip(false)}
          onMouseEnter={() => setShowTooltip(true)}
          className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-[0_8px_32px_rgba(37,211,102,0.5)] no-underline"
          title="Escríbenos por WhatsApp"
        >
          {/* Icono WhatsApp SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className="w-7 h-7"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </motion.a>
      </div>
    </div>
  )
}
