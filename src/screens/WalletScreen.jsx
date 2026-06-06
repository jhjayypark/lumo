import {
  Plus,
  QrCode,
  ListBullets,
  Info,
  Gift,
} from '@phosphor-icons/react'
import {
  user,
  wallet,
  transactions,
  rewards,
  fmtKHR,
  fmtUSD,
} from '../data/mock.js'
import WalletCard from '../components/WalletCard.jsx'
import TransactionRow from '../components/TransactionRow.jsx'
import RewardCard from '../components/RewardCard.jsx'

export default function WalletScreen({ goto, balance }) {
  return (
    <div className="pt-[58px] pb-8 animate-rise">
      {/* Title */}
      <div className="px-5 pt-2">
        <h1
          className="font-semibold text-zinc-950 leading-none"
          style={{ fontSize: 30, letterSpacing: '-0.032em' }}
        >
          Wallet
        </h1>
      </div>

      {/* Hero Wallet card */}
      <div className="px-5 mt-5">
        <WalletCard
          balance={balance}
          tier={user.tier}
          points={user.points}
          plate={user.vehicle.plate}
          name={user.firstName}
        />
      </div>

      {/* Primary action row */}
      <div className="px-5 mt-3 grid grid-cols-3 gap-2">
        <ActionBtn Icon={Plus} label="Add Credit" onClick={() => goto('addcredit')} primary />
        <ActionBtn Icon={QrCode} label="Scan & Pay" onClick={() => goto('khqr')} />
        <ActionBtn Icon={ListBullets} label="Activity" onClick={() => {}} />
      </div>

      {/* Info card */}
      <div className="px-5 mt-5">
        <div className="rounded-3xl bg-white border border-zinc-200/80 shadow-diffuse p-4 flex items-start gap-3">
          <div className="w-9 h-9 rounded-2xl bg-zinc-100 text-zinc-700 flex items-center justify-center shrink-0 mt-0.5">
            <Info size={16} weight="regular" />
          </div>
          <div className="flex-1">
            <div
              className="font-semibold text-zinc-950"
              style={{ fontSize: 14.5, letterSpacing: '-0.018em' }}
            >
              How Lumo credit works
            </div>
            <div className="text-[12.5px] text-zinc-600 mt-1 leading-relaxed">
              Use Lumo credit for charging, snacks, drinks, and pickup orders.
              Top-up via KHQR, ABA, ACLEDA, card, or cash at any Lumo store.
            </div>
          </div>
        </div>
      </div>

      {/* Balance breakdown — divider grid */}
      <div className="px-5 mt-6">
        <div
          className="text-[10.5px] uppercase font-medium text-zinc-500 mb-3 px-1"
          style={{ letterSpacing: '0.06em' }}
        >
          Balance breakdown
        </div>
        <div className="bg-white border border-zinc-200/80 rounded-3xl shadow-diffuse grid grid-cols-3 divide-x divide-zinc-200/80">
          <Cell label="Available" value={fmtKHR(balance)} sub={fmtUSD(balance)} />
          <Cell label="Reserved" value={fmtKHR(wallet.reserved)} sub="held for charge" />
          <Cell label="Promo credit" value={fmtKHR(wallet.promo)} sub="welcome bonus" accent />
        </div>
      </div>

      {/* Activity */}
      <div className="mt-7">
        <div className="px-5 flex items-end justify-between mb-3">
          <div>
            <div className="text-[10.5px] uppercase font-medium text-zinc-500 mb-1 px-1" style={{ letterSpacing: '0.06em' }}>
              Recent activity
            </div>
            <h3 className="px-1 font-semibold text-zinc-950 leading-none" style={{ fontSize: 18, letterSpacing: '-0.022em' }}>
              This week
            </h3>
          </div>
          <button className="text-[13px] text-zinc-500 hover:text-zinc-950 press">All</button>
        </div>
        <div className="mx-5 bg-white border border-zinc-200/80 rounded-3xl shadow-diffuse divide-y divide-zinc-200/80">
          {transactions.slice(0, 6).map((tx) => (
            <TransactionRow key={tx.id} tx={tx} />
          ))}
        </div>
      </div>

      {/* Rewards section */}
      <div className="mt-7">
        <div className="px-5 flex items-end justify-between mb-3">
          <div>
            <div className="text-[10.5px] uppercase font-medium text-zinc-500 mb-1 px-1 flex items-center gap-1.5" style={{ letterSpacing: '0.06em' }}>
              <Gift size={11} weight="fill" className="text-accent-dark" />
              Rewards
            </div>
            <h3 className="px-1 font-semibold text-zinc-950 leading-none" style={{ fontSize: 18, letterSpacing: '-0.022em' }}>
              Redeem with points
            </h3>
          </div>
          <span className="font-mono tabular-nums text-[12.5px] text-zinc-500">
            {user.points} pts
          </span>
        </div>
        <div className="px-5 grid grid-cols-2 gap-2.5">
          {rewards.map((r) => (
            <RewardCard key={r.id} reward={r} canAfford={user.points >= r.cost} />
          ))}
        </div>
      </div>
    </div>
  )
}

function ActionBtn({ Icon, label, onClick, primary }) {
  return (
    <button
      onClick={onClick}
      className={`h-12 rounded-full font-semibold text-[13px] press flex items-center justify-center gap-1.5 ${
        primary
          ? 'bg-zinc-950 text-white'
          : 'bg-white border border-zinc-200 text-zinc-950 shadow-diffuse'
      }`}
    >
      <Icon size={14} weight={primary ? 'bold' : 'regular'} />
      {label}
    </button>
  )
}

function Cell({ label, value, sub, accent }) {
  return (
    <div className="px-3 py-4 text-center">
      <div
        className="text-[10.5px] uppercase text-zinc-500 font-medium"
        style={{ letterSpacing: '0.05em' }}
      >
        {label}
      </div>
      <div
        className={`font-semibold ${accent ? 'text-accent-dark' : 'text-zinc-950'} font-mono tabular-nums mt-1 leading-none`}
        style={{ fontSize: 16, letterSpacing: '-0.022em' }}
      >
        {value}
      </div>
      <div className="text-[10.5px] text-zinc-400 mt-1">{sub}</div>
    </div>
  )
}
