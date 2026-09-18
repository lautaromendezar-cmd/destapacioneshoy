/**
 * Revisa el HTML realmente servido de todas las páginas.
 *
 *   npx next build && npx next start -p 3210
 *   node scripts/verificar-seo.mjs
 *
 * Chequea lo que se rompe callado: un H1 de más, un canonical relativo, un
 * title duplicado entre dos páginas, un alt vacío, un JSON-LD inválido.
 */

const BASE = process.env.BASE ?? 'http://localhost:3210'

const rutas = [
  '/',
  '/servicios/destapacion-de-cloacas',
  '/servicios/destapacion-de-cocinas-lavaderos-y-banos',
  '/servicios/destapacion-de-pluviales-patios-y-terrazas',
  '/servicios/destapaciones-para-edificios-locales-y-comercios',
  '/servicios/desagote-de-sotanos-con-bomba',
  '/zonas/caba',
  '/zonas/zona-norte',
  '/zonas/zona-oeste',
  '/zonas/zona-sur',
]

const problemas = []
const titulos = new Map()
const descripciones = new Map()

const sacar = (html, re) => [...html.matchAll(re)].map((m) => m[1])

for (const ruta of rutas) {
  const res = await fetch(BASE + ruta)
  const html = await res.text()
  const donde = (t) => problemas.push(`${ruta} — ${t}`)

  if (res.status !== 200) donde(`status ${res.status}`)

  // ── Un solo H1 ──────────────────────────────────────────────────────────
  const h1 = sacar(html, /<h1[^>]*>([\s\S]*?)<\/h1>/g)
  if (h1.length !== 1) donde(`tiene ${h1.length} <h1> (debe haber exactamente 1)`)

  // ── Jerarquía de headings sin saltos ────────────────────────────────────
  const niveles = sacar(html, /<h([1-6])[^>]*>/g).map(Number)
  for (let i = 1; i < niveles.length; i++) {
    if (niveles[i] - niveles[i - 1] > 1) {
      donde(`salto de heading h${niveles[i - 1]} → h${niveles[i]}`)
      break
    }
  }

  // ── Title y description únicos, y de largo razonable ────────────────────
  const title = sacar(html, /<title>([\s\S]*?)<\/title>/g)[0] ?? ''
  const desc =
    sacar(html, /<meta name="description" content="([^"]*)"/g)[0] ?? ''

  if (!title) donde('sin <title>')
  if (title.length > 65) donde(`title de ${title.length} caracteres (>65, se corta)`)
  if (!desc) donde('sin meta description')
  if (desc.length > 165) donde(`description de ${desc.length} caracteres (>165)`)
  if (titulos.has(title)) donde(`title repetido con ${titulos.get(title)}`)
  titulos.set(title, ruta)
  if (descripciones.has(desc)) donde(`description repetida con ${descripciones.get(desc)}`)
  descripciones.set(desc, ruta)

  // ── Canonical absoluto y apuntando a esta ruta ──────────────────────────
  const canonical = sacar(html, /<link rel="canonical" href="([^"]*)"/g)[0]
  if (!canonical) donde('sin canonical')
  else {
    if (!canonical.startsWith('https://')) donde(`canonical no absoluto: ${canonical}`)
    const esperado = ruta === '/' ? '' : ruta
    if (!canonical.endsWith(esperado)) donde(`canonical apunta a ${canonical}`)
  }

  // ── Open Graph en es_AR ─────────────────────────────────────────────────
  const locale = sacar(html, /<meta property="og:locale" content="([^"]*)"/g)[0]
  if (locale !== 'es_AR') donde(`og:locale = ${locale ?? 'ausente'} (debe ser es_AR)`)
  if (!html.includes('property="og:title"')) donde('sin og:title')
  if (!html.includes('property="og:image"')) donde('sin og:image')

  // ── lang del documento ──────────────────────────────────────────────────
  if (!/<html[^>]*lang="es-AR"/.test(html)) donde('el <html> no declara lang="es-AR"')

  // ── Imágenes con alt descriptivo ────────────────────────────────────────
  const imgs = [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0])
  for (const img of imgs) {
    const alt = /alt="([^"]*)"/.exec(img)?.[1]
    if (alt === undefined) donde(`<img> sin alt: ${img.slice(0, 70)}`)
    else if (alt.trim().length < 5) donde(`alt muy corto ("${alt}")`)
  }

  // ── JSON-LD parseable ───────────────────────────────────────────────────
  const bloques = sacar(
    html,
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
  )
  if (bloques.length === 0) donde('sin JSON-LD')
  for (const bloque of bloques) {
    try {
      const dato = JSON.parse(bloque)
      if (!dato['@context'] || !dato['@type']) donde('JSON-LD sin @context/@type')
    } catch (e) {
      donde(`JSON-LD inválido: ${String(e).slice(0, 60)}`)
    }
  }

  const tipos = bloques
    .map((b) => {
      try {
        return JSON.parse(b)['@type']
      } catch {
        return null
      }
    })
    .filter(Boolean)

  console.log(
    `  ${ruta.padEnd(58)} h1:${h1.length}  ld:[${tipos.join(', ')}]`,
  )
}

// ── sitemap y robots ──────────────────────────────────────────────────────
const sitemap = await (await fetch(BASE + '/sitemap.xml')).text()
const enSitemap = [...sitemap.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1])
console.log(`\n  sitemap.xml: ${enSitemap.length} URLs`)
for (const ruta of rutas) {
  if (!enSitemap.some((u) => new URL(u).pathname === ruta)) {
    problemas.push(`sitemap.xml no incluye ${ruta}`)
  }
}

const robots = await (await fetch(BASE + '/robots.txt')).text()
if (!robots.includes('Sitemap:')) problemas.push('robots.txt no declara el Sitemap')
console.log(`  robots.txt: ${robots.split('\n').filter(Boolean).length} líneas`)

// ── Redirects de WordPress ────────────────────────────────────────────────
const viejas = ['/feed', '/wp-admin', '/wp-login.php', '/xmlrpc.php', '/sample-page', '/category/algo']
console.log('')
for (const vieja of viejas) {
  const r = await fetch(BASE + vieja, { redirect: 'manual' })
  const ok = r.status === 301 || r.status === 308
  console.log(`  ${vieja.padEnd(20)} → ${r.status} ${ok ? '' : '  ← no redirige'}`)
  if (!ok) problemas.push(`${vieja} devuelve ${r.status} en vez de 301/308`)
}

console.log('')
if (problemas.length) {
  console.error(`  ${problemas.length} problema(s):\n`)
  problemas.forEach((p) => console.error('   · ' + p))
  process.exit(1)
}
console.log(`  Sin problemas en ${rutas.length} páginas.\n`)
