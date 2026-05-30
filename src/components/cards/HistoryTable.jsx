import { motion } from 'framer-motion'
import { History, Inbox } from 'lucide-react'
import GlassCard from '../ui/GlassCard'
import AIChip from '../ui/AIChip'
import { asPercent, formatTimestamp, titleCase, truncate } from '../../utils/formatters'

const HistoryTable = ({ history = [], isLoading, error }) => (
  <GlassCard id="history" className="p-6">
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyber">Recent History</p>
        <h2 className="mt-2 font-display text-3xl font-bold text-ink">Anonymous scan stream</h2>
      </div>
      <AIChip icon={History} tone="violet">Latest 10</AIChip>
    </div>

    {error ? (
      <div className="rounded-3xl border border-danger/25 bg-danger/[0.06] p-8 text-center text-danger">
        {error}
      </div>
    ) : isLoading ? (
      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center text-muted">
        Syncing recent scans...
      </div>
    ) : history.length === 0 ? (
      <div className="rounded-3xl border border-dashed border-cyber/25 bg-cyber/[0.04] p-10 text-center">
        <Inbox className="mx-auto mb-4 size-10 text-cyber" aria-hidden="true" />
        <p className="font-display text-xl font-bold text-ink">No scans yet</p>
        <p className="mt-2 text-muted">Run an analysis and the latest anonymous scans appear here.</p>
      </div>
    ) : (
      <div className="overflow-hidden rounded-3xl border border-white/10">
        <div className="hidden grid-cols-[0.8fr_0.8fr_0.7fr_1fr_2fr] gap-4 bg-white/[0.05] px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-muted md:grid">
          <span>Type</span>
          <span>Prediction</span>
          <span>Confidence</span>
          <span>Timestamp</span>
          <span>Preview</span>
        </div>
        <div className="divide-y divide-white/10">
          {history.map((item, index) => (
            <motion.div
              key={item.id || `${item.timestamp}-${index}`}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              className="grid gap-3 px-5 py-4 transition hover:bg-white/[0.04] md:grid-cols-[0.8fr_0.8fr_0.7fr_1fr_2fr] md:items-center"
            >
              <span className="text-sm font-semibold text-ink">{titleCase(item.detectedType)}</span>
              <AIChip tone={item.prediction?.toLowerCase() === 'spam' ? 'red' : 'green'}>
                {titleCase(item.prediction)}
              </AIChip>
              <span className="text-sm font-bold text-cyber">{asPercent(item.confidence)}%</span>
              <span className="text-sm text-muted">{formatTimestamp(item.timestamp)}</span>
              <span className="text-sm leading-6 text-muted">{truncate(item.text)}</span>
            </motion.div>
          ))}
        </div>
      </div>
    )}
  </GlassCard>
)

export default HistoryTable
