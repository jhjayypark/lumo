import {
  CaretLeft,
  ShareNetwork,
  Lightning,
  Clock,
  Star,
  Coffee,
  WifiHigh,
  Drop,
  Armchair,
  Car,
  Sparkle,
  CaretRight,
} from '@phosphor-icons/react'
import { stations } from '../data/mock.js'
import Pill from '../components/Pill.jsx'

const AMENITY = {
  Restroom: Drop,
  Seating: Armchair,
  'Wi-Fi': WifiHigh,
  'Car wash': Car,
  Lounge: Sparkle,
}

export default function StationDetailScreen({ goto }) {
  const s = stations[0]
  return (
    <div className="pb-8 animate-rise">
      {/* Hero photo */}
      <div className="relative h-[300px]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'url(https://picsum.photos/seed/lumo-bkk1-station-hero/900/600)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.55) 100%)',
          }}
        />
        <div className="absolute top-[60px] left-0 right-0 px-4 flex items-center justify-between z-10">
          <button
            onClick={() => goto('map')}
            className="w-9 h-9 rounded-full bg-white/95 backdrop-blur flex items-center justify-center press shadow-sm"
          >
            <CaretLeft size={16} className="text-zinc-950" weight="bold" />
          </button>
          <button className="w-9 h-9 rounded-full bg-white/95 backdrop-blur flex items-center justify-center press shadow-sm">
            <ShareNetwork size={15} className="text-zinc-950" weight="regular" />
          </button>
        </div>
        <div className="absolute bottom-4 left-5 right-5 text-white">
          <div className="flex items-center gap-1.5 mb-2">
            <Pill tone="invert">24/7</Pill>
            <Pill tone="invert">Café open</Pill>
            <Pill tone="invert" icon={Star}>{s.rating}</Pill>
          </div>
          <h1
            className="font-semibold leading-[1.05]"
            style={{ fontSize: 28, letterSpacing: '-0.028em' }}
          >
            {s.name}
          </h1>
          <div className="text-[13px] opacity-85 mt-0.5">{s.address}</div>
        </div>
      </div>

      {/* Stat row — divided columns, no inner card */}
      <div className="px-5 mt-5">
        <div className="bg-surface border border-zinc-200/80 rounded-3xl shadow-diffuse grid grid-cols-3 divide-x divide-zinc-200/80">
          <Cell label="Available" value={`${s.available}/${s.total}`} sub="chargers" />
          <Cell label="Ultra fast" value={s.ultraFast} sub="bays" />
          <Cell label="Price" value={`$${s.pricePerKwh.toFixed(2)}`} sub="per kWh" />
        </div>
      </div>

      {/* CTAs */}
      <div className="px-5 mt-3 grid grid-cols-2 gap-2">
        <button
          onClick={() => goto('charging')}
          className="h-12 rounded-full bg-white border border-zinc-200 text-zinc-950 font-semibold text-[14.5px] press flex items-center justify-center gap-1.5 shadow-diffuse"
        >
          <Clock size={16} weight="regular" /> Reserve
        </button>
        <button
          onClick={() => goto('charging')}
          className="h-12 rounded-full bg-zinc-950 text-white font-semibold text-[14.5px] press flex items-center justify-center gap-1.5"
        >
          <Lightning size={16} weight="fill" /> Start Charging
        </button>
      </div>

      {/* Bays */}
      <div className="px-5 mt-7">
        <div className="flex items-end justify-between mb-3 px-1">
          <div>
            <div className="text-[10.5px] uppercase font-medium text-zinc-500 mb-1" style={{ letterSpacing: '0.06em' }}>Live availability</div>
            <h3 className="font-semibold text-zinc-950 leading-none" style={{ fontSize: 18, letterSpacing: '-0.022em' }}>Charger bays</h3>
          </div>
          <div className="flex items-center gap-1 text-[11.5px] text-accent-dark font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot" />
            Live
          </div>
        </div>
        <div className="bg-surface border border-zinc-200/80 rounded-3xl shadow-diffuse p-4">
          <div className="grid grid-cols-6 gap-2">
            {Array.from({ length: 6 }).map((_, i) => {
              const ok = i < 4
              const ultra = i < 2
              return (
                <div
                  key={i}
                  className={`aspect-square rounded-2xl flex flex-col items-center justify-center text-[10px] font-mono ${
                    ok
                      ? ultra
                        ? 'bg-zinc-950 text-white'
                        : 'bg-accent-soft text-accent-ink'
                      : 'bg-zinc-100 text-zinc-400'
                  }`}
                >
                  <Lightning size={14} weight={ok ? 'fill' : 'regular'} />
                  <span className="mt-0.5">A{i + 1}</span>
                </div>
              )
            })}
          </div>
          <div className="mt-3 flex items-center gap-3 text-[11.5px] text-zinc-500">
            <Legend dot="bg-zinc-950" label="Ultra fast" />
            <Legend dot="bg-accent-soft border border-accent/40" label="Standard" />
            <Legend dot="bg-zinc-100 border border-zinc-200" label="Occupied" />
          </div>
        </div>
      </div>

      {/* Inside store */}
      <div className="px-5 mt-7">
        <div className="text-[10.5px] uppercase font-medium text-zinc-500 mb-1 px-1" style={{ letterSpacing: '0.06em' }}>Inside the store</div>
        <h3 className="font-semibold text-zinc-950 leading-none mb-3 px-1" style={{ fontSize: 18, letterSpacing: '-0.022em' }}>Lumo Café · Open</h3>
        <button
          onClick={() => goto('store')}
          className="w-full text-left bg-surface border border-zinc-200/80 rounded-3xl shadow-diffuse p-4 flex items-center gap-3 press"
        >
          <div className="w-10 h-10 rounded-2xl bg-accent-soft flex items-center justify-center text-accent-ink">
            <Coffee size={18} weight="regular" />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-zinc-950" style={{ fontSize: 14.5, letterSpacing: '-0.018em' }}>
              Coffee, sandwiches & cold drinks
            </div>
            <div className="text-[12.5px] text-zinc-500 mt-0.5">Pickup ready in 8–12 min</div>
          </div>
          <CaretRight size={14} className="text-zinc-300" weight="bold" />
        </button>
      </div>

      {/* Amenities — chips, no boxes */}
      <div className="px-5 mt-7">
        <div className="text-[10.5px] uppercase font-medium text-zinc-500 mb-3 px-1" style={{ letterSpacing: '0.06em' }}>Amenities</div>
        <div className="flex flex-wrap gap-2">
          {s.amenities.map((a) => {
            const Icon = AMENITY[a] || Sparkle
            return (
              <span key={a} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-zinc-200 text-[12.5px] text-zinc-700 shadow-sm">
                <Icon size={13} weight="regular" />
                {a}
              </span>
            )
          })}
        </div>
      </div>

      {/* Reviews */}
      <div className="px-5 mt-7">
        <div className="text-[10.5px] uppercase font-medium text-zinc-500 mb-3 px-1" style={{ letterSpacing: '0.06em' }}>What drivers say</div>
        <div className="bg-surface border border-zinc-200/80 rounded-3xl shadow-diffuse p-5">
          <div className="flex items-baseline gap-3">
            <span className="font-semibold text-zinc-950 tabular-nums leading-none" style={{ fontSize: 36, letterSpacing: '-0.034em' }}>
              {s.rating}
            </span>
            <div>
              <div className="flex gap-0.5 text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={12} weight="fill" />
                ))}
              </div>
              <div className="text-[12px] text-zinc-500 mt-0.5 font-mono tabular-nums">
                {s.reviews} reviews
              </div>
            </div>
          </div>
          <p className="mt-4 text-[15px] leading-relaxed text-zinc-700">
            “Fastest charge I've had in Phnom Penh — and the iced latte was honestly better than my usual café.”
          </p>
          <div className="mt-2 text-[12px] text-zinc-400">
            — Sopheaktra Moeun · BYD Atto 3
          </div>
        </div>
      </div>
    </div>
  )
}

function Cell({ label, value, sub }) {
  return (
    <div className="px-4 py-4">
      <div className="text-[10.5px] uppercase text-zinc-500 font-medium" style={{ letterSpacing: '0.04em' }}>{label}</div>
      <div className="font-mono tabular-nums font-semibold text-zinc-950 mt-1 leading-none" style={{ fontSize: 22, letterSpacing: '-0.022em' }}>
        {value}
      </div>
      <div className="text-[11.5px] text-zinc-400 mt-1">{sub}</div>
    </div>
  )
}

function Legend({ dot, label }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={`w-2 h-2 rounded-full ${dot}`} />
      <span>{label}</span>
    </div>
  )
}
