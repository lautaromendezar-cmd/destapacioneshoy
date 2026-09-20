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
]

/**
 * Mientras el sitio no esté aprobado y el dominio siga apuntando al WordPress
 * viejo, este deploy NO se indexa: duplicaría el sitio que está en vivo y
 * todavía hay datos sin confirmar con el cliente (garantía, costo de la
 * visita, plazos).
 *
 * PARA SALIR EN VIVO: poner esto en false y volver a publicar.
 */
const BLOQUEAR_INDEXACION = true

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
      ...(BLOQUEAR_INDEXACION
        ? [{
            source: '/:path*',
            headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
          }]
        : []),
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
