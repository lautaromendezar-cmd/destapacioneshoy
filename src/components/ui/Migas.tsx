import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { rutas } from '@/lib/rutas'

export interface Miga {
  nombre: string
  ruta: string
}

/** Migas de pan. El último elemento es la página actual y no lleva enlace. */
export function Migas({ items }: { items: Miga[] }) {
  const todas: Miga[] = [{ nombre: 'Inicio', ruta: rutas.home }, ...items]

  return (
    <nav aria-label="Migas de pan" className="contenedor pt-5">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-tinta-suave">
        {todas.map((miga, i) => {
          const esUltima = i === todas.length - 1
          return (
            <li key={miga.ruta} className="flex items-center gap-1.5">
              {i > 0 && (
                <ChevronRight
                  className="size-3.5 shrink-0 text-tinta-suave/60"
                  aria-hidden="true"
                />
              )}
              {esUltima ? (
                <span aria-current="page" className="font-medium text-navy">
                  {miga.nombre}
                </span>
              ) : (
                <Link
                  href={miga.ruta}
                  className="underline-offset-4 hover:text-acento hover:underline"
                >
                  {miga.nombre}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
