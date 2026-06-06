import { Check } from '@phosphor-icons/react'
import { ORDER_STAGES } from '../data/mock.js'

// Horizontal 4-step progress: Received → Preparing → Ready → Delivered.
export default function OrderStatusStepper({ stage, bay }) {
  const idx = ORDER_STAGES.indexOf(stage)
  const currentLabel = stage === 'Delivered' ? `Delivered to Bay ${bay}` : stage
  return (
    <div className="rounded-3xl bg-white border border-zinc-200/80 shadow-diffuse p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="text-[10.5px] uppercase text-zinc-500 font-semibold" style={{ letterSpacing: '0.06em' }}>
          Order status
        </div>
        <div className="text-[12px] text-accent-dark font-semibold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot" />
          {currentLabel}
        </div>
      </div>
      <div className="flex items-center">
        {ORDER_STAGES.map((s, i) => {
          const done = i < idx
          const active = i === idx
          const last = i === ORDER_STAGES.length - 1
          return (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center" style={{ width: 28 }}>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                    done
                      ? 'bg-accent text-white'
                      : active
                      ? 'bg-zinc-950 text-white'
                      : 'bg-zinc-100 text-zinc-400'
                  }`}
                >
                  {done ? (
                    <Check size={12} weight="bold" />
                  ) : (
                    <span className="text-[10px] font-bold tabular-nums">{i + 1}</span>
                  )}
                </div>
                <div
                  className={`mt-1.5 text-[10px] font-medium uppercase whitespace-nowrap ${
                    active ? 'text-zinc-950' : 'text-zinc-400'
                  }`}
                  style={{ letterSpacing: '0.04em' }}
                >
                  {s}
                </div>
              </div>
              {!last && (
                <div
                  className={`flex-1 h-[2px] mx-1 mt-[-14px] rounded-full ${
                    done ? 'bg-accent' : 'bg-zinc-200'
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
