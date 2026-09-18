import { Check } from 'lucide-react'
import { HeroImagen } from '@/components/secciones/HeroImagen'
import { BotonLlamar, BotonWhatsapp } from '@/components/ui/Botones'
import { hero } from '@contenido'

/**
 * Lo único que tiene que pasar arriba de todo: que se entienda qué hacemos,
 * que llegamos a su zona y que el botón de llamar esté al alcance del pulgar.
 *
 * En mobile la foto va DEBAJO de los botones, cortada por el borde: el bloque
 * H1 + botones entra completo en un 360x640 sin scrollear, y la foto asomando
 * invita a seguir bajando en vez de competir con el CTA.
 *
 * La foto sale de HeroImagen: son dos recortes distintos según la pantalla
 * (franja horizontal / columna vertical) y el navegador baja uno solo.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-papel-tenue to-white">
      <div className="contenedor">
        <div className="grid items-center gap-8 pt-8 pb-0 md:grid-cols-[1.05fr_0.95fr] md:gap-12 md:py-16">
          <div>
            <h1 className="text-[2rem] font-extrabold leading-[1.08] text-navy sm:text-5xl lg:text-[3.5rem]">
              {hero.h1}
            </h1>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-tinta-suave sm:text-lg">
              {hero.subtitulo}
            </p>

            <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
              {hero.sellos.map((sello) => (
                <li
                  key={sello}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy"
                >
                  <Check
                    className="size-4 shrink-0 text-acento"
                    strokeWidth={3}
                    aria-hidden="true"
                  />
                  {sello}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <BotonLlamar
                ubicacion="hero"
                tamano="grande"
                etiqueta="Llamar ahora"
                className="w-full sm:w-auto"
              />
              <BotonWhatsapp
                ubicacion="hero"
                tamano="grande"
                etiqueta={hero.botonWhatsapp}
                className="w-full sm:w-auto"
              />
            </div>
          </div>

          {/* La foto: franja al borde inferior en mobile, columna en desktop.
              Un solo archivo por tamaño de pantalla — ver HeroImagen. */}
          <div className="relative mt-9 -mx-5 h-44 overflow-hidden sm:-mx-8 md:mx-0 md:mt-0 md:h-auto md:aspect-4/5 md:rounded-2xl md:shadow-xl md:shadow-navy/10">
            <HeroImagen className="h-full w-full object-cover object-center md:object-top" />
          </div>
        </div>
      </div>
    </section>
  )
}
