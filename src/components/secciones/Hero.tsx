import type { CSSProperties } from 'react'
import { Phone } from 'lucide-react'
import { HeroFondo } from '@/components/secciones/HeroFondo'
import { BotonLlamar, BotonWhatsapp } from '@/components/ui/Botones'
import { datosCta, linkTelefono } from '@/lib/rutas'
import { hero, sitio } from '@contenido'

/**
 * El hero del WordPress que el cliente tenía, rehecho.
 *
 * La decisión de fondo: cuando abra el sitio nuevo tiene que reconocer el
 * suyo, no encontrarse con otra página. Se conserva la geometría entera —
 * la foto a sangre, el velo oscuro, el título
 * centrado partido en blanco y azul, los dos renglones de abajo con el
 * teléfono como enlace, los dos botones en degradé y el corte en diagonal.
 *
 * Se cambia sólo lo que estaba roto:
 *
 *   - el número ahora empuja `click_llamada` al dataLayer, y además hay un
 *     botón de llamar al lado del de WhatsApp;
 *   - los degradés cerraban en #25D366 y #60A0C2, que con texto blanco dan
 *     1.98:1 y 2.87:1 — ilegibles. Mismo tono, punto final más oscuro;
 *   - los emojis salieron: no se dibujan igual en cada celular;
 *   - la foto la servía WordPress en un solo JPG de 611 KB para todas las
 *     pantallas; ahora son dos encuadres en WebP, 25 KB en mobile.
 *
 * El alto es la pantalla entera menos la barra de urgencia, que es lo único
 * que queda arriba: `100svh` y no `100dvh` a propósito — con `dvh` el hero
 * cambia de alto mientras el navegador del celular esconde la barra de
 * direcciones, y el bloque de botones se mueve bajo el pulgar. Con `svh` se
 * queda quieto y los botones nunca quedan tapados.
 *
 * La entrada es escalonada, como los fadeIn de Elementor que él tenía, pero
 * moviendo sólo el transform: ver el comentario de `entra` en globals.css.
 *
 * Lo único que se perdió del original es el zoom por scroll del fondo, que en
 * mobile costaba más de lo que sumaba.
 */
export function Hero() {
  return (
    <section
      id="hero-home"
      className="sobre-oscuro relative isolate flex min-h-[calc(100svh-var(--alto-barra-urgencia))] items-center overflow-hidden bg-navy-900 text-white"
    >
      <HeroFondo />

      {/* El velo. En el original era un negro plano al 60%; acá son dos capas
          porque la foto tiene reflejos quemados y, con una sola, el azul del
          título caía a 2.8:1 justo encima de ellos. Con las dos, el peor píxel
          posible queda en 4.98:1 y se ve prácticamente igual: medido contra su
          sitio, la luminancia media del hero da 38 contra 42. */}
      <div className="absolute inset-0 bg-black/55" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-gradient-to-b from-navy-900/60 via-navy-900/45 to-navy-900/70"
        aria-hidden="true"
      />

      <div className="contenedor relative w-full">
        <div className="mx-auto max-w-3xl pb-10 text-center">
          <h1 className="entra text-[2.15rem] leading-[1.14] font-semibold tracking-[-0.02em] text-balance sm:text-5xl lg:text-[3.875rem]">
            <span className="block">{hero.h1.blanco}</span>
            <span className="text-azul-titulo block">{hero.h1.azul}</span>
          </h1>

          <p
            className="entra mt-6 text-base font-bold sm:text-lg"
            style={{ '--paso': 1 } as CSSProperties}
          >
            {hero.subtitulo}
          </p>

          {/* El renglón del teléfono que él tenía. El número es el enlace, y
              va medido como cualquier otro CTA. */}
          <p
            className="entra mt-1.5 flex items-center justify-center gap-2 text-base font-bold sm:text-lg"
            style={{ '--paso': 2 } as CSSProperties}
          >
            <Phone
              className="size-4 shrink-0"
              strokeWidth={2.5}
              aria-hidden="true"
            />
            {hero.antesDelTelefono}{' '}
            <a
              href={linkTelefono}
              {...datosCta('llamada', 'hero')}
              className="text-azul-titulo tabular-nums underline underline-offset-4 hover:text-white"
            >
              {sitio.telefono.visible}
            </a>
          </p>

          {/* WhatsApp primero, como en su sitio. El segundo botón era "Más
              información" y bajaba a un ancla; acá llama, que es la conversión
              que paga el Google Ads. */}
          <div
            className="entra mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
            style={{ '--paso': 3 } as CSSProperties}
          >
            <BotonWhatsapp
              ubicacion="hero"
              etiqueta={hero.botonWhatsapp}
              className="w-full sm:w-auto"
            />
            <BotonLlamar
              ubicacion="hero"
              conNumero={false}
              etiqueta="Llamar ahora"
              className="w-full sm:w-auto"
            />
          </div>
        </div>
      </div>

      {/* El corte en diagonal con el que cerraba el hero en Elementor: el
          mismo path, relleno con el color de la sección siguiente.

          El `-scale-y-100` no es decorativo. Elementor da vuelta la figura por
          CSS, y sin eso el relleno queda ARRIBA: se ve una hilacha blanca
          metida adentro de la foto en lugar de un corte limpio abajo. Medido
          con el cuentagotas: a 200px del borde izquierdo aparecía una franja
          blanca de 10px con foto oscura de los dos lados. */}
      <svg
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[20px] w-full -scale-y-100 text-white sm:h-[34px]"
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
