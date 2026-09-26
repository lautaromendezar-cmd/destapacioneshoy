import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { sitio } from '@contenido'

/**
 * La tarjeta que se ve al compartir el sitio por WhatsApp, Facebook o X.
 *
 * Una sola plantilla para todas las páginas, con el título cambiado. Se
 * generan en el build, así que no cuestan nada en runtime.
 *
 * Las tipografías son instancias estáticas de Inter Tight (assets/), la misma
 * que usan los títulos del sitio: satori no interpola ejes variables, así que
 * con la variable los dos pesos saldrían iguales.
 *
 * El logo va dibujado con texto y no importado: el PNG del cliente trae el
 * "HOY" en navy, que sobre este fondo desaparecería.
 */

export const TAMANO_OG = { width: 1200, height: 630 }

export async function renderOg({
  titulo,
  bajada,
}: {
  titulo: string
  bajada: string
}) {
  const [medium, bold] = await Promise.all([
    readFile(join(process.cwd(), 'assets/InterTight-Medium.ttf')),
    readFile(join(process.cwd(), 'assets/InterTight-Bold.ttf')),
  ])

  // El título manda sobre el tamaño: uno largo baja a 66px para no desbordar.
  const tamanoTitulo = titulo.length > 46 ? 66 : titulo.length > 34 ? 74 : 82

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#071a2e',
          padding: '68px 72px',
          fontFamily: 'Inter Tight',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 16,
            backgroundColor: '#0a6cc2',
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
            <span
              style={{
                fontSize: 40,
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '-0.01em',
              }}
            >
              DESTAPACIONES
            </span>
            <span style={{ fontSize: 40, fontWeight: 700, color: '#4aa3e3' }}>
              HOY
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: tamanoTitulo,
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              marginTop: 40,
              maxWidth: 960,
            }}
          >
            {titulo}
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: 30,
              fontWeight: 500,
              color: 'rgba(255,255,255,0.72)',
              marginTop: 22,
              maxWidth: 960,
            }}
          >
            {bajada}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#0a6cc2',
              color: '#ffffff',
              fontSize: 52,
              fontWeight: 700,
              padding: '18px 34px',
              borderRadius: 18,
            }}
          >
            {sitio.telefono.visible}
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: 28,
              fontWeight: 500,
              color: 'rgba(255,255,255,0.65)',
            }}
          >
            {sitio.horario.texto}
          </div>
        </div>
      </div>
    ),
    {
      ...TAMANO_OG,
      fonts: [
        { name: 'Inter Tight', data: medium, style: 'normal', weight: 500 },
        { name: 'Inter Tight', data: bold, style: 'normal', weight: 700 },
      ],
    },
  )
}
