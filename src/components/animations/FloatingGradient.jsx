import { motion } from 'framer-motion'

const FloatingGradient = () => (
  <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
    <motion.div
      animate={{
        x: ['-8%', '8%', '-8%'],
        y: ['-4%', '5%', '-4%'],
        rotate: [0, 4, 0],
      }}
      transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute left-[-18%] top-[6%] h-[34rem] w-[72rem] -rotate-12 bg-[linear-gradient(90deg,transparent,rgba(82,229,255,0.16),rgba(137,255,203,0.11),transparent)] blur-3xl"
    />
    <motion.div
      animate={{
        x: ['8%', '-6%', '8%'],
        y: ['4%', '-5%', '4%'],
        rotate: [0, -5, 0],
      }}
      transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute bottom-[5%] right-[-22%] h-[32rem] w-[78rem] rotate-12 bg-[linear-gradient(90deg,transparent,rgba(167,139,250,0.14),rgba(255,184,107,0.08),transparent)] blur-3xl"
    />
  </div>
)

export default FloatingGradient
