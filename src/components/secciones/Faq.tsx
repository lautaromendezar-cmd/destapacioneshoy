import { Plus } from 'lucide-react'
import type { Faq as TipoFaq } from '@contenido'
import { faqs as faqsPorDefecto } from '@contenido'

/**
 * Acordeón con <details>/<summary> nativos: accesible por teclado y por
 * lector de pantalla sin una línea de JavaScript, y el texto queda en el HTML
 * aunque esté colapsado (que es lo que Google necesita leer).
 *
 * El atributo `name` hace que se abra de a una sola. Donde el navegador no lo
 * soporte, se abren de forma independiente: se degrada solo.
 */
export function Faq({
  preguntas = faqsPorDefecto,
  titulo = 'Preguntas frecuentes',
}: {
  preguntas?: TipoFaq[]
  titulo?: string
}) {
  return (
    <section
      id="preguntas"
      aria-labelledby="titulo-faq"
      className="border-t border-borde bg-white py-16 md:py-24"
    >
      <div className="contenedor">
        <h2
          id="titulo-faq"
          className="max-w-2xl text-3xl font-extrabold text-navy sm:text-4xl"
        >
          {titulo}
        </h2>

        <div className="mt-8 max-w-3xl divide-y divide-borde border-y border-borde">
          {preguntas.map((faq) => (
            <details key={faq.pregunta} name="faq" className="group">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-5 text-left font-semibold text-navy marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="text-lg">{faq.pregunta}</span>
                <Plus
                  className="mt-1 size-5 shrink-0 text-acento transition-transform duration-200 group-open:rotate-45"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
              </summary>
              <p className="pb-5 pr-9 leading-relaxed text-tinta-suave">
                {faq.respuesta}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
