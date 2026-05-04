// Lumo wordmark — Geist, tight tracking, restrained accent dot.
export default function Logo({ size = 22, dark = false }) {
  const color = dark ? '#FFFFFF' : '#09090B'
  return (
    <div className="flex items-baseline gap-[3px]">
      <span
        className="font-semibold leading-none"
        style={{ color, fontSize: size, letterSpacing: '-0.04em' }}
      >
        Lumo
      </span>
      <span
        style={{
          width: size * 0.18,
          height: size * 0.18,
          background: '#34C759',
          borderRadius: '999px',
          alignSelf: 'flex-end',
          marginBottom: size * 0.04,
        }}
      />
    </div>
  )
}
