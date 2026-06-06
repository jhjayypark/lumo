import { fmtKHR, fmtUSD } from '../data/mock.js'

// Stylised KHQR payment card — the centerpiece of the KHQR Payment screen.
// Visual lineage: Bakong / NBC official KHQR cards — dark frame, red logo bar.
export default function KHQRPaymentCard({ session, amount }) {
  return (
    <div className="relative rounded-3xl overflow-hidden bg-white border border-zinc-200/80 shadow-diffuse-lg">
      {/* Red header bar — matches official KHQR cards */}
      <div
        className="px-4 py-2.5 flex items-center justify-between text-white"
        style={{
          background: 'linear-gradient(180deg, #E11E2C 0%, #B41020 100%)',
        }}
      >
        <div className="flex items-center gap-2">
          <KHQRMark />
          <span
            className="font-bold tracking-wide"
            style={{ fontSize: 14, letterSpacing: '0.04em' }}
          >
            KHQR
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] opacity-90">
          <span className="font-medium">Bakong</span>
          <span className="opacity-60">·</span>
          <span className="font-mono tabular-nums">{session.reference}</span>
        </div>
      </div>

      {/* QR area */}
      <div className="p-5">
        <div className="text-center">
          <div className="text-[11px] uppercase text-zinc-500 font-semibold" style={{ letterSpacing: '0.08em' }}>
            Pay to
          </div>
          <div
            className="font-semibold text-zinc-950 mt-1"
            style={{ fontSize: 17, letterSpacing: '-0.02em' }}
          >
            {session.merchant}
          </div>
          <div className="text-[12px] text-zinc-500 mt-0.5">{session.city} · {session.bakongId}</div>
        </div>

        {/* Stylised QR (SVG, not real QR) */}
        <div className="mt-4 mx-auto" style={{ width: 220, height: 220 }}>
          <FakeQR seed={session.reference} />
        </div>

        {/* Amount line */}
        <div className="mt-4 flex items-baseline justify-center gap-2.5">
          <span
            className="font-semibold text-zinc-950 tabular-nums leading-none"
            style={{ fontSize: 30, letterSpacing: '-0.03em' }}
          >
            {fmtKHR(amount)}
          </span>
          <span className="text-[13px] text-zinc-500 font-mono tabular-nums">
            ≈ {fmtUSD(amount)}
          </span>
        </div>
      </div>

      {/* Bottom strip — supported logos */}
      <div className="border-t border-zinc-200/80 px-4 py-2.5 flex items-center justify-center gap-2 bg-zinc-50/60">
        <span className="text-[10.5px] text-zinc-500 font-medium uppercase" style={{ letterSpacing: '0.06em' }}>
          Scan from
        </span>
        {['ABA', 'ACLEDA', 'WingBank', 'AMK', 'TrueMoney'].map((bank) => (
          <span
            key={bank}
            className="text-[10px] font-bold text-zinc-700 px-1.5 py-0.5 rounded-md bg-white border border-zinc-200"
            style={{ letterSpacing: '0.02em' }}
          >
            {bank}
          </span>
        ))}
      </div>
    </div>
  )
}

// Official KHQR-style mark
function KHQRMark() {
  return (
    <span
      className="w-6 h-6 rounded-md bg-white flex items-center justify-center"
      style={{ fontFamily: 'Geist, system-ui', color: '#E11E2C', fontWeight: 800, fontSize: 12 }}
    >
      ៛
    </span>
  )
}

// Deterministic pseudo-QR — looks plausibly like a QR code without being one.
function FakeQR({ seed }) {
  const size = 25 // 25x25 modules
  // Hash seed to a pseudo-random bool grid (deterministic).
  const cells = []
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0
  for (let i = 0; i < size * size; i++) {
    h = (h * 1664525 + 1013904223) >>> 0
    cells.push((h >> 8) & 1)
  }
  // Position finder squares at 3 corners.
  const isFinder = (x, y) => {
    const inSquare = (cx, cy) =>
      x >= cx && x < cx + 7 && y >= cy && y < cy + 7
    return inSquare(0, 0) || inSquare(size - 7, 0) || inSquare(0, size - 7)
  }
  const isFinderInner = (x, y) => {
    const inSquare = (cx, cy) =>
      x >= cx + 2 && x < cx + 5 && y >= cy + 2 && y < cy + 5
    return inSquare(0, 0) || inSquare(size - 7, 0) || inSquare(0, size - 7)
  }
  const isFinderRing = (x, y) => {
    const inRing = (cx, cy) =>
      (x === cx || x === cx + 6 || y === cy || y === cy + 6) &&
      x >= cx && x < cx + 7 && y >= cy && y < cy + 7
    return inRing(0, 0) || inRing(size - 7, 0) || inRing(0, size - 7)
  }
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
      <rect width={size} height={size} fill="#fff" />
      {Array.from({ length: size * size }).map((_, idx) => {
        const x = idx % size
        const y = Math.floor(idx / size)
        if (isFinder(x, y)) {
          if (isFinderRing(x, y) || isFinderInner(x, y)) {
            return <rect key={idx} x={x} y={y} width="1" height="1" fill="#0A0A0A" />
          }
          return null
        }
        if (cells[idx]) {
          return <rect key={idx} x={x + 0.08} y={y + 0.08} width="0.84" height="0.84" rx="0.18" fill="#0A0A0A" />
        }
        return null
      })}
      {/* Center logo mark — KHQR riel symbol */}
      <g>
        <rect
          x={size / 2 - 2.5}
          y={size / 2 - 2.5}
          width="5"
          height="5"
          rx="1.2"
          fill="#fff"
          stroke="#E11E2C"
          strokeWidth="0.4"
        />
        <text
          x={size / 2}
          y={size / 2 + 1.4}
          fontSize="3.6"
          textAnchor="middle"
          fontWeight="800"
          fill="#E11E2C"
        >
          ៛
        </text>
      </g>
    </svg>
  )
}
