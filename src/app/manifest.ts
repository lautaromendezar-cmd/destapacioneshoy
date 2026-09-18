import type { MetadataRoute } from 'next'
import { sitio } from '@contenido'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${sitio.nombre} — Destapaciones 24 hs`,
    short_name: sitio.nombre,
    description: sitio.descripcionCorta,
    start_url: '/',
    display: 'browser',
    background_color: '#ffffff',
    theme_color: '#062f5e',
    lang: 'es-AR',
    icons: [
      { src: '/images/icono-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/images/icono-512.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
