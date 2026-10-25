/**
 * Lectura de variables de entorno públicas.
 *
 * Ojo: una variable DEFINIDA PERO VACÍA en Vercel no la atrapa `??` — sólo
 * atrapa `undefined`. Por eso todo pasa por `leer()`, que además recorta
 * espacios. Sin esto, una env vacía se cuela como string y rompe cosas
 * más adelante (un <Script src=""> o un new URL('')).
 */
function leer(valor: string | undefined): string | null {
  const limpio = (valor ?? '').trim()
  return limpio.length > 0 ? limpio : null
}

export const env = {
  /** ID de Google Tag Manager, ej. GTM-XXXXXXX */
  gtmId: leer(process.env.NEXT_PUBLIC_GTM_ID),

  /**
   * ID de medición de GA4, ej. G-XXXXXXXXXX. Sólo si NO se usa GTM. Viaja en
   * el mismo gtag.js que Google Ads: es un `config` más, no otro script.
   */
  ga4Id: leer(process.env.NEXT_PUBLIC_GA4_ID),

  /** ID de Google Ads, ej. AW-123456789. Sólo si NO se usa GTM. */
  gadsId: leer(process.env.NEXT_PUBLIC_GADS_ID),

  /** Labels de conversión de Google Ads, la parte después de la barra. */
  gadsLabelLlamada: leer(process.env.NEXT_PUBLIC_GADS_LABEL_LLAMADA),
  gadsLabelWhatsapp: leer(process.env.NEXT_PUBLIC_GADS_LABEL_WHATSAPP),

  /**
   * URL del sitio. En Vercel, las previews no tienen el dominio final: si no
   * está definida se usa el dominio de producción, que es el que tiene que ir
   * en los canonical de todas formas.
   */
  siteUrl: leer(process.env.NEXT_PUBLIC_SITE_URL) ?? 'https://destapacioneshoy.com.ar',
} as const

/** ¿Hay alguna medición configurada? Si no, el sitio anda igual, sin errores. */
export const hayMedicion = env.gtmId !== null || env.gadsId !== null || env.ga4Id !== null
