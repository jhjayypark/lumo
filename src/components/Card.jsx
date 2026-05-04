// The single card primitive — white surface, 1px slate border, soft diffusion shadow.
// Use sparingly per the skill (prefer dividers + spacing).
export default function Card({
  as: Tag = 'div',
  className = '',
  padded = true,
  diffuse = true,
  ...rest
}) {
  return (
    <Tag
      className={`bg-surface border border-zinc-200/80 rounded-3xl ${
        diffuse ? 'shadow-diffuse' : ''
      } ${padded ? 'p-5' : ''} ${className}`}
      {...rest}
    />
  )
}
