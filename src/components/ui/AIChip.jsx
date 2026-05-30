import clsx from 'clsx'
import { motion } from 'framer-motion'

const AIChip = ({ children, icon: Icon, tone = 'cyan', className }) => {
  const tones = {
    cyan: 'border-cyber/35 bg-cyber/10 text-cyber shadow-[0_0_24px_rgba(82,229,255,0.16)]',
    green: 'border-ion/35 bg-ion/10 text-ion shadow-[0_0_24px_rgba(137,255,203,0.14)]',
    red: 'border-danger/35 bg-danger/10 text-danger shadow-[0_0_24px_rgba(255,77,109,0.15)]',
    violet: 'border-violet/35 bg-violet/10 text-violet shadow-[0_0_24px_rgba(167,139,250,0.14)]',
  }

  return (
    <motion.span
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={clsx(
        'inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em]',
        tones[tone],
        className,
      )}
    >
      {Icon ? <Icon className="size-4" aria-hidden="true" /> : null}
      {children}
    </motion.span>
  )
}

export default AIChip
