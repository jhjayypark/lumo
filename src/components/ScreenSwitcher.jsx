import {
  SquaresFour,
  MapTrifold,
  Buildings,
  BatteryCharging,
  ShoppingBag,
  Wallet,
  QrCode,
  Plus,
  UserCircle,
} from '@phosphor-icons/react'

export const SCREENS = [
  { id: 'home',     label: 'Home',           sub: 'Dashboard',          tab: 'home',    Icon: SquaresFour,     n: '01' },
  { id: 'wallet',   label: 'Wallet',         sub: 'Balance & rewards',  tab: 'wallet',  Icon: Wallet,          n: '02' },
  { id: 'addcredit',label: 'Add Credit',     sub: 'Top-up flow',        tab: 'wallet',  Icon: Plus,            n: '03' },
  { id: 'khqr',     label: 'KHQR Payment',   sub: 'Pending · Success',  tab: 'wallet',  Icon: QrCode,          n: '04' },
  { id: 'map',      label: 'Find Charger',   sub: 'Map & nearby',       tab: 'charge',  Icon: MapTrifold,      n: '05' },
  { id: 'station',  label: 'Station Detail', sub: 'Start charging',     tab: 'charge',  Icon: Buildings,       n: '06' },
  { id: 'charging', label: 'Charging',       sub: 'Live · with hold',   tab: 'charge',  Icon: BatteryCharging, n: '07' },
  { id: 'store',    label: 'Store + Cart',   sub: 'Order + pickup',     tab: 'store',   Icon: ShoppingBag,     n: '08' },
  { id: 'profile',  label: 'Profile',        sub: 'Account',            tab: 'profile', Icon: UserCircle,      n: '09' },
]

export default function ScreenSwitcher({ active, onChange }) {
  return (
    <aside className="w-[260px] shrink-0 flex flex-col self-start sticky top-8">
      <div className="px-1 pb-4">
        <div
          className="text-[10.5px] font-medium text-zinc-500 uppercase mb-1.5"
          style={{ letterSpacing: '0.08em' }}
        >
          Prototype
        </div>
        <div
          className="font-semibold text-zinc-950 leading-[1.05]"
          style={{ fontSize: 26, letterSpacing: '-0.028em' }}
        >
          Nine screens.
          <div className="text-zinc-400 font-normal">One Cambodia-ready story.</div>
        </div>
      </div>

      <nav className="flex flex-col">
        {SCREENS.map((s, i) => {
          const isActive = active === s.id
          const Icon = s.Icon
          return (
            <button
              key={s.id}
              onClick={() => onChange(s.id)}
              className={`group text-left flex items-center gap-3 py-3 px-1 transition-colors ${
                i > 0 ? 'border-t border-zinc-200/80' : ''
              }`}
            >
              <div
                className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                  isActive
                    ? 'bg-zinc-950 text-white'
                    : 'bg-zinc-100 text-zinc-500 group-hover:text-zinc-950'
                }`}
              >
                <Icon size={16} weight="regular" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10.5px] tabular-nums font-medium ${
                      isActive ? 'text-accent-dark' : 'text-zinc-400'
                    }`}
                    style={{ letterSpacing: '0.04em' }}
                  >
                    {s.n}
                  </span>
                  <span
                    className={`text-[14px] truncate ${
                      isActive ? 'text-zinc-950 font-semibold' : 'text-zinc-700 group-hover:text-zinc-950'
                    }`}
                    style={{ letterSpacing: '-0.018em' }}
                  >
                    {s.label}
                  </span>
                </div>
                <div className="text-[12px] text-zinc-400 truncate">{s.sub}</div>
              </div>
              {isActive && <span className="w-1 h-1 rounded-full bg-accent" />}
            </button>
          )
        })}
      </nav>

      <div className="mt-6 px-1 text-[12px] text-zinc-500 leading-relaxed">
        Five-tab bottom bar inside the phone: Home / Charge / Store / Wallet /
        Profile. Add Credit, KHQR Payment, and Station Detail are sub-flows
        accessed from those tabs.
      </div>
    </aside>
  )
}
