import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Thermometer, Droplets, Wind, Sun, CheckCircle, AlertTriangle, FileText, Mail, Phone } from 'lucide-react';
import PageShell from '@/components/PageShell';
import SpecTable from '@/components/SpecTable';
import DocCard from '@/components/DocCard';
import DocsCTA from '@/components/DocsCTA';
import AnimatedSection from '@/components/AnimatedSection';
import { tech, getDoc } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Manuales — Pro-Terra',
  description:
    'Manual de almacenamiento y manipulación y manual de packaging e identificación de SPI, SPC y TVP: condiciones de depósito, bolsa multicapa, big bag, código de color y código de lote.',
};

const S = tech.storage;
const P = tech.packaging;
const T = tech.traceability;

const conditionTiles = [
  { icon: Thermometer, label: 'Temperatura', value: S.temperature },
  { icon: Droplets, label: 'Humedad relativa', value: 'Menor a 65 %' },
  { icon: Wind, label: 'Ambiente', value: 'Seco, limpio y ventilado' },
  { icon: Sun, label: 'Luz solar', value: 'Sin exposición directa' },
];

const receiptChecks = [
  'Bolsas íntegras, sin roturas, humedad ni pérdidas de producto.',
  'Rótulo con producto y sigla, peso neto, lote y condiciones de almacenamiento.',
  'RNE, RNPA y leyenda de ingrediente para uso industrial.',
  'Franja de color correcta: SPI verde oscuro, SPC verde claro, TVP marrón.',
];

const deviationSteps = [
  { title: 'Separar y no usar', text: 'Aislá el pallet o la bolsa afectada (humedad, terrones, olores, envase dañado, color anormal).' },
  { title: 'Registrar', text: 'Anotá el código de lote, la cantidad afectada y la condición observada. Si podés, sacá fotos del rótulo y del defecto.' },
  { title: 'Avisar a Pro-Terra', text: 'Escribinos o llamanos. Los reclamos se registran, se investiga el lote y se comunica el cierre con acciones correctivas.' },
];

function LotCode() {
  return (
    <div className="flex flex-wrap items-stretch gap-2 my-5" role="img" aria-label={`Código de lote de ejemplo ${T.example}`}>
      {T.parts.map((c, i) => (
        <div key={c.code} className="flex items-center gap-2">
          {i > 0 && <span className="text-gray-400 font-bold">-</span>}
          <div className="bg-pt-dark text-white rounded-xl px-4 py-2.5 text-center min-w-[84px]">
            <b className="block text-lg text-pt-lime tracking-wide">{c.code}</b>
            <span className="text-[11px] text-white/80">{c.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <AnimatedSection className="mb-10">
      <p className="text-pt-lime font-semibold uppercase tracking-widest text-sm mb-3">{eyebrow}</p>
      <h2 className="font-display text-3xl md:text-4xl font-bold text-pt-gray mb-3">{title}</h2>
      {text && <p className="text-gray-600 max-w-3xl leading-relaxed">{text}</p>}
    </AnimatedSection>
  );
}

export default function ManualesPage() {
  return (
    <PageShell
      eyebrow="Recursos"
      title="Manuales"
      crumb="Manuales"
      description="Guías prácticas para recibir, almacenar, manipular e identificar nuestros ingredientes en tu planta."
    >
      {/* Descargas */}
      <section className="py-16 bg-pt-light">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatedSection className="h-full">
            <DocCard doc={getDoc('manual-almacenamiento')} />
          </AnimatedSection>
          <AnimatedSection delay={0.1} className="h-full">
            <DocCard doc={getDoc('manual-packaging')} />
          </AnimatedSection>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-8 flex flex-wrap gap-3">
          <a href="#almacenamiento" className="px-4 py-1.5 rounded-full border border-gray-300 bg-white text-sm font-medium text-pt-gray hover:border-pt-lime transition-colors">
            Almacenamiento y manipulación
          </a>
          <a href="#packaging" className="px-4 py-1.5 rounded-full border border-gray-300 bg-white text-sm font-medium text-pt-gray hover:border-pt-lime transition-colors">
            Packaging e identificación
          </a>
        </div>
      </section>

      {/* ---------- Almacenamiento y manipulación ---------- */}
      <section id="almacenamiento" className="scroll-mt-24 py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle
            eyebrow="Manual 1"
            title="Almacenamiento y manipulación"
            text="SPI, SPC y TVP son ingredientes secos e higroscópicos: la humedad es el principal enemigo de su calidad. Estas son las condiciones para conservarlos durante toda la vida útil."
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {conditionTiles.map(({ icon: Icon, label, value }, i) => (
              <AnimatedSection key={label} delay={i * 0.08}>
                <div className="rounded-2xl bg-pt-light p-6 h-full border-l-4 border-pt-lime">
                  <Icon className="w-7 h-7 text-pt-mid mb-3" aria-hidden />
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">{label}</p>
                  <p className="font-display text-lg font-bold text-pt-dark mt-1">{value}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <AnimatedSection>
              <h3 className="font-display text-xl font-bold text-pt-gray mb-4">Vida útil</h3>
              <div className="grid grid-cols-3 gap-3 mb-3">
                {S.shelfLife.map((s) => (
                  <div key={s.product} className="rounded-xl border border-gray-100 p-4 text-center">
                    <p className="text-xs font-semibold text-pt-mid">{s.product}</p>
                    <p className="font-display text-xl font-bold text-pt-dark">{s.value}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Con el envase cerrado y desde la fecha de elaboración. La mayor vida útil de la TVP se debe a su estructura
                seca y al tratamiento térmico de la extrusión.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <h3 className="font-display text-xl font-bold text-pt-gray mb-4">Qué pasa con cada producto si absorbe humedad</h3>
              <div className="space-y-3">
                {S.productNotes.map((n) => (
                  <div key={n.product} className="flex gap-4 rounded-xl border border-gray-100 p-4">
                    <span className="inline-flex h-8 w-12 flex-shrink-0 items-center justify-center rounded-full bg-pt-dark text-pt-lime text-xs font-bold">
                      {n.product}
                    </span>
                    <p className="text-sm text-gray-600 leading-relaxed">{n.text}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <AnimatedSection>
              <SpecTable title="Recepción, estiba y rotación" rows={S.logistics} />
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="rounded-2xl border border-gray-100 p-6 h-full">
                <h3 className="font-display text-lg font-bold text-pt-gray mb-4">Al recibir la mercadería, verificá</h3>
                <ul className="space-y-3">
                  {receiptChecks.map((c) => (
                    <li key={c} className="flex gap-3 text-sm text-gray-700">
                      <CheckCircle className="w-5 h-5 text-pt-mid flex-shrink-0" aria-hidden />
                      {c}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-gray-500 mt-5 pt-5 border-t border-gray-100 leading-relaxed">
                  <b className="text-pt-dark">Rotación FEFO:</b> sale primero lo que vence primero. Recomendamos aplicar el mismo
                  criterio en tu depósito, identificando los pallets por lote y fecha de elaboración.
                </p>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection>
            <div className="rounded-2xl bg-pt-light p-7 md:p-8">
              <h3 className="font-display text-xl font-bold text-pt-gray mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-pt-mid" aria-hidden /> Ante un desvío
              </h3>
              <p className="text-sm text-gray-600 mb-6">Si encontrás humedad, terrones, olores, envases dañados o un color anormal:</p>
              <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {deviationSteps.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-pt-dark text-pt-lime font-bold text-sm">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-pt-gray mb-1">{s.title}</p>
                      <p className="text-sm text-gray-600 leading-relaxed">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="flex flex-wrap gap-x-8 gap-y-2 mt-6 pt-5 border-t border-gray-200 text-sm">
                <a href={`mailto:${tech.contact.email}`} className="inline-flex items-center gap-2 text-pt-mid font-medium hover:text-pt-dark">
                  <Mail className="w-4 h-4" aria-hidden /> {tech.contact.email}
                </a>
                <span className="inline-flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" aria-hidden /> {tech.contact.phone}
                </span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ---------- Packaging e identificación ---------- */}
      <section id="packaging" className="scroll-mt-24 py-20 bg-pt-light">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle
            eyebrow="Manual 2"
            title="Packaging e identificación"
            text="Los tres productos se entregan en bolsas multicapa de papel kraft de 20 kg netos, sobre pallets normalizados. Un equilibrio entre protección, resistencia, costo y ergonomía, compatible con clientes que reciben la mercadería paletizada y no cuentan con silos."
          />

          {/* Bolsa */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12 items-start">
            <AnimatedSection className="lg:col-span-2 space-y-6">
              <SpecTable title="Bolsa de 20 kg" rows={P.bag.dimensions} />
              <SpecTable title="Objetivos de diseño (a validar)" rows={P.bag.targets} />
            </AnimatedSection>
            <AnimatedSection delay={0.1} className="lg:col-span-3">
              <figure className="rounded-2xl overflow-hidden border border-gray-100 bg-white">
                <Image
                  src="/img/packaging-bolsa-planos.png"
                  alt="Planos de la bolsa multicapa de 20 kg: vistas frontal, lateral y superior, detalle de fondo y de cierre. Medidas: 700 × 350 × 120 mm."
                  width={859}
                  height={993}
                  className="w-full h-auto"
                  unoptimized
                />
                <figcaption className="text-xs text-gray-500 px-5 py-3 border-t border-gray-100">
                  Plano de la bolsa de 20 kg. Medidas nominales de diseño.
                </figcaption>
              </figure>
            </AnimatedSection>
          </div>

          {/* Capas */}
          <AnimatedSection className="mb-12">
            <h3 className="font-display text-2xl font-bold text-pt-gray mb-2">Estructura de cinco capas</h3>
            <p className="text-gray-600 mb-6 max-w-3xl">
              La bolsa debe soportar llenado, paletizado, transporte, carga, descarga y almacenamiento sin perder su integridad.
            </p>
            <figure className="rounded-2xl overflow-hidden border border-gray-100 bg-white mb-6">
              <Image
                src="/img/packaging-despiece.png"
                alt="Despiece de la bolsa multicapa: capa externa de papel kraft 80 g/m², dos capas intermedias de 70 g/m², capa barrera de polietileno 15 µm y capa interna de polietileno 60 µm. A la derecha, los colores por producto."
                width={1345}
                height={577}
                className="w-full h-auto"
                unoptimized
              />
            </figure>
            <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[640px]">
                  <thead>
                    <tr className="bg-pt-dark text-white text-left">
                      <th scope="col" className="px-6 py-3 font-semibold">Capa</th>
                      <th scope="col" className="px-6 py-3 font-semibold">Material</th>
                      <th scope="col" className="px-6 py-3 font-semibold">Función</th>
                    </tr>
                  </thead>
                  <tbody>
                    {P.bag.layers.map((l, i) => (
                      <tr key={l.name} className={i % 2 === 1 ? 'bg-pt-light/60' : ''}>
                        <th scope="row" className="px-6 py-3 text-left font-semibold text-pt-dark align-top">{l.name}</th>
                        <td className="px-6 py-3 text-pt-gray align-top">{l.material}</td>
                        <td className="px-6 py-3 text-gray-600">{l.function}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </AnimatedSection>

          {/* Color + rotulado */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <AnimatedSection>
              <h3 className="font-display text-2xl font-bold text-pt-gray mb-2">Código de color</h3>
              <p className="text-gray-600 mb-5 leading-relaxed">{P.colorNote}</p>
              <div className="grid grid-cols-3 gap-3">
                {P.colors.map((c) => (
                  <div key={c.sigla} className="rounded-xl bg-white border border-gray-100 p-3">
                    <div className="h-14 rounded-lg mb-3" style={{ backgroundColor: c.hex }} aria-hidden />
                    <p className="font-semibold text-pt-dark text-sm">{c.sigla} · {c.name}</p>
                    <p className="text-xs text-gray-500 mb-2">{c.pantone}</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{c.meaning}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <h3 className="font-display text-2xl font-bold text-pt-gray mb-2">Rotulado</h3>
              <p className="text-gray-600 mb-5">Cada bolsa lleva impreso, además de la marca:</p>
              <ul className="space-y-2.5 rounded-2xl bg-white border border-gray-100 p-6">
                {P.label.map((l) => (
                  <li key={l} className="flex gap-3 text-sm text-gray-700">
                    <CheckCircle className="w-5 h-5 text-pt-mid flex-shrink-0" aria-hidden />
                    {l}
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>

          {/* Código de lote */}
          <AnimatedSection className="mb-12">
            <div className="rounded-2xl bg-white border border-gray-100 p-7 md:p-8">
              <h3 className="font-display text-2xl font-bold text-pt-gray mb-2">Cómo leer el código de lote</h3>
              <p className="text-gray-600">
                Formato <b className="text-pt-dark">{T.format}</b>, impreso en cada bolsa y en cada big bag. Ejemplo:
              </p>
              <LotCode />
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
                {T.parts.map((c) => (
                  <div key={c.code}>
                    <p className="text-sm font-semibold text-pt-dark">{c.label}</p>
                    <p className="text-sm text-gray-600">{c.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Big bag */}
          <AnimatedSection>
            <h3 className="font-display text-2xl font-bold text-pt-gray mb-2">Big bag (FIBC)</h3>
            <p className="text-gray-600 mb-6 max-w-3xl leading-relaxed">
              {P.bigBag.note} Tejido circular de polipropileno virgen apto para uso alimentario, con protección UV, cuatro asas de
              izaje, costuras reforzadas, liner interno de polietileno y válvula inferior de descarga tipo pétalo, que permite
              descargar de forma controlada hacia tolvas o estaciones de dosificación y cerrarse total o parcialmente.
            </p>
            <figure className="rounded-2xl overflow-hidden border border-gray-100 bg-white">
              <Image
                src="/img/packaging-bigbag.png"
                alt="Big bag FIBC de 1.100 mm de alto y base de 900 × 900 mm, con su tabla de especificaciones: capacidad neta de 800 a 1.000 kg y carga máxima segura de 1.250 kg."
                width={1378}
                height={776}
                className="w-full h-auto"
                unoptimized
              />
            </figure>
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SpecTable rows={P.bigBag.specs.slice(0, 7)} />
              <SpecTable rows={P.bigBag.specs.slice(7)} />
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-3 text-sm text-gray-500">
          <FileText className="w-5 h-5 text-pt-mid flex-shrink-0" aria-hidden />
          <p>
            ¿Buscás las especificaciones de cada producto? Están en las <Link href="/fichas-tecnicas" className="text-pt-mid font-medium underline">fichas técnicas</Link>.
          </p>
        </div>
      </section>

      <DocsCTA />
    </PageShell>
  );
}
