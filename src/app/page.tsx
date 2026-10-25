import type { Metadata } from 'next'
import { Hero } from '@/components/secciones/Hero'
import { Servicios } from '@/components/secciones/Servicios'
import { VideoInspeccion } from '@/components/secciones/VideoInspeccion'
import { PorQueElegirnos } from '@/components/secciones/PorQueElegirnos'
import { Galeria } from '@/components/secciones/Galeria'
import { Zonas } from '@/components/secciones/Zonas'
import { Pasos } from '@/components/secciones/Pasos'
import { Faq } from '@/components/secciones/Faq'
import { CtaFinal } from '@/components/secciones/CtaFinal'
import { faqJsonLd, jsonLd } from '@/lib/jsonld'
import { metadataDe } from '@/lib/seo'

export const metadata: Metadata = {
  ...metadataDe({
    titulo: 'Destapaciones 24 hs en CABA y Provincia | Destapaciones HOY',
    descripcion:
      'Urgencias de destapaciones las 24 hs, los 365 días. Cloacas, cocinas, baños y pluviales con máquina, sin roturas y con garantía. CABA y Provincia. 11 3163-5383.',
    ruta: '/',
  }),
  // La home no lleva el sufijo del template: ya nombra la marca.
  title: 'Destapaciones 24 hs en CABA y Provincia | Destapaciones HOY',
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqJsonLd()) }}
      />

      <Hero />
      <Servicios />
      <VideoInspeccion />
      <PorQueElegirnos />
      <Galeria />
      <Zonas />
      <Pasos />
      <Faq />
      <CtaFinal />
    </>
  )
}
