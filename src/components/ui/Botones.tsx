import { Phone } from 'lucide-react'
import { IconoWhatsapp } from '@/components/ui/Icono'
import { datosCta, linkTelefono, linkWhatsapp } from '@/lib/rutas'
import { sitio } from '@contenido'
import type { UbicacionCta } from '@contenido'

/**
 * Los dos únicos botones que importan. Son <a> comunes, sin onClick: la
 * medición la toma el listener delegado leyendo data-cta / data-ubicacion.
 *
 * `ubicacion` es obligatoria en los dos, para que ningún botón llegue a
 * producción sin poder atribuirse en Google Ads.
 */

type Tamano = 'grande' | 'normal'

const base =
  'inline-flex items-center justify-center gap-2.5 rounded-xl font-semibold ' +
  'leading-tight transition-colors duration-150 ' +
  'active:translate-y-px select-none'

const medidas: Record<Tamano, string> = {
  // 56px de alto: cómodo para el pulgar, sobrado para el mínimo de 44px.
  grande: 'min-h-14 px-6 text-lg',
  normal: 'min-h-12 px-5 text-base',
}

export function BotonLlamar({
  ubicacion,
  tamano = 'normal',
  className = '',
  conNumero = true,
  etiqueta,
  variante = 'degrade',
}: {
  ubicacion: UbicacionCta
  tamano?: Tamano
  className?: string
  /** Mostrar el número además del texto. En el hero conviene que se vea. */
  conNumero?: boolean
  etiqueta?: string
  /**
   * 'degrade' es el botón azul que el cliente tenía en todo su sitio y es el
   * que va por defecto. 'lleno' queda para donde el degradé no entra: la
   * barra fija de mobile, que mide 56px y se vería sucia.
   */
  variante?: 'lleno' | 'degrade'
}) {
  const estilo =
    variante === 'degrade'
      ? 'degrade-azul text-white hover:degrade-azul-fuerte'
      : 'bg-acento text-white hover:bg-acento-fuerte'

  return (
    <a
      href={linkTelefono}
      {...datosCta('llamada', ubicacion)}
      className={`${base} ${medidas[tamano]} ${estilo} ${className}`}
    >
      <Phone
        className={tamano === 'grande' ? 'size-6 shrink-0' : 'size-5 shrink-0'}
        strokeWidth={2.25}
        aria-hidden="true"
      />
      <span>
        {etiqueta ?? 'Llamar'}
        {conNumero && (
          <>
            {' '}
            <span className="tabular-nums whitespace-nowrap">
              {sitio.telefono.visible}
            </span>
          </>
        )}
      </span>
    </a>
  )
}

export function BotonWhatsapp({
  ubicacion,
  tamano = 'normal',
  className = '',
  mensaje,
  etiqueta = 'WhatsApp',
  variante = 'degrade',
}: {
  ubicacion: UbicacionCta
  tamano?: Tamano
  className?: string
  /** Mensaje precargado. Por defecto, el genérico. */
  mensaje?: string
  etiqueta?: string
  /**
   * 'degrade' es el verde del cliente y va por defecto. 'contorno' queda para
   * fondos claros donde el verde lleno pesa demasiado al lado del botón de
   * llamar, y 'lleno' para la barra fija.
   */
  variante?: 'contorno' | 'lleno' | 'degrade'
}) {
  const estilo =
    variante === 'degrade'
      ? 'degrade-wa text-white hover:degrade-wa-fuerte'
      : variante === 'lleno'
        ? 'bg-wa text-white hover:bg-wa-fuerte'
        : 'bg-white text-wa ring-2 ring-inset ring-wa hover:bg-[#f0faf7]'

  return (
    <a
      href={linkWhatsapp(mensaje)}
      target="_blank"
      rel="noopener"
      {...datosCta('whatsapp', ubicacion)}
      className={`${base} ${medidas[tamano]} ${estilo} ${className}`}
    >
      <IconoWhatsapp
        className={tamano === 'grande' ? 'size-6 shrink-0' : 'size-5 shrink-0'}
      />
      <span>{etiqueta}</span>
    </a>
  )
}
