import { useState, useMemo } from 'react'
import {
  MagnifyingGlass,
  CaretLeft,
  Clock,
  ShoppingBag,
  CaretRight,
  Plus,
  Minus,
  Wallet,
  ShieldCheck,
} from '@phosphor-icons/react'
import {
  categories,
  products,
  stations,
  charging,
  cafeSpecialImage,
  fmtKHR,
  fmtUSD,
  ORDER_STAGES,
} from '../data/mock.js'
import ProductCard from '../components/ProductCard.jsx'
import BalanceChip from '../components/BalanceChip.jsx'
import PickupMethodSelector from '../components/PickupMethodSelector.jsx'
import OrderStatusStepper from '../components/OrderStatusStepper.jsx'

export default function StoreScreen({
  goto,
  cart,
  addToCart,
  setQty,
  balance,
  orderStage,
  setOrderStage,
}) {
  const [activeCat, setActiveCat] = useState('all')
  const [pickup, setPickup] = useState('bay')
  const [showCart, setShowCart] = useState(false)

  const visible = useMemo(() => {
    if (activeCat === 'all') return products
    return products.filter((p) => p.category === activeCat)
  }, [activeCat])

  const cartItems = cart
    .map((c) => ({ ...c, product: products.find((p) => p.id === c.productId) }))
    .filter((c) => c.product && c.qty > 0)
  const cartCount = cartItems.reduce((n, i) => n + i.qty, 0)
  const cartTotal = cartItems.reduce((n, i) => n + i.product.price * i.qty, 0)
  const balanceAfter = balance - cartTotal

  return (
    <div className="pt-[58px] pb-[120px] animate-rise">
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
              Lumo BKK1 Store
            </div>
          </div>
          <BalanceChip balance={balance} onClick={() => goto('wallet')} />
        </div>

        <h1
          className="font-semibold text-zinc-950 leading-[1.04] mt-5"
          style={{ fontSize: 30, letterSpacing: '-0.032em' }}
        >
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

      {/* Featured café */}
      <div className="px-5 mt-6">
        <div
          className="text-[10.5px] uppercase font-medium text-zinc-500 mb-3 px-1"
          style={{ letterSpacing: '0.06em' }}
        >
          Café special today
        </div>
        <button className="w-full text-left rounded-3xl overflow-hidden border border-zinc-200/80 bg-surface shadow-diffuse press flex">
          <div
            className="w-[120px] shrink-0"
            style={{
              backgroundImage: `url(${cafeSpecialImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="flex-1 p-4">
            <div className="text-[10.5px] uppercase font-semibold text-accent-dark" style={{ letterSpacing: '0.06em' }}>
              Single origin
            </div>
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

      {/* Cart drawer — inline expanded when showCart */}
      {cartCount > 0 && showCart && (
        <div className="px-5 mt-7 space-y-5">
          {/* Items list */}
          <div>
            <div className="text-[10.5px] uppercase font-medium text-zinc-500 mb-3 px-1" style={{ letterSpacing: '0.06em' }}>
              In your bag
            </div>
            <div className="bg-surface border border-zinc-200/80 rounded-3xl shadow-diffuse divide-y divide-zinc-200/80">
              {cartItems.map((i) => (
                <div key={i.productId} className="flex items-center gap-3 p-3.5">
                  <div
                    className="w-12 h-12 rounded-2xl bg-zinc-100 overflow-hidden"
                    style={{
                      backgroundImage: `url(${i.product.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-zinc-950 truncate" style={{ fontSize: 14.5, letterSpacing: '-0.018em' }}>
                      {i.product.name}
                    </div>
                    <div className="text-[12px] text-zinc-500 font-mono tabular-nums">
                      {fmtKHR(i.product.price)} each
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-zinc-100 rounded-full p-0.5">
                    <button
                      onClick={() => setQty(i.productId, Math.max(0, i.qty - 1))}
                      className="w-7 h-7 rounded-full bg-white text-zinc-950 flex items-center justify-center press shadow-sm"
                    >
                      <Minus size={12} weight="bold" />
                    </button>
                    <span className="text-[14px] font-semibold tabular-nums w-5 text-center">{i.qty}</span>
                    <button
                      onClick={() => setQty(i.productId, i.qty + 1)}
                      className="w-7 h-7 rounded-full bg-zinc-950 text-white flex items-center justify-center press"
                    >
                      <Plus size={12} weight="bold" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pickup method */}
          <div>
            <div className="text-[10.5px] uppercase font-medium text-zinc-500 mb-3 px-1" style={{ letterSpacing: '0.06em' }}>
              Pickup method
            </div>
            <PickupMethodSelector value={pickup} onChange={setPickup} bay={charging.bay} />
          </div>

          {/* Payment + balance after */}
          <div>
            <div className="text-[10.5px] uppercase font-medium text-zinc-500 mb-3 px-1" style={{ letterSpacing: '0.06em' }}>
              Payment
            </div>
            <div className="bg-surface border border-zinc-200/80 rounded-3xl shadow-diffuse p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-zinc-950 text-white flex items-center justify-center shrink-0">
                <Wallet size={18} weight="fill" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-zinc-950" style={{ fontSize: 14.5, letterSpacing: '-0.018em' }}>
                    Lumo Wallet
                  </span>
                  <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded-md bg-accent-soft text-accent-ink" style={{ letterSpacing: '0.04em' }}>
                    Selected
                  </span>
                </div>
                <div className="text-[12px] text-zinc-500 flex items-center gap-1 mt-0.5">
                  <ShieldCheck size={11} weight="regular" />
                  Balance after order · <span className="font-mono tabular-nums text-zinc-950 font-semibold">{fmtKHR(balanceAfter)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div>
            <div className="text-[10.5px] uppercase font-medium text-zinc-500 mb-3 px-1" style={{ letterSpacing: '0.06em' }}>
              Summary
            </div>
            <div className="bg-surface border border-zinc-200/80 rounded-3xl shadow-diffuse p-4">
              <Row label="Subtotal" value={fmtKHR(cartTotal)} />
              <Row label="Pickup runner fee" value={fmtKHR(0)} sub="Free for chargers" />
              <Row label="VAT (10% incl.)" value="Included" />
              <div className="my-2 border-t border-zinc-200/80" />
              <Row label="Total" value={fmtKHR(cartTotal)} bold usd />
            </div>
          </div>

          {/* Order status */}
          {orderStage !== 'idle' && (
            <OrderStatusStepper stage={orderStage} bay={charging.bay} />
          )}
        </div>
      )}

      {/* Sticky cart preview */}
      {cartCount > 0 && !showCart && (
        <div className="absolute bottom-[88px] left-3 right-3 z-20">
          <button
            onClick={() => setShowCart(true)}
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
                <div className="text-[15px] font-semibold font-mono tabular-nums">{fmtKHR(cartTotal)}</div>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-accent text-white rounded-full pl-3 pr-2 py-1.5 text-[13px] font-semibold">
              View cart <CaretRight size={12} weight="bold" />
            </div>
          </button>
        </div>
      )}

      {/* Sticky CTA when cart open */}
      {cartCount > 0 && showCart && (
        <div className="absolute bottom-[88px] left-3 right-3 z-20">
          <button
            onClick={() => setOrderStage('Received')}
            className="w-full bg-zinc-950 text-white rounded-full h-13 py-3.5 flex items-center justify-center gap-2 press font-semibold text-[16px] shadow-lg"
          >
            <Wallet size={16} weight="fill" />
            <span>Pay with Lumo Wallet</span>
            <span className="font-mono tabular-nums opacity-80">{fmtKHR(cartTotal)}</span>
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

function Row({ label, value, sub, bold, usd }) {
  const khr = typeof value === 'string' && value.startsWith('៛') ? value : null
  return (
    <div className="py-1">
      <div className="flex items-center justify-between">
        <span className={bold ? 'text-zinc-950 font-semibold text-[15.5px]' : 'text-zinc-500 text-[14px]'}>{label}</span>
        <span
          className={`font-mono tabular-nums ${
            bold ? 'text-[16px] font-semibold text-zinc-950' : 'text-[14px] text-zinc-950'
          }`}
        >
          {value}
        </span>
      </div>
      {sub && <div className="text-[11px] text-zinc-400 mt-0.5">{sub}</div>}
      {usd && khr && (
        <div className="text-right text-[11px] text-zinc-400 font-mono mt-0.5">≈ {fmtUSD(parseInt(khr.replace(/[៛,]/g, '')))}</div>
      )}
    </div>
  )
}
