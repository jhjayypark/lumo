import { Check, Clock, WarningCircle } from '@phosphor-icons/react'
import { fmtKHR } from '../data/mock.js'

// Top status card for the KHQR Payment screen.
// Three states: pending (waiting), success (confirmed), expired (regenerate).
export default function PaymentStatusCard({ status, secondsLeft, amount, newBalance, onRetry, onDone }) {
  if (status === 'success') {
    return (
      <div className="rounded-3xl bg-accent-soft border border-accent/20 p-5">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white shrink-0">
            <Check size={22} weight="bold" />
            <span className="absolute inset-0 rounded-full bg-accent animate-pulse-dot opacity-50" />
          </div>
          <div className="flex-1">
            <div className="text-[10.5px] uppercase font-semibold text-accent-ink" style={{ letterSpacing: '0.06em' }}>
              Payment confirmed
            </div>
            <div
              className="font-semibold text-zinc-950 leading-tight mt-0.5"
              style={{ fontSize: 18, letterSpacing: '-0.022em' }}
            >
              {fmtKHR(amount)} added to your Lumo Wallet
            </div>
            <div className="text-[12.5px] text-zinc-600 mt-1.5">
              New balance · <span className="font-mono font-semibold tabular-nums text-zinc-950">{fmtKHR(newBalance)}</span>
            </div>
          </div>
        </div>
        <button
          onClick={onDone}
          className="w-full h-12 rounded-full bg-zinc-950 text-white font-semibold text-[14.5px] press mt-4"
        >
          Done
        </button>
      </div>
    )
  }

  if (status === 'expired') {
    return (
      <div className="rounded-3xl bg-rose-50 border border-rose-200 p-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-rose-500 flex items-center justify-center text-white shrink-0">
            <WarningCircle size={22} weight="fill" />
          </div>
          <div className="flex-1">
            <div className="text-[10.5px] uppercase font-semibold text-rose-700" style={{ letterSpacing: '0.06em' }}>
              QR expired
            </div>
            <div
              className="font-semibold text-zinc-950 leading-tight mt-0.5"
              style={{ fontSize: 16, letterSpacing: '-0.02em' }}
            >
              This KHQR code is no longer valid
            </div>
            <div className="text-[12.5px] text-zinc-600 mt-1">
              No charge was made. Generate a new QR to continue.
            </div>
          </div>
        </div>
        <button
          onClick={onRetry}
          className="w-full h-12 rounded-full bg-zinc-950 text-white font-semibold text-[14.5px] press mt-4"
        >
          Generate new QR
        </button>
      </div>
    )
  }

  // Pending (default)
  const mm = Math.floor(secondsLeft / 60)
  const ss = (secondsLeft % 60).toString().padStart(2, '0')
  return (
    <div className="rounded-3xl bg-white border border-zinc-200/80 shadow-diffuse p-4 flex items-center gap-3">
      <div className="relative w-11 h-11 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
        <Clock size={20} weight="regular" />
        <span className="absolute inset-0 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" style={{ animationDuration: '1.4s' }} />
      </div>
      <div className="flex-1">
        <div className="text-[10.5px] uppercase font-semibold text-amber-700" style={{ letterSpacing: '0.06em' }}>
          Waiting for payment
        </div>
        <div
          className="font-semibold text-zinc-950 leading-tight"
          style={{ fontSize: 15, letterSpacing: '-0.018em' }}
        >
          Scan the QR with any banking app
        </div>
      </div>
      <div className="text-right">
        <div className="text-[10.5px] uppercase text-zinc-400 font-medium" style={{ letterSpacing: '0.05em' }}>
          Expires in
        </div>
        <div className="font-mono tabular-nums text-zinc-950 font-semibold text-[16px]">
          {mm}:{ss}
        </div>
      </div>
    </div>
  )
}
