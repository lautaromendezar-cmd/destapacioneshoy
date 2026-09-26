import { Icono } from '@/components/ui/Icono'
import { BotonLlamar } from '@/components/ui/Botones'
import { diferenciales } from '@contenido'

/**
 * Sección oscura: corta el ritmo de la página y hace que el bloque de
 * confianza se lea como una unidad, no como seis tarjetas más.
 *
 * El fondo es #152649, el mismo azul con el que el cliente pintaba sus
 * bandas oscuras en Elementor. No es el navy del logo: es el que él ve.
 */
export function PorQueElegirnos() {
  return (
    <section
      aria-labelledby="titulo-elegirnos"
      className="sobre-oscuro bg-banda py-16 text-white md:py-24"
    >
      <div className="contenedor">
        <div className="max-w-2xl">
          <h2
            id="titulo-elegirnos"
            className="text-3xl font-extrabold sm:text-4xl"
          >
            Por qué elegirnos
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-white/70">
            Una destapación mal hecha se nota a los tres días. Así trabajamos
            para que eso no pase.
          </p>
        </div>

        <ul className="mt-10 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {diferenciales.map((item) => (
            <li key={item.titulo} className="aparece">
              <Icono
                nombre={item.icono}
                className="size-7 text-acento-claro"
              />
              <h3 className="mt-3 text-lg font-bold">{item.titulo}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-white/70">
                {item.texto}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-12">
          <BotonLlamar ubicacion="por-que-elegirnos" tamano="grande" />
        </div>
      </div>
    </section>
  )
}
