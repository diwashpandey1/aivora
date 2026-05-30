import { useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import FloatingGradient from '../components/animations/FloatingGradient'
import NeonGridBackground from '../components/animations/NeonGridBackground'
import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'
import HistoryTable from '../components/cards/HistoryTable'
import DetectorSection from '../components/sections/DetectorSection'
import FeaturesSection from '../components/sections/FeaturesSection'
import HeroSection from '../components/sections/HeroSection'
import ResultSection from '../components/sections/ResultSection'
import { ScanContext } from '../context/ScanContext'
import { useScanHistory } from '../hooks/useScanHistory'
import { fetchStats } from '../services/api'

const Home = () => {
  const [result, setResult] = useState(null)
  const [stats, setStats] = useState(null)
  const [isLoadingStats, setIsLoadingStats] = useState(true)
  const { history, historyError, isLoadingHistory, recordScan } = useScanHistory()

  const refreshStats = useCallback(async () => {
    setIsLoadingStats(true)
    try {
      setStats(await fetchStats())
    } catch {
      setStats(null)
    } finally {
      setIsLoadingStats(false)
    }
  }, [])

  useEffect(() => {
    let isMounted = true

    fetchStats()
      .then((nextStats) => {
        if (isMounted) {
          setStats(nextStats)
        }
      })
      .catch(() => {
        if (isMounted) {
          setStats(null)
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoadingStats(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  const contextValue = useMemo(
    () => ({
      result,
      setResult,
      history,
    }),
    [history, result],
  )

  const handleAnalysisComplete = (analysis) => {
    setResult(analysis)
  }

  const handleRecordScan = async () => {
    try {
      await recordScan()
      await refreshStats()
    } catch {
      toast.error('Scan analyzed, but history could not be refreshed.')
    }
  }

  return (
    <ScanContext.Provider value={contextValue}>
      <div className="relative min-h-screen overflow-hidden">
        <NeonGridBackground />
        <FloatingGradient />
        <Navbar />
        <main>
          <HeroSection />
          <DetectorSection
            onAnalysisComplete={handleAnalysisComplete}
            recordScan={handleRecordScan}
          />
          <ResultSection
            result={result}
            stats={stats}
            isLoadingStats={isLoadingStats}
          />
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <HistoryTable
              history={history}
              isLoading={isLoadingHistory}
              error={historyError}
            />
          </div>
          <FeaturesSection />
        </main>
        <Footer />
      </div>
    </ScanContext.Provider>
  )
}

export default Home
