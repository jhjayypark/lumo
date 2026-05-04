import { CellSignalHigh, WifiHigh, BatteryHigh } from '@phosphor-icons/react'

export default function StatusBar({ dark = false }) {
  const color = dark ? 'text-white' : 'text-zinc-950'
  return (
    <div
      className={`absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-7 ${color}`}
      style={{ height: 54 }}
    >
      <div className="text-[15px] font-semibold tabular-nums" style={{ letterSpacing: '-0.02em' }}>
        9:41
      </div>
      <div className="flex items-center gap-1.5">
        <CellSignalHigh size={17} weight="fill" />
        <WifiHigh size={17} weight="fill" />
        <BatteryHigh size={24} weight="fill" />
      </div>
    </div>
  )
}
