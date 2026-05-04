import StatusBar from './StatusBar.jsx'
import BottomNav from './BottomNav.jsx'

// iPhone 15 Pro Max — 430 x 932 pt logical display.
// Layered: titanium frame → black bezel ring → display.
export default function PhoneFrame({
  children,
  activeTab,
  onTabChange,
  showNav = true,
  theme = 'light',
}) {
  const isDark = theme === 'dark'

  return (
    <div className="relative" style={{ width: 462, height: 944 }}>
      {/* ─────────── Side buttons (left = action + volume, right = power) ─────────── */}
      <SideButton side="left" top={148} height={30} />     {/* Action */}
      <SideButton side="left" top={210} height={62} />     {/* Volume up */}
      <SideButton side="left" top={282} height={62} />     {/* Volume down */}
      <SideButton side="right" top={232} height={102} />   {/* Power */}

      {/* ─────────── Outer titanium frame ─────────── */}
      <div
        className="absolute inset-0 rounded-[62px]"
        style={{
          background:
            'linear-gradient(125deg, #5A5A5D 0%, #2E2E30 18%, #46464A 38%, #2C2C2E 55%, #4D4D50 78%, #28282A 100%)',
          boxShadow: [
            // ambient drop
            '0 60px 120px -28px rgba(15,23,42,0.55)',
            '0 28px 60px -22px rgba(15,23,42,0.40)',
            // contact shadow (closer)
            '0 4px 10px rgba(15,23,42,0.18)',
            // inner highlight on top edge
            'inset 0 1.2px 0.5px rgba(255,255,255,0.32)',
            // inner shadow on bottom
            'inset 0 -1.5px 1px rgba(0,0,0,0.55)',
            // very subtle side highlights
            'inset 1px 0 0 rgba(255,255,255,0.08)',
            'inset -1px 0 0 rgba(255,255,255,0.08)',
          ].join(', '),
        }}
      >
        {/* faint vertical sheen */}
        <div
          className="absolute inset-0 rounded-[62px] pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 25%, transparent 75%, rgba(0,0,0,0.10) 100%)',
          }}
        />

        {/* ─────────── Black bezel ring ─────────── */}
        <div
          className="absolute rounded-[56px] bg-black"
          style={{
            top: 4,
            left: 4,
            right: 4,
            bottom: 4,
            boxShadow:
              'inset 0 0 0 1px rgba(255,255,255,0.05), 0 0 0 0.5px #050505',
          }}
        >
          {/* ─────────── Display ─────────── */}
          <div
            className="absolute rounded-[52px] overflow-hidden"
            style={{
              top: 8,
              left: 8,
              right: 8,
              bottom: 8,
              background: isDark ? '#000' : '#FAFAF9',
              boxShadow:
                'inset 0 0 0 0.5px rgba(255,255,255,0.06)',
            }}
          >
            <div
              className={`relative w-full h-full overflow-hidden ${
                isDark ? 'bg-zinc-950 text-white' : 'bg-canvas text-zinc-950'
              }`}
            >
              <StatusBar dark={isDark} />

              {/* App content (scrollable) */}
              <div
                className="absolute left-0 right-0 overflow-y-auto no-scrollbar"
                style={{ top: 0, bottom: showNav ? 73 : 0 }}
              >
                {children}
              </div>

              {/* ─── Dynamic Island ─── */}
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
                  {/* TrueDepth proximity sensor (subtle, left of camera) */}
                  <span
                    className="rounded-full"
                    style={{
                      width: 7,
                      height: 7,
                      background:
                        'radial-gradient(circle at 35% 30%, #2A2A2C 0%, #0A0A0B 100%)',
                    }}
                  />
                  {/* Front camera (right) — visible lens with glint */}
                  <span
                    className="relative rounded-full"
                    style={{
                      width: 12,
                      height: 12,
                      background:
                        'radial-gradient(circle at 35% 30%, #1F1F22 0%, #060607 75%)',
                      boxShadow:
                        'inset 0 0 0 0.5px rgba(255,255,255,0.10)',
                    }}
                  >
                    {/* lens glint */}
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
                    isDark ? 'bg-white/85' : 'bg-zinc-950/85'
                  }`}
                  style={{ width: 134 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────── Floor reflection ─────────── */}
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

// Each side button: extruded look — top highlight + inset shadow + subtle bevel.
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
          // top highlight
          'inset 0 1px 0 rgba(255,255,255,0.18)',
          // bottom shadow
          'inset 0 -1px 0 rgba(0,0,0,0.5)',
          // tiny outer ambient
          isLeft
            ? '-1px 0 2px rgba(0,0,0,0.25)'
            : '1px 0 2px rgba(0,0,0,0.25)',
        ].join(', '),
      }}
    />
  )
}
