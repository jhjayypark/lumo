import { useState } from 'react'
import PhoneFrame from './components/PhoneFrame.jsx'
import ScreenSwitcher, { SCREENS } from './components/ScreenSwitcher.jsx'
import Logo from './components/Logo.jsx'

import HomeScreen from './screens/HomeScreen.jsx'
import MapScreen from './screens/MapScreen.jsx'
import StationDetailScreen from './screens/StationDetailScreen.jsx'
import ChargingScreen from './screens/ChargingScreen.jsx'
import StoreScreen from './screens/StoreScreen.jsx'
import CartScreen from './screens/CartScreen.jsx'
import RewardsScreen from './screens/RewardsScreen.jsx'
import ProfileScreen from './screens/ProfileScreen.jsx'

import { initialCart } from './data/mock.js'

export default function App() {
  const [screen, setScreen] = useState('home')
  const [cart, setCart] = useState(initialCart)

  const current = SCREENS.find((s) => s.id === screen) || SCREENS[0]
  const activeTab = current.tab
  const goto = (id) => setScreen(id)

  const onTabChange = (tab) => {
    const map = {
      home: 'home',
      charge: 'map',
      store: 'store',
      rewards: 'rewards',
      profile: 'profile',
    }
    setScreen(map[tab] || 'home')
  }

  const addToCart = (productId) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.productId === productId)
      if (existing) {
        return prev.map((p) =>
          p.productId === productId ? { ...p, qty: p.qty + 1 } : p,
        )
      }
      return [...prev, { productId, qty: 1 }]
    })
  }

  const setQty = (productId, qty) => {
    setCart((prev) => {
      if (qty <= 0) return prev.filter((p) => p.productId !== productId)
      return prev.map((p) => (p.productId === productId ? { ...p, qty } : p))
    })
  }

  const screenProps = { goto, cart, addToCart, setQty }
  const isDark = screen === 'charging'

  return (
    <div className="page-bg min-h-[100dvh] w-full">
      <div className="max-w-[1280px] mx-auto px-8 py-10">
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
            <Pill label="v0.5 · Taste" />
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
                {screen === 'cart' && <CartScreen {...screenProps} />}
                {screen === 'rewards' && <RewardsScreen {...screenProps} />}
                {screen === 'profile' && <ProfileScreen {...screenProps} />}
              </PhoneFrame>

            </div>
          </div>

          {/* Right rail — gallery-style notes */}
          <aside className="w-[260px] shrink-0 self-start sticky top-8 hidden xl:block">
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

              <div className="mt-7 pt-5 border-t border-zinc-200 grid grid-cols-2 gap-x-3 gap-y-3">
                <Chip name="Canvas" hex="#FAFAF9" />
                <Chip name="Surface" hex="#FFFFFF" />
                <Chip name="Ink" hex="#09090B" />
                <Chip name="Accent" hex="#34C759" />
              </div>

              <div className="mt-7 pt-5 border-t border-zinc-200 text-[12px] text-zinc-500 leading-relaxed">
                Geist · single accent · soft diffusion shadow · dividers over
                cards · Phosphor icons. No emojis, no gradients on type, no
                purple glow.
              </div>
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

function ScreenNotes({ id }) {
  const map = {
    home: (
      <p>
        Hero photo card with the nearest station. Two-column quick actions —
        not three. Active session strip uses a single thin progress line.
      </p>
    ),
    map: (
      <p>
        Stylised vector map with vibrancy chips. Nearby list is a single
        container with hairline dividers — no stacked cards.
      </p>
    ),
    station: (
      <p>
        Real photo hero, three-column stat row split by hairlines, divider-only
        amenity chips. Two CTAs: outline Reserve and filled Start Charging.
      </p>
    ),
    charging: (
      <p>
        Off-black canvas (zinc-950, never pure black). Single accent ring,
        divider-only stats. Suggestion card with capsule combo button.
      </p>
    ),
    store: (
      <p>
        Café-special hero is split-screen (image + text). Products use 2-column
        gallery with photo placeholders.
      </p>
    ),
    cart: (
      <p>
        Pickup method as segmented control. Items in a divided list. Sticky
        capsule pay button uses ink (not green) per single-accent rule.
      </p>
    ),
    rewards: (
      <p>
        Wallet pass with restrained green sweep. Activity in a divided list.
        Numbers are Geist Mono throughout.
      </p>
    ),
    profile: (
      <p>
        iOS Settings rhythm with coloured glyphs. Photo avatar via picsum
        placeholder. English / Khmer language toggle.
      </p>
    ),
  }
  return map[id] || null
}
