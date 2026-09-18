import Link from 'next/link'
import { BotonLlamar, BotonWhatsapp } from '@/components/ui/Botones'
import { pagina404, servicios, zonas } from '@contenido'
import { rutas } from '@/lib/rutas'

export default function NoEncontrada() {
  return (
    <section className="bg-gradient-to-b from-papel-tenue to-white py-20 md:py-28">
      <div className="contenedor">
        <p className="text-sm font-bold uppercase tracking-widest text-acento">
          Error 404
        </p>
        <h1 className="mt-3 max-w-3xl text-[2rem] font-extrabold leading-[1.1] text-navy sm:text-5xl">
          {pagina404.titulo}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-tinta-suave">
          {pagina404.texto}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <BotonLlamar
            ubicacion="pagina-404"
            tamano="grande"
            etiqueta="Llamar ahora"
            className="w-full sm:w-auto"
          />
          <BotonWhatsapp
            ubicacion="pagina-404"
            tamano="grande"
            etiqueta="Escribir por WhatsApp"
            className="w-full sm:w-auto"
          />
        </div>

        <div className="mt-12 grid max-w-3xl gap-8 border-t border-borde pt-8 sm:grid-cols-2">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-tinta-suave">
              Servicios
            </h2>
            <ul className="mt-3 space-y-2">
              {servicios.map((servicio) => (
                <li key={servicio.slug}>
                  <Link
                    href={rutas.servicio(servicio.slug)}
                    className="font-medium text-navy underline-offset-4 hover:text-acento hover:underline"
                  >
                    {servicio.nombre}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-tinta-suave">
              Zonas
            </h2>
            <ul className="mt-3 space-y-2">
              {zonas.map((zona) => (
                <li key={zona.slug}>
                  <Link
                    href={rutas.zona(zona.slug)}
                    className="font-medium text-navy underline-offset-4 hover:text-acento hover:underline"
                  >
                    Destapaciones en {zona.nombre}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-10">
          <Link
            href={rutas.home}
            className="font-semibold text-acento underline underline-offset-4"
          >
            {pagina404.volver}
          </Link>
        </p>
      </div>
    </section>
  )
}
