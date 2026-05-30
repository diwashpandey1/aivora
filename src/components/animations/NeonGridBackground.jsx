import { motion } from 'framer-motion'

const NeonGridBackground = () => (
  <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden" aria-hidden="true">
    <motion.div
      animate={{ backgroundPosition: ['0px 0px', '42px 42px'] }}
      transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
      className="cyber-grid absolute inset-0 opacity-45"
    />
    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,17,0.12),#050711_88%)]" />
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyber/70 to-transparent" />
  </div>
)

export default NeonGridBackground
