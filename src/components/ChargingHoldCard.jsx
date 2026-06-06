import { ShieldCheck } from '@phosphor-icons/react'
import { fmtKHR } from '../data/mock.js'

// Wallet "hold" explanation card — used on Station Detail (pre-start) and Charging (live).
// Variants:
//   pre  → "Estimated hold" before starting
//   live → "Reserved / Used / Estimated return" during session
export default function ChargingHoldCard({
  variant = 'pre',
  available,
  reserved,
  used,
}) {
  const estimatedReturn = Math.max(0, reserved - used)

  if (variant === 'pre') {
    return (
      <div className="rounded-3xl bg-white border border-zinc-200/80 shadow-diffuse p-4">
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck size={16} className="text-accent-dark" weight="fill" />
          <span
            className="text-[10.5px] uppercase font-semibold text-zinc-700"
            style={{ letterSpacing: '0.06em' }}
          >
            Wallet hold
          </span>
        </div>
        <div className="grid grid-cols-2 divide-x divide-zinc-200/80">
          <Row label="Available balance" value={fmtKHR(available)} />
          <Row label="Estimated hold" value={fmtKHR(reserved)} mono accent right />
        </div>
        <div className="mt-3 pt-3 border-t border-zinc-200/80 text-[12px] text-zinc-500 leading-relaxed">
          Lumo holds an estimated amount when you start. Unused credit returns
          to your wallet within seconds of unplugging.
        </div>
      </div>
    )
  }

  // Live variant
  return (
    <div className="rounded-3xl bg-white border border-zinc-200/80 shadow-diffuse p-4">
      <div className="flex items-center gap-2 mb-3">
        <ShieldCheck size={16} className="text-accent-dark" weight="fill" />
        <span
          className="text-[10.5px] uppercase font-semibold text-zinc-700"
          style={{ letterSpacing: '0.06em' }}
        >
          Wallet hold · live
        </span>
      </div>
      <div className="grid grid-cols-3 divide-x divide-zinc-200/80">
        <Cell label="Reserved" value={fmtKHR(reserved)} sub="hold" />
        <Cell label="Used" value={fmtKHR(used)} sub="so far" />
        <Cell label="Return" value={fmtKHR(estimatedReturn)} sub="est." accent />
      </div>
      <div className="mt-3 pt-3 border-t border-zinc-200/80 text-[12px] text-zinc-500 leading-relaxed">
        You only pay for what you use. The unused portion of the hold is
        released back to your wallet when the session ends.
      </div>
    </div>
  )
}

function Row({ label, value, mono, accent, right }) {
  return (
    <div className={`px-4 ${right ? 'text-right' : ''}`}>
      <div
        className="text-[10.5px] uppercase text-zinc-500 font-medium"
        style={{ letterSpacing: '0.05em' }}
      >
        {label}
      </div>
      <div
        className={`font-semibold ${accent ? 'text-accent-dark' : 'text-zinc-950'} ${
          mono ? 'font-mono' : ''
        } tabular-nums mt-1 leading-none`}
        style={{ fontSize: 18, letterSpacing: '-0.022em' }}
      >
        {value}
      </div>
    </div>
  )
}

function Cell({ label, value, sub, accent }) {
  return (
    <div className="px-3 text-center">
      <div
        className="text-[10.5px] uppercase text-zinc-500 font-medium"
        style={{ letterSpacing: '0.05em' }}
      >
        {label}
      </div>
      <div
        className={`font-semibold ${accent ? 'text-accent-dark' : 'text-zinc-950'} font-mono tabular-nums mt-1 leading-none`}
        style={{ fontSize: 17, letterSpacing: '-0.022em' }}
      >
        {value}
      </div>
      <div className="text-[10.5px] text-zinc-400 mt-1">{sub}</div>
    </div>
  )
}
