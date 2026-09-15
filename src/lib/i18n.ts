export type Locale = 'en' | 'es'

export const translations = {
  en: {
    nav: {
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      contact: 'Contact',
    },
    hero: {
      role: 'Full Stack Developer',
      greeting: "Hi, I'm",
      desc: 'Full Stack Software Developer. UI/UX Designer, AI architecture and data science.',
      cta_projects: 'View Projects',
      cta_contact: 'Get In Touch',
      scroll: 'scroll',
    },
    about: {
      title: 'Who I am',
      card1_title: 'Background',
      factLabels: { Experience: 'Experience', Location: 'Location', Focus: 'Focus', Available: 'Available', Languages: 'Languages' },
      card1_p1: 'Full Stack Software Developer. Currently in my 6th semester of Software Engineering.',
      card1_p2: 'My work lives at the intersection of high-performance engineering and creative design. I build web and mobile applications where solid architecture meets flawless visual interfaces. I integrate AI and Data Science into my projects, while deepening my expertise in React to take my designs to the next level.',
      card2_title: 'Quick Facts',
      facts: {
        Experience: '1+ year building software',
        Location: 'Pereira, Colombia',
        Focus: 'React · UX/UI Designer · AI/ML Engineer',
        Available: 'Open to Work',
        Languages: 'ES / EN',
      },
    },
    skills: {
      title: 'Technologies',
    },
    projects: {
      title: 'Selected Work',
      upcoming: 'In Development',
      viewCase: 'View case study',
      hideCase: 'Hide case study',
      problem: 'Problem',
      approach: 'Approach',
      result: 'Result',
      items: [
        {
          title: 'Monedo',
          description: 'Mobile personal finance app with income/expense tracking, savings goals, and monthly statistics. Built with Flutter and Firebase.',
          problem: 'Most people start tracking money in a notes app or a spreadsheet — and quit within a week because logging an expense takes too many taps.',
          approach: 'I designed a mobile-first flow in Flutter where adding a transaction takes one tap, savings goals are visual instead of numeric, and everything syncs live through Firebase.',
          result: 'A daily-use app where a transaction is logged in seconds, with automatic monthly statistics that turn raw entries into a habit worth keeping.',
        },
        {
          title: 'Travelia — Tourism Platform',
          description: 'Tourism web platform with social networking, business profiles, real-time reservations, and audit logging. Stack: Flask, MySQL, MongoDB, HTML/CSS.',
          problem: 'Small tourism businesses were running reservations through WhatsApp threads and spreadsheets — no visibility, no history, no way to trust what happened.',
          approach: 'I built a platform on Flask, MySQL and MongoDB that combines a travelers’ social feed, verified business profiles, and real-time booking with full audit logging on every action.',
          result: 'One system where travelers and businesses meet, with every reservation traceable end-to-end — turning trust into a feature, not an afterthought.',
        },
        {
          title: 'VALU',
          description: 'AI-powered SaaS platform built for restaurants — automates orders, inventory, and daily operations through intelligent agents, real-time analytics, and seamless integrations.',
          problem: 'Small restaurants lose hours every week coordinating orders, inventory, and shifts by hand, and the automation tools out there are built for a different kind of business.',
          approach: 'I’m building agents that plug directly into the tools a restaurant already uses (POS, suppliers, shifts), with real-time analytics on top, so automation ships without hiring a technical team.',
          result: 'In development — the first restaurant workflows ship soon.',
        },
      ],
    },
    contact: {
      title: "Let's build together",
      desc: "Have a project in mind? I'd love to hear about it.",
      name: 'Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Tell me about your project...',
      send: 'Send Message',
      or: 'Contact:',
    },
    footer: {
      repo: 'View this project',
    },
  },

  es: {
    nav: {
      about: 'Sobre mí',
      skills: 'Habilidades',
      projects: 'Proyectos',
      contact: 'Contacto',
    },
    hero: {
      role: 'Desarrollador Full Stack',
      greeting: 'Hola, soy',
      desc: 'Desarrollador de software Full Stack. Diseñador UI/UX, arquitectura de IA y ciencia de datos.',
      cta_projects: 'Ver Proyectos',
      cta_contact: 'Contáctame',
      scroll: 'scroll',
    },
    about: {
      title: 'Quién soy',
      card1_title: 'Historia',
      card1_p1: 'Desarrollador de software Full Stack. Actualmente cursando el sexto semestre de Ingeniería de Software.',
      card1_p2: 'Mi trabajo vive en la intersección entre la ingeniería de alto rendimiento y el diseño creativo. Construyo aplicaciones web y móviles donde la arquitectura sólida se encuentra con interfaces visuales impecables. Integro IA y Ciencia de Datos en mis proyectos, mientras profundizo en React para llevar mis diseños al siguiente nivel.',
      card2_title: 'Datos rápidos',
      factLabels: { Experience: 'Experiencia', Location: 'Ubicación', Focus: 'Enfoque', Available: 'Disponible', Languages: 'Idiomas' },
      facts: {
        Experience: '+1 año creando software',
        Location: 'Pereira, Colombia',
        Focus: 'React · UX/UI Designer · AI/ML Engineer',
        Available: 'Open to Work',
        Languages: 'ES / EN',
      },
    },
    skills: {
      title: 'Habilidades',
    },
    projects: {
      title: 'Mis Proyectos',
      upcoming: 'En desarrollo',
      viewCase: 'Ver case study',
      hideCase: 'Ocultar case study',
      problem: 'Problema',
      approach: 'Enfoque',
      result: 'Resultado',
      items: [
        {
          title: 'Monedo',
          description: 'App móvil de finanzas personales con seguimiento de ingresos, gastos, metas de ahorro y estadísticas mensuales. Construida con Flutter y Firebase.',
          problem: 'La mayoría empieza a llevar sus finanzas en notas o Excel y lo abandona en una semana porque registrar un gasto toma demasiados pasos.',
          approach: 'Diseñé un flujo mobile-first en Flutter donde agregar una transacción toma un solo toque, las metas de ahorro son visuales en vez de numéricas, y todo sincroniza en tiempo real con Firebase.',
          result: 'Una app de uso diario donde registrar un gasto toma segundos, con estadísticas mensuales automáticas que convierten los registros en un hábito que vale la pena mantener.',
        },
        {
          title: 'Travelia — Tourism Platform',
          description: 'Plataforma web de turismo con red social, gestión de negocios, sistema de reservas en tiempo real y auditoría automática. Stack: Flask, MySQL, MongoDB y HTML/CSS.',
          problem: 'Los negocios turísticos pequeños gestionaban reservas por WhatsApp y hojas de cálculo, sin visibilidad, historial ni forma de confiar en lo que realmente pasó.',
          approach: 'Construí una plataforma con Flask, MySQL y MongoDB que combina un feed social de viajeros, perfiles de negocio verificados y reservas en tiempo real con auditoría automática de cada acción.',
          result: 'Un solo sistema donde viajeros y negocios se encuentran, con cada reserva trazable de principio a fin — la confianza como una característica, no un extra.',
        },
        {
          title: 'VALU',
          description: 'Plataforma SaaS impulsada por IA diseñada para restaurantes — automatiza pedidos, inventario y operación diaria mediante agentes inteligentes, analítica en tiempo real e integraciones.',
          problem: 'Los restaurantes pequeños pierden horas cada semana coordinando pedidos, inventario y turnos a mano, y las herramientas de automatización que existen están pensadas para otro tipo de negocio.',
          approach: 'Estoy construyendo agentes que se conectan directamente a las herramientas que un restaurante ya usa (POS, proveedores, turnos), con analítica en tiempo real, para automatizar sin contratar un equipo técnico.',
          result: 'En desarrollo — los primeros flujos para restaurantes salen pronto.',
        },
      ],
    },
    contact: {
      title: 'Contáctame',
      desc: '',
      name: 'Nombre',
      email: 'Correo',
      subject: 'Asunto',
      message: 'Cuéntame sobre tu proyecto...',
      send: 'Enviar mensaje',
      or: 'Contacto:',
    },
    footer: {
      repo: 'Ver este proyecto',
    },
  },
} satisfies Record<Locale, unknown>

export type Translations = (typeof translations)['en']
