import { motion } from 'framer-motion'
import clsx from 'clsx'

const GlassCard = ({
  children,
  className,
  as: Component = motion.div,
  hover = false,
  ...props
}) => (
  <Component
    className={clsx(
      'glass-panel gradient-border rounded-4xl',
      hover && 'transition duration-300 hover:-translate-y-1 hover:shadow-glow',
      className,
    )}
    {...props}
  >
    {children}
  </Component>
)

export default GlassCard
