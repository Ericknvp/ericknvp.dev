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
      desc: 'I craft modern web experiences with clean code and thoughtful design. Specializing in React, Node.js, and everything in between.',
      cta_projects: 'View Projects',
      cta_contact: 'Get In Touch',
      scroll: 'scroll',
    },
    about: {
      label: '01 — About',
      title: 'Who I am',
      card1_title: 'Background',
      factLabels: { Location: 'Location', Focus: 'Focus', Available: 'Available', Languages: 'Languages' },
      card1_p1: 'Full Stack Developer passionate about building elegant, performant web applications. I love turning complex problems into simple, beautiful interfaces that users actually enjoy.',
      card1_p2: 'With experience across the full stack — from pixel-perfect frontends to scalable backend architectures — I bring a holistic perspective to every project.',
      card2_title: 'Quick Facts',
      facts: {
        Location: 'Venezuela 🇻🇪',
        Focus: 'Web Development',
        Available: 'Freelance / Remote',
        Languages: 'ES / EN',
      },
    },
    skills: {
      label: '02 — Skills',
      title: 'What I work with',
    },
    projects: {
      label: '03 — Projects',
      title: 'Selected Work',
      items: [
        {
          title: 'Project Alpha',
          description: 'Modern web app with real-time data updates, authentication, and a clean dashboard UI.',
        },
        {
          title: 'Project Beta',
          description: 'Full-stack e-commerce platform with Stripe payments, inventory management, and analytics.',
        },
        {
          title: 'Project Gamma',
          description: 'Scalable REST API with JWT auth, rate limiting, caching layer, and Swagger docs.',
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
      desc: 'Creo experiencias web modernas con código limpio y diseño cuidadoso. Especializado en React, Node.js y todo lo que hay entre medias.',
      cta_projects: 'Ver Proyectos',
      cta_contact: 'Contáctame',
      scroll: 'scroll',
    },
    about: {
      label: '01 — Sobre mí',
      title: 'Quién soy',
      card1_title: 'Historia',
      card1_p1: 'Desarrollador Full Stack apasionado por construir aplicaciones web elegantes y eficientes. Me encanta convertir problemas complejos en interfaces simples y hermosas.',
      card1_p2: 'Con experiencia en todo el stack — desde frontends detallistas hasta arquitecturas de backend escalables — aporto una perspectiva integral a cada proyecto.',
      card2_title: 'Datos rápidos',
      factLabels: { Location: 'Ubicación', Focus: 'Enfoque', Available: 'Disponible', Languages: 'Idiomas' },
      facts: {
        Location: 'Venezuela 🇻🇪',
        Focus: 'Desarrollo Web',
        Available: 'Freelance / Remoto',
        Languages: 'ES / EN',
      },
    },
    skills: {
      label: '02 — Habilidades',
      title: 'Con qué trabajo',
    },
    projects: {
      label: '03 — Proyectos',
      title: 'Trabajo Selecto',
      items: [
        {
          title: 'Proyecto Alpha',
          description: 'App web moderna con actualizaciones en tiempo real, autenticación y dashboard limpio.',
        },
        {
          title: 'Proyecto Beta',
          description: 'Plataforma e-commerce fullstack con pagos Stripe, gestión de inventario y analíticas.',
        },
        {
          title: 'Proyecto Gamma',
          description: 'API REST escalable con auth JWT, rate limiting, capa de caché y documentación Swagger.',
        },
      ],
    },
    contact: {
      label: '04 — Contacto',
      title: 'Construyamos juntos',
      desc: '¿Tienes un proyecto en mente? Me encantaría escucharlo.',
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
