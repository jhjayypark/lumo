import { Lightning, Wallet as WalletIcon } from '@phosphor-icons/react'
import { fmtKHR, fmtUSD } from '../data/mock.js'
import Logo from './Logo.jsx'

// Apple Wallet-pass style premium card.
// 1.585:1 aspect ratio (real wallet pass), dark gradient with green sweep.
export default function WalletCard({ balance, tier, points, plate, name, compact = false }) {
  return (
    <div
      className="relative rounded-3xl text-white overflow-hidden"
      style={{
        background:
          'linear-gradient(150deg, #0B0B0E 0%, #18181B 32%, #0E5E2A 78%, #34C759 130%)',
        aspectRatio: compact ? '2.4 / 1' : '1.585 / 1',
        boxShadow:
          '0 22px 44px -16px rgba(15,23,42,0.55), 0 6px 12px rgba(15,23,42,0.18), inset 0 1px 0 rgba(255,255,255,0.10)',
      }}
    >
      {/* Animated shine */}
      <div
        className="absolute -top-1/2 -left-1/4 w-[140%] h-[200%] pointer-events-none animate-shine"
        style={{
          background:
            'linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)',
        }}
      />
      {/* Green halo */}
      <div
        className="absolute -bottom-24 -right-20 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(52,199,89,0.55), transparent 65%)',
          filter: 'blur(28px)',
        }}
      />
      {/* Subtle grid overlay for premium texture */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      <div className={`relative h-full flex flex-col ${compact ? 'p-4' : 'p-5'}`}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo size={compact ? 18 : 20} dark />
            <span
              className="text-[10.5px] uppercase opacity-65 font-medium"
              style={{ letterSpacing: '0.08em' }}
            >
              Wallet
            </span>
          </div>
          <div
            className="flex items-center gap-1 text-[10.5px] uppercase font-medium"
            style={{ letterSpacing: '0.06em', color: '#A8E8C0' }}
          >
            <Lightning size={11} weight="fill" />
            {tier}
          </div>
        </div>

        {/* Balance — the hero */}
        <div className={compact ? 'mt-3' : 'mt-auto'}>
          <div
            className="text-[10.5px] uppercase opacity-65 font-medium"
            style={{ letterSpacing: '0.08em' }}
          >
            Available balance
          </div>
          <div
            className="font-semibold leading-none tabular-nums mt-1 flex items-baseline"
            style={{
              fontSize: compact ? 32 : 44,
              letterSpacing: '-0.04em',
              fontFamily: 'Geist, system-ui, sans-serif',
            }}
          >
            {fmtKHR(balance)}
          </div>
          <div className="text-[12.5px] opacity-70 mt-1 font-mono tabular-nums">
            ≈ {fmtUSD(balance)}
          </div>
        </div>

        {/* Footer */}
        {!compact && (
          <div className="mt-4 flex items-center justify-between text-[11px] opacity-70">
            <span className="font-mono tracking-widest">
              {name?.toUpperCase()} · {plate}
            </span>
            <span className="font-mono tabular-nums">
              {points?.toLocaleString()} pts
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
