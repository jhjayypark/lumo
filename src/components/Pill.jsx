// Quiet metadata pill — neutral by default, tinted on demand. No gradients.
export default function Pill({ children, tone = 'neutral', icon: Icon = null }) {
  const tones = {
    neutral: 'bg-zinc-100 text-zinc-700',
    accent: 'bg-accent-soft text-accent-ink',
    invert: 'bg-zinc-950 text-white',
  }
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11.5px] font-medium ${tones[tone]}`}
      style={{ letterSpacing: '-0.005em' }}
    >
      {Icon && <Icon size={11} weight="fill" />}
      {children}
    </span>
  )
}
