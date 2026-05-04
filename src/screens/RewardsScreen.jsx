import {
  Sparkle,
  Coffee,
  Lightning,
  Cookie,
  Hamburger,
  Gift,
} from '@phosphor-icons/react'
import { user, rewards, recentActivity } from '../data/mock.js'
import Logo from '../components/Logo.jsx'

const REWARD_ICONS = { Coffee, Zap: Lightning, Cookie, Sandwich: Hamburger }

export default function RewardsScreen({ goto }) {
  const progress = user.points / user.nextTierPoints

  return (
    <div className="pt-[58px] pb-8 animate-rise">
      <div className="px-5 pt-2 flex items-center justify-between">
        <h1 className="font-semibold text-zinc-950 leading-none" style={{ fontSize: 30, letterSpacing: '-0.032em' }}>
          Rewards
        </h1>
        <button className="w-9 h-9 rounded-full bg-white border border-zinc-200 flex items-center justify-center press shadow-diffuse">
          <Gift size={16} className="text-zinc-700" weight="regular" />
        </button>
      </div>

      {/* Wallet pass */}
      <div className="px-5 mt-6">
        <div
          className="relative rounded-3xl p-5 text-white overflow-hidden"
          style={{
            background: 'linear-gradient(150deg, #0F0F12 0%, #18181B 35%, #0E5E2A 80%, #34C759 130%)',
            aspectRatio: '1.585 / 1',
            boxShadow: '0 18px 36px -12px rgba(15,23,42,0.45), 0 4px 8px rgba(15,23,42,0.15)',
          }}
        >
          <div
            className="absolute -top-1/2 -left-1/4 w-[140%] h-[200%] pointer-events-none animate-shine"
            style={{
              background: 'linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)',
            }}
          />
          <div className="relative flex items-center justify-between">
            <Logo size={20} dark />
            <span className="text-[10.5px] uppercase opacity-65 font-medium" style={{ letterSpacing: '0.08em' }}>
              Member
            </span>
          </div>

          <div className="relative mt-6">
            <div className="text-[11px] uppercase font-semibold" style={{ letterSpacing: '0.08em', color: '#A8E8C0' }}>
              {user.tier}
            </div>
            <div className="font-semibold leading-none mt-2 tabular-nums font-mono" style={{ fontSize: 42, letterSpacing: '-0.04em' }}>
              {user.points.toLocaleString()}
              <span className="font-sans font-normal text-[13px] uppercase opacity-55 ml-2 align-middle tracking-widest">
                pts
              </span>
            </div>
          </div>

          <div className="relative mt-4">
            <div className="flex items-center justify-between text-[11px] opacity-75">
              <span className="uppercase font-medium" style={{ letterSpacing: '0.06em' }}>Next · Volt Platinum</span>
              <span className="font-mono tabular-nums">{user.points} / {user.nextTierPoints}</span>
            </div>
            <div className="mt-1.5 h-1 rounded-full bg-white/15 overflow-hidden">
              <div className="h-full rounded-full bg-accent" style={{ width: `${progress * 100}%` }} />
            </div>
          </div>

          <div className="relative mt-3 flex items-center justify-between text-[11px] opacity-65 font-mono">
            <span className="tracking-widest">{user.firstName.toUpperCase()} · {user.vehicle.plate}</span>
            <span>Member since 2024</span>
          </div>
        </div>
      </div>

      {/* Quick perks — 3 col allowed here as small chips, not card features */}
      <div className="px-5 mt-5 grid grid-cols-3 gap-2">
        <Perk label="Free coffee" sub="Today" />
        <Perk label="2× points" sub="On charge" highlight />
        <Perk label="Birthday treat" sub="In 12 d" />
      </div>

      {/* Redeem — 2-col masonry-feeling tiles */}
      <div className="px-5 mt-7">
        <div className="text-[10.5px] uppercase font-medium text-zinc-500 mb-3 px-1" style={{ letterSpacing: '0.06em' }}>Redeem with points</div>
        <div className="grid grid-cols-2 gap-2.5">
          {rewards.map((r) => {
            const Icon = REWARD_ICONS[r.icon] || Sparkle
            const can = user.points >= r.cost
            return (
              <div key={r.id} className="bg-surface border border-zinc-200/80 rounded-2.5xl shadow-diffuse p-3.5 flex flex-col">
                <div className="aspect-[1.5/1] rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-500">
                  <Icon size={26} weight="regular" />
                </div>
                <div className="mt-2.5 font-medium text-zinc-950 leading-snug flex-1" style={{ fontSize: 14.5, letterSpacing: '-0.018em' }}>
                  {r.title}
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-mono tabular-nums text-[12.5px] text-zinc-500">{r.cost} pts</span>
                  <button
                    disabled={!can}
                    className={`text-[12.5px] font-semibold px-3 py-1 rounded-full press transition-colors ${
                      can ? 'bg-zinc-950 text-white' : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
                    }`}
                  >
                    Redeem
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Activity — divided list */}
      <div className="px-5 mt-7">
        <div className="flex items-end justify-between mb-3 px-1">
          <div>
            <div className="text-[10.5px] uppercase font-medium text-zinc-500 mb-1" style={{ letterSpacing: '0.06em' }}>Recent activity</div>
            <h3 className="font-semibold text-zinc-950 leading-none" style={{ fontSize: 18, letterSpacing: '-0.022em' }}>This week</h3>
          </div>
          <button className="text-[13px] text-zinc-500 hover:text-zinc-950 press">History</button>
        </div>
        <div className="bg-surface border border-zinc-200/80 rounded-3xl shadow-diffuse divide-y divide-zinc-200/80">
          {recentActivity.map((a) => (
            <div key={a.id} className="flex items-center gap-3 p-3.5">
              <div className={`w-9 h-9 rounded-2xl flex items-center justify-center ${
                a.delta > 0 ? 'bg-accent-soft text-accent-ink' : 'bg-zinc-100 text-zinc-500'
              }`}>
                {a.delta > 0 ? <Sparkle size={15} weight="regular" /> : <Gift size={15} weight="regular" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-zinc-950 truncate" style={{ fontSize: 14.5, letterSpacing: '-0.018em' }}>
                  {a.label}
                </div>
                <div className="text-[12px] text-zinc-500">{a.when}</div>
              </div>
              <div className={`font-mono tabular-nums text-[14.5px] font-semibold ${
                a.delta > 0 ? 'text-accent-dark' : 'text-zinc-500'
              }`}>
                {a.delta > 0 ? '+' : ''}{a.delta}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Perk({ label, sub, highlight }) {
  return (
    <div className={`rounded-2.5xl p-3 text-center ${
      highlight ? 'bg-zinc-950 text-white' : 'bg-white border border-zinc-200'
    }`}>
      <div className="font-semibold leading-tight" style={{ fontSize: 12.5, letterSpacing: '-0.015em' }}>
        {label}
      </div>
      <div className={`text-[10.5px] mt-0.5 ${highlight ? 'opacity-65' : 'text-zinc-500'}`}>
        {sub}
      </div>
    </div>
  )
}
