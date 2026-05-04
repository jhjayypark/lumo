// Quick-action tile — icon + label, white card, no fluff.
export default function ActionTile({ Icon, label, sub, onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-left bg-surface border border-zinc-200/80 rounded-3xl p-4 press hover:border-zinc-300 transition-colors shadow-diffuse"
    >
      <div className="w-9 h-9 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-950">
        <Icon size={18} weight="regular" />
      </div>
      <div
        className="mt-3 font-semibold text-zinc-950"
        style={{ fontSize: 14.5, letterSpacing: '-0.02em' }}
      >
        {label}
      </div>
      {sub && (
        <div
          className="text-[12px] text-zinc-500 mt-0.5"
          style={{ letterSpacing: '-0.005em' }}
        >
          {sub}
        </div>
      )}
    </button>
  )
}
