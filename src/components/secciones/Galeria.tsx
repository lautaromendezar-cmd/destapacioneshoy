'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { galeria } from '@contenido'

/**
 * Galería con visor.
 *
 * El visor es un <dialog> nativo: el foco atrapado, el cierre con Escape y el
 * fondo inerte los pone el navegador. Una librería de lightbox para seis fotos
 * son 20 KB de JavaScript para algo que el HTML ya sabe hacer.
 *
 * Las miniaturas cargan lazy — están bien abajo del primer scroll.
 */
export function Galeria() {
  const [abierta, setAbierta] = useState<number | null>(null)
  const dialogo = useRef<HTMLDialogElement>(null)

  const total = galeria.fotos.length

  const mover = useCallback(
    (delta: number) => setAbierta((i) => (i === null ? null : (i + delta + total) % total)),
    [total],
  )

  useEffect(() => {
    const el = dialogo.current
    if (!el) return
    if (abierta !== null && !el.open) el.showModal()
    if (abierta === null && el.open) el.close()
  }, [abierta])

  useEffect(() => {
    if (abierta === null) return
    function alTeclear(e: KeyboardEvent) {
      if (e.key === 'ArrowRight') mover(1)
      if (e.key === 'ArrowLeft') mover(-1)
    }
    window.addEventListener('keydown', alTeclear)
    return () => window.removeEventListener('keydown', alTeclear)
  }, [abierta, mover])

  const foto = abierta === null ? null : galeria.fotos[abierta]

  return (
    <section
      aria-labelledby="titulo-galeria"
      className="border-t border-borde bg-papel-tenue py-16 md:py-24"
    >
      <div className="contenedor">
        <div className="max-w-2xl">
          <h2
            id="titulo-galeria"
            className="text-3xl font-extrabold text-navy sm:text-4xl"
          >
            {galeria.titulo}
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-tinta-suave">
            {galeria.bajada}
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {galeria.fotos.map((f, i) => (
            <li key={f.src} className="aparece">
              <button
                type="button"
                onClick={() => setAbierta(i)}
                className="group block w-full overflow-hidden rounded-xl bg-navy-900"
              >
                <span className="sr-only">Ampliar foto: {f.alt}</span>
                <Image
                  src={f.src}
                  alt={f.alt}
                  width={f.ancho}
                  height={f.alto}
                  loading="lazy"
                  sizes="(min-width: 640px) 22rem, 45vw"
                  className="aspect-4/3 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <dialog
        ref={dialogo}
        onClose={() => setAbierta(null)}
        onClick={(e) => {
          // Click sobre el backdrop (el <dialog> mismo) cierra.
          if (e.target === dialogo.current) setAbierta(null)
        }}
        aria-label="Foto ampliada"
        className="max-h-[92dvh] max-w-[95vw] bg-transparent p-0 backdrop:bg-navy-900/85 sm:max-w-3xl"
      >
        {foto && (
          <div className="relative">
            <Image
              src={foto.src}
              alt={foto.alt}
              width={foto.ancho}
              height={foto.alto}
              sizes="(min-width: 640px) 48rem, 95vw"
              className="max-h-[78dvh] w-auto rounded-lg object-contain"
            />

            <p className="mt-3 px-1 text-sm text-white">{foto.alt}</p>

            <button
              type="button"
              onClick={() => setAbierta(null)}
              aria-label="Cerrar"
              className="absolute right-2 top-2 flex size-11 items-center justify-center rounded-full bg-navy-900/80 text-white hover:bg-navy-900"
            >
              <X className="size-6" aria-hidden="true" />
            </button>

            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => mover(-1)}
                  aria-label="Foto anterior"
                  className="absolute left-2 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-navy-900/80 text-white hover:bg-navy-900"
                >
                  <ChevronLeft className="size-6" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => mover(1)}
                  aria-label="Foto siguiente"
                  className="absolute right-2 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-navy-900/80 text-white hover:bg-navy-900"
                >
                  <ChevronRight className="size-6" aria-hidden="true" />
                </button>
              </>
            )}
          </div>
        )}
      </dialog>
    </section>
  )
}
