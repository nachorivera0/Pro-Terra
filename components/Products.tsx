'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Droplets, CheckCircle, Shield, Waves, Layers, Grid3x3, Download, ArrowRight } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { products, type Product } from '@/lib/data';

const iconClass = 'w-7 h-7 text-[#2E7D3E]';

const functionalIcons: Record<string, React.ReactNode> = {
  'Emulsificación': <Droplets className={iconClass} />,
  'Sabor neutro': <CheckCircle className={iconClass} />,
  'Control higroscópico': <Shield className={iconClass} />,
  'Retención de agua': <Waves className={iconClass} />,
  'Alta dispersabilidad': <Layers className={iconClass} />,
  'Textura post-hidratación': <Grid3x3 className={iconClass} />,
  'Dispersabilidad': <Layers className={iconClass} />,
};

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [tab, setTab] = useState<'specs' | 'apps'>('specs');

  return (
    <AnimatedSection delay={index * 0.15} className="h-full">
      <div className="group flex flex-col h-full rounded-2xl border border-gray-100 hover:border-pt-lime hover:shadow-xl transition-all duration-300 overflow-hidden bg-white">
        {/* Product image */}
        <div className="relative h-[320px] w-full overflow-hidden rounded-t-2xl">
          <Image
            src={product.image}
            alt={product.fullName}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
          {/* badge overlay */}
          <div className="absolute bottom-4 left-4">
            <span className="inline-block px-3 py-1 bg-pt-dark/80 backdrop-blur-sm text-pt-lime text-xs font-semibold rounded-full">
              {product.badge}
            </span>
          </div>
        </div>

        {/* Header text */}
        <div className="bg-pt-dark text-white px-8 py-6">
          <h3 className="font-display text-xl font-bold mb-2">{product.fullName}</h3>
          <p className="text-white/80 text-sm leading-relaxed">{product.summary}</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => setTab('specs')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              tab === 'specs'
                ? 'text-pt-dark border-b-2 border-pt-lime bg-pt-light/50'
                : 'text-gray-500 hover:text-pt-dark'
            }`}
          >
            Especificaciones
          </button>
          <button
            onClick={() => setTab('apps')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              tab === 'apps'
                ? 'text-pt-dark border-b-2 border-pt-lime bg-pt-light/50'
                : 'text-gray-500 hover:text-pt-dark'
            }`}
          >
            Aplicaciones
          </button>
        </div>

        {/* Tab content */}
        <div className="flex-1 p-8">
          {tab === 'specs' ? (
            <dl className="space-y-3">
              {product.cardSpecs.map((s) => (
                <div key={s.label} className="flex justify-between text-sm gap-4">
                  <dt className="text-gray-500">{s.label}</dt>
                  <dd className="font-medium text-pt-gray text-right">{s.value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
                  Aplicaciones
                </p>
                <ul className="space-y-1.5">
                  {product.applications.map((a) => (
                    <li key={a} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-pt-lime flex-shrink-0" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                  Características funcionales
                </p>
                <div className="flex flex-col gap-2">
                  {product.functional.map((f) => (
                    <div key={f} className="flex items-center gap-3">
                      {functionalIcons[f] ?? <CheckCircle className={iconClass} />}
                      <span className="text-sm text-pt-gray">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="p-6 pt-0 flex flex-col gap-3">
          <a
            href={product.pdf}
            download
            className="inline-flex items-center justify-center gap-2 w-full py-3 border-2 border-pt-dark text-pt-dark text-sm font-semibold rounded-full hover:bg-pt-dark hover:text-white transition-colors"
          >
            <Download className="w-4 h-4" aria-hidden />
            Descargar ficha técnica (PDF)
          </a>
          <Link
            href={`/fichas-tecnicas#${product.id}`}
            className="inline-flex items-center justify-center gap-1.5 text-sm font-medium text-pt-mid hover:text-pt-dark transition-colors"
          >
            Ver especificaciones completas <ArrowRight className="w-4 h-4" aria-hidden />
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}

export default function Products() {
  return (
    <section id="productos" className="py-24 bg-pt-light">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <p className="text-pt-lime font-semibold uppercase tracking-widest text-sm mb-3">
            Portafolio
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-pt-gray mb-4">
            Nuestros productos
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ingredientes proteicos de soja de alta funcionalidad para la industria alimentaria
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
