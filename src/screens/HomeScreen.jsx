import {
  MagnifyingGlass,
  QrCode,
  MapPin,
  ShoppingBag,
  Wallet as WalletIcon,
  Lightning,
  CaretRight,
  Sparkle,
  Coffee,
  WarningCircle,
  Plus,
} from '@phosphor-icons/react'
import {
  user,
  stations,
  charging,
  products,
  fmtKHR,
} from '../data/mock.js'
import ProductCard from '../components/ProductCard.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import Pill from '../components/Pill.jsx'

const LOW_BALANCE = 25_000 // ៛25,000 — about $6, the soft floor before reserve hold gets risky

export default function HomeScreen({ goto, balance, isCharging }) {
  const nearest = stations[0]
  const recs = ['iced-latte', 'chicken-sandwich', 'coconut-water']
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean)
  const lowBalance = balance < LOW_BALANCE

  return (
    <div className="pt-[58px] pb-8 animate-rise">
      {/* Header */}
      <div className="px-5 pt-2">
        <div className="flex items-start justify-between">
          <div>
            <div
              className="text-[12.5px] text-zinc-500"
              style={{ letterSpacing: '-0.005em' }}
            >
              Friday, May 3
            </div>
            <h1
              className="font-semibold text-zinc-950 leading-[1.04] mt-1"
              style={{ fontSize: 30, letterSpacing: '-0.032em' }}
            >
              Good morning, {user.firstName}.
            </h1>
          </div>
          <button className="w-9 h-9 rounded-full bg-white border border-zinc-200 flex items-center justify-center press shadow-diffuse">
            <MagnifyingGlass size={16} className="text-zinc-700" weight="bold" />
          </button>
        </div>
      </div>

      {/* Low balance alert — only when relevant */}
      {lowBalance && (
        <div className="px-5 mt-4">
          <button
            onClick={() => goto('addcredit')}
            className="w-full text-left rounded-3xl bg-amber-50 border border-amber-200 p-3.5 flex items-center gap-3 press"
          >
            <div className="w-9 h-9 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0">
              <WarningCircle size={18} weight="fill" />
            </div>
            <div className="flex-1 min-w-0">
              <div
                className="font-semibold text-amber-900"
                style={{ fontSize: 14, letterSpacing: '-0.018em' }}
              >
                Balance is running low
              </div>
              <div className="text-[12px] text-amber-800/85 mt-0.5">
                <span className="font-mono tabular-nums font-semibold">{fmtKHR(balance)}</span>{' '}
                left. Top up before your next charge.
              </div>
            </div>
            <div className="inline-flex items-center gap-1 bg-zinc-950 text-white text-[12px] font-semibold rounded-full pl-3 pr-2 py-1.5">
              <Plus size={11} weight="bold" /> Add
            </div>
          </button>
        </div>
      )}

      {/* Hero — charging session OR nearest station */}
      <div className="px-5 mt-5">
        {isCharging ? (
          <ChargingHero goto={goto} />
        ) : (
          <NearestStationHero station={nearest} goto={goto} />
        )}
      </div>

      {/* Smart recommendation — only while charging */}
      {isCharging && (
        <div className="px-5 mt-3">
          <div className="rounded-3xl p-4 border border-accent/20 bg-accent-soft relative overflow-hidden">
            <div className="flex gap-3 relative">
              <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-accent-ink shrink-0 shadow-sm">
                <Sparkle size={18} weight="fill" />
              </div>
              <div className="flex-1">
                <div
                  className="text-[10.5px] uppercase font-semibold text-accent-ink"
                  style={{ letterSpacing: '0.06em' }}
                >
                  Smart suggestion
                </div>
                <div
                  className="text-zinc-950 leading-snug mt-1 text-balance"
                  style={{ fontSize: 14.5, letterSpacing: '-0.015em' }}
                >
                  Your car will be ready in {charging.remainingMin} min. Want an iced latte ready in 8?
                </div>
                <button
                  onClick={() => goto('store')}
                  className="mt-3 inline-flex items-center gap-1.5 bg-zinc-950 text-white rounded-full pl-3 pr-2 py-1.5 text-[12.5px] font-semibold press"
                >
                  <Coffee size={13} weight="regular" />
                  Add to order
                  <span className="font-mono bg-white/10 rounded-full px-1.5 py-0.5 text-[10.5px]">
                    {fmtKHR(8500)}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick actions — 2-col grid (Find / Scan / Order / Wallet) */}
      <div className="px-5 mt-7">
        <SectionHeader title="Quick actions" />
        <div className="grid grid-cols-2 gap-2.5">
          <Quick Icon={MapPin} label="Find Charger" sub="3 within 5 km" onClick={() => goto('map')} />
          <Quick Icon={QrCode} label="Scan Charger" sub="At any Lumo bay" onClick={() => goto('khqr')} />
          <Quick Icon={ShoppingBag} label="Order Food" sub="Ready in 10 min" onClick={() => goto('store')} />
          <Quick
            Icon={WalletIcon}
            label="Wallet"
            sub={fmtKHR(balance)}
            mono
            onClick={() => goto('wallet')}
          />
        </div>
      </div>

      {/* Store teaser — compact horizontal scroll. Skipped while charging
          because the smart suggestion already covers that intent. */}
      {!isCharging && (
        <div className="mt-7">
          <div className="px-5">
            <SectionHeader
              title="Ready while you charge"
              action="See all"
              onAction={() => goto('store')}
            />
          </div>
          <div className="px-5 flex gap-3 overflow-x-auto no-scrollbar">
            {recs.map((p) => (
              <div key={p.id} className="w-[148px] shrink-0">
                <ProductCard product={p} onAdd={() => goto('store')} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ───────────────────────── Hero · charging session ─────────────────────────
function ChargingHero({ goto }) {
  const progress =
    (charging.currentBattery - charging.startBattery) /
    (charging.targetBattery - charging.startBattery)

  return (
    <button
      onClick={() => goto('charging')}
      className="w-full text-left bg-surface border border-zinc-200/80 rounded-3xl overflow-hidden press shadow-diffuse-lg p-5"
    >
      {/* Top row: live tag + bay */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-1.5 text-[10.5px] uppercase font-semibold text-accent-dark" style={{ letterSpacing: '0.06em' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot" />
          Charging
        </div>
        <div className="text-[11.5px] text-zinc-500 font-medium">
          Bay {charging.bay} · {charging.stationName}
        </div>
      </div>

      {/* Middle: ring + battery range */}
      <div className="mt-4 flex items-center gap-4">
        <MiniRing progress={progress} percent={charging.currentBattery} />
        <div className="flex-1">
          <div
            className="font-semibold text-zinc-950 leading-none tabular-nums"
            style={{ fontSize: 28, letterSpacing: '-0.028em' }}
          >
            {charging.currentBattery}%
            <span className="text-zinc-400"> → </span>
            <span className="text-zinc-700">{charging.targetBattery}%</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[13px] text-zinc-600">
            <span className="font-semibold text-zinc-950 tabular-nums">{charging.remainingMin} min</span>
            <span className="text-zinc-300">·</span>
            <span>remaining</span>
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-[13px] text-zinc-600">
            <span>Current cost</span>
            <span className="font-mono font-semibold tabular-nums text-zinc-950">{fmtKHR(charging.usedKhr)}</span>
          </div>
        </div>
      </div>

      {/* CTAs */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="h-11 rounded-full bg-zinc-950 text-white font-semibold text-[14px] flex items-center justify-center gap-1.5">
          <Lightning size={14} weight="fill" /> View Session
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation()
            goto('store')
          }}
          className="h-11 rounded-full bg-white border border-zinc-200 text-zinc-950 font-semibold text-[14px] flex items-center justify-center gap-1.5"
        >
          <Plus size={14} weight="bold" /> Add Snacks
        </div>
      </div>
    </button>
  )
}

// ─────────────────────── Hero · nearest station (idle) ───────────────────────
function NearestStationHero({ station, goto }) {
  return (
    <button
      onClick={() => goto('station')}
      className="w-full text-left bg-surface border border-zinc-200/80 rounded-3xl overflow-hidden press shadow-diffuse-lg"
    >
      <div
        className="h-[160px] relative"
        style={{
          backgroundImage: 'url(https://picsum.photos/seed/lumo-bkk1-hero/800/500)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%)',
          }}
        />
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <Pill tone="invert" icon={Lightning}>Live</Pill>
          <Pill tone="invert">Café open</Pill>
        </div>
        <div className="absolute bottom-3 left-4 right-4 text-white">
          <div
            className="text-[11px] uppercase opacity-80"
            style={{ letterSpacing: '0.06em' }}
          >
            Nearest station
          </div>
          <div
            className="font-semibold leading-tight mt-0.5"
            style={{ fontSize: 22, letterSpacing: '-0.024em' }}
          >
            {station.name}
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="px-4 py-3 flex items-center gap-3 text-[13px] border-b border-zinc-200/80">
        <Stat label="Open" value={`${station.available}/${station.total}`} />
        <span className="w-px h-4 bg-zinc-200" />
        <Stat label="Distance" value={`${station.distanceKm} km`} />
        <span className="w-px h-4 bg-zinc-200" />
        <Stat label="ETA" value={`${station.etaMin} min`} />
      </div>

      {/* CTAs */}
      <div className="px-4 py-3 grid grid-cols-2 gap-2">
        <div
          onClick={(e) => {
            e.stopPropagation()
            goto('station')
          }}
          className="h-11 rounded-full bg-zinc-950 text-white font-semibold text-[14px] flex items-center justify-center gap-1.5"
        >
          <Lightning size={14} weight="fill" /> Start Charging
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation()
            goto('store')
          }}
          className="h-11 rounded-full bg-white border border-zinc-200 text-zinc-950 font-semibold text-[14px] flex items-center justify-center gap-1.5"
        >
          <ShoppingBag size={14} weight="regular" /> Order Food
        </div>
      </div>
    </button>
  )
}

function Stat({ label, value }) {
  return (
    <div className="leading-tight">
      <div
        className="text-[10.5px] uppercase text-zinc-400 font-medium"
        style={{ letterSpacing: '0.05em' }}
      >
        {label}
      </div>
      <div className="font-mono tabular-nums text-zinc-950 font-semibold text-[14px]">
        {value}
      </div>
    </div>
  )
}

function Quick({ Icon, label, sub, mono = false, onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-left bg-surface border border-zinc-200/80 rounded-3xl p-4 press hover:border-zinc-300 transition-colors shadow-diffuse"
    >
      <div className="w-9 h-9 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-950">
        <Icon size={18} weight="regular" />
      </div>
      <div
        className="mt-3 font-semibold text-zinc-950"
        style={{ fontSize: 14.5, letterSpacing: '-0.02em' }}
      >
        {label}
      </div>
      {sub && (
        <div
          className={`text-[12px] text-zinc-500 mt-0.5 ${mono ? 'font-mono tabular-nums' : ''}`}
          style={{ letterSpacing: '-0.005em' }}
        >
          {sub}
        </div>
      )}
    </button>
  )
}

// Compact circular progress — Home charging hero glyph.
function MiniRing({ progress = 0.5, percent = 0 }) {
  const size = 72
  const stroke = 7
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const dash = c * progress
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="#E4E4E7" strokeWidth={stroke} fill="none" />
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
      <div className="absolute inset-0 flex items-center justify-center">
        <Lightning size={20} weight="fill" className="text-accent-dark" />
      </div>
    </div>
  )
}
