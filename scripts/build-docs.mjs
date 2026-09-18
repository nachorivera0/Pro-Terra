// Genera los PDFs de public/docs (fichas, catálogo, manuales) y sus miniaturas
// a partir de data/products.json y data/technical.json.
//
// Uso:  node scripts/build-docs.mjs
// Requiere Microsoft Edge o Google Chrome instalado (se usa en modo headless) y
// Python con Pillow (solo para reducir el peso de las fotos dentro de los PDF).
// Podés indicar otro navegador con la variable de entorno BROWSER_PATH.

import { readFileSync, writeFileSync, mkdirSync, existsSync, mkdtempSync, rmSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const products = JSON.parse(readFileSync(join(root, 'data/products.json'), 'utf8'));
const tech = JSON.parse(readFileSync(join(root, 'data/technical.json'), 'utf8'));

const outDir = join(root, 'public/docs');
const thumbDir = join(outDir, 'thumbs');
mkdirSync(thumbDir, { recursive: true });
const work = mkdtempSync(join(tmpdir(), 'proterra-docs-'));

const browser = [
  process.env.BROWSER_PATH,
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].find((p) => p && existsSync(p));
if (!browser) throw new Error('No se encontró Edge/Chrome. Definí BROWSER_PATH.');

const img = (p) => pathToFileURL(join(root, 'public', p)).href;

// Copias livianas (JPG 1000 px) de las fotos de producto para no inflar los PDFs.
const slim = {};
for (const p of products.products) {
  const out = join(work, `${p.id}.jpg`);
  execFileSync('python', ['-c', `from PIL import Image; im=Image.open(r"${join(root, 'public', p.image)}").convert("RGB"); im.thumbnail((1000,1000)); im.save(r"${out}", quality=82, optimize=True)`]);
  slim[p.image] = pathToFileURL(out).href;
}
const photo = (p) => slim[p.image];
const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const LOGO = img('Gemini_Generated_Image_x0x8gvx0x8gvx0x8-removebg-preview.png');
const YEAR = 2026;

/* ------------------------------------------------------------------ CSS */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
@page { size: A4; margin: 0; }
:root { --dark:#1B4D2E; --mid:#2E7D3E; --lime:#6BBF3C; --light:#F5F5F5; --ink:#1A1A1A; --mute:#5b625d; --line:#dfe5df; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { background: #fff; }
body { font-family: 'DM Sans', 'Segoe UI', system-ui, sans-serif; color: var(--ink); font-size: 9.2pt; line-height: 1.45; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.serif { font-family: 'Playfair Display', Georgia, serif; }
.pg { width: 210mm; height: 297mm; padding: 13mm 15mm 12mm; display: flex; flex-direction: column; overflow: hidden; page-break-after: always; break-after: page; position: relative; }
.pg:last-child { page-break-after: auto; break-after: auto; }
.pg > * { flex-shrink: 0; }
.pg > .ftr { margin-top: auto; }
.hdr { display: flex; align-items: center; justify-content: space-between; padding-bottom: 4mm; border-bottom: 0.6mm solid var(--dark); margin-bottom: 6mm; }
.hdr img { height: 11mm; }
.hdr .tag { text-align: right; font-size: 8pt; letter-spacing: .14em; text-transform: uppercase; color: var(--mid); font-weight: 600; }
.hdr .tag small { display: block; color: var(--mute); letter-spacing: 0; text-transform: none; font-weight: 400; font-size: 8pt; margin-top: .5mm; }
.ftr { margin-top: auto; padding-top: 3.5mm; border-top: 0.3mm solid var(--line); display: flex; justify-content: space-between; align-items: flex-end; gap: 8mm; font-size: 7.4pt; color: var(--mute); line-height: 1.4; }
.ftr .n { font-weight: 600; color: var(--dark); white-space: nowrap; }
.eyebrow { font-size: 7.8pt; letter-spacing: .16em; text-transform: uppercase; color: var(--mid); font-weight: 700; margin-bottom: 1.5mm; }
h1 { font-family: 'Playfair Display', Georgia, serif; font-size: 25pt; line-height: 1.12; color: var(--dark); font-weight: 700; }
h2 { font-family: 'Playfair Display', Georgia, serif; font-size: 14pt; color: var(--dark); font-weight: 700; margin: 5mm 0 2.2mm; }
h2:first-child { margin-top: 0; }
h3 { font-size: 10pt; color: var(--dark); font-weight: 700; margin-bottom: 1mm; }
p { margin-bottom: 2mm; text-align: left; }
.lead { font-size: 10.6pt; color: #2b2f2c; }
.muted { color: var(--mute); }
.small { font-size: 8pt; }
ul.dots { list-style: none; }
ul.dots li { position: relative; padding-left: 4.2mm; margin-bottom: 1.4mm; }
ul.dots li::before { content: ''; position: absolute; left: 0; top: 2.1mm; width: 1.7mm; height: 1.7mm; border-radius: 50%; background: var(--lime); }
table.spec { width: 100%; border-collapse: collapse; font-size: 8.8pt; border: 0.3mm solid var(--line); border-radius: 2mm; overflow: hidden; }
table.spec th { text-align: left; font-weight: 500; color: var(--mute); padding: 1.45mm 3.2mm; width: 44%; vertical-align: top; }
table.spec td { font-weight: 600; padding: 1.45mm 3.2mm; text-align: right; vertical-align: top; }
table.spec tr:nth-child(even) { background: #f6f8f5; }
table.spec tr + tr th, table.spec tr + tr td { border-top: 0.2mm solid var(--line); }
table.grid { width: 100%; border-collapse: collapse; font-size: 8.8pt; }
table.grid thead th { background: var(--dark); color: #fff; font-weight: 600; text-align: left; padding: 2.2mm 3mm; }
table.grid td, table.grid tbody th { padding: 2mm 3mm; vertical-align: top; border-bottom: 0.2mm solid var(--line); text-align: left; }
table.grid tbody th { font-weight: 600; color: var(--dark); width: 26%; }
table.grid tbody tr:nth-child(even) { background: #f6f8f5; }
.tiles { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3mm; margin: 4mm 0 4mm; }
.tile { background: var(--light); border-radius: 2.5mm; padding: 3.2mm 4mm; border-left: 1.2mm solid var(--lime); }
.tile .k { font-size: 7.4pt; letter-spacing: .1em; text-transform: uppercase; color: var(--mute); font-weight: 600; }
.tile .v { font-family: 'Playfair Display', Georgia, serif; font-size: 15pt; color: var(--dark); font-weight: 700; line-height: 1.2; margin-top: .8mm; }
.pill { display: inline-block; padding: .8mm 3mm; border-radius: 10mm; font-size: 8pt; font-weight: 600; background: var(--dark); color: var(--lime); }
.chip { display: inline-block; padding: .6mm 2.6mm; border-radius: 10mm; font-size: 8.2pt; background: #eaf3e5; color: var(--dark); font-weight: 500; margin: 0 1.2mm 1.4mm 0; }
.two { display: grid; grid-template-columns: 1fr 1fr; gap: 6mm; }
.three { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3.5mm; }
.card { border: 0.3mm solid var(--line); border-radius: 2.5mm; padding: 3.6mm 4.2mm; }
.card.dark { background: var(--dark); color: #fff; border: none; }
.card.dark h3 { color: var(--lime); }
.callout { background: #eef6ea; border-left: 1.2mm solid var(--lime); border-radius: 0 2mm 2mm 0; padding: 3mm 4mm; font-size: 9pt; margin: 3mm 0; }
.swatch { width: 100%; height: 11mm; border-radius: 2mm; margin-bottom: 2mm; }
.hero { display: grid; grid-template-columns: 1fr 56mm; gap: 7mm; align-items: center; }
.hero .photo { width: 56mm; height: 38mm; border-radius: 3mm; overflow: hidden; }
.hero .photo img { width: 100%; height: 100%; object-fit: cover; }
.control { margin-bottom: 2.4mm; }
.control b { color: var(--dark); }
.figure { margin: 2mm 0 3mm; border: 0.3mm solid var(--line); border-radius: 2.5mm; overflow: hidden; background: #fff; }
.figure img { width: 100%; display: block; }
.cover { padding: 0; background: var(--dark); color: #fff; }
.cover .top { padding: 16mm 18mm 0; }
.cover .top img { height: 20mm; filter: brightness(0) invert(1); }
.cover .mid { padding: 0 18mm; margin-top: 30mm; }
.cover h1 { color: #fff; font-size: 40pt; line-height: 1.05; }
.cover .sub { color: rgba(255,255,255,.78); font-size: 13pt; margin-top: 5mm; max-width: 130mm; font-weight: 300; }
.cover .eyebrow { color: var(--lime); font-size: 9pt; }
.cover .bar { height: 1.2mm; width: 26mm; background: var(--lime); margin: 7mm 0 0; }
.cover .prods { margin-top: auto; display: grid; grid-template-columns: repeat(3, 1fr); }
.cover .prods div { height: 92mm; background-size: cover; background-position: center; position: relative; }
.cover .prods div span { position: absolute; left: 5mm; bottom: 4mm; background: rgba(27,77,46,.92); color: var(--lime); padding: 1mm 3.2mm; border-radius: 10mm; font-weight: 700; font-size: 9pt; letter-spacing: .06em; }
.cover .foot { padding: 6mm 18mm 8mm; font-size: 8.4pt; color: rgba(255,255,255,.7); display: flex; justify-content: space-between; }
.band-head { padding: 9mm 15mm 8mm; margin: -13mm -15mm 7mm; background: var(--dark); color: #fff; }
.band-head img { height: 14mm; filter: brightness(0) invert(1); margin-bottom: 8mm; display: block; }
.band-head h1 { color: #fff; font-size: 24pt; }
.band-head .eyebrow { color: var(--lime); }
.band-head p { color: rgba(255,255,255,.8); margin: 2.5mm 0 0; max-width: 150mm; }
.step { display: grid; grid-template-columns: 9mm 1fr; gap: 3mm; margin-bottom: 3mm; }
.step .num { width: 9mm; height: 9mm; border-radius: 50%; background: var(--dark); color: var(--lime); font-weight: 700; display: flex; align-items: center; justify-content: center; font-size: 10pt; }
.code { display: flex; gap: 2mm; margin: 2mm 0 3mm; }
.code div { background: var(--dark); color: #fff; border-radius: 2mm; padding: 2mm 3.6mm; text-align: center; }
.code div b { display: block; font-size: 12pt; color: var(--lime); letter-spacing: .04em; }
.code div span { font-size: 7.4pt; color: rgba(255,255,255,.8); }
.code i { align-self: center; color: var(--mute); font-style: normal; font-weight: 700; }
`;

/* ------------------------------------------------------------- Bloques */
const table = (rows) =>
  `<table class="spec"><tbody>${rows
    .map((r) => `<tr><th>${esc(r.label)}</th><td>${esc(r.value)}</td></tr>`)
    .join('')}</tbody></table>`;

const header = (kind, sub) => `
  <div class="hdr">
    <img src="${LOGO}" alt="Pro-Terra" />
    <div class="tag">${esc(kind)}<small>${esc(sub || '')}</small></div>
  </div>`;

const footer = (n, total, note) => `
  <div class="ftr">
    <div>${esc(note || `Pro-Terra · ${tech.contact.location}`)}<br/>${esc(tech.contact.email)} · ${esc(tech.contact.phone)} · ${esc(tech.contact.web)}</div>
    <div class="n">${n} / ${total}</div>
  </div>`;

const list = (items) => `<ul class="dots">${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`;
const chips = (items) => items.map((i) => `<span class="chip">${esc(i)}</span>`).join('');
const paras = (items) => items.map((t) => `<p>${esc(t)}</p>`).join('');
const html = (body, title) =>
  `<!doctype html><html lang="es"><head><meta charset="utf-8"/><title>${esc(title)}</title><style>${css}</style></head><body>${body}</body></html>`;

/* ------------------------------------------------------------- Fichas */
function ficha(p) {
  // El TVP tiene más parámetros y grados granulométricos: su ficha lleva 3 páginas.
  const total = p.grades ? 3 : 2;
  const note = `Ficha técnica ${p.sigla} · ${products.disclaimer}`;
  const head = header('Ficha técnica', `${p.fullName} · Edición ${YEAR}`);
  const tiles = [
    { k: p.physical[0].label, v: p.physical[0].value.replace('Mín. ', '≥ ').replace('Máx. ', '≤ ') },
    { k: p.physical[1].label, v: p.physical[1].value.replace('Máx. ', '≤ ') },
    { k: 'Vida útil', v: p.storage.shelfLife },
  ];

  const page1 = `
  <section class="pg">
    ${head}
    <div class="hero">
      <div>
        <span class="pill">${esc(p.sigla)}</span>
        <h1 style="margin-top:2.5mm">${esc(p.name)}</h1>
        <p class="muted" style="margin-top:2mm">${esc(p.appearance)}</p>
      </div>
      <div class="photo"><img src="${photo(p)}" alt="${esc(p.sigla)}"/></div>
    </div>
    <div class="tiles">
      ${tiles.map((t) => `<div class="tile"><div class="k">${esc(t.k)}</div><div class="v">${esc(t.v)}</div></div>`).join('')}
    </div>
    ${paras(p.overview)}
    <h2>Especificaciones fisicoquímicas</h2>
    ${table(p.physical)}
    ${footer(1, total, note)}
  </section>`;

  const grades = p.grades
    ? `<h2>Grados granulométricos</h2>
       <table class="grid"><thead><tr><th>Grado</th><th>Tamaño orientativo</th><th>Aplicación principal</th></tr></thead>
       <tbody>${p.grades.map((g) => `<tr><th>${esc(g.grade)}</th><td>${esc(g.size)}</td><td>${esc(g.use)}</td></tr>`).join('')}</tbody></table>
       <p class="small muted" style="margin-top:2mm">${esc(p.densityNote)}</p>`
    : '';
  const process = `<div class="callout"><b>Obtención.</b> ${esc(p.process)} <b>Rendimiento:</b> ${esc(p.yield)}.</div>`;
  const controls = `<h2>Criterios de control</h2>${p.controls.map((c) => `<div class="control"><b>${esc(c.label)}.</b> ${esc(c.text)}</div>`).join('')}`;
  const storage = `
    <div class="two" style="margin-top:4mm">
      <div class="card">
        <h3>Almacenamiento</h3>
        ${list([p.storage.temperature, p.storage.humidity, `Vida útil: ${p.storage.shelfLife}`, 'Ambiente seco, limpio, ventilado y sin luz solar directa'])}
      </div>
      <div class="card">
        <h3>Presentación</h3>
        ${list(p.presentation)}
      </div>
    </div>
    <div style="margin-top:3.5mm"><span class="eyebrow">Aplicaciones</span><br/>${chips(p.applications)}</div>`;
  const micro = `<h2>Especificaciones microbiológicas${p.id === 'tvp' ? ' y contaminantes' : ''}</h2>${table(p.microbiological)}`;

  const pages = p.grades
    ? `<section class="pg">${head}${micro}${grades}<h2>Desempeño funcional</h2>${list(p.textureNotes)}${process}${footer(2, total, note)}</section>
       <section class="pg">${head}${controls}<h2>Almacenamiento y presentación</h2>${storage}${footer(3, total, note)}</section>`
    : `<section class="pg">${head}${micro}${process}${controls}${storage}${footer(2, total, note)}</section>`;

  return html(page1 + pages, `Ficha técnica ${p.sigla} — Pro-Terra`);
}

/* ------------------------------------------------------------ Catálogo */
function catalogo() {
  const P = products.products;
  const total = 6;
  const cover = `
  <section class="pg cover">
    <div class="top"><img src="${LOGO}" alt="Pro-Terra"/></div>
    <div class="mid">
      <div class="eyebrow">Catálogo ${YEAR}</div>
      <h1 class="serif">Ingredientes proteicos de soja</h1>
      <div class="bar"></div>
      <p class="sub">SPI · SPC · TVP. Alto valor agregado para la industria alimentaria, producidos en el Polo Industrial San Lorenzo, Santa Fe.</p>
    </div>
    <div class="prods">
      ${P.map((p) => `<div style="background-image:url('${photo(p)}')"><span>${p.sigla}</span></div>`).join('')}
    </div>
    <div class="foot"><span>${esc(tech.contact.email)}</span><span>${esc(tech.contact.web)}</span></div>
  </section>`;

  const row = (label, fn) => `<tr><th>${esc(label)}</th>${P.map((p) => `<td>${esc(fn(p))}</td>`).join('')}</tr>`;
  const find = (p, label) => (p.physical.find((r) => r.label === label) || { value: '—' }).value;
  const comparison = `
  <section class="pg">
    ${header('Catálogo de productos', `Edición ${YEAR}`)}
    <div class="eyebrow">Portafolio</div>
    <h1 style="font-size:20pt">Tres ingredientes, tres funciones</h1>
    <p class="lead" style="margin-top:3mm">Trabajamos a partir de harina de soja desgrasada. Según el proceso obtenemos un aislado de alta pureza (SPI), un concentrado versátil (SPC) o una proteína texturizada con estructura propia (TVP).</p>
    <h2>Comparativo técnico</h2>
    <table class="grid">
      <thead><tr><th></th>${P.map((p) => `<th>${esc(p.sigla)}</th>`).join('')}</tr></thead>
      <tbody>
        ${row('Producto', (p) => p.name)}
        ${row('Proteína (base seca)', (p) => find(p, 'Proteína (base seca)'))}
        ${row('Humedad', (p) => find(p, 'Humedad'))}
        ${row('Grasa', (p) => find(p, 'Grasa libre') !== '—' ? find(p, 'Grasa libre') : find(p, 'Grasa'))}
        ${row('Cenizas', (p) => find(p, 'Cenizas'))}
        ${row('Forma', (p) => p.form)}
        ${row('Color', (p) => find(p, 'Color'))}
        ${row('Vida útil', (p) => p.storage.shelfLife)}
        ${row('Presentación', (p) => 'Bolsa 20 kg')}
        ${row('Franja de identificación', (p) => p.band.name)}
      </tbody>
    </table>
    <h2>¿Cuál necesito?</h2>
    <div class="three">
      ${P.map((p) => `<div class="card"><h3>${esc(p.sigla)}</h3><p class="small" style="margin-bottom:2mm">${esc(p.summary)}</p>${chips(p.applications)}</div>`).join('')}
    </div>
    ${footer(2, total)}
  </section>`;

  const productPage = (p, n) => `
  <section class="pg">
    ${header('Catálogo de productos', `${p.sigla} · ${p.name}`)}
    <div class="hero">
      <div>
        <span class="pill">${esc(p.sigla)}</span>
        <h1 style="margin-top:2.5mm;font-size:22pt">${esc(p.name)}</h1>
        <p class="muted" style="margin-top:2mm">${esc(p.badge)}</p>
      </div>
      <div class="photo"><img src="${photo(p)}" alt="${esc(p.sigla)}"/></div>
    </div>
    <p class="lead" style="margin-top:5mm">${esc(p.summary)}</p>
    ${paras(p.overview.slice(0, 1))}
    <div class="two" style="margin-top:2mm">
      <div><h2>Especificaciones clave</h2>${table(p.cardSpecs.filter((r) => !['Vida útil', 'Presentación'].includes(r.label)))}</div>
      <div>
        <h2>Aplicaciones</h2>${list(p.applications)}
        <h2>Funcionalidad</h2>${list(p.functional)}
      </div>
    </div>
    <div class="two" style="margin-top:2mm">
      <div><h2>Microbiología</h2>${table(p.microbiological)}</div>
      <div><h2>Almacenamiento</h2>${table([
        { label: 'Temperatura', value: p.storage.temperature },
        { label: 'Humedad relativa', value: 'Menor a 65 %' },
        { label: 'Vida útil', value: p.storage.shelfLife },
        { label: 'Presentación', value: 'Bolsa multicapa 20 kg' },
      ])}</div>
    </div>
    ${footer(n, total, `${p.sigla}: ver ficha técnica completa en ${tech.contact.web}`)}
  </section>`;

  const closing = `
  <section class="pg">
    ${header('Catálogo de productos', 'Packaging, calidad y normativa')}
    <h2>Packaging</h2>
    <div class="two">
      <div>
        <p><b>Bolsa multicapa de papel kraft, 20 kg netos.</b> Cinco capas con función diferenciada: papel kraft exterior, dos capas intermedias de rigidez, película barrera de polietileno y liner interno apto contacto con alimentos.</p>
        <p class="small muted">Pallet normalizado ARLOG (IRAM 10016), 30 bolsas por pallet (600 kg netos). Envasado con inyección de nitrógeno. Big bag (FIBC) de 800–1.000 kg para clientes de gran escala: próxima incorporación.</p>
      </div>
      <div class="three" style="grid-template-columns:repeat(3,1fr)">
        ${tech.packaging.colors.map((c) => `<div><div class="swatch" style="background:${c.hex}"></div><b>${esc(c.sigla)}</b><div class="small muted">${esc(c.name)}</div></div>`).join('')}
      </div>
    </div>
    <div class="figure"><img src="${img('img/packaging-despiece.png')}" alt="Despiece de la bolsa y colores por producto"/></div>
    <h2>Calidad y trazabilidad</h2>
    <p>Cada lote se identifica con un código <b>${esc(tech.traceability.format)}</b> (por ejemplo <b>${esc(tech.traceability.example)}</b>), impreso en cada bolsa y big bag. Los registros se retienen un mínimo de 5 años y el bloqueo de un lote se realiza en hasta 4 horas.</p>
    <p>Las especificaciones se verifican con métodos oficiales AOAC, AOCS y FDA BAM. La ausencia de <i>Salmonella</i> es criterio obligatorio de liberación en los tres productos.</p>
    <h2>Marco regulatorio</h2>
    ${list(['Registro Nacional de Establecimiento (RNE) y Registro Nacional de Producto Alimenticio (RNPA) por producto', 'Buenas prácticas de manufactura del Código Alimentario Argentino', 'Certificación ISO 22000 voluntaria, contemplada en el plan de la empresa'])}
    <h2>Contacto comercial y técnico</h2>
    <div class="card dark">
      <h3>Solicitá una muestra o la ficha técnica completa</h3>
      <p style="margin:0">${esc(tech.contact.email)} · ${esc(tech.contact.phone)}<br/>${esc(tech.contact.location)}</p>
    </div>
    ${footer(6, total)}
  </section>`;

  return html(cover + comparison + productPage(P[0], 3) + productPage(P[1], 4) + productPage(P[2], 5) + closing, 'Catálogo de productos 2026 — Pro-Terra');
}

/* ------------------------------------------------- Manual: almacenamiento */
function manualAlmacenamiento() {
  const total = 3;
  const S = tech.storage;
  const note = 'Manual de almacenamiento y manipulación · Pro-Terra';
  const sub = `Manual · Edición ${YEAR}`;
  const codeBlocks = tech.traceability.parts
    .map((c, i) => `${i ? '<i>-</i>' : ''}<div><b>${esc(c.code)}</b><span>${esc(c.label)}</span></div>`)
    .join('');

  const p1 = `
  <section class="pg">
    <div class="band-head">
      <img src="${LOGO}" alt="Pro-Terra"/>
      <div class="eyebrow">Manual técnico</div>
      <h1 class="serif">Almacenamiento y manipulación</h1>
      <p>Cómo recibir, guardar y manejar SPI, SPC y TVP para conservar sus propiedades durante toda la vida útil.</p>
    </div>
    <h2>1. Alcance</h2>
    <p>Este manual aplica a los tres productos del portafolio (Aislado, Concentrado y Proteína Vegetal Texturizada), en bolsas multicapa de 20 kg y, cuando se incorpore, en big bag. Los tres son ingredientes secos e <b>higroscópicos</b>: la humedad es el principal enemigo de su calidad.</p>
    <h2>2. Condiciones de almacenamiento</h2>
    <div class="tiles" style="grid-template-columns:repeat(2,1fr)">
      <div class="tile"><div class="k">Temperatura</div><div class="v">${esc(S.temperature)}</div></div>
      <div class="tile"><div class="k">Humedad relativa</div><div class="v">Menor a 65 %</div></div>
      <div class="tile"><div class="k">Ambiente</div><div class="v" style="font-size:11pt">Seco, limpio y ventilado</div></div>
      <div class="tile"><div class="k">Luz solar</div><div class="v" style="font-size:11pt">Sin exposición directa</div></div>
    </div>
    <p>Con el envase cerrado y en estas condiciones, la vida útil se cuenta desde la fecha de elaboración:</p>
    <table class="grid" style="max-width:110mm"><thead><tr><th>Producto</th><th>Vida útil</th></tr></thead>
      <tbody>${S.shelfLife.map((s) => `<tr><th>${esc(s.product)}</th><td>${esc(s.value)}</td></tr>`).join('')}</tbody></table>
    <p class="small muted" style="margin-top:2mm">La mayor vida útil de la TVP se debe a su estructura seca y al tratamiento térmico de la extrusión.</p>
    <h2>3. Higroscopicidad: qué ocurre con cada producto</h2>
    <table class="grid"><thead><tr><th>Producto</th><th>Efecto de la humedad y precauciones</th></tr></thead>
      <tbody>${S.productNotes.map((n) => `<tr><th>${esc(n.product)}</th><td>${esc(n.text)}</td></tr>`).join('')}</tbody></table>
    <div class="callout"><b>Regla práctica.</b> Mantené el envase cerrado hasta el momento de usarlo y volvé a cerrarlo después de cada uso. La bolsa multicapa protege al producto sólo mientras conserva su integridad.</div>
    ${footer(1, total, note)}
  </section>`;

  const p2 = `
  <section class="pg">
    ${header('Manual de almacenamiento', sub)}
    <h2>4. Recepción y estiba</h2>
    ${table(S.logistics)}
    <h3 style="margin-top:4mm">Al recibir la mercadería, verificá:</h3>
    ${list([
      'Que las bolsas estén íntegras, sin roturas, humedad ni pérdidas de producto.',
      'Que el rótulo indique producto y sigla, peso neto, lote y condiciones de almacenamiento.',
      'Que figuren el RNE, el RNPA y la leyenda de ingrediente para uso industrial.',
      'Que la franja de color corresponda al producto pedido (SPI verde oscuro, SPC verde claro, TVP marrón).',
    ])}
    <h2>5. Rotación de stock: FEFO</h2>
    <p>Pro-Terra despacha bajo el criterio <b>FEFO (First Expired, First Out)</b>: sale primero lo que vence primero. Recomendamos aplicar el mismo criterio en el depósito del cliente, identificando los pallets por lote y fecha de elaboración.</p>
    <h2>6. Manipulación</h2>
    <div class="two">
      <div class="card"><h3>Bolsas de 20 kg</h3>${list(['Se manipulan a mano durante la dosificación, bajo procedimientos ergonómicos adecuados.', 'Los pallets se movilizan con autoelevador o apilador, no a mano.'])}</div>
      <div class="card"><h3>TVP</h3>${list(['Estructura porosa y quebradiza: evitar golpes y compresión para no generar finos.', 'No apoyar cerca de químicos, combustibles ni materiales aromáticos.'])}</div>
    </div>
    <div class="callout">Big bag (FIBC): presentación de próxima incorporación. Se descarga por la válvula inferior tipo pétalo hacia tolvas o estaciones de dosificación; puede cerrarse total o parcialmente para evitar derrames. Ver el <b>Manual de packaging e identificación</b>.</div>
    ${footer(2, total, note)}
  </section>`;

  const p3 = `
  <section class="pg">
    ${header('Manual de almacenamiento', sub)}
    <h2>7. Identificación y trazabilidad</h2>
    <p>Cada bolsa y cada big bag lleva impreso un código de lote con el formato <b>${esc(tech.traceability.format)}</b>. Ejemplo:</p>
    <div class="code">${codeBlocks}</div>
    <p class="small muted">Ante cualquier consulta o reclamo, informá siempre el código de lote completo: permite reconstruir el historial del lote (materia prima, proceso, análisis y entrega).</p>
    ${table(tech.traceability.facts)}
    <h2>8. Ante un desvío</h2>
    <div class="step"><div class="num">1</div><div><h3>Separar y no usar</h3><p>Aislá el pallet o la bolsa afectada (humedad, terrones, olores, envase dañado, color anormal).</p></div></div>
    <div class="step"><div class="num">2</div><div><h3>Registrar</h3><p>Anotá el código de lote, la cantidad afectada y la condición observada. Si podés, tomá fotos del rótulo y del defecto.</p></div></div>
    <div class="step"><div class="num">3</div><div><h3>Avisar a Pro-Terra</h3><p>Escribinos a ${esc(tech.contact.email)} o llamanos al ${esc(tech.contact.phone)}. Los reclamos se registran, se investiga el lote y se comunica el cierre con acciones correctivas.</p></div></div>
    <div class="card dark" style="margin-top:5mm">
      <h3>Soporte técnico</h3>
      <p style="margin:0">${esc(tech.contact.email)} · ${esc(tech.contact.phone)}<br/>${esc(tech.contact.location)}</p>
    </div>
    ${footer(3, total, note)}
  </section>`;

  return html(p1 + p2 + p3, 'Manual de almacenamiento y manipulación — Pro-Terra');
}

/* ---------------------------------------------------- Manual: packaging */
function manualPackaging() {
  const total = 4;
  const B = tech.packaging.bag;
  const BB = tech.packaging.bigBag;
  const note = 'Manual de packaging e identificación · Pro-Terra';
  const sub = `Manual · Edición ${YEAR}`;
  const codeBlocks = tech.traceability.parts
    .map((c, i) => `${i ? '<i>-</i>' : ''}<div><b>${esc(c.code)}</b><span>${esc(c.label)}</span></div>`)
    .join('');

  const p1 = `
  <section class="pg">
    <div class="band-head">
      <img src="${LOGO}" alt="Pro-Terra"/>
      <div class="eyebrow">Manual técnico</div>
      <h1 class="serif">Packaging e identificación</h1>
      <p>Bolsa multicapa de 20 kg, big bag, código de color, rotulado y lectura del código de lote.</p>
    </div>
    <h2>1. Bolsa multicapa de 20 kg</h2>
    <p>Los tres productos se comercializan en bolsas multicapa de papel kraft de <b>20 kg netos</b>: un equilibrio entre protección, resistencia, costo y ergonomía, compatible con clientes que reciben la mercadería paletizada y no cuentan con silos.</p>
    <div class="two" style="grid-template-columns:1fr 78mm;align-items:start">
      <div>
        ${table(B.dimensions)}
        <h2>Objetivos de diseño</h2>
        ${table(B.targets)}
        <p class="small muted" style="margin-top:2mm">${esc(B.targetsNote)}</p>
      </div>
      <div class="figure"><img src="${img('img/packaging-bolsa-planos.png')}" alt="Planos de la bolsa de 20 kg"/></div>
    </div>
    <h2>Paletizado</h2>
    ${table(tech.storage.logistics.slice(0, 3))}
    ${footer(1, total, note)}
  </section>`;

  const p2 = `
  <section class="pg">
    ${header('Manual de packaging', sub)}
    <h2>2. Estructura de cinco capas</h2>
    <p>La bolsa debe soportar todo el proceso (llenado, paletizado, transporte, carga, descarga y almacenamiento) sin perder su integridad. Cada capa cumple una función:</p>
    <div class="figure"><img src="${img('img/packaging-despiece.png')}" alt="Despiece de la bolsa multicapa y colores por producto"/></div>
    <table class="grid">
      <thead><tr><th>Capa</th><th>Material</th><th>Función</th></tr></thead>
      <tbody>${B.layers.map((l) => `<tr><th>${esc(l.name)}</th><td>${esc(l.material)}</td><td>${esc(l.function)}</td></tr>`).join('')}</tbody>
    </table>
    <div class="callout">El liner interno es la <b>única superficie en contacto con el producto</b>: debe cumplir los requisitos para materiales en contacto con alimentos y no transferir olores, sabores ni sustancias.</div>
    ${footer(2, total, note)}
  </section>`;

  const p3 = `
  <section class="pg">
    ${header('Manual de packaging', sub)}
    <h2>3. Código de color</h2>
    <p>${esc(tech.packaging.colorNote)}</p>
    <div class="three">
      ${tech.packaging.colors.map((c) => `<div class="card"><div class="swatch" style="background:${c.hex}"></div><h3>${esc(c.sigla)} · ${esc(c.name)}</h3><div class="small muted" style="margin-bottom:1.5mm">${esc(c.pantone)}</div><p class="small" style="margin:0">${esc(c.meaning)}</p></div>`).join('')}
    </div>
    <h2>4. Rotulado</h2>
    <p>Cada bolsa lleva impresa, además de la marca:</p>
    ${list(tech.packaging.label)}
    <h2>5. Código de lote</h2>
    <p>Formato: <b>${esc(tech.traceability.format)}</b>. Ejemplo: <b>${esc(tech.traceability.example)}</b>.</p>
    <div class="code">${codeBlocks}</div>
    <table class="grid"><thead><tr><th>Campo</th><th>Significado</th></tr></thead>
      <tbody>${tech.traceability.parts.map((c) => `<tr><th>${esc(c.label)}</th><td>${esc(c.text)}</td></tr>`).join('')}</tbody></table>
    ${footer(3, total, note)}
  </section>`;

  const p4 = `
  <section class="pg">
    ${header('Manual de packaging', sub)}
    <h2>6. Big bag (FIBC)</h2>
    <p>${esc(BB.note)} Se fabrica con tejido circular de polipropileno virgen apto para uso alimentario, con protección UV, cuatro asas de izaje, boca superior de llenado, costuras reforzadas, liner interno de polietileno y válvula inferior de descarga tipo pétalo.</p>
    <div class="figure"><img src="${img('img/packaging-bigbag.png')}" alt="Big bag FIBC y especificaciones"/></div>
    <div class="two">
      <div class="card"><h3>Liner interno</h3><p class="small" style="margin:0">Evita pérdidas de producto fino y reduce el ingreso de humedad. En SPI y SPC, además, controla la generación de polvo durante el llenado y el vaciado.</p></div>
      <div class="card"><h3>Válvula de descarga</h3><p class="small" style="margin:0">Permite descargar de forma controlada hacia tolvas o estaciones de dosificación y puede cerrarse parcial o totalmente para evitar derrames.</p></div>
    </div>
    <div class="card dark" style="margin-top:5mm">
      <h3>Consultas de packaging</h3>
      <p style="margin:0">${esc(tech.contact.email)} · ${esc(tech.contact.phone)}<br/>${esc(tech.contact.location)}</p>
    </div>
    ${footer(4, total, note)}
  </section>`;

  return html(p1 + p2 + p3 + p4, 'Manual de packaging e identificación — Pro-Terra');
}

/* ---------------------------------------------------------- Renderizado */
const jobs = [
  ...products.products.map((p) => ({ name: `ficha-tecnica-${p.id}`, html: ficha(p) })),
  { name: 'catalogo-pro-terra-2026', html: catalogo() },
  { name: 'manual-almacenamiento-y-manipulacion', html: manualAlmacenamiento() },
  { name: 'manual-packaging-e-identificacion', html: manualPackaging() },
];

const only = process.argv.slice(2);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Edge headless se desacopla: el proceso devuelve antes de escribir el archivo.
// Esperamos a que exista y su tamaño deje de cambiar.
async function render(args, outFile, profile) {
  rmSync(outFile, { force: true });
  execFileSync(
    browser,
    [`--user-data-dir=${profile}`, '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run', '--virtual-time-budget=15000', ...args],
    { stdio: 'ignore' },
  );
  let last = -1;
  for (let i = 0; i < 120; i++) {
    await sleep(500);
    if (!existsSync(outFile)) continue;
    const size = statSync(outFile).size;
    if (size > 0 && size === last) return;
    last = size;
  }
  throw new Error(`Timeout esperando ${outFile}`);
}

for (const job of jobs) {
  if (only.length && !only.some((o) => job.name.includes(o))) continue;
  const src = join(work, `${job.name}.html`);
  writeFileSync(src, job.html, 'utf8');
  const url = pathToFileURL(src).href;
  await render(['--no-pdf-header-footer', `--print-to-pdf=${join(outDir, job.name + '.pdf')}`, url], join(outDir, job.name + '.pdf'), join(work, `p-${job.name}-pdf`));
  await render(['--force-device-scale-factor=1', '--window-size=794,1123', `--screenshot=${join(thumbDir, job.name + '.png')}`, url], join(thumbDir, job.name + '.png'), join(work, `p-${job.name}-png`));
  console.log('OK', job.name);
}
console.log('Listo →', outDir);
