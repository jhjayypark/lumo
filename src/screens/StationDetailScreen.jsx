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
  Cookie,
  CaretRight,
  Plus,
} from '@phosphor-icons/react'
import { stations, chargeOptions, fmtKHR } from '../data/mock.js'
import Pill from '../components/Pill.jsx'
import BalanceChip from '../components/BalanceChip.jsx'
import ChargingHoldCard from '../components/ChargingHoldCard.jsx'
import { StickyBottom } from '../components/PhoneFrame.jsx'

const AMENITY = {
  Restroom: Drop,
  Seating: Armchair,
  'Wi-Fi': WifiHigh,
  'Car wash': Car,
  Coffee: Coffee,
  Snacks: Cookie,
}

export default function StationDetailScreen({ goto, balance, chargeOption, setChargeOption }) {
  const s = stations[0]
  const opt = chargeOptions.find((o) => o.id === chargeOption) || chargeOptions[0]

  return (
    <div className="pb-[120px] animate-rise">
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
          <div className="flex items-center gap-2">
            <BalanceChip balance={balance} onClick={() => goto('wallet')} />
            <button className="w-9 h-9 rounded-full bg-white/95 backdrop-blur flex items-center justify-center press shadow-sm">
              <ShareNetwork size={15} className="text-zinc-950" weight="regular" />
            </button>
          </div>
        </div>
        <div className="absolute bottom-4 left-5 right-5 text-white">
          <div className="flex items-center gap-1.5 mb-2">
            <Pill tone="invert">24/7</Pill>
            <Pill tone="invert">Café open</Pill>
            <Pill tone="invert" icon={Star}>{s.rating}</Pill>
          </div>
          <h1 className="font-semibold leading-[1.05]" style={{ fontSize: 28, letterSpacing: '-0.028em' }}>
            {s.name}
          </h1>
          <div className="text-[13px] opacity-85 mt-0.5">{s.address}</div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-5 mt-5">
        <div className="bg-surface border border-zinc-200/80 rounded-3xl shadow-diffuse grid grid-cols-3 divide-x divide-zinc-200/80">
          <Cell label="Available" value={`${s.available}/${s.total}`} sub="chargers" />
          <Cell label="Ultra fast" value={`${s.ultraFast}`} sub={`up to ${s.maxKw} kW`} />
          <Cell label="Price" value={fmtKHR(s.pricePerKwh)} sub="per kWh" />
        </div>
      </div>

      {/* Wallet hold card */}
      <div className="px-5 mt-3">
        <ChargingHoldCard
          variant="pre"
          available={balance}
          reserved={opt.holdKhr}
        />
      </div>

      {/* Charging options */}
      <div className="px-5 mt-6">
        <div
          className="text-[10.5px] uppercase font-medium text-zinc-500 mb-3 px-1"
          style={{ letterSpacing: '0.06em' }}
        >
          How much to charge
        </div>
        <div className="bg-surface border border-zinc-200/80 rounded-3xl shadow-diffuse divide-y divide-zinc-200/80 overflow-hidden">
          {chargeOptions.map((o) => {
            const active = chargeOption === o.id
            return (
              <button
                key={o.id}
                onClick={() => setChargeOption(o.id)}
                className="w-full text-left flex items-center gap-3 p-3.5 press hover:bg-zinc-50 transition-colors"
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    active ? 'bg-zinc-950 border border-zinc-950' : 'border border-zinc-300'
                  }`}
                >
                  {active && <span className="w-2.5 h-2.5 rounded-full bg-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className="font-semibold text-zinc-950"
                      style={{ fontSize: 15, letterSpacing: '-0.018em' }}
                    >
                      {o.label}
                    </span>
                    {o.sub === 'Recommended' && (
                      <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded-md bg-accent-soft text-accent-ink" style={{ letterSpacing: '0.04em' }}>
                        {o.sub}
                      </span>
                    )}
                  </div>
                  <div className="text-[12px] text-zinc-500 mt-0.5">{o.detail}</div>
                </div>
                <div className="text-right">
                  <div
                    className="font-mono tabular-nums text-zinc-950 font-semibold"
                    style={{ fontSize: 14 }}
                  >
                    {fmtKHR(o.holdKhr)}
                  </div>
                  <div className="text-[10.5px] text-zinc-400">hold</div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Amenities */}
      <div className="px-5 mt-6">
        <div
          className="text-[10.5px] uppercase font-medium text-zinc-500 mb-3 px-1"
          style={{ letterSpacing: '0.06em' }}
        >
          Store amenities
        </div>
        <div className="flex flex-wrap gap-2">
          {s.amenities.map((a) => {
            const Icon = AMENITY[a] || Cookie
            return (
              <span
                key={a}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-zinc-200 text-[12.5px] text-zinc-700 shadow-sm"
              >
                <Icon size={13} weight="regular" />
                {a}
              </span>
            )
          })}
        </div>
      </div>

      {/* Payment badges */}
      <div className="px-5 mt-6">
        <div
          className="text-[10.5px] uppercase font-medium text-zinc-500 mb-3 px-1"
          style={{ letterSpacing: '0.06em' }}
        >
          Pay with
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'Lumo Wallet', accent: true },
            { label: 'KHQR' },
            { label: 'ABA' },
            { label: 'ACLEDA' },
            { label: 'Card' },
          ].map((p) => (
            <span
              key={p.label}
              className={`inline-flex items-center px-3 py-1.5 rounded-full text-[12.5px] font-medium ${
                p.accent
                  ? 'bg-accent-soft text-accent-ink border border-accent/20'
                  : 'bg-white text-zinc-700 border border-zinc-200'
              }`}
            >
              {p.label}
            </span>
          ))}
        </div>
      </div>

      <StickyBottom>
        <div className="grid grid-cols-[1fr_2fr] gap-2">
          <button
            onClick={() => goto('addcredit')}
            className="h-13 py-3.5 rounded-full bg-white border border-zinc-200 text-zinc-950 font-semibold text-[14px] press flex items-center justify-center gap-1.5 shadow-lg"
          >
            <Plus size={14} weight="bold" /> Credit
          </button>
          <button
            onClick={() => goto('charging')}
            className="h-13 py-3.5 rounded-full bg-zinc-950 text-white font-semibold text-[15px] press flex items-center justify-center gap-2 shadow-lg"
          >
            <Lightning size={15} weight="fill" />
            <span>Start Charging</span>
            <span className="font-mono tabular-nums opacity-70">{fmtKHR(opt.holdKhr)}</span>
          </button>
        </div>
      </StickyBottom>
    </div>
  )
}

function Cell({ label, value, sub }) {
  return (
    <div className="px-4 py-4">
      <div
        className="text-[10.5px] uppercase text-zinc-500 font-medium"
        style={{ letterSpacing: '0.04em' }}
      >
        {label}
      </div>
      <div
        className="font-mono tabular-nums font-semibold text-zinc-950 mt-1 leading-none"
        style={{ fontSize: 18, letterSpacing: '-0.022em' }}
      >
        {value}
      </div>
      <div className="text-[11.5px] text-zinc-400 mt-1">{sub}</div>
    </div>
  )
}
