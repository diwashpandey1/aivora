import { Doughnut } from 'react-chartjs-2'
import './chartSetup'
import { asPercent } from '../../utils/formatters'

const ConfidenceMeter = ({ confidence }) => {
  const percent = asPercent(confidence)

  const data = {
    labels: ['Confidence', 'Remaining'],
    datasets: [
      {
        data: [percent, Math.max(100 - percent, 0)],
        borderWidth: 0,
        cutout: '78%',
        borderRadius: 18,
        backgroundColor: ['#52e5ff', 'rgba(255,255,255,0.08)'],
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 1200, easing: 'easeOutQuart' },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  }

  return (
    <div className="relative h-64">
      <Doughnut data={data} options={options} />
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <p className="font-display text-5xl font-bold text-ink">{percent}%</p>
          <p className="mt-2 text-xs font-bold uppercase tracking-[0.28em] text-cyber">
            AI Trust
          </p>
        </div>
      </div>
    </div>
  )
}

export default ConfidenceMeter
