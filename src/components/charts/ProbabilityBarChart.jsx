import { Bar } from 'react-chartjs-2'
import './chartSetup'
import { asPercent } from '../../utils/formatters'
import { chartFont, gridColor, tickColor } from './chartSetup'

const ProbabilityBarChart = ({ spamProbability, safeProbability }) => {
  const data = {
    labels: ['Spam', 'Safe'],
    datasets: [
      {
        label: 'Probability',
        data: [asPercent(spamProbability), asPercent(safeProbability)],
        borderRadius: 16,
        borderSkipped: false,
        backgroundColor: ['rgba(255, 77, 109, 0.82)', 'rgba(137, 255, 203, 0.82)'],
        hoverBackgroundColor: ['#ff4d6d', '#89ffcb'],
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 1100, easing: 'easeOutQuart' },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(5, 7, 17, 0.92)',
        borderColor: 'rgba(82, 229, 255, 0.28)',
        borderWidth: 1,
        titleFont: chartFont,
        bodyFont: chartFont,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: tickColor, font: chartFont },
      },
      y: {
        max: 100,
        grid: { color: gridColor },
        ticks: { color: tickColor, font: chartFont, callback: (value) => `${value}%` },
      },
    },
  }

  return (
    <div className="h-64">
      <Bar data={data} options={options} />
    </div>
  )
}

export default ProbabilityBarChart
