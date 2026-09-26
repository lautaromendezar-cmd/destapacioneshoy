import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Icono, TildeCirculo } from '@/components/ui/Icono'
import { introServicios, servicios } from '@contenido'
import { rutas } from '@/lib/rutas'

/**
 * El bloque de servicios del cliente: a la izquierda el título, su párrafo y
 * la lista con tildes en círculo; a la derecha, una foto de un trabajo real.
 * Es su segunda sección y está tal cual, con su redacción.
 *
 * Lo agregado son dos cosas: cada renglón de la lista ahora es un enlace a la
 * landing de ese servicio — en su sitio era texto muerto — y debajo van las
 * tarjetas con el resumen de cada uno, que es lo que entiende alguien que
 * cayó desde un anuncio y no sabe cuál de los cinco le corresponde.
 */
export function Servicios() {
  return (
    <section
      id="servicios"
      aria-labelledby="titulo-servicios"
      className="bg-white py-16 md:py-24"
    >
      <div className="contenedor">
        <div className="grid items-center gap-10 md:grid-cols-[1.05fr_0.95fr] md:gap-14">
          <div>
            <h2
              id="titulo-servicios"
              className="text-3xl font-bold text-banda sm:text-4xl lg:text-[2.75rem]"
            >
              {introServicios.titulo}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-tinta-suave">
              {introServicios.texto}
            </p>

            <ul className="mt-7 space-y-3.5">
              {servicios.map((servicio) => (
                <li key={servicio.slug}>
                  <Link
                    href={rutas.servicio(servicio.slug)}
                    className="group flex gap-3 text-tinta underline-offset-4 hover:text-acento hover:underline"
                  >
                    <TildeCirculo className="mt-1 size-4.5 text-tilde" />
                    <span className="leading-relaxed font-medium">
                      {servicio.nombre}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="overflow-hidden rounded-2xl">
            <Image
              src={introServicios.imagen.src}
              alt={introServicios.imagen.alt}
              width={introServicios.imagen.ancho}
              height={introServicios.imagen.alto}
              loading="lazy"
              sizes="(min-width: 768px) 32rem, 100vw"
              className="aspect-4/5 w-full object-cover object-top"
            />
          </div>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {servicios.map((servicio) => (
            <li key={servicio.slug} className="aparece">
              <Link
                href={rutas.servicio(servicio.slug)}
                className="group flex h-full flex-col rounded-2xl border border-borde bg-white p-6 transition-colors hover:border-acento hover:bg-acento-tenue/40"
              >
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-tilde text-white">
                  <Icono nombre={servicio.icono} className="size-6" />
                </span>

                <h3 className="mt-4 text-lg font-bold text-banda">
                  {servicio.nombre}
                </h3>
                <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-tinta-suave">
                  {servicio.resumen}
                </p>

                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-acento">
                  Ver el servicio
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
