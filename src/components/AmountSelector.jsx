import { fmtKHR } from '../data/mock.js'

// Grid of preset top-up amounts + a Custom option.
export default function AmountSelector({ presets, value, onChange, onCustom }) {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {presets.map((amount) => {
        const active = value === amount
        return (
          <button
            key={amount}
            onClick={() => onChange(amount)}
            className={`relative h-[68px] rounded-3xl border press transition-all flex flex-col items-start justify-center px-4 ${
              active
                ? 'bg-zinc-950 text-white border-zinc-950 shadow-[0_8px_22px_-8px_rgba(0,0,0,0.4)]'
                : 'bg-white text-zinc-950 border-zinc-200 hover:border-zinc-400'
            }`}
          >
            <div
              className="font-semibold leading-none tabular-nums"
              style={{ fontSize: 19, letterSpacing: '-0.024em' }}
            >
              {fmtKHR(amount)}
            </div>
            <div
              className={`text-[11.5px] mt-1 font-mono tabular-nums ${
                active ? 'opacity-65' : 'text-zinc-500'
              }`}
            >
              ≈ ${(amount / 4080).toFixed(2)}
            </div>
            {active && (
              <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-accent" />
            )}
          </button>
        )
      })}
      <button
        onClick={onCustom}
        className="col-span-2 h-12 rounded-3xl border-2 border-dashed border-zinc-300 text-zinc-700 text-[13.5px] font-medium press hover:border-zinc-500"
      >
        Custom amount
      </button>
    </div>
  )
}
