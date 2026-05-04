import { MagnifyingGlass, Sliders, NavigationArrow, Lightning } from '@phosphor-icons/react'
import { stations } from '../data/mock.js'
import StationCard from '../components/StationCard.jsx'

const FILTERS = ['Available now', 'Ultra Fast', 'Café', '24/7']

export default function MapScreen({ goto }) {
  return (
    <div className="pt-[58px] pb-8 animate-rise">
      {/* Header */}
      <div className="px-5 pt-2">
        <div className="flex items-center justify-between">
          <h1
            className="font-semibold text-zinc-950 leading-none"
            style={{ fontSize: 30, letterSpacing: '-0.032em' }}
          >
            Find a charger
          </h1>
          <button className="w-9 h-9 rounded-full bg-white border border-zinc-200 flex items-center justify-center press shadow-diffuse">
            <NavigationArrow size={16} className="text-zinc-700" weight="fill" />
          </button>
        </div>

        {/* Search */}
        <div className="mt-5 flex items-center gap-2 bg-white border border-zinc-200 rounded-full px-3.5 h-11 shadow-diffuse">
          <MagnifyingGlass size={15} className="text-zinc-400" weight="bold" />
          <input
            placeholder="Search station or city"
            className="flex-1 bg-transparent outline-none text-[15px] placeholder:text-zinc-400 text-zinc-950"
          />
          <Sliders size={15} className="text-zinc-400" weight="bold" />
        </div>

        {/* Filters */}
        <div className="mt-3 flex gap-1.5 overflow-x-auto no-scrollbar -mx-5 px-5">
          {FILTERS.map((f, i) => (
            <button
              key={f}
              className={`shrink-0 text-[12.5px] px-3 py-1.5 rounded-full press transition-colors font-medium ${
                i === 0
                  ? 'bg-zinc-950 text-white'
                  : 'bg-white text-zinc-600 border border-zinc-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Stylised map */}
      <div className="mt-5 mx-5 h-[260px] rounded-3xl overflow-hidden relative border border-zinc-200/80 shadow-diffuse">
        <MapBackground />
        <Pin x="32%" y="42%" station={stations[0]} primary />
        <Pin x="62%" y="30%" station={stations[1]} />
        <Pin x="48%" y="68%" station={stations[2]} />

        <div className="absolute" style={{ left: '46%', top: '52%' }}>
          <div className="relative">
            <div className="absolute inset-0 -m-2.5 rounded-full bg-zinc-900/15 animate-pulse-dot" />
            <div className="w-3.5 h-3.5 rounded-full bg-zinc-950 ring-[3px] ring-white" />
          </div>
        </div>

        <div className="absolute top-3 left-3 right-3 flex justify-between">
          <div className="bg-white/95 backdrop-blur rounded-full px-3 py-1 text-[11.5px] font-medium text-zinc-950 shadow-sm">
            Phnom Penh · BKK1
          </div>
          <div className="bg-white/95 backdrop-blur rounded-full px-2.5 py-1 text-[11.5px] font-mono tabular-nums text-zinc-950 shadow-sm flex items-center gap-1">
            <Lightning size={11} weight="fill" className="text-accent-dark" />
            5 nearby
          </div>
        </div>
      </div>

      {/* Grouped list — single container with dividers (skill: prefer dividers over stacked cards) */}
      <div className="mt-7">
        <div className="px-5 mb-3">
          <div
            className="text-[10.5px] font-medium text-zinc-500 uppercase mb-1"
            style={{ letterSpacing: '0.06em' }}
          >
            Within 25 km
          </div>
          <h3
            className="font-semibold text-zinc-950 leading-none"
            style={{ fontSize: 18, letterSpacing: '-0.022em' }}
          >
            Nearby stations
          </h3>
        </div>
        <div className="mx-5 bg-surface border border-zinc-200/80 rounded-3xl overflow-hidden shadow-diffuse divide-y divide-zinc-200/80">
          {stations.map((s) => (
            <StationCard key={s.id} station={s} onClick={() => goto('station')} />
          ))}
        </div>
        <div className="px-5 mt-2 text-[11.5px] text-zinc-400">
          Distances calculated from your current location.
        </div>
      </div>
    </div>
  )
}

function Pin({ x, y, station, primary = false }) {
  return (
    <div className="absolute -translate-x-1/2 -translate-y-full" style={{ left: x, top: y }}>
      <div
        className={`relative rounded-full pl-1 pr-2 py-1 flex items-center gap-1 shadow-md ${
          primary ? 'bg-zinc-950 text-white' : 'bg-white text-zinc-950'
        }`}
      >
        <div
          className={`w-5 h-5 rounded-full flex items-center justify-center ${
            primary ? 'bg-white/15' : 'bg-accent-soft'
          }`}
        >
          <Lightning size={11} weight="fill" className={primary ? 'text-white' : 'text-accent-dark'} />
        </div>
        <span className="text-[11px] font-semibold tabular-nums">
          {station.available}/{station.total}
        </span>
        <span
          className={`absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 rotate-45 ${
            primary ? 'bg-zinc-950' : 'bg-white'
          }`}
        />
      </div>
    </div>
  )
}

function MapBackground() {
  return (
    <svg viewBox="0 0 400 260" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="mapBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F1F2F4" />
          <stop offset="100%" stopColor="#E4E6EA" />
        </linearGradient>
      </defs>
      <rect width="400" height="260" fill="url(#mapBg)" />
      <path
        d="M0,170 C80,140 140,200 220,170 C300,140 360,190 400,160 L400,260 L0,260 Z"
        fill="#D6E5F0"
      />
      <rect x="40" y="50" width="70" height="40" rx="4" fill="#E4EEDA" />
      <rect x="280" y="30" width="60" height="50" rx="4" fill="#E4EEDA" />
      <g stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round">
        <line x1="0" y1="100" x2="400" y2="120" />
        <line x1="180" y1="0" x2="220" y2="260" />
        <line x1="0" y1="210" x2="400" y2="190" />
        <line x1="80" y1="0" x2="100" y2="260" />
        <line x1="320" y1="0" x2="340" y2="260" />
      </g>
      <g fill="#E8ECF1">
        <rect x="20" y="20" width="14" height="14" rx="1" />
        <rect x="120" y="10" width="22" height="22" rx="1" />
        <rect x="240" y="110" width="18" height="18" rx="1" />
        <rect x="270" y="190" width="20" height="16" rx="1" />
        <rect x="60" y="220" width="16" height="14" rx="1" />
        <rect x="350" y="50" width="18" height="16" rx="1" />
      </g>
    </svg>
  )
}
