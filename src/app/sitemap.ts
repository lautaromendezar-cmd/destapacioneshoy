import type { MetadataRoute } from 'next'
import { servicios, zonas } from '@contenido'
import { absoluta, rutas } from '@/lib/rutas'

export default function sitemap(): MetadataRoute.Sitemap {
  const ahora = new Date()

  return [
    {
      url: absoluta(rutas.home),
      lastModified: ahora,
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...servicios.map((servicio) => ({
      url: absoluta(rutas.servicio(servicio.slug)),
      lastModified: ahora,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...zonas.map((zona) => ({
      url: absoluta(rutas.zona(zona.slug)),
      lastModified: ahora,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
