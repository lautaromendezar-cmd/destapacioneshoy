/**
 * Capturas del sitio corriendo, para mirar el resultado en vez de suponerlo.
 *
 *   npx next start -p 3210
 *   node scripts/capturar.mjs
 *
 * Deja los PNG en la carpeta que se pase como argumento (o ./_capturas).
 */
import puppeteer from 'puppeteer-core'
import { mkdir } from 'node:fs/promises'

const BASE = process.env.BASE ?? 'http://localhost:3210'
const SALIDA = process.argv[2] ?? '_capturas'
const CHROME =
  process.env.CHROME ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe'

const VISTAS = [
  // [nombre, ancho, alto, ruta, pantallaCompleta]
  ['mobile-home-fold', 360, 640, '/', false],
  ['mobile-home-completa', 360, 800, '/', true],
  ['mobile-zona', 360, 800, '/zonas/zona-norte', true],
  ['mobile-servicio', 360, 800, '/servicios/destapacion-de-cloacas', true],
  ['desktop-home-fold', 1440, 900, '/', false],
  ['desktop-home-completa', 1440, 900, '/', true],
  ['desktop-servicio', 1440, 900, '/servicios/desagote-de-sotanos-con-bomba', true],
  ['desktop-zona', 1440, 900, '/zonas/caba', true],
  ['desktop-404', 1440, 900, '/no-existe', false],
]

await mkdir(SALIDA, { recursive: true })

const navegador = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'shell',
  args: ['--hide-scrollbars', '--force-device-scale-factor=1'],
})

for (const [nombre, ancho, alto, ruta, completa] of VISTAS) {
  const pagina = await navegador.newPage()
  await pagina.setViewport({
    width: ancho,
    height: alto,
    deviceScaleFactor: 2,
    isMobile: ancho < 600,
    hasTouch: ancho < 600,
  })
  await pagina.goto(`${BASE}${ruta}`, { waitUntil: 'networkidle0', timeout: 60000 })
  // Las imágenes lazy no cargan si no se recorre la página.
  if (completa) {
    await pagina.evaluate(async () => {
      await new Promise((listo) => {
        let y = 0
        const paso = () => {
          window.scrollBy(0, window.innerHeight)
          y += window.innerHeight
          if (y < document.body.scrollHeight) setTimeout(paso, 90)
          else {
            window.scrollTo(0, 0)
            setTimeout(listo, 350)
          }
        }
        paso()
      })
    })
    // Sin esto, las lazy que entraron en pantalla durante el barrido salen
    // en negro: el scroll dispara la carga pero la captura no la espera.
    // Con tope de tiempo: una lazy que quedó fuera de pantalla nunca resuelve
    // su promesa y dejaba la captura colgada.
    await pagina.evaluate(async () => {
      const tope = (promesa, ms) =>
        Promise.race([promesa, new Promise((ok) => setTimeout(ok, ms))])
      await tope(
        Promise.all(
          [...document.images]
            .filter((i) => !i.complete)
            .map((i) => new Promise((ok) => {
              i.addEventListener('load', ok, { once: true })
              i.addEventListener('error', ok, { once: true })
            })),
        ),
        8000,
      )
      await tope(
        Promise.all([...document.images].map((i) => i.decode().catch(() => {}))),
        4000,
      )
    })
  }

  await pagina.screenshot({
    path: `${SALIDA}/${nombre}.png`,
    fullPage: completa,
  })
  console.log(`  ${nombre}.png  (${ancho}x${alto}${completa ? ', completa' : ''})`)
  await pagina.close()
}

await navegador.close()
console.log(`\n  capturas en ${SALIDA}/\n`)
