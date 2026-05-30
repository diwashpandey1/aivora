import { Bar } from 'react-chartjs-2'
import './chartSetup'
import { chartFont, gridColor, tickColor } from './chartSetup'

const fallbackRisks = [
  { keyword: 'URGENT', risk: 72 },
  { keyword: 'REWARD', risk: 58 },
  { keyword: 'LINK', risk: 44 },
]

const KeywordRiskChart = ({ keywordRisks = [] }) => {
  const risks = keywordRisks.length ? keywordRisks : fallbackRisks

  const data = {
    labels: risks.map((item) => item.keyword),
    datasets: [
      {
        label: 'Risk',
        data: risks.map((item) => item.risk),
        borderRadius: 999,
        borderSkipped: false,
        backgroundColor: risks.map((_, index) =>
          index % 2 === 0 ? 'rgba(82, 229, 255, 0.78)' : 'rgba(167, 139, 250, 0.78)',
        ),
      },
    ],
  }

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 1200, easing: 'easeOutQuart' },
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        max: 100,
        grid: { color: gridColor },
        ticks: { color: tickColor, font: chartFont, callback: (value) => `${value}%` },
      },
      y: {
        grid: { display: false },
        ticks: { color: tickColor, font: chartFont },
      },
    },
  }

  return (
    <div className="h-64">
      <Bar data={data} options={options} />
    </div>
  )
}

export default KeywordRiskChart
