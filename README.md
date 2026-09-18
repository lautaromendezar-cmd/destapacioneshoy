# Destapaciones HOY

Sitio de [destapacioneshoy.com.ar](https://destapacioneshoy.com.ar) — destapaciones
cloacales y pluviales 24 hs en CABA y Provincia de Buenos Aires.

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · 100% estático · Vercel.

## Arrancar

```bash
npm install
npm run dev
```

## Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | desarrollo en `localhost:3000` |
| `npm run build` | build de producción |
| `npm run start` | sirve el build |
| `npm run lint` | ESLint |
| `npm run verificar` | contraste WCAG + SEO (necesita el sitio corriendo) |
| `npm run capturar` | capturas mobile/desktop en `_capturas/` |
| `npm run imagenes` | regenera `/public/images` desde `_rescate/` |

## Dónde se edita el contenido

Todo en **[`content/site.ts`](content/site.ts)**: teléfono, WhatsApp, textos,
servicios, zonas, preguntas frecuentes e imágenes.

La guía completa —cómo agregar una zona o un servicio, cómo cambiar una foto,
qué decisiones no conviene deshacer— está en **[CLAUDE.md](CLAUDE.md)**.

## Variables de entorno

Todas opcionales; sin ninguna el sitio funciona igual.

```
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_GADS_ID=
NEXT_PUBLIC_GADS_LABEL_LLAMADA=
NEXT_PUBLIC_GADS_LABEL_WHATSAPP=
```

## Desarrollo web

[Lautaro Mendez](https://lautaromendez.com.ar)
