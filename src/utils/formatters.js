export const asPercent = (value) => {
  const normalized = Number(value || 0)
  return normalized <= 1 ? Math.round(normalized * 100) : Math.round(normalized)
}

export const titleCase = (value = '') =>
  value
    .toString()
    .replace(/[_-]/g, ' ')
    .replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())

export const getPredictionTheme = (prediction = '') => {
  const isSpam = prediction.toLowerCase() === 'spam'

  return {
    isSpam,
    label: isSpam ? 'SPAM' : 'SAFE',
    gradient: isSpam
      ? 'from-danger via-signal to-danger'
      : 'from-ion via-cyber to-ion',
    ring: isSpam ? 'ring-danger/30' : 'ring-ion/25',
    glow: isSpam ? 'shadow-danger-glow' : 'shadow-safe-glow',
    text: isSpam ? 'text-danger' : 'text-ion',
    border: isSpam ? 'border-danger/30' : 'border-ion/30',
  }
}

export const formatTimestamp = (timestamp) => {
  const date =
    timestamp?.toDate?.() ||
    (timestamp ? new Date(timestamp) : null)

  if (!date || Number.isNaN(date.getTime())) {
    return 'Just now'
  }

  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export const copyableResult = (result) => {
  if (!result) return ''

  return [
    `AI Spam Detector Result`,
    `Detected type: ${titleCase(result.detected_type)}`,
    `Prediction: ${titleCase(result.prediction)}`,
    `Confidence: ${asPercent(result.confidence)}%`,
    `Spam probability: ${asPercent(result.spam_probability)}%`,
    `Safe probability: ${asPercent(result.safe_probability)}%`,
    `Risk level: ${result.risk_level || 'Unknown'}`,
    `Explanations: ${(result.explanations || []).join(', ') || 'None'}`,
  ].join('\n')
}

export const truncate = (value = '', max = 92) =>
  value.length > max ? `${value.slice(0, max).trim()}...` : value
