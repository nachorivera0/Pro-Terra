import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Microscope, ScrollText, Archive, FlaskConical } from 'lucide-react';
import PageShell from '@/components/PageShell';
import SpecTable from '@/components/SpecTable';
import DocsCTA from '@/components/DocsCTA';
import AnimatedSection from '@/components/AnimatedSection';
import { tech } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Calidad y normativa — Pro-Terra',
  description:
    'Sistema de calidad, trazabilidad de lotes, métodos analíticos oficiales y marco regulatorio de los ingredientes proteicos de soja de Pro-Terra.',
};

const T = tech.traceability;

function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <AnimatedSection className="mb-10">
      <p className="text-pt-lime font-semibold uppercase tracking-widest text-sm mb-3">{eyebrow}</p>
      <h2 className="font-display text-3xl md:text-4xl font-bold text-pt-gray mb-3">{title}</h2>
      {text && <p className="text-gray-600 max-w-3xl leading-relaxed">{text}</p>}
    </AnimatedSection>
  );
}

const pillars = [
  {
    icon: ShieldCheck,
    title: 'Liberación de lote',
    text: 'La ausencia de Salmonella es criterio obligatorio de liberación en SPI, SPC y TVP. En el SPI, además, el contenido proteico mínimo define al producto como aislado.',
  },
  {
    icon: Microscope,
    title: 'Métodos oficiales',
    text: 'Las especificaciones se verifican con métodos AOAC y AOCS; los análisis microbiológicos siguen el Bacteriological Analytical Manual de la FDA.',
  },
  {
    icon: Archive,
    title: 'Trazabilidad',
    text: 'Cada bolsa y big bag lleva un código de lote. Los registros se conservan como mínimo 5 años y un lote puede bloquearse en hasta 4 horas.',
  },
];

export default function CalidadPage() {
  return (
    <PageShell
      eyebrow="Recursos"
      title="Calidad y normativa"
      crumb="Calidad y normativa"
      description="Cómo controlamos, identificamos y documentamos cada lote, y bajo qué marco regulatorio operamos."
    >
      {/* Pilares */}
      <section className="py-16 bg-pt-light">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map(({ icon: Icon, title, text }, i) => (
            <AnimatedSection key={title} delay={i * 0.1} className="h-full">
              <div className="h-full rounded-2xl bg-white border border-gray-100 p-7">
                <div className="w-12 h-12 rounded-xl bg-pt-light flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-pt-mid" aria-hidden />
                </div>
                <h3 className="font-display text-xl font-bold text-pt-gray mb-2">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Sistema de calidad */}
      <section id="sistema" className="scroll-mt-24 py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle
            eyebrow="Sistema de calidad"
            title="Procedimientos operativos estándar"
            text="El sistema de calidad se apoya en siete procedimientos que cubren desde la recepción de materia prima hasta la gestión de reclamos."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tech.poe.map((p, i) => (
              <AnimatedSection key={p.code} delay={(i % 3) * 0.08} className="h-full">
                <div className="h-full rounded-2xl border border-gray-100 p-6 hover:border-pt-lime hover:shadow-lg transition-all duration-300">
                  <span className="inline-block px-3 py-1 bg-pt-dark text-pt-lime text-xs font-bold rounded-full tracking-wider mb-3">
                    {p.code}
                  </span>
                  <h3 className="font-semibold text-pt-gray mb-2">{p.name}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{p.text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Trazabilidad */}
      <section id="trazabilidad" className="scroll-mt-24 py-20 bg-pt-light">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle
            eyebrow="Trazabilidad"
            title="Cada lote, identificado de punta a punta"
            text="Ante cualquier consulta o reclamo, el código de lote permite reconstruir la historia completa: materia prima, proceso, análisis y entrega."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AnimatedSection>
              <div className="rounded-2xl bg-white border border-gray-100 p-7 h-full">
                <h3 className="font-display text-xl font-bold text-pt-gray mb-2">Código de lote</h3>
                <p className="text-gray-600 text-sm mb-1">
                  Formato <b className="text-pt-dark">{T.format}</b>
                </p>
                <div className="flex flex-wrap items-stretch gap-2 my-5" role="img" aria-label={`Código de lote de ejemplo ${T.example}`}>
                  {T.parts.map((c, i) => (
                    <div key={c.code} className="flex items-center gap-2">
                      {i > 0 && <span className="text-gray-400 font-bold">-</span>}
                      <div className="bg-pt-dark text-white rounded-xl px-4 py-2.5 text-center min-w-[80px]">
                        <b className="block text-lg text-pt-lime tracking-wide">{c.code}</b>
                        <span className="text-[11px] text-white/80">{c.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <ul className="space-y-1.5 text-sm text-gray-600">
                  {T.parts.map((c) => (
                    <li key={c.code}>
                      <b className="text-pt-dark">{c.label}:</b> {c.text}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="space-y-6">
                <SpecTable title="Retención y respuesta" rows={T.facts} />
                <div className="rounded-2xl bg-white border border-gray-100 p-6">
                  <h3 className="font-display text-lg font-bold text-pt-gray mb-3">Registros que se conservan por lote</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                    {T.records.map((r) => (
                      <li key={r} className="flex gap-2 text-sm text-gray-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-pt-lime flex-shrink-0 mt-2" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Métodos */}
      <section id="metodos" className="scroll-mt-24 py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle
            eyebrow="Métodos analíticos"
            title="Estándares de referencia global"
            text="Nuestras especificaciones se alinean con los parámetros de referentes industriales del sector y se verifican con métodos oficiales."
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {tech.methods.map((m, i) => (
              <AnimatedSection key={m.org} delay={i * 0.1} className="h-full">
                <div className="h-full rounded-2xl border border-gray-100 overflow-hidden">
                  <div className="bg-pt-dark px-6 py-4 flex items-center gap-3">
                    <FlaskConical className="w-5 h-5 text-pt-lime" aria-hidden />
                    <h3 className="font-semibold text-white">{m.org}</h3>
                  </div>
                  <ul>
                    {m.items.map((it, j) => (
                      <li key={it.code + it.param} className={`px-6 py-3 flex flex-col gap-0.5 ${j % 2 === 1 ? 'bg-pt-light/60' : ''}`}>
                        <span className="text-xs font-semibold text-pt-mid">{it.code}</span>
                        <span className="text-sm text-gray-700">{it.param}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Normativa */}
      <section id="normativa" className="scroll-mt-24 py-20 bg-pt-light">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle
            eyebrow="Marco regulatorio"
            title="Registros y habilitaciones aplicables"
            text="Cada producto se registra por separado y el establecimiento opera bajo las buenas prácticas de manufactura del Código Alimentario Argentino."
          />
          <AnimatedSection>
            <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[720px]">
                  <thead>
                    <tr className="bg-pt-dark text-white text-left">
                      <th scope="col" className="px-6 py-3 font-semibold">Registro o habilitación</th>
                      <th scope="col" className="px-6 py-3 font-semibold">Autoridad de aplicación</th>
                      <th scope="col" className="px-6 py-3 font-semibold">Qué habilita</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tech.regulatory.map((r, i) => (
                      <tr key={r.name} className={i % 2 === 1 ? 'bg-pt-light/60' : ''}>
                        <th scope="row" className="px-6 py-3.5 text-left font-semibold text-pt-dark align-top">{r.name}</th>
                        <td className="px-6 py-3.5 text-gray-600 align-top">{r.authority}</td>
                        <td className="px-6 py-3.5 text-gray-600 align-top">{r.enables}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            <AnimatedSection>
              <div className="h-full rounded-2xl bg-pt-dark text-white p-7">
                <h3 className="font-display text-xl font-bold mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-pt-lime" aria-hidden /> ISO 22000
                </h3>
                <p className="text-sm text-pt-lime font-medium mb-3">{tech.iso.name}</p>
                <p className="text-sm text-white/80 leading-relaxed">{tech.iso.text}</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="h-full rounded-2xl bg-white border border-gray-100 p-7">
                <h3 className="font-display text-xl font-bold text-pt-gray mb-3 flex items-center gap-2">
                  <ScrollText className="w-5 h-5 text-pt-mid" aria-hidden /> Normas de referencia
                </h3>
                <ul className="space-y-2.5">
                  {tech.standards.map((s) => (
                    <li key={s} className="flex gap-2 text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-pt-lime flex-shrink-0 mt-2" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>

          <p className="text-sm text-gray-500 mt-8">
            Consultá las especificaciones de cada producto en las{' '}
            <Link href="/fichas-tecnicas" className="text-pt-mid font-medium underline">fichas técnicas</Link>{' '}
            y las guías de uso en los{' '}
            <Link href="/manuales" className="text-pt-mid font-medium underline">manuales</Link>.
          </p>
        </div>
      </section>

      <DocsCTA />
    </PageShell>
  );
}
