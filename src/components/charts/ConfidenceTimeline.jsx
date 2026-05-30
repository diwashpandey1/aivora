import { Line } from 'react-chartjs-2'
import './chartSetup'
import { asPercent } from '../../utils/formatters'
import { chartFont, gridColor, tickColor } from './chartSetup'

const ConfidenceTimeline = ({ confidence }) => {
  const target = asPercent(confidence)
  const points = [18, 28, 43, 57, 71, target].map((value, index) =>
    Math.min(99, Math.round(value + index * 1.5)),
  )

  const data = {
    labels: ['Intake', 'Type', 'NLP', 'Signals', 'Risk', 'Final'],
    datasets: [
      {
        label: 'Confidence',
        data: points,
        tension: 0.42,
        fill: true,
        borderColor: '#52e5ff',
        pointBackgroundColor: '#89ffcb',
        pointBorderColor: '#050711',
        pointBorderWidth: 3,
        pointRadius: 5,
        backgroundColor: 'rgba(82, 229, 255, 0.12)',
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 1500, easing: 'easeOutQuart' },
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: tickColor, font: chartFont },
      },
      y: {
        min: 0,
        max: 100,
        grid: { color: gridColor },
        ticks: { color: tickColor, font: chartFont, callback: (value) => `${value}%` },
      },
    },
  }

  return (
    <div className="h-64">
      <Line data={data} options={options} />
    </div>
  )
}

export default ConfidenceTimeline
