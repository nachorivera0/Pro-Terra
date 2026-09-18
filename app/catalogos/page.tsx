import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import PageShell from '@/components/PageShell';
import DocCard from '@/components/DocCard';
import DocsCTA from '@/components/DocsCTA';
import AnimatedSection from '@/components/AnimatedSection';
import { products, getDoc, type Product } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Catálogos — Pro-Terra',
  description:
    'Catálogo de productos 2026 de Pro-Terra: portafolio de SPI, SPC y TVP con comparativo técnico, packaging, calidad y normativa.',
};

const contents = [
  'Comparativo técnico entre SPI, SPC y TVP',
  'Resumen y especificaciones clave de cada producto',
  'Microbiología y condiciones de almacenamiento',
  'Packaging, código de color y trazabilidad',
  'Marco regulatorio y contacto',
];

const pick = (p: Product, ...labels: string[]) =>
  labels.map((l) => p.physical.find((r) => r.label === l)?.value).find(Boolean) ?? '—';

const rows: { label: string; get: (p: Product) => string }[] = [
  { label: 'Proteína (base seca)', get: (p) => pick(p, 'Proteína (base seca)') },
  { label: 'Humedad', get: (p) => pick(p, 'Humedad') },
  { label: 'Grasa', get: (p) => pick(p, 'Grasa libre', 'Grasa') },
  { label: 'Cenizas', get: (p) => pick(p, 'Cenizas') },
  { label: 'Forma', get: (p) => p.form },
  { label: 'Color', get: (p) => pick(p, 'Color') },
  { label: 'Vida útil', get: (p) => p.storage.shelfLife },
  { label: 'Presentación', get: () => 'Bolsa multicapa 20 kg' },
];

export default function CatalogosPage() {
  const catalogo = getDoc('catalogo');

  return (
    <PageShell
      eyebrow="Recursos"
      title="Catálogos"
      crumb="Catálogos"
      description="El portafolio completo de Pro-Terra en un solo documento, listo para compartir con tu equipo de compras, calidad y desarrollo."
    >
      <section className="py-20 bg-pt-light">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <AnimatedSection>
            <DocCard doc={catalogo} wide />
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="font-display text-3xl font-bold text-pt-gray mb-5">Qué incluye</h2>
            <ul className="space-y-3">
              {contents.map((c) => (
                <li key={c} className="flex gap-3 text-gray-700">
                  <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-pt-dark">
                    <Check className="w-3.5 h-3.5 text-pt-lime" aria-hidden />
                  </span>
                  {c}
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-500 mt-6 leading-relaxed">
              Para especificaciones completas por producto, consultá las{' '}
              <Link href="/fichas-tecnicas" className="text-pt-mid font-medium underline">
                fichas técnicas
              </Link>
              .
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="mb-10">
            <p className="text-pt-lime font-semibold uppercase tracking-widest text-sm mb-3">Portafolio</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-pt-gray mb-3">Comparativo técnico</h2>
            <p className="text-gray-600 max-w-3xl">
              Los tres ingredientes parten de harina de soja desgrasada. Según el proceso se obtiene un aislado de alta
              pureza, un concentrado versátil o una proteína texturizada con estructura propia.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="rounded-2xl border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[680px]">
                  <thead>
                    <tr className="bg-pt-dark text-white text-left">
                      <th scope="col" className="px-6 py-4 font-semibold w-[22%]"><span className="sr-only">Parámetro</span></th>
                      {products.map((p) => (
                        <th key={p.id} scope="col" className="px-6 py-4 font-semibold">
                          <span className="block text-pt-lime text-base">{p.sigla}</span>
                          <span className="block text-xs font-normal text-white/70">{p.name}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r, i) => (
                      <tr key={r.label} className={i % 2 === 1 ? 'bg-pt-light/60' : ''}>
                        <th scope="row" className="px-6 py-3.5 text-left font-medium text-gray-500 align-top">{r.label}</th>
                        {products.map((p) => (
                          <td key={p.id} className="px-6 py-3.5 text-pt-gray font-medium align-top">{r.get(p)}</td>
                        ))}
                      </tr>
                    ))}
                    <tr>
                      <th scope="row" className="px-6 py-3.5 text-left font-medium text-gray-500 align-top">Franja de identificación</th>
                      {products.map((p) => (
                        <td key={p.id} className="px-6 py-3.5 text-pt-gray font-medium align-top">
                          <span className="inline-flex items-center gap-2">
                            <span className="w-3.5 h-3.5 rounded-full border border-black/10" style={{ backgroundColor: p.band.hex }} aria-hidden />
                            {p.band.name}
                          </span>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {products.map((p, i) => (
              <AnimatedSection key={p.id} delay={i * 0.1} className="h-full">
                <div className="flex flex-col h-full rounded-2xl border border-gray-100 overflow-hidden hover:border-pt-lime hover:shadow-xl transition-all duration-300">
                  <div className="relative h-44">
                    <Image src={p.image} alt={p.fullName} fill className="object-cover" unoptimized />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-display text-lg font-bold text-pt-gray mb-2">{p.fullName}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed flex-1">{p.summary}</p>
                    <Link
                      href={`/fichas-tecnicas#${p.id}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-pt-mid mt-4 hover:text-pt-dark transition-colors"
                    >
                      Ver ficha técnica <ArrowRight className="w-4 h-4" aria-hidden />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <DocsCTA />
    </PageShell>
  );
}
