import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, MapPin } from 'lucide-react'

import { Migas } from '@/components/ui/Migas'
import { ListaConCheck } from '@/components/ui/ListaConCheck'
import { BotonLlamar, BotonWhatsapp } from '@/components/ui/Botones'
import { CtaFinal } from '@/components/secciones/CtaFinal'
import { Icono } from '@/components/ui/Icono'
import { servicios, sitio, zonas } from '@contenido'
import { mensajeZona, rutas } from '@/lib/rutas'
import { metadataDe } from '@/lib/seo'
import { jsonLd, migasJsonLd, zonaJsonLd } from '@/lib/jsonld'

export function generateStaticParams() {
  return zonas.map((zona) => ({ slug: zona.slug }))
}

function buscar(slug: string) {
  return zonas.find((zona) => zona.slug === slug)
}

export async function generateMetadata({
  params,
}: PageProps<'/zonas/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const zona = buscar(slug)
  if (!zona) return {}

  return metadataDe({
    titulo: zona.metaTitle,
    descripcion: zona.metaDescription,
    ruta: rutas.zona(zona.slug),
  })
}

export default async function PaginaZona({ params }: PageProps<'/zonas/[slug]'>) {
  const { slug } = await params
  const zona = buscar(slug)
  if (!zona) notFound()

  const otras = zonas.filter((z) => z.slug !== zona.slug)
  const mensaje = mensajeZona(zona.nombre)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(zonaJsonLd(zona)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            migasJsonLd([
              { nombre: 'Inicio', ruta: rutas.home },
              { nombre: zona.nombre, ruta: rutas.zona(zona.slug) },
            ]),
          ),
        }}
      />

      <Migas items={[{ nombre: zona.nombre, ruta: rutas.zona(zona.slug) }]} />

      {/* ── Encabezado ──────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-papel-tenue to-white pb-14 pt-6 md:pb-20">
        <div className="contenedor">
          <p className="inline-flex items-center gap-1.5 rounded-full bg-acento-tenue px-3 py-1 text-sm font-semibold text-navy">
            <MapPin className="size-4 text-acento" aria-hidden="true" />
            {sitio.horario.textoCorto}
          </p>

          <h1 className="mt-4 max-w-3xl text-[2rem] font-semibold leading-[1.1] text-banda sm:text-5xl">
            {zona.h1}
          </h1>

          {zona.intro.map((parrafo) => (
            <p
              key={parrafo}
              className="mt-4 max-w-3xl text-base leading-relaxed text-tinta-suave sm:text-lg"
            >
              {parrafo}
            </p>
          ))}

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <BotonLlamar
              ubicacion="pagina-zona"
              tamano="grande"
              etiqueta="Llamar ahora"
              className="w-full sm:w-auto"
            />
            <BotonWhatsapp
              ubicacion="pagina-zona"
              tamano="grande"
              mensaje={mensaje}
              etiqueta="Escribir por WhatsApp"
              className="w-full sm:w-auto"
            />
          </div>
        </div>
      </section>

      {/* ── Particularidades de la zona ─────────────────────────────────── */}
      <section className="border-t border-borde bg-white py-14 md:py-20">
        <div className="contenedor">
          <h2 className="text-2xl font-bold text-banda sm:text-3xl">
            Qué se tapa más seguido en {zona.nombreEnFrase}
          </h2>
          <div className="max-w-3xl">
            <ListaConCheck items={zona.particularidades} />
          </div>
        </div>
      </section>

      {/* ── Localidades ─────────────────────────────────────────────────── */}
      <section className="sobre-oscuro bg-banda py-14 text-white md:py-20">
        <div className="contenedor">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Dónde llegamos en {zona.nombreEnFrase}
          </h2>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {zona.localidades.map((localidad) => (
              <li
                key={localidad}
                className="rounded-lg bg-white/10 px-3.5 py-2 text-sm font-medium"
              >
                {localidad}
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-2xl text-white/70">
            Si tu barrio no está en la lista, llamá igual: casi siempre llegamos.
          </p>
        </div>
      </section>

      {/* ── Servicios en esta zona ──────────────────────────────────────── */}
      <section className="border-t border-borde bg-papel-tenue py-14 md:py-20">
        <div className="contenedor">
          <h2 className="text-2xl font-bold text-banda sm:text-3xl">
            Servicios en {zona.nombreEnFrase}
          </h2>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {servicios.map((servicio) => (
              <li key={servicio.slug}>
                <Link
                  href={rutas.servicio(servicio.slug)}
                  className="group flex h-full items-start gap-4 rounded-2xl border border-borde bg-white p-5 transition-colors hover:border-acento"
                >
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-navy text-white">
                    <Icono nombre={servicio.icono} className="size-5" />
                  </span>
                  <span>
                    <span className="block font-bold text-navy">
                      {servicio.nombre}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-tinta-suave">
                      {servicio.resumen}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-12">
            <h2 className="text-xl font-bold text-banda">Otras zonas</h2>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {otras.map((otra) => (
                <li key={otra.slug}>
                  <Link
                    href={rutas.zona(otra.slug)}
                    className="group inline-flex items-center gap-1.5 rounded-lg border border-borde bg-white px-3.5 py-2 text-sm font-medium text-navy transition-colors hover:border-acento hover:text-acento"
                  >
                    Destapaciones en {otra.nombre}
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
        ubicacion="pagina-zona"
        mensajeWhatsapp={mensaje}
        titulo={`¿Tenés una urgencia en ${zona.nombreEnFrase}?`}
      />
    </>
  )
}
