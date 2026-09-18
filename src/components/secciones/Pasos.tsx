import { pasos } from '@contenido'

export function Pasos() {
  return (
    <section
      aria-labelledby="titulo-pasos"
      className="border-t border-borde bg-papel-tenue py-16 md:py-24"
    >
      <div className="contenedor">
        <div className="max-w-2xl">
          <h2
            id="titulo-pasos"
            className="text-3xl font-extrabold text-navy sm:text-4xl"
          >
            Cómo trabajamos
          </h2>
        </div>

        <ol className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
          {pasos.map((paso, i) => (
            <li key={paso.titulo} className="aparece">
              {/* navy/55 = 3.36:1 sobre papel tenue. Con el acento al 25%
                  daba 1.42 y ni al 60% llegaba a 3: el azul es demasiado claro
                  al mezclarse. */}
              <span
                aria-hidden="true"
                className="block text-5xl font-extrabold leading-none text-navy/55 tabular-nums"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 text-xl font-bold text-navy">{paso.titulo}</h3>
              <p className="mt-2 leading-relaxed text-tinta-suave">
                {paso.texto}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
