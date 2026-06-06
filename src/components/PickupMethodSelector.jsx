import { Storefront, Lightning } from '@phosphor-icons/react'

// Two-option segmented selector: "Pick up at counter" or "Bring to charging bay".
export default function PickupMethodSelector({ value, onChange, bay }) {
  const options = [
    {
      id: 'counter',
      label: 'Pick up at counter',
      sub: 'Show order code',
      Icon: Storefront,
    },
    {
      id: 'bay',
      label: 'Bring to charging bay',
      sub: `Bay ${bay}`,
      Icon: Lightning,
      recommended: true,
    },
  ]
  return (
    <div className="grid grid-cols-2 gap-2">
      {options.map((opt) => {
        const active = value === opt.id
        return (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className={`relative text-left rounded-3xl p-3.5 border transition-all press ${
              active
                ? 'bg-zinc-950 text-white border-zinc-950 shadow-[0_8px_22px_-8px_rgba(0,0,0,0.35)]'
                : 'bg-white text-zinc-950 border-zinc-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <opt.Icon size={16} weight={active ? 'fill' : 'regular'} />
              {opt.recommended && (
                <span
                  className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded-md ${
                    active ? 'bg-accent text-white' : 'bg-accent-soft text-accent-ink'
                  }`}
                  style={{ letterSpacing: '0.04em' }}
                >
                  Recommended
                </span>
              )}
            </div>
            <div
              className="font-semibold mt-2 leading-tight"
              style={{ fontSize: 14, letterSpacing: '-0.018em' }}
            >
              {opt.label}
            </div>
            <div className={`text-[11.5px] mt-0.5 ${active ? 'opacity-70' : 'text-zinc-500'}`}>
              {opt.sub}
            </div>
          </button>
        )
      })}
    </div>
  )
}
