import type { MetadataRoute } from 'next'
import { absoluta } from '@/lib/rutas'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      /**
       * Sin `disallow`, a propósito.
       *
       * Antes bloqueaba los restos de WordPress (/wp-admin, /wp-content/,
       * /feed, /?p=), que son exactamente las rutas que next.config.ts manda
       * a la home con un 301. Las dos cosas juntas se anulan: si el robots
       * prohíbe rastrear la URL, Google nunca llega a ver el redirect y la
       * deja como "indexada aunque bloqueada", sin pasarle nada a la home.
       *
       * En una migración lo que se quiere es lo contrario: que las rastree,
       * se coma el 301 y consolide todo en el sitio nuevo. Cuando termine de
       * hacerlo no van a quedar URLs que valga la pena bloquear.
       */
    },
    sitemap: absoluta('/sitemap.xml'),
    host: absoluta('/').replace(/\/$/, ''),
  }
}
