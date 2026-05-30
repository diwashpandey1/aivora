import { motion } from 'framer-motion'
import GlassCard from '../ui/GlassCard'

const FeatureCard = ({ title, description, icon: Icon, index }) => (
  <GlassCard
    as={motion.article}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.5, delay: index * 0.06 }}
    whileHover={{ y: -8 }}
    className="group h-full p-6"
  >
    <div className="mb-6 grid size-14 place-items-center rounded-3xl border border-cyber/25 bg-cyber/10 text-cyber transition group-hover:border-ion/40 group-hover:text-ion">
      <Icon className="size-6" aria-hidden="true" />
    </div>
    <h3 className="font-display text-xl font-bold text-ink">{title}</h3>
    <p className="mt-3 leading-7 text-muted">{description}</p>
  </GlassCard>
)

export default FeatureCard
