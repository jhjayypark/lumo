import { useState } from 'react'
import {
  CaretLeft,
  Minus,
  Plus,
  MapPin,
  Coffee,
  Hamburger,
  Wine,
  Cookie,
  BowlSteam,
  Drop,
  PencilSimple,
  ShieldCheck,
  Check,
  CaretRight,
} from '@phosphor-icons/react'
import { products, stations, user, charging } from '../data/mock.js'

const ICONS = {
  'iced-latte': Coffee,
  'chicken-sandwich': Hamburger,
  'mango-smoothie': Wine,
  'coconut-water': Drop,
  'energy-bar': Cookie,
  'instant-noodles': BowlSteam,
}

export default function CartScreen({ goto, cart, setQty }) {
  const [method, setMethod] = useState('bay')
  const [note, setNote] = useState('Bring to charger Bay A3')

  const items = cart
    .map((c) => ({ ...c, product: products.find((p) => p.id === c.productId) }))
    .filter((c) => c.product && c.qty > 0)

  const subtotal = items.reduce((n, i) => n + i.product.price * i.qty, 0)
  const fee = 0.5
  const tax = subtotal * 0.05
  const total = subtotal + fee + tax

  return (
    <div className="pt-[58px] pb-[110px] animate-rise">
      <div className="px-5 pt-2">
        <div className="flex items-center justify-between">
          <button onClick={() => goto('store')} className="text-zinc-700 text-[14px] font-medium flex items-center gap-0.5 -ml-1 press">
            <CaretLeft size={16} weight="bold" /> Store
          </button>
          <div className="text-center">
            <div className="text-[10.5px] uppercase text-zinc-400 font-medium" style={{ letterSpacing: '0.06em' }}>Your pickup</div>
            <div className="font-semibold text-zinc-950 leading-tight" style={{ fontSize: 13, letterSpacing: '-0.015em' }}>
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </div>
          </div>
          <div className="w-9 h-9" />
        </div>

        <h1 className="font-semibold text-zinc-950 leading-[1.04] mt-5" style={{ fontSize: 30, letterSpacing: '-0.032em' }}>
          Ready when
          <br /> you unplug.
        </h1>
      </div>

      {/* Pickup location */}
      <div className="px-5 mt-7">
        <div className="text-[10.5px] uppercase font-medium text-zinc-500 mb-3 px-1" style={{ letterSpacing: '0.06em' }}>
          Pickup location
        </div>
        <div className="bg-surface border border-zinc-200/80 rounded-3xl shadow-diffuse p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-accent-soft flex items-center justify-center text-accent-ink">
            <MapPin size={18} weight="fill" />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-zinc-950" style={{ fontSize: 15, letterSpacing: '-0.018em' }}>
              {stations[0].name}
            </div>
            <div className="text-[12.5px] text-zinc-500 mt-0.5">{stations[0].address}</div>
          </div>
        </div>
      </div>

      {/* Pickup method — segmented */}
      <div className="px-5 mt-7">
        <div className="text-[10.5px] uppercase font-medium text-zinc-500 mb-3 px-1" style={{ letterSpacing: '0.06em' }}>Pickup method</div>
        <div className="bg-zinc-100 rounded-full p-1 flex">
          <Seg active={method === 'counter'} onClick={() => setMethod('counter')} label="At counter" />
          <Seg active={method === 'bay'} onClick={() => setMethod('bay')} label="Bring to bay" />
        </div>
        {method === 'bay' && (
          <div className="mt-3 bg-white border border-zinc-200/80 rounded-2.5xl shadow-diffuse p-3.5 flex items-start gap-2">
            <PencilSimple size={15} className="text-zinc-400 mt-0.5" weight="regular" />
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="flex-1 bg-transparent outline-none text-[14.5px] text-zinc-950"
              placeholder="Add a note for the runner"
            />
          </div>
        )}
      </div>

      {/* Items — divided list */}
      <div className="px-5 mt-7">
        <div className="text-[10.5px] uppercase font-medium text-zinc-500 mb-3 px-1" style={{ letterSpacing: '0.06em' }}>In your bag</div>
        <div className="bg-surface border border-zinc-200/80 rounded-3xl shadow-diffuse divide-y divide-zinc-200/80">
          {items.map((i) => {
            const Icon = ICONS[i.product.id] || Coffee
            return (
              <div key={i.productId} className="flex items-center gap-3 p-3.5">
                <div
                  className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center overflow-hidden"
                  style={{
                    backgroundImage: `url(https://picsum.photos/seed/${i.product.id}-lumo-cart/200/200)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-zinc-950 truncate" style={{ fontSize: 14.5, letterSpacing: '-0.018em' }}>
                    {i.product.name}
                  </div>
                  <div className="text-[12px] text-zinc-500 font-mono tabular-nums">
                    ${i.product.price.toFixed(2)} each
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
            )
          })}
        </div>
      </div>

      {/* Ready */}
      <div className="px-5 mt-3">
        <div className="rounded-3xl p-3.5 flex items-center gap-3 bg-accent-soft border border-accent/15">
          <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center">
            <Check size={14} weight="bold" />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-accent-ink" style={{ fontSize: 14.5, letterSpacing: '-0.018em' }}>
              Ready in 9 min
            </div>
            <div className="text-[12px] text-zinc-600">
              Synced with your charging session — finishes at 9:31 AM
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="px-5 mt-7">
        <div className="text-[10.5px] uppercase font-medium text-zinc-500 mb-3 px-1" style={{ letterSpacing: '0.06em' }}>Summary</div>
        <div className="bg-surface border border-zinc-200/80 rounded-3xl shadow-diffuse p-4">
          <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
          <Row label="Pickup runner fee" value={`$${fee.toFixed(2)}`} />
          <Row label="VAT (5%)" value={`$${tax.toFixed(2)}`} />
          <div className="my-2 border-t border-zinc-200/80" />
          <Row label="Total" value={`$${total.toFixed(2)}`} bold />
        </div>
      </div>

      {/* Payment */}
      <div className="px-5 mt-3">
        <div className="bg-surface border border-zinc-200/80 rounded-3xl shadow-diffuse p-3.5 flex items-center gap-3">
          <div className="w-10 h-7 rounded-md bg-zinc-950 text-white flex items-center justify-center text-[10px] font-bold tracking-wider">
            VISA
          </div>
          <div className="flex-1">
            <div className="text-[14.5px] font-medium text-zinc-950">Visa {user.card.number}</div>
            <div className="text-[11.5px] text-zinc-500 flex items-center gap-1">
              <ShieldCheck size={11} weight="regular" /> Apple Pay enabled
            </div>
          </div>
          <CaretRight size={14} className="text-zinc-300" weight="bold" />
        </div>
      </div>

      {/* CTA */}
      <div className="absolute bottom-[88px] left-3 right-3 z-20">
        <button
          onClick={() => goto('charging')}
          className="w-full bg-zinc-950 text-white rounded-full h-13 py-3.5 flex items-center justify-center gap-2 press font-semibold text-[16px] shadow-lg"
        >
          <span>Pay & schedule pickup</span>
          <span className="font-mono tabular-nums opacity-80">${total.toFixed(2)}</span>
        </button>
      </div>
    </div>
  )
}

function Seg({ active, onClick, label }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 h-9 rounded-full text-[13px] font-medium transition-all ${
        active ? 'bg-white text-zinc-950 shadow-sm' : 'text-zinc-500'
      }`}
    >
      {label}
    </button>
  )
}

function Row({ label, value, bold }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className={bold ? 'text-zinc-950 font-semibold text-[15.5px]' : 'text-zinc-500 text-[14px]'}>
        {label}
      </span>
      <span className={`font-mono tabular-nums ${bold ? 'text-[16px] font-semibold text-zinc-950' : 'text-[14px] text-zinc-950'}`}>
        {value}
      </span>
    </div>
  )
}
