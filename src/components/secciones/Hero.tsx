import { Check } from 'lucide-react'
import { HeroFondo } from '@/components/secciones/HeroFondo'
import { BotonLlamar, BotonWhatsapp } from '@/components/ui/Botones'
import { hero } from '@contenido'

/**
 * El hero del WordPress que el cliente tenía, rehecho.
 *
 * La decisión de fondo: cuando abra el sitio nuevo tiene que reconocer el
 * suyo, no encontrarse con otra página. Así que se conserva todo lo que él
 * mira primero — la foto a sangre, el velo oscuro, el título centrado partido
 * en blanco y azul, los dos botones en degradé y el corte en diagonal de
 * abajo — y se cambia sólo lo que estaba roto:
 *
 *   · el teléfono era un link de texto perdido entre dos líneas; ahora es el
 *     botón principal, con el número a la vista y medido en Google Ads;
 *   · los degradés de los botones cerraban en #25D366 y #60A0C2, que con
 *     texto blanco dan 1.98:1 y 2.87:1 — ilegibles. Mismo tono, punto final
 *     más oscuro (ver globals.css);
 *   · los emojis 🚨 y 📞 salieron: los tres sellos con tilde dicen lo mismo y
 *     no dependen de cómo los dibuje cada celular;
 *   · la foto la servía WordPress en un solo JPG de 611 KB para todas las
 *     pantallas; ahora son dos encuadres en WebP, 25 KB en mobile.
 *
 * Lo único que se perdió del original es el zoom por scroll del fondo, que en
 * mobile costaba más de lo que sumaba.
 */
export function Hero() {
  return (
    <section className="sobre-oscuro relative isolate overflow-hidden bg-navy-900 text-white">
      <HeroFondo />

      {/* El velo. En el original era un negro plano al 60%; acá son dos capas
          porque la foto tiene reflejos quemados y, con una sola, el azul del
          título caía a 2.8:1 justo encima de ellos. Con las dos, el peor píxel
          posible queda en 4.98:1 y se ve prácticamente igual. */}
      <div className="absolute inset-0 bg-black/55" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-gradient-to-b from-navy-900/60 via-navy-900/45 to-navy-900/70"
        aria-hidden="true"
      />

      <div className="contenedor relative">
        <div className="mx-auto flex min-h-[26rem] max-w-3xl flex-col justify-center px-1 pt-14 pb-20 text-center sm:min-h-[34rem] sm:pt-20 sm:pb-28 md:min-h-[38rem] md:pt-24 md:pb-32">
          <h1 className="text-[2.1rem] leading-[1.14] font-bold tracking-[-0.02em] text-balance sm:text-5xl lg:text-[3.25rem]">
            <span className="block">{hero.h1.blanco}</span>
            <span className="block text-azul-titulo">{hero.h1.azul}</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base font-medium text-white/90 sm:text-lg">
            {hero.subtitulo}
          </p>

          <ul className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2">
            {hero.sellos.map((sello) => (
              <li
                key={sello}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-white"
              >
                <Check
                  className="text-azul-titulo size-4 shrink-0"
                  strokeWidth={3}
                  aria-hidden="true"
                />
                {sello}
              </li>
            ))}
          </ul>

          {/* Llamar primero: es la conversión que paga el Ads. El WhatsApp iba
              primero en el original, pero ahí el teléfono no era un botón. */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <BotonLlamar
              ubicacion="hero"
              tamano="grande"
              variante="degrade"
              etiqueta="Llamar ahora"
              className="w-full sm:w-auto"
            />
            <BotonWhatsapp
              ubicacion="hero"
              tamano="grande"
              variante="degrade"
              etiqueta={hero.botonWhatsapp}
              className="w-full sm:w-auto"
            />
          </div>
        </div>
      </div>

      {/* El corte en diagonal con el que cerraba el hero en Elementor. Es el
          mismo path: sube de izquierda a derecha y se rellena con el color de
          la sección siguiente. */}
      <svg
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[22px] w-full text-white sm:h-[38px]"
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M0,6V0h1000v100L0,6z" fill="currentColor" />
      </svg>
    </section>
  )
}
