import { TildeCirculo } from '@/components/ui/Icono'

/**
 * Lista con viñeta de tilde. Se usa en síntomas, causas y resolución.
 *
 * La viñeta es el tilde dentro de un círculo relleno con el que el cliente
 * listaba todo en su WordPress: es su marca de agua en las páginas interiores
 * igual que el hero lo es en la home.
 */
export function ListaConCheck({
  items,
  tono = 'tilde',
}: {
  items: string[]
  tono?: 'tilde' | 'acento' | 'navy'
}) {
  const color =
    tono === 'acento'
      ? 'text-acento'
      : tono === 'navy'
        ? 'text-navy'
        : 'text-tilde'

  return (
    <ul className="mt-5 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <TildeCirculo className={`mt-1 size-4.5 ${color}`} />
          <span className="leading-relaxed text-tinta-suave">{item}</span>
        </li>
      ))}
    </ul>
  )
}
