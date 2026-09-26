/**
 * Verifica el contraste de todos los pares texto/fondo y de los elementos de
 * interfaz contra WCAG 2.1 AA.
 *
 *   node scripts/verificar-contraste.mjs
 *
 * Corre sin navegador: son los tokens de globals.css, calculados. El objetivo
 * es que no haya que discutir un color a ojo — o pasa el número o no pasa.
 *
 *   AA texto normal .... 4.5:1
 *   AA texto grande .... 3.0:1   (>=24px, o >=18.66px en bold)
 *   AA no textual ...... 3.0:1   (bordes de botones, íconos, foco)
 */

const T = {
  navy: '#062f5e',
  navy900: '#071a2e',
  acento: '#0a6cc2',
  acentoFuerte: '#0960ab',
  acentoClaro: '#4aa3e3',
  acentoTenue: '#e8f2fc',
  wa: '#0b7a66',
  waFuerte: '#096354',
  tinta: '#101d2b',
  tintaSuave: '#4a5a6b',
  papel: '#ffffff',
  papelTenue: '#f4f7fb',
  borde: '#dbe3ec',
  blanco: '#ffffff',

  // Heredados del WordPress del cliente (ver globals.css)
  banda: '#152649',
  bandaFuerte: '#0e1b36',
  pie: '#070e1d',
  azulTitulo: '#90b5ff',
  tilde: '#062179',
  // Los extremos más claros de los dos degradés de botón: son el peor caso
  // de cada uno, porque el arranque es mucho más oscuro.
  degradeAzulClaro: '#2c6e9b',
  degradeVerdeClaro: '#0c8654',
}

const canal = (v) => {
  const c = v / 255
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
}

function luminancia(hex) {
  const n = parseInt(hex.slice(1), 16)
  const r = (n >> 16) & 255
  const g = (n >> 8) & 255
  const b = n & 255
  return 0.2126 * canal(r) + 0.7152 * canal(g) + 0.0722 * canal(b)
}

function contraste(a, b) {
  const la = luminancia(a)
  const lb = luminancia(b)
  const [claro, oscuro] = la > lb ? [la, lb] : [lb, la]
  return (claro + 0.05) / (oscuro + 0.05)
}

/** [descripción, frente, fondo, mínimo exigido] */
const pares = [
  // ── Texto sobre claro ───────────────────────────────────────────────────
  ['Texto principal sobre papel', T.tinta, T.papel, 4.5],
  ['Texto principal sobre papel tenue', T.tinta, T.papelTenue, 4.5],
  ['Texto secundario sobre papel', T.tintaSuave, T.papel, 4.5],
  ['Texto secundario sobre papel tenue', T.tintaSuave, T.papelTenue, 4.5],
  ['H1/H2 navy sobre papel', T.navy, T.papel, 4.5],
  ['H1/H2 navy sobre papel tenue', T.navy, T.papelTenue, 4.5],
  ['Enlace acento sobre papel', T.acento, T.papel, 4.5],
  ['Enlace acento sobre papel tenue', T.acento, T.papelTenue, 4.5],
  ['Enlace acento sobre acento tenue', T.acento, T.acentoTenue, 4.5],
  ['WhatsApp contorno: texto verde sobre blanco', T.wa, T.papel, 4.5],

  // ── Texto sobre oscuro ──────────────────────────────────────────────────
  ['Blanco sobre navy', T.blanco, T.navy, 4.5],
  ['Blanco sobre navy 900', T.blanco, T.navy900, 4.5],
  ['Blanco 70% sobre navy 900', '#b8bec6', T.navy900, 4.5],
  ['Blanco 75% sobre navy', '#bfc6d0', T.navy, 4.5],
  ['Acento claro sobre navy 900', T.acentoClaro, T.navy900, 4.5],
  ['Acento claro sobre navy', T.acentoClaro, T.navy, 4.5],

  // ── Texto sobre las superficies heredadas del cliente ───────────────────
  ['Blanco sobre la banda oscura', T.blanco, T.banda, 4.5],
  ['Blanco 75% sobre la banda oscura', '#c9ced8', T.banda, 4.5],
  ['Azul del título sobre la banda oscura', T.azulTitulo, T.banda, 4.5],
  ['Blanco sobre el pie', T.blanco, T.pie, 4.5],
  ['Blanco 70% sobre el pie', '#b6b9c0', T.pie, 4.5],
  ['Acento claro sobre el pie', T.acentoClaro, T.pie, 4.5],
  // La banda de zonas lleva la foto bajo un velo del 80%: el píxel más claro
  // posible (blanco puro) mezclado con bandaFuerte da este fondo.
  ['Blanco sobre la banda de zonas, peor píxel', T.blanco, '#414a5e', 4.5],
  ['Azul del título sobre la banda de zonas, peor píxel', T.azulTitulo, '#414a5e', 3],
  ['Blanco sobre el hero, peor píxel', T.blanco, '#3f3f3f', 4.5],
  ['Azul del título sobre el hero, peor píxel', T.azulTitulo, '#3f3f3f', 3],

  // ── Botones (texto) ─────────────────────────────────────────────────────
  ['Botón degradé azul: blanco sobre su punto más claro', T.blanco, T.degradeAzulClaro, 4.5],
  ['Botón degradé verde: blanco sobre su punto más claro', T.blanco, T.degradeVerdeClaro, 4.5],
  ['Tilde en círculo sobre papel', T.tilde, T.papel, 3],
  ['Tilde en círculo sobre papel tenue', T.tilde, T.papelTenue, 3],
  ['Botón llamar: blanco sobre acento', T.blanco, T.acento, 4.5],
  ['Botón llamar hover: blanco sobre acento fuerte', T.blanco, T.acentoFuerte, 4.5],
  ['Botón WhatsApp: blanco sobre wa', T.blanco, T.wa, 4.5],
  ['Botón WhatsApp hover: blanco sobre wa fuerte', T.blanco, T.waFuerte, 4.5],
  ['Número en paso: blanco sobre acento', T.blanco, T.acento, 4.5],

  // ── No textual: bordes, íconos, foco (3:1) ──────────────────────────────
  ['Borde del botón acento contra papel', T.acento, T.papel, 3],
  ['Anillo WhatsApp contorno contra papel', T.wa, T.papel, 3],
  ['Ícono acento sobre papel tenue', T.acento, T.papelTenue, 3],
  ['Anillo de foco sobre papel', T.acento, T.papel, 3],
  ['Anillo de foco blanco sobre navy 900', T.blanco, T.navy900, 3],
  ['Logo: HOY azul claro sobre navy 900', T.acentoClaro, T.navy900, 3],

  // ── Bordes decorativos (no son UI: se informan, no se exigen) ───────────
  ['· borde de tarjeta contra papel (decorativo)', T.borde, T.papel, 0],
]

let fallas = 0
const filas = []

for (const [nombre, frente, fondo, minimo] of pares) {
  const ratio = contraste(frente, fondo)
  const pasa = ratio >= minimo
  if (!pasa) fallas++
  filas.push({
    estado: minimo === 0 ? '  ·' : pasa ? '  OK' : '  NO',
    ratio: ratio.toFixed(2).padStart(6),
    minimo: minimo === 0 ? '   —' : `${minimo.toFixed(1)}`.padStart(4),
    nombre,
  })
}

console.log('\n  CONTRASTE WCAG 2.1 AA\n')
console.log('  estado  ratio   min   par')
console.log('  ' + '─'.repeat(72))
for (const f of filas) {
  console.log(`${f.estado}  ${f.ratio}  ${f.minimo}   ${f.nombre}`)
}
console.log('  ' + '─'.repeat(72))

if (fallas > 0) {
  console.error(`\n  ${fallas} par(es) por debajo del mínimo.\n`)
  process.exit(1)
}
console.log(`\n  ${pares.length} pares verificados, ninguno por debajo del mínimo.\n`)
