import { useState } from 'react';

const profiles = {
  empresa: ['La tranquilidad de una operación en orden.', 'Acompañamos a tu empresa en el cumplimiento de sus obligaciones y en la atención de contingencias ante IMSS e INFONAVIT.', ['Auditoría preventiva', 'Cumplimiento patronal', 'Corrección y defensa']],
  persona: ['Tu historia laboral merece una mirada completa.', 'Analizamos tus antecedentes y alternativas para ayudarte a tomar decisiones informadas sobre tu retiro.', ['Estudio de pensión', 'Revisión de historial', 'Recuperación de fondos']],
  obra: ['Construir con una base de cumplimiento.', 'Acompañamos a constructoras y desarrolladoras en las obligaciones de Seguridad Social relacionadas con sus obras.', ['SIROC y registro de obras', 'Control documental', 'Obligaciones ante IMSS']],
} as const;

type ProfileKey = keyof typeof profiles;

const labels: Record<ProfileKey, string> = { empresa: 'Soy empresa', persona: 'Soy particular', obra: 'Sector construcción' };

export default function AudienceSelector() {
  const [selected, setSelected] = useState<ProfileKey>('empresa');
  const data = profiles[selected];

  return (
    <>
      <div className="audience-switch" aria-label="Seleccionar perfil">
        {(Object.keys(profiles) as ProfileKey[]).map((key) => (
          <button className={selected === key ? 'active' : ''} aria-pressed={selected === key} key={key} onClick={() => setSelected(key)}>{labels[key]}</button>
        ))}
      </div>
      <div className="audience-content" aria-live="polite">
        <div><h3>{data[0]}</h3><p>{data[1]}</p></div>
        <ul>{data[2].map((item, index) => <li key={item}>{item}<span>0{index + 1}</span></li>)}</ul>
      </div>
    </>
  );
}
