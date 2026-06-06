import { Coffee, Lightning, Cookie, Hamburger, Sparkle } from '@phosphor-icons/react'

const ICONS = { Coffee, Zap: Lightning, Cookie, Sandwich: Hamburger }

export default function RewardCard({ reward, canAfford, onRedeem }) {
  const Icon = ICONS[reward.icon] || Sparkle
  return (
    <div className="bg-white border border-zinc-200/80 rounded-3xl shadow-diffuse p-3.5 flex flex-col">
      <div className="aspect-[1.5/1] rounded-2xl bg-gradient-to-br from-zinc-100 to-zinc-50 flex items-center justify-center text-zinc-700">
        <Icon size={26} weight="regular" />
      </div>
      <div
        className="mt-2.5 font-semibold text-zinc-950 leading-snug flex-1"
        style={{ fontSize: 14.5, letterSpacing: '-0.018em' }}
      >
        {reward.title}
      </div>
      {reward.sub && (
        <div className="text-[11.5px] text-zinc-500 mt-0.5">{reward.sub}</div>
      )}
      <div className="mt-2 flex items-center justify-between">
        <span className="font-mono tabular-nums text-[12.5px] text-zinc-500">
          {reward.cost} pts
        </span>
        <button
          disabled={!canAfford}
          onClick={onRedeem}
          className={`text-[12.5px] font-semibold px-3 py-1 rounded-full press transition-colors ${
            canAfford
              ? 'bg-zinc-950 text-white'
              : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
          }`}
        >
          Redeem
        </button>
      </div>
    </div>
  )
}
