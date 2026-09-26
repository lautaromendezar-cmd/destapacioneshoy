import {
  ArrowDownToLine,
  Building2,
  Clock,
  CloudRain,
  CookingPot,
  House,
  MapPin,
  ScanSearch,
  Phone,
  ShieldCheck,
  Truck,
  Waves,
  Wrench,
} from 'lucide-react'
import type { NombreIcono } from '@contenido'

/**
 * Traduce el nombre de ícono que viene de content/site.ts a un SVG.
 *
 * Son Server Components: lucide se resuelve en el build y al navegador le
 * llega SVG inline, sin un kilobyte de JavaScript.
 *
 * WhatsApp no está en lucide (no tiene marcas). Va el path oficial de
 * Simple Icons, que es el glifo real y no un globito de chat genérico.
 */

const MAPA = {
  cloaca: Waves,
  cocina: CookingPot,
  lluvia: CloudRain,
  edificio: Building2,
  bomba: ArrowDownToLine,
  reloj: Clock,
  herramienta: Wrench,
  escudo: ShieldCheck,
  sinRoturas: House,
  mapa: MapPin,
  telefono: Phone,
  camion: Truck,
  camara: ScanSearch,
} as const

export function Icono({
  nombre,
  className,
}: {
  nombre: NombreIcono
  className?: string
}) {
  const Glifo = MAPA[nombre]
  return <Glifo className={className} strokeWidth={1.75} aria-hidden="true" />
}

/** Glifo oficial de WhatsApp (Simple Icons). */
export function IconoWhatsapp({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

/**
 * El tilde dentro de un círculo relleno con el que el cliente lista cosas en
 * todo su sitio. En WordPress era el `check-circle` sólido de Font Awesome;
 * acá va el mismo glifo como path, para no cargar una familia de íconos
 * entera por una sola forma.
 */
export function TildeCirculo({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 512 512"
      aria-hidden="true"
      focusable="false"
      className={`shrink-0 fill-current ${className}`}
    >
      <path d="M504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zM227.3 387.3l184-184c6.2-6.2 6.2-16.4 0-22.6l-22.6-22.6c-6.2-6.2-16.4-6.2-22.6 0L216 308.1l-70.1-70.1c-6.2-6.2-16.4-6.2-22.6 0l-22.6 22.6c-6.2 6.2-6.2 16.4 0 22.6l104 104c6.2 6.2 16.4 6.2 22.6 0z" />
    </svg>
  )
}
