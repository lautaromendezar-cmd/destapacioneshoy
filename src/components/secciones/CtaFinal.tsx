import { BotonLlamar, BotonWhatsapp } from '@/components/ui/Botones'
import { ctaFinal, sitio } from '@contenido'
import type { UbicacionCta } from '@contenido'

export function CtaFinal({
  ubicacion = 'cta-final',
  mensajeWhatsapp,
  titulo = ctaFinal.titulo,
  texto = ctaFinal.texto,
}: {
  ubicacion?: UbicacionCta
  /** Mensaje precargado de WhatsApp, para que la zona o el servicio viajen. */
  mensajeWhatsapp?: string
  titulo?: string
  texto?: string
}) {
  return (
    <section
      aria-labelledby="titulo-cta"
      className="sobre-oscuro bg-banda py-16 text-white md:py-20"
    >
      <div className="contenedor">
        <div className="max-w-2xl">
          <h2 id="titulo-cta" className="text-3xl font-bold sm:text-4xl lg:text-[2.75rem]">
            {titulo}
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-white/75">{texto}</p>
          <p className="mt-4 text-sm font-semibold uppercase tracking-widest text-acento-claro">
            {sitio.horario.texto}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <BotonLlamar
              ubicacion={ubicacion}
              tamano="grande"
              etiqueta="Llamar ahora"
              className="w-full sm:w-auto"
            />
            <BotonWhatsapp
              ubicacion={ubicacion}
              tamano="grande"
              variante="lleno"
              mensaje={mensajeWhatsapp}
              etiqueta="Escribir por WhatsApp"
              className="w-full sm:w-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
