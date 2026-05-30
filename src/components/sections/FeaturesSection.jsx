import SectionHeading from '../ui/SectionHeading'
import FeatureCard from '../cards/FeatureCard'
import { featureCards } from '../../constants/app'

const FeaturesSection = () => (
  <section id="features" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
    <SectionHeading
      eyebrow="Platform Features"
      title="Cybersecurity polish for an ML product"
      description="A focused frontend architecture for automatic content detection, model explanations, scan history, and anonymous feedback."
    />

    <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {featureCards.map((feature, index) => (
        <FeatureCard key={feature.title} {...feature} index={index} />
      ))}
    </div>
  </section>
)

export default FeaturesSection
