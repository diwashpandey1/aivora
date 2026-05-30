import { Doughnut } from 'react-chartjs-2'
import './chartSetup'
import { asPercent } from '../../utils/formatters'

const SafeSpamDonut = ({ spamProbability, safeProbability }) => {
  const data = {
    labels: ['Spam', 'Safe'],
    datasets: [
      {
        data: [asPercent(spamProbability), asPercent(safeProbability)],
        backgroundColor: ['rgba(255, 77, 109, 0.88)', 'rgba(137, 255, 203, 0.88)'],
        borderColor: ['rgba(255, 77, 109, 0.18)', 'rgba(137, 255, 203, 0.18)'],
        borderWidth: 6,
        cutout: '68%',
        hoverOffset: 8,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { animateRotate: true, duration: 1200 },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'rgba(232, 248, 255, 0.72)',
          usePointStyle: true,
          padding: 18,
          font: { family: 'Inter, system-ui, sans-serif', weight: 700 },
        },
      },
    },
  }

  return (
    <div className="h-64">
      <Doughnut data={data} options={options} />
    </div>
  )
}

export default SafeSpamDonut
