import { motion } from 'framer-motion'
import { AlertTriangle, CheckCircle2, SearchCheck } from 'lucide-react'
import GlassCard from '../ui/GlassCard'

const icons = [AlertTriangle, SearchCheck, CheckCircle2]

const ExplanationCards = ({ explanations = [] }) => {
  const items = explanations.length
    ? explanations
    : ['No additional suspicious signals returned by the model.']

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((item, index) => {
        const Icon = icons[index % icons.length]

        return (
          <GlassCard
            key={item}
            as={motion.article}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            hover
            className="p-5"
          >
            <div className="mb-4 grid size-11 place-items-center rounded-2xl border border-cyber/25 bg-cyber/10 text-cyber">
              <Icon className="size-5" aria-hidden="true" />
            </div>
            <p className="font-semibold leading-7 text-ink">{item}</p>
          </GlassCard>
        )
      })}
    </div>
  )
}

export default ExplanationCards
