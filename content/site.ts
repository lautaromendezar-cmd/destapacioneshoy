/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  TODO EL CONTENIDO DEL SITIO VIVE ACÁ.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  Los componentes no tienen texto adentro: sólo leen de este archivo.
 *  Cambiar el teléfono, un precio, un texto o agregar una zona es editar
 *  una línea de acá y volver a desplegar. Ver CLAUDE.md en la raíz.
 *
 *  Marcado con `TODO: confirmar con el cliente` = dato que NO está verificado.
 *  No inventar reseñas, años de experiencia, tiempos de llegada ni precios.
 */

/* ═══════════════════════════════════════════════════════════════════════════
   TIPOS
   ═══════════════════════════════════════════════════════════════════════════ */

/** Dónde estaba el botón que se tocó. Viaja al dataLayer para Google Ads. */
export type UbicacionCta =
  | 'header'
  | 'hero'
  | 'barra-fija'
  | 'boton-flotante'
  | 'servicios'
  | 'video-inspeccion'
  | 'por-que-elegirnos'
  | 'galeria'
  | 'zonas'
  | 'pasos'
  | 'faq'
  | 'cta-final'
  | 'footer'
  | 'pagina-servicio'
  | 'pagina-zona'
  | 'pagina-404'

/**
 * Nombre de ícono. Se traduce a un SVG de lucide en src/components/ui/Icono.tsx
 * WhatsApp no está acá: tiene su propio componente con el glifo de Simple Icons.
 */
export type NombreIcono =
  | 'cloaca'
  | 'cocina'
  | 'lluvia'
  | 'edificio'
  | 'bomba'
  | 'reloj'
  | 'herramienta'
  | 'escudo'
  | 'sinRoturas'
  | 'mapa'
  | 'telefono'
  | 'camion'
  | 'camara'

export interface Imagen {
  src: string
  alt: string
  ancho: number
  alto: number
  /**
   * `object-position` para el recorte. El encabezado de servicio muestra la
   * foto en 4:3 en mobile y 4:5 en desktop, así que una foto vertical pierde
   * arriba y abajo: si lo importante no está en el centro, se corre acá.
   */
  encuadre?: string
}

export interface Servicio {
  slug: string
  /** Nombre completo, para títulos y listados. */
  nombre: string
  /** Versión corta para tarjetas y migas de pan. */
  nombreCorto: string
  icono: NombreIcono
  /** Una línea. Lo que va en la tarjeta de la home. */
  resumen: string
  h1: string
  metaTitle: string
  metaDescription: string
  /** Párrafos de apertura de la página del servicio. */
  intro: string[]
  /** "Cómo te das cuenta" */
  sintomas: string[]
  /** "Por qué se tapa" */
  causas: string[]
  /** "Cómo lo resolvemos" */
  resolucion: string[]
  /**
   * Los títulos de esas tres listas por defecto hablan de una obstrucción.
   * Un servicio que no destapa nada —la video inspección— los pisa acá.
   */
  titulos?: {
    sintomas?: string
    causas?: string
    resolucion?: string
  }
  /**
   * Opcional: sin foto, el encabezado de la página va a una sola columna.
   * Preferible a inventar una imagen o a repetir la de otro servicio.
   */
  imagen?: Imagen
  /**
   * Opcional: pisa la bajada de la tarjeta para compartir. La de fábrica
   * —"Con máquina, sin roturas"— describe una destapación, y hay servicios
   * que no destapan nada.
   */
  ogBajada?: string
}

export interface Zona {
  slug: string
  nombre: string
  /** Cómo se nombra dentro de una frase: "en Zona Norte", "en CABA". */
  nombreEnFrase: string
  h1: string
  metaTitle: string
  metaDescription: string
  intro: string[]
  /** Qué tiene de particular la infraestructura de esta zona. */
  particularidades: string[]
  /** Barrios / localidades. TODO: confirmar los bordes reales de cobertura. */
  localidades: string[]
}

export interface Faq {
  pregunta: string
  respuesta: string
}

export interface Paso {
  titulo: string
  texto: string
}

export interface Diferencial {
  icono: NombreIcono
  titulo: string
  texto: string
}

/* ═══════════════════════════════════════════════════════════════════════════
   DATOS DEL NEGOCIO
   ═══════════════════════════════════════════════════════════════════════════ */

export const sitio = {
  nombre: 'Destapaciones HOY',
  /** Se usa en el <title> como sufijo y en el JSON-LD. */
  nombreLegal: 'Destapaciones HOY',
  url: 'https://destapacioneshoy.com.ar',
  descripcionCorta:
    'Destapaciones cloacales y pluviales con máquina, las 24 horas, en CABA y Provincia de Buenos Aires.',

  telefono: {
    /** Como se muestra en pantalla. */
    visible: '11 3163-5383',
    /** Para el href="tel:". Formato internacional, sin espacios. */
    link: '+541131635383',
    /** Para el JSON-LD (schema.org pide E.164). */
    e164: '+541131635383',
  },

  whatsapp: {
    /** Número sin + ni espacios, como lo pide wa.me */
    numero: '541131635383',
    /** Mensaje precargado genérico. */
    mensajeGeneral: 'Hola, necesito una destapación urgente. ¿Me pueden ayudar?',
    /** {zona} se reemplaza con el nombre de la zona. */
    mensajePorZona: 'Hola, necesito una destapación urgente en {zona}.',
    /** {servicio} se reemplaza con el nombre del servicio. */
    mensajePorServicio: 'Hola, necesito {servicio}. ¿Me pueden ayudar?',
  },

  horario: {
    /** Lo que se muestra al visitante. */
    texto: '24 horas, los 365 días del año',
    textoCorto: '24 hs · 365 días',
  },

  /** Dirección: el cliente no publica local a la calle. Sólo área de cobertura. */
  // TODO: confirmar con el cliente — ¿tienen domicilio comercial que quieran publicar?
  // Sin dirección, el JSON-LD usa areaServed en lugar de address, que es lo correcto
  // para un servicio a domicilio.
  direccion: null,

  redes: {
    // TODO: confirmar con el cliente — ¿tienen Instagram o Facebook del negocio?
    instagram: null as string | null,
    facebook: null as string | null,
  },

  autor: {
    nombre: 'Lautaro Mendez',
    url: 'https://lautaromendez.com.ar',
    credito: 'Diseño web por Lautaro Mendez',
  },
} as const

/* ═══════════════════════════════════════════════════════════════════════════
   BARRA SUPERIOR Y HERO
   ═══════════════════════════════════════════════════════════════════════════ */

export const barraSuperior = {
  /** El renglón que el cliente tenía arriba de todo, tal cual. */
  texto: 'Urgencias las 24 hs – Atendemos CABA, Zona Norte, Zona Sur y Zona Oeste',
}

export const hero = {
  /**
   * El H1 va partido en dos porque se pinta en dos colores, igual que en el
   * sitio anterior del cliente: la primera parte en blanco y la segunda en
   * azul claro. Es lo primero que él reconoce de su propia página, así que la
   * redacción es la suya, tal cual la tenía en WordPress.
   */
  h1: {
    blanco: 'Servicio de destapaciones',
    azul: '24 hs en CABA y Provincia',
  },
  /**
   * Los dos renglones que iban debajo del título en su sitio, sin los emojis
   * 🚨 y 📞. El segundo lleva el teléfono como enlace, igual que él lo tenía:
   * en una urgencia, el número a la vista vale más que un sello de confianza.
   */
  subtitulo: 'Urgencias las 24 hs, los 365 días del año.',
  antesDelTelefono: 'Llamá ahora:',
  botonLlamar: 'Llamar ahora',
  botonWhatsapp: 'Escribir por WhatsApp',
}

/* ═══════════════════════════════════════════════════════════════════════════
   SERVICIOS
   ═══════════════════════════════════════════════════════════════════════════ */

export const servicios: Servicio[] = [
  {
    slug: 'destapacion-de-cloacas',
    nombre: 'Destapación de cloacas',
    nombreCorto: 'Cloacas',
    icono: 'cloaca',
    resumen:
      'La cámara de inspección rebalsa, el inodoro borbotea o el agua vuelve por la rejilla del patio.',
    h1: 'Destapación de cloacas en CABA y Provincia',
    metaTitle: 'Destapación de cloacas 24 hs',
    metaDescription:
      '¿La cámara rebalsa o el inodoro borbotea? Destapamos cloacas con máquina de sonda, sin romper. 24 hs en CABA y Provincia. Llamá al 11 3163-5383.',
    intro: [
      'Una cloaca tapada nunca avisa con tiempo. Lo primero que aparece suele ser el inodoro que traga lento, y en pocas horas el agua empieza a volver por la rejilla del patio o del lavadero.',
      'Trabajamos con máquinas de sonda rotativa que entran por la cámara de inspección o por el desagüe que ya existe. No hay que picar el piso ni abrir paredes para destapar una cloaca.',
    ],
    sintomas: [
      'El inodoro traga lento o hace burbujas cuando tirás la cadena.',
      'Sale agua por la rejilla del patio o del lavadero al usar el baño.',
      'La cámara de inspección está llena hasta el borde o rebalsa.',
      'Hay olor a cloaca en el patio, el lavadero o la planta baja.',
      'La bacha de la cocina borbotea cuando descargás el inodoro: la obstrucción está más abajo, en el desagüe principal.',
    ],
    causas: [
      'Raíces de árboles que entran por las juntas de los caños de cerámica y arman una maraña adentro.',
      'Toallitas húmedas, algodón, hisopos y trapos: no se desarman con el agua como el papel higiénico.',
      'Grasa de cocina que se enfría, se pega a la pared del caño y va cerrando el paso capa sobre capa.',
      'Escombros, arena o cal que cayeron a la cámara durante una obra.',
      'Un caño hundido o partido por el asentamiento del terreno, que junta todo en el mismo punto.',
    ],
    resolucion: [
      'Abrimos la cámara de inspección más cercana al problema y ubicamos hacia qué lado está la obstrucción.',
      'Pasamos la sonda con el espiral que corresponda al diámetro del caño: no es lo mismo un desagüe secundario que la conexión a la red.',
      'Corremos agua delante tuyo hasta verificar que escurre bien y que no vuelve.',
      'Dejamos la cámara tapada y el sector limpio.',
    ],
    imagen: {
      src: '/images/camara-inspeccion-canerias-destapada.webp',
      alt: 'Cámara de inspección abierta con las cañerías cloacales a la vista durante una destapación',
      ancho: 1100,
      alto: 1462,
    },
  },
  {
    slug: 'destapacion-de-cocinas-lavaderos-y-banos',
    nombre: 'Destapación de cocinas, lavaderos y baños',
    nombreCorto: 'Cocina, lavadero y baño',
    icono: 'cocina',
    resumen:
      'La pileta no baja, la ducha se llena o el agua del lavarropas vuelve a la rejilla.',
    h1: 'Destapación de cocinas, lavaderos y baños',
    metaTitle: 'Destapación de cocina, lavadero y baño',
    metaDescription:
      '¿La pileta de la cocina no baja o la ducha se llena de agua? Destapamos bachas, piletas, duchas e inodoros con máquina. 24 hs en CABA y Provincia. 11 3163-5383.',
    intro: [
      'Son las obstrucciones más comunes y casi siempre están cerca: en el sifón, en el ramal que une la bacha con el desagüe o en los primeros metros de caño.',
      'Es también donde más daño hacen los destapacañerías de venta libre. El químico ablanda la superficie del tapón, el agua pasa un rato y a los dos días vuelve peor, con el agregado de que quedó soda cáustica adentro del caño.',
    ],
    sintomas: [
      'La pileta de la cocina baja lento o queda con agua estancada.',
      'La bacha doble se pasa el agua de un lado al otro.',
      'La ducha se llena mientras te bañás y tarda en vaciarse.',
      'El lavarropas descarga y el agua sale por la rejilla del lavadero.',
      'Vuelve olor por el desagüe aunque el sifón tenga agua.',
    ],
    causas: [
      'Grasa mezclada con restos de comida: es la causa número uno en cocinas.',
      'Pelo y jabón apelmazados en la rejilla y el sifón de la ducha.',
      'Sarro acumulado en cañerías viejas de hierro o plomo, que reduce el diámetro útil del caño.',
      'Pelusa y restos de detergente del lavarropas, que forman un tapón blando en el desagüe del lavadero.',
      'Un objeto que se cayó: tapitas, cubiertos, esponjas, juguetes.',
    ],
    resolucion: [
      'Revisamos primero el sifón y el ramal: si la obstrucción está ahí, se resuelve en el lugar y sin desarmar nada.',
      'Si está más abajo, pasamos la sonda por el desagüe existente hasta liberar el caño.',
      'Arrastramos la grasa acumulada en vez de sólo perforarla, para que no se cierre otra vez a los pocos días.',
      'Probamos con agua corriendo y dejamos el mueble y el piso como estaban.',
    ],
    imagen: {
      src: '/images/maquina-destapadora-en-cocina.webp',
      alt: 'Máquina destapadora de sonda eléctrica trabajando sobre el desagüe de una cocina',
      ancho: 720,
      alto: 1280,
    },
  },
  {
    slug: 'destapacion-de-pluviales-patios-y-terrazas',
    nombre: 'Destapación de pluviales, patios y terrazas',
    nombreCorto: 'Pluviales y terrazas',
    icono: 'lluvia',
    resumen:
      'El desagüe de lluvia se descubre recién con la primera tormenta fuerte, y para ese momento ya entró agua.',
    h1: 'Destapación de pluviales, patios y terrazas',
    metaTitle: 'Destapación de pluviales y terrazas',
    metaDescription:
      '¿La terraza no drena o el patio se inunda cuando llueve? Destapamos embudos, rejillas y bajadas pluviales en CABA y Provincia, las 24 hs. 11 3163-5383.',
    intro: [
      'El desagüe pluvial es el único que trabaja pocas veces al año, y por eso es el que menos se mira. El resto del tiempo junta hojas, tierra y musgo sin que nadie lo note.',
      'El problema aparece completo de una sola vez, con la primera tormenta fuerte: la terraza no drena y el agua empieza a buscar por dónde entrar. En un edificio, una bajada tapada en la terraza termina apareciendo como filtración en el último piso.',
    ],
    sintomas: [
      'Queda agua parada en la terraza o el balcón varias horas después de la lluvia.',
      'El patio se convierte en pileta apenas empieza a llover fuerte.',
      'Aparecen manchas de humedad en el cielorraso del último piso o en la pared de la bajada.',
      'El embudo de la terraza hace un remolino muy lento o directamente no traga.',
      'El agua rebalsa por la canaleta en lugar de bajar por el caño.',
    ],
    causas: [
      'Hojas, ramitas y tierra acumuladas en el embudo y en la canaleta.',
      'Musgo y barro compactados en el fondo de la rejilla del patio.',
      'Restos de membrana, pintura o material de una obra en la terraza.',
      'Nidos, plumas o bolsas de nylon que entraron por el extremo abierto de la bajada.',
      'Rejilla sin protección: el embudo queda expuesto y se traga todo lo que arrastra el viento.',
    ],
    resolucion: [
      'Destapamos el embudo, la rejilla o la bajada desde el punto que esté obstruido, sin romper la membrana.',
      'Pasamos la sonda por el caño de bajada completo cuando la obstrucción está en el tramo vertical.',
      'Probamos con agua para verificar que la terraza drena y que el caño no gotea en el recorrido.',
      'Te mostramos qué había adentro: casi siempre explica solo por qué se tapó.',
    ],
    imagen: {
      src: '/images/rejillas-desagote-piso-destapadas.webp',
      alt: 'Dos rejillas de desagote de piso destapadas y limpias después del trabajo',
      ancho: 1400,
      alto: 787,
    },
  },
  {
    slug: 'destapaciones-para-edificios-locales-y-comercios',
    nombre: 'Destapaciones para edificios, locales y comercios',
    nombreCorto: 'Edificios y comercios',
    icono: 'edificio',
    resumen:
      'Consorcios, restaurantes, colegios, hospitales y administraciones. Coordinamos con el encargado y trabajamos con el local abierto.',
    h1: 'Destapaciones para edificios, locales y comercios',
    metaTitle: 'Destapaciones para edificios y comercios',
    metaDescription:
      'Destapaciones para consorcios, restaurantes, colegios y administraciones. Columna montante, trampas de grasa y desagües. 24 hs. 11 3163-5383.',
    intro: [
      'En un edificio la urgencia es distinta: no hay una sola familia esperando, hay una columna montante que afecta a toda una línea de departamentos y un encargado tratando de contener el problema.',
      'En un local gastronómico el reloj corre en plata: cada hora con la cocina parada se paga. Por eso trabajamos con el horario que te sirva, incluido antes de abrir o después de cerrar.',
    ],
    sintomas: [
      'Varios departamentos de la misma línea reportan el problema a la vez: la obstrucción está en la columna montante, no en cada unidad.',
      'El agua sale por las rejillas de los pisos bajos cuando descargan los de arriba.',
      'La trampa de grasa del restaurante rebalsa o larga olor al salón.',
      'Los desagües de la cocina industrial escurren cada vez más lento en hora pico.',
      'Los baños de uso público de un colegio o una oficina se tapan seguido en el mismo sector.',
    ],
    causas: [
      'Grasa acumulada en la columna montante de cocinas, que baja caliente y se solidifica en el recorrido.',
      'Toallitas y elementos de higiene en baños de uso público, donde nadie controla qué se tira.',
      'Trampas de grasa que hace mucho que no se vacían y ya no retienen nada.',
      'Cañerías originales del edificio con décadas de sarro encima.',
      'Obras en una unidad que mandaron escombro, cal o pastina al desagüe común.',
    ],
    resolucion: [
      'Coordinamos con el encargado o la administración el horario y el acceso a los espacios comunes.',
      'Ubicamos si el problema es de una unidad o de la columna montante antes de empezar, para no destapar dos veces.',
      'Trabajamos con máquina y bomba según el caso, sin cortar el servicio del edificio más de lo necesario.',
      'Dejamos el sector limpio y te decimos qué encontramos, que es lo que la administración necesita para decidir si hay que hacer un mantenimiento.',
    ],
    imagen: {
      src: '/images/boca-desagote-cloacal-destapada.webp',
      alt: 'Boca de desagote cloacal abierta y destapada en el piso de un local comercial',
      ancho: 899,
      alto: 1599,
    },
  },
  /**
   * El único servicio que el cliente pidió agregar, por WhatsApp el 26-sep-2026:
   * "un equipo con una sonda con cámara para ver el interior de los caños
   * cloacales, para ver la obstrucción que tienen y ver si están rotos".
   *
   * El texto no va más allá de eso. Lo que NO se puede afirmar todavía está
   * abajo, en los TODO: sin esas respuestas la página se queda corta justo en
   * lo que decide la contratación, que es si el video se lo llevan o no.
   */
  {
    slug: 'video-inspeccion-de-canerias',
    nombre: 'Video inspección de cañerías',
    nombreCorto: 'Video inspección',
    icono: 'camara',
    resumen:
      'Metemos una sonda con cámara y miramos el caño por dentro: qué lo tapa, en qué punto está y si está roto.',
    h1: 'Video inspección de cañerías en CABA y Provincia',
    metaTitle: 'Video inspección de cañerías con cámara',
    metaDescription:
      'Vemos el interior del caño con una sonda con cámara: dónde está la obstrucción y si la cañería está rota, antes de picar. CABA y Provincia. 11 3163-5383.',
    intro: [
      'Cuando un desagüe se tapa seguido, destapar y volver a destapar no resuelve nada: hay algo en el caño que lo vuelve a juntar. La video inspección sirve para dejar de adivinar.',
      'Metemos una sonda con cámara por la cámara de inspección o por el desagüe que ya existe y miramos el caño por dentro en la pantalla: qué lo está tapando, en qué punto exacto y si el caño está partido, hundido o con raíces.',
    ],
    titulos: {
      sintomas: 'Cuándo conviene hacerla',
      causas: 'Qué se ve en la cámara',
      resolucion: 'Cómo la hacemos',
    },
    sintomas: [
      'El mismo desagüe se tapa cada pocas semanas y nadie sabe por qué.',
      'Ya destaparon y volvió a taparse en el mismo lugar.',
      'Aparecen manchas de humedad o hundimientos en el piso o el patio.',
      'Antes de picar un piso o abrir una pared, para saber dónde hay que hacerlo.',
      'En una compra o un alquiler, para saber en qué estado están las cañerías.',
      'En un consorcio, para saber si el problema es de una unidad o de la columna.',
    ],
    causas: [
      'Raíces metidas por las juntas de los caños de cerámica.',
      'Un caño partido, desplazado o hundido por el asentamiento del terreno.',
      'Grasa endurecida pegada a la pared del caño, que va cerrando el paso.',
      'Escombros, arena o cal que quedaron adentro después de una obra.',
      'Un objeto atascado en un punto fijo, que es lo que junta todo lo demás.',
    ],
    resolucion: [
      'Ubicamos la cámara de inspección o el desagüe por donde conviene entrar.',
      'Pasamos la sonda con la cámara en la punta y recorremos el caño mirando la pantalla.',
      'Te mostramos en el momento qué hay adentro y en qué punto está.',
      'Con eso decidimos juntos si alcanza con destapar o si hay que reparar, y dónde.',
    ],
    // TODO: confirmar con el cliente — ¿la video inspección se cobra aparte o
    // va incluida cuando además destapan? Es lo primero que va a preguntar.
    // TODO: confirmar con el cliente — ¿hasta qué diámetro de caño entra la
    // sonda? Sin ese dato no se puede decir si sirve para una columna montante.
    imagen: {
      src: '/images/video-inspeccion-canerias-en-boca-de-registro.webp',
      alt: 'Sonda con cámara entrando a una cámara de inspección mientras la pantalla del equipo muestra el interior del caño cloacal',
      ancho: 1100,
      alto: 1467,
      // En 4:3 el centro deja la pantalla fuera de cuadro, y la pantalla con
      // el caño por dentro es lo que muestra el servicio.
      encuadre: '50% 22%',
    },
    // La bajada de fábrica habla de destapar con máquina sin romper, que
    // acá no aplica: esta página no destapa nada.
    ogBajada: 'Vemos el caño por dentro · CABA y Provincia · 24 hs',
  },
  {
    slug: 'desagote-de-sotanos-con-bomba',
    nombre: 'Desagote de sótanos con bomba centrífuga',
    nombreCorto: 'Desagote de sótanos',
    icono: 'bomba',
    resumen:
      'Sótano, subsuelo o cochera con agua. Vamos con bomba centrífuga y sacamos el agua.',
    h1: 'Desagote de sótanos y subsuelos con bomba centrífuga',
    metaTitle: 'Desagote de sótanos con bomba 24 hs',
    metaDescription:
      '¿Se te inundó el sótano, el subsuelo o la cochera? Desagotamos con bomba centrífuga las 24 hs en CABA y Provincia de Buenos Aires. Llamá al 11 3163-5383.',
    intro: [
      'Un sótano con agua es de las pocas urgencias donde cada hora cuenta de verdad: el agua sube, arruina lo que hay guardado y en muchos casos está cerca de un tablero eléctrico o de la sala de máquinas.',
      'Vamos con bomba centrífuga, que mueve volumen y tolera agua sucia con barro y restos, que es lo que siempre hay en una inundación real.',
    ],
    sintomas: [
      'Hay agua acumulada en el sótano, el subsuelo o la cochera después de una tormenta.',
      'La bomba achicadora que tenías instalada no da abasto o se quemó.',
      'El agua sube despacio pero no para, aunque ya no esté lloviendo: suele ser napa.',
      'El pozo de bombeo está lleno y el flotante no arranca.',
      'Se inundó el sector donde están el tablero, el tanque de bombeo o la sala de máquinas.',
    ],
    causas: [
      'Tormenta fuerte con el pluvial tapado: el agua entra más rápido de lo que el desagüe puede sacar.',
      'Napa alta, muy común en la zona ribereña del norte y en las partes bajas del sur.',
      'Bomba achicadora quemada, con el flotante trabado o sin alimentación eléctrica.',
      'Rejilla de la rampa de cochera tapada de hojas y tierra.',
      'Una pérdida de agua interna que nadie detectó a tiempo.',
    ],
    resolucion: [
      'Antes de entrar verificamos que el agua no esté en contacto con instalación eléctrica viva.',
      'Bombeamos con centrífuga hasta bajar el nivel y dejar el piso practicable.',
      'Revisamos el desagüe pluvial y la rejilla para entender por dónde entró y si se va a repetir.',
      'Si la obstrucción es lo que causó la inundación, la destapamos en la misma visita.',
    ],
    imagen: {
      src: '/images/desague-bano-destapado.webp',
      alt: 'Desagüe de piso abierto y destapado listo para evacuar el agua acumulada',
      ancho: 720,
      alto: 1280,
    },
  },
]

/**
 * El encabezado de la sección de servicios, con la redacción del sitio
 * anterior del cliente. Su bloque era dos columnas: a la izquierda el título,
 * este párrafo y la lista con tildes; a la derecha, una foto de un trabajo.
 */
export const introServicios = {
  titulo: 'Servicios de destapaciones y desagotes',
  texto:
    'Atendemos todo tipo de destapaciones y desagotes, con máquinas profesionales y bombas centrífugas. Limpieza rápida, sin roturas y con garantía.',
  /**
   * Dos fotos, no una: su bloque era un collage de dos trabajos superpuestos.
   * Ninguna de las dos se repite en la galería de más abajo.
   */
  imagenes: [
    {
      src: '/images/tecnico-destapando-con-maquina.webp',
      alt: 'Técnico de Destapaciones HOY operando una máquina de sonda para destapar el desagüe de un baño',
      ancho: 1080,
      alto: 1350,
    },
    {
      src: '/images/desague-bano-destapado.webp',
      alt: 'Desagüe de baño destapado y limpio después del trabajo',
      ancho: 720,
      alto: 1280,
    },
  ] satisfies Imagen[],
}

/**
 * Banda de la video inspección en la home.
 *
 * Es el único servicio que el cliente pidió agregar y el equipo se lo acaba
 * de comprar: quiso verlo destacado en la home, no sólo como una tarjeta más
 * de la grilla de servicios. Va con su propia banda para eso.
 *
 * El texto no va más allá de lo que él mismo describió por WhatsApp. No se
 * promete entregar la grabación, que es lo primero que preguntaría un
 * consorcio: eso todavía no está confirmado con él.
 *
 * La foto es otra toma que la de la página del servicio, a propósito: acá se
 * luce el equipo abierto con la pantalla, allá la escena de trabajo.
 */
export const videoInspeccion = {
  rotulo: 'Nuevo servicio',
  titulo: 'Vemos el caño por dentro',
  texto:
    'Metemos una sonda con cámara por la cámara de inspección o por el desagüe que ya existe, y miramos el caño por dentro en la pantalla, en el momento y con vos al lado.',
  puntos: [
    'Qué es lo que está tapando y en qué punto exacto del caño está.',
    'Si el caño está partido, hundido o tiene raíces metidas.',
    'Si conviene destapar o si hay que reparar, y dónde exactamente.',
  ],
  imagen: {
    src: '/images/video-inspeccion-equipo-abierto.webp',
    alt: 'Equipo de video inspección abierto, con la pantalla mostrando el interior de un caño cloacal y el carrete de la sonda',
    ancho: 1100,
    alto: 1467,
  } satisfies Imagen,
}

/* ═══════════════════════════════════════════════════════════════════════════
   ZONAS
   ───────────────────────────────────────────────────────────────────────────
   Gran Buenos Aires NO tiene página propia a propósito: es el paraguas de
   Norte + Oeste + Sur y su texto sería un refrito de los otros tres. Aparece
   en la cobertura y linkea a las tres páginas reales.

   TODO: confirmar con el cliente — los listados de localidades marcan el borde
   real de cobertura (¿llegan hasta Moreno? ¿hasta Berazategui? ¿hasta Tigre?).
   ═══════════════════════════════════════════════════════════════════════════ */

export const zonas: Zona[] = [
  {
    slug: 'caba',
    nombre: 'CABA',
    nombreEnFrase: 'CABA',
    h1: 'Destapaciones 24 hs en CABA',
    metaTitle: 'Destapaciones en CABA 24 hs',
    metaDescription:
      'Destapaciones de cloacas, cocinas, baños y pluviales en Capital Federal, las 24 horas. Trabajamos en PH, departamentos, edificios y locales. 11 3163-5383.',
    intro: [
      'En Capital casi todo el trabajo pasa por dos cosas: la antigüedad de la cañería y el hecho de que el desagüe casi nunca es de una sola familia.',
      'Buena parte de los PH y edificios de CABA todavía desagotan por caños de cerámica o de hierro instalados hace décadas, con décadas de sarro y grasa encima. Y cuando el problema está en la columna montante, la obstrucción de un piso aparece como agua en el de abajo.',
    ],
    particularidades: [
      'Edificios y PH donde el desagüe es compartido: conviene saber si el problema es de la unidad o de la columna antes de empezar.',
      'Cañerías originales de cerámica y hierro, más angostas por el sarro de los años.',
      'Patios internos chicos con una sola rejilla, que se tapa con hojas y tierra y termina volcando el agua adentro.',
      'Mucho local gastronómico con cocina chica y trampa de grasa exigida al máximo.',
      'Acceso complicado: contrafrentes, terrazas por escalera y cocheras de maniobra justa.',
    ],
    localidades: [
      'Palermo',
      'Belgrano',
      'Caballito',
      'Almagro',
      'Villa Crespo',
      'Recoleta',
      'Flores',
      'Boedo',
      'San Telmo',
      'Barracas',
      'Villa Urquiza',
      'Núñez',
      'Saavedra',
      'Villa Devoto',
      'Mataderos',
      'Villa del Parque',
    ],
  },
  {
    slug: 'zona-norte',
    nombre: 'Zona Norte',
    nombreEnFrase: 'Zona Norte',
    h1: 'Destapaciones 24 hs en Zona Norte',
    metaTitle: 'Destapaciones en Zona Norte 24 hs',
    metaDescription:
      'Destapaciones y desagotes en Zona Norte: Vicente López, Olivos, San Isidro, Martínez, San Fernando y Tigre. Bomba centrífuga para sótanos. 11 3163-5383.',
    intro: [
      'Zona Norte tiene dos problemas propios que casi no aparecen en otros lados: los árboles y el río.',
      'Las casas con jardín y arboleda grande conviven con cañerías de cerámica que tienen juntas cada un metro. La raíz encuentra la humedad, entra por la junta y adentro del caño se abre como una red. Y en la franja cercana al río, la napa alta hace que cualquier sótano o subsuelo sea candidato a juntar agua.',
    ],
    particularidades: [
      'Raíces de árboles dentro de las cañerías: la causa más frecuente en casas con jardín.',
      'Napa alta en la franja ribereña: sótanos, subsuelos y cocheras que se llenan aunque no haya llovido fuerte.',
      'Casas con quincho, pileta y varios desagües independientes, donde primero hay que encontrar cuál es el que falla.',
      'Countries y barrios cerrados, con acceso a coordinar por guardia.',
      'Terrenos amplios con largas tiradas de caño entre la casa y la conexión a la red.',
    ],
    localidades: [
      'Vicente López',
      'Olivos',
      'Florida',
      'Munro',
      'Villa Adelina',
      'Martínez',
      'Acassuso',
      'San Isidro',
      'Beccar',
      'Boulogne',
      'San Fernando',
      'Tigre',
      'Don Torcuato',
      'El Talar',
    ],
  },
  {
    slug: 'zona-oeste',
    nombre: 'Zona Oeste',
    nombreEnFrase: 'Zona Oeste',
    h1: 'Destapaciones 24 hs en Zona Oeste',
    metaTitle: 'Destapaciones en Zona Oeste 24 hs',
    metaDescription:
      'Destapaciones de cloacas y pluviales en Zona Oeste: Ramos Mejía, Haedo, Morón, Castelar, Ituzaingó, San Justo y alrededores. 24 hs. 11 3163-5383.',
    intro: [
      'En Zona Oeste el trabajo se concentra en dos frentes: los pluviales y los comercios sobre avenida.',
      'Es una zona de casas bajas con patio y terraza propios, donde el desagüe de lluvia es responsabilidad de cada uno y nadie lo revisa hasta que llueve en serio. Sumado a eso, hay sectores que se anegan rápido cuando cae mucha agua junta, y ahí el pluvial tapado deja de ser un detalle.',
    ],
    particularidades: [
      'Terrazas y patios amplios con embudos y rejillas que juntan hojas y tierra todo el año.',
      'Sectores que se anegan con tormentas fuertes: un pluvial tapado ahí define si entra agua o no.',
      'Mucho comercio sobre avenida, con baños de uso público y cocinas que exigen el desagüe.',
      'Casas con ampliaciones hechas por etapas, donde el recorrido del caño no siempre es el que figura en el plano.',
      'Zona de edificios nuevos mezclados con casas antiguas, cada uno con su tipo de cañería.',
    ],
    localidades: [
      'Ramos Mejía',
      'Haedo',
      'Morón',
      'Castelar',
      'Ituzaingó',
      'Villa Sarmiento',
      'Villa Luzuriaga',
      'San Justo',
      'Ciudadela',
      'Caseros',
      'Santos Lugares',
      'El Palomar',
      'Hurlingham',
      'Villa Tesei',
    ],
  },
  {
    slug: 'zona-sur',
    nombre: 'Zona Sur',
    nombreEnFrase: 'Zona Sur',
    h1: 'Destapaciones 24 hs en Zona Sur',
    metaTitle: 'Destapaciones en Zona Sur 24 hs',
    metaDescription:
      'Destapaciones y desagote de sótanos en Zona Sur: Avellaneda, Lanús, Lomas de Zamora, Quilmes, Banfield y alrededores. 24 hs con máquina. 11 3163-5383.',
    intro: [
      'Zona Sur es tierra baja, y eso cambia el tipo de llamado. Acá el desagote con bomba pesa tanto como la destapación.',
      'Buena parte de la zona tiene napa cerca de la superficie: los sótanos, subsuelos y cocheras juntan agua incluso sin tormenta, y cuando llueve fuerte el pluvial tapado termina de cerrar el problema. A eso se suma el parque de casas antiguas con cañería de cerámica y mucho galpón e industria con desagües de caudal alto.',
    ],
    particularidades: [
      'Napa alta y cotas bajas: sótanos y subsuelos que se llenan aunque el pluvial esté bien.',
      'Mucho pedido de desagote con bomba centrífuga, sobre todo después de tormentas.',
      'Casas antiguas con cañería de cerámica y juntas abiertas, propensas a raíces y hundimientos.',
      'Galpones e industrias con desagües de caudal alto y rejillas grandes de piso.',
      'Zonas donde el desagüe pluvial y el cloacal están muy cerca y conviene revisar los dos.',
    ],
    localidades: [
      'Avellaneda',
      'Sarandí',
      'Wilde',
      'Gerli',
      'Lanús',
      'Valentín Alsina',
      'Lomas de Zamora',
      'Banfield',
      'Temperley',
      'Adrogué',
      'Quilmes',
      'Bernal',
      'Don Bosco',
      'Berazategui',
    ],
  },
]

/** Se muestra en cobertura pero no tiene página propia. */
export const zonaParaguas = {
  nombre: 'Gran Buenos Aires',
  texto: 'Cubrimos el Gran Buenos Aires a través de Zona Norte, Oeste y Sur.',
}

/**
 * La banda de cobertura del sitio anterior del cliente, palabra por palabra.
 * Era su segunda sección más fuerte después del hero: fondo oscuro con foto,
 * título centrado en blanco y las zonas separadas por barras. Se conserva.
 */
export const bandaZonas = {
  volanta: 'Llegamos rápido a cualquier zona',
  titulo: 'Atendemos Capital y toda la Provincia de Buenos Aires',
  /** El renglón de zonas separadas por barras verticales. */
  listado: [
    'Capital Federal',
    'Zona Norte',
    'Zona Oeste',
    'Zona Sur',
    'Gran Buenos Aires',
  ],
  botonWhatsapp: 'Enviame un WhatsApp',
  /** El pie de la banda, que lleva a las landings de cada zona. */
  bajadaTarjetas:
    'Entrá a tu zona para ver qué se tapa más seguido por ahí y por qué.',
}

/* ═══════════════════════════════════════════════════════════════════════════
   POR QUÉ ELEGIRNOS
   ═══════════════════════════════════════════════════════════════════════════ */

export const diferenciales: Diferencial[] = [
  {
    icono: 'herramienta',
    titulo: 'Máquinas profesionales',
    texto:
      'Sondas rotativas con distintos espirales según el diámetro del caño, y bomba centrífuga para desagotar. No trabajamos con sopapa ni con químicos de venta libre.',
  },
  {
    icono: 'sinRoturas',
    titulo: 'Sin roturas',
    texto:
      'Entramos por la cámara de inspección, la rejilla o el desagüe que ya existe. No hay que picar pisos ni abrir paredes para destapar. Si aparece un caño partido, te lo mostramos antes de tocar nada.',
  },
  {
    icono: 'escudo',
    titulo: 'Con garantía',
    texto:
      'El trabajo queda garantizado. Te explicamos el alcance cuando coordinamos, antes de que vayamos.',
    // TODO: confirmar con el cliente — ¿cuántos días de garantía? ¿queda por escrito
    // en algún comprobante? Con el plazo concreto esta tarjeta convierte mucho más.
  },
  {
    icono: 'reloj',
    titulo: 'Las 24 horas, todo el año',
    texto:
      'Atendemos de noche, fines de semana y feriados. Si se tapó a las tres de la mañana, llamá a las tres de la mañana.',
  },
  {
    icono: 'camion',
    titulo: 'Vamos con todo el equipo',
    texto:
      'Llevamos la máquina y la bomba en la misma visita. Si el sótano está inundado porque el pluvial está tapado, resolvemos las dos cosas de una.',
  },
  {
    icono: 'telefono',
    titulo: 'Atención personalizada',
    texto:
      'Te atendemos nosotros, escuchamos qué está pasando y te decimos qué hace falta. Sin call center ni derivaciones.',
  },
]

/* ═══════════════════════════════════════════════════════════════════════════
   CÓMO TRABAJAMOS
   ═══════════════════════════════════════════════════════════════════════════ */

export const pasos: Paso[] = [
  {
    titulo: 'Llamás o escribís',
    texto:
      'Contanos qué pasa y dónde estás. Preguntamos tres cosas: hace cuánto empezó, si falla un solo desagüe o varios a la vez, y si hay agua saliendo. Con eso ya sabemos qué máquina cargar.',
  },
  {
    titulo: 'Vamos con la máquina',
    texto:
      'Coordinamos el horario más cercano posible y vamos con la sonda y la bomba. Antes de empezar te decimos qué vamos a hacer y cuánto sale el trabajo.',
  },
  {
    titulo: 'Destapamos y probamos',
    texto:
      'Liberamos el caño y corremos agua delante tuyo hasta verificar que escurre. Dejamos el sector limpio y te contamos qué encontramos adentro.',
  },
]

/* ═══════════════════════════════════════════════════════════════════════════
   PREGUNTAS FRECUENTES
   ═══════════════════════════════════════════════════════════════════════════ */

export const faqs: Faq[] = [
  {
    pregunta: '¿Atienden ahora, a esta hora?',
    respuesta:
      'Sí. El teléfono atiende las 24 horas, los 365 días del año, incluidos fines de semana y feriados. Llamá al 11 3163-5383 o escribinos por WhatsApp.',
  },
  {
    pregunta: '¿Rompen el piso o la pared para destapar?',
    respuesta:
      'No. Trabajamos con máquinas de sonda que entran por la cámara de inspección, la rejilla o el desagüe que ya existe. Si al revisar aparece un caño partido o hundido, te lo mostramos y decidís vos antes de que toquemos nada.',
  },
  {
    pregunta: '¿Cuánto sale una destapación?',
    respuesta:
      'Depende de dónde esté la obstrucción, de qué la causó y de la máquina que haga falta: no es lo mismo el sifón de una bacha que la conexión de la cloaca a la red. Te decimos el precio antes de empezar el trabajo.',
    // TODO: confirmar con el cliente — ¿la visita o el presupuesto tienen costo?
    // ¿Hay un precio base o "desde"? Es la pregunta que más frena una llamada.
  },
  {
    pregunta: '¿Qué zonas cubren?',
    respuesta:
      'Capital Federal y Provincia de Buenos Aires: Zona Norte, Zona Oeste, Zona Sur y el Gran Buenos Aires. Si no estás seguro de si llegamos hasta donde estás, llamá y te lo confirmamos en el momento.',
  },
  {
    pregunta: '¿El trabajo tiene garantía?',
    respuesta:
      'Sí, el trabajo queda garantizado. Te explicamos el alcance antes de empezar.',
    // TODO: confirmar con el cliente — plazo exacto de la garantía y qué cubre.
  },
  {
    pregunta: '¿En cuánto tiempo llegan?',
    respuesta:
      'Depende de la zona y del tránsito en ese momento. Cuando llamás te damos un horario concreto, y si se demora te avisamos.',
    // TODO: confirmar con el cliente — ¿hay un compromiso de tiempo que quieran
    // publicar (por ejemplo "en el día" o "dentro de las 2 horas")? No inventar.
  },
  {
    pregunta: '¿Atienden edificios, consorcios y comercios?',
    respuesta:
      'Sí. Trabajamos con administraciones, consorcios, restaurantes, locales, colegios y hospitales, coordinando el horario con el encargado para molestar lo menos posible.',
    // TODO: confirmar con el cliente — ¿emiten factura A? ¿trabajan con remito o
    // cuenta corriente para administraciones? Es lo primero que pregunta un consorcio.
  },
  {
    pregunta: '¿Qué formas de pago aceptan?',
    respuesta:
      'Consultanos al momento de coordinar el trabajo.',
    // TODO: confirmar con el cliente — efectivo, transferencia, tarjeta, MercadoPago.
    // Con la respuesta real esta pregunta deja de ser un freno.
  },
  {
    pregunta: '¿Qué puedo hacer mientras llegan?',
    respuesta:
      'Dejá de usar el desagüe que está fallando: cada descarga empuja más agua contra el tapón. No tires destapacañerías químico, porque queda en el caño y complica el trabajo. No fuerces con alambre, que puede partir la cañería. Y si hay agua cerca de un tablero o de una toma, cortá la electricidad de ese sector.',
  },
]

/* ═══════════════════════════════════════════════════════════════════════════
   GALERÍA
   ═══════════════════════════════════════════════════════════════════════════ */

export const galeria = {
  titulo: 'Trabajos reales',
  bajada:
    'Fotos de servicios que hicimos, sacadas en el momento. Así se ve un desagüe cuando llegamos y cuando terminamos.',
  fotos: [
    {
      src: '/images/camara-inspeccion-canerias-destapada.webp',
      alt: 'Cámara de inspección abierta mostrando las cañerías cloacales durante una destapación',
      ancho: 1100,
      alto: 1462,
    },
    {
      src: '/images/rejillas-desagote-piso-destapadas.webp',
      alt: 'Dos rejillas de desagote de piso destapadas y limpias en una cocina industrial',
      ancho: 1400,
      alto: 787,
    },
    {
      src: '/images/boca-desagote-cloacal-destapada.webp',
      alt: 'Boca de desagote cloacal destapada con el caño de cerámica liberado',
      ancho: 899,
      alto: 1599,
    },
    {
      src: '/images/maquina-destapadora-en-cocina.webp',
      alt: 'Máquina destapadora de sonda eléctrica trabajando en el desagüe de una cocina',
      ancho: 720,
      alto: 1280,
    },
  ] satisfies Imagen[],
}

/* ═══════════════════════════════════════════════════════════════════════════
   CTA FINAL Y 404
   ═══════════════════════════════════════════════════════════════════════════ */

export const ctaFinal = {
  titulo: '¿Tenés una urgencia ahora?',
  texto:
    'Llamá y te atendemos en el momento. Si preferís escribir, mandá un WhatsApp contando qué pasa y en qué zona estás.',
}

export const pagina404 = {
  titulo: 'Esta página no existe',
  texto:
    'Puede que el link esté mal escrito o que la página haya cambiado de dirección. Si tenés una urgencia, llamanos: atendemos las 24 horas.',
  volver: 'Ir al inicio',
}
