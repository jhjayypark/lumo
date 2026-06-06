import { useState, createContext, useContext } from 'react'
import { createPortal } from 'react-dom'
import StatusBar from './StatusBar.jsx'
import BottomNav from './BottomNav.jsx'

// Context for sticky overlay portal target.
const StickyOverlayContext = createContext(null)

// Use inside a screen to render content pinned above the tab bar (non-scrolling).
//   <StickyBottom><button>Pay</button></StickyBottom>
export function StickyBottom({ children, offset = 88 }) {
  const target = useContext(StickyOverlayContext)
  if (!target) return null
  return createPortal(
    <div
      className="absolute left-3 right-3 z-20 pointer-events-auto"
      style={{ bottom: offset }}
    >
      {children}
    </div>,
    target,
  )
}

// iPhone 15 Pro Max — 430 x 932 pt logical display.
export default function PhoneFrame({
  children,
  activeTab,
  onTabChange,
  showNav = true,
  theme = 'light',
}) {
  const isDark = theme === 'dark'
  const [overlayEl, setOverlayEl] = useState(null)

  return (
    <div className="relative" style={{ width: 462, height: 944 }}>
      {/* Side buttons */}
      <SideButton side="left" top={148} height={30} />
      <SideButton side="left" top={210} height={62} />
      <SideButton side="left" top={282} height={62} />
      <SideButton side="right" top={232} height={102} />

      {/* Titanium frame */}
      <div
        className="absolute inset-0 rounded-[62px]"
        style={{
          background:
            'linear-gradient(125deg, #5A5A5D 0%, #2E2E30 18%, #46464A 38%, #2C2C2E 55%, #4D4D50 78%, #28282A 100%)',
          boxShadow: [
            '0 60px 120px -28px rgba(15,23,42,0.55)',
            '0 28px 60px -22px rgba(15,23,42,0.40)',
            '0 4px 10px rgba(15,23,42,0.18)',
            'inset 0 1.2px 0.5px rgba(255,255,255,0.32)',
            'inset 0 -1.5px 1px rgba(0,0,0,0.55)',
            'inset 1px 0 0 rgba(255,255,255,0.08)',
            'inset -1px 0 0 rgba(255,255,255,0.08)',
          ].join(', '),
        }}
      >
        <div
          className="absolute inset-0 rounded-[62px] pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 25%, transparent 75%, rgba(0,0,0,0.10) 100%)',
          }}
        />

        {/* Black bezel ring */}
        <div
          className="absolute rounded-[56px] bg-black"
          style={{
            top: 4,
            left: 4,
            right: 4,
            bottom: 4,
            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.05), 0 0 0 0.5px #050505',
          }}
        >
          {/* Display */}
          <div
            className="absolute rounded-[52px] overflow-hidden"
            style={{
              top: 8,
              left: 8,
              right: 8,
              bottom: 8,
              background: isDark ? '#000' : '#FAFAF9',
              boxShadow: 'inset 0 0 0 0.5px rgba(255,255,255,0.06)',
            }}
          >
            <div
              className={`relative w-full h-full overflow-hidden ${
                isDark ? 'bg-zinc-950 text-white' : 'bg-canvas text-zinc-950'
              }`}
            >
              <StatusBar dark={isDark} />

              {/* Scroll content (inside this is the screen's `animate-rise` etc.) */}
              <div
                className="absolute left-0 right-0 overflow-y-auto no-scrollbar"
                style={{ top: 0, bottom: showNav ? 73 : 0 }}
              >
                <StickyOverlayContext.Provider value={overlayEl}>
                  {children}
                </StickyOverlayContext.Provider>
              </div>

              {/* Sticky overlay layer — sibling of the scroll wrapper, so
                  absolute children pin to the visible viewport. */}
              <div
                ref={setOverlayEl}
                className="absolute left-0 right-0 pointer-events-none z-20"
                style={{ top: 0, bottom: showNav ? 73 : 0 }}
              />

              {/* Dynamic Island */}
              <div className="absolute top-[12px] left-1/2 -translate-x-1/2 z-40 pointer-events-none">
                <div
                  className="relative rounded-full bg-black flex items-center justify-between px-3"
                  style={{
                    width: 124,
                    height: 37,
                    boxShadow:
                      'inset 0 0 0 0.5px rgba(255,255,255,0.06), 0 1px 2px rgba(0,0,0,0.4)',
                  }}
                >
                  <span
                    className="rounded-full"
                    style={{
                      width: 7,
                      height: 7,
                      background:
                        'radial-gradient(circle at 35% 30%, #2A2A2C 0%, #0A0A0B 100%)',
                    }}
                  />
                  <span
                    className="relative rounded-full"
                    style={{
                      width: 12,
                      height: 12,
                      background:
                        'radial-gradient(circle at 35% 30%, #1F1F22 0%, #060607 75%)',
                      boxShadow: 'inset 0 0 0 0.5px rgba(255,255,255,0.10)',
                    }}
                  >
                    <span
                      className="absolute rounded-full"
                      style={{
                        width: 3,
                        height: 3,
                        top: 2,
                        left: 2.5,
                        background:
                          'radial-gradient(circle, rgba(120,160,255,0.55), rgba(80,120,200,0.10) 70%)',
                      }}
                    />
                  </span>
                </div>
              </div>

              {showNav && (
                <BottomNav active={activeTab} onChange={onTabChange} dark={isDark} />
              )}

              {/* Home indicator */}
              <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 z-40 pointer-events-none">
                <div
                  className={`h-[5px] rounded-full ${
                    isDark ? 'bg-white/80' : 'bg-zinc-950/80'
                  }`}
                  style={{ width: 134 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floor reflection */}
      <div
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          bottom: -18,
          width: 380,
          height: 28,
          background:
            'radial-gradient(ellipse at center, rgba(15,23,42,0.40) 0%, rgba(15,23,42,0.10) 45%, transparent 70%)',
          filter: 'blur(8px)',
        }}
      />
    </div>
  )
}

function SideButton({ side, top, height }) {
  const isLeft = side === 'left'
  return (
    <div
      className="absolute"
      style={{
        [isLeft ? 'left' : 'right']: -2.5,
        top,
        height,
        width: 3.5,
        borderRadius: isLeft ? '2px 0 0 2px' : '0 2px 2px 0',
        background: isLeft
          ? 'linear-gradient(90deg, #1A1A1C 0%, #3D3D40 60%, #2A2A2C 100%)'
          : 'linear-gradient(90deg, #2A2A2C 0%, #3D3D40 40%, #1A1A1C 100%)',
        boxShadow: [
          'inset 0 1px 0 rgba(255,255,255,0.18)',
          'inset 0 -1px 0 rgba(0,0,0,0.5)',
          isLeft ? '-1px 0 2px rgba(0,0,0,0.25)' : '1px 0 2px rgba(0,0,0,0.25)',
        ].join(', '),
      }}
    />
  )
}
