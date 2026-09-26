import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { BotonWhatsapp } from '@/components/ui/Botones'
import { bandaZonas, zonaParaguas, zonas } from '@contenido'
import { rutas } from '@/lib/rutas'

/**
 * La banda de cobertura tal como la tenía el cliente en WordPress: foto de
 * fondo, velo oscuro, volanta chica, título centrado en blanco, las zonas
 * separadas por barras y el botón verde de WhatsApp. Era su segunda sección
 * más fuerte después del hero y es de lo primero que reconoce.
 *
 * Lo que se agrega debajo, dentro de la misma banda, son las cuatro tarjetas
 * que llevan a las landings de zona. En su sitio ese renglón de barras no
 * linkeaba a ningún lado: era texto. Ahora cada zona tiene página propia con
 * su contenido, que es lo que come el tráfico de Google Ads.
 *
 * La foto es la suya (`_rescate/banda-zonas-original.jpg`), con su magenta y
 * todo. Bajo el velo se lee como la banda azul con tinte violeta que él ve.
 */
export function Zonas() {
  return (
    <section
      id="zonas"
      aria-labelledby="titulo-zonas"
      className="sobre-oscuro relative isolate overflow-hidden bg-banda py-16 text-white md:py-24"
    >
      <picture>
        <source
          media="(max-width: 767px)"
          type="image/webp"
          srcSet="/images/banda-zonas-768.webp"
        />
        <source
          media="(min-width: 768px)"
          type="image/webp"
          srcSet="/images/banda-zonas-1152.webp 1152w, /images/banda-zonas-1408.webp 1408w"
          sizes="100vw"
        />
        <img
          src="/images/banda-zonas-1408.webp"
          alt=""
          aria-hidden="true"
          width={1408}
          height={768}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 -z-10 size-full object-cover object-center"
        />
      </picture>

      {/* El velo. Más cerrado que el del hero porque la foto tiene un magenta
          saturado y el texto blanco encima se ensucia: medido, con el 80% el
          peor píxel de la foto queda en 12:1. */}
      <div
        className="absolute inset-0 -z-10 bg-banda-fuerte/80"
        aria-hidden="true"
      />

      <div className="contenedor relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold tracking-widest text-azul-titulo uppercase">
            {bandaZonas.volanta}
          </p>

          <h2
            id="titulo-zonas"
            className="mt-4 text-3xl leading-[1.15] font-bold tracking-[-0.02em] text-balance sm:text-4xl lg:text-[2.75rem]"
          >
            {bandaZonas.titulo}
          </h2>

          {/* Las zonas separadas por barras, igual que en su sitio. El MapPin
              reemplaza al 📍 que tenía delante. */}
          <p className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-base text-white/85">
            <MapPin
              className="size-4 shrink-0 text-azul-titulo"
              strokeWidth={2.5}
              aria-hidden="true"
            />
            {bandaZonas.listado.map((nombre, i) => (
              <span key={nombre} className="flex items-center gap-x-3">
                {i > 0 && (
                  <span aria-hidden="true" className="text-white/35">
                    |
                  </span>
                )}
                {nombre}
              </span>
            ))}
          </p>

          <div className="mt-8 flex justify-center">
            <BotonWhatsapp
              ubicacion="zonas"
              tamano="grande"
              etiqueta={bandaZonas.botonWhatsapp}
              className="w-full sm:w-auto"
            />
          </div>
        </div>

        <p className="mt-14 text-center text-[0.95rem] text-white/70">
          {bandaZonas.bajadaTarjetas}
        </p>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {zonas.map((zona) => (
            <li key={zona.slug} className="aparece">
              <Link
                href={rutas.zona(zona.slug)}
                className="group flex h-full flex-col rounded-2xl border border-white/15 bg-white/[0.07] p-6 transition-colors hover:border-white/35 hover:bg-white/[0.12]"
              >
                <div className="flex items-center gap-2.5">
                  <MapPin
                    className="size-5 shrink-0 text-azul-titulo"
                    strokeWidth={2.25}
                    aria-hidden="true"
                  />
                  <h3 className="text-xl font-bold">{zona.nombre}</h3>
                </div>

                <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-white/75">
                  {zona.localidades.slice(0, 7).join(' · ')}
                  {zona.localidades.length > 7 && ' y alrededores'}
                </p>

                <span className="text-azul-titulo mt-4 inline-flex items-center gap-1.5 text-sm font-semibold">
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

        <p className="mt-6 text-center text-[0.95rem] text-white/60">
          {zonaParaguas.texto}
        </p>
      </div>
    </section>
  )
}
