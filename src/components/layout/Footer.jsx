import { Code2, ShieldCheck } from 'lucide-react'
import { techStack } from '../../constants/app'

const Footer = () => (
  <footer className="border-t border-white/10 px-4 py-10 sm:px-6 lg:px-8">
    <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-2xl border border-cyber/25 bg-cyber/10 text-cyber">
          <ShieldCheck className="size-5" aria-hidden="true" />
        </span>
        <div>
          <p className="font-display font-bold text-ink">AI Spam Detector</p>
          <p className="text-sm text-muted">Built for realtime ML-powered message security.</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {techStack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-muted"
          >
            {tech}
          </span>
        ))}
        <a
          href="https://github.com/"
          className="ml-1 rounded-full border border-white/10 bg-white/[0.04] p-2 text-muted transition hover:text-cyber"
          aria-label="GitHub placeholder"
        >
          <Code2 className="size-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  </footer>
)

export default Footer
