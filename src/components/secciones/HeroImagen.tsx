import { hero } from '@contenido'

/**
 * La foto del hero. Es el único <img> del sitio que no pasa por next/image.
 *
 * Motivo: en mobile se muestra una franja horizontal y en desktop una columna
 * vertical — dos recortes distintos de la misma foto, no el mismo archivo con
 * otro encuadre. Eso es art direction y se resuelve con <picture> + <source
 * media>, que next/image no expone. Alternar dos <Image> con clases de Tailwind
 * no sirve: display:none no evita la descarga y Next precarga los dos, así que
 * el celular bajaba 48 KB para mostrar 20.
 *
 * Los archivos salen ya recortados y en varios anchos de
 * scripts/preparar-imagenes.mjs, así que no hace falta optimizador en runtime.
 *
 * El <img> lleva el tamaño del recorte de desktop porque es el que queda
 * cuando ninguna <source> aplica; width/height evitan el salto de layout.
 */
export function HeroImagen({ className }: { className?: string }) {
  return (
    <picture>
      <source
        media="(max-width: 767px)"
        type="image/webp"
        srcSet="/images/hero-tira-480.webp 480w, /images/hero-tira-768.webp 768w, /images/hero-tira-1080.webp 1080w"
        sizes="100vw"
        width={1080}
        height={557}
      />
      <source
        media="(min-width: 768px)"
        type="image/webp"
        srcSet="/images/hero-columna-400.webp 400w, /images/hero-columna-560.webp 560w, /images/hero-columna-800.webp 800w, /images/hero-columna-1120.webp 1120w"
        sizes="(min-width: 1024px) 34rem, 45vw"
        width={1080}
        height={1350}
      />
      <img
        src="/images/hero-columna-560.webp"
        alt={hero.imagen.alt}
        width={1080}
        height={1350}
        // El LCP en las dos medidas: eager y con prioridad alta.
        fetchPriority="high"
        decoding="async"
        className={className}
      />
    </picture>
  )
}
