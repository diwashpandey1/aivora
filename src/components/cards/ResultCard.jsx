import { Copy, Gauge, ShieldAlert, ShieldCheck, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'
import GlassCard from '../ui/GlassCard'
import GlowButton from '../ui/GlowButton'
import AIChip from '../ui/AIChip'
import { asPercent, copyableResult, getPredictionTheme, titleCase } from '../../utils/formatters'

const ResultCard = ({ result }) => {
  if (!result) return null

  const theme = getPredictionTheme(result.prediction)
  const Icon = theme.isSpam ? ShieldAlert : ShieldCheck

  const handleCopy = async () => {
    await navigator.clipboard.writeText(copyableResult(result))
    toast.success('Analysis copied to clipboard.')
  }

  return (
    <GlassCard
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      className={`overflow-hidden p-6 ${theme.glow}`}
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className={`grid size-24 place-items-center rounded-[1.75rem] border ${theme.border} bg-white/[0.04] ring-8 ${theme.ring}`}>
            <Icon className={`size-11 ${theme.text}`} aria-hidden="true" />
          </div>
          <div>
            <AIChip tone={theme.isSpam ? 'red' : 'green'} icon={Sparkles}>
              {`Detected as ${titleCase(result.detected_type)}`}
            </AIChip>
            <h3 className={`mt-4 font-display text-5xl font-extrabold ${theme.text}`}>
              {theme.label}
            </h3>
            <p className="mt-2 text-sm text-muted">
              Risk level: <span className="font-bold text-ink">{result.risk_level}</span>
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[28rem]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
            <Gauge className="mb-3 size-5 text-cyber" aria-hidden="true" />
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Confidence</p>
            <p className="mt-1 font-display text-2xl font-bold text-ink">
              {asPercent(result.confidence)}%
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
            <ShieldAlert className="mb-3 size-5 text-danger" aria-hidden="true" />
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Spam Probability</p>
            <p className="mt-1 font-display text-2xl font-bold text-ink">
              {asPercent(result.spam_probability)}%
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
            <ShieldCheck className="mb-3 size-5 text-ion" aria-hidden="true" />
            <p className="text-xs uppercase tracking-[0.2em] text-muted">AI Trust Score</p>
            <p className="mt-1 font-display text-2xl font-bold text-ink">
              {Math.max(asPercent(result.confidence), asPercent(result.safe_probability))}%
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          Prediction probability is calculated by the connected FastAPI ML service.
        </p>
        <GlowButton type="button" variant="ghost" icon={Copy} onClick={handleCopy}>
          Copy Result
        </GlowButton>
      </div>
    </GlassCard>
  )
}

export default ResultCard
