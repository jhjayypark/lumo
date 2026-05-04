// Editorial section header — small, calm, sits OUTSIDE/ABOVE its content (gallery style).
export default function SectionHeader({ kicker, title, action, onAction }) {
  return (
    <div className="flex items-end justify-between mb-3 px-1">
      <div>
        {kicker && (
          <div
            className="text-[11px] font-medium text-zinc-500 uppercase mb-1"
            style={{ letterSpacing: '0.06em' }}
          >
            {kicker}
          </div>
        )}
        <h3
          className="font-semibold text-zinc-950 leading-none"
          style={{ fontSize: 18, letterSpacing: '-0.022em' }}
        >
          {title}
        </h3>
      </div>
      {action && (
        <button
          onClick={onAction}
          className="text-[13px] text-zinc-500 hover:text-zinc-950 press transition-colors"
        >
          {action}
        </button>
      )}
    </div>
  )
}
