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
      desc: 'I build web and mobile applications with great performance and design. Currently exploring AI and Data Science.',
      cta_projects: 'View Projects',
      cta_contact: 'Get In Touch',
      scroll: 'scroll',
    },
    about: {
      label: '03 — About',
      title: 'Who I am',
      card1_title: 'Background',
      factLabels: { Location: 'Location', Focus: 'Focus', Available: 'Available', Languages: 'Languages' },
      card1_p1: 'Full Stack and Mobile Developer passionate about building high-performance web and mobile applications. Currently in my 6th semester of Software Engineering. Exploring Artificial Intelligence and Data Science.',
      card1_p2: 'From intuitive Flutter mobile apps to scalable Python backends, I enjoy working across the full stack and delivering products that make a real impact.',
      card2_title: 'Quick Facts',
      facts: {
        Location: 'Pereira, Colombia 🇨🇴',
        Focus: 'Web & Mobile Dev',
        Available: 'Open to Work',
        Languages: 'ES / EN',
      },
    },
    skills: {
      label: '01 — Skills',
      title: 'Technologies',
    },
    projects: {
      label: '02 — Projects',
      title: 'Selected Work',
      items: [
        {
          title: 'Monedo',
          description: 'Mobile personal finance app with income/expense tracking, savings goals, and monthly statistics. Built with Flutter and Firebase.',
        },
        {
          title: 'Travelia — Tourism Platform',
          description: 'Tourism web platform with social networking, business profiles, real-time reservations, and audit logging. Stack: Flask, MySQL, MongoDB, HTML/CSS.',
        },
      ],
    },
    contact: {
      label: '04 — Contact',
      title: "Let's build together",
      desc: "Have a project in mind? I'd love to hear about it.",
      name: 'Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Tell me about your project...',
      send: 'Send Message',
      or: 'or reach me at',
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
      desc: 'Construyo aplicaciones web y móviles con buen rendimiento y diseño. Explorando IA y Ciencia de Datos.',
      cta_projects: 'Ver Proyectos',
      cta_contact: 'Contáctame',
      scroll: 'scroll',
    },
    about: {
      label: '03 — Sobre mí',
      title: 'Quién soy',
      card1_title: 'Historia',
      card1_p1: 'Desarrollador Full Stack y Móvil apasionado por construir aplicaciones web y móviles de alto rendimiento. Actualmente en sexto semestre de Ingeniería de Software. Explorando la Inteligencia Artificial y la Ciencia de Datos.',
      card1_p2: 'Desde apps móviles intuitivas con Flutter hasta backends escalables en Python, disfruto trabajar en todo el stack y entregar productos que generan impacto real.',
      card2_title: 'Datos rápidos',
      factLabels: { Location: 'Ubicación', Focus: 'Enfoque', Available: 'Disponible', Languages: 'Idiomas' },
      facts: {
        Location: 'Pereira, Colombia 🇨🇴',
        Focus: 'Desarrollo Web y Móvil',
        Available: 'Open to Work',
        Languages: 'ES / EN',
      },
    },
    skills: {
      label: '01 — Habilidades',
      title: 'Tecnologías',
    },
    projects: {
      label: '02 — Proyectos',
      title: 'Mis Proyectos',
      items: [
        {
          title: 'Monedo',
          description: 'App móvil de finanzas personales con seguimiento de ingresos, gastos, metas de ahorro y estadísticas mensuales. Construida con Flutter y Firebase.',
        },
        {
          title: 'Travelia — Tourism Platform',
          description: 'Plataforma web de turismo con red social, gestión de negocios, sistema de reservas en tiempo real y auditoría automática. Stack: Flask, MySQL, MongoDB y HTML/CSS.',
        },
      ],
    },
    contact: {
      label: '04 — Contacto',
      title: 'Contáctame',
      desc: '',
      name: 'Nombre',
      email: 'Correo',
      subject: 'Asunto',
      message: 'Cuéntame sobre tu proyecto...',
      send: 'Enviar mensaje',
      or: 'o escríbeme a',
    },
  },
} satisfies Record<Locale, unknown>

export type Translations = (typeof translations)['en']
