import {
  BrainCircuit,
  ChartNoAxesCombined,
  Fingerprint,
  LockKeyhole,
  MailCheck,
  Radar,
  ScanSearch,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'

export const smartPlaceholders = [
  'Congratulations! You won a FREE iPhone',
  'Claim your reward now',
  'Hey, are we meeting tomorrow?',
  'Your account has been suspended',
  'Click now to receive your prize',
]

export const thinkingSteps = [
  'Detecting content type...',
  'Running NLP analysis...',
  'Scanning suspicious keywords...',
  'Calculating confidence...',
  'Finalizing prediction...',
]

export const featureCards = [
  {
    title: 'AI Classification',
    description: 'Model-led classification turns raw text into clear intent signals.',
    icon: BrainCircuit,
  },
  {
    title: 'Realtime Analysis',
    description: 'Fast scan feedback with responsive loading states and confidence telemetry.',
    icon: Radar,
  },
  {
    title: 'Email & SMS Detection',
    description: 'The backend identifies content type automatically with no manual switching.',
    icon: MailCheck,
  },
  {
    title: 'ML-Powered Security',
    description: 'A cybersecurity-grade interface for modern spam and phishing triage.',
    icon: ShieldCheck,
  },
  {
    title: 'NLP Keyword Detection',
    description: 'Suspicious language patterns are elevated into readable explanations.',
    icon: ScanSearch,
  },
  {
    title: 'Smart Threat Scoring',
    description: 'Risk, probability, and confidence are composed into a practical trust view.',
    icon: ChartNoAxesCombined,
  },
]

export const navLinks = [
  { label: 'Detector', href: '#detector' },
  { label: 'Analytics', href: '#analytics' },
  { label: 'History', href: '#history' },
  { label: 'Features', href: '#features' },
]

export const techStack = [
  'React',
  'Vite',
  'TailwindCSS',
  'FastAPI',
  'Python',
  'MongoDB',
]

export const heroMetrics = [
  { label: 'Threat Scan', value: '24ms', icon: Sparkles },
  { label: 'Identity', value: 'Auto', icon: Fingerprint },
  { label: 'Secure UI', value: 'AES', icon: LockKeyhole },
]
