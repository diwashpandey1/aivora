import { motion } from 'framer-motion'
import { ArrowRight, BrainCircuit, Lock, MailWarning, ShieldCheck } from 'lucide-react'
import GlowButton from '../ui/GlowButton'
import AIChip from '../ui/AIChip'
import GlassCard from '../ui/GlassCard'
import { heroMetrics } from '../../constants/app'

const scrollToDetector = () => {
  document.querySelector('#detector')?.scrollIntoView({ behavior: 'smooth' })
}

const Node = ({ className }) => (
  <motion.span
    animate={{ scale: [1, 1.18, 1], opacity: [0.65, 1, 0.65] }}
    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
    className={`absolute size-3 rounded-full bg-cyber shadow-[0_0_18px_rgba(82,229,255,0.9)] ${className}`}
  />
)

const HeroVisual = () => (
  <GlassCard
    initial={{ opacity: 0, scale: 0.96, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.15 }}
    className="relative min-h-[28rem] overflow-hidden p-6"
  >
    <div className="absolute inset-0 cyber-grid opacity-35" />
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
      className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyber/18"
    />
    <motion.div
      animate={{ rotate: -360 }}
      transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
      className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet/20"
    />
    <div className="absolute left-[18%] right-[18%] top-[48%] h-px bg-gradient-to-r from-transparent via-cyber/70 to-transparent" />
    <div className="absolute bottom-[26%] left-[30%] right-[24%] h-px rotate-[28deg] bg-gradient-to-r from-transparent via-ion/60 to-transparent" />
    <div className="absolute left-[34%] right-[28%] top-[27%] h-px -rotate-[24deg] bg-gradient-to-r from-transparent via-violet/60 to-transparent" />
    <Node className="left-[17%] top-[47%]" />
    <Node className="right-[18%] top-[47%]" />
    <Node className="left-[31%] top-[24%]" />
    <Node className="right-[26%] bottom-[23%]" />

    <div className="relative z-10 flex h-full min-h-[24rem] flex-col justify-between">
      <div className="flex items-center justify-between">
        <AIChip icon={Lock}>Encrypted Scan</AIChip>
        <AIChip icon={MailWarning} tone="violet">Auto Type</AIChip>
      </div>

      <div className="mx-auto grid size-40 place-items-center rounded-[2rem] border border-cyber/35 bg-void/50 shadow-glow">
        <motion.div
          animate={{ y: [-6, 6, -6] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="grid size-28 place-items-center rounded-[1.6rem] bg-gradient-to-br from-cyber/20 via-violet/15 to-ion/20"
        >
          <ShieldCheck className="size-16 text-cyber" aria-hidden="true" />
        </motion.div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {heroMetrics.map((metric) => {
          const Icon = metric.icon
          return (
            <div
              key={metric.label}
              className="rounded-3xl border border-white/10 bg-white/[0.05] p-4"
            >
              <Icon className="mb-3 size-5 text-ion" aria-hidden="true" />
              <p className="text-xs uppercase tracking-[0.2em] text-muted">{metric.label}</p>
              <p className="mt-1 font-display text-2xl font-bold text-ink">{metric.value}</p>
            </div>
          )
        })}
      </div>
    </div>
  </GlassCard>
)

const HeroSection = () => (
  <section id="hero" className="mx-auto grid max-w-7xl gap-12 px-4 pb-20 pt-32 sm:px-6 lg:grid-cols-[1.03fr_0.97fr] lg:px-8 lg:pb-28 lg:pt-40">
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75 }}
      className="flex flex-col justify-center"
    >
      <AIChip icon={BrainCircuit}>Machine Learning Threat Intelligence</AIChip>
      <h1 className="mt-7 text-balance font-display text-5xl font-extrabold leading-[1.02] text-ink sm:text-6xl lg:text-7xl">
        AI Spam Detector
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-muted sm:text-xl">
        Analyze emails and messages instantly using machine learning.
      </p>
      <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
        <GlowButton type="button" icon={ArrowRight} onClick={scrollToDetector} className="px-7 py-4">
          Analyze Now
        </GlowButton>
        <p className="text-sm text-muted">Press Ctrl + Enter inside the detector to launch a scan.</p>
      </div>
    </motion.div>

    <HeroVisual />
  </section>
)

export default HeroSection
