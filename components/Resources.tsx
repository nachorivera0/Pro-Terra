import Link from 'next/link';
import { FileText, BookOpen, Library, ShieldCheck, ArrowRight, Download } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { documents } from '@/lib/data';
import { fileSize } from '@/lib/docs';

const iconClass = 'w-7 h-7 text-pt-mid';

const sections = [
  {
    href: '/fichas-tecnicas',
    icon: <FileText className={iconClass} aria-hidden />,
    title: 'Fichas técnicas',
    text: 'Especificaciones fisicoquímicas y microbiológicas completas de SPI, SPC y TVP, con descarga en PDF.',
  },
  {
    href: '/manuales',
    icon: <BookOpen className={iconClass} aria-hidden />,
    title: 'Manuales',
    text: 'Almacenamiento y manipulación, packaging, código de color y lectura del código de lote.',
  },
  {
    href: '/catalogos',
    icon: <Library className={iconClass} aria-hidden />,
    title: 'Catálogos',
    text: 'El portafolio completo en un solo documento, con comparativo técnico entre productos.',
  },
  {
    href: '/calidad',
    icon: <ShieldCheck className={iconClass} aria-hidden />,
    title: 'Calidad y normativa',
    text: 'Sistema de calidad, trazabilidad de lotes, métodos analíticos y marco regulatorio.',
  },
];

export default function Resources() {
  return (
    <section id="recursos" className="pt-24 pb-8 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <p className="text-pt-lime font-semibold uppercase tracking-widest text-sm mb-3">
            Recursos técnicos
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-pt-gray mb-4">
            Documentación para tu proceso
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Todo lo que tu equipo de calidad, compras y desarrollo necesita para evaluar y homologar
            nuestros ingredientes.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {sections.map((s, i) => (
            <AnimatedSection key={s.href} delay={i * 0.1} className="h-full">
              <Link
                href={s.href}
                className="group flex flex-col h-full rounded-2xl border border-gray-100 p-7 hover:border-pt-lime hover:shadow-xl transition-all duration-300 bg-white"
              >
                <div className="w-14 h-14 rounded-xl bg-pt-light flex items-center justify-center mb-5 group-hover:bg-pt-dark transition-colors">
                  <span className="group-hover:[&_svg]:text-pt-lime">{s.icon}</span>
                </div>
                <h3 className="font-display text-xl font-bold text-pt-gray mb-2">{s.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed flex-1">{s.text}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-pt-mid mt-5 group-hover:gap-2.5 transition-all">
                  Ver más <ArrowRight className="w-4 h-4" aria-hidden />
                </span>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <div className="rounded-2xl bg-pt-light p-6 md:p-8">
            <h3 className="font-display text-xl font-bold text-pt-gray mb-5">Descargas directas</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
              {documents.map((d) => {
                const size = fileSize(d.file);
                return (
                  <li key={d.id} className="border-t border-gray-200 first:border-t-0 md:[&:nth-child(2)]:border-t-0">
                    <a
                      href={d.file}
                      download
                      className="group flex items-center justify-between gap-4 py-3.5"
                    >
                      <span>
                        <span className="block text-sm font-semibold text-pt-gray group-hover:text-pt-mid transition-colors">
                          {d.title}
                        </span>
                        <span className="block text-xs text-gray-500 mt-0.5">
                          PDF · {d.pages} págs.{size ? ` · ${size}` : ''}
                        </span>
                      </span>
                      <Download className="w-5 h-5 text-pt-mid flex-shrink-0 group-hover:translate-y-0.5 transition-transform" aria-hidden />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
