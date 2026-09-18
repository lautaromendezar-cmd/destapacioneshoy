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
 */
export function Encabezado() {
  return (
    <header>
      <div className="sobre-oscuro bg-navy text-white">
        <div className="contenedor flex items-center justify-center py-1.5">
          <p className="text-[13px] font-medium tracking-wide">
            {barraSuperior.texto}
          </p>
        </div>
      </div>

      <div className="border-b border-borde bg-white">
        <div className="contenedor flex items-center justify-between gap-4 py-3">
          <Link href={rutas.home} aria-label={`${sitio.nombre} — inicio`}>
            <Image
              src="/images/logo-destapaciones-hoy.webp"
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
            className="hidden items-center gap-2 rounded-lg px-3 py-2 text-lg font-bold text-navy transition-colors hover:bg-acento-tenue sm:inline-flex"
          >
            <Phone className="size-5" strokeWidth={2.25} aria-hidden="true" />
            <span className="tabular-nums">{sitio.telefono.visible}</span>
          </a>
        </div>
      </div>
    </header>
  )
}
