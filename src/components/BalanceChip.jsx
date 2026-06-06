import { Wallet } from '@phosphor-icons/react'
import { fmtKHR } from '../data/mock.js'

// Compact wallet balance pill — used as page top-corner indicator.
export default function BalanceChip({ balance, onClick, dark = false }) {
  const bg = dark
    ? 'bg-white/10 border border-white/15 text-white'
    : 'bg-white border border-zinc-200 text-zinc-950 shadow-diffuse'
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full press ${bg}`}
    >
      <Wallet size={13} weight="fill" className="text-accent" />
      <span
        className="text-[12.5px] font-semibold tabular-nums"
        style={{ letterSpacing: '-0.01em' }}
      >
        {fmtKHR(balance)}
      </span>
    </button>
  )
}
