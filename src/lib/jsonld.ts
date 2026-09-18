import { faqs, servicios, sitio, zonas } from '@contenido'
import type { Faq, Servicio, Zona } from '@contenido'
import { absoluta, rutas } from '@/lib/rutas'

/**
 * Datos estructurados schema.org.
 *
 * Regla que se respeta en todo el archivo: acá sólo va información que el
 * cliente declara y que además está visible en la página. Nada de
 * aggregateRating, priceRange ni foundingDate inventados — un rich snippet
 * con datos falsos es una penalización esperando a pasar.
 */

const ID_NEGOCIO = `${sitio.url}/#negocio`

/** Plumber es la subclase de LocalBusiness que corresponde a destapaciones. */
export function negocioJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Plumber',
    '@id': ID_NEGOCIO,
    name: sitio.nombre,
    description: sitio.descripcionCorta,
    url: sitio.url,
    telephone: sitio.telefono.e164,
    image: absoluta('/images/tecnico-destapando-con-maquina.webp'),
    logo: absoluta('/images/logo-destapaciones-hoy.png'),
    // Servicio a domicilio sin local al público: areaServed en vez de address.
    areaServed: [
      { '@type': 'City', name: 'Ciudad Autónoma de Buenos Aires' },
      { '@type': 'AdministrativeArea', name: 'Gran Buenos Aires' },
      ...zonas.map((zona) => ({
        '@type': 'AdministrativeArea' as const,
        name: `${zona.nombre}, Buenos Aires`,
      })),
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: sitio.telefono.e164,
      contactType: 'customer service',
      areaServed: 'AR',
      availableLanguage: 'Spanish',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Destapaciones y desagotes',
      itemListElement: servicios.map((servicio) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: servicio.nombre,
          url: absoluta(rutas.servicio(servicio.slug)),
        },
      })),
    },
  }
}

export function faqJsonLd(preguntas: Faq[] = faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: preguntas.map((faq) => ({
      '@type': 'Question',
      name: faq.pregunta,
      acceptedAnswer: { '@type': 'Answer', text: faq.respuesta },
    })),
  }
}

export function servicioJsonLd(servicio: Servicio) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: servicio.nombre,
    description: servicio.metaDescription,
    url: absoluta(rutas.servicio(servicio.slug)),
    serviceType: servicio.nombre,
    provider: { '@id': ID_NEGOCIO },
    areaServed: zonas.map((zona) => ({
      '@type': 'AdministrativeArea' as const,
      name: zona.nombre,
    })),
    availableChannel: {
      '@type': 'ServiceChannel',
      servicePhone: {
        '@type': 'ContactPoint',
        telephone: sitio.telefono.e164,
      },
      serviceUrl: absoluta(rutas.servicio(servicio.slug)),
    },
  }
}

export function zonaJsonLd(zona: Zona) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Destapaciones en ${zona.nombre}`,
    description: zona.metaDescription,
    url: absoluta(rutas.zona(zona.slug)),
    provider: { '@id': ID_NEGOCIO },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: zona.nombre,
      containsPlace: zona.localidades.map((localidad) => ({
        '@type': 'Place' as const,
        name: localidad,
      })),
    },
  }
}

export function migasJsonLd(items: { nombre: string; ruta: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, indice) => ({
      '@type': 'ListItem',
      position: indice + 1,
      name: item.nombre,
      item: absoluta(item.ruta),
    })),
  }
}

/** Serializa para el <script type="application/ld+json">. */
export function jsonLd(dato: object) {
  // `<` escapado: evita que una comilla en el contenido cierre el <script>.
  return JSON.stringify(dato).replace(/</g, '\\u003c')
}
