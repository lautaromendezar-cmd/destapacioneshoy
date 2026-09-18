import { sitio } from '@contenido'
import type { UbicacionCta } from '@contenido'

/* ── Rutas internas ─────────────────────────────────────────────────────── */

export const rutas = {
  home: '/',
  servicio: (slug: string) => `/servicios/${slug}`,
  zona: (slug: string) => `/zonas/${slug}`,
} as const

/** URL absoluta, para canonical, sitemap y JSON-LD. */
export function absoluta(ruta: string): string {
  return new URL(ruta, sitio.url).toString()
}

/* ── Enlaces de contacto ────────────────────────────────────────────────── */

export const linkTelefono = `tel:${sitio.telefono.link}`

/**
 * Link de WhatsApp con el mensaje precargado.
 * Sin argumentos usa el mensaje genérico.
 */
export function linkWhatsapp(mensaje?: string): string {
  const texto = mensaje ?? sitio.whatsapp.mensajeGeneral
  return `https://wa.me/${sitio.whatsapp.numero}?text=${encodeURIComponent(texto)}`
}

/** "Hola, necesito una destapación urgente en Zona Norte." */
export function mensajeZona(nombreZona: string): string {
  return sitio.whatsapp.mensajePorZona.replace('{zona}', nombreZona)
}

/** "Hola, necesito destapación de cloacas. ¿Me pueden ayudar?" */
export function mensajeServicio(nombreServicio: string): string {
  return sitio.whatsapp.mensajePorServicio.replace(
    '{servicio}',
    nombreServicio.charAt(0).toLowerCase() + nombreServicio.slice(1),
  )
}

/* ── Atributos de medición ──────────────────────────────────────────────── */

/**
 * Los botones son <a> normales, sin onClick. La medición la hace un único
 * listener delegado (ver MedidorDeClicks) que lee estos data-attributes.
 * Un onClick por botón obliga a volver cliente media página y se pierde en
 * cuanto alguien agrega un enlace nuevo sin acordarse del handler.
 */
export function datosCta(tipo: 'llamada' | 'whatsapp', ubicacion: UbicacionCta) {
  return {
    'data-cta': tipo,
    'data-ubicacion': ubicacion,
  }
}
