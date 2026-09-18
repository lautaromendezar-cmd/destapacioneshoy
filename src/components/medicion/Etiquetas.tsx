import Script from 'next/script'
import { env } from '@/lib/env'

/**
 * Google Tag Manager y, opcionalmente, gtag directo de Google Ads.
 *
 * Las dos vías son independientes y ninguna es obligatoria: si no hay ninguna
 * variable de entorno, no se inyecta un solo byte de script y el sitio anda
 * exactamente igual.
 *
 *   NEXT_PUBLIC_GTM_ID              GTM-XXXXXXX
 *   NEXT_PUBLIC_GADS_ID             AW-123456789      (sólo si no se usa GTM)
 *   NEXT_PUBLIC_GADS_LABEL_LLAMADA  AbCdEfGh1234
 *   NEXT_PUBLIC_GADS_LABEL_WHATSAPP IjKlMnOp5678
 *
 * `afterInteractive` deja que la página pinte primero: la etiqueta no entra
 * en el camino crítico del LCP.
 */
export function Etiquetas() {
  return (
    <>
      {env.gtmId && (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${env.gtmId}');`}
        </Script>
      )}

      {!env.gtmId && env.gadsId && (
        <>
          <Script
            id="gtag-src"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${env.gadsId}`}
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());
gtag('config','${env.gadsId}');`}
          </Script>
        </>
      )}
    </>
  )
}

/** El <noscript> de GTM va apenas abre el <body>. */
export function EtiquetasNoScript() {
  if (!env.gtmId) return null
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${env.gtmId}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
        title="Google Tag Manager"
      />
    </noscript>
  )
}
