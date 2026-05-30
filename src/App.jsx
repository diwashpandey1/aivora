import { Toaster } from 'react-hot-toast'
import Home from './pages/Home'

function App() {
  return (
    <>
      <Home />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3600,
          style: {
            background: 'rgba(7, 12, 24, 0.92)',
            border: '1px solid rgba(90, 220, 255, 0.24)',
            color: '#e7f9ff',
            boxShadow: '0 20px 80px rgba(0, 0, 0, 0.35)',
            backdropFilter: 'blur(18px)',
          },
        }}
      />
    </>
  )
}

export default App
