import axios from 'axios'
import { getClientId } from '../utils/clientIdentity'

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 25000,
  headers: {
    'Content-Type': 'application/json',
  },
})

const toKeywordRisks = (keywords = [], spamProbability = 0) =>
  keywords.slice(0, 8).map((keyword, index) => ({
    keyword: keyword.toString().toUpperCase(),
    risk: Math.min(100, Math.round((spamProbability * 100) + 8 + index * 3)),
  }))

const toExplanations = (data) => {
  const keywords = data.keywords_detected || []
  const keywordText = keywords.length
    ? `Suspicious language detected: ${keywords.slice(0, 5).join(', ')}.`
    : 'No high-risk keywords were detected in the cleaned text.'

  return [
    `The backend classified this as ${data.detected_type || 'message'} content.`,
    `Model confidence is ${Number(data.confidence || 0).toFixed(1)}%.`,
    keywordText,
  ]
}

export const normalizeAnalysis = (data = {}) => {
  const spamProbability = Number(data.spam_probability || 0)
  const safeProbability = Number(
    data.safe_probability ?? Math.max(0, 1 - spamProbability),
  )
  const keywords = Array.isArray(data.keywords_detected) ? data.keywords_detected : []

  return {
    detected_type: data.detected_type || 'sms',
    prediction: data.prediction || 'safe',
    confidence: Number(data.confidence || 0),
    spam_probability: spamProbability,
    safe_probability: safeProbability,
    keywords_detected: keywords,
    risk_level: data.risk_level || 'low',
    chart_data: data.chart_data || {
      spam_score: Math.round(spamProbability * 100),
      safe_score: Math.round(safeProbability * 100),
    },
    analytics: data.analytics || null,
    explanations: toExplanations({ ...data, keywords_detected: keywords }),
    keyword_risks: toKeywordRisks(keywords, spamProbability),
  }
}

export const normalizeHistoryItem = (item = {}) => ({
  id: item.id,
  client_id: item.client_id,
  text: item.message || item.original_message || '',
  detectedType: item.detected_type || item.detectedType || 'sms',
  prediction: item.prediction || 'safe',
  confidence: Number(item.confidence || 0),
  spamProbability: Number(item.spam_probability || 0),
  riskLevel: item.risk_level || 'low',
  keywords: item.keywords_detected || item.detected_keywords || [],
  timestamp: item.timestamp,
})

const apiError = (error, fallback) => {
  const message =
    error.response?.data?.detail ||
    error.response?.data?.message ||
    error.message ||
    fallback

  return new Error(message, { cause: error })
}

export const analyzeContent = async (message) => {
  try {
    const { data } = await api.post('/analyze', {
      message,
      client_id: getClientId(),
    })
    return normalizeAnalysis(data)
  } catch (error) {
    throw apiError(error, 'Unable to analyze content.')
  }
}

export const fetchHistory = async (limit = 10) => {
  try {
    const { data } = await api.get(`/history/${getClientId()}`, {
      params: { limit },
    })
    return Array.isArray(data.items) ? data.items.map(normalizeHistoryItem) : []
  } catch (error) {
    throw apiError(error, 'Unable to load scan history.')
  }
}

export const clearHistory = async () => {
  try {
    const { data } = await api.delete(`/history/${getClientId()}`)
    return data.deleted_count || 0
  } catch (error) {
    throw apiError(error, 'Unable to clear scan history.')
  }
}

export const fetchStats = async () => {
  try {
    const { data } = await api.get('/stats')
    return data
  } catch (error) {
    throw apiError(error, 'Unable to load analytics.')
  }
}

export const checkHealth = async () => {
  try {
    const { data } = await api.get('/health')
    return data
  } catch (error) {
    throw apiError(error, 'Backend health check failed.')
  }
}

export default api
