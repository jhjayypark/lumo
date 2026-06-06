import {
  QrCode,
  Lightning,
  Coffee,
  Gift,
  CreditCard,
  Hamburger,
  ShoppingBag,
} from '@phosphor-icons/react'
import { fmtKHR } from '../data/mock.js'

const ICONS = {
  QrCode,
  Zap: Lightning,
  Coffee,
  Gift,
  CreditCard,
  Sandwich: Hamburger,
  ShoppingBag,
}

// Single transaction row used inside a grouped list with dividers.
export default function TransactionRow({ tx }) {
  const Icon = ICONS[tx.icon] || ShoppingBag
  const isCredit = tx.amount > 0
  return (
    <div className="flex items-center gap-3 p-3.5">
      <div
        className={`w-9 h-9 rounded-2xl flex items-center justify-center ${
          isCredit ? 'bg-accent-soft text-accent-ink' : 'bg-zinc-100 text-zinc-700'
        }`}
      >
        <Icon size={15} weight="regular" />
      </div>
      <div className="flex-1 min-w-0">
        <div
          className="font-medium text-zinc-950 truncate"
          style={{ fontSize: 14.5, letterSpacing: '-0.018em' }}
        >
          {tx.label}
        </div>
        <div className="text-[12px] text-zinc-500">{tx.when}</div>
      </div>
      <div
        className={`font-mono tabular-nums text-[14.5px] font-semibold whitespace-nowrap ${
          isCredit ? 'text-accent-dark' : 'text-zinc-950'
        }`}
      >
        {isCredit ? '+' : '−'}{fmtKHR(Math.abs(tx.amount))}
      </div>
    </div>
  )
}
