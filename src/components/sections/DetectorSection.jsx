import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Keyboard, ScanLine, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'
import GlassCard from '../ui/GlassCard'
import GlowButton from '../ui/GlowButton'
import ScanLoader from '../ui/ScanLoader'
import { smartPlaceholders } from '../../constants/app'
import { usePlaceholderRotation } from '../../hooks/usePlaceholderRotation'
import { analyzeContent } from '../../services/api'

const DetectorSection = ({ onAnalysisComplete, recordScan }) => {
  const [text, setText] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const placeholder = usePlaceholderRotation(smartPlaceholders)

  const characterCount = text.length
  const canAnalyze = useMemo(() => text.trim().length > 0 && !isAnalyzing, [isAnalyzing, text])

  const runAnalysis = async () => {
    if (!text.trim()) {
      toast.error('Paste an email or message before analysis.')
      return
    }

    setIsAnalyzing(true)
    try {
      const result = await analyzeContent(text.trim())
      onAnalysisComplete(result)
      await recordScan()
      toast.success('AI analysis complete.')
      window.setTimeout(() => {
        document.querySelector('#results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 160)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleKeyDown = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      event.preventDefault()
      runAnalysis()
    }
  }

  return (
    <section id="detector" className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-90px' }}
        transition={{ duration: 0.65 }}
        className="mb-9 text-center"
      >
        <p className="text-xs font-bold uppercase tracking-[0.32em] text-cyber">AI Detection Panel</p>
        <h2 className="mt-3 font-display text-4xl font-bold text-ink sm:text-5xl">
          Paste once. Let the model decide.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted">
          Email and SMS type detection is handled by the backend automatically.
        </p>
      </motion.div>

      <GlassCard className="p-4 sm:p-6">
        <label htmlFor="content" className="mb-3 flex items-center justify-between gap-4 text-sm font-bold text-ink">
          <span className="inline-flex items-center gap-2">
            <Sparkles className="size-4 text-cyber" aria-hidden="true" />
            Content sample
          </span>
          <span className="text-xs font-semibold text-muted">{characterCount} characters</span>
        </label>
        <textarea
          id="content"
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={handleKeyDown}
          rows={9}
          className="min-h-[16rem] w-full resize-y rounded-4xl border border-white/10 bg-void/55 p-5 text-base leading-7 text-ink outline-none transition placeholder:text-muted/60 focus:border-cyber/60 focus:shadow-[0_0_54px_rgba(82,229,255,0.12)] focus:ring-4 focus:ring-cyber/10"
          placeholder={`Paste an email or message here... ${placeholder}`}
          aria-describedby="shortcut-help"
        />

        <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <p id="shortcut-help" className="inline-flex items-center gap-2 text-sm text-muted">
            <Keyboard className="size-4 text-cyber" aria-hidden="true" />
            Press Ctrl + Enter to trigger analysis.
          </p>
          <GlowButton
            type="button"
            icon={ScanLine}
            isLoading={isAnalyzing}
            disabled={!canAnalyze}
            onClick={runAnalysis}
            className="px-8 py-4"
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze'}
          </GlowButton>
        </div>

        {isAnalyzing ? (
          <div className="mt-5">
            <ScanLoader />
          </div>
        ) : null}
      </GlassCard>
    </section>
  )
}

export default DetectorSection
