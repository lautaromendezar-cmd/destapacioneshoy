import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, MapPin } from 'lucide-react'

import { Migas } from '@/components/ui/Migas'
import { ListaConCheck } from '@/components/ui/ListaConCheck'
import { BotonLlamar, BotonWhatsapp } from '@/components/ui/Botones'
import { CtaFinal } from '@/components/secciones/CtaFinal'
import { servicios, zonas } from '@contenido'
import { rutas, mensajeServicio } from '@/lib/rutas'
import { metadataDe } from '@/lib/seo'
import { jsonLd, migasJsonLd, servicioJsonLd } from '@/lib/jsonld'

/** Todas las páginas se generan en el build: no hay render en runtime. */
export function generateStaticParams() {
  return servicios.map((servicio) => ({ slug: servicio.slug }))
}

function buscar(slug: string) {
  return servicios.find((servicio) => servicio.slug === slug)
}

export async function generateMetadata({
  params,
}: PageProps<'/servicios/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const servicio = buscar(slug)
  if (!servicio) return {}

  return metadataDe({
    titulo: servicio.metaTitle,
    descripcion: servicio.metaDescription,
    ruta: rutas.servicio(servicio.slug),
  })
}

export default async function PaginaServicio({
  params,
}: PageProps<'/servicios/[slug]'>) {
  const { slug } = await params
  const servicio = buscar(slug)
  if (!servicio) notFound()

  const otros = servicios.filter((s) => s.slug !== servicio.slug)
  const mensaje = mensajeServicio(servicio.nombre)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(servicioJsonLd(servicio)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            migasJsonLd([
              { nombre: 'Inicio', ruta: rutas.home },
              { nombre: servicio.nombreCorto, ruta: rutas.servicio(servicio.slug) },
            ]),
          ),
        }}
      />

      <Migas items={[{ nombre: servicio.nombreCorto, ruta: rutas.servicio(servicio.slug) }]} />

      {/* ── Encabezado del servicio ─────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-papel-tenue to-white pb-14 pt-6 md:pb-20">
        <div className="contenedor">
          <div
            className={
              servicio.imagen
                ? 'grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-14'
                : 'max-w-3xl'
            }
          >
            <div>
              <h1 className="text-[2rem] font-semibold leading-[1.1] text-banda sm:text-5xl">
                {servicio.h1}
              </h1>

              {servicio.intro.map((parrafo) => (
                <p
                  key={parrafo}
                  className="mt-4 max-w-xl text-base leading-relaxed text-tinta-suave sm:text-lg"
                >
                  {parrafo}
                </p>
              ))}

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <BotonLlamar
                  ubicacion="pagina-servicio"
                  tamano="grande"
                  etiqueta="Llamar ahora"
                  className="w-full sm:w-auto"
                />
                <BotonWhatsapp
                  ubicacion="pagina-servicio"
                  tamano="grande"
                  mensaje={mensaje}
                  etiqueta="Escribir por WhatsApp"
                  className="w-full sm:w-auto"
                />
              </div>
            </div>

            {/* Sin foto el encabezado va a una sola columna. Preferible a
                repetir la de otro servicio o a poner un marcador de posición:
                ver el TODO de video-inspeccion-de-canerias en content/site.ts. */}
            {servicio.imagen && (
              <div className="overflow-hidden rounded-2xl shadow-xl shadow-banda/10">
                <Image
                  src={servicio.imagen.src}
                  alt={servicio.imagen.alt}
                  width={servicio.imagen.ancho}
                  height={servicio.imagen.alto}
                  priority
                  fetchPriority="high"
                  sizes="(min-width: 768px) 36rem, 100vw"
                  className="aspect-4/3 w-full object-cover md:aspect-4/5"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Síntomas y causas ───────────────────────────────────────────── */}
      <section className="border-t border-borde bg-white py-14 md:py-20">
        <div className="contenedor grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="text-2xl font-bold text-banda sm:text-3xl">
              {servicio.titulos?.sintomas ?? 'Cómo te das cuenta'}
            </h2>
            <ListaConCheck items={servicio.sintomas} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-banda sm:text-3xl">
              {servicio.titulos?.causas ?? 'Por qué se tapa'}
            </h2>
            <ListaConCheck items={servicio.causas} />
          </div>
        </div>
      </section>

      {/* ── Cómo lo resolvemos ──────────────────────────────────────────── */}
      <section className="sobre-oscuro bg-banda py-14 text-white md:py-20">
        <div className="contenedor">
          <h2 className="max-w-2xl text-2xl font-bold sm:text-3xl">
            {servicio.titulos?.resolucion ?? 'Cómo lo resolvemos'}
          </h2>
          <ol className="mt-6 max-w-3xl space-y-5">
            {servicio.resolucion.map((paso, i) => (
              <li key={paso} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-acento text-sm font-bold tabular-nums"
                >
                  {i + 1}
                </span>
                <p className="leading-relaxed text-white/80">{paso}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Links internos ──────────────────────────────────────────────── */}
      <section className="border-t border-borde bg-papel-tenue py-14 md:py-20">
        <div className="contenedor grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="text-xl font-bold text-banda">
              Dónde hacemos este servicio
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {zonas.map((zona) => (
                <li key={zona.slug}>
                  <Link
                    href={rutas.zona(zona.slug)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-borde bg-white px-3.5 py-2 text-sm font-medium text-navy transition-colors hover:border-acento hover:text-acento"
                  >
                    <MapPin className="size-4 text-acento" aria-hidden="true" />
                    {zona.nombre}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-banda">Otros servicios</h2>
            <ul className="mt-4 space-y-2.5">
              {otros.map((otro) => (
                <li key={otro.slug}>
                  <Link
                    href={rutas.servicio(otro.slug)}
                    className="group inline-flex items-center gap-1.5 font-medium text-navy underline-offset-4 hover:text-acento hover:underline"
                  >
                    {otro.nombre}
                    <ArrowRight
                      className="size-4 text-acento transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaFinal
        ubicacion="pagina-servicio"
        mensajeWhatsapp={mensaje}
        titulo={`¿Necesitás ${servicio.nombre.toLowerCase()} ahora?`}
      />
    </>
  )
}
