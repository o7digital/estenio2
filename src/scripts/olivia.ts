export {};

type Message = { role: 'user' | 'assistant'; content: string };
type Reply = { reply: string; clientCode: string; mode: string; model: string; handoffRecommended: boolean; sources?: {title: string; url: string}[] };
const dialog = document.querySelector<HTMLDialogElement>('#olivia-dialog')!;
const launch = document.querySelector<HTMLButtonElement>('#olivia-launch')!;
const close = document.querySelector<HTMLButtonElement>('#olivia-close')!;
const form = document.querySelector<HTMLFormElement>('#olivia-form')!;
const input = document.querySelector<HTMLTextAreaElement>('#olivia-input')!;
const send = document.querySelector<HTMLButtonElement>('#olivia-send')!;
const reset = document.querySelector<HTMLButtonElement>('#olivia-reset')!;
const log = document.querySelector<HTMLElement>('#olivia-log')!;
const status = document.querySelector<HTMLElement>('#olivia-status')!;
const contact = document.querySelector<HTMLAnchorElement>('#olivia-contact')!;
const suggestions = [...document.querySelectorAll<HTMLButtonElement>('[data-olivia-prompt]')];
const greeting = log.querySelector('p')!.textContent!;
const storageKey = 'estenio2:olivia-v2';
let messages: Message[] = [];
let visitorId = crypto.randomUUID();
let busy = false;
let previousOverflow = '';
launch.hidden = false;

function append(message: Message, sources: Reply['sources'] = []) {
  const article = document.createElement('article');
  article.className = `olivia-message ${message.role}`;
  const author = document.createElement('b');
  author.textContent = message.role === 'user' ? 'Tú' : 'Olivia';
  const paragraph = document.createElement('p');
  for (const part of message.content.split(/(\*\*[^*]+\*\*)/g)) {
    if (part.startsWith('**') && part.endsWith('**')) {
      const bold = document.createElement('strong'); bold.textContent = part.slice(2, -2); paragraph.append(bold);
    } else paragraph.append(document.createTextNode(part));
  }
  article.append(author, paragraph);
  for (const source of sources || []) {
    try {
      const url = new URL(source.url);
      if (!['http:', 'https:'].includes(url.protocol)) continue;
      const link = document.createElement('a');
      link.href = url.href; link.textContent = source.title || url.hostname;
      link.className = 'olivia-source'; link.target = '_blank'; link.rel = 'noopener noreferrer'; article.append(link);
    } catch { /* Ignore invalid reference URLs. */ }
  }
  log.append(article); log.scrollTop = log.scrollHeight;
}
function persist() {
  try { sessionStorage.setItem(storageKey, JSON.stringify({ visitorId, messages })); } catch { /* Storage is optional. */ }
}
try {
  const saved = JSON.parse(sessionStorage.getItem(storageKey) || 'null');
  if (saved && /^[a-zA-Z0-9_-]{1,80}$/.test(saved.visitorId) && Array.isArray(saved.messages)) {
    visitorId = saved.visitorId;
    messages = saved.messages.filter((turn: Message) => ['user', 'assistant'].includes(turn?.role) && typeof turn.content === 'string' && turn.content.length > 0 && turn.content.length <= 4000).slice(-12);
    messages.forEach(message => append(message));
  }
} catch { /* Start fresh when storage is unavailable. */ }

launch.addEventListener('click', () => {
  previousOverflow = document.documentElement.style.overflow;
  document.documentElement.style.overflow = 'hidden';
  dialog.showModal(); launch.setAttribute('aria-expanded', 'true'); input.focus({preventScroll: true}); log.scrollTop = log.scrollHeight;
});
close.addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => { document.documentElement.style.overflow = previousOverflow; launch.setAttribute('aria-expanded', 'false'); launch.focus({preventScroll: true}); });
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});

form.addEventListener('submit', async event => {
  event.preventDefault();
  const message = input.value.trim();
  if (!message || busy) return;
  busy = true; send.disabled = reset.disabled = true; suggestions.forEach(button => button.disabled = true);
  input.readOnly = true; form.setAttribute('aria-busy', 'true');
  status.textContent = 'Olivia está preparando tu respuesta…'; delete status.dataset.error; contact.hidden = true;
  const previousCount = log.children.length;
  append({role: 'user', content: message}); input.value = '';
  try {
    const response = await fetch('/api/olivia', {
      method: 'POST', headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({message, history: messages.slice(-12), visitorId}), signal: AbortSignal.timeout(58000),
    });
    if (!response.ok) throw new Error('unavailable');
    const answer = await response.json() as Reply;
    if (answer.clientCode !== 'estenio' || answer.mode !== 'olivia-v2' || !answer.model || typeof answer.reply !== 'string' || !answer.reply.trim()) throw new Error('invalid_reply');
    const turns: Message[] = [{role: 'user', content: message}, {role: 'assistant', content: answer.reply}];
    messages = [...messages, ...turns].slice(-12); append(turns[1], answer.sources); persist();
    status.textContent = ''; contact.hidden = !answer.handoffRecommended;
  } catch {
    while (log.children.length > previousCount) log.lastElementChild?.remove();
    input.value = message; status.textContent = 'Olivia no está disponible. Intenta de nuevo o contacta a Estenio.'; status.dataset.error = 'true'; contact.hidden = false;
  } finally {
    busy = false; send.disabled = reset.disabled = false; suggestions.forEach(button => button.disabled = false);
    input.readOnly = false; form.removeAttribute('aria-busy');
    if (dialog.open) input.focus({preventScroll: true});
  }
});
input.addEventListener('keydown', event => {
  if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) { event.preventDefault(); form.requestSubmit(); }
});
suggestions.forEach(button => button.addEventListener('click', () => { input.value = button.dataset.oliviaPrompt!; form.requestSubmit(); }));
reset.addEventListener('click', () => {
  if (busy) return;
  messages = []; visitorId = crypto.randomUUID(); persist(); log.replaceChildren(); append({role: 'assistant', content: greeting});
  status.textContent = ''; delete status.dataset.error; input.value = ''; contact.hidden = true; input.focus({preventScroll: true});
});
