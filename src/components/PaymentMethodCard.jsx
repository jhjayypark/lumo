import { Check } from '@phosphor-icons/react'

// Single row in the payment method picker.
export default function PaymentMethodCard({ method, selected, onSelect }) {
  return (
    <button
      onClick={() => onSelect(method.id)}
      className="w-full text-left flex items-center gap-3 p-3.5 press hover:bg-zinc-50 transition-colors relative"
      aria-pressed={selected}
    >
      <div
        className="w-10 h-10 rounded-2xl shrink-0 flex items-center justify-center text-white font-semibold"
        style={{ background: method.swatch, fontSize: 11, letterSpacing: '0.04em' }}
      >
        {method.id === 'khqr' && 'KHQR'}
        {method.id === 'aba' && 'ABA'}
        {method.id === 'acleda' && 'ACL'}
        {method.id === 'card' && 'VISA'}
        {method.id === 'cash' && '៛'}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="font-semibold text-zinc-950"
            style={{ fontSize: 15, letterSpacing: '-0.018em' }}
          >
            {method.label}
          </span>
          {method.recommended && (
            <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded-md bg-accent-soft text-accent-ink" style={{ letterSpacing: '0.04em' }}>
              {method.badge || 'Recommended'}
            </span>
          )}
        </div>
        <div className="text-[12.5px] text-zinc-500 mt-0.5">{method.sub}</div>
      </div>
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
          selected ? 'bg-zinc-950 text-white' : 'border border-zinc-300'
        }`}
      >
        {selected && <Check size={14} weight="bold" />}
      </div>
    </button>
  )
}
