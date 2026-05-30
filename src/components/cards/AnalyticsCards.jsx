import { Activity, Mail, MessageSquare, ShieldAlert, ShieldCheck } from 'lucide-react'
import GlassCard from '../ui/GlassCard'
import { asPercent } from '../../utils/formatters'

const StatTile = ({ icon: Icon, label, value, tone = 'text-cyber' }) => (
  <GlassCard className="p-5">
    <Icon className={`mb-4 size-6 ${tone}`} aria-hidden="true" />
    <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted">{label}</p>
    <p className="mt-2 font-display text-3xl font-bold text-ink">{value}</p>
  </GlassCard>
)

const AnalyticsCards = ({ stats, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-4">
        {[0, 1, 2, 3].map((item) => (
          <GlassCard key={item} className="h-36 animate-pulse p-5" />
        ))}
      </div>
    )
  }

  const typeCounts = stats?.type_counts || {}

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <StatTile
        icon={Activity}
        label="Total Scans"
        value={stats?.total_scans || 0}
      />
      <StatTile
        icon={ShieldAlert}
        label="Spam Rate"
        value={`${asPercent(stats?.spam_percentage || 0)}%`}
        tone="text-danger"
      />
      <StatTile
        icon={ShieldCheck}
        label="Safe Rate"
        value={`${asPercent(stats?.safe_percentage || 0)}%`}
        tone="text-ion"
      />
      <StatTile
        icon={(typeCounts.email || 0) > (typeCounts.sms || 0) ? Mail : MessageSquare}
        label="Top Type"
        value={(typeCounts.email || 0) > (typeCounts.sms || 0) ? 'Email' : 'SMS'}
        tone="text-violet"
      />
    </div>
  )
}

export default AnalyticsCards
