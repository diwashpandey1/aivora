import { useCallback, useEffect, useState } from 'react'
import { fetchHistory } from '../services/api'

export const useScanHistory = () => {
  const [history, setHistory] = useState([])
  const [isLoadingHistory, setIsLoadingHistory] = useState(true)
  const [historyError, setHistoryError] = useState('')

  const refreshHistory = useCallback(async () => {
    setIsLoadingHistory(true)
    setHistoryError('')
    try {
      const recent = await fetchHistory(10)
      setHistory(recent)
    } catch (error) {
      setHistoryError(error.message)
    } finally {
      setIsLoadingHistory(false)
    }
  }, [])

  useEffect(() => {
    let isMounted = true

    fetchHistory(10)
      .then((recent) => {
        if (isMounted) {
          setHistory(recent)
          setHistoryError('')
        }
      })
      .catch((error) => {
        if (isMounted) {
          setHistoryError(error.message)
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoadingHistory(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  return {
    history,
    historyError,
    isLoadingHistory,
    recordScan: refreshHistory,
    refreshHistory,
  }
}
