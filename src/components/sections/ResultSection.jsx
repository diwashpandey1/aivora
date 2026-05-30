import { motion } from 'framer-motion'
import { Activity, Radar } from 'lucide-react'
import AnalyticsCards from '../cards/AnalyticsCards'
import ResultCard from '../cards/ResultCard'
import ExplanationCards from '../cards/ExplanationCards'
import FeedbackCard from '../cards/FeedbackCard'
import ChartCard from '../charts/ChartCard'
import ConfidenceMeter from '../charts/ConfidenceMeter'
import ProbabilityBarChart from '../charts/ProbabilityBarChart'
import SafeSpamDonut from '../charts/SafeSpamDonut'
import KeywordRiskChart from '../charts/KeywordRiskChart'
import ConfidenceTimeline from '../charts/ConfidenceTimeline'
import GlassCard from '../ui/GlassCard'
import AIChip from '../ui/AIChip'

const EmptyState = () => (
  <GlassCard className="p-10 text-center">
    <div className="mx-auto mb-5 grid size-16 place-items-center rounded-3xl border border-cyber/30 bg-cyber/10 text-cyber">
      <Radar className="size-8" aria-hidden="true" />
    </div>
    <h3 className="font-display text-2xl font-bold text-ink">Awaiting first scan</h3>
    <p className="mx-auto mt-3 max-w-2xl text-muted">
      Paste suspicious text into the detector to unlock AI confidence, probability analytics, keyword risks, and model feedback.
    </p>
  </GlassCard>
)

const ResultSection = ({ result, stats, isLoadingStats }) => (
  <section id="results" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
    <div id="analytics" className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.32em] text-cyber">Result Dashboard</p>
        <h2 className="mt-3 font-display text-4xl font-bold text-ink sm:text-5xl">
          AI signal intelligence
        </h2>
      </div>
      <AIChip icon={Activity} tone="green">Live Model Output</AIChip>
    </div>

    {!result ? (
      <div className="space-y-8">
        <AnalyticsCards stats={stats} isLoading={isLoadingStats} />
        <EmptyState />
      </div>
    ) : (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-8"
      >
        <AnalyticsCards stats={stats} isLoading={isLoadingStats} />
        <ResultCard result={result} />
        <div>
          <h3 className="mb-4 font-display text-2xl font-bold text-ink">AI Explanation</h3>
          <ExplanationCards explanations={result.explanations} />
        </div>
        <FeedbackCard result={result} />
        <div className="grid gap-5 lg:grid-cols-2">
          <ChartCard title="Circular Confidence Meter" subtitle="Animated radial model certainty">
            <ConfidenceMeter confidence={result.confidence} />
          </ChartCard>
          <ChartCard title="Spam Probability Bar Chart" subtitle="Threat probability compared with safe signals">
            <ProbabilityBarChart
              spamProbability={result.spam_probability}
              safeProbability={result.safe_probability}
            />
          </ChartCard>
          <ChartCard title="Safe vs Spam Donut Chart" subtitle="Balanced probability distribution">
            <SafeSpamDonut
              spamProbability={result.spam_probability}
              safeProbability={result.safe_probability}
            />
          </ChartCard>
          <ChartCard title="Keyword Risk Analysis" subtitle="High-signal token risk levels">
            <KeywordRiskChart keywordRisks={result.keyword_risks} />
          </ChartCard>
          <div className="lg:col-span-2">
            <ChartCard title="AI Confidence Timeline" subtitle="Aesthetic scan progression generated for the interface">
              <ConfidenceTimeline confidence={result.confidence} />
            </ChartCard>
          </div>
        </div>
      </motion.div>
    )}
  </section>
)

export default ResultSection
