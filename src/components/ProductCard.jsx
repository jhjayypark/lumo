import { Plus } from '@phosphor-icons/react'

// Editorial product tile: photo placeholder, calm meta, single-tone +.
export default function ProductCard({ product, onAdd, qty = 0 }) {
  return (
    <div className="flex flex-col">
      <div
        className="relative aspect-square rounded-2.5xl overflow-hidden bg-zinc-100"
        style={{
          backgroundImage: `url(https://picsum.photos/seed/${product.id}-lumo/400/400)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          boxShadow: 'inset 0 0 0 0.5px rgba(15,23,42,0.06)',
        }}
      >
        {product.badge && (
          <div className="absolute top-2 left-2 text-[10.5px] font-semibold uppercase px-1.5 py-0.5 rounded-md bg-white/95 text-zinc-950" style={{ letterSpacing: '0.04em' }}>
            {product.badge}
          </div>
        )}
        <button
          onClick={onAdd}
          className={`absolute bottom-2 right-2 w-8 h-8 rounded-full flex items-center justify-center press shadow-sm ${
            qty > 0 ? 'bg-accent text-white' : 'bg-white text-zinc-950'
          }`}
        >
          {qty > 0 ? (
            <span className="text-[12px] font-bold tabular-nums">{qty}</span>
          ) : (
            <Plus size={14} weight="bold" />
          )}
        </button>
      </div>

      <div className="mt-2.5 px-0.5">
        <div className="flex items-center justify-between gap-2">
          <div
            className="font-medium text-zinc-950 truncate"
            style={{ fontSize: 14.5, letterSpacing: '-0.018em' }}
          >
            {product.name}
          </div>
          <div className="font-mono tabular-nums text-[13.5px] font-semibold text-zinc-950 shrink-0">
            ${product.price.toFixed(2)}
          </div>
        </div>
        <div className="text-[12px] text-zinc-500 mt-0.5 truncate">
          {product.sub}
        </div>
      </div>
    </div>
  )
}
