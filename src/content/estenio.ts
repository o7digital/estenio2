export const officialSite = 'https://estenio.com.mx';

export const navItems = [
  { label: 'INICIO', href: '#inicio' },
  { label: 'NOSOTROS', href: `${officialSite}/nosotros/` },
  { label: 'PENSIÓN', href: `${officialSite}/gestor-de-pensiones/` },
  { label: 'CONTACTO', href: '#contacto' },
] as const;

export const serviceNavItems = [
  { label: 'Auditoría', href: `${officialSite}/auditoria/` },
  { label: 'Legal', href: `${officialSite}/legal/` },
  { label: 'Asesoría INFONAVIT', href: `${officialSite}/asesoria-infonavit/` },
  { label: 'Pensión', href: `${officialSite}/gestor-de-pensiones/` },
] as const;

export const hero = {
  title: 'El despacho líder en México, especializado en materia de Seguridad Social.',
  copy: 'Fundado hace más de 53 años, Corporativo Estenio se ha consolidado como despacho referente en Seguridad Social, ofreciendo a empresas nacionales e internacionales un servicio de excelencia.',
} as const;

export const services = [
  {
    id: 'audit',
    title: 'Auditoría',
    copy: 'Asesoría especializada y estratégica para prevenir riesgos, corregir inconsistencias y asegurar el cumplimiento en materia de Seguridad Social.',
    image: '/assets/original/auditoria1-scaled.jpg',
    alt: 'Auditoría de documentos y trabajo especializado',
    width: 2560,
    height: 1707,
    href: `${officialSite}/auditoria/`,
  },
  {
    id: 'pension',
    title: 'Pensión',
    copy: 'Asesoría experta y estratégica para planear tu retiro, maximizar tu pensión y recuperar fondos de AFORE, tanto para mexicanos como para extranjeros.',
    image: '/assets/original/pensionOptimized.png',
    alt: 'Asesoría de pensión',
    width: 300,
    height: 371,
    href: `${officialSite}/pension/`,
  },
  {
    id: 'infonavit',
    title: 'Asesoria INFONAVIT',
    copy: 'Acompañamiento experto para empresas y trabajadores en la obtención, gestión y recuperación de créditos INFONAVIT, así como en la celebración de convenios, con estrategias claras y efectivas.',
    image: '/assets/original/infonavit1_.png',
    alt: 'Asesoría INFONAVIT',
    width: 300,
    height: 371,
    href: `${officialSite}/asesoria-infonavit/`,
  },
  {
    id: 'legal',
    title: 'Servicios Legales',
    copy: 'Representación estratégica en controversias con IMSS, INFONAVIT y otras autoridades, protegiendo los intereses de nuestros clientes en sede administrativa y judicial.',
    image: '/assets/original/legal1.png',
    alt: 'Servicios legales',
    width: 300,
    height: 371,
    href: `${officialSite}/legal/`,
  },
] as const;

export const pensionOffers = [
  {
    title: 'Empresarial',
    intro: 'Ayudamos a tus colaboradores a alcanzar su mejor pensión.',
    copy: 'Mediante un estudio profesional y personalizado, analizamos la situación de cada trabajador para que conozca todas sus opciones, tome decisiones informadas y tenga el acompañamiento necesario.',
    image: '/assets/original/img-inicio-02.jpg',
    alt: 'Asesoría de pensión empresarial',
    width: 1001,
    height: 666,
    href: `${officialSite}/pension/`,
  },
  {
    title: 'Personal',
    intro: 'Logra la pensión que mereces: un retiro claro, sólido y optimizado.',
    copy: 'Nuestro estudio personalizado examina tu historial para ofrecerte un diagnóstico preciso de tu situación actual y mostrarte todas las alternativas disponibles.',
    image: '/assets/original/pension-img-head-04.jpg',
    alt: 'Asesoría de pensión personal',
    width: 2000,
    height: 781,
    href: `${officialSite}/pension/`,
  },
] as const;

export const about = {
  paragraphs: [
    'Somos un despacho vanguardista y con amplia experiencia en asesoría en Seguridad Social en México.',
    'Diseño e implementación de soluciones en materia de Seguridad Social, relacionadas con el IMSS, INFONAVIT, AFORE, STPS y otras autoridades.',
    'Nuestro objetivo es proteger el patrimonio de nuestros clientes, generar ahorros y asegurar el cumplimiento normativo.',
  ],
} as const;

export const clients = [
  { name: 'El Nuevo Mundo', image: '/assets/original/carrusel-logos-11.jpg' },
  { name: 'Lilly', image: '/assets/original/carrusel-logos-1.jpg' },
  { name: 'INTCOMEX', image: '/assets/original/carrusel-logos-10.jpg' },
  { name: 'JAPAY', image: '/assets/original/carrusel-logos-9.jpg' },
  { name: 'Western Union', image: '/assets/original/carrusel-logos-3.jpg' },
  { name: 'CIRSA', image: '/assets/original/carrusel-logos-8.jpg' },
  { name: 'Zoetis', image: '/assets/original/carrusel-logos-7.jpg' },
  { name: 'VOLVO', image: '/assets/original/carrusel-logos-4.jpg' },
  { name: 'GSK', image: '/assets/original/carrusel-logos-5.jpg' },
  { name: 'Greenpeace', image: '/assets/original/carrusel-logos-6.jpg' },
] as const;

export const contact = {
  title: 'ENCUENTRA LA SOLUCIÓN',
  copy: 'Por favor déjanos un mensaje y uno de nuestros representantes se pondrá en contacto contigo lo antes posible.',
  note: 'Formulario de previsualización: no se envían ni guardan datos y no se muestra confirmación de envío.',
  email: 'info@estenio.com.mx',
  phone: '+52 (55) 5682 0573',
  phoneHref: 'tel:5556820573',
  address: 'Calle Cracovia 72, San Ángel, Álvaro Obregón, 01000 Ciudad de México, CDMX',
  map: 'https://maps.app.goo.gl/UGFv7zfEMZZSfXzS6',
  social: [
    { label: 'Facebook', href: 'https://www.facebook.com/estenioMX/' },
    { label: 'Instagram', href: 'https://www.instagram.com/esteniomx/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/corporativo-estenio/posts/?feedView=all' },
  ],
} as const;
