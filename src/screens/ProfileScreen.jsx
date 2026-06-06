import { useState } from 'react'
import {
  CaretRight,
  Car,
  CreditCard,
  Wallet,
  ClockCounterClockwise,
  ShoppingBag,
  Gear,
  Globe,
  Lifebuoy,
  SignOut,
  BatteryHigh,
  FileText,
} from '@phosphor-icons/react'
import { user, fmtKHR } from '../data/mock.js'

const menu = [
  {
    id: 'payment',
    Icon: CreditCard,
    tint: 'bg-zinc-950',
    label: 'Payment methods',
    sub: 'KHQR, ABA, ACLEDA, Visa •••• 4242',
  },
  {
    id: 'wallet-settings',
    Icon: Wallet,
    tint: 'bg-accent',
    label: 'Wallet settings',
    sub: 'Auto top-up · Low balance',
  },
  {
    id: 'history',
    Icon: ClockCounterClockwise,
    tint: 'bg-rose-500',
    label: 'Charging history',
    sub: '12 sessions',
  },
  {
    id: 'orders',
    Icon: ShoppingBag,
    tint: 'bg-amber-500',
    label: 'Store order history',
    sub: '12 this month',
  },
  {
    id: 'support',
    Icon: Lifebuoy,
    tint: 'bg-sky-500',
    label: 'Support',
    sub: 'Chat with Lumo team',
  },
  {
    id: 'legal',
    Icon: FileText,
    tint: 'bg-zinc-500',
    label: 'Legal & terms',
    sub: 'Privacy, terms of service',
  },
]

export default function ProfileScreen() {
  const [autoTopup, setAutoTopup] = useState(user.settings.autoTopup)
  const [lowAlert, setLowAlert] = useState(user.settings.lowBalanceAlert)
  const [lang, setLang] = useState('en')

  return (
    <div className="pt-[58px] pb-8 animate-rise">
      <div className="px-5 pt-2 flex items-center justify-between">
        <h1 className="font-semibold text-zinc-950 leading-none" style={{ fontSize: 30, letterSpacing: '-0.032em' }}>Profile</h1>
        <button className="w-9 h-9 rounded-full bg-white border border-zinc-200 flex items-center justify-center press shadow-diffuse">
          <Gear size={16} className="text-zinc-700" weight="regular" />
        </button>
      </div>

      {/* User card */}
      <div className="px-5 mt-6">
        <div className="bg-surface border border-zinc-200/80 rounded-3xl shadow-diffuse p-4 flex items-center gap-3.5">
          <div
            className="w-14 h-14 rounded-full overflow-hidden"
            style={{
              backgroundImage: 'url(https://picsum.photos/seed/lumo-jay-park/200/200)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              boxShadow: 'inset 0 0 0 0.5px rgba(15,23,42,0.1)',
            }}
          />
          <div className="flex-1">
            <div className="font-semibold text-zinc-950" style={{ fontSize: 17, letterSpacing: '-0.022em' }}>
              {user.firstName} {user.lastName}
            </div>
            <div className="text-[13px] text-zinc-500">{user.email}</div>
            <div className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-accent-ink bg-accent-soft rounded-full px-2 py-0.5">
              {user.tier}
            </div>
          </div>
          <CaretRight size={14} className="text-zinc-300" weight="bold" />
        </div>
      </div>

      {/* Vehicle pass */}
      <div className="px-5 mt-3">
        <div className="rounded-3xl p-4 text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #18181B 0%, #09090B 100%)' }}>
          <div className="relative flex items-center justify-between">
            <div className="text-[10.5px] uppercase opacity-65 font-medium" style={{ letterSpacing: '0.06em' }}>My vehicle</div>
            <button className="text-[13px] text-white/70 hover:text-white press">Change</button>
          </div>
          <div className="relative mt-3 flex items-end justify-between">
            <div>
              <div className="font-semibold leading-none" style={{ fontSize: 22, letterSpacing: '-0.024em' }}>
                {user.vehicle.make} {user.vehicle.model}
              </div>
              <div className="text-[12px] opacity-70 mt-1.5 font-mono tabular-nums">{user.vehicle.plate}</div>
            </div>
            <Car size={44} weight="regular" className="opacity-85" />
          </div>
          <div className="relative mt-4 grid grid-cols-2 gap-2">
            <Mini label="Battery" value={`${user.vehicle.battery}%`} icon={<BatteryHigh size={11} weight="regular" />} />
            <Mini label="Range" value={`${user.vehicle.range} km`} />
          </div>
        </div>
      </div>

      {/* Wallet quick toggles */}
      <div className="px-5 mt-7">
        <div className="text-[10.5px] uppercase font-medium text-zinc-500 mb-3 px-1" style={{ letterSpacing: '0.06em' }}>
          Wallet
        </div>
        <div className="bg-surface border border-zinc-200/80 rounded-3xl shadow-diffuse divide-y divide-zinc-200/80">
          <Toggle
            Icon={Wallet}
            tint="bg-accent"
            label="Auto top-up"
            sub={`When balance drops below ${fmtKHR(user.settings.autoTopupThreshold)}`}
            value={autoTopup}
            onChange={setAutoTopup}
          />
          <Toggle
            Icon={BatteryHigh}
            tint="bg-amber-500"
            label="Low balance alert"
            sub="Notify before a charge runs out"
            value={lowAlert}
            onChange={setLowAlert}
          />
        </div>
      </div>

      {/* Account list */}
      <div className="px-5 mt-7">
        <div className="text-[10.5px] uppercase font-medium text-zinc-500 mb-3 px-1" style={{ letterSpacing: '0.06em' }}>Account</div>
        <div className="bg-surface border border-zinc-200/80 rounded-3xl shadow-diffuse divide-y divide-zinc-200/80">
          {menu.map((m) => (
            <button key={m.id} className="w-full flex items-center gap-3 p-3.5 text-left hover:bg-zinc-50 transition-colors">
              <div className={`w-7 h-7 rounded-md flex items-center justify-center text-white ${m.tint}`}>
                <m.Icon size={14} weight="regular" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[14.5px] text-zinc-950 leading-tight">{m.label}</div>
                <div className="text-[11.5px] text-zinc-500 mt-0.5 truncate">{m.sub}</div>
              </div>
              <CaretRight size={14} className="text-zinc-300" weight="bold" />
            </button>
          ))}
        </div>
      </div>

      {/* Language */}
      <div className="px-5 mt-7">
        <div className="text-[10.5px] uppercase font-medium text-zinc-500 mb-3 px-1" style={{ letterSpacing: '0.06em' }}>Language</div>
        <div className="bg-surface border border-zinc-200/80 rounded-3xl shadow-diffuse p-3.5 flex items-center gap-3">
          <div className="w-7 h-7 rounded-md bg-sky-500 flex items-center justify-center text-white">
            <Globe size={14} weight="regular" />
          </div>
          <div className="flex-1">
            <div className="text-[14.5px] text-zinc-950 leading-tight">App language</div>
            <div className="text-[12px] text-zinc-500">English / Khmer</div>
          </div>
          <div className="bg-zinc-100 rounded-full p-0.5 flex">
            <button
              onClick={() => setLang('en')}
              className={`px-3 py-1 rounded-full text-[12px] font-semibold transition-colors ${
                lang === 'en' ? 'bg-white text-zinc-950 shadow-sm' : 'text-zinc-500'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLang('km')}
              className={`px-3 py-1 rounded-full text-[12px] font-semibold transition-colors ${
                lang === 'km' ? 'bg-white text-zinc-950 shadow-sm' : 'text-zinc-500'
              }`}
            >
              Khmer
            </button>
          </div>
        </div>
      </div>

      {/* Sign out */}
      <div className="px-5 mt-7">
        <button className="w-full bg-white border border-zinc-200 rounded-full p-3.5 flex items-center justify-center gap-2 press shadow-diffuse">
          <SignOut size={15} className="text-rose-500" weight="regular" />
          <span className="text-[14.5px] font-medium text-rose-500">Sign out</span>
        </button>
      </div>

      <div className="px-5 mt-7 text-center">
        <div className="text-[10.5px] text-zinc-400 uppercase font-medium" style={{ letterSpacing: '0.06em' }}>
          Lumo · v0.6 · Phnom Penh
        </div>
      </div>
    </div>
  )
}

function Mini({ label, value, icon }) {
  return (
    <div className="rounded-2xl p-2.5 bg-white/[0.06] border border-white/10">
      <div className="text-[10.5px] uppercase opacity-65 flex items-center gap-1 font-medium" style={{ letterSpacing: '0.06em' }}>
        {icon}
        {label}
      </div>
      <div className="font-mono tabular-nums text-[18px] mt-1 leading-none font-semibold">{value}</div>
    </div>
  )
}

function Toggle({ Icon, tint, label, sub, value, onChange }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className="w-full flex items-center gap-3 p-3.5 text-left hover:bg-zinc-50 transition-colors press"
    >
      <div className={`w-7 h-7 rounded-md flex items-center justify-center text-white ${tint}`}>
        <Icon size={14} weight="regular" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[14.5px] text-zinc-950 leading-tight">{label}</div>
        <div className="text-[11.5px] text-zinc-500 mt-0.5">{sub}</div>
      </div>
      <div
        className={`relative w-[44px] h-[26px] rounded-full transition-colors ${
          value ? 'bg-accent' : 'bg-zinc-200'
        }`}
      >
        <span
          className="absolute top-0.5 w-[22px] h-[22px] rounded-full bg-white shadow transition-all"
          style={{ left: value ? 20 : 2 }}
        />
      </div>
    </button>
  )
}
