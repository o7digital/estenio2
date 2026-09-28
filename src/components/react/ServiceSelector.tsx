import { useState } from 'react';

const services = {
  audit: ['01', 'PREVENIR. CORREGIR. PROTEGER.', 'Anticiparse es la mejor forma de proteger.', 'Identificamos riesgos e inconsistencias en tus obligaciones de Seguridad Social para ayudarte a actuar con información y certeza.', ['Dictamen IMSS', 'Dictamen INFONAVIT', 'Auditoría preventiva'], 'auditoría'],
  legal: ['02', 'CRITERIO. ESTRATEGIA. DEFENSA.', 'Una defensa a la altura de lo que importa.', 'Representación estratégica ante actos del IMSS e INFONAVIT: multas, créditos, negativas de devolución y controversias.', ['Litigio', 'Recursos y amparos', 'Convenios'], 'defensa legal'],
  infonavit: ['03', 'ACOMPAÑAMIENTO ESPECIALIZADO.', 'Más claridad en cada obligación.', 'Asesoría para empresas y trabajadores en la gestión de créditos, cumplimiento, recuperación y celebración de convenios.', ['Créditos', 'Cumplimiento', 'Convenios'], 'INFONAVIT'],
  pension: ['04', 'TU TRAYECTORIA. TU FUTURO.', 'Un retiro que empieza con buenas decisiones.', 'Estudiamos tu historial y tus alternativas para ayudarte a planear tu pensión y la recuperación de fondos.', ['Estudio de pensión', 'AFORE', 'Planeación del retiro'], 'pensiones'],
} as const;

const titles: Record<keyof typeof services, string> = {
  audit: 'Auditoría',
  legal: 'Defensa legal',
  infonavit: 'INFONAVIT',
  pension: 'Pensiones',
};

type ServiceKey = keyof typeof services;

export default function ServiceSelector() {
  const [selected, setSelected] = useState<ServiceKey>('audit');
  const data = services[selected];

  const activate = (key: ServiceKey) => setSelected(key);
  const keys = Object.keys(services) as ServiceKey[];

  const move = (index: number, offset: number) => {
    const next = (index + offset + keys.length) % keys.length;
    activate(keys[next]);
    document.getElementById(`tab-${keys[next]}`)?.focus();
  };

  return (
    <div className="service-grid">
      <div className="service-tabs" role="tablist" aria-label="Especialidades">
        {keys.map((key, index) => {
          const active = key === selected;
          return (
            <button
              className={`service-tab${active ? ' active' : ''}`}
              role="tab"
              id={`tab-${key}`}
              aria-selected={active}
              aria-controls="service-panel"
              tabIndex={active ? 0 : -1}
              key={key}
              onClick={() => activate(key)}
              onKeyDown={(event) => {
                if (event.key === 'Home') { event.preventDefault(); move(0, 0); }
                if (event.key === 'End') { event.preventDefault(); move(0, keys.length - 1 - index); }
                if (event.key === 'ArrowRight' || event.key === 'ArrowDown') { event.preventDefault(); move(index, 1); }
                if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') { event.preventDefault(); move(index, -1); }
              }}
            >
              <span className="num">{services[key][0]}</span>
              <span className="title">{titles[key]}</span>
              <span className="plus">↗</span>
            </button>
          );
        })}
      </div>
      <div className="service-panel reveal" id="service-panel" role="tabpanel" aria-labelledby={`tab-${selected}`}>
        <span className="watermark" aria-hidden="true">{data[0]}</span>
        <div className="label">{data[1]}</div>
        <h3>{data[2]}</h3>
        <p>{data[3]}</p>
        <div className="tags">{data[4].map((tag) => <span key={tag}>{tag}</span>)}</div>
        <a href="#contacto">Consultar sobre {data[5]} ↗</a>
      </div>
    </div>
  );
}
