/**
 * La foto a sangre que va detrás del título, la misma que el cliente ya tenía
 * en el hero de su WordPress (se bajó de su server; el original está en
 * _rescate/hero-fondo-original.jpg).
 *
 * Igual que HeroImagen, no pasa por next/image y por el mismo motivo: son dos
 * encuadres distintos, apaisado en desktop y vertical en mobile, y eso es art
 * direction — se resuelve con <picture> + <source media>, que next/image no
 * expone. Ver [reference_next_image_sin_art_direction] y CLAUDE.md.
 *
 * `alt=""` a propósito: es decoración. Lo que hay que leer es el H1 que va
 * encima, y el sitio ya tiene fotos del trabajo real más abajo con alt propio.
 */
export function HeroFondo() {
  return (
    <picture>
      <source
        media="(max-width: 767px)"
        type="image/webp"
        srcSet="/images/hero-fondo-alto-480.webp 480w, /images/hero-fondo-alto-720.webp 720w"
        sizes="100vw"
      />
      <source
        media="(min-width: 768px)"
        type="image/webp"
        srcSet="/images/hero-fondo-ancho-768.webp 768w, /images/hero-fondo-ancho-1152.webp 1152w, /images/hero-fondo-ancho-1376.webp 1376w"
        sizes="100vw"
      />
      <img
        src="/images/hero-fondo-ancho-1376.webp"
        alt=""
        aria-hidden="true"
        width={1376}
        height={768}
        // Está detrás del H1, así que es el LCP: se baja primero y sin esperar.
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 size-full object-cover object-center"
      />
    </picture>
  )
}
