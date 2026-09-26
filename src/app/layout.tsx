import type { Metadata, Viewport } from 'next'
import { Inter, Inter_Tight } from 'next/font/google'
import './globals.css'

import { Encabezado } from '@/components/layout/Encabezado'
import { PieDePagina } from '@/components/layout/PieDePagina'
import { BarraFijaMobile, BotonFlotanteWhatsapp } from '@/components/layout/BarraFija'
import { Etiquetas, EtiquetasNoScript } from '@/components/medicion/Etiquetas'
import { MedidorDeClicks } from '@/components/medicion/MedidorDeClicks'
import { jsonLd, negocioJsonLd } from '@/lib/jsonld'
import { sitio } from '@contenido'

/**
 * Las dos tipografías del WordPress del cliente: Inter Tight en los títulos e
 * Inter en el cuerpo. Antes el sitio usaba Archivo, y era de lo que más hacía
 * que no reconociera su propia página — el dibujo de la 'a' y de la 'g' es
 * bien distinto al de Inter.
 *
 * Se sirven desde nuestro dominio: cero request a fonts.googleapis.com.
 */
const interTight = Inter_Tight({
  subsets: ['latin'],
  display: 'swap',
  variable: '--fuente-titulos',
  weight: ['600', '700'],
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--fuente-cuerpo',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL(sitio.url),
  title: {
    default: 'Destapaciones 24 hs en CABA y Provincia | Destapaciones HOY',
    // Las páginas internas ponen su propio título y este sufijo se agrega solo.
    template: `%s | ${sitio.nombre}`,
  },
  description:
    'Destapamos cloacas, cocinas, baños y pluviales con máquina, las 24 hs los 365 días. CABA y Provincia, sin roturas y con garantía.',
  applicationName: sitio.nombre,
  authors: [{ name: sitio.autor.nombre, url: sitio.autor.url }],
  creator: sitio.autor.nombre,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    siteName: sitio.nombre,
    url: '/',
  },
  twitter: { card: 'summary_large_image' },
  // Indexar es el comportamiento por defecto: declararlo acá agregaba un
  // <meta name="robots" content="index, follow"> que chocaba con el noindex
  // que Next pone solo en la 404. Queda únicamente lo que suma: que Google
  // pueda mostrar la foto grande en los resultados.
  robots: {
    googleBot: { 'max-image-preview': 'large' },
  },
  formatDetection: { telephone: true },
}

export const viewport: Viewport = {
  themeColor: '#062f5e',
  colorScheme: 'light',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="es-AR"
      className={`${inter.variable} ${interTight.variable} h-full`}
    >
      <body className="flex min-h-full flex-col antialiased">
        <EtiquetasNoScript />

        {/* Arriba de todo a propósito: el listener tiene que estar andando
            antes de que alguien llegue a tocar el botón de llamar. */}
        <MedidorDeClicks />

        {/* El negocio se declara una sola vez, en el layout: vale para todo
            el sitio y las páginas internas lo referencian por @id. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(negocioJsonLd()) }}
        />

        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
        >
          Ir al contenido
        </a>

        <Encabezado />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <PieDePagina />

        <BarraFijaMobile />
        <BotonFlotanteWhatsapp />

        <Etiquetas />
      </body>
    </html>
  )
}
