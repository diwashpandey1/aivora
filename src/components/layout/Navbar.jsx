import { Code2, ShieldCheck } from 'lucide-react'
import { navLinks } from '../../constants/app'
import GlowButton from '../ui/GlowButton'

const scrollToDetector = () => {
  document.querySelector('#detector')?.scrollIntoView({ behavior: 'smooth' })
}

const Navbar = () => (
  <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-void/55 backdrop-blur-2xl">
    <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
      <a href="#hero" className="flex items-center gap-3 rounded-full focus:outline-none focus:ring-2 focus:ring-cyber/70">
        <span className="grid size-10 place-items-center rounded-2xl border border-cyber/30 bg-cyber/10 text-cyber shadow-glow">
          <ShieldCheck className="size-5" aria-hidden="true" />
        </span>
        <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-ink sm:text-base">
          NeuroShield
        </span>
      </a>

      <div className="hidden items-center gap-6 md:flex">
        {navLinks.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="text-sm font-medium text-muted transition hover:text-cyber focus:outline-none focus:ring-2 focus:ring-cyber/70"
          >
            {item.label}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <a
          href="https://github.com/"
          aria-label="GitHub placeholder"
          className="hidden rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-muted transition hover:border-cyber/30 hover:text-cyber focus:outline-none focus:ring-2 focus:ring-cyber/70 sm:inline-flex"
        >
          <Code2 className="size-4" aria-hidden="true" />
        </a>
        <GlowButton type="button" onClick={scrollToDetector} className="px-4 py-2.5">
          Analyze
        </GlowButton>
      </div>
    </nav>
  </header>
)

export default Navbar
