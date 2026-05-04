import { Lightning, Coffee, MapPin, CaretRight } from '@phosphor-icons/react'

// Used in row form (inside grouped lists) — minimal, divider-friendly.
export default function StationCard({ station, onClick }) {
  const tone =
    station.available > 3
      ? 'text-accent-dark'
      : station.available > 0
      ? 'text-amber-600'
      : 'text-rose-500'

  return (
    <button
      onClick={onClick}
      className="w-full text-left flex items-center gap-3.5 p-4 hover:bg-zinc-50 press transition-colors"
    >
      {/* Photo placeholder via picsum */}
      <div
        className="w-[52px] h-[52px] rounded-2xl shrink-0 overflow-hidden bg-zinc-100"
        style={{
          backgroundImage: `url(https://picsum.photos/seed/${station.id}-lumo/200/200)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          boxShadow: 'inset 0 0 0 0.5px rgba(15,23,42,0.06)',
        }}
      />

      <div className="flex-1 min-w-0">
        <div
          className="font-semibold text-zinc-950 truncate"
          style={{ fontSize: 16, letterSpacing: '-0.02em' }}
        >
          {station.name}
        </div>
        <div className="flex items-center gap-1 mt-0.5 text-zinc-500 text-[13px]">
          <MapPin size={11} weight="fill" />
          <span className="truncate">{station.address.split(',')[0]}</span>
        </div>
        <div className="flex items-center gap-2 mt-1.5 text-[12px]">
          <span className={`font-semibold ${tone}`}>
            {station.available}/{station.total} open
          </span>
          <span className="text-zinc-300">·</span>
          <span className="text-zinc-500 font-mono tabular-nums">
            ${station.pricePerKwh.toFixed(2)}/kWh
          </span>
          {station.cafe && (
            <>
              <span className="text-zinc-300">·</span>
              <Coffee size={11} className="text-zinc-500" weight="fill" />
            </>
          )}
        </div>
      </div>

      <div className="shrink-0 flex items-center gap-1.5">
        <span className="font-mono text-[14px] tabular-nums text-zinc-700">
          {station.distanceKm} km
        </span>
        <CaretRight size={14} className="text-zinc-300" weight="bold" />
      </div>
    </button>
  )
}
