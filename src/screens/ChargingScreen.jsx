import {
  Lightning,
  CaretLeft,
  DotsThreeVertical,
  Plus,
  Coffee,
  Sparkle,
} from '@phosphor-icons/react'
import { charging, stations } from '../data/mock.js'

// Dark, restrained. Single accent green.
export default function ChargingScreen({ goto }) {
  const station = stations.find((s) => s.id === charging.stationId)
  const progress =
    (charging.currentBattery - charging.startBattery) /
    (charging.targetBattery - charging.startBattery)

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
          <div className="text-[10.5px] uppercase opacity-55 font-medium" style={{ letterSpacing: '0.06em' }}>
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
      <div className="mt-9 flex items-center justify-center">
        <ChargeRing progress={progress} />
      </div>

      {/* Charger meta */}
      <div className="mt-3 flex items-center justify-center gap-2 text-[12.5px] opacity-70">
        <Lightning size={12} weight="fill" className="text-accent" />
        {charging.chargerType}
        <span>·</span>
        <span className="font-mono tabular-nums">{charging.speedKw} kW</span>
      </div>

      {/* Stats — divider row, no boxes */}
      <div className="mt-9 grid grid-cols-3 divide-x divide-white/10 border-y border-white/10">
        <BigStat label="Energy" value={charging.energyKwh.toFixed(1)} unit="kWh" />
        <BigStat label="Cost" value={`$${charging.costUsd.toFixed(2)}`} />
        <BigStat label="Time left" value={charging.remainingMin} unit="min" />
      </div>

      {/* Buttons */}
      <div className="mt-7 grid grid-cols-2 gap-2.5">
        <button className="h-12 rounded-full bg-white/8 border border-white/10 text-white font-semibold text-[14.5px] press">
          Stop
        </button>
        <button
          onClick={() => goto('store')}
          className="h-12 rounded-full bg-accent text-white font-semibold text-[14.5px] press flex items-center justify-center gap-1.5"
        >
          <Plus size={14} weight="bold" /> Add snacks
        </button>
      </div>

      {/* Smart card */}
      <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-4">
        <div className="flex gap-3">
          <div className="w-9 h-9 rounded-2xl bg-accent/15 text-accent flex items-center justify-center shrink-0">
            <Sparkle size={16} weight="fill" />
          </div>
          <div className="flex-1">
            <div className="text-[10.5px] uppercase font-semibold text-accent" style={{ letterSpacing: '0.06em' }}>
              Suggestion
            </div>
            <div className="mt-1 leading-snug text-balance" style={{ fontSize: 14.5, letterSpacing: '-0.015em' }}>
              Your car will be ready in 28 min. Want a coffee and a sandwich ready in 10?
            </div>
            <button
              onClick={() => goto('cart')}
              className="mt-3 inline-flex items-center gap-1.5 bg-white text-zinc-950 rounded-full pl-3 pr-2 py-1.5 text-[13px] font-semibold press"
            >
              <Coffee size={13} weight="regular" />
              Order combo
              <span className="font-mono ml-0.5 bg-accent-soft text-accent-ink rounded-full px-1.5 py-0.5 text-[11px]">
                $6.30
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Live waveform */}
      <div className="mt-6">
        <div className="flex items-baseline justify-between mb-2 text-[11.5px] opacity-55">
          <span className="uppercase font-medium" style={{ letterSpacing: '0.06em' }}>Live power</span>
          <span className="font-mono tabular-nums">last 60 s</span>
        </div>
        <div className="h-16 rounded-2xl border border-white/10 bg-white/[0.03] px-3 flex items-end gap-[3px] py-2">
          {Array.from({ length: 48 }).map((_, i) => {
            const t = i / 48
            const wave = 0.5 + 0.35 * Math.sin(t * 12) + 0.15 * Math.sin(t * 30 + 1) + 0.05 * Math.cos(t * 4)
            const h = Math.max(8, wave * 100)
            const accent = i > 48 - 6
            return (
              <span
                key={i}
                className={`flex-1 rounded-full ${accent ? 'bg-accent' : 'bg-white/30'}`}
                style={{ height: `${h}%` }}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

function ChargeRing({ progress = 0.5 }) {
  const size = 248
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
          <span className="font-semibold" style={{ fontSize: 70, letterSpacing: '-0.04em' }}>
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

function BigStat({ label, value, unit }) {
  return (
    <div className="text-center py-4">
      <div className="text-[10.5px] uppercase opacity-55 font-medium" style={{ letterSpacing: '0.06em' }}>
        {label}
      </div>
      <div className="font-mono tabular-nums mt-1.5">
        <span className="text-[22px] leading-none font-semibold">{value}</span>
        {unit && <span className="text-[12px] opacity-55 ml-0.5">{unit}</span>}
      </div>
    </div>
  )
}
