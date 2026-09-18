import { renderOg, TAMANO_OG } from '@/lib/og'
import { sitio } from '@contenido'

export const alt = `${sitio.nombre} — Destapaciones 24 hs en CABA y Provincia`
export const size = TAMANO_OG
export const contentType = 'image/png'

export default function Og() {
  return renderOg({
    titulo: 'Destapaciones 24 hs en CABA y Provincia',
    bajada: 'Cloacas · Cocinas y baños · Pluviales · Desagote de sótanos',
  })
}
