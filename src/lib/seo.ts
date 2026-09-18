import type { Metadata } from 'next'
import { sitio } from '@contenido'

/**
 * Arma la metadata de una página.
 *
 * Todo canonical sale absoluto contra sitio.url (no contra el dominio de la
 * preview de Vercel), que es lo que pide Google cuando el sitio ya está
 * indexado bajo su dominio.
 */
export function metadataDe({
  titulo,
  descripcion,
  ruta,
}: {
  titulo: string
  descripcion: string
  /** Ruta interna con barra inicial: '/', '/zonas/caba'. */
  ruta: string
}): Metadata {
  return {
    title: titulo,
    description: descripcion,
    alternates: { canonical: ruta },
    openGraph: {
      title: titulo,
      description: descripcion,
      url: ruta,
      siteName: sitio.nombre,
      locale: 'es_AR',
      type: 'website',
      // Sin `images` a propósito: así se usa el opengraph-image.tsx del
      // segmento, que es 1200x630 con el teléfono. Poner acá una foto del
      // servicio parecía mejor pero son verticales y WhatsApp las recorta.
    },
    twitter: {
      card: 'summary_large_image',
      title: titulo,
      description: descripcion,
    },
  }
}
