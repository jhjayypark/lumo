import { House, Lightning, ShoppingBag, Sparkle, User } from '@phosphor-icons/react'

export const TABS = [
  { id: 'home', label: 'Home', Icon: House },
  { id: 'charge', label: 'Charge', Icon: Lightning },
  { id: 'store', label: 'Store', Icon: ShoppingBag },
  { id: 'rewards', label: 'Rewards', Icon: Sparkle },
  { id: 'profile', label: 'Profile', Icon: User },
]

// Solid white, hairline top, 49pt — Apple-clean.
export default function BottomNav({ active = 'home', onChange = () => {}, dark = false }) {
  const bg = dark ? 'bg-zinc-950' : 'bg-white'
  const sep = dark ? 'shadow-[inset_0_0.5px_0_rgba(255,255,255,0.08)]' : 'hairline-t'
  return (
    <div
      className={`absolute bottom-0 left-0 right-0 z-30 ${bg} ${sep}`}
      style={{ paddingBottom: 24 }}
    >
      <div className="flex items-center justify-around px-1" style={{ height: 49 }}>
        {TABS.map(({ id, label, Icon }) => {
          const isActive = active === id
          const tint = isActive
            ? 'text-accent'
            : dark
            ? 'text-white/45'
            : 'text-zinc-400'
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              aria-label={label}
              aria-current={isActive ? 'page' : undefined}
              className="flex-1 h-full flex flex-col items-center justify-center press"
            >
              <Icon size={24} weight={isActive ? 'fill' : 'regular'} className={tint} />
              <span
                className={`mt-[2px] font-medium ${tint}`}
                style={{ fontSize: 10, lineHeight: '12px', letterSpacing: '-0.005em' }}
              >
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
