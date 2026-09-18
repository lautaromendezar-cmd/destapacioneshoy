import { env } from '@/lib/env'

/**
 * Mide los clicks en teléfono y WhatsApp para las conversiones de Google Ads.
 *
 * Dos decisiones acá, las dos por el mismo motivo: no perder conversiones.
 *
 * 1. UN listener delegado en el documento, no un onClick por botón. Así los
 *    botones siguen siendo Server Components (cero JS propio) y cualquier
 *    enlace nuevo con data-cta queda medido sin tocar este archivo.
 *
 * 2. Script inline, no un componente cliente con useEffect. Con useEffect el
 *    listener recién existe después de la hidratación, y el visitante de este
 *    sitio llega con una urgencia: es exactamente el que toca "Llamar" en el
 *    primer segundo, con el celular lento y la hidratación a medio camino.
 *    Esas llamadas —las mejores— no se medían. Inline, el listener está
 *    andando apenas el navegador parsea la etiqueta.
 *
 * Sin GTM ni Google Ads configurados no hace nada y no tira error.
 */
export function MedidorDeClicks() {
  const gads =
    env.gadsId && (env.gadsLabelLlamada || env.gadsLabelWhatsapp)
      ? {
          id: env.gadsId,
          llamada: env.gadsLabelLlamada,
          whatsapp: env.gadsLabelWhatsapp,
        }
      : null

  const script = `
(function () {
  var ADS = ${JSON.stringify(gads)};
  var EVENTOS = { llamada: 'click_llamada', whatsapp: 'click_whatsapp' };

  document.addEventListener('click', function (e) {
    var destino = e.target;
    if (!destino || !destino.closest) return;
    var enlace = destino.closest('[data-cta]');
    if (!enlace) return;

    var tipo = enlace.getAttribute('data-cta');
    if (tipo !== 'llamada' && tipo !== 'whatsapp') return;
    var ubicacion = enlace.getAttribute('data-ubicacion') || 'sin-ubicacion';

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: EVENTOS[tipo],
      ubicacion_boton: ubicacion,
      pagina: window.location.pathname
    });

    if (ADS && ADS[tipo] && typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', { send_to: ADS.id + '/' + ADS[tipo] });
    }
  }, true);
})();
`.trim()

  return <script dangerouslySetInnerHTML={{ __html: script }} />
}
