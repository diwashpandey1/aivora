import { Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

const GlowButton = ({
  children,
  className,
  icon: Icon,
  isLoading = false,
  variant = 'primary',
  ...props
}) => {
  const styles = {
    primary:
      'bg-gradient-to-r from-cyber via-violet to-ion text-void shadow-[0_0_42px_rgba(82,229,255,0.28)] hover:shadow-[0_0_62px_rgba(137,255,203,0.35)]',
    danger:
      'bg-gradient-to-r from-danger via-signal to-danger text-white shadow-danger-glow',
    ghost:
      'border border-cyber/25 bg-white/[0.04] text-ink hover:border-cyber/50 hover:bg-white/[0.08]',
  }

  return (
    <motion.button
      whileHover={{ scale: props.disabled ? 1 : 1.025 }}
      whileTap={{ scale: props.disabled ? 1 : 0.98 }}
      className={clsx(
        'group inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-cyber/70 focus:ring-offset-2 focus:ring-offset-void disabled:opacity-50',
        styles[variant],
        className,
      )}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="size-5 animate-spin" aria-hidden="true" />
      ) : Icon ? (
        <Icon className="size-5 transition group-hover:rotate-6" aria-hidden="true" />
      ) : null}
      <span>{children}</span>
    </motion.button>
  )
}

export default GlowButton
