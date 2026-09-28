import { ESTENIO_CONTEXT } from '../lib/olivia-context.js';

const clean = (value, limit = 4000) => typeof value === 'string' ? value.trim().slice(0, limit) : '';
function send(response, status, body) {
  return response.status(status).setHeader('Content-Type', 'application/json').setHeader('Cache-Control', 'no-store').json(body);
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return send(response, 405, { error: 'Método no permitido.' });
  }
  let payload;
  try {
    if (typeof request.body === 'string' && request.body.length > 65000) return send(response, 413, { error: 'Solicitud demasiado larga.' });
    payload = typeof request.body === 'string' ? JSON.parse(request.body) : request.body;
  } catch {
    return send(response, 400, { error: 'Solicitud inválida.' });
  }
  const message = clean(payload?.message);
  if (!message) return send(response, 400, { error: 'Escribe una pregunta.' });
  const backend = clean(process.env.OLIVIA_V2_URL, 1000).replace(/\/+$/, '');
  const token = process.env.OLIVIA_INTERNAL_TOKEN;
  if (!backend.startsWith('https://') || !token) return send(response, 503, { error: 'Olivia no está disponible.' });
  const history = (Array.isArray(payload.history) ? payload.history : [])
    .filter(turn => ['user', 'assistant'].includes(turn?.role) && clean(turn?.content))
    .slice(-12).map(turn => ({ role: turn.role, content: clean(turn.content) }));
  const visitorId = clean(payload.visitorId, 80);
  try {
    const upstream = await fetch(`${backend}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Olivia-Internal-Token': token },
      body: JSON.stringify({
        clientCode: 'estenio', source: 'estenio2-demo', language: 'es', message, history,
        ...(/^[a-zA-Z0-9_-]{1,80}$/.test(visitorId) ? { visitorId } : {}),
        metadata: {
          clientName: 'Corporativo Estenio', clientIndustry: 'Seguridad Social y asesoría de pensión',
          clientSiteUrl: 'https://estenio.com.mx', clientKnowledge: ESTENIO_CONTEXT,
          pageUrl: 'https://estenio2.vercel.app/', pageTitle: 'Estenio Corporativo', pageContent: ESTENIO_CONTEXT,
        },
      }),
      cache: 'no-store', signal: AbortSignal.timeout(45000),
    });
    const result = await upstream.json().catch(() => ({}));
    if (!upstream.ok || result.clientCode !== 'estenio' || result.mode !== 'olivia-v2' || !clean(result.model) || !clean(result.reply)) {
      return send(response, 502, { error: 'Olivia no está disponible. Intenta de nuevo.' });
    }
    return send(response, 200, {
      reply: clean(result.reply), clientCode: 'estenio', mode: 'olivia-v2', model: clean(result.model, 100),
      handoffRecommended: result.handoffRecommended === true,
      sources: (Array.isArray(result.sources) ? result.sources : []).filter(source => /^https?:\/\//i.test(clean(source?.url)))
        .slice(0, 5).map(source => ({ title: clean(source.title, 200), url: clean(source.url, 1000) })),
    });
  } catch {
    return send(response, 502, { error: 'Olivia no está disponible. Intenta de nuevo.' });
  }
}
