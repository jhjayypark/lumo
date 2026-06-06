import { useState } from 'react'
import PhoneFrame from './components/PhoneFrame.jsx'
import ScreenSwitcher, { SCREENS } from './components/ScreenSwitcher.jsx'
import Logo from './components/Logo.jsx'

import HomeScreen from './screens/HomeScreen.jsx'
import MapScreen from './screens/MapScreen.jsx'
import StationDetailScreen from './screens/StationDetailScreen.jsx'
import ChargingScreen from './screens/ChargingScreen.jsx'
import StoreScreen from './screens/StoreScreen.jsx'
import WalletScreen from './screens/WalletScreen.jsx'
import AddCreditScreen from './screens/AddCreditScreen.jsx'
import KHQRPaymentScreen from './screens/KHQRPaymentScreen.jsx'
import ProfileScreen from './screens/ProfileScreen.jsx'

import { initialCart, wallet, fmtKHR } from './data/mock.js'

export default function App() {
  // ─── Cross-screen state ───
  const [screen, setScreen] = useState('home')

  // Wallet
  const [balance, setBalance] = useState(wallet.available)
  const [topupAmount, setTopupAmount] = useState(40000)
  const [paymentMethod, setPaymentMethod] = useState('khqr')

  // KHQR payment state machine
  const [paymentStatus, setPaymentStatus] = useState('pending') // pending | success | expired

  // Station detail charge option
  const [chargeOption, setChargeOption] = useState('to80')

  // Store / cart / order
  const [cart, setCart] = useState(initialCart)
  const [orderStage, setOrderStage] = useState('idle') // idle | Received | Preparing | Ready | Delivered

  // Charging session — controls Home hero between "live session" vs "nearest station".
  const [isCharging, setIsCharging] = useState(true)

  // ─── Derived ───
  const current = SCREENS.find((s) => s.id === screen) || SCREENS[0]
  const activeTab = current.tab
  const goto = (id) => setScreen(id)

  const onTabChange = (tab) => {
    const map = {
      home: 'home',
      charge: 'map',
      store: 'store',
      wallet: 'wallet',
      profile: 'profile',
    }
    setScreen(map[tab] || 'home')
  }

  const addToCart = (productId) =>
    setCart((prev) => {
      const found = prev.find((p) => p.productId === productId)
      if (found) {
        return prev.map((p) =>
          p.productId === productId ? { ...p, qty: p.qty + 1 } : p,
        )
      }
      return [...prev, { productId, qty: 1 }]
    })

  const setQty = (productId, qty) =>
    setCart((prev) => {
      if (qty <= 0) return prev.filter((p) => p.productId !== productId)
      return prev.map((p) => (p.productId === productId ? { ...p, qty } : p))
    })

  const applyTopup = () => setBalance((b) => b + topupAmount)

  const screenProps = {
    goto,
    balance,
    cart,
    addToCart,
    setQty,
    orderStage,
    setOrderStage,
    amount: topupAmount,
    setAmount: setTopupAmount,
    method: paymentMethod,
    setMethod: setPaymentMethod,
    status: paymentStatus,
    setStatus: setPaymentStatus,
    applyTopup,
    chargeOption,
    setChargeOption,
    isCharging,
  }
  const isDark = screen === 'charging'

  return (
    <div className="page-bg min-h-[100dvh] w-full">
      <div className="max-w-[1320px] mx-auto px-8 py-10">
        {/* Header */}
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <Logo size={26} />
            <div className="hidden md:block h-6 w-px bg-zinc-300" />
            <div className="hidden md:block">
              <div
                className="text-[10.5px] uppercase text-zinc-500 font-medium"
                style={{ letterSpacing: '0.08em' }}
              >
                Charge. Grab. Go.
              </div>
              <div
                className="text-[13px] text-zinc-700 -mt-0.5"
                style={{ letterSpacing: '-0.005em' }}
              >
                Cambodia's first EV-charging convenience network
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Pill label="Prototype" />
            <Pill label="iPhone 15 Pro Max" mono />
            <Pill label="v0.6 · Lumo Wallet + KHQR" />
          </div>
        </header>

        <div className="flex gap-12 items-start">
          <ScreenSwitcher active={screen} onChange={setScreen} />

          {/* Phone */}
          <div className="flex-1 flex justify-center">
            <div className="relative">
              <PhoneFrame
                activeTab={activeTab}
                onTabChange={onTabChange}
                showNav={screen !== 'charging'}
                theme={isDark ? 'dark' : 'light'}
              >
                {screen === 'home' && <HomeScreen {...screenProps} />}
                {screen === 'map' && <MapScreen {...screenProps} />}
                {screen === 'station' && <StationDetailScreen {...screenProps} />}
                {screen === 'charging' && <ChargingScreen {...screenProps} />}
                {screen === 'store' && <StoreScreen {...screenProps} />}
                {screen === 'wallet' && <WalletScreen {...screenProps} />}
                {screen === 'addcredit' && <AddCreditScreen {...screenProps} />}
                {screen === 'khqr' && <KHQRPaymentScreen {...screenProps} />}
                {screen === 'profile' && <ProfileScreen {...screenProps} />}
              </PhoneFrame>
            </div>
          </div>

          {/* Right rail — demo notes + state controls */}
          <aside className="w-[280px] shrink-0 self-start sticky top-8 hidden xl:block">
            <div className="px-1">
              <div
                className="text-[10.5px] uppercase text-zinc-500 font-medium"
                style={{ letterSpacing: '0.08em' }}
              >
                Now showing
              </div>
              <div
                className="font-semibold text-zinc-950 leading-tight mt-1.5"
                style={{ fontSize: 22, letterSpacing: '-0.026em' }}
              >
                {current.label}
              </div>
              <div className="text-[13px] text-zinc-500 mt-0.5">
                {current.sub}
              </div>

              <div className="mt-5 space-y-3 text-[13px] text-zinc-600 leading-relaxed">
                <ScreenNotes id={screen} />
              </div>
            </div>

            {/* Demo controls panel */}
            <div className="mt-7 pt-5 border-t border-zinc-200 space-y-4 px-1">
              <div
                className="text-[10.5px] uppercase text-zinc-500 font-medium"
                style={{ letterSpacing: '0.08em' }}
              >
                Demo controls
              </div>

              {/* Charging state — affects Home hero */}
              {screen === 'home' && (
                <div>
                  <div className="text-[12px] text-zinc-600 mb-1.5">Charging session</div>
                  <div className="flex gap-1.5">
                    <Btn active={isCharging} onClick={() => setIsCharging(true)}>Live</Btn>
                    <Btn active={!isCharging} onClick={() => setIsCharging(false)}>Idle</Btn>
                  </div>
                </div>
              )}

              {/* Wallet balance state */}
              <div>
                <div className="text-[12px] text-zinc-600 mb-1.5 flex items-center justify-between">
                  <span>Wallet balance</span>
                  <span className="font-mono tabular-nums text-zinc-950 font-semibold">{fmtKHR(balance)}</span>
                </div>
                <div className="flex gap-1.5">
                  <Btn onClick={() => setBalance(15000)}>Low</Btn>
                  <Btn onClick={() => setBalance(76500)}>Default</Btn>
                  <Btn onClick={() => setBalance(200000)}>High</Btn>
                </div>
              </div>

              {/* KHQR payment state */}
              {screen === 'khqr' && (
                <div>
                  <div className="text-[12px] text-zinc-600 mb-1.5">KHQR payment</div>
                  <div className="flex gap-1.5">
                    <Btn active={paymentStatus === 'pending'} onClick={() => setPaymentStatus('pending')}>Pending</Btn>
                    <Btn active={paymentStatus === 'success'} onClick={() => setPaymentStatus('success')}>Success</Btn>
                    <Btn active={paymentStatus === 'expired'} onClick={() => setPaymentStatus('expired')}>Expired</Btn>
                  </div>
                </div>
              )}

              {/* Order stage state */}
              {screen === 'store' && (
                <div>
                  <div className="text-[12px] text-zinc-600 mb-1.5">Order status</div>
                  <div className="flex gap-1.5 flex-wrap">
                    <Btn active={orderStage === 'idle'} onClick={() => setOrderStage('idle')}>Idle</Btn>
                    <Btn active={orderStage === 'Received'} onClick={() => setOrderStage('Received')}>Received</Btn>
                    <Btn active={orderStage === 'Preparing'} onClick={() => setOrderStage('Preparing')}>Preparing</Btn>
                    <Btn active={orderStage === 'Ready'} onClick={() => setOrderStage('Ready')}>Ready</Btn>
                    <Btn active={orderStage === 'Delivered'} onClick={() => setOrderStage('Delivered')}>Delivered</Btn>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-7 pt-5 border-t border-zinc-200 grid grid-cols-2 gap-x-3 gap-y-3 px-1">
              <Chip name="Canvas" hex="#FAFAF9" />
              <Chip name="Surface" hex="#FFFFFF" />
              <Chip name="Ink" hex="#09090B" />
              <Chip name="Accent" hex="#34C759" />
            </div>

            <div className="mt-5 px-1 text-[12px] text-zinc-500 leading-relaxed">
              Frontend-only prototype. Wallet, KHQR, charging hold, and order
              status are mocked locally in React state. Switch any state above.
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

function Pill({ label, mono = false }) {
  return (
    <div
      className={`text-[12px] px-3 py-1.5 rounded-full bg-white border border-zinc-200 text-zinc-700 ${
        mono ? 'font-mono tabular-nums' : ''
      }`}
    >
      {label}
    </div>
  )
}

function Chip({ name, hex }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="w-5 h-5 rounded-md"
        style={{
          background: hex,
          boxShadow: 'inset 0 0 0 0.5px rgba(15,23,42,0.12)',
        }}
      />
      <div className="leading-tight">
        <div className="text-[12px] font-medium text-zinc-950">{name}</div>
        <div className="text-[10px] text-zinc-500 font-mono">{hex}</div>
      </div>
    </div>
  )
}

function Btn({ children, onClick, active }) {
  return (
    <button
      onClick={onClick}
      className={`text-[11.5px] font-semibold px-2.5 py-1.5 rounded-full press transition-colors ${
        active
          ? 'bg-zinc-950 text-white'
          : 'bg-white text-zinc-700 border border-zinc-200 hover:border-zinc-400'
      }`}
    >
      {children}
    </button>
  )
}

function ScreenNotes({ id }) {
  const map = {
    home: (
      <p>
        Charging-first. If a session is live, the hero is the live charging
        card with circular progress. Otherwise the nearest Lumo station leads.
        Wallet sits inside the quick actions, not the hero. Low balance
        triggers a single banner alert.
      </p>
    ),
    wallet: (
      <p>
        Apple Wallet-pass card, then balance breakdown (available, reserved,
        promo), recent activity, and the rewards catalog all on one screen.
      </p>
    ),
    addcredit: (
      <p>
        Amount presets in KHR with live USD equivalent. KHQR sits at the top
        of the method list with the "Most popular in Cambodia" badge.
      </p>
    ),
    khqr: (
      <p>
        Real KHQR card lineage — red Bakong header, Lumo merchant line, fake
        QR with finder squares and centered ៛ logo. Use the demo controls to
        switch Pending / Success / Expired.
      </p>
    ),
    map: (
      <p>
        Balance chip top-right keeps wallet context. KHQR filter is one chip.
        Nearby list lives inside a single bordered container with dividers.
      </p>
    ),
    station: (
      <p>
        Wallet hold card explains the temporary deposit. Charging options swap
        the estimated hold inline. CTA shows the hold amount on the button.
      </p>
    ),
    charging: (
      <p>
        Dark canvas. Wallet hold card splits Reserved / Used / Return — the
        signature "you only pay for what you use" moment. Drop balance below
        ៛24,000 to trigger the low-balance warning.
      </p>
    ),
    store: (
      <p>
        Browse + cart + pickup + wallet payment in one scrollable screen. Tap
        the cart pill to expand. Toggle Order status above to see the stepper.
      </p>
    ),
    profile: (
      <p>
        Vehicle pass, wallet toggles (auto top-up, low-balance alert), full
        Cambodia-local payment methods, and EN / Khmer toggle.
      </p>
    ),
  }
  return map[id] || null
}
