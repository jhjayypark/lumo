import { useState, useMemo } from 'react'
import {
  MagnifyingGlass,
  CaretLeft,
  Clock,
  ShoppingBag,
  CaretRight,
} from '@phosphor-icons/react'
import { categories, products, stations, cafeSpecialImage } from '../data/mock.js'
import ProductCard from '../components/ProductCard.jsx'

export default function StoreScreen({ goto, cart, addToCart }) {
  const [activeCat, setActiveCat] = useState('all')

  const visible = useMemo(() => {
    if (activeCat === 'all') return products
    return products.filter((p) => p.category === activeCat)
  }, [activeCat])

  const cartCount = cart.reduce((n, i) => n + i.qty, 0)
  const cartTotal = cart.reduce((n, i) => {
    const p = products.find((x) => x.id === i.productId)
    return n + (p ? p.price * i.qty : 0)
  }, 0)

  return (
    <div className="pt-[58px] pb-[110px] animate-rise">
      {/* Top */}
      <div className="px-5 pt-2">
        <div className="flex items-center justify-between">
          <button
            onClick={() => goto('home')}
            className="text-zinc-700 text-[14px] font-medium flex items-center gap-0.5 -ml-1 press"
          >
            <CaretLeft size={16} weight="bold" /> Home
          </button>
          <div className="text-center">
            <div className="text-[10.5px] uppercase text-zinc-400 font-medium" style={{ letterSpacing: '0.06em' }}>
              Pickup at
            </div>
            <div className="font-semibold text-zinc-950 leading-tight" style={{ fontSize: 13, letterSpacing: '-0.015em' }}>
              {stations[0].name}
            </div>
          </div>
          <div className="w-9 h-9" />
        </div>

        <h1 className="font-semibold text-zinc-950 leading-[1.04] mt-5" style={{ fontSize: 30, letterSpacing: '-0.032em' }}>
          Store
        </h1>
        <div className="mt-1.5 inline-flex items-center gap-1.5 text-accent-dark text-[12.5px] font-medium">
          <Clock size={13} weight="regular" />
          Ready in 8–12 min · synced with charge
        </div>

        {/* Search */}
        <div className="mt-5 flex items-center gap-2 bg-white border border-zinc-200 rounded-full px-3.5 h-11 shadow-diffuse">
          <MagnifyingGlass size={15} className="text-zinc-400" weight="bold" />
          <input
            placeholder="Search the store"
            className="flex-1 bg-transparent outline-none text-[15px] placeholder:text-zinc-400 text-zinc-950"
          />
        </div>

        {/* Categories */}
        <div className="mt-3 flex gap-1.5 overflow-x-auto no-scrollbar -mx-5 px-5">
          <Cat label="All" active={activeCat === 'all'} onClick={() => setActiveCat('all')} />
          {categories.map((c) => (
            <Cat key={c.id} label={c.label} active={activeCat === c.id} onClick={() => setActiveCat(c.id)} />
          ))}
        </div>
      </div>

      {/* Featured */}
      <div className="px-5 mt-6">
        <div className="text-[10.5px] uppercase font-medium text-zinc-500 mb-3 px-1" style={{ letterSpacing: '0.06em' }}>Café special today</div>
        <button
          className="w-full text-left rounded-3xl overflow-hidden border border-zinc-200/80 bg-surface shadow-diffuse press flex"
        >
          <div
            className="w-[120px] shrink-0"
            style={{
              backgroundImage: `url(${cafeSpecialImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="flex-1 p-4">
            <div className="text-[10.5px] uppercase font-semibold text-accent-dark" style={{ letterSpacing: '0.06em' }}>Single origin</div>
            <div className="font-semibold text-zinc-950 leading-tight mt-1" style={{ fontSize: 17, letterSpacing: '-0.02em' }}>
              Battambang highlands
            </div>
            <div className="text-[12.5px] text-zinc-500 mt-1 leading-snug">
              Free with any 30-min charge today.
            </div>
            <div className="mt-2 inline-flex items-center gap-1 text-zinc-700 text-[12.5px] font-medium">
              Claim <CaretRight size={11} weight="bold" />
            </div>
          </div>
        </button>
      </div>

      {/* Products */}
      <div className="px-5 mt-7">
        <div className="flex items-end justify-between mb-3 px-1">
          <h3 className="font-semibold text-zinc-950 leading-none" style={{ fontSize: 20, letterSpacing: '-0.024em' }}>
            {activeCat === 'all' ? 'Popular this morning' : categories.find((c) => c.id === activeCat)?.label}
          </h3>
          <span className="text-[12px] text-zinc-400 font-mono tabular-nums">{visible.length} items</span>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-5">
          {visible.map((p) => {
            const inCart = cart.find((c) => c.productId === p.id)
            return (
              <ProductCard
                key={p.id}
                product={p}
                qty={inCart?.qty || 0}
                onAdd={() => addToCart(p.id)}
              />
            )
          })}
        </div>
      </div>

      {/* Sticky cart pill */}
      {cartCount > 0 && (
        <div className="absolute bottom-[88px] left-3 right-3 z-20">
          <button
            onClick={() => goto('cart')}
            className="w-full bg-zinc-950 text-white rounded-full pl-3 pr-2.5 py-2.5 flex items-center justify-between press shadow-lg"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/12 flex items-center justify-center">
                <ShoppingBag size={16} weight="regular" />
              </div>
              <div className="text-left">
                <div className="text-[10.5px] uppercase opacity-65 font-medium" style={{ letterSpacing: '0.06em' }}>
                  {cartCount} {cartCount === 1 ? 'item' : 'items'}
                </div>
                <div className="text-[15px] font-semibold font-mono tabular-nums">
                  ${cartTotal.toFixed(2)}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-accent text-white rounded-full pl-3 pr-2 py-1.5 text-[13px] font-semibold">
              View cart <CaretRight size={12} weight="bold" />
            </div>
          </button>
        </div>
      )}
    </div>
  )
}

function Cat({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 px-3 py-1.5 rounded-full press transition-colors text-[12.5px] font-medium ${
        active ? 'bg-zinc-950 text-white' : 'bg-white text-zinc-600 border border-zinc-200'
      }`}
    >
      {label}
    </button>
  )
}
