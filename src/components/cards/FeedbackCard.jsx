import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageSquareHeart, Send } from 'lucide-react'
import toast from 'react-hot-toast'
import GlassCard from '../ui/GlassCard'
import GlowButton from '../ui/GlowButton'
import { isFirebaseConfigured, saveFeedback } from '../../services/firebase'

const OptionButton = ({ active, children, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`rounded-2xl border px-4 py-3 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-cyber/70 ${
      active
        ? 'border-cyber/50 bg-cyber/15 text-cyber shadow-glow'
        : 'border-white/10 bg-white/[0.04] text-muted hover:border-cyber/30 hover:text-ink'
    }`}
  >
    {children}
  </button>
)

const FeedbackCard = ({ result }) => {
  const [userContentType, setUserContentType] = useState('')
  const [userPrediction, setUserPrediction] = useState('')
  const [additionalFeedback, setAdditionalFeedback] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!result) return null

  const canSubmit = userContentType && userPrediction && !isSubmitting

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!canSubmit) return

    if (!isFirebaseConfigured) {
      toast.error('Add Firebase environment variables to store feedback.')
      return
    }

    setIsSubmitting(true)
    try {
      await saveFeedback({
        userPrediction,
        userContentType,
        additionalFeedback,
        aiPrediction: result.prediction,
      })
      toast.success('Feedback submitted. Thank you for improving the model.')
      setUserContentType('')
      setUserPrediction('')
      setAdditionalFeedback('')
    } catch (error) {
      toast.error(error.message || 'Unable to submit feedback.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <GlassCard
      as={motion.form}
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-6"
    >
      <div className="mb-6 flex items-start gap-4">
        <div className="grid size-12 place-items-center rounded-3xl border border-violet/30 bg-violet/10 text-violet">
          <MessageSquareHeart className="size-6" aria-hidden="true" />
        </div>
        <div>
          <h3 className="font-display text-2xl font-bold text-ink">Help Improve the AI Model</h3>
          <p className="mt-2 text-muted">
            Your feedback helps improve spam detection accuracy.
          </p>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <fieldset>
          <legend className="mb-3 text-sm font-bold text-ink">
            What do YOU think this content was?
          </legend>
          <div className="grid grid-cols-2 gap-3">
            {['Email', 'Message'].map((item) => (
              <OptionButton
                key={item}
                active={userContentType === item}
                onClick={() => setUserContentType(item)}
              >
                {item}
              </OptionButton>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-3 text-sm font-bold text-ink">
            What do YOU think the prediction should be?
          </legend>
          <div className="grid grid-cols-2 gap-3">
            {['Spam', 'Genuine'].map((item) => (
              <OptionButton
                key={item}
                active={userPrediction === item}
                onClick={() => setUserPrediction(item)}
              >
                {item}
              </OptionButton>
            ))}
          </div>
        </fieldset>
      </div>

      <label className="mt-5 block">
        <span className="mb-3 block text-sm font-bold text-ink">Additional feedback...</span>
        <textarea
          value={additionalFeedback}
          onChange={(event) => setAdditionalFeedback(event.target.value)}
          rows={4}
          className="w-full resize-none rounded-3xl border border-white/10 bg-white/[0.04] p-4 text-ink outline-none transition placeholder:text-muted/70 focus:border-cyber/50 focus:ring-4 focus:ring-cyber/10"
          placeholder="Anything the model should learn from this example?"
        />
      </label>

      <div className="mt-5 flex justify-end">
        <GlowButton type="submit" icon={Send} isLoading={isSubmitting} disabled={!canSubmit}>
          Submit Feedback
        </GlowButton>
      </div>
    </GlassCard>
  )
}

export default FeedbackCard
