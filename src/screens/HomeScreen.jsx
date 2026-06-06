import {
  MagnifyingGlass,
  QrCode,
  Plus,
  ShoppingBag,
  MapPin,
  Lightning,
  CaretRight,
  Sparkle,
  Coffee,
} from '@phosphor-icons/react'
import {
  user,
  stations,
  charging,
  products,
  wallet,
  fmtKHR,
  fmtUSD,
} from '../data/mock.js'
import WalletCard from '../components/WalletCard.jsx'
import ProductCard from '../components/ProductCard.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import Pill from '../components/Pill.jsx'

export default function HomeScreen({ goto, balance }) {
  const nearest = stations[0]
  const recs = ['iced-latte', 'chicken-sandwich', 'coconut-water']
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean)

  return (
    <div className="pt-[58px] pb-8 animate-rise">
      {/* Header */}
      <div className="px-5 pt-2">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[12.5px] text-zinc-500" style={{ letterSpacing: '-0.005em' }}>
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

      {/* Wallet balance — compact pass with Add Credit CTA */}
      <div className="px-5 mt-5">
        <button onClick={() => goto('wallet')} className="block w-full press text-left">
          <WalletCard
            balance={balance}
            tier={user.tier}
            points={user.points}
            plate={user.vehicle.plate}
            name={user.firstName}
            compact
          />
        </button>
        <div className="mt-2.5 grid grid-cols-2 gap-2">
          <button
            onClick={() => goto('addcredit')}
            className="h-11 rounded-full bg-zinc-950 text-white font-semibold text-[14px] press flex items-center justify-center gap-1.5"
          >
            <Plus size={14} weight="bold" /> Add Credit
          </button>
          <button
            onClick={() => goto('khqr')}
            className="h-11 rounded-full bg-white border border-zinc-200 text-zinc-950 font-semibold text-[14px] press flex items-center justify-center gap-1.5"
          >
            <QrCode size={14} weight="regular" /> Scan & Pay
          </button>
        </div>
      </div>

      {/* Nearby station hero */}
      <div className="px-5 mt-7">
        <SectionHeader title="Nearby station" />
        <button
          onClick={() => goto('station')}
          className="w-full text-left bg-surface border border-zinc-200/80 rounded-3xl overflow-hidden press shadow-diffuse-lg"
        >
          <div
            className="h-[148px] relative"
            style={{
              backgroundImage:
                'url(https://picsum.photos/seed/lumo-bkk1-hero/800/500)',
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
              <div className="text-[11px] uppercase opacity-80" style={{ letterSpacing: '0.06em' }}>
                Nearest station
              </div>
              <div
                className="font-semibold leading-tight mt-0.5"
                style={{ fontSize: 22, letterSpacing: '-0.024em' }}
              >
                {nearest.name}
              </div>
            </div>
          </div>
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-baseline gap-3 text-[13px]">
              <Stat label="Open" value={`${nearest.available}/${nearest.total}`} />
              <span className="w-px h-4 bg-zinc-200" />
              <Stat label="Distance" value={`${nearest.distanceKm} km`} />
              <span className="w-px h-4 bg-zinc-200" />
              <Stat label="ETA" value={`${nearest.etaMin} min`} />
            </div>
            <div className="flex items-center gap-1 text-accent-dark text-[13px] font-semibold">
              Reserve <CaretRight size={12} weight="bold" />
            </div>
          </div>
        </button>
      </div>

      {/* Active charging strip */}
      {charging.active && (
        <div className="px-5 mt-3">
          <button
            onClick={() => goto('charging')}
            className="w-full text-left bg-surface border border-zinc-200/80 rounded-3xl px-4 py-3.5 press shadow-diffuse flex items-center gap-3"
          >
            <div className="relative w-10 h-10 rounded-full bg-accent-soft flex items-center justify-center text-accent-dark">
              <Lightning size={18} weight="fill" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-accent animate-pulse-dot" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10.5px] uppercase font-semibold text-accent-dark" style={{ letterSpacing: '0.06em' }}>
                Charging · Bay {charging.bay}
              </div>
              <div
                className="font-semibold text-zinc-950 leading-tight"
                style={{ fontSize: 15, letterSpacing: '-0.018em' }}
              >
                {charging.currentBattery}% → {charging.targetBattery}%
              </div>
              <div className="mt-1.5 h-1 rounded-full bg-zinc-100 overflow-hidden">
                <div
                  className="h-full bg-accent"
                  style={{
                    width: `${
                      ((charging.currentBattery - charging.startBattery) /
                        (charging.targetBattery - charging.startBattery)) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>
            <div className="text-right">
              <div className="font-mono text-[15px] font-semibold tabular-nums text-zinc-950">
                {charging.remainingMin}
                <span className="text-[12px] text-zinc-500 font-normal"> min</span>
              </div>
              <div className="font-mono text-[11.5px] tabular-nums text-zinc-500">
                {fmtKHR(charging.usedKhr)}
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Quick actions — 2 col */}
      <div className="px-5 mt-7">
        <SectionHeader title="Quick actions" />
        <div className="grid grid-cols-2 gap-2.5">
          <Quick Icon={QrCode} label="Scan Charger" sub="At any Lumo bay" onClick={() => goto('khqr')} />
          <Quick Icon={Plus} label="Add Credit" sub={`Balance ${fmtKHR(balance)}`} onClick={() => goto('addcredit')} />
          <Quick Icon={ShoppingBag} label="Order Food" sub="Ready in 10 min" onClick={() => goto('store')} />
          <Quick Icon={MapPin} label="Find Station" sub="3 within 5 km" onClick={() => goto('map')} />
        </div>
      </div>

      {/* Smart recommendation */}
      <div className="px-5 mt-7">
        <div
          className="rounded-3xl p-4 border border-accent/20 bg-accent-soft relative overflow-hidden"
        >
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
                Your car will be ready in 28 min. Want an iced latte ready in 8?
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

      {/* Recommended items */}
      <div className="mt-7">
        <div className="px-5">
          <SectionHeader title="Picked for your charge" action="See all" onAction={() => goto('store')} />
        </div>
        <div className="px-5 flex gap-3 overflow-x-auto no-scrollbar">
          {recs.map((p) => (
            <div key={p.id} className="w-[148px] shrink-0">
              <ProductCard product={p} onAdd={() => goto('store')} />
            </div>
          ))}
        </div>
      </div>
    </div>
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

function Quick({ Icon, label, sub, onClick }) {
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
          className="text-[12px] text-zinc-500 mt-0.5"
          style={{ letterSpacing: '-0.005em' }}
        >
          {sub}
        </div>
      )}
    </button>
  )
}
