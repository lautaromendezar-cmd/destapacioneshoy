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
}: {
  ubicacion: UbicacionCta
  tamano?: Tamano
  className?: string
  /** Mostrar el número además del texto. En el hero conviene que se vea. */
  conNumero?: boolean
  etiqueta?: string
}) {
  return (
    <a
      href={linkTelefono}
      {...datosCta('llamada', ubicacion)}
      className={`${base} ${medidas[tamano]} bg-acento text-white hover:bg-acento-fuerte ${className}`}
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
  variante = 'contorno',
}: {
  ubicacion: UbicacionCta
  tamano?: Tamano
  className?: string
  /** Mensaje precargado. Por defecto, el genérico. */
  mensaje?: string
  etiqueta?: string
  variante?: 'contorno' | 'lleno'
}) {
  const estilo =
    variante === 'lleno'
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
