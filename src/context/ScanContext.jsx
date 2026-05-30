import { createContext, useContext } from 'react'

export const ScanContext = createContext(null)

export const useScanContext = () => {
  const value = useContext(ScanContext)

  if (!value) {
    throw new Error('useScanContext must be used inside ScanContext.Provider')
  }

  return value
}
