import type { Metadata } from 'next';
import Image from 'next/image';
import { Download, Thermometer, Droplets, Clock, Package, Info } from 'lucide-react';
import PageShell from '@/components/PageShell';
import SpecTable from '@/components/SpecTable';
import DocsCTA from '@/components/DocsCTA';
import AnimatedSection from '@/components/AnimatedSection';
import { products, disclaimer, type Product } from '@/lib/data';
import { fileSize } from '@/lib/docs';

export const metadata: Metadata = {
  title: 'Fichas técnicas — Pro-Terra',
  description:
    'Especificaciones fisicoquímicas y microbiológicas, criterios de control, almacenamiento y presentación de SPI, SPC y TVP. Descarga de fichas técnicas en PDF.',
};

function Tile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-pt-light px-4 py-4 border-l-4 border-pt-lime">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">{label}</p>
      <p className="font-display text-xl font-bold text-pt-dark mt-1 whitespace-nowrap">{value}</p>
    </div>
  );
}

function ProductSheet({ p, index }: { p: Product; index: number }) {
  const size = fileSize(p.pdf);
  const protein = p.physical[0];
  const moisture = p.physical[1];

  return (
    <section
      id={p.id}
      className={`scroll-mt-32 py-20 ${index % 2 === 0 ? 'bg-white' : 'bg-pt-light'}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Encabezado del producto */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start mb-12">
          <AnimatedSection className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-block px-3 py-1 bg-pt-dark text-pt-lime text-xs font-bold rounded-full tracking-wider">
                {p.sigla}
              </span>
              <span className="inline-flex items-center gap-2 text-xs text-gray-500">
                <span
                  className="w-3 h-3 rounded-full border border-black/10"
                  style={{ backgroundColor: p.band.hex }}
                  aria-hidden
                />
                Franja {p.band.name.toLowerCase()} · {p.band.pantone}
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-pt-gray mb-2">{p.name}</h2>
            <p className="text-pt-mid font-medium mb-6">{p.appearance}</p>
            {p.overview.map((t) => (
              <p key={t.slice(0, 24)} className="text-gray-600 leading-relaxed mb-4">
                {t}
              </p>
            ))}
            <div className="flex flex-wrap items-center gap-4 mt-6">
              <a
                href={p.pdf}
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-pt-dark text-white text-sm font-medium rounded-full hover:bg-pt-mid transition-colors"
              >
                <Download className="w-4 h-4" aria-hidden />
                Descargar ficha técnica (PDF)
              </a>
              <span className="text-xs text-gray-400">{size ? `PDF · ${size}` : 'PDF'}</span>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.15} className="lg:col-span-2">
            <div className="relative h-64 rounded-2xl overflow-hidden mb-5">
              <Image src={p.image} alt={p.fullName} fill className="object-cover" unoptimized />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <Tile label="Proteína" value={protein.value.replace('Mín. ', '≥ ').replace('Máx. ', '≤ ')} />
              <Tile label="Humedad" value={moisture.value.replace('Máx. ', '≤ ')} />
              <Tile label="Vida útil" value={p.storage.shelfLife} />
            </div>
          </AnimatedSection>
        </div>

        {/* Tablas de especificaciones */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-8">
          <AnimatedSection>
            <SpecTable title="Especificaciones fisicoquímicas" rows={p.physical} />
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <SpecTable
              title={p.id === 'tvp' ? 'Microbiología y contaminantes' : 'Especificaciones microbiológicas'}
              rows={p.microbiological}
            />
          </AnimatedSection>
        </div>

        {/* Extra TVP: grados granulométricos */}
        {p.grades && (
          <AnimatedSection className="mb-8">
            <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
              <h3 className="font-display text-lg font-bold text-pt-gray px-6 pt-5 pb-3">
                Grados granulométricos
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[520px]">
                  <thead>
                    <tr className="bg-pt-dark text-white text-left">
                      <th scope="col" className="px-6 py-3 font-semibold">Grado</th>
                      <th scope="col" className="px-6 py-3 font-semibold">Tamaño orientativo</th>
                      <th scope="col" className="px-6 py-3 font-semibold">Aplicación principal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {p.grades.map((g, i) => (
                      <tr key={g.grade} className={i % 2 === 1 ? 'bg-pt-light/60' : ''}>
                        <th scope="row" className="px-6 py-3 text-left font-semibold text-pt-dark">{g.grade}</th>
                        <td className="px-6 py-3 text-pt-gray">{g.size}</td>
                        <td className="px-6 py-3 text-gray-600">{g.use}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-5 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                <p className="text-sm text-gray-600 leading-relaxed">{p.densityNote}</p>
                <ul className="space-y-2">
                  {p.textureNotes?.map((n) => (
                    <li key={n.slice(0, 24)} className="flex gap-2 text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-pt-lime flex-shrink-0 mt-2" />
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimatedSection>
        )}

        {/* Criterios de control */}
        <AnimatedSection className="mb-8">
          <h3 className="font-display text-xl font-bold text-pt-gray mb-4">Criterios de control</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {p.controls.map((c) => (
              <div key={c.label} className="rounded-xl border border-gray-100 bg-white p-5">
                <p className="text-sm font-semibold text-pt-dark mb-1.5">{c.label}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Almacenamiento y presentación */}
        <AnimatedSection>
          <div className="rounded-2xl bg-pt-dark text-white p-7 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h3 className="font-display text-xl font-bold mb-5">Almacenamiento</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                <div className="flex items-center gap-3">
                  <Thermometer className="w-6 h-6 text-pt-lime flex-shrink-0" aria-hidden />
                  <span className="text-sm">{p.storage.temperature}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Droplets className="w-6 h-6 text-pt-lime flex-shrink-0" aria-hidden />
                  <span className="text-sm">{p.storage.humidity}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-pt-lime flex-shrink-0" aria-hidden />
                  <span className="text-sm">Vida útil {p.storage.shelfLife}</span>
                </div>
              </div>
              <ul className="space-y-2">
                {p.storage.notes.map((n) => (
                  <li key={n.slice(0, 24)} className="flex gap-2 text-sm text-white/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-pt-lime flex-shrink-0 mt-2" />
                    {n}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-xl font-bold mb-5 flex items-center gap-2">
                <Package className="w-5 h-5 text-pt-lime" aria-hidden /> Presentación
              </h3>
              <ul className="space-y-2">
                {p.presentation.map((n) => (
                  <li key={n} className="flex gap-2 text-sm text-white/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-pt-lime flex-shrink-0 mt-2" />
                    {n}
                  </li>
                ))}
              </ul>
              <div className="mt-5 pt-5 border-t border-white/15">
                <p className="text-xs uppercase tracking-widest text-white/50 mb-2">Aplicaciones</p>
                <div className="flex flex-wrap gap-2">
                  {p.applications.map((a) => (
                    <span key={a} className="px-3 py-1 bg-white/10 rounded-full text-xs">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

export default function FichasTecnicasPage() {
  return (
    <PageShell
      eyebrow="Recursos"
      title="Fichas técnicas"
      crumb="Fichas técnicas"
      description="Especificaciones completas de cada producto del portafolio, con los criterios que usamos para liberar cada lote."
    >
      {/* Navegación interna */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 mr-1">Ir a</span>
          {products.map((p) => (
            <a
              key={p.id}
              href={`#${p.id}`}
              className="px-4 py-1.5 rounded-full border border-gray-200 text-sm font-medium text-pt-gray hover:border-pt-lime hover:bg-pt-light transition-colors"
            >
              {p.sigla}
            </a>
          ))}
        </div>
      </div>

      {products.map((p, i) => (
        <ProductSheet key={p.id} p={p} index={i} />
      ))}

      <section className="py-10 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 flex gap-3 text-sm text-gray-500 leading-relaxed">
          <Info className="w-5 h-5 flex-shrink-0 text-pt-mid mt-0.5" aria-hidden />
          <p>{disclaimer}</p>
        </div>
      </section>

      <DocsCTA />
    </PageShell>
  );
}
