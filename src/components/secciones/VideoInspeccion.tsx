import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ListaConCheck } from '@/components/ui/ListaConCheck'
import { BotonLlamar, BotonWhatsapp } from '@/components/ui/Botones'
import { videoInspeccion } from '@contenido'
import { rutas } from '@/lib/rutas'

/**
 * Banda de la video inspección, entre los servicios y el bloque oscuro.
 *
 * Es el único servicio que el cliente pidió agregar y el equipo se lo acaba
 * de comprar, así que quiso verlo destacado y no como una tarjeta más de la
 * grilla. Va en `papel-tenue` porque queda entre dos secciones que ya tienen
 * fondo tomado: la grilla de servicios es blanca y "Por qué elegirnos" es la
 * banda oscura. Tres fondos seguidos iguales borrarían el corte.
 *
 * La foto va primero en el HTML y se manda a la derecha en desktop con
 * `md:order-2`: en mobile lo primero que se ve es el equipo, que es lo que el
 * cliente quiere lucir, y en desktop el texto queda a la izquierda como en el
 * resto del sitio.
 */
export function VideoInspeccion() {
  const { rotulo, titulo, texto, puntos, imagen } = videoInspeccion

  return (
    <section
      aria-labelledby="titulo-video-inspeccion"
      className="border-t border-borde bg-papel-tenue py-16 md:py-24"
    >
      <div className="contenedor">
        <div className="grid items-center gap-10 md:grid-cols-[0.95fr_1.05fr] md:gap-16">
          <div className="aparece md:order-2">
            <Image
              src={imagen.src}
              alt={imagen.alt}
              width={imagen.ancho}
              height={imagen.alto}
              loading="lazy"
              sizes="(min-width: 768px) 32rem, 100vw"
              className="aspect-4/3 w-full rounded-2xl object-cover shadow-xl shadow-banda/10 md:aspect-4/5"
            />
          </div>

          <div className="aparece md:order-1">
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-acento">
              {rotulo}
            </p>

            <h2
              id="titulo-video-inspeccion"
              className="mt-3 text-3xl font-bold text-banda sm:text-4xl lg:text-[2.75rem]"
            >
              {titulo}
            </h2>

            <p className="mt-4 max-w-xl text-lg leading-relaxed text-tinta-suave">
              {texto}
            </p>

            <ListaConCheck items={puntos} />

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <BotonLlamar ubicacion="video-inspeccion" />
              <BotonWhatsapp ubicacion="video-inspeccion" />
            </div>

            <Link
              href={rutas.servicio('video-inspeccion-de-canerias')}
              className="mt-6 inline-flex items-center gap-2 font-bold text-navy underline-offset-4 hover:underline"
            >
              Cómo es la video inspección
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
