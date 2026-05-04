// Liquid Glass action tile.
export default function ActionCard({ Icon, label, sub, onClick, tint = 'sys-blue' }) {
  const tintBg = {
    'sys-blue': 'bg-sys-blue/15 text-sys-blue',
    'sys-green': 'bg-sys-green/15 text-sys-green',
    'sys-orange': 'bg-sys-orange/15 text-sys-orange',
    'sys-purple': 'bg-sys-purple/15 text-sys-purple',
  }[tint]

  return (
    <button
      onClick={onClick}
      className="lg-card text-left rounded-apple-2xl p-4 press-scale"
    >
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tintBg}`}>
        <Icon className="w-[20px] h-[20px]" strokeWidth={2} />
      </div>
      <div
        className="mt-3 font-semibold text-label"
        style={{ fontSize: 15, letterSpacing: '-0.018em' }}
      >
        {label}
      </div>
      {sub && <div className="text-[12px] text-label-secondary mt-0.5">{sub}</div>}
    </button>
  )
}
