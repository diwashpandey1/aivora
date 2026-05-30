import { motion } from 'framer-motion'

const SectionHeading = ({ eyebrow, title, description, align = 'center' }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.6 }}
    className={align === 'left' ? 'mx-0 max-w-3xl' : 'mx-auto max-w-3xl text-center'}
  >
    {eyebrow ? (
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.32em] text-cyber">
        {eyebrow}
      </p>
    ) : null}
    <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl lg:text-5xl">
      {title}
    </h2>
    {description ? (
      <p className="mt-4 text-base leading-7 text-muted sm:text-lg">
        {description}
      </p>
    ) : null}
  </motion.div>
)

export default SectionHeading
