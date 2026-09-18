import { renderOg, TAMANO_OG } from '@/lib/og'
import { zonas } from '@contenido'

export const size = TAMANO_OG
export const contentType = 'image/png'
export const alt = 'Destapaciones HOY'

/** Una tarjeta por zona, generada en el build. */
export function generateStaticParams() {
  return zonas.map((zona) => ({ slug: zona.slug }))
}

export default async function Og({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const zona = zonas.find((z) => z.slug === slug)

  return renderOg({
    titulo: zona ? `Destapaciones 24 hs en ${zona.nombre}` : 'Destapaciones 24 hs',
    bajada: zona
      ? zona.localidades.slice(0, 5).join(' · ')
      : 'CABA y Provincia de Buenos Aires',
  })
}
