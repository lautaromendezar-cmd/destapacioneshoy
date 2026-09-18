import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Icono } from '@/components/ui/Icono'
import { servicios } from '@contenido'
import { rutas } from '@/lib/rutas'

export function Servicios() {
  return (
    <section
      id="servicios"
      aria-labelledby="titulo-servicios"
      className="border-t border-borde bg-white py-16 md:py-24"
    >
      <div className="contenedor">
        <div className="max-w-2xl">
          <h2
            id="titulo-servicios"
            className="text-3xl font-extrabold text-navy sm:text-4xl"
          >
            Qué destapamos
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-tinta-suave">
            Trabajamos con máquinas de sonda y bomba centrífuga. Si tu problema
            no está en la lista, llamá igual y lo vemos.
          </p>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {servicios.map((servicio) => (
            <li key={servicio.slug} className="aparece">
              <Link
                href={rutas.servicio(servicio.slug)}
                className="group flex h-full flex-col rounded-2xl border border-borde bg-white p-6 transition-colors hover:border-acento hover:bg-acento-tenue/40"
              >
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-navy text-white">
                  <Icono nombre={servicio.icono} className="size-6" />
                </span>

                <h3 className="mt-4 text-lg font-bold text-navy">
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
