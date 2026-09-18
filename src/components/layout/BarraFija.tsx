import { Phone } from 'lucide-react'
import { IconoWhatsapp } from '@/components/ui/Icono'
import { datosCta, linkTelefono, linkWhatsapp } from '@/lib/rutas'
import { sitio } from '@contenido'

/**
 * Mobile: barra fija abajo con Llamar | WhatsApp, siempre a la vista.
 * Desktop: botón flotante de WhatsApp (el teléfono ya está en el encabezado).
 *
 * El espacio que tapa la barra se reserva con el padding-bottom del <body>
 * (token --espacio-barra-fija en globals.css), así no se come el final de la
 * página. Y `pb-[env(safe-area-inset-bottom)]` la despega de la barra de
 * gestos del iPhone.
 */

export function BarraFijaMobile() {
  return (
    <nav
      aria-label="Contacto rápido"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-black/10 bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-2px_12px_rgba(16,29,43,0.1)] md:hidden"
    >
      <div className="grid grid-cols-2 gap-2 p-2">
        <a
          href={linkTelefono}
          {...datosCta('llamada', 'barra-fija')}
          className="flex min-h-13 items-center justify-center gap-2 rounded-xl bg-acento font-semibold text-white active:bg-acento-fuerte"
        >
          <Phone className="size-5" strokeWidth={2.25} aria-hidden="true" />
          Llamar
        </a>
        <a
          href={linkWhatsapp()}
          target="_blank"
          rel="noopener"
          {...datosCta('whatsapp', 'barra-fija')}
          className="flex min-h-13 items-center justify-center gap-2 rounded-xl bg-wa font-semibold text-white active:bg-wa-fuerte"
        >
          <IconoWhatsapp className="size-5" />
          WhatsApp
        </a>
      </div>
    </nav>
  )
}

export function BotonFlotanteWhatsapp() {
  return (
    <a
      href={linkWhatsapp()}
      target="_blank"
      rel="noopener"
      {...datosCta('whatsapp', 'boton-flotante')}
      aria-label={`Escribir por WhatsApp al ${sitio.telefono.visible}`}
      className="fixed bottom-6 right-6 z-50 hidden size-14 items-center justify-center rounded-full bg-wa text-white shadow-lg transition-colors hover:bg-wa-fuerte md:flex"
    >
      <IconoWhatsapp className="size-7" />
    </a>
  )
}
