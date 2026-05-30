import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from 'chart.js'

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
)

export const chartFont = {
  family: 'Inter, system-ui, sans-serif',
}

export const gridColor = 'rgba(142, 163, 183, 0.12)'
export const tickColor = 'rgba(232, 248, 255, 0.68)'
