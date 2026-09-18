import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { zonaParaguas, zonas } from '@contenido'
import { rutas } from '@/lib/rutas'

export function Zonas() {
  return (
    <section
      id="zonas"
      aria-labelledby="titulo-zonas"
      className="border-t border-borde bg-white py-16 md:py-24"
    >
      <div className="contenedor">
        <div className="max-w-2xl">
          <h2
            id="titulo-zonas"
            className="text-3xl font-extrabold text-navy sm:text-4xl"
          >
            Dónde trabajamos
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-tinta-suave">
            Capital Federal y Provincia de Buenos Aires. Entrá a tu zona para
            ver qué se tapa más seguido por ahí y por qué.
          </p>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {zonas.map((zona) => (
            <li key={zona.slug} className="aparece">
              <Link
                href={rutas.zona(zona.slug)}
                className="group flex h-full flex-col rounded-2xl border border-borde bg-papel-tenue p-6 transition-colors hover:border-acento hover:bg-acento-tenue/50"
              >
                <div className="flex items-center gap-2.5">
                  <MapPin
                    className="size-5 shrink-0 text-acento"
                    strokeWidth={2.25}
                    aria-hidden="true"
                  />
                  <h3 className="text-xl font-bold text-navy">{zona.nombre}</h3>
                </div>

                <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-tinta-suave">
                  {zona.localidades.slice(0, 7).join(' · ')}
                  {zona.localidades.length > 7 && ' y alrededores'}
                </p>

                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-acento">
                  Destapaciones en {zona.nombre}
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

        <p className="mt-6 text-[0.95rem] text-tinta-suave">
          {zonaParaguas.texto}
        </p>
      </div>
    </section>
  )
}
