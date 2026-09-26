import Image from 'next/image'
import Link from 'next/link'
import { Phone } from 'lucide-react'
import { IconoWhatsapp } from '@/components/ui/Icono'
import { servicios, sitio, zonaParaguas, zonas } from '@contenido'
import { datosCta, linkTelefono, linkWhatsapp, rutas } from '@/lib/rutas'

/**
 * El logo "blanco" que mandó el cliente tiene el "HOY" en navy: sobre este
 * fondo desaparece. Acá va la variante generada en scripts/preparar-imagenes.mjs,
 * con ese texto repintado de azul claro.
 */
export function PieDePagina() {
  const anio = new Date().getFullYear()

  return (
    <footer className="sobre-oscuro bg-pie text-white">
      <div className="contenedor py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Image
              src="/images/logo-destapaciones-hoy-fondo-oscuro.webp"
              alt={sitio.nombre}
              width={1029}
              height={376}
              loading="lazy"
              sizes="140px"
              className="h-11 w-auto"
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
              {sitio.descripcionCorta}
            </p>
            <p className="mt-3 text-sm font-semibold text-acento-claro">
              {sitio.horario.texto}
            </p>
          </div>

          <nav aria-labelledby="pie-servicios">
            <h2
              id="pie-servicios"
              className="text-xs font-bold uppercase tracking-widest text-white/50"
            >
              Servicios
            </h2>
            <ul className="mt-4 space-y-2.5">
              {servicios.map((servicio) => (
                <li key={servicio.slug}>
                  <Link
                    href={rutas.servicio(servicio.slug)}
                    className="text-sm text-white/85 underline-offset-4 hover:text-white hover:underline"
                  >
                    {servicio.nombre}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="pie-zonas">
            <h2
              id="pie-zonas"
              className="text-xs font-bold uppercase tracking-widest text-white/50"
            >
              Zonas
            </h2>
            <ul className="mt-4 space-y-2.5">
              {zonas.map((zona) => (
                <li key={zona.slug}>
                  <Link
                    href={rutas.zona(zona.slug)}
                    className="text-sm text-white/85 underline-offset-4 hover:text-white hover:underline"
                  >
                    {zona.nombre}
                  </Link>
                </li>
              ))}
              <li className="text-sm text-white/60">{zonaParaguas.nombre}</li>
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-white/50">
              Contacto
            </h2>
            <div className="mt-4 space-y-3">
              <a
                href={linkTelefono}
                {...datosCta('llamada', 'footer')}
                className="flex items-center gap-2.5 text-xl font-bold tabular-nums hover:text-acento-claro"
              >
                <Phone className="size-5 shrink-0" strokeWidth={2.25} aria-hidden="true" />
                {sitio.telefono.visible}
              </a>
              <a
                href={linkWhatsapp()}
                target="_blank"
                rel="noopener"
                {...datosCta('whatsapp', 'footer')}
                className="flex items-center gap-2.5 text-sm text-white/85 hover:text-white"
              >
                <IconoWhatsapp className="size-5 shrink-0" />
                Escribir por WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/15 pt-6 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {anio} {sitio.nombre}. Todos los derechos reservados.
          </p>
          <p>
            <a
              href={sitio.autor.url}
              target="_blank"
              rel="noopener"
              className="underline-offset-4 hover:text-white hover:underline"
            >
              {sitio.autor.credito}
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
