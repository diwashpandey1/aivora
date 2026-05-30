const CLIENT_ID_KEY = 'spam_detector_client_id'

const createClientId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }

  return `browser_${Date.now()}_${Math.random().toString(36).slice(2, 12)}`
}

export const getClientId = () => {
  const existing = localStorage.getItem(CLIENT_ID_KEY)
  if (existing) {
    return existing
  }

  const clientId = createClientId()
  localStorage.setItem(CLIENT_ID_KEY, clientId)
  return clientId
}
