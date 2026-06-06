import {
  Lightning,
  CaretLeft,
  DotsThreeVertical,
  Plus,
  Coffee,
  Sparkle,
  WarningCircle,
} from '@phosphor-icons/react'
import { charging, stations, fmtKHR } from '../data/mock.js'
import ChargingHoldCard from '../components/ChargingHoldCard.jsx'

export default function ChargingScreen({ goto, balance }) {
  const station = stations.find((s) => s.id === charging.stationId)
  const progress =
    (charging.currentBattery - charging.startBattery) /
    (charging.targetBattery - charging.startBattery)
  const lowBalance = balance < charging.reservedKhr + 5000

  return (
    <div className="text-white pt-[58px] pb-10 px-5 animate-rise">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => goto('station')}
          className="w-9 h-9 rounded-full bg-white/8 border border-white/10 flex items-center justify-center press"
        >
          <CaretLeft size={16} weight="bold" />
        </button>
        <div className="text-center">
          <div
            className="text-[10.5px] uppercase opacity-55 font-medium"
            style={{ letterSpacing: '0.06em' }}
          >
            Active session
          </div>
          <div className="font-semibold mt-0.5" style={{ fontSize: 14, letterSpacing: '-0.018em' }}>
            {station.name} · Bay {charging.bay}
          </div>
        </div>
        <button className="w-9 h-9 rounded-full bg-white/8 border border-white/10 flex items-center justify-center press">
          <DotsThreeVertical size={16} weight="bold" />
        </button>
      </div>

      {/* Ring */}
      <div className="mt-7 flex items-center justify-center">
        <ChargeRing progress={progress} />
      </div>

      {/* Charger meta */}
      <div className="mt-3 flex items-center justify-center gap-2 text-[12.5px] opacity-70">
        <Lightning size={12} weight="fill" className="text-accent" />
        {charging.chargerType}
        <span>·</span>
        <span className="font-mono tabular-nums">{charging.speedKw} kW</span>
        <span>·</span>
        <span className="font-mono tabular-nums">{charging.energyKwh.toFixed(1)} kWh</span>
      </div>

      {/* Current cost + remaining time */}
      <div className="mt-6 grid grid-cols-2 divide-x divide-white/10 border-y border-white/10">
        <BigStat label="Current cost" value={fmtKHR(charging.usedKhr)} mono />
        <BigStat label="Time remaining" value={`${charging.remainingMin} min`} mono />
      </div>

      {/* Wallet hold — live */}
      <div className="mt-5 text-zinc-950">
        <ChargingHoldCard
          variant="live"
          reserved={charging.reservedKhr}
          used={charging.usedKhr}
        />
      </div>

      {/* Low balance warning */}
      {lowBalance && (
        <div className="mt-3 rounded-3xl bg-rose-500/15 border border-rose-400/30 p-4 flex items-start gap-3">
          <WarningCircle size={20} weight="fill" className="text-rose-300 shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="font-semibold text-rose-100" style={{ fontSize: 14, letterSpacing: '-0.018em' }}>
              Balance may be too low to continue
            </div>
            <div className="text-[12px] text-rose-200/80 mt-0.5">
              Your wallet will reach the reserved hold soon. Add credit to avoid an early stop.
            </div>
            <button
              onClick={() => goto('addcredit')}
              className="mt-2.5 inline-flex items-center gap-1.5 bg-white text-zinc-950 rounded-full pl-3 pr-2 py-1.5 text-[12.5px] font-semibold press"
            >
              <Plus size={12} weight="bold" /> Add Credit
            </button>
          </div>
        </div>
      )}

      {/* CTAs */}
      <div className="mt-5 grid grid-cols-3 gap-2">
        <button className="h-12 rounded-full bg-white/8 border border-white/10 text-white font-semibold text-[13px] press">
          Stop
        </button>
        <button
          onClick={() => goto('store')}
          className="h-12 rounded-full bg-white/8 border border-white/10 text-white font-semibold text-[13px] press flex items-center justify-center gap-1"
        >
          <Plus size={12} weight="bold" /> Snacks
        </button>
        <button
          onClick={() => goto('addcredit')}
          className="h-12 rounded-full bg-accent text-white font-semibold text-[13px] press flex items-center justify-center gap-1"
        >
          <Plus size={12} weight="bold" /> Credit
        </button>
      </div>

      {/* Smart suggestion */}
      <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-4">
        <div className="flex gap-3">
          <div className="w-9 h-9 rounded-2xl bg-accent/15 text-accent flex items-center justify-center shrink-0">
            <Sparkle size={16} weight="fill" />
          </div>
          <div className="flex-1">
            <div
              className="text-[10.5px] uppercase font-semibold text-accent"
              style={{ letterSpacing: '0.06em' }}
            >
              Suggestion
            </div>
            <div className="mt-1 leading-snug text-balance" style={{ fontSize: 14.5, letterSpacing: '-0.015em' }}>
              Your car will be ready in 28 min. Want coffee and a sandwich ready in 10?
            </div>
            <button
              onClick={() => goto('store')}
              className="mt-3 inline-flex items-center gap-1.5 bg-white text-zinc-950 rounded-full pl-3 pr-2 py-1.5 text-[13px] font-semibold press"
            >
              <Coffee size={13} weight="regular" />
              Order combo
              <span className="font-mono ml-0.5 bg-accent-soft text-accent-ink rounded-full px-1.5 py-0.5 text-[11px]">
                {fmtKHR(22500)}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function ChargeRing({ progress = 0.5 }) {
  const size = 240
  const stroke = 12
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const dash = c * progress

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(255,255,255,0.08)" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="#34C759"
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c - dash}`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-[11px] uppercase opacity-55 font-medium" style={{ letterSpacing: '0.08em' }}>
          Battery
        </div>
        <div className="font-mono tabular-nums leading-none mt-2 flex items-baseline">
          <span className="font-semibold" style={{ fontSize: 68, letterSpacing: '-0.04em' }}>
            {charging.currentBattery}
          </span>
          <span className="text-[26px] opacity-65 ml-0.5 font-semibold">%</span>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-[12px] opacity-75 font-mono tabular-nums">
          <span>{charging.startBattery}</span>
          <span className="w-3 h-px bg-white/30" />
          <span className="text-accent">{charging.targetBattery}</span>
        </div>
      </div>
    </div>
  )
}

function BigStat({ label, value, mono }) {
  return (
    <div className="text-center py-4">
      <div className="text-[10.5px] uppercase opacity-55 font-medium" style={{ letterSpacing: '0.06em' }}>
        {label}
      </div>
      <div className={`${mono ? 'font-mono' : ''} tabular-nums mt-1.5 leading-none font-semibold`} style={{ fontSize: 22, letterSpacing: '-0.022em' }}>
        {value}
      </div>
    </div>
  )
}
