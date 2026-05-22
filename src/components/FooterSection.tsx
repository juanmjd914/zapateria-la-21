import { motion } from 'motion/react'

const links = ['Instagram', 'TikTok', 'Twitter']

export default function FooterSection() {
  return (
    <footer className="relative w-full min-h-[40vh] snap-start bg-black flex items-center border-t border-white/10">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-16 flex flex-col md:flex-row items-center md:items-end justify-between gap-10">

        {/* Identidad */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left"
        >
          <h2
            className="text-white font-black text-4xl md:text-6xl leading-none mb-2"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Zapateria
            <br />
            <span className="text-shoe-yellow">la 21</span>
          </h2>
          <p
            className="text-white/50 font-bold text-sm tracking-widest uppercase mt-3"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Estilo salvaje desde 2026
          </p>
        </motion.div>

        {/* Links y Copyright */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="flex flex-col items-center md:items-end gap-5"
        >
          {/* Links de redes */}
          <div className="flex gap-6">
            {links.map((link) => (
              <a
                key={link}
                href="#"
                className="text-white/60 font-black text-sm uppercase tracking-[0.15em] transition-colors duration-200 hover:text-shoe-yellow no-underline"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p
            className="text-white/25 text-xs font-bold tracking-widest uppercase text-center md:text-right"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            © 2026 Zapateria la 21. Hecho con estilo.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
