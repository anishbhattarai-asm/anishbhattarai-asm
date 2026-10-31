// Builds README.md and the light and dark SVG images in assets/. Run: node scripts/build.mjs
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { logos } from './logos.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const USER = 'anishbhattarai-asm';
const GITHUB = `https://github.com/${USER}`;
const SITE = `https://${USER}.github.io`;
// Absolute so <source srcset> resolves on the profile page too.
const ASSETS = process.env.ASSETS_URL ?? `https://raw.githubusercontent.com/${USER}/${USER}/main/assets`;
const NAME = 'Anish Bhattarai';
const TAGLINE = ['Open source tools for payments in Nepal,', 'math animation, and video and streaming automation.'];

// box: cmd (shell command), code, link (web address) or text. steps: the "how it works" panel.
const projects = [
  {
    repo: 'nepal-pay',
    name: 'nepal-pay',
    icon: 'card',
    language: 'TypeScript',
    category: 'Payments in Nepal',
    text: 'Zero-dependency TypeScript SDKs for accepting eSewa and Khalti payments safely',
    box: { kind: 'cmd', text: 'npm i @nepalpay/esewa @nepalpay/khalti' },
    meta: ['Zero runtime dependencies', 'MIT'],
    panel: 'Same three calls for eSewa and Khalti',
    mono: true,
    steps: [
      ['initiate()', 'Start a payment'],
      ['parseCallback()', 'Check the signed redirect'],
      ['verify()', 'Confirm with the gateway'],
    ],
    footer: 'Paid only after the gateway confirms the amount.',
    links: [['npm', 'https://www.npmjs.com/package/@nepalpay/esewa'], ['details', `${SITE}/projects/nepal-pay/`]],
  },
  {
    repo: 'nepalqr',
    name: 'nepalqr',
    icon: 'qr',
    language: 'JavaScript',
    category: 'Payments in Nepal',
    text: "Turns a merchant's free static NepalQR into a dynamic QR that carries the amount",
    box: { kind: 'link', text: `${USER}.github.io/nepalqr` },
    meta: ['Zero dependencies', 'Works offline'],
    steps: [
      ['Decode', "Reads the merchant's static QR"],
      ['Set the amount', 'Marks it dynamic, recomputes the checksum'],
      ['Scan', 'The customer sees the amount filled in'],
    ],
    footer: 'No payment aggregator, no integration fees.',
    links: [['web app', `${SITE}/nepalqr/`], ['details', `${SITE}/projects/nepalqr/`]],
  },
  {
    repo: 'DWFS',
    name: 'DWFS',
    icon: 'epicycles',
    language: 'Python',
    category: 'Math and animation',
    text: 'Turns any picture into one continuous line, then spinning circles draw it',
    box: { kind: 'cmd', text: 'pip install dwfs' },
    meta: ['PyPI: dwfs', 'Browser version'],
    steps: [
      ['Trace', 'The picture becomes one closed line'],
      ['Transform', 'A Fourier series of that line'],
      ['Draw', 'Spinning circles redraw it, term by term'],
    ],
    footer: 'Photos, logos, flags, SVG files and text.',
    links: [['try it', `${SITE}/DWFS/`], ['PyPI', 'https://pypi.org/project/dwfs/'], ['details', `${SITE}/projects/dwfs/`]],
  },
  {
    repo: 'MPX',
    name: 'MTPX',
    icon: 'slides',
    language: 'Python',
    category: 'Math and animation',
    text: 'Manim animations as Python methods, exported as a PowerPoint deck',
    box: { kind: 'code', text: 'from mtpx import SlideScene, slide' },
    meta: ['Manim', 'python-pptx', 'FFmpeg'],
    steps: [
      ['@slide', 'Each method is one click'],
      ['Render', 'All slides share one Manim scene'],
      ['Present', 'Open the .pptx, press F5 and click'],
    ],
    footer: 'The animation runs on with no visible cuts.',
    links: [['details', `${SITE}/projects/mpx/`]],
  },
  {
    repo: 'MBDP',
    name: 'AttractorH',
    icon: 'attractor',
    language: 'Python',
    category: 'Math and animation',
    text: 'Cinematic strange attractor renders through Manim, Blender and DaVinci Resolve',
    box: { kind: 'text', text: 'Halvorsen · Lorenz · Aizawa · Thomas' },
    meta: ['GPU path in Blender', 'CPU path in Manim'],
    steps: [
      ['Integrate', 'A fixed-step RK4 solver'],
      ['Render', 'Neon curves in Manim, glow in Blender'],
      ['Grade', 'Final colour grade in DaVinci Resolve'],
    ],
    footer: 'Parameters at the top of each scene file.',
    links: [['details', `${SITE}/projects/mbdp/`]],
  },
  {
    repo: 'CVR',
    name: 'CVR',
    icon: 'code',
    language: 'Python',
    category: 'Video and streaming',
    text: 'Turns a source file into a typewriter-style video in your real VS Code theme',
    box: { kind: 'cmd', text: 'pip install pycvr' },
    meta: ['PyPI: pycvr', 'FFmpeg bundled'],
    steps: [
      ['Read', 'The VS Code themes you have installed'],
      ['Highlight', 'The exact colour VS Code gives each token'],
      ['Render', 'A typing video of the length you ask for'],
    ],
    footer: 'Desktop app, cvr command or Python library.',
    links: [['PyPI', 'https://pypi.org/project/pycvr/'], ['details', `${SITE}/projects/cvr/`]],
  },
  {
    repo: '247yt',
    name: 'Stream Panel',
    icon: 'live',
    language: 'JavaScript',
    category: 'Video and streaming',
    text: 'Runs a 24/7 YouTube live stream from your videos or a lofi playlist on a free server',
    box: { kind: 'text', text: 'Oracle Cloud free tier · OBS · FFmpeg' },
    meta: ['Self-hosted', 'Discord alerts'],
    steps: [
      ['Upload', 'Videos, or a lofi image and music tracks'],
      ['Stream', 'Around the clock, resuming after drops'],
      ['Control', 'From your phone, even while live'],
    ],
    footer: 'Also streams to Twitch, Kick or Facebook.',
    links: [['details', `${SITE}/projects/247yt/`]],
  },
  {
    repo: 'Discord-Ytlive-automesseger',
    name: 'Discord YouTube Live Auto Messenger',
    icon: 'message',
    language: 'JavaScript',
    category: 'Video and streaming',
    text: 'Posts in your Discord server the moment you go live on YouTube, once per stream',
    box: { kind: 'text', text: 'YouTube Data API → Discord webhook' },
    meta: ['Free on Render', 'No payment card'],
    steps: [
      ['Check', 'Your channel through the YouTube API'],
      ['Post', 'Your own message through a webhook'],
      ['Once', 'Exactly one message per stream'],
    ],
    footer: 'No bot account and no database.',
    links: [['details', `${SITE}/projects/discord-ytlive-automesseger/`]],
  },
  {
    repo: 'VCF-Editor',
    name: 'Cardfile',
    icon: 'contact',
    language: 'HTML',
    category: 'Web apps',
    text: 'Free vCard (.vcf) editor that runs entirely in your browser; nothing is uploaded',
    box: { kind: 'link', text: `${USER}.github.io/VCF-Editor` },
    meta: ['Installable', 'Works offline'],
    steps: [
      ['Open', 'Any .vcf contact file'],
      ['Edit', 'Edit, merge and create cards'],
      ['Keep', 'Contacts never leave your device'],
    ],
    footer: 'A free alternative to paid vCard editors.',
    links: [['open it', `${SITE}/VCF-Editor/`], ['details', `${SITE}/projects/vcf-editor/`]],
  },
];

const headerLinks = [
  { label: 'Portfolio', href: `${SITE}/`, icon: 'globe', file: 'link-portfolio' },
  { label: '@nepalpay on npm', href: 'https://www.npmjs.com/org/nepalpay', logo: 'npm', file: 'link-npm' },
  { label: 'dwfs on PyPI', href: 'https://pypi.org/project/dwfs/', logo: 'pypi', file: 'link-dwfs' },
  { label: 'pycvr on PyPI', href: 'https://pypi.org/project/pycvr/', logo: 'pypi', file: 'link-pycvr' },
];

const tryLinks = [
  { label: 'DWFS in your browser', href: `${SITE}/DWFS/`, icon: 'epicycles', file: 'try-dwfs' },
  { label: 'nepalqr web app', href: `${SITE}/nepalqr/`, icon: 'qr', file: 'try-nepalqr' },
  { label: 'Cardfile vCard editor', href: `${SITE}/VCF-Editor/`, icon: 'contact', file: 'try-cardfile' },
];

const toolGroups = [
  ['Languages', ['typescript', 'javascript', 'nodedotjs', 'python', 'html5', 'css']],
  ['Libraries', ['express', 'vitest', 'numpy', 'scipy', 'opencv', 'manim', 'pytest']],
  ['Media', ['ffmpeg', 'blender', 'davinciresolve', 'obsstudio', 'powerpoint', 'vscode']],
  ['Integrations', ['esewa', 'khalti', 'youtube', 'discord', 'twitch', 'kick', 'facebook']],
  ['Hosting', ['githubactions', 'github', 'npm', 'pypi', 'render', 'oracle', 'ubuntu']],
];
const SHORT_NAMES = { githubactions: 'Actions', github: 'Pages', davinciresolve: 'DaVinci', obsstudio: 'OBS' };

// Marks for tools Simple Icons does not carry, drawn in a 24 by 24 box.
const MARKS = {
  esewa: { title: 'eSewa', svg: '<rect width="24" height="24" rx="6" fill="#60bb46"/><text x="12" y="17.5" font-size="17" font-weight="700" text-anchor="middle" fill="#fff">e</text>' },
  khalti: { title: 'Khalti', svg: '<rect width="24" height="24" rx="6" fill="#5c2d91"/><text x="12" y="17.5" font-size="15" font-weight="700" text-anchor="middle" fill="#fff">K</text>' },
  manim: { title: 'Manim', svg: '<circle cx="7" cy="7" r="5" fill="#83c167"/><rect x="13" y="2" width="9" height="9" rx="1" fill="#525893"/><path d="M12 13l6.5 9.5h-13z" fill="#e07a5f"/>' },
  powerpoint: { title: 'PowerPoint', svg: '<rect width="24" height="24" rx="6" fill="#c43e1c"/><text x="12" y="17.5" font-size="15" font-weight="700" text-anchor="middle" fill="#fff">P</text>' },
  vscode: { title: 'VS Code', svg: '<rect width="24" height="24" rx="6" fill="#007acc"/><path d="M9.5 8l-4 4 4 4M14.5 8l4 4-4 4" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' },
  oracle: { title: 'Oracle Cloud', svg: '<rect x="1.5" y="6" width="21" height="12" rx="6" fill="none" stroke="#c74634" stroke-width="3"/>' },
};

const toolTitle = (key) => (key === 'github' ? 'GitHub Pages' : (logos[key] ?? MARKS[key]).title);

const LANGUAGE_COLORS = { TypeScript: '#3178c6', JavaScript: '#f1e05a', Python: '#3572a5', HTML: '#e34c26' };

const THEMES = {
  light: {
    bg: '#ffffff',
    bg2: '#ecfeff',
    surface: '#f6f8fa',
    panel: '#ffffff',
    border: '#d1d9e0',
    text: '#1f2328',
    muted: '#59636e',
    accent: '#0e7490',
    soft: 'rgba(14,116,144,0.10)',
    ring: 'rgba(31,35,40,0.22)',
    glow: 0,
  },
  dark: {
    bg: '#0d1117',
    bg2: '#062a31',
    surface: '#151b23',
    panel: '#0d1117',
    border: '#3d444d',
    text: '#f0f6fc',
    muted: '#9198a1',
    accent: '#22d3ee',
    soft: 'rgba(34,211,238,0.12)',
    ring: 'rgba(240,246,252,0.22)',
    glow: 1,
  },
};

// Line icons drawn in a 24 by 24 box.
const ICONS = {
  card: '<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 10h19M6.5 15h4"/>',
  qr: '<rect x="3.5" y="3.5" width="6.5" height="6.5" rx="1.2"/><rect x="14" y="3.5" width="6.5" height="6.5" rx="1.2"/><rect x="3.5" y="14" width="6.5" height="6.5" rx="1.2"/><path d="M14 14h2.5v2.5H14zM20.5 14v2.5M14 20.5h2.5M18.5 18.5h2v2"/>',
  epicycles: '<circle cx="9.5" cy="13.5" r="6.5"/><path d="M9.5 13.5l4.6-4.6"/><circle cx="14.1" cy="8.9" r="3"/><path d="M14.1 8.9l2.9-.8"/><circle cx="17.6" cy="7.9" r=".9" fill="currentColor"/>',
  slides: '<rect x="3" y="4" width="18" height="12.5" rx="2"/><path d="M12 16.5V20M8.5 20h7"/><path d="M10.3 7.8v5l4-2.5z"/>',
  attractor: '<path d="M12 12c-2-3.6-7.5-5.2-8.3-1.6S8.6 16 12 12s7.5-5.2 8.3-1.6S15.4 16 12 12z"/>',
  code: '<rect x="3" y="4.5" width="18" height="15" rx="2"/><path d="M3 8.5h18M9.5 11.5l-2.5 2.5 2.5 2.5M14.5 11.5l2.5 2.5-2.5 2.5"/>',
  live: '<circle cx="12" cy="12" r="2"/><path d="M16.2 7.8a6 6 0 0 1 0 8.4M7.8 16.2a6 6 0 0 1 0-8.4M19.1 4.9a10 10 0 0 1 0 14.2M4.9 19.1a10 10 0 0 1 0-14.2"/>',
  message: '<path d="M4 4.5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-8.5L7 20.5v-4H4a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1z"/><path d="M10.3 8v5l4-2.5z"/>',
  contact: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10.5" r="2.4"/><path d="M5.6 16.5a3.4 3.4 0 0 1 6.8 0M15 9h3M15 12.5h3"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 2.6 3.8 5.6 3.8 9s-1.2 6.4-3.8 9M12 3c-2.6 2.6-3.8 5.6-3.8 9s1.2 6.4 3.8 9"/>',
};

const SANS = `-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans",Helvetica,Arial,sans-serif`;
const MONO = `ui-monospace,SFMono-Regular,"SF Mono",Menlo,Consolas,"Liberation Mono",monospace`;

const f = (n) => String(Math.round(n * 100) / 100);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

/** Rough rendered width of text; errs wide so wrapped text never overflows. */
function textWidth(s, size, bold = false) {
  let em = 0;
  for (const ch of s) {
    if (" .,:;'|!il1".includes(ch)) em += 0.29;
    else if ('ftrjI()[]-/'.includes(ch)) em += 0.37;
    else if ('mwMW@'.includes(ch)) em += 0.86;
    else if (ch >= 'A' && ch <= 'Z') em += 0.66;
    else em += 0.56;
  }
  return em * size * (bold ? 1.07 : 1);
}

const monoWidth = (s, size) => [...s].length * size * 0.61;

function wrap(text, size, max) {
  const lines = [];
  let line = '';
  for (const word of text.split(' ')) {
    const next = line ? `${line} ${word}` : word;
    if (line && textWidth(next, size) > max) {
      lines.push(line);
      line = word;
    } else line = next;
  }
  return [...lines, line];
}

function fits(label, width, max) {
  if (width > max) throw new Error(`"${label}" is too wide (${Math.round(width)} of ${max})`);
}

function svg(width, height, title, body, css = '') {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(title)}">
<title>${esc(title)}</title>
<style>text{font-family:${SANS}}.mono{font-family:${MONO}}${css}</style>
${body}
</svg>
`;
}

const icon = (name, x, y, size, color, width = 1.8) =>
  `<g transform="translate(${f(x)} ${f(y)}) scale(${f(size / 24)})" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" color="${color}">${ICONS[name]}</g>`;

/** A Simple Icons logo, or one of MARKS, in a size by size box. */
function logo(key, x, y, size, t) {
  const at = `translate(${f(x)} ${f(y)}) scale(${f(size / 24)})`;
  if (MARKS[key]) return `<g transform="${at}">${MARKS[key].svg}</g>`;
  return `<path transform="${at}" fill="${logoColor(key, t)}" d="${logos[key].path}"/>`;
}

/** Brand colour, or the text colour when the brand colour would disappear on this background. */
function logoColor(key, t) {
  const hex = logos[key].hex;
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return t === THEMES.dark && lum < 0.05 ? t.text : `#${hex}`;
}

// Banner: Fourier epicycles drawing the outline of Nepal's flag.

/** The flag outline from the construction in the Constitution of Nepal, with the base AB as 1 and y up. */
function flagOutline() {
  const r = Math.SQRT1_2;
  return [[0, 0], [1, 0], [1 - r, r], [1, r], [0, 4 / 3]];
}

/** Samples a closed polygon at equal arc length steps. */
function sampleClosed(points, n) {
  const segs = points.map((p, i) => [p, points[(i + 1) % points.length]]);
  const lens = segs.map(([a, b]) => Math.hypot(b[0] - a[0], b[1] - a[1]));
  const total = lens.reduce((s, l) => s + l, 0);
  const out = [];
  for (let i = 0; i < n; i++) {
    let d = (i / n) * total;
    let s = 0;
    while (d > lens[s]) d -= lens[s++];
    const [a, b] = segs[s];
    const u = d / lens[s];
    out.push([a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u]);
  }
  return out;
}

function fourier(points, maxK) {
  const n = points.length;
  const terms = [];
  for (let k = -maxK; k <= maxK; k++) {
    let re = 0;
    let im = 0;
    for (let j = 0; j < n; j++) {
      const a = (-2 * Math.PI * k * j) / n;
      re += points[j][0] * Math.cos(a) - points[j][1] * Math.sin(a);
      im += points[j][0] * Math.sin(a) + points[j][1] * Math.cos(a);
    }
    terms.push({ k, re: re / n, im: im / n });
  }
  return terms;
}

function epicycles({ cx, cy, scale, circles, period }) {
  const pts = sampleClosed(flagOutline(), 2048).map(([x, y]) => [cx + scale * (x - 0.5), cy - scale * (y - 2 / 3)]);
  const all = fourier(pts, 80);
  const center = all.find((t) => t.k === 0);
  const chain = all
    .filter((t) => t.k !== 0)
    .map((t) => ({ ...t, r: Math.hypot(t.re, t.im), deg: (Math.atan2(t.im, t.re) * 180) / Math.PI }))
    .sort((a, b) => b.r - a.r)
    .slice(0, circles);

  const at = (time) => {
    let x = center.re;
    let y = center.im;
    for (const t of chain) {
      const a = 2 * Math.PI * t.k * time + (t.deg * Math.PI) / 180;
      x += t.r * Math.cos(a);
      y += t.r * Math.sin(a);
    }
    return [x, y];
  };

  const steps = 720;
  const trace = Array.from({ length: steps + 1 }, (_, i) => at(i / steps));
  const cumulative = [0];
  for (let i = 1; i <= steps; i++) {
    cumulative.push(cumulative[i - 1] + Math.hypot(trace[i][0] - trace[i - 1][0], trace[i][1] - trace[i - 1][1]));
  }
  const length = Math.ceil(cumulative[steps]) + 2;
  const d = 'M' + trace.map(([x, y]) => `${f(x)} ${f(y)}`).join('L');

  // Draws during the first period, holds during the second, then fades.
  const frames = [];
  for (let i = 0; i <= 120; i++) {
    const done = cumulative[Math.round((i / 120) * steps)];
    frames.push(`${f(i / 2.4)}%{stroke-dashoffset:${f(i === 120 ? 0 : length - done)}${i === 0 ? ';opacity:1' : ''}}`);
  }
  let css =
    `.trace{stroke-dasharray:${length};animation:draw ${period * 2}s linear infinite}` +
    `@keyframes draw{${frames.join('')}92%{opacity:1}100%{stroke-dashoffset:0;opacity:0}}` +
    `.spin{animation:${period}s linear infinite}`;

  let groups = `<g transform="translate(${f(center.re)} ${f(center.im)})">`;
  let close = '</g>';
  let prev = { k: 0, deg: 0 };
  chain.forEach((t, i) => {
    const from = t.deg - prev.deg;
    const to = from + 360 * (t.k - prev.k);
    css += `.s${i}{animation-name:s${i}}@keyframes s${i}{from{transform:rotate(${f(from)}deg)}to{transform:rotate(${f(to)}deg)}}`;
    if (t.r > 1.2) groups += `<circle class="ring" r="${f(t.r)}"/>`;
    groups += `<g class="spin s${i}" style="transform:rotate(${f(from)}deg)"><path class="arm" d="M0 0H${f(t.r)}"/><g transform="translate(${f(t.r)} 0)">`;
    close += '</g></g>';
    prev = t;
  });
  groups += `<circle class="pen" r="3.5"/>` + close;

  const target = flagOutline()
    .map(([x, y]) => `${f(cx + scale * (x - 0.5))} ${f(cy - scale * (y - 2 / 3))}`)
    .join('L');
  return { css, body: `<path class="target" d="M${target}Z"/><path class="trace" d="${d}"/>${groups}` };
}

function banner(t) {
  const W = 1200;
  const H = 340;
  const art = epicycles({ cx: 965, cy: 170, scale: 190, circles: 40, period: 18 });
  const chips = ['Payments in Nepal', 'Math animation', 'Video tooling'];
  let x = 64;
  let chipSvg = '';
  for (const label of chips) {
    const w = textWidth(label, 15) + 44;
    chipSvg += `<rect x="${f(x)}" y="262" width="${f(w)}" height="34" rx="17" fill="${t.soft}" stroke="${t.accent}" stroke-opacity=".35"/><circle cx="${f(x + 18)}" cy="279" r="4" fill="${t.accent}"/><text x="${f(x + 30)}" y="284" font-size="15" fill="${t.text}">${esc(label)}</text>`;
    x += w + 12;
  }
  const css =
    art.css +
    `.ring{fill:none;stroke:${t.ring};stroke-width:1}.arm{stroke:${t.ring};stroke-width:1.4;stroke-linecap:round}` +
    `.target{fill:none;stroke:${t.border};stroke-width:1.5;stroke-dasharray:4 6}` +
    `.trace{fill:none;stroke:${t.accent};stroke-width:3;stroke-linejoin:round;stroke-linecap:round${t.glow ? ';filter:url(#glow)' : ''}}` +
    `.pen{fill:${t.accent}}` +
    `@media (prefers-reduced-motion:reduce){.trace,.spin{animation:none}}`;
  const body = `<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${t.bg}"/><stop offset="1" stop-color="${t.bg2}"/></linearGradient>
<radialGradient id="halo" cx="965" cy="170" r="220" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${t.accent}" stop-opacity=".16"/><stop offset="1" stop-color="${t.accent}" stop-opacity="0"/></radialGradient>
<pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M30 0H0V30" fill="none" stroke="${t.border}" stroke-opacity=".45" stroke-width="1"/></pattern>
<linearGradient id="fade" x1="0" x2="1"><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity="1"/></linearGradient>
<mask id="gridMask"><rect width="${W}" height="${H}" fill="url(#fade)"/></mask>
<filter id="glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<clipPath id="frame"><rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="20"/></clipPath>
</defs>
<g clip-path="url(#frame)">
<rect width="${W}" height="${H}" fill="url(#bg)"/>
<rect width="${W}" height="${H}" fill="url(#grid)" mask="url(#gridMask)"/>
<circle cx="965" cy="170" r="220" fill="url(#halo)"/>
${art.body}
</g>
<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="20" fill="none" stroke="${t.border}" stroke-width="1.5"/>
<text class="mono" x="64" y="92" font-size="16" letter-spacing="1" fill="${t.accent}">@${USER}</text>
<text x="62" y="160" font-size="62" font-weight="700" letter-spacing="-1" fill="${t.text}">${NAME}</text>
<text x="64" y="204" font-size="22" fill="${t.muted}">${esc(TAGLINE[0])}</text>
<text x="64" y="234" font-size="22" fill="${t.muted}">${esc(TAGLINE[1])}</text>
${chipSvg}
<text class="mono" x="965" y="326" font-size="12" text-anchor="middle" fill="${t.muted}">Nepal's flag, drawn by 40 rotating circles</text>`;
  return svg(W, H, `${NAME}: ${TAGLINE.join(' ')}`, body, css);
}

function pill(t, { label, icon: iconName, logo: logoKey }) {
  const w = Math.ceil(textWidth(label, 15, true) + 62);
  const h = 40;
  const mark = logoKey ? logo(logoKey, 18, 11, 18, t) : icon(iconName, 17, 10, 20, t.accent, 2);
  const body = `<rect x=".75" y=".75" width="${w - 1.5}" height="${h - 1.5}" rx="${h / 2}" fill="${t.surface}" stroke="${t.border}" stroke-width="1.5"/>
${mark}
<text x="46" y="25.5" font-size="15" font-weight="600" fill="${t.text}">${esc(label)}</text>`;
  return svg(w, h, label, body);
}

/** Language dot and name, then the other facts, left to right. */
function metaRow(t, p, x, y, max) {
  let out = `<circle cx="${x + 5}" cy="${y - 4.5}" r="5.5" fill="${LANGUAGE_COLORS[p.language]}"/><text x="${x + 17}" y="${y}" font-size="13" fill="${t.muted}">${p.language}</text>`;
  let at = x + 17 + textWidth(p.language, 13) + 22;
  for (const item of p.meta) {
    out += `<text x="${f(at)}" y="${y}" font-size="13" fill="${t.muted}">${esc(item)}</text>`;
    at += textWidth(item, 13) + 22;
  }
  fits(`${p.name} meta`, at - 22, max);
  return out;
}

function boxContent(t, { kind, text }, x, y) {
  if (kind === 'link') return `${icon('globe', x, y - 13, 16, t.accent, 2)}<text class="mono" x="${x + 24}" y="${y}" font-size="13" fill="${t.text}">${esc(text)}</text>`;
  if (kind === 'text') return `<text x="${x}" y="${y}" font-size="13.5" fill="${t.text}">${esc(text)}</text>`;
  const prompt = kind === 'cmd' ? `<tspan fill="${t.accent}">$</tspan> ` : '';
  return `<text class="mono" x="${x}" y="${y}" font-size="13" fill="${t.text}">${prompt}${esc(text)}</text>`;
}

function card(t, p) {
  const W = 824;
  const H = 250;
  const nameSize = Math.min(26, (330 / textWidth(p.name, 26, true)) * 26);
  const lines = wrap(p.text, 16, 392);
  if (lines.length > 2) throw new Error(`${p.name}: description needs ${lines.length} lines`);
  fits(`${p.name} box`, p.box.kind === 'text' ? textWidth(p.box.text, 13.5) : monoWidth(p.box.text, 13) + 24, 372);
  for (const [title, what] of p.steps) fits(what, textWidth(what, 12.5), 280);
  fits(p.footer, textWidth(p.footer, 12.5), 300);
  const body = `<rect x=".75" y=".75" width="${W - 1.5}" height="${H - 1.5}" rx="16" fill="${t.surface}" stroke="${t.border}" stroke-width="1.5"/>
<rect x="28" y="28" width="56" height="56" rx="14" fill="${t.soft}"/>
${icon(p.icon, 40, 40, 32, t.accent, 1.7)}
<text x="100" y="58" font-size="${f(nameSize)}" font-weight="700" fill="${t.text}">${esc(p.name)}</text>
<text class="mono" x="101" y="80" font-size="11.5" letter-spacing=".8" fill="${t.accent}">${esc(p.category.toUpperCase())}</text>
${lines.map((l, i) => `<text x="28" y="${120 + i * 23}" font-size="16" fill="${t.muted}">${esc(l)}</text>`).join('\n')}
<rect x="28" y="164" width="400" height="34" rx="8" fill="${t.panel}" stroke="${t.border}"/>
${boxContent(t, p.box, 42, 186)}
${metaRow(t, p, 28, 229, 428)}
<rect x="456" y="24" width="344" height="202" rx="12" fill="${t.panel}" stroke="${t.border}"/>
<text class="mono" x="478" y="54" font-size="12" letter-spacing=".6" fill="${t.muted}">${esc((p.panel ?? 'How it works').toUpperCase())}</text>
<path d="M490 86V168" stroke="${t.border}" stroke-width="2" stroke-dasharray="3 4"/>
${p.steps
  .map(
    ([title, what], i) => `<circle cx="490" cy="${86 + i * 41}" r="12" fill="${t.soft}" stroke="${t.accent}" stroke-width="1.5"/>
<text x="490" y="${90.5 + i * 41}" font-size="12.5" font-weight="700" text-anchor="middle" fill="${t.accent}">${i + 1}</text>
<text${p.mono ? ' class="mono"' : ''} x="514" y="${84 + i * 41}" font-size="14" font-weight="${p.mono ? 600 : 700}" fill="${t.text}">${esc(title)}</text>
<text x="514" y="${101 + i * 41}" font-size="12.5" fill="${t.muted}">${esc(what)}</text>`,
  )
  .join('\n')}
<text x="478" y="208" font-size="12.5" fill="${t.muted}">${esc(p.footer)}</text>`;
  return svg(W, H, `${p.name}: ${p.text}`, body);
}

function tools(t) {
  const W = 824;
  const tile = 54;
  const pitch = 88;
  const row = 96;
  const top = 30;
  const H = top + toolGroups.length * row + 4;
  let body = `<rect x=".75" y=".75" width="${W - 1.5}" height="${H - 1.5}" rx="16" fill="${t.surface}" stroke="${t.border}" stroke-width="1.5"/>`;
  toolGroups.forEach(([group, keys], r) => {
    const y = top + r * row;
    if (r > 0) body += `<path d="M28 ${y - 16}H${W - 28}" stroke="${t.border}"/>`;
    body += `<text class="mono" x="28" y="${y + 32}" font-size="12" letter-spacing=".8" fill="${t.accent}">${group.toUpperCase()}</text>`;
    keys.forEach((key, i) => {
      const x = 180 + i * pitch;
      const name = SHORT_NAMES[key] ?? toolTitle(key);
      fits(name, textWidth(name, 11.5), pitch - 6);
      body += `<rect x="${x + 0.75}" y="${y + 0.75}" width="${tile - 1.5}" height="${tile - 1.5}" rx="13" fill="${t.panel}" stroke="${t.border}" stroke-width="1.5"/>
${logo(key, x + 14, y + 14, 26, t)}
<text x="${x + tile / 2}" y="${y + tile + 17}" font-size="11.5" text-anchor="middle" fill="${t.muted}">${esc(name)}</text>`;
    });
  });
  return svg(W, H, toolsAlt, body);
}

// README

const toolsAlt = `Tools: ${toolGroups.map(([group, keys]) => `${group}: ${keys.map(toolTitle).join(', ')}`).join('. ')}`;

const picture = (file, alt, attrs) =>
  `<picture><source media="(prefers-color-scheme: dark)" srcset="${ASSETS}/${file}-dark.svg"><img alt="${esc(alt)}" src="${ASSETS}/${file}-light.svg" ${attrs}></picture>`;

const pillLinks = (links) =>
  links.map((l) => `  <a href="${l.href}">${picture(l.file, l.label, 'height="40"')}</a>`).join('\n');

const repoUrl = (p) => `${GITHUB}/${p.repo}`;
const cardFile = (p) => `card-${p.repo.toLowerCase()}`;

const readme = `<a href="${SITE}/">${picture('banner', `${NAME}: ${TAGLINE.join(' ')}`, 'width="100%"')}</a>

<p align="center">
${pillLinks(headerLinks)}
</p>

## Projects

<p align="center">
${projects.map((p) => `  <a href="${repoUrl(p)}">${picture(cardFile(p), `${p.name}: ${p.text}`, 'width="824"')}</a>`).join('\n')}
</p>

<p align="center">
${pillLinks(tryLinks)}
</p>

<p align="center">
${pillLinks(headerLinks.slice(1))}
</p>

## Tools

<p align="center">
  ${picture('tools', toolsAlt, 'width="824"')}
</p>

<details>
<summary>All projects as a list</summary>

| Project | What it does | Links |
|-|-|-|
${projects.map((p) => `| [${p.name}](${repoUrl(p)}) | ${p.text} | ${p.links.map(([label, href]) => `[${label}](${href})`).join(' &middot; ')} |`).join('\n')}

</details>
`;

const out = join(ROOT, 'assets');
rmSync(out, { recursive: true, force: true });
mkdirSync(out);
let count = 0;
for (const [mode, t] of Object.entries(THEMES)) {
  const write = (file, content) => {
    writeFileSync(join(out, `${file}-${mode}.svg`), content);
    count++;
  };
  write('banner', banner(t));
  write('tools', tools(t));
  for (const p of projects) write(cardFile(p), card(t, p));
  for (const l of [...headerLinks, ...tryLinks]) write(l.file, pill(t, l));
}
writeFileSync(join(ROOT, 'README.md'), readme);
console.log(`README.md and ${count} images written`);
