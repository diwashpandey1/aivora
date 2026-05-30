import { useEffect, useState } from 'react'
import { BrainCircuit } from 'lucide-react'
import { motion } from 'framer-motion'
import { thinkingSteps } from '../../constants/app'

const ScanLoader = () => {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setStep((current) => (current + 1) % thinkingSteps.length)
    }, 900)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-4xl border border-cyber/25 bg-cyber/[0.055] p-5"
    >
      <div className="absolute inset-x-0 top-0 h-1 scan-line" style={{ animation: 'scan 2s infinite' }} />
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="grid size-14 place-items-center rounded-3xl border border-cyber/35 bg-void/50 text-cyber shadow-glow"
          >
            <BrainCircuit className="size-7" aria-hidden="true" />
          </motion.div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyber">AI Scanner Active</p>
            <motion.p
              key={thinkingSteps[step]}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 font-semibold text-ink"
            >
              {thinkingSteps[step]}
            </motion.p>
          </div>
        </div>

        <div className="flex h-14 items-end gap-1.5">
          {Array.from({ length: 14 }).map((_, index) => (
            <span
              key={index}
              className="block h-10 w-1.5 rounded-full bg-gradient-to-t from-violet to-cyber"
              style={{
                animation: 'waveform 0.9s ease-in-out infinite',
                animationDelay: `${index * 0.07}s`,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default ScanLoader
