// iOS-accurate status bar.
// Hand-drawn SVG icons modelled on iOS 17/18 — signal bars, Wi-Fi fan, battery.
export default function StatusBar({ dark = false, batteryLevel = 0.86 }) {
  const fg = dark ? '#FFFFFF' : '#000000'
  return (
    <div
      className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between"
      style={{
        height: 54,
        // Pull side content past the dynamic island like real iOS:
        paddingLeft: 32,
        paddingRight: 26,
      }}
    >
      {/* Time */}
      <div
        className="tabular-nums select-none"
        style={{
          color: fg,
          fontSize: 17,
          fontWeight: 600,
          letterSpacing: '-0.02em',
          fontFeatureSettings: '"tnum"',
        }}
      >
        9:41
      </div>

      {/* Right cluster: signal · wifi · battery */}
      <div className="flex items-center" style={{ gap: 6 }}>
        <SignalIcon fg={fg} />
        <WifiIcon fg={fg} />
        <BatteryIcon fg={fg} level={batteryLevel} />
      </div>
    </div>
  )
}

// 4 vertical bars of ascending height — iOS cell signal.
function SignalIcon({ fg }) {
  return (
    <svg width="18" height="11" viewBox="0 0 18 11" fill={fg} aria-hidden="true">
      <rect x="0"  y="7" width="3" height="4"  rx="1" />
      <rect x="5"  y="5" width="3" height="6"  rx="1" />
      <rect x="10" y="2.5" width="3" height="8.5" rx="1" />
      <rect x="15" y="0" width="3" height="11" rx="1" />
    </svg>
  )
}

// Three nested arc segments + dot — iOS Wi-Fi.
function WifiIcon({ fg }) {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
      {/* Outer arc */}
      <path
        d="M 1 4.5 C 4 1.5, 12 1.5, 15 4.5"
        stroke={fg}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Middle arc */}
      <path
        d="M 3.7 7 C 5.6 5.3, 10.4 5.3, 12.3 7"
        stroke={fg}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Inner dot */}
      <circle cx="8" cy="10" r="1.4" fill={fg} />
    </svg>
  )
}

// Rounded capsule body + nub on right + inner fill bar — iOS battery.
function BatteryIcon({ fg, level = 0.86 }) {
  const w = 25
  const h = 12
  const bodyW = 22
  const bodyH = h
  const padding = 2
  const fillW = Math.max(2, (bodyW - padding * 2) * level)
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" aria-hidden="true">
      {/* Body outline */}
      <rect
        x="0.5"
        y="0.5"
        width={bodyW - 1}
        height={bodyH - 1}
        rx="3.2"
        ry="3.2"
        stroke={fg}
        strokeWidth="1"
        strokeOpacity="0.4"
      />
      {/* Nub */}
      <rect
        x={bodyW + 0.5}
        y={(h - 4) / 2}
        width="1.5"
        height="4"
        rx="0.8"
        ry="0.8"
        fill={fg}
        fillOpacity="0.4"
      />
      {/* Inner fill */}
      <rect
        x={padding}
        y={padding}
        width={fillW}
        height={bodyH - padding * 2}
        rx="1.6"
        ry="1.6"
        fill={fg}
      />
    </svg>
  )
}
