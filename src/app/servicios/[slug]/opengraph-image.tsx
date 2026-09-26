import { renderOg, TAMANO_OG } from '@/lib/og'
import { servicios } from '@contenido'

export const size = TAMANO_OG
export const contentType = 'image/png'
export const alt = 'Destapaciones HOY'

/** Una tarjeta por servicio, generada en el build. */
export function generateStaticParams() {
  return servicios.map((servicio) => ({ slug: servicio.slug }))
}

export default async function Og({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const servicio = servicios.find((s) => s.slug === slug)

  return renderOg({
    titulo: servicio?.nombre ?? 'Destapaciones 24 hs',
    bajada: servicio
      ? (servicio.ogBajada ?? 'Con máquina, sin roturas · CABA y Provincia · 24 hs')
      : 'CABA y Provincia · 24 hs',
  })
}
