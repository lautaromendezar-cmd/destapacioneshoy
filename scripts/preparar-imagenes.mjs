/**
 * Convierte los originales rescatados de WordPress (_rescate/) a los assets
 * definitivos de /public/images y a los iconos de la app.
 *
 * Se corre a mano, una sola vez:  node scripts/preparar-imagenes.mjs
 * No forma parte del build. Los originales quedan intactos en _rescate/.
 */
import sharp from 'sharp'
import { mkdir, stat, writeFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..')
const ORIGEN = join(RAIZ, '_rescate')
const IMAGENES = join(RAIZ, 'public', 'images')
const APP = join(RAIZ, 'src', 'app')

const NAVY = { r: 6, g: 47, b: 94 } // #062F5E — el "HOY" del logo
const AZUL_CLARO = { r: 74, g: 163, b: 227 } // #4AA3E3 — reemplazo legible sobre fondo oscuro

await mkdir(IMAGENES, { recursive: true })

const hecho = []
// Mide el archivo en disco y no con sharp, que no sabe leer .ico.
const registrar = async (ruta) => {
  const { size } = await stat(ruta)
  hecho.push({ ruta: ruta.replace(RAIZ, '').replace(/\\/g, '/'), kb: Math.round(size / 1024) })
}

/* ── 1. Fotos de trabajos ───────────────────────────────────────────────── */

const fotos = [
  // [origen, destino, ancho máximo, calidad]
  ['1005.png', 'tecnico-destapando-con-maquina', 1080, 74],
  ['3c79ddc4-d8ee-4870-a554-4ae89f060ff6.jpeg', 'maquina-destapadora-en-cocina', 720, 74],
  ['destapacion-de-canerias.jpg', 'camara-inspeccion-canerias-destapada', 1100, 74],
  ['3bf11bdc-187a-4e06-b20e-2f3e3358141c.jpeg', 'boca-desagote-cloacal-destapada', 899, 74],
  ['ab7a004e-3944-4db4-96d4-09891ad5eca5.jpeg', 'rejillas-desagote-piso-destapadas', 1400, 74],
  ['1a0a1a1f-2f59-479d-8fdc-50438e1b2a7c.jpeg', 'desague-bano-destapado', 720, 74],
]

for (const [origen, destino, ancho, calidad] of fotos) {
  const salida = join(IMAGENES, `${destino}.webp`)
  await sharp(join(ORIGEN, origen))
    .rotate() // respeta el EXIF de las fotos de celular
    .resize({ width: ancho, withoutEnlargement: true })
    .webp({ quality: calidad, effort: 6 })
    .toFile(salida)
  await registrar(salida)
}

/**
 * Hero: dos recortes distintos, cada uno en varios anchos.
 *
 * El hero es el LCP del sitio, así que es el único lugar donde no se usa
 * next/image: hace falta <picture> con <source media> para que el navegador
 * baje UN solo archivo. Con next/image y dos <Image> alternados por CSS se
 * bajaban los dos (display:none no evita la descarga, y encima Next precarga
 * ambos): 48 KB en el celular para mostrar 20.
 *
 * En mobile se ve una franja de 176px de alto; en desktop, una columna 4:5.
 */
{
  const origen = join(ORIGEN, '1005.png')
  const { width, height } = await sharp(origen).metadata()

  // Franja de mobile: la banda de la foto donde están la mano y la máquina.
  const altoTira = Math.round(height * 0.29)
  const arribaTira = Math.round((height - altoTira) * 0.62)
  for (const ancho of [480, 768, 1080]) {
    const salida = join(IMAGENES, `hero-tira-${ancho}.webp`)
    await sharp(origen)
      .extract({ left: 0, top: arribaTira, width, height: altoTira })
      .resize({ width: ancho, withoutEnlargement: true })
      .webp({ quality: 74, effort: 6 })
      .toFile(salida)
    await registrar(salida)
  }

  // Columna de desktop: 4:5 desde arriba (el único encuadre que no corta la
  // cabeza; se compararon los recortes antes de elegirlo).
  const altoCol = Math.round(width * 5 / 4)
  for (const ancho of [400, 560, 800, 1120]) {
    const salida = join(IMAGENES, `hero-columna-${ancho}.webp`)
    await sharp(origen)
      .extract({ left: 0, top: 0, width, height: Math.min(altoCol, height) })
      .resize({ width: ancho, withoutEnlargement: true })
      .webp({ quality: 74, effort: 6 })
      .toFile(salida)
    await registrar(salida)
  }
}

/* ── 2. Logos ───────────────────────────────────────────────────────────── */

// Sólo el logo a color: el "blanco" del cliente no se usa en el sitio (tiene
// el "HOY" en navy y desaparece sobre fondo oscuro). Su original queda
// guardado en _rescate/ y de él sale la variante para fondo oscuro, abajo.
const logos = [['LOGO-DESTAPACIONES-HOY.png', 'logo-destapaciones-hoy']]

for (const [origen, destino] of logos) {
  // El PNG se conserva (pedido explícito) y además se emite WebP.
  const png = join(IMAGENES, `${destino}.png`)
  await sharp(join(ORIGEN, origen)).png({ compressionLevel: 9 }).toFile(png)
  await registrar(png)

  const webp = join(IMAGENES, `${destino}.webp`)
  await sharp(join(ORIGEN, origen)).webp({ quality: 90, effort: 6 }).toFile(webp)
  await registrar(webp)
}

/**
 * El logo "blanco" del cliente tiene el "HOY" en NAVY (#062F5E): sobre un
 * footer navy queda invisible. Generamos una variante para fondo oscuro
 * repintando esos píxeles de azul claro y dejando el resto tal cual.
 */
const { data, info } = await sharp(join(ORIGEN, 'LOGO-DESTAPACIONES-HOY-blanco.png'))
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true })

const cerca = (a, b, tol = 60) =>
  Math.abs(a.r - b.r) < tol && Math.abs(a.g - b.g) < tol && Math.abs(a.b - b.b) < tol

for (let i = 0; i < data.length; i += info.channels) {
  const px = { r: data[i], g: data[i + 1], b: data[i + 2] }
  const alfa = data[i + 3]
  if (alfa > 20 && cerca(px, NAVY)) {
    data[i] = AZUL_CLARO.r
    data[i + 1] = AZUL_CLARO.g
    data[i + 2] = AZUL_CLARO.b
  }
}

const oscuroPng = join(IMAGENES, 'logo-destapaciones-hoy-fondo-oscuro.png')
await sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels } })
  .png({ compressionLevel: 9 })
  .toFile(oscuroPng)
await registrar(oscuroPng)

const oscuroWebp = join(IMAGENES, 'logo-destapaciones-hoy-fondo-oscuro.webp')
await sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels } })
  .webp({ quality: 90, effort: 6 })
  .toFile(oscuroWebp)
await registrar(oscuroWebp)

/* ── 3. Iconos de la app ────────────────────────────────────────────────── */

/**
 * El favicon del cliente es el logo entero aplastado en un cuadrado: a 32 px
 * no se lee nada. Armamos uno con el isotipo (el sifón + la gota) centrado
 * sobre el navy de marca.
 */
// Recorte de la curva del sifón + la gota. El sifón entero (146x306) es
// demasiado angosto: a 32 px queda una astilla. La U llena el cuadrado y se
// lee incluso a 16 px (verificado con hoja de contacto).
const ISO = { left: 33, top: 140, width: 146, height: 222 }

const isotipo = await sharp(join(ORIGEN, 'LOGO-DESTAPACIONES-HOY-blanco.png'))
  .extract(ISO)
  .toBuffer()

const icono = async (lado, padding) => {
  const interior = lado - padding * 2
  const iso = await sharp(isotipo)
    .resize({ width: interior, height: interior, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer()
  return sharp({
    create: { width: lado, height: lado, channels: 4, background: { r: 6, g: 26, b: 46, alpha: 1 } },
  })
    .composite([{ input: iso, top: padding, left: padding }])
    .png({ compressionLevel: 9 })
    .toBuffer()
}

await writeFile(join(APP, 'icon.png'), await icono(512, 51))
await registrar(join(APP, 'icon.png'))

await writeFile(join(APP, 'apple-icon.png'), await icono(180, 18))
await registrar(join(APP, 'apple-icon.png'))

await writeFile(join(IMAGENES, 'icono-192.png'), await icono(192, 19))
await registrar(join(IMAGENES, 'icono-192.png'))

await writeFile(join(IMAGENES, 'icono-512.png'), await icono(512, 51))
await registrar(join(IMAGENES, 'icono-512.png'))

/**
 * favicon.ico: create-next-app deja el de Next.js (26 KB) y, como
 * /favicon.ico tiene prioridad sobre icon.png, es el que se ve en la pestaña.
 *
 * sharp no escribe ICO, pero el formato admite entradas en PNG: alcanza con
 * armar la cabecera a mano (ICONDIR + una ICONDIRENTRY por tamaño).
 */
const ico = async (lados) => {
  const pngs = await Promise.all(lados.map((l) => icono(l, Math.round(l * 0.1))))
  const cabecera = Buffer.alloc(6 + 16 * lados.length)
  cabecera.writeUInt16LE(0, 0) // reservado
  cabecera.writeUInt16LE(1, 2) // tipo: 1 = icono
  cabecera.writeUInt16LE(lados.length, 4)

  let desplazamiento = cabecera.length
  lados.forEach((lado, i) => {
    const base = 6 + 16 * i
    cabecera.writeUInt8(lado >= 256 ? 0 : lado, base) // 0 significa 256
    cabecera.writeUInt8(lado >= 256 ? 0 : lado, base + 1)
    cabecera.writeUInt8(0, base + 2) // paleta
    cabecera.writeUInt8(0, base + 3) // reservado
    cabecera.writeUInt16LE(1, base + 4) // planos
    cabecera.writeUInt16LE(32, base + 6) // bits por píxel
    cabecera.writeUInt32LE(pngs[i].length, base + 8)
    cabecera.writeUInt32LE(desplazamiento, base + 12)
    desplazamiento += pngs[i].length
  })

  return Buffer.concat([cabecera, ...pngs])
}

await writeFile(join(APP, 'favicon.ico'), await ico([16, 32, 48]))
await registrar(join(APP, 'favicon.ico'))

/* ── Resumen ────────────────────────────────────────────────────────────── */

console.log('\nAssets generados:\n')
for (const { ruta, kb } of hecho) console.log(`  ${String(kb).padStart(5)} KB  ${ruta}`)
console.log(`\n  total: ${hecho.reduce((a, b) => a + b.kb, 0)} KB en ${hecho.length} archivos\n`)
