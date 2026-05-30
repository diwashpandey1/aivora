# Aivora: AI-Powered Spam Detection Frontend

A **modern, responsive React web application** for AI-powered spam detection. Built with React 19, Vite, Tailwind CSS, Framer Motion, and Chart.js - featuring real-time spam analysis, visual analytics, and persistent scan history.

---

## 📋 Project Overview

**What it does:**
- Provides an intuitive UI for users to paste SMS/email messages
- Sends messages to the backend ML API for spam detection
- Displays detailed analysis results with confidence scores
- Shows visual charts and analytics
- Maintains scan history with Firebase Firestore
- Generates smart explanations of why a message is flagged as spam

**Key Technologies:**
- **React 19** - Modern UI framework with hooks
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Chart.js** - Data visualization
- **Axios** - HTTP client
- **Firebase** - Firestore for optional analytics
- **React Hot Toast** - Notifications

---

## 🏗️ Architecture & Technical Components

### **1. Build System & Configuration**

#### **Vite (`vite.config.js`)**
Vite is a next-generation build tool that:
- **Fast HMR (Hot Module Replacement)**: Changes appear instantly while coding
- **Optimized Production Builds**: Automatic code splitting, minification, tree-shaking
- **ES Modules**: Native ES6 import/export support
- **Framework Integration**: React plugin for JSX compilation

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

**Why Vite over Webpack?**
- ⚡ Cold start: ~300ms vs ~10s with Webpack
- 🔄 HMR: Instant updates (not page refresh)
- 📦 Build: Tree-shaking removes unused code
- 🎯 ES modules native support = faster dev experience

#### **Tailwind CSS (v4)**
Utility-first CSS framework with:
- **No CSS to write** - Use predefined classes
- **Responsive design** - Mobile-first breakpoints (sm, md, lg, xl, 2xl)
- **Custom theme** - Dark mode, custom colors via config
- **Smaller bundle** - Only used styles included in build

```html
<!-- Example: Responsive padding, text color, rounded borders -->
<div class="px-4 sm:px-6 lg:px-8 text-ink rounded-xl bg-void/55">
```

---

### **2. React Component Architecture**

React is organized into a **component tree** with unidirectional data flow:

```
<App>
  ├─ <Navbar />
  ├─ <HeroSection />
  ├─ <DetectorSection />     ← User inputs text here
  │   └─ runs analysis → calls API
  ├─ <ResultSection />       ← Shows AI results
  │   ├─ <ConfidenceMeter />
  │   ├─ <SafeSpamDonut />
  │   ├─ <ProbabilityBarChart />
  │   └─ <KeywordRiskChart />
  ├─ <HistoryTable />        ← Shows past scans
  ├─ <FeaturesSection />
  └─ <Footer />
```

#### **Key Concepts:**

**State Management:**
```javascript
// Local state in a component
const [text, setText] = useState('')
const [isAnalyzing, setIsAnalyzing] = useState(false)

// Context for shared state across components
const [result, setResult] = useState(null)  // Shared via ScanContext
```

**Props (Data Down):**
```javascript
// Parent passes data to child
<ResultSection result={result} stats={stats} isLoadingStats={isLoadingStats} />

// Child receives props
const ResultSection = ({ result, stats, isLoadingStats }) => { ... }
```

**Callbacks (Events Up):**
```javascript
// Parent passes function to child to handle events
<DetectorSection onAnalysisComplete={handleAnalysisComplete} />

// Child calls it when analysis finishes
const runAnalysis = async () => {
  const result = await analyzeContent(text)
  onAnalysisComplete(result)  // ← Notify parent
}
```

---

### **3. Core Pages & Sections**

#### **Home Page (`src/pages/Home.jsx`)**

The main entry point orchestrating the entire UI:

```javascript
const Home = () => {
  // State for scan results and history
  const [result, setResult] = useState(null)
  const [stats, setStats] = useState(null)
  const { history, historyError, isLoadingHistory, recordScan } = useScanHistory()

  // Provide context to child components
  const contextValue = useMemo(() => ({
    result,
    setResult,
    history,
  }), [history, result])

  return (
    <ScanContext.Provider value={contextValue}>
      <Navbar />
      <HeroSection />
      <DetectorSection onAnalysisComplete={handleAnalysisComplete} />
      <ResultSection result={result} stats={stats} />
      <HistoryTable history={history} />
      <FeaturesSection />
      <Footer />
    </ScanContext.Provider>
  )
}
```

**Why this structure?**
- Centralized state management
- Context provides data to nested components without prop drilling
- Separation of concerns: each section has a single responsibility

---

#### **DetectorSection (`src/components/sections/DetectorSection.jsx`)**

The **analysis input UI** where users paste messages:

```javascript
const DetectorSection = ({ onAnalysisComplete, recordScan }) => {
  const [text, setText] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const placeholder = usePlaceholderRotation(smartPlaceholders)  // Rotating placeholders

  const runAnalysis = async () => {
    setIsAnalyzing(true)
    try {
      const result = await analyzeContent(text.trim())
      onAnalysisComplete(result)  // Notify parent
      await recordScan()          // Save to history
      toast.success('AI analysis complete.')
      scrollToResults()
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <GlassCard className="...">
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <GlowButton onClick={runAnalysis} isLoading={isAnalyzing}>
        {isAnalyzing ? 'Analyzing...' : 'Analyze'}
      </GlowButton>
      {isAnalyzing && <ScanLoader />}
    </GlassCard>
  )
}
```

**Key Features:**
- **Character counter**: Shows message length
- **Keyboard shortcut**: Ctrl+Enter to submit (better UX)
- **Loading state**: Shows spinner during analysis
- **Error handling**: Toast notifications for failures
- **Placeholder rotation**: Engaging message examples rotate every 2.6s

---

#### **ResultSection (`src/components/sections/ResultSection.jsx`)**

Displays **analysis results** with interactive charts:

```
Result Section
├─ Prediction Badge      (SPAM / SAFE with color coding)
├─ Confidence Meter      (Circular progress 0-100%)
├─ Safe/Spam Donut       (Pie chart of probabilities)
├─ Probability Bar       (Side-by-side spam vs safe bars)
├─ Keyword Risk Chart    (Top suspicious keywords)
└─ Global Stats          (System-wide analytics)
```

**Data-Driven Rendering:**
```javascript
const ResultSection = ({ result, stats, isLoadingStats }) => {
  if (!result) return <EmptyState />  // Nothing to show yet
  
  return (
    <section id="results">
      <PredictionBadge prediction={result.prediction} />
      <ConfidenceMeter confidence={result.confidence} />
      <SafeSpamDonut 
        spamScore={result.chart_data.spam_score}
        safeScore={result.chart_data.safe_score}
      />
      {stats && <StatsOverview stats={stats} />}
    </section>
  )
}
```

---

### **4. Hooks: Reusable Logic**

React Hooks encapsulate stateful logic that can be reused across components.

#### **useScanHistory (`src/hooks/useScanHistory.js`)**

Manages fetching and caching scan history:

```javascript
export const useScanHistory = () => {
  const [history, setHistory] = useState([])
  const [isLoadingHistory, setIsLoadingHistory] = useState(true)
  const [historyError, setHistoryError] = useState('')

  // Cleanup pattern: prevent state updates on unmounted components
  useEffect(() => {
    let isMounted = true  // ← Track if component is still mounted

    fetchHistory(10)
      .then((recent) => {
        if (isMounted) setHistory(recent)  // ← Only update if mounted
      })
      .catch((error) => {
        if (isMounted) setHistoryError(error.message)
      })
      .finally(() => {
        if (isMounted) setIsLoadingHistory(false)
      })

    return () => {
      isMounted = false  // ← Cleanup: mark as unmounted
    }
  }, [])

  const refreshHistory = useCallback(async () => {
    setIsLoadingHistory(true)
    try {
      const recent = await fetchHistory(10)
      setHistory(recent)
    } catch (error) {
      setHistoryError(error.message)
    } finally {
      setIsLoadingHistory(false)
    }
  }, [])

  return { history, historyError, isLoadingHistory, recordScan: refreshHistory }
}
```

**Why this pattern?**
- **Memory leak prevention**: Cleanup function prevents updating unmounted components
- **Error handling**: Graceful fallback on API failures
- **Reusability**: Any component can call `useScanHistory()`

---

#### **usePlaceholderRotation (`src/hooks/usePlaceholderRotation.js`)**

Custom hook for rotating placeholder text:

```javascript
export const usePlaceholderRotation = (items, delay = 2600) => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!items.length) return

    // Create interval to rotate items every 2.6 seconds
    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % items.length)
    }, delay)

    // Cleanup interval on unmount
    return () => window.clearInterval(interval)
  }, [delay, items.length])

  return items[index]  // Return current item
}
```

**Usage:**
```javascript
const placeholder = usePlaceholderRotation([
  'Win a free iPhone!',
  'Claim your prize now!',
  'Urgent: Click here',
  // ... more examples
])

// Returns one item, rotates every 2.6s
<textarea placeholder={`Paste a message... ${placeholder}`} />
```

---

### **5. Context API: Shared State**

React Context avoids **prop drilling** (passing props through many levels):

```javascript
// Without Context (prop drilling is tedious):
<App result={result}>
  <Home result={result}>
    <ResultSection result={result}>
      <Chart result={result} />  ← result passed through 4 levels!
    </ResultSection>
  </Home>
</App>

// With Context (clean):
<ScanContext.Provider value={{result}}>
  <App>
    <Chart />  ← Can access result directly!
  </Chart>
</ScanContext.Provider>
```

**Implementation:**
```javascript
// src/context/ScanContext.jsx
export const ScanContext = createContext(null)

export const useScanContext = () => {
  const value = useContext(ScanContext)
  if (!value) throw new Error('Must be inside Provider')
  return value
}

// Usage in component
const MyComponent = () => {
  const { result, history } = useScanContext()  // ← Access shared state
  return <div>{result.prediction}</div>
}
```

---

### **6. API Integration: Services Layer**

#### **API Client (`src/services/api.js`)**

Centralized HTTP communication with the backend:

```javascript
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  timeout: 25000,
  headers: { 'Content-Type': 'application/json' },
})

// Error handling wrapper
const apiError = (error, fallback) => {
  const message = 
    error.response?.data?.detail ||    // Backend error message
    error.response?.data?.message ||
    error.message ||
    fallback
  return new Error(message, { cause: error })
}
```

**Why separate API layer?**
- **Centralized configuration**: One place to change base URL, headers, timeouts
- **Error handling**: Consistent error formatting
- **Normalization**: Transform backend responses to frontend format

---

#### **Request Methods:**

```javascript
// POST /analyze - Analyze a message
export const analyzeContent = async (message) => {
  try {
    const { data } = await api.post('/analyze', {
      message,
      client_id: getClientId(),  // Browser identity
    })
    return normalizeAnalysis(data)  // Transform response
  } catch (error) {
    throw apiError(error, 'Unable to analyze content.')
  }
}

// GET /history/{client_id} - Fetch past scans
export const fetchHistory = async (limit = 10) => {
  try {
    const { data } = await api.get(`/history/${getClientId()}`, {
      params: { limit },
    })
    return data.items.map(normalizeHistoryItem)
  } catch (error) {
    throw apiError(error, 'Unable to load scan history.')
  }
}

// DELETE /history/{client_id} - Clear history
export const clearHistory = async () => {
  try {
    const { data } = await api.delete(`/history/${getClientId()}`)
    return data.deleted_count
  } catch (error) {
    throw apiError(error, 'Unable to clear scan history.')
  }
}

// GET /stats - Global analytics
export const fetchStats = async () => {
  try {
    return await api.get('/stats')
  } catch (error) {
    throw apiError(error, 'Unable to load analytics.')
  }
}

// GET /health - Backend health check
export const checkHealth = async () => {
  try {
    return await api.get('/health')
  } catch (error) {
    throw apiError(error, 'Backend health check failed.')
  }
}
```

---

#### **Response Normalization:**

Transform backend responses to frontend format:

```javascript
export const normalizeAnalysis = (data = {}) => {
  const spamProbability = Number(data.spam_probability || 0)
  const safeProbability = Number(data.safe_probability ?? 1 - spamProbability)

  return {
    // Standard fields
    detected_type: data.detected_type || 'sms',
    prediction: data.prediction || 'safe',
    confidence: Number(data.confidence || 0),
    spam_probability: spamProbability,
    safe_probability: safeProbability,
    risk_level: data.risk_level || 'low',
    keywords_detected: data.keywords_detected || [],

    // Chart data
    chart_data: {
      spam_score: Math.round(spamProbability * 100),
      safe_score: Math.round(safeProbability * 100),
    },

    // Analytics payload
    analytics: data.analytics,

    // Frontend-specific
    explanations: toExplanations(data),      // Human-readable explanations
    keyword_risks: toKeywordRisks(data.keywords_detected, spamProbability),
  }
}

// Generate human-readable explanations
const toExplanations = (data) => {
  const keywords = data.keywords_detected || []
  return [
    `The backend classified this as ${data.detected_type || 'message'} content.`,
    `Model confidence is ${Number(data.confidence || 0).toFixed(1)}%.`,
    keywords.length
      ? `Suspicious language detected: ${keywords.slice(0, 5).join(', ')}.`
      : 'No high-risk keywords detected.',
  ]
}

// Rank keywords by risk
const toKeywordRisks = (keywords = [], spamProbability = 0) =>
  keywords.slice(0, 8).map((keyword, index) => ({
    keyword: keyword.toUpperCase(),
    risk: Math.min(100, Math.round((spamProbability * 100) + 8 + index * 3)),
  }))
```

---

### **7. Browser Identity Management**

#### **clientIdentity.js**

Anonymous user tracking without storing personal data:

```javascript
const CLIENT_ID_KEY = 'spam_detector_client_id'

const createClientId = () => {
  // Modern browsers: crypto.randomUUID()
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }

  // Fallback: timestamp + random string
  return `browser_${Date.now()}_${Math.random().toString(36).slice(2, 12)}`
}

export const getClientId = () => {
  // Check if already stored
  const existing = localStorage.getItem(CLIENT_ID_KEY)
  if (existing) return existing

  // Create and store new ID
  const clientId = createClientId()
  localStorage.setItem(CLIENT_ID_KEY, clientId)
  return clientId
}
```

**Why this approach?**
- ✅ **Privacy**: No personal data, just a unique browser fingerprint
- ✅ **Persistence**: ID survives page refreshes (stored in localStorage)
- ✅ **Correlation**: Backend can group scans from same browser
- ✅ **Anonymous**: No login required

**Storage flow:**
```
First visit:        localStorage is empty
                    → Generate random UUID
                    → Store in localStorage

Second visit:       localStorage has UUID
                    → Use existing UUID
                    → Browser scans are grouped

After cache clear:  localStorage is cleared
                    → Generate new UUID
                    → Creates new profile (privacy respected)
```

---

### **8. UI Components: Design System**

Reusable components for consistent design:

**GlassCard** - Frosted glass effect:
```jsx
<GlassCard className="p-6">
  Content with semi-transparent background + blur
</GlassCard>
```

**GlowButton** - Interactive button with glow:
```jsx
<GlowButton onClick={runAnalysis} isLoading={isAnalyzing}>
  {isAnalyzing ? 'Analyzing...' : 'Analyze'}
</GlowButton>
```

**ScanLoader** - Loading animation:
```jsx
{isAnalyzing && <ScanLoader />}
```

---

### **9. Data Visualization: Charts**

#### **Chart Setup (`src/components/charts/chartSetup.js`)**

Configure Chart.js with custom theme:

```javascript
import { Chart } from 'chart.js'

// Register plugins for better rendering
Chart.register(...)

// Default options for all charts
export const getChartOptions = () => ({
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: true,
      labels: { color: 'rgba(231, 249, 255, 0.8)' },  // Light blue
    },
  },
  scales: {
    y: { grid: { color: 'rgba(148, 163, 184, 0.1)' } },
  },
})
```

#### **Chart Components:**

**SafeSpamDonut** - Pie chart of probabilities:
```jsx
const SafeSpamDonut = ({ spamScore, safeScore }) => {
  const data = {
    labels: ['Spam', 'Safe'],
    datasets: [{
      data: [spamScore, safeScore],
      backgroundColor: ['#ff4545', '#14b8a6'],
      borderRadius: 8,
    }],
  }
  return <Doughnut data={data} options={chartOptions} />
}
```

**ConfidenceMeter** - Circular progress:
```jsx
const ConfidenceMeter = ({ confidence }) => {
  const circumference = 2 * Math.PI * 45  // Circle radius = 45
  const strokeDashoffset = circumference * (1 - confidence / 100)
  
  return (
    <svg className="w-32 h-32">
      <circle cx="50%" cy="50%" r="45" strokeDashoffset={strokeDashoffset} />
      <text x="50%" y="50%">{confidence}%</text>
    </svg>
  )
}
```

**KeywordRiskChart** - Horizontal bar chart:
```jsx
const KeywordRiskChart = ({ keywords }) => {
  const data = {
    labels: keywords.map(k => k.keyword),
    datasets: [{
      label: 'Risk Score',
      data: keywords.map(k => k.risk),
      backgroundColor: 'rgba(255, 69, 69, 0.7)',
    }],
  }
  return <Bar data={data} options={chartOptions} />
}
```

---

### **10. Styling & Animations**

#### **Tailwind CSS Design System**

Custom color palette configured in Tailwind:

```
Color Names      Hex Value    Usage
────────────────────────────────────────
ink              #e7f9ff      Primary text (light blue)
muted            #8998b3      Secondary text (gray-blue)
void             #0f172a      Dark backgrounds
cyber            #5adcff      Accent/hover (bright cyan)
ion              #14b8a6      Success/safe (teal)
danger           #ff4545      Danger/spam (red)
signal           #ff8c00      Warning (orange)
```

**Responsive Design:**
```html
<!-- Mobile: full width, Tablet: 50%, Desktop: 33% -->
<div class="w-full md:w-1/2 lg:w-1/3">
```

#### **Framer Motion: Animations**

Smooth animations for UI elements:

```javascript
import { motion } from 'framer-motion'

// Fade + slide animation on scroll
<motion.div
  initial={{ opacity: 0, y: 24 }}        // Start state
  whileInView={{ opacity: 1, y: 0 }}     // End state (triggers on scroll)
  viewport={{ once: true }}              // Animation once per view
  transition={{ duration: 0.65 }}        // Smooth timing
>
  Animated content
</motion.div>

// Entrance animations
<motion.button
  whileHover={{ scale: 1.05 }}           // On hover
  whileTap={{ scale: 0.95 }}             // On click
  transition={{ type: 'spring' }}
>
  Click me
</motion.button>
```

---

### **11. Notifications: React Hot Toast**

User-friendly toast notifications:

```javascript
import toast from 'react-hot-toast'

// Success notification
toast.success('AI analysis complete.')

// Error notification
toast.error('Unable to analyze content.')

// Custom styling (from App.jsx)
<Toaster
  position="top-right"
  toastOptions={{
    duration: 3600,
    style: {
      background: 'rgba(7, 12, 24, 0.92)',
      border: '1px solid rgba(90, 220, 255, 0.24)',
      color: '#e7f9ff',
    },
  }}
/>
```

---

### **12. Optional: Firebase Integration**

#### **Firebase Analytics (`src/services/firebase.js`)**

Optional cloud storage for advanced analytics:

```javascript
import { initializeApp } from 'firebase/app'
import { getFirestore, addDoc, collection, serverTimestamp } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  // ... other config
}

export const db = isFirebaseConfigured ? getFirestore(initializeApp(firebaseConfig)) : null

// Save scan to Firebase
export const saveScan = async ({ text, detectedType, prediction, confidence }) => {
  if (!db) return null
  
  return addDoc(collection(db, 'scans'), {
    text,
    detectedType,
    prediction,
    confidence,
    timestamp: serverTimestamp(),  // Server-side timestamp
  })
}

// Save user feedback
export const saveFeedback = async ({ userPrediction, aiPrediction, additionalFeedback }) => {
  if (!db) return null
  
  return addDoc(collection(db, 'feedback'), {
    userPrediction,
    aiPrediction,
    additionalFeedback,
    timestamp: serverTimestamp(),
  })
}
```

**Benefits:**
- Store detailed scan logs for training data
- Collect user feedback to improve models
- Real-time analytics dashboard
- Completely optional (app works without Firebase)

---

### **13. Performance Optimizations**

#### **useCallback: Memoize Functions**
```javascript
// Without useCallback: new function created every render
const refreshStats = () => { ... }

// With useCallback: same function reference, unless dependencies change
const refreshStats = useCallback(async () => {
  ...
}, [])  // Dependencies: run this function only on mount
```

#### **useMemo: Memoize Values**
```javascript
// Recalculate only when dependencies change
const contextValue = useMemo(
  () => ({
    result,
    setResult,
    history,
  }),
  [history, result],  // Recalculate if history or result change
)
```

#### **Lazy Loading: Code Splitting**
```javascript
const ResultSection = lazy(() => import('./ResultSection'))

<Suspense fallback={<Spinner />}>
  <ResultSection />
</Suspense>
```

---

## 🚀 How to Set Up & Run

### **1. Prerequisites**
- Node.js 16+
- npm or yarn

### **2. Installation**
```bash
git clone https://github.com/diwashpandey1/aivora.git
cd aivora
npm install
```

### **3. Environment Setup**
```bash
cp .env.example .env
```

Edit `.env`:
```env
# Required
VITE_API_BASE_URL=http://localhost:8000

# Optional (for Firebase analytics)
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_FIREBASE_PROJECT_ID=your_firebase_project
# ... other Firebase config
```

### **4. Development Server**
```bash
npm run dev
```

Server starts at `http://localhost:5173`

### **5. Build for Production**
```bash
npm run build
npm run preview  # Test production build locally
```

---

## 📊 Data Flow Diagram

```
User Types Message
        ↓
[DetectorSection]
        ↓
analyzeContent() → POST /analyze
        ↓
[Backend: ML Model Analysis]
        ↓
Backend returns analysis
        ↓
normalizeAnalysis() → Transform response
        ↓
onAnalysisComplete(result)
        ↓
[ResultSection] displays charts
        ↓
recordScan() → Save to Firebase + refresh history
        ↓
fetchHistory() → GET /history/{client_id}
        ↓
[HistoryTable] shows past scans
```

---

## 🎯 Key Interview Topics

### **React Fundamentals:**

**Q: "What are React Hooks?"**
- Functions that let you "hook into" React features
- `useState`: Manage component state
- `useEffect`: Run side effects (API calls, subscriptions)
- `useContext`: Access shared state
- `useCallback`: Memoize functions to prevent re-renders
- `useMemo`: Memoize expensive calculations

**Q: "Explain the component lifecycle"**
- **Mount**: Component added to DOM → `useEffect` with empty deps
- **Update**: State/props change → component re-renders
- **Unmount**: Component removed → cleanup function in `useEffect`

**Q: "What's the difference between props and state?"**
- **Props**: Passed from parent, read-only
- **State**: Owned by component, can be changed

---

### **State Management:**

**Q: "Why use Context instead of prop drilling?"**
- **Prop drilling**: Pass props through many levels (tedious, hard to refactor)
- **Context**: Global state accessible to all nested components
- **Trade-off**: Context causes all consumers to re-render on update

**Q: "How do you prevent unnecessary re-renders?"**
- `useMemo()`: Memoize values
- `useCallback()`: Memoize functions
- `React.memo()`: Memoize components
- Proper dependency arrays in hooks

---

### **API Integration:**

**Q: "How do you handle API errors?"**
```javascript
try {
  const result = await api.post('/analyze', { message })
  return normalizeAnalysis(result.data)
} catch (error) {
  const message = error.response?.data?.detail || 'Failed'
  toast.error(message)
  throw new Error(message)
}
```

**Q: "Why separate API layer from components?"**
- Centralized error handling
- Consistent request/response format
- Easy to mock for testing
- Single place to change base URL or headers

---

### **Styling & UX:**

**Q: "How does Tailwind CSS work?"**
- Utility-first CSS framework
- Pre-built classes for common styles
- Responsive design: `sm:`, `md:`, `lg:` prefixes
- PurgeCSS: Only includes used classes in bundle

**Q: "Why animations matter?"**
- Smooth transitions = modern feel
- Guide user attention
- Show loading states
- Provide feedback on interactions

---

### **Performance:**

**Q: "What are Core Web Vitals?"**
- **LCP (Largest Contentful Paint)**: Time for main content to load
- **FID (First Input Delay)**: Time for page to respond to input
- **CLS (Cumulative Layout Shift)**: Visual stability

**Optimization strategies:**
- Code splitting with dynamic imports
- Image optimization (lazy loading)
- Minify/bundle CSS/JS
- Caching strategies

---

## 📁 Project Structure

```
src/
├── App.jsx                          # Root component
├── main.jsx                         # Entry point
├── index.css                        # Global styles
│
├── components/                      # Reusable UI components
│   ├── animations/
│   │   ├── FloatingGradient.jsx
│   │   └── NeonGridBackground.jsx
│   ├── cards/
│   │   └── HistoryTable.jsx         # Display past scans
│   ├── charts/
│   │   ├── SafeSpamDonut.jsx        # Pie chart
│   │   ├── ConfidenceMeter.jsx      # Circular progress
│   │   ├── ProbabilityBarChart.jsx  # Bar chart
│   │   ├── KeywordRiskChart.jsx     # Risk visualization
│   │   ├── ConfidenceTimeline.jsx   # Timeline
│   │   └── chartSetup.js            # Chart configuration
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── sections/
│   │   ├── HeroSection.jsx          # Landing section
│   │   ├── DetectorSection.jsx      # Analysis input
│   │   ├── ResultSection.jsx        # Results display
│   │   └── FeaturesSection.jsx      # Features showcase
│   └── ui/
│       ├── GlassCard.jsx
│       ├── GlowButton.jsx
│       └── ScanLoader.jsx
│
├── pages/
│   └── Home.jsx                     # Main page (orchestrator)
│
├── hooks/                           # Custom React hooks
│   ├── usePlaceholderRotation.js    # Rotating placeholder text
│   └── useScanHistory.js            # Fetch & manage history
│
├── context/
│   └── ScanContext.jsx              # Shared scan data
│
├── services/
│   ├── api.js                       # Backend HTTP client
│   └── firebase.js                  # Firebase integration
│
├── utils/
│   ├── clientIdentity.js            # Anonymous user ID
│   ├── formatters.js                # Text/date formatting
│   └── constants/
│       └── app.js                   # Static data (placeholders, etc)
│
└── constants/                       # App configuration
    ├── navigation.js
    ├── placeholders.js
    └── metrics.js
```

---

## 🎓 Advanced Topics

### **SEO Optimization**

Properly configured `index.html` with meta tags:

```html
<title>AI Spam Detector | Smart Email & SMS Spam Detection</title>
<meta name="description" content="..." />
<meta property="og:title" content="AI Spam Detector" />
<meta property="og:image" content="/preview.png" />
<meta name="twitter:card" content="summary_large_image" />
```

Why? Google indexes these for search results. Twitter/Facebook use them for previews.

---

### **Accessibility (a11y)**

```jsx
// Good: Proper labels, roles, keyboard navigation
<textarea
  id="content"
  aria-describedby="shortcut-help"
  placeholder="Paste an email..."
/>
<p id="shortcut-help">Press Ctrl + Enter to analyze</p>

// Screen readers read labels + help text
```

---

### **Error Boundaries**

Catch errors in React components:

```jsx
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo)
  }
  render() {
    if (this.state.hasError) return <ErrorFallback />
    return this.props.children
  }
}
```

---

## 💡 Interview Talking Points

### **When asked "Tell me about this project":**
```
"Aivora is a modern React web application for AI-powered spam detection. 
I built it to practice full-stack development with:

Frontend (React):
- Component-driven architecture with hooks
- Context API for state management
- Axios for backend communication
- Tailwind CSS for responsive design
- Chart.js for data visualization

Key features:
- Real-time ML analysis with visual results
- Browser-level scan history (localStorage + Firebase)
- Smooth animations with Framer Motion
- Anonymous user tracking for analytics

Technical decisions:
- Vite for fast development + optimized builds
- Hooks for cleaner, more reusable logic
- API normalization layer for flexibility
- Separate concerns: Components, Services, Utils
"
```

### **For deep-dive questions:**

**Q: "How do you manage state in a React app?"**
- Local state: `useState` in components
- Shared state: Context API + `useContext`
- Complex state: Redux/Zustand (not needed here)

**Q: "Explain the lifecycle of an API call"**
1. User clicks "Analyze"
2. Component calls `analyzeContent(message)`
3. API makes POST request: `/analyze`
4. Backend processes → ML model runs
5. Backend returns JSON response
6. Frontend normalizes response
7. Set state → component re-renders
8. Charts display results

**Q: "How would you improve performance?"**
- Code splitting: Load components on demand
- Image optimization: WebP + lazy loading
- Bundle analysis: Identify large dependencies
- Caching: Service Worker for offline mode
- API optimization: Debounce requests

---

## 🚀 Deployment

### **Deployed on Firebase Hosting** (`.firebaserc` + `firebase.json` configured)

```bash
# Build production bundle
npm run build

# Deploy to Firebase
firebase deploy
```

---

## 📝 Summary

**Aivora Frontend** demonstrates:
- ✅ Modern React patterns (Hooks, Context, Components)
- ✅ API integration with error handling
- ✅ Beautiful UI with Tailwind + Framer Motion
- ✅ Data visualization with Chart.js
- ✅ State management without Redux
- ✅ Browser-level identity (privacy-first)
- ✅ Performance optimization (Vite, memoization)
- ✅ Responsive design (mobile to desktop)

**Perfect for portfolio** because it shows:
- React proficiency
- Clean architecture (separation of concerns)
- Modern tooling (Vite, Tailwind)
- Problem-solving (API normalization, error handling)
- UX thinking (animations, loading states)

Good luck with your interview! 🎉
