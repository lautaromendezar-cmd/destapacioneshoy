import type { MetadataRoute } from 'next'
import { absoluta } from '@/lib/rutas'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Restos de WordPress: si alguno quedó indexado, que no se rastree más.
      // El 301 a la home lo hace next.config.ts.
      disallow: ['/wp-admin', '/wp-login.php', '/wp-content/', '/feed', '/?p='],
    },
    sitemap: absoluta('/sitemap.xml'),
    host: absoluta('/').replace(/\/$/, ''),
  }
}
