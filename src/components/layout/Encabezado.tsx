import Image from 'next/image'
import Link from 'next/link'
import { Phone } from 'lucide-react'
import { barraSuperior, sitio } from '@contenido'
import { datosCta, linkTelefono, rutas } from '@/lib/rutas'

/**
 * Barra de urgencia + encabezado.
 *
 * Deliberadamente flaco: entre los dos ocupan ~92px, para que en un celular
 * de 360x640 el hero entero entre sin scrollear. Tampoco hay menú de
 * navegación: en una urgencia, un menú es una forma de perder la llamada.
 *
 * Los dos van sobre el mismo degradé oscuro del cliente. El encabezado era
 * blanco y cortaba la página en dos justo antes de la foto del hero, que en
 * su WordPress arrancaba pegada a la barra de urgencia. Así el arranque
 * vuelve a ser un solo bloque oscuro que entra en la foto — con el logo y el
 * teléfono, que él no tenía.
 */
export function Encabezado() {
  return (
    <header>
      <div className="sobre-oscuro degrade-barra text-white">
        <div className="contenedor flex items-center justify-center py-1.5">
          <p className="text-[13px] font-medium tracking-wide">
            {barraSuperior.texto}
          </p>
        </div>
      </div>

      <div className="sobre-oscuro degrade-barra">
        <div className="contenedor flex items-center justify-between gap-4 py-3">
          <Link href={rutas.home} aria-label={`${sitio.nombre} — inicio`}>
            <Image
              src="/images/logo-destapaciones-hoy-fondo-oscuro.webp"
              alt={sitio.nombre}
              width={1029}
              height={376}
              priority
              sizes="160px"
              className="h-10 w-auto sm:h-12 lg:h-14"
            />
          </Link>

          <a
            href={linkTelefono}
            {...datosCta('llamada', 'header')}
            className="hidden items-center gap-2 rounded-lg px-3 py-2 text-lg font-bold text-white transition-colors hover:bg-white/10 sm:inline-flex"
          >
            <Phone className="size-5" strokeWidth={2.25} aria-hidden="true" />
            <span className="tabular-nums">{sitio.telefono.visible}</span>
          </a>
        </div>
      </div>
    </header>
  )
}
