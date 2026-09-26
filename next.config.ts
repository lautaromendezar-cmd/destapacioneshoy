import type { NextConfig } from 'next'

/**
 * El sitio anterior era WordPress. Todo lo que Google pueda tener indexado de
 * esa época se manda a la home con un 301, para no regalar el poco link juice
 * que haya y, sobre todo, para no servir 404 a alguien que llegó buscando.
 *
 * `permanent: true` = 308 (el equivalente moderno del 301, que además preserva
 * el método). Los buscadores lo tratan igual que un 301.
 */
const rutasViejasDeWordPress = [
  '/feed',
  '/feed/:path*',
  '/comments/feed',
  '/comments/feed/:path*',
  '/wp-admin',
  '/wp-admin/:path*',
  '/wp-login.php',
  '/wp-json',
  '/wp-json/:path*',
  '/xmlrpc.php',
  '/sample-page',
  '/hello-world',
  '/author/:path*',
  '/category/:path*',
  '/tag/:path*',
  '/2025/:path*',
  '/2026/:path*',
  '/index.php',
  '/index.php/:path*',
  // Las fotos del WordPress vivían acá y algunas están en Google Imágenes.
  // El sitio nuevo sirve las suyas desde /images: esto evita el 404.
  '/wp-content/:path*',
  '/wp-includes/:path*',
]

/**
 * El sitio se indexa SÓLO en el dominio propio.
 *
 * Antes esto era un booleano que había que dar vuelta a mano el día de la
 * mudanza. El problema es que el mismo contenido se sirve en tres lados —
 * destapacioneshoy.com.ar, destapacioneshoy.vercel.app y la URL de cada
 * deploy— y sacar el bloqueo global dejaba a los .vercel.app compitiendo
 * contra el sitio real en Google, que es el duplicado clásico de una
 * migración.
 *
 * Con la regla por host no hay que tocar nada el día del cambio: mientras el
 * DNS siga en el WordPress, nadie ve esta versión bajo el dominio y todo lo
 * que se sirve va con noindex; cuando el dominio apunte acá, el .com.ar pasa
 * a indexarse solo y los .vercel.app siguen bloqueados para siempre.
 */
const DOMINIO_PUBLICO = '(www\.)?destapacioneshoy\.com\.ar'

const nextConfig: NextConfig = {
  poweredByHeader: false,

  images: {
    // Las fotos ya están convertidas a WebP en /public/images. AVIF además
    // baja bastante en fotos de celular, que son todas las de la galería.
    formats: ['image/avif', 'image/webp'],
  },

  async redirects() {
    return [
      ...rutasViejasDeWordPress.map((source) => ({
        source,
        destination: '/',
        permanent: true,
      })),

      // Los permalinks por ID (?p=27) no se pueden matchear por `source`:
      // van por query. Es la URL que WordPress usa antes de configurar los
      // enlaces permanentes, así que puede estar indexada.
      {
        source: '/',
        has: [{ type: 'query' as const, key: 'p' }],
        destination: '/',
        permanent: true,
      },
      {
        source: '/',
        has: [{ type: 'query' as const, key: 'page_id' }],
        destination: '/',
        permanent: true,
      },
    ]
  },

  async headers() {
    return [
      {
        source: '/:path*',
        missing: [{ type: 'host' as const, value: DOMINIO_PUBLICO }],
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
      {
        // Las imágenes tienen nombre fijo y no cambian: cachearlas fuerte.
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

export default nextConfig
