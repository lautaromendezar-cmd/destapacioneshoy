# Destapaciones HOY — guía del proyecto

Sitio de **destapacioneshoy.com.ar**. Reemplaza al WordPress + Elementor anterior.

El tráfico viene de Google Ads y el objetivo del sitio es **uno solo: que llamen
o escriban por WhatsApp**. Cualquier cambio que no ayude a eso, sobra.

---

## Lo primero que hay que saber

**Todo el contenido está en un solo archivo: [`content/site.ts`](content/site.ts).**

Teléfono, WhatsApp, textos, servicios, zonas, FAQs, imágenes: todo sale de ahí.
Los componentes no tienen texto adentro, sólo leen. Cambiar el teléfono es
editar una línea.

```bash
npm run dev          # desarrollo en localhost:3000
npm run build        # build de producción (falla si hay error de tipos)
npm run verificar    # contraste + SEO, con el sitio corriendo
```

---

## Cómo hacer los cambios más comunes

### Cambiar el teléfono o el WhatsApp

`content/site.ts` → objeto `sitio`. Hay tres formatos y hay que tocar los tres:

```ts
telefono: {
  visible: '11 3163-5383',      // lo que se ve en pantalla
  link: '+541131635383',        // el href="tel:"
  e164: '+541131635383',        // el JSON-LD (schema.org pide E.164)
},
whatsapp: {
  numero: '541131635383',       // sin + ni espacios, como pide wa.me
  ...
}
```

El número aparece también en las `metaDescription` de cada servicio y zona:
buscá `3163` en el archivo y reemplazá todo.

### Cambiar un texto

Está en `content/site.ts`. Los nombres de los campos son literales: `hero.h1`,
`faqs[n].respuesta`, `servicios[n].sintomas`. Ningún componente tiene copy.

### Agregar un servicio

1. Agregá un objeto al array `servicios` de `content/site.ts`. El tipo
   `Servicio` obliga a completar todos los campos, así que si falta algo el
   build no pasa.
2. El `slug` es la URL: `/servicios/<slug>`. En minúsculas, con guiones, sin
   acentos ni ñ.
3. El `icono` tiene que ser uno de los nombres de `NombreIcono`. Para agregar
   uno nuevo: sumalo al tipo y mapealo a un ícono de lucide en
   [`src/components/ui/Icono.tsx`](src/components/ui/Icono.tsx).
4. El `metaTitle` tiene que entrar en **45 caracteres**: el layout le agrega
   `" | Destapaciones HOY"` y Google corta a los 65.
5. La `metaDescription`, en 165.

No hay que tocar nada más: la página, el sitemap, el JSON-LD, la tarjeta de
compartir y los links internos del footer y de las otras páginas salen solos
del array.

### Agregar una zona

Igual, en el array `zonas`. Lo único que hay que cuidar es que el texto sea
**distinto de verdad**, no la misma plantilla con el nombre cambiado: estas
páginas son landings de Google Ads y el Nivel de Calidad castiga el contenido
repetido. Cada zona cuenta qué se tapa más seguido ahí y por qué (raíces en
Zona Norte, napa alta en Zona Sur, pluviales en Oeste, columnas montantes en
CABA).

> Gran Buenos Aires **no tiene página propia a propósito**: es Norte + Oeste +
> Sur y su texto sería un refrito de los otros tres. Aparece en la cobertura y
> linkea a las tres páginas reales.

### Cambiar una foto

1. Poné el original en `_rescate/`.
2. Agregalo a la lista `fotos` de
   [`scripts/preparar-imagenes.mjs`](scripts/preparar-imagenes.mjs).
3. `node scripts/preparar-imagenes.mjs`.
4. Referenciala en `content/site.ts` con su `ancho` y `alto` reales (si no
   coinciden, la página salta al cargar).

El `alt` **no es opcional y no puede ser genérico**: describe qué se ve, en
castellano. Es lo que lee un lector de pantalla y lo que indexa Google
Imágenes.

---

## Estructura

```
content/site.ts            TODO el contenido. Es el archivo que se edita.
_rescate/                  originales del WordPress viejo (única copia que queda)
assets/                    Archivo-*.ttf — sólo para generar las tarjetas OG
scripts/
  preparar-imagenes.mjs    originales → /public/images + iconos. Se corre a mano.
  verificar-contraste.mjs  todos los pares de color contra WCAG AA
  verificar-seo.mjs        revisa el HTML servido de las 10 páginas
  capturar.mjs             capturas en mobile y desktop para mirar el resultado
src/
  app/
    layout.tsx             <html>, fuente, metadata base, JSON-LD del negocio
    page.tsx               home
    not-found.tsx          404 (con los mismos CTA)
    servicios/[slug]/      una página por servicio + su tarjeta OG
    zonas/[slug]/          una página por zona + su tarjeta OG
    opengraph-image.tsx    tarjeta de compartir de la home
    sitemap.ts robots.ts manifest.ts
    icon.png apple-icon.png favicon.ico   (generados, no editar a mano)
  components/
    layout/                Encabezado, PieDePagina, BarraFija
    secciones/             Hero, Servicios, PorQueElegirnos, Galeria, Zonas,
                           Pasos, Faq, CtaFinal, HeroImagen
    ui/                    Botones, Icono, Migas, ListaConCheck
    medicion/              Etiquetas (GTM/gtag) y MedidorDeClicks
  lib/
    env.ts                 lectura de variables de entorno
    rutas.ts               URLs, links de tel/WhatsApp, atributos de medición
    seo.ts                 armado de metadata
    jsonld.ts              datos estructurados
    og.tsx                 plantilla de las tarjetas de compartir
```

---

## Decisiones que conviene no deshacer sin leer esto

**Los botones son `<a>` sin `onClick`.** La medición la hace un único listener
delegado que lee `data-cta` y `data-ubicacion` (ver `datosCta()` en
`src/lib/rutas.ts`). Así los botones siguen siendo Server Components y cualquier
enlace nuevo queda medido sin tocar nada. Si algún día ponés un `onClick` en un
botón, vas a estar midiendo dos veces.

**El medidor es un `<script>` inline, no un componente cliente.** Con
`useEffect` el listener recién existe después de la hidratación, y el visitante
de este sitio llega con una urgencia: es exactamente el que toca "Llamar" en el
primer segundo. Esas llamadas no se medían.

**La foto del hero no pasa por `next/image`.** Es el único caso: en mobile se
muestra una franja horizontal y en desktop una columna vertical — dos recortes
distintos, o sea art direction, que se resuelve con `<picture>` + `<source
media>`. Alternar dos `<Image>` con clases de Tailwind **no funciona**:
`display:none` no evita la descarga y Next precarga los dos, así que el celular
bajaba 48 KB para mostrar 20. Ver `src/components/secciones/HeroImagen.tsx`.

**La animación de entrada mueve sólo el `transform`, nunca la opacidad.** Una
animación con `opacity: 0` y `fill: both` deja el contenido invisible apenas el
timeline queda degenerado (pasa en la captura de página completa de Chrome y en
cualquier viewport tan alto como el documento). Acá lo peor que puede pasar es
que algo quede corrido 12px.

**El acento es `#0a6cc2` y no el `#006EC4` del logo.** Con el color exacto de la
gota, el texto azul sobre los fondos tintados daba 4.10:1 y no llegaba al 4.5
que pide AA. `npm run verificar` lo comprueba.

**El logo "blanco" del cliente no sirve sobre fondo oscuro**: tiene el "HOY" en
navy y desaparece. El footer usa
`logo-destapaciones-hoy-fondo-oscuro.webp`, generado repintando esos píxeles.

**El sitio no tiene modo oscuro** y no tiene menú de navegación. En una urgencia
un menú es una forma de perder la llamada.

---

## Medición (Google Ads)

Variables de entorno, todas opcionales. **Sin ninguna, el sitio funciona igual
y no tira errores.**

| Variable | Para qué |
|---|---|
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager, ej. `GTM-XXXXXXX` |
| `NEXT_PUBLIC_GADS_ID` | Google Ads directo, ej. `AW-123456789`. **Sólo si no se usa GTM** |
| `NEXT_PUBLIC_GADS_LABEL_LLAMADA` | label de la conversión de llamada |
| `NEXT_PUBLIC_GADS_LABEL_WHATSAPP` | label de la conversión de WhatsApp |

Cada click en un `tel:` o en WhatsApp empuja al `dataLayer`:

```js
{ event: 'click_llamada',  ubicacion_boton: 'hero',  pagina: '/zonas/caba' }
{ event: 'click_whatsapp', ubicacion_boton: 'footer', pagina: '/' }
```

`ubicacion_boton` sale del `data-ubicacion` del enlace: `header`, `hero`,
`barra-fija`, `boton-flotante`, `por-que-elegirnos`, `cta-final`, `footer`,
`pagina-servicio`, `pagina-zona`, `pagina-404`. Sirve para ver en Ads qué botón
convierte y desde qué landing.

> Si una variable queda **definida pero vacía** en Vercel, `??` no la atrapa.
> Por eso todo pasa por `leer()` en `src/lib/env.ts`, que recorta y devuelve
> `null`.

---

## Desplegar

El sitio es 100% estático (SSG): las 10 páginas se generan en el build. No hay
base de datos, ni CMS, ni backend.

```bash
npm run build        # tiene que pasar sin errores antes de commitear
git add -A && git commit -m "..."
git push             # Vercel despliega solo al pushear a main
```

Después de un cambio grande, conviene mirar el resultado en vez de suponerlo:

```bash
npx next start -p 3210
node scripts/capturar.mjs          # deja PNG en _capturas/
node scripts/verificar-seo.mjs     # revisa el HTML de las 10 páginas
```

> Si Vercel dejó de desplegar al pushear, no es caché: el webhook se cae sin
> avisar. Se confirma con `vercel ls`.

---

## Reglas de contenido

**No inventar.** Nada de reseñas, cantidad de clientes, años de experiencia,
certificaciones, precios ni tiempos de llegada que el cliente no haya
confirmado. Donde falta un dato hay un comentario
`// TODO: confirmar con el cliente` en `content/site.ts`; buscalos con:

```bash
grep -n "TODO: confirmar" content/site.ts
```

Cada uno de esos TODO es una pregunta concreta que, respondida, hace que el
sitio convierta más. El de precio y el de tiempo de llegada son los que más
pesan: son lo primero que pregunta alguien con un caño tapado.
