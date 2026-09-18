import { Check } from 'lucide-react'

/** Lista con viñeta de check. Se usa en síntomas, causas y resolución. */
export function ListaConCheck({
  items,
  tono = 'acento',
}: {
  items: string[]
  tono?: 'acento' | 'navy'
}) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <Check
            className={`mt-1 size-4.5 shrink-0 ${
              tono === 'acento' ? 'text-acento' : 'text-navy'
            }`}
            strokeWidth={3}
            aria-hidden="true"
          />
          <span className="leading-relaxed text-tinta-suave">{item}</span>
        </li>
      ))}
    </ul>
  )
}
