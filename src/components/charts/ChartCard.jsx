import GlassCard from '../ui/GlassCard'

const ChartCard = ({ title, subtitle, children }) => (
  <GlassCard className="p-5">
    <div className="mb-5">
      <h3 className="font-display text-lg font-bold text-ink">{title}</h3>
      {subtitle ? <p className="mt-1 text-sm text-muted">{subtitle}</p> : null}
    </div>
    <div className="min-h-56">{children}</div>
  </GlassCard>
)

export default ChartCard
